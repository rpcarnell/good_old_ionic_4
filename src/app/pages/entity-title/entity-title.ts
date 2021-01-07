import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { EntityService } from '../../services/entity-service';
import { RegisterService } from '../../services/register-service';
import { SignInPage } from '../sign-in/sign-in';
import { EntityManageTitlePage } from '../entitytitle-manage/entitytitle-manage';

@Component({
  selector: 'entity-title',
  templateUrl: 'entity-title.html',
  styleUrls: ['entity-title.scss']
})
export class EntityTitlePage extends BasePage {

  entityId: number;
  index: number;
  hiddenFst: boolean = true;
  itemTitle: string = '';
  entity: {'title': string, 'description': string} = {title: '', description: ''};
  constructor(public events1: Events, injector: Injector, private entityservice: EntityService, private registerService: RegisterService) { super(injector); }
  ionViewDidEnter() {
      if (isNaN(this.entityId)) { return; }
      this.entityservice.getEntity(this.entityId)
      .then(data => {
          this.entity = JSON.parse(data._body).entity;
          this.itemTitle = this.entity.title;
      }).catch(err => {
          err = JSON.parse(err._body);
          this.showToast(err.error);
      });
  }
  hiddenFirst() { return this.hiddenFst; }
  unhideFirst()  { this.hiddenFst = (this.hiddenFst) ? false : true; }
  goTo(page: string) {
    if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
    this.modalCtrl.dismiss();
    this.events1.publish('entityTitle-goto', {id: this.entityId, url: page });
    //this.navigateToRelative('1/privates/EntitiesManage/' + page + '/' + this.entityId);
  }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
  async openSignInModal() {
    await this.showLoadingView({ showOverlay: true });
    const modal = await this.modalCtrl.create({
      component: SignInPage
    });
    await modal.present();
    await this.dismissLoadingView();
  }
}
