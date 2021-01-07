import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ModelsService } from '../../services/models-service';

@Component({
  selector: 'model-delete',
  templateUrl: 'model-delete.html',
  styleUrls: ['model-delete.scss']
})
export class ModelDelete extends BasePage {

  modelId: number;
  index: number;
  productModel: {'title': string, 'product': number } = {title: '', product: 0};
  constructor(public events1: Events, injector: Injector, private modelsservice: ModelsService) { super(injector); }
  ionViewDidEnter() {
      if (isNaN(this.modelId)) { return; }
      this.modelsservice.getModel(this.modelId)
      .then(data => {
         this.productModel = JSON.parse(data._body).productmodel;
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  async deleteModel() {
      await this.showLoadingView({ showOverlay: true });
      this.modelsservice.deleteModel(this.modelId)
      .then(data => {
        this.dismissLoadingView();
        this.events1.publish('model-deleted', {productId: this.productModel.product });
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
