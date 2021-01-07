import { Component,  Injector, Input } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register-service';
import { EntityService } from '../../services/entity-service';
import { SignInPage } from '../sign-in/sign-in';
import { EntityTitlePage } from '../entity-title/entity-title';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-entitymanage',
  templateUrl: './entity-manage.html',
  styleUrls: ['./entity-manage.scss'],
})
export class EntityManagePage extends BasePage {
  public form: FormGroup;
  private username: string;
  private countriesList: Array<any>;
  private countryAbbr: string;
  entityId: number;
  isLoadingViewVisible: boolean = false;
  componentProps: any;
  constructor(injector: Injector,  private events1: Events, private registerService: RegisterService,
      private entityService: EntityService, private route: ActivatedRoute) {
      super(injector);
      this.form = new FormGroup({
        code: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        entitytype: new FormControl('', [Validators.required]),
      });
      if (! this.registerService.getCurrent()) { this.openSignInModal(); }
      this.events1.subscribe('entityTitle-goto', (x) => { this.goToEvent(x); });
  }
  goToEvent(page: any) {
      this.navigateToRelative('./../../' + page.url + '/' + page.id);
  }
  async openSignInModal() {
      await this.showLoadingView({ showOverlay: true });
      const modal = await this.modalCtrl.create({
         component: SignInPage
      });
      await modal.present();
      await this.dismissLoadingView();
  }
  async PresentModal(d: string) {
      if (! this.registerService.getCurrent()) { return this.openSignInModal(); }
      let a: any  = EntityTitlePage;
      await this.showLoadingView({ showOverlay: true });
      const modal = await this.modalCtrl.create({ component: a, componentProps: { entityId: this.entityId } });
      await modal.present();
      await this.dismissLoadingView();
 }
  async ionViewDidEnter() {
      this.entityId = parseInt(this.route.snapshot.paramMap.get('id'));
     // await this.showLoadingView({ showOverlay: true });
      if (isNaN(this.entityId) || this.entityId === 0) { return; }
      this.entityService.getEntity(this.entityId)
      .then(async data => {
         // await this.dismissLoadingView();
          data = JSON.parse(data._body);
          this.form.patchValue({entitytype: data.entity.entitytype, code: data.entity.code, title: data.entity.title });
      }).catch(async err => {
         // await this.dismissLoadingView();
          err = JSON.parse(err._body);
          this.showToast(err.error);
      });
  }
  onDismiss() { this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  async onSubmit() {
      this.isLoadingViewVisible = true;
      if (this.form.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        return this.showToast(message);
      }
      const formData = this.form.value;

      if (formData.code.length > 50) {
        return this.translate.get('OVER_LENGTH_CODE').subscribe(str => this.showToast(str)); }
      if (formData.title.length > 100) {
        return this.translate.get('OVER_LENGTH_ENTITY_TITLE').subscribe(str => this.showToast(str)); }
      this.entityService.edit(String(this.entityId), formData)
      .then(data => {
          this.isLoadingViewVisible = false;
          this.onDismiss();
          this.translate.get('UPDATED').subscribe(str => this.showToast(str));
      }).catch(err => {
          err = JSON.parse(err._body);
          this.isLoadingViewVisible = false;
          if (1 === err.code) { this.translate.get('DUPLICATE_CODE').subscribe(str => this.showToast(str)); } else
          if (2 === err.code) { this.translate.get('LOGIN').subscribe(str => this.showToast(str)); }
          if (3 === err.code) {this.showToast('Invalid Entity ID'); }
      });
  }
}
