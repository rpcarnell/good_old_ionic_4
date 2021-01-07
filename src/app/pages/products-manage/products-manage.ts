import { Component,  Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register-service';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInPage } from '../sign-in/sign-in';
import { ProductDelete } from '../product-delete/product-delete';
import { ProductAdd } from '../product-add/product-add';
import { ProductEdit } from '../product-edit/product-edit';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-productsmanage',
  templateUrl: './products-manage.html',
  styleUrls: ['./products-manage.scss'],
})
export class ProductsManagePage extends BasePage {
    entityId: number;
    doesNotHaveResults: boolean;
    products = [];
    productStatus = [];
    constructor(injector: Injector, private events1: Events, private productsService: ProductsService,
            private registerService: RegisterService, private route: ActivatedRoute) {
        super(injector);
        this.events1.subscribe('product-deleted', (x) => { this.getProducts(x.id); });
    }
    ionViewDidEnter() {
        if (! this.registerService.verifyFirst()) { this.navigateToRelative('/1/privates/'); }
        this.entityId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getProducts(this.entityId);
    }
    manageModels(productId: number) {
        this.navigateToRelative('models/' + productId);
    }
    async getProducts(id: number) {
        await this.showLoadingView({ showOverlay: true });
        let products = await this.productsService.getProducts(this.entityId);
        products = JSON.parse(products._body);
        this.products = products.products;
        await this.dismissLoadingView();
        if (0 === this.products.length) { this.doesNotHaveResults = true; } else { this.doesNotHaveResults = false; }
    }
    enableMenuSwipe() { return true; }
    updateItem(productId, i) { }
    async deleteItem(productId) {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        const modal = await this.modalCtrl.create({ component: ProductDelete,
            cssClass: 'my-custom-modal-css',  componentProps: { productId: productId}});
        await modal.present();
        await this.dismissLoadingView();
    }
    async openSignInModal() {
        const modal = await this.modalCtrl.create({
          component: SignInPage
        });
        await modal.present();
        await this.dismissLoadingView();
      }
    goTo(url, productId) { }
    async addProduct() {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        const modal = await this.modalCtrl.create({ component: ProductAdd,
            cssClass: 'my-custom-modal-css', componentProps: { entityId: this.entityId}});
        await modal.present();
        await this.dismissLoadingView();
    }
    async editProduct(productId) {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        const modal = await this.modalCtrl.create({ component: ProductEdit,
            cssClass: 'my-custom-modal-css',  componentProps: { productId: productId, entityId: this.entityId}});
        await modal.present();
        await this.dismissLoadingView();
     }
}
