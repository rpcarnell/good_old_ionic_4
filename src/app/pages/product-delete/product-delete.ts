import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ProductsService } from '../../services/products-service';


@Component({
  selector: 'product-delete',
  templateUrl: 'product-delete.html',
  styleUrls: ['product-delete.scss']
})
export class ProductDelete extends BasePage {

  productId: number;
  index: number;
  product: {'title': string};
  constructor(public events1: Events, injector: Injector, private productservice: ProductsService)
  { super(injector);  this.product = {title: ''}; }
  ionViewDidEnter() {
      if (isNaN(this.productId)) { return; }
      this.productservice.getProductById(this.productId)
      .then(data => {
         this.product = JSON.parse(data._body).product;
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  async deleteProduct() {
      await this.showLoadingView({ showOverlay: true });
      this.productservice.deleteProduct(this.productId)
      .then(data => {
        this.onDismiss();
        this.events1.publish('product-deleted', {id: this.productId, index: this.index });
        this.dismissLoadingView();
      }).catch(err => {
           err = JSON.parse(err._body);
           this.showToast(err.error);
           this.dismissLoadingView();
      });
      this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
}
