import { Component,  Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register-service';
import { ModelsService } from '../../services/models-service';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInPage } from '../sign-in/sign-in';
import { ModelDelete } from '../model-delete/model-delete';
import { Events } from '@ionic/angular';
import { configLinks } from '../../environment/configlinks';

@Component({
  selector: 'models-manage',
  templateUrl: './models-manage.html',
  styleUrls: ['./models-manage.scss'],
})
export class ModelsManagePage extends BasePage {
    productId: number;
    doesNotHaveResults: boolean;
    productmodels = [];
    productStatus = [];
    productTitle = '';
    productTitleShow = false;
    PLACE_IMAGE_URL: string = configLinks.BACKENDURL + '/';
    constructor(injector: Injector, private events1: Events, private modelsService: ModelsService,
            private productsservice: ProductsService, private registerService: RegisterService,
            private route: ActivatedRoute) {
        super(injector);
    }
    async ionViewDidEnter() {
        if (! this.registerService.verifyFirst()) { this.navigateToRelative('/1/privates/'); }
        this.productId = parseInt(this.route.snapshot.paramMap.get('productId'));
        await this.showLoadingView({ showOverlay: true });
        this.getModels(this.productId);
        this.productsservice.getProductById(this.productId).then(data => { //alert(JSON.stringify(data));
            data.product = JSON.parse(data._body).product;
            this.productTitle = data.product.title;
            this.productTitleShow = true;
        }).catch(err => { err = JSON.parse(err._body); });

        await this.dismissLoadingView();
        this.events1.subscribe('model-deleted', (x) => { this.getModels(x.productId); });
    }
    async getModels(id: number) {
        //
        let models = await this.modelsService.getModels(id);
        models = JSON.parse(models._body);
        this.productmodels = models.productmodels;
        //
        if (0 === this.productmodels.length) { this.doesNotHaveResults = true; } else { this.doesNotHaveResults = false; }
    }
    enableMenuSwipe() { return true; }
    editModel(modelId) {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        this.navigateToRelative('edit/' + modelId); }
    modelViewDetail(modelId) {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        this.navigateToRelative('viewmodeldetail/' + modelId); }
    async deleteModel(modelId) {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        const modal = await this.modalCtrl.create({ component: ModelDelete,
            cssClass: 'my-custom-modal-css',  componentProps: { modelId: modelId }});
        await modal.present();
        await this.dismissLoadingView();
    }
    async openSignInModal() {
        await this.showLoadingView({ showOverlay: true });
        const modal = await this.modalCtrl.create({
        component: SignInPage
        });
        await modal.present();
        await this.dismissLoadingView();
    }
    async addModel() {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        this.navigateToRelative('add');
    }
}
