import { Component,  Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register-service';
import { EntityService } from '../../services/entity-service';
import { EntityManagePage } from '../entity-manage/entity-manage';
import { SignInPage } from '../sign-in/sign-in';
import { DeleteEntity } from '../delete-entity/delete-entity';
import { EntityTitlePage } from '../entity-title/entity-title';
import { configLinks } from '../../environment/configlinks';

@Component({
  selector: 'app-entitiesmanage',
  templateUrl: './entities-manage.html',
  styleUrls: ['./entities-manage.scss'],
})
export class EntitiesManagePage extends BasePage {
    public form: FormGroup;
    public entities: Array<object>;
    public entityStatus: Array<boolean> = new Array();
    public entityWarning: Array<string> = new Array();
    PLACE_IMAGE_URL: string = configLinks.BACKENDURL + '/';
    constructor(public events1: Events, injector: Injector, private registerService: RegisterService, private entityService: EntityService) {
        super(injector);
        this.form = new FormGroup({
          code: new FormControl('', [Validators.required]),
          title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          entitytype: new FormControl('', [Validators.required]),
          newused: new FormControl('')
        });
        this.events1.subscribe('entityTitle-goto', (x) => { this.goToEvent(x); });
    }
    goToEvent(page: any) {  //alert('but we here? ' + JSON.stringify(page));
        this.navigateToRelative('./' + page.url + '/' + page.id);
    }
    goTo(page: string, id: number) {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        this.navigateToRelative('./' + page + '/' + id);
    }
    async openSignInModal() {
        await this.showLoadingView({ showOverlay: true });
        const modal = await this.modalCtrl.create({
          component: SignInPage
        });
        await modal.present();
        await this.dismissLoadingView();
      }
    async entityEdit(id) {
        //this.onDismiss();
        //await this.showLoadingView({ showOverlay: true });
        const modal = await this.modalCtrl.create({ component: EntityManagePage,
        componentProps: { entityId: id } });
        await modal.present();
        //await this.dismissLoadingView();
    }
    async PresentModal(d: string, id: number) {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        let a: any  = EntityTitlePage;
        await this.showLoadingView({ showOverlay: true });
        const modal = await this.modalCtrl.create({ component: a, componentProps: { entityId: id } });
        await modal.present();
        await this.dismissLoadingView();
   }
    updateItem(id, index) {
        this.entityWarning[index] = 'Entity is now active';
        if (true === this.entityStatus[index]) {
            this.translate.get('ENTITY_OPENED_NOW').subscribe(str => this.entityWarning[index] = str); } else {
                this.translate.get('ENTITY_CLOSED_NOW').subscribe(str => this.entityWarning[index] = str); }
        const $this = this;
        setTimeout(function() { $this.entityWarning[index] = ''; }, 5000);
        this.entityService.updateEntityStatus(id, (this.entityStatus[index] ? 1 : 0))
        .then(data => {
            data = JSON.parse(data._body);
       }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
    }
    onDismiss() { this.modalCtrl.dismiss(); }
    
    async ionViewDidEnter() {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        await this.showLoadingView({ showOverlay: true });
        this.getUserEntities();
    }
    enableMenuSwipe() { return true; }
    async deleteItem(id, i) {
        if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
        const modal = await this.modalCtrl.create({ component: DeleteEntity,
            cssClass: 'my-custom-modal-css',  componentProps: { entityId: id, index: i}});
        await modal.present();
        await this.dismissLoadingView();
        this.events1.subscribe('my-delete', (x) => { this.getUserEntities(); }); 
    }
    getUserEntities() { 
        this.entityService.getUserEntities()
        .then(async data => {
            await this.dismissLoadingView();
            data = JSON.parse(data._body);
            for (let a in data.entities) { this.entityStatus[a] = (data.entities[a].status) ? true : false; }
            this.entities = data.entities;
       }).catch(async err => {
            await this.dismissLoadingView();
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
    }
}

