import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ModelsService } from '../../services/models-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../services/register-service';


@Component({
  selector: 'model-viewdetail',
  templateUrl: 'model-viewdetail.html',
  styleUrls: ['model-viewdetail.scss']
})
export class ModelViewDetailPage extends BasePage {

  modelId: number;
  index: number;
  modelDetailform: FormGroup;
  productModel: {'title': string} = {title: ''};
  constructor(public events1: Events, injector: Injector, private registerService: RegisterService, private modelsservice: ModelsService,
      private route: ActivatedRoute) {
      super(injector);
      this.modelDetailform = new FormGroup({
        textareadetail: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        linkto_image_or_vdo: new FormControl('', [Validators.required]),
        upload_from_user: new FormControl(false),
        status: new FormControl(true)
      });
  }
  ionViewDidEnter() {
      //if (! this.registerService.verifyFirst()) { this.navigateToRelative('/1/privates/'); }
      this.modelId = parseInt(this.route.snapshot.paramMap.get('modelId'));
      if (isNaN(this.modelId)) { return; }
      this.modelsservice.getModel(this.modelId)
      .then(data => {
         this.productModel = JSON.parse(data._body).productmodel;
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  async addViewModelDetail() {
      await this.showLoadingView({ showOverlay: true });
      this.modelsservice.addModelViewDetail(this.modelId, this.modelDetailform.value)
      .then(data => {
        this.dismissLoadingView();
        if (typeof(data) != 'undefined') { this.productModel = JSON.parse(data._body).productmodel; }
        this.goBack();

      }).catch(err => {
           err = JSON.parse(err._body);
           this.showToast(err.error);
           this.dismissLoadingView();
      });
      this.events1.publish('my-delete', {id: this.modelId, index: this.index });
      this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
}
