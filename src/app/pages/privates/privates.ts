
import { Component, Injector, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { User } from '../../services/user-service';
import { BasePage } from '../base-page/base-page';
import { Review } from '../../services/review-service';
import { Place } from '../../services/place-service';
import { SignInPage } from '../sign-in/sign-in';
import { EntityAddPage } from '../entity-add/entity-add';
import { EntityManagePage } from '../entity-manage/entity-manage';
import { EntitiesManagePage } from '../entities-manage/entities-manage';
import { EntityWorkPage } from '../entity-work/entity-work';
import { EntityInvoicePage } from '../entity-invoice/entity-invoice';
import { EntityStudyPage } from '../entity-study/entity-study';
import { RegisterService } from '../../services/register-service';

@Component({
  selector: 'page-privates',
  templateUrl: 'privates.html',
  styleUrls: ['privates.scss'],
})
export class PrivatesPage extends BasePage implements OnInit {

  public user: User;

  constructor(public events1: Events, injector: Injector, private registerService: RegisterService) {
      super(injector);
      this.events1.subscribe('entity-added', () => { this.goTo('EntitiesManage'); });
  }

  enableMenuSwipe() {
      return true;
  }

  ngOnInit() {

      this.user = User.getCurrent();
      this.events.subscribe('user:login', () => {
      this.user = User.getCurrent();
    });

    this.events.subscribe('user:loggedOut', () => {
      this.user = null;
    });
  }

  async ionViewDidEnter() {

    this.user = User.getCurrent();

    const title = await this.getTrans('PROFILE');
    this.setPageTitle(title);

    this.setMetaTags({ title: title });
  }

  goTo(page: string) {

    if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
    this.navigateToRelative('./' + page);
  }
  async PresentModal(d: string) {
      if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
      let a: any  = EntityAddPage;
      switch (d) {
          case 'EntityInvoice':
              a = EntityInvoicePage;
              break;
          case 'EntitiesManage':
              a = EntitiesManagePage;
              break;
          case 'EntityWork':
              a = EntityWorkPage;
              break;
          case 'EntityStudy':
              a = EntityStudyPage;
              break;
      }
      await this.showLoadingView({ showOverlay: true });
      const modal = await this.modalCtrl.create({ component: a });
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

  onLogout() {
    this.events.publish('user:logout')
  }
  

}
