import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ModelsService } from '../../services/models-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../services/register-service';


@Component({
  selector: 'model-viewdetailedit',
  templateUrl: 'model-viewdetailedit.html',
  styleUrls: ['model-viewdetailedit.scss']
})
export class ModelViewDetailEditPage extends BasePage {

  modelDetailId: number;
  index: number;
  modelDetailform: FormGroup;
  modelviewdetails: {'detail': string, youtube: string, upload: boolean, status: boolean} =
  {detail: '', youtube: '', upload: false, status: false};
  constructor(public events1: Events, injector: Injector, private registerService: RegisterService, private modelsservice: ModelsService,
      private route: ActivatedRoute) {
      super(injector);
      this.modelDetailform = new FormGroup({
        textareadetail: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        linkto_image_or_vdo: new FormControl('', [Validators.required]),
        upload_from_user: new FormControl(false),
        status: new FormControl(false)
      });
  }
  ionViewDidEnter() {
      //if (! this.registerService.verifyFirst()) { this.navigateToRelative('/1/privates/'); }
      this.modelDetailId = parseInt(this.route.snapshot.paramMap.get('modelDetailId'));
      if (isNaN(this.modelDetailId)) { return; }
      this.modelsservice.getModelDetail(this.modelDetailId)
      .then(data => {
         this.modelviewdetails = JSON.parse(data._body).modelviewdetails;
         this.modelviewdetails.upload = (this.modelviewdetails.upload) ? true : false;
         this.modelviewdetails.status = (this.modelviewdetails.status) ? true : false;
         this.modelDetailform.patchValue({textareadetail: this.modelviewdetails.detail, linkto_image_or_vdo: this.modelviewdetails.youtube,
          upload_from_user: this.modelviewdetails.upload, status: this.modelviewdetails.status
         });
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  async editViewModelDetail() {
      await this.showLoadingView({ showOverlay: true });
      this.modelsservice.editModelViewDetail(this.modelDetailId, this.modelDetailform.value)
      .then(data => {
        this.dismissLoadingView();
        if (typeof(data) != 'undefined') { /* this.modelviewdetails = JSON.parse(data._body).productmodel;*/ }
        this.goBack();

      }).catch(err => {
           if (typeof(err._body) == 'undefined')
           { alert(err); this.dismissLoadingView(); }
           else {
              err = JSON.parse(err._body);
              this.showToast(err.error);
              this.dismissLoadingView();
           }
      });
      this.events1.publish('modeldetail-deleted', {id: this.modelDetailId });
      this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
}
