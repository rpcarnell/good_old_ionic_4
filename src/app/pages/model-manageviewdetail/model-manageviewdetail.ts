import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ModelsService } from '../../services/models-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelviewdetailDeletePage } from '../model-viewdetaildelete/model-viewdetaildelete';
import { RegisterService } from '../../services/register-service';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'model-manageviewdetail',
  templateUrl: 'model-manageviewdetail.html',
  styleUrls: ['model-manageviewdetail.scss']
})
export class ModelManageViewDetailPage extends BasePage {

  modelId: number;
  index: number;
  productModel: {'title': string} = {title: ''};
  modeldetails = [];
  doesNotHaveResults: boolean = false;
  modelInfo: {'title': string} = {title: ''};
  constructor(public events1: Events, injector: Injector, private modelsservice: ModelsService, private registerService: RegisterService,
      private route: ActivatedRoute) { super(injector); }
  ionViewDidEnter() {
        this.modelId = parseInt(this.route.snapshot.paramMap.get('modelId'));
        if (isNaN(this.modelId)) { return; }

        this.modelsservice.getModel(this.modelId)
        .then(data => {
           this.modelInfo = JSON.parse(data._body).productmodel;
        }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });

        this.modelsservice.getModelDetails(this.modelId)
        .then(data => { data = JSON.parse(data._body);
        this.modeldetails = data.modeldetails;
        if (0 === this.modeldetails.length) { this.doesNotHaveResults = true; } else { this.doesNotHaveResults = false; }
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
        
        this.events1.subscribe('modeldetail-deleted', (x) => {//refresh if a modelDetail is deleted
              this.modelsservice.getModelDetails(this.modelId)
              .then(data => { data = JSON.parse(data._body);
              this.modeldetails = data.modeldetails;
              if (0 === this.modeldetails.length) { this.doesNotHaveResults = true; } else { this.doesNotHaveResults = false; }
            }).catch(err => {
                  err = JSON.parse(err._body);
                  this.showToast(err.error);
              });
        });
  }
  async deleteItem(Id) {
    if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
    const modal = await this.modalCtrl.create({ component: ModelviewdetailDeletePage,
        cssClass: 'my-custom-modal-css',  componentProps: {  id: Id }});
    await modal.present();
    await this.dismissLoadingView();
  }
  manageItem(id, i) {
    if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
    this.navigateToRelative('edit/' + id);
  }
  addModelDetail() {
    //if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
     this.navigateToRelative('add');
  }
  async openSignInModal() {
     await this.showLoadingView({ showOverlay: true });
     const modal = await this.modalCtrl.create({
     component: SignInPage
     });
     await modal.present();
     await this.dismissLoadingView();
  }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
}
