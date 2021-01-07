import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ProductsService } from '../../services/products-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'product-add',
  templateUrl: 'product-add.html',
  styleUrls: ['product-add.scss']
})
export class ProductAdd extends BasePage {

  productId: number;
  index: number;
  product: {'title': string};
  praddform: FormGroup;
  isLoadingViewVisible: false;
  entityId: number;
  constructor(public events1: Events, injector: Injector, private productservice: ProductsService) {
      super(injector);
      this.product = {title: ''};
      this.praddform = new FormGroup({
          productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          productStatus: new FormControl(false),
      });
  }
  ionViewDidEnter() {
      //if (isNaN(this.productId)) { return; }
      /*this.productservice.getProductById(this.productId)
      .then(data => {
         this.product = JSON.parse(data._body).product;
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });*/
  }
  addProduct() {
      this.productservice.addProduct(this.praddform.value.productName, this.praddform.value.productStatus, this.entityId)
      .then( data => {
          this.events1.publish('product-deleted', {id: 0, index: 0 });
          this.onDismiss();
      }).catch( err => {
           this.dismissLoadingView();
           err = JSON.parse(err._body);
           this.showToast(err.error);
       });
  }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
}
