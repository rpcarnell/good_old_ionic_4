import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { EntityService } from '../../services/entity-service';
import { RegisterService } from '../../services/register-service';
import { SignInPage } from '../sign-in/sign-in';
import { Storage } from '@ionic/storage';
import { configLinks } from '../../environment/configlinks';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

export class DocuObject2 { document_name: string; docu: string; }

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'entitytitle-manage',
  templateUrl: 'entitytitle-manage.html',
  styleUrls: ['entitytitle-manage.scss']
})
export class EntityManageTitlePage extends BasePage {
  private countriesList: Array<any>;
  entityId: number;
  index: number;
  UPLOADIMAGE: string = configLinks.UPLOADIMAGE;
  BACKENDURL: string = configLinks.BACKENDURL;
  UPDATEENTITY: string = configLinks.UPDATEENTITY;
  entityPicture: string;
  itemDescription: string = '';
  itemKeyword: string = '';
  itemAddress: string;
  itemAddress2: string;
  itemCity: string;
  itemState: string;
  itemPostCode: string;
  countryAbbr: string;
  itemPhone: string;
  itemTitle: string;
  entity: {'title': string, 'description': string, 'photo': string, 'keyword': string, 'phone': string, 'address': string, 'address2': string, 'city': string, 'state': string, 'postcode': string, 'country': string} =
  {title: '', description: '', photo: '', keyword: '', phone: '', address: '', address2: '', city: '', state: '', postcode: '', country: ''};
  showOption: Array<number> = Array();
  disableBut: Array<number> = Array();
  days: Array<string> = Array();
  hours: Array<string> = Array();
  minutes: Array<string> = Array();
  daysOn: Array<boolean> = Array();
  hourClosed: Array<string> = Array();
  minClosed: Array<string> = Array();
  hourOpen: Array<string> = Array();
  minOpen: Array<string> = Array();
  public form: FormGroup;

  constructor(public events1: Events, private storage: Storage, injector: Injector, private entityservice: EntityService,
  protected httpClient: HttpClient, private registerService: RegisterService, private route: ActivatedRoute) {
     super(injector);
     const $r = this.registerService.countriesList().then( text => { this.countriesList = text; } );

     this.form = new FormGroup({ country: new FormControl('', [Validators.required]), address: new FormControl('', [Validators.required]),
     address2: new FormControl('  ', [Validators.required]), postcode: new FormControl('', [Validators.required]),
     city: new FormControl('', [Validators.required]), state: new FormControl('', [Validators.required]),
     phone: new FormControl('', [Validators.required])});
     this.form.patchValue({ address2: '   '});
  }
  async setOpeningHours(id) {
        this.showOption[0] = this.showOption[1] = this.showOption[2] = this.showOption[4] = 0;
        this.days[0] = 'THIS_MON';
        this.days[1] = 'THIS_TUE';
        this.days[2] = 'THIS_WED';
        this.days[3] = 'THIS_THU';
        this.days[4] = 'THIS_FRI';
        this.days[5] = 'THIS_SAT';
        this.days[6] = 'THIS_SUN';

        let entityHours = await this.entityservice.getOpeningHours(id);

        let openingAvail = false;
        if (typeof(entityHours._body) !== 'undefined') { entityHours = JSON.parse(entityHours._body); openingAvail = true; }

        for (let a in this.days) {
            this.daysOn[a] = true;
            this.hourOpen[a] = this.hourClosed[a] = this.minOpen[a] = this.minClosed[a] = "00";
        }
        for (let i = 0; i < 24; i++) { this.hours[i] = (i < 10) ? String('0' + i) : String(i); }
        for (let i = 0; i < 60; i++) { this.minutes[i] = (i < 10) ? String('0' + i) : String(i); }
        if (openingAvail === true) { this.setOpeningModels(this.days, entityHours); }
  }
  setOpeningModels(days, entityHours) {
      let b = '';
      let cOpen = '';
      let dClosed = '';
      for (let a in days) {
           if (typeof(days[a]) === 'undefined') { continue; }
           b = days[a].replace('THIS_', '').toLowerCase();
           if (b === 'mon') {

            cOpen = (typeof(entityHours.mon_open) != 'undefined') ? entityHours.mon_open.split(':') : '';
            dClosed = (typeof(entityHours.mon_close) != 'undefined') ? entityHours.mon_close.split(':') : '';

            this.hourOpen[a] = cOpen[0];
            this.minOpen[a] = cOpen[1];

            this.hourClosed[a] = dClosed[0];
            this.minClosed[a] = dClosed[1];

            this.daysOn[a] = entityHours.mon_on;
          }
           if (b === 'tue') {

            cOpen = (typeof(entityHours.tue_open) != 'undefined') ? entityHours.tue_open.split(':') : '';
            dClosed = (typeof(entityHours.tue_close) != 'undefined') ? entityHours.tue_close.split(':') : '';

            this.hourOpen[a] = cOpen[0];
            this.minOpen[a] = cOpen[1];

            this.hourClosed[a] = dClosed[0];
            this.minClosed[a] = dClosed[1];

            this.daysOn[a] = entityHours.tue_on;
          }
           if (b === 'wed') {

            cOpen = (typeof(entityHours.wed_open) != 'undefined') ?  entityHours.wed_open.split(':') : '';
            dClosed = (typeof(entityHours.wed_close) != 'undefined') ? entityHours.wed_close.split(':') : '';

            this.hourOpen[a] = cOpen[0];
            this.minOpen[a] = cOpen[1];

            this.hourClosed[a] = dClosed[0];
            this.minClosed[a] = dClosed[1];

            this.daysOn[a] = entityHours.wed_on;
          }
           if (b === 'thu') {

            cOpen = (typeof(entityHours.thu_open) != 'undefined') ?  entityHours.thu_open.split(':') : '';
            dClosed = (typeof(entityHours.thu_close) != 'undefined') ? entityHours.thu_close.split(':') : '';

            this.hourOpen[a] = cOpen[0];
            this.minOpen[a] = cOpen[1];

            this.hourClosed[a] = dClosed[0];
            this.minClosed[a] = dClosed[1];

            this.daysOn[a] = entityHours.thu_on;
          }
           if (b === 'fri') {
             
            cOpen = (typeof(entityHours.fri_open) != 'undefined') ?  entityHours.fri_open.split(':') : '';
            dClosed = (typeof(entityHours.fri_close) != 'undefined') ? entityHours.fri_close.split(':') : '';

            this.hourOpen[a] = cOpen[0];
            this.minOpen[a] = cOpen[1];

            this.hourClosed[a] = dClosed[0];
            this.minClosed[a] = dClosed[1];

            this.daysOn[a] = entityHours.fri_on;
          }
           if (b === 'sat') {

            cOpen = (typeof(entityHours.sat_open) != 'undefined') ?  entityHours.sat_open.split(':') : '';
            dClosed = (typeof(entityHours.sat_close) != 'undefined') ? entityHours.sat_close.split(':') : '';

            this.hourOpen[a] = cOpen[0];
            this.minOpen[a] = cOpen[1];

            this.hourClosed[a] = dClosed[0];
            this.minClosed[a] = dClosed[1];

            this.daysOn[a] = entityHours.sat_on;
          }
           if (b === 'sun') {

            cOpen = (typeof(entityHours.sun_open) != 'undefined') ?  entityHours.sun_open.split(':') : '';
            dClosed = (typeof(entityHours.sun_close) != 'undefined') ? entityHours.sun_close.split(':') : '';

            this.hourOpen[a] = cOpen[0];
            this.minOpen[a] = cOpen[1];

            this.hourClosed[a] = dClosed[0];
            this.minClosed[a] = dClosed[1];

            this.daysOn[a] = entityHours.sun_on;
          }
      }
  }
  async ionViewDidEnter() {
      if (! this.registerService.verifyFirst()) { this.navigateToRelative('/1/privates/'); }
      this.entityId = parseInt(this.route.snapshot.paramMap.get('id'));
      this.setOpeningHours(this.entityId);
      if (isNaN(this.entityId)) { alert('ERROR - invalid entity ID'); return; }
      await this.showLoadingView({ showOverlay: true });
      this.entityservice.getEntity(this.entityId)
      .then(async data => {
         await this.dismissLoadingView();
         this.entity = JSON.parse(data._body).entity;
         this.itemDescription = this.entity.description;
         this.itemKeyword = this.entity.keyword;
         this.entityPicture = (this.entity.photo) ? this.BACKENDURL + '/' + this.entity.photo : '';
         this.itemAddress = this.entity.address;
         this.itemAddress2 = this.entity.address2;
         this.itemCity = this.entity.city;
         this.itemState = this.entity.state;
         this.itemPostCode = this.entity.postcode;
         this.countryAbbr = this.entity.country;
         this.itemPhone = this.entity.phone;
         this.itemTitle = this.entity.title;
         if (this.itemAddress2.trim() === '' ) { this.itemAddress2 = '   '; }
         this.form.patchValue({postcode: this.itemPostCode, city: this.itemCity, state: this.itemState, country: this.countryAbbr,
          address: this.itemAddress, address2: this.itemAddress2, phone: this.itemPhone });
      }).catch(async err => {
            await this.dismissLoadingView();
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  disableAddressButton() { return this.form.invalid; }
  //selectHour(i, hour) { this.hourOpen[i] = '11'; }
  updateAddress() {
      const formData = this.form.value;
      this.entityservice.storeEntityAddress(this.entityId, formData)
      .then(async data => {
        const UPDATED = await this.getTrans('UPDATED');
        this.showToast(UPDATED);
    }).catch(err => {
        err = JSON.parse(err._body);
        this.showToast(err.error);
    });
  }
  updateDays() {
      let day = '';
      var mon_open, mon_close, mon_on, tue_open, tue_close, tue_on, wed_open, wed_close, wed_on, thu_open, thu_close, thu_on;
      var fri_open, fri_close, fri_on, sat_open, sat_close, sat_on, sun_open, sun_close, sun_on;

      for (let a in this.days) {
          day = this.days[a].replace('THIS_', '').toLowerCase();

          if ('undefined' == typeof(this.hourOpen[a]) || 'undefined' == typeof(this.minOpen[a])) 
          { this.showToast("ERROR - one of your values is undefined"); return; }
          if ('undefined' == typeof(this.hourClosed[a]) || 'undefined' == typeof(this.minClosed[a])) 
          { this.showToast("ERROR - one of your values is undefined"); return; }
         
          switch(day) {
              case 'mon':
                  mon_open = this.hourOpen[a] + ':' + this.minOpen[a] + ':00';
                  mon_close = this.hourClosed[a] + ':' + this.minClosed[a] + ':00';
                  mon_on = (this.daysOn[a]) ? 1 : 0;
                break;
              case 'tue':
                  tue_open = this.hourOpen[a] + ':' + this.minOpen[a] + ':00';
                  tue_close = this.hourClosed[a] + ':' + this.minClosed[a] + ':00';
                  tue_on = (this.daysOn[a]) ? 1 : 0;
                break;
              case 'wed':
                  wed_open = this.hourOpen[a] + ':' + this.minOpen[a] + ':00';
                  wed_close = this.hourClosed[a] + ':' + this.minClosed[a] + ':00';
                  wed_on = (this.daysOn[a]) ? 1 : 0;
                break;
              case 'thu':
                  thu_open = this.hourOpen[a] + ':' + this.minOpen[a] + ':00';
                  thu_close = this.hourClosed[a] + ':' + this.minClosed[a] + ':00';
                  thu_on = (this.daysOn[a]) ? 1 : 0;
                break;
              case 'fri':
                  fri_open = this.hourOpen[a] + ':' + this.minOpen[a] + ':00';
                  fri_close = this.hourClosed[a] + ':' + this.minClosed[a] + ':00';
                  fri_on = (this.daysOn[a]) ? 1 : 0;
                break; 
              case 'sat':
                  sat_open = this.hourOpen[a] + ':' + this.minOpen[a] + ':00';
                  sat_close = this.hourClosed[a] + ':' + this.minClosed[a] + ':00';
                  sat_on = (this.daysOn[a]) ? 1 : 0;
                break;      
              case 'sun':
                  sun_open = this.hourOpen[a] + ':' + this.minOpen[a] + ':00';
                  sun_close = this.hourClosed[a] + ':' + this.minClosed[a] + ':00';
                  sun_on = (this.daysOn[a]) ? 1 : 0;
          }
      }

      this.entityservice.storeOpenTimes(this.entityId, mon_open, mon_close, mon_on, tue_open, tue_close, tue_on,
        wed_open, wed_close, wed_on, thu_open, thu_close, thu_on, fri_open, fri_close, fri_on , sat_open, sat_close,
        sat_on, sun_open, sun_close, sun_on)
          .then(async data => {
             const UPDATED = await this.getTrans('UPDATED');
             this.showToast(UPDATED);
          }).catch(err => {
              err = JSON.parse(err._body);
              this.showToast(err.error);
          });
  }
  disableButton(dsb) {
    if (this.itemDescription.trim() === '') { this.disableBut[1] = 1; } else {
      this.disableBut[1] = 0; }
    if (this.itemKeyword.trim() === '') { this.disableBut[2] = 1; } else {
      this.disableBut[2] = 0; }
    return (typeof(this.disableBut[dsb]) === 'undefined') ? 1 : this.disableBut[dsb];
  }
  async updateEntity(fieldNam) {
      if ('description' === fieldNam && this.itemDescription.trim() === '') {
        const EMPTY_CANNOT = await this.getTrans('EMPTY_CANNOT');
        this.showToast(EMPTY_CANNOT);
        return; }
      if ('keyword' === fieldNam && this.itemKeyword.trim() === '') {
        const EMPTY_CANNOT = await this.getTrans('EMPTY_CANNOT');
        this.showToast(EMPTY_CANNOT);
        return; }
      let a = '';
      if (fieldNam === 'keyword') { a = this.itemKeyword; } else
      if (fieldNam === 'description') { a = this.itemDescription; }

      this.storage.get('user_token').then(async token => {
            await this.showLoadingView({ showOverlay: true });
            const formData: FormData = new FormData();
            formData.append('entityId', this.entityId.toString());
            formData.append(fieldNam, a);
            formData.append('fieldName', fieldNam);
            this.httpClient.post(this.UPDATEENTITY + '?token=' + token, formData).subscribe(async data => {
              const UPDATED = await this.getTrans('UPDATED');
              this.showToast(UPDATED); },
            async err => { this.showToast(err.error.error); });
            await this.dismissLoadingView();
        });
  }
  handleFileInput(files: FileList) {
      this.storage.get('user_token').then(async token => {
      await this.showLoadingView({ showOverlay: true });
      this.postFile(token, files.item(0)).subscribe(async data => {
          this.entityPicture = this.BACKENDURL + '/' + data.docu + '/' + data.document_name;
          await this.dismissLoadingView();
  }, async err => {
        this.showToast(err.error.error);
        await this.dismissLoadingView(); });
   });
}
    postFile(token, fileToUpload: File): Observable<DocuObject2> {
      const endpoint = this.UPLOADIMAGE + '?token=' + token;
      const formData: FormData = new FormData();
      if (fileToUpload == null) { 
          this.dismissLoadingView();
          return new Observable<DocuObject2>();
      }
      formData.append('fileKey', fileToUpload, fileToUpload.name);
      formData.append('entityId', this.entityId.toString());
      const yourHeadersConfig = [];
      return this.httpClient.post<DocuObject2>(endpoint, formData);
    }

  unhideFirst(showOption)  { this.showOption[showOption] = (this.showOption[showOption]) ? 0 : 1; }
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
  uploadImage() {
      const element: HTMLElement = document.querySelector("input[name='file_1']") as HTMLElement;
      element.click();
  }
  tryy(showOption) { return this.showOption[showOption]; }
}
