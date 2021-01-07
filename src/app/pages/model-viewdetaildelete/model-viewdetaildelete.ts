import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ModelsService } from '../../services/models-service';

@Component({
  selector: 'model-viewdetaildelete',
  templateUrl: 'model-viewdetaildelete.html',
  styleUrls: ['model-viewdetaildelete.scss']
})
export class ModelviewdetailDeletePage extends BasePage {

  id: number;
  index: number;
  modelDetail: {'detail': string  } = {detail: ''};
  constructor(public events1: Events, injector: Injector, private modelsservice: ModelsService) { super(injector); }
  ionViewDidEnter() {
      if (isNaN(this.id)) { return; }
      this.modelsservice.getModelDetail(this.id)
      .then(data => {
         this.modelDetail = JSON.parse(data._body).modelviewdetails;
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  async deleteModelDetail() {
      await this.showLoadingView({ showOverlay: true });
      this.modelsservice.deleteModelDetail(this.id)
      .then(data => {
        this.dismissLoadingView();
        this.events1.publish('modeldetail-deleted', { id: this.id });
      }).catch(err => {
           err = JSON.parse(err._body);
           this.showToast(err.error);
           this.dismissLoadingView();
      });
      this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
}
