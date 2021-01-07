import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { configLinks } from '../environment/configlinks';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@Injectable({
  providedIn: 'root'
})
export class EntityService  {
    
    ADDENTITY: string = configLinks.ADDENTITY;
    EDITENTITY: string = configLinks.EDITENTITY;
    GETENTITY: string = configLinks.GETENTITY;
    GETENTITIES: string = configLinks.GETENTITIES;
    UPDATENTSTATUS: string = configLinks.UPDATENTSTATUS;
    GETALLENTITIES: string = configLinks.GETALLENTITIES;
    DELENTITY: string = configLinks.DELENTITY;
    UPDATEENTITYOPENS: string = configLinks.UPDATEENTITYOPENS;
    UPDATENTADDRESS: string = configLinks.UPDATENTADDRESS;
    OPENINGHOURS: string = configLinks.OPENINGHOURS;
    fileTransfer: FileTransferObject;
    constructor(private http: Http, private jwtHelper: JwtHelper, private storage: Storage) { }
    async create(data: any = {}) {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params = new URLSearchParams();
        params.set('code', data['code']);
        params.set('title', data['title']);
        params.set('entitytype', data['entitytype']);
        params.set('latitude', data['latitude']);
        params.set('longitude', data['longitude']);
        return  this.http.post(this.ADDENTITY + '?token=' + token, params)
        .toPromise()
             .catch(this.handleError);
    }
    async edit(id: string, data: any = {}) {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params = new URLSearchParams();
        params.set('entity_id', id);
        params.set('code', data['code']);
        params.set('title', data['title']);
        params.set('entitytype', data['entitytype']);
        params.set('latitude', data['latitude']);
        params.set('longitude', data['longitude']);
        return  this.http.post(this.EDITENTITY + '?token=' + token, params)
        .toPromise()
             .catch(this.handleError);
    }
    async storeEntityAddress(id, addressData) {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired'); return; }
        return this.http.post(this.UPDATENTADDRESS + '?token=' + token, {
          id: id, postcode: addressData.postcode, city: addressData.city, state: addressData.state, country: addressData.country,
          address: addressData.address, address2: addressData.address2, phone: addressData.phone
        })
        .toPromise()
        .catch(this.handleError);
        /*postcode: this.itemPostCode, city: this.itemCity, state: this.itemState, country: this.countryAbbr,
          address: this.itemAddress, address2: this.itemAddress2, phone: this.itemPhone*/
  }
  async getOpeningHours(id) { return this.http.get(this.OPENINGHOURS + '/' +  id).toPromise().catch(this.handleError); }
  getEntity(id) {
      let params = new URLSearchParams();
      params.set('id', id);
      return  this.http.post(this.GETENTITY, params)
      .toPromise()
         .catch(this.handleError);
  }
  async storeOpenTimes(id, mon_open, mon_close, mon_on, tue_open, tue_close, tue_on, wed_open, wed_close, wed_on, thu_open,
        thu_close, thu_on, fri_open, fri_close, fri_on , sat_open, sat_close, sat_on ,sun_open, sun_close, sun_on) { 

        const token = await this.storage.get('user_token');
        return this.http.post(this.UPDATEENTITYOPENS + '?token=' + token, {
            entity: id, mon_open: mon_open, mon_close: mon_close, mon_on: mon_on, tue_open: tue_open, tue_close: tue_close, tue_on: tue_on, 
            wed_open: wed_open, wed_close: wed_close, wed_on: wed_on, thu_open: thu_open,
            thu_close: thu_close, thu_on: thu_on, fri_open: fri_open, fri_close: fri_close, fri_on: fri_on , 
            sat_open: sat_open, sat_close: sat_close, sat_on: sat_on ,sun_open: sun_open, sun_close: sun_close, sun_on: sun_on
        })
        .toPromise()
        .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
   verifyFirst(token) {
      return this.jwtHelper.isTokenExpired(token);
   }
   async getUserEntities() {
    const token = await this.storage.get('user_token');
    if (this.verifyFirst(token)) { alert('Token has Expired'); return; }
    return  this.http.post(this.GETENTITIES + '?token=' + token, {})
    .toPromise()
         .catch(this.handleError);
    }
    async getAllEntities(page, keyword = '') {
        const token = await this.storage.get('user_token');
        let params = new URLSearchParams();
        params.set('page', page);
        params.set('keyword', keyword);
        return  this.http.post(this.GETALLENTITIES, params)
        .toPromise()
            .catch(this.handleError);
    }
   async updateEntityStatus(id, status) {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params = new URLSearchParams();
        params.set('status', status);
        params.set('id', id);
        return  this.http.post(this.UPDATENTSTATUS + '?token=' + token, params)
        .toPromise()
             .catch(this.handleError);
   }
   async deleteEntity(id) {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params = new URLSearchParams();
        params.set('id', id);
        return  this.http.post(this.DELENTITY + '?token=' + token, params)
        .toPromise()
            .catch(this.handleError);
    }
    uploadItemImage(photo, callback) {
       //this.fileTransfer = this.transfer.create();
        /*this.storage.get('user_token').then(token => {
               let options: FileUploadOptions = {
                     fileKey: 'photo',
                     fileName: 'ItemPic' + Math.round(+new Date() / 1000),
                     chunkedMode: false,
                     mimeType: "image/jpeg",
                     headers: {}, }
               this.fileTransfer.upload(photo, `${config.API_URL}/entityuploadImage?token=` + token, options)
               .then( (data) => { callback(data, null); }, (err) => {  callback(null, err); });
        });*/
    }
}