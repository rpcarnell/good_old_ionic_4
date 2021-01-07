import { Component, Injector, OnInit } from '@angular/core';
import { User } from '../../services/user-service';
import { BasePage } from '../base-page/base-page';
import { Review } from '../../services/review-service';
import { Place } from '../../services/place-service';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { ChangePasswordPage } from '../change-password/change-password';
import { SignInPage } from '../sign-in/sign-in';
import { SettingsPage } from '../settings/settings';
import { RegisterService } from '../../services/register-service';
import { UserContactPage } from '../usercontact/usercontact';

export class UserTempModel {
  fullname: string;
  username: string;
}

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  styleUrls: ['profile.scss'],
})
export class ProfilePage extends BasePage implements OnInit {

  //public user: User;
  public user: UserTempModel;

  constructor(injector: Injector, private registerService: RegisterService ) {
    super(injector);
  }

  enableMenuSwipe() {
    return true;
  }

  ngOnInit() {

    this.user =  this.registerService.getCurrent();

    this.events.subscribe('user:login', () => {
      this.user =  this.registerService.getCurrent();
    });

    this.events.subscribe('user:loggedOut', () => {
      this.user = null;
    });
  }

  async ionViewDidEnter() {

    //this.user = User.getCurrent();
    this.user =  this.registerService.getCurrent();
    const title = await this.getTrans('PROFILE');
    this.setPageTitle(title);

    this.setMetaTags({
      title: title
    });
  }

  goTo(page: string) {

    //if (!User.getCurrent()) return this.openSignInModal();
    if (! this.registerService.getCurrent()) return this.openSignInModal();
    this.navigateToRelative('./' + page);
  }
  async onPresentContactModal()
  {
    if (! this.registerService.getCurrent()) return this.openSignInModal();
    await this.showLoadingView({ showOverlay: true });
    const modal = await this.modalCtrl.create({
      component: UserContactPage
    });
    await modal.present();

    await this.dismissLoadingView();
  }
  async onPresentEditModal() {

      //if (!User.getCurrent()) return this.openSignInModal();
      if (! this.registerService.getCurrent()) return this.openSignInModal();

      await this.showLoadingView({ showOverlay: true });
      
      const modal = await this.modalCtrl.create({
        component: ProfileEditPage
      });

      await modal.present();

      await this.dismissLoadingView();
  }

  async onPresentChangePasswordModal() {

      //if (!User.getCurrent()) return this.openSignInModal();
      if (! this.registerService.getCurrent()) return this.openSignInModal();

      await this.showLoadingView({ showOverlay: true });
      
      const modal = await this.modalCtrl.create({
        component: ChangePasswordPage
      });

      await modal.present();

      await this.dismissLoadingView();
  }

  async onPresentSettingsModal() {

    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });

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
      this.registerService.logout();
      delete this.user;
  }

}
