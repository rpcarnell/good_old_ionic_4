import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ProductsService } from '../../services/products-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'product-edit',
  templateUrl: 'product-edit.html',
  styleUrls: ['product-edit.scss']
})
export class ProductEdit extends BasePage {

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
      if (isNaN(this.productId)) { alert('ERROR - no product ID'); return; }
      this.productservice.getProductById(this.productId)
      .then(data => {
          data.product = JSON.parse(data._body).product;
          this.praddform.patchValue({ productName: data.product.title, productStatus: data.product.status });
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  editProduct() {
      this.productservice.editProduct(this.productId, this.praddform.value.productName, this.praddform.value.productStatus, this.entityId)
      .then( data => {
          this.onDismiss();
          this.events1.publish('product-deleted', {id: 0, index: 0 });
      }).catch( err => {
           this.dismissLoadingView();
           err = JSON.parse(err._body);
           this.showToast(err.error);
       });
  }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
}
