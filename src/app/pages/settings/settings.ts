
import { Component, Injector } from '@angular/core';
import { LocalStorage } from '../../services/local-storage';
import { BasePage } from '../base-page/base-page';
import { WalkthroughPage } from '../walkthrough/walkthrough';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  styleUrls: ['settings.scss']
})
export class SettingsPage extends BasePage {

  constructor(injector: Injector,
    private storage: LocalStorage) {

    super(injector);
  }

  enableMenuSwipe() {
    return true;
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  onChangeUnit(event: CustomEvent) {

    if (!event) return;

    const unit = event.detail.value;

    this.storage.setUnit(unit);
    this.preference.unit = unit;
  }

  onChangeLang(event: CustomEvent) {

    if (!event) return;

    const lang = event.detail.value;

    if (lang === 'ar') {
      document.dir = 'rtl';
    } else {
      document.dir = 'ltr';
    }

    this.storage.setLang(lang);
    this.translate.use(lang);
    this.preference.lang = lang;
  }

  async presentWalkthroughModal() {

    await this.showLoadingView({ showOverlay: true });

    const modal = await this.modalCtrl.create({
      component: WalkthroughPage
    });

    await modal.present();

    this.dismissLoadingView();

  }

}
