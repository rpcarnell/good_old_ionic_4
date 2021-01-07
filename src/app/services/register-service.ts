import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Http, URLSearchParams } from '@angular/http';
import { configLinks } from '../environment/configlinks';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

export class UserTempModel {
   fullname: string;
   username: string;
   secretquestion: string;
   secretanswer: string;
   token: string;
   address: string;
   address2: string;
   city: string;
   state: string;
   country: string;
   postcode: string;
   phone: string;
   email: string;
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService  {
    user: UserTempModel;
    REG_URL: string = configLinks.REG_URL;
    LOGIN_URL: string = configLinks.LOGIN_URL;
    USERACCESS: string = configLinks.USERACCESS;
    UPDATECONTACT: string = configLinks.UPDATECONTACT;
    COUNTRIES: string = configLinks.COUNTRIES;
    constructor(private http: Http, private jwtHelper: JwtHelper, private storage: Storage) { }
    create(data: any = {}) {
          let params = new URLSearchParams();
          params.set('email', data['email']);
          params.set('name', data['name']);
          //params.set('name', data['username']);
          params.set('password', data['password']);
          params.set('code', data['secretquestion']);
          //params.set('secretanswer', data['secretanswer']);
         // params.set('city', '');
          return  this.http.post(this.REG_URL, params)
          .toPromise()
               .catch(this.handleError);
    }
    async userAccess(data): Promise<object> {
        this.user.secretanswer = data.secretanswer;
        this.user.secretquestion = data.secretquestion;
        this.user.fullname = data.fullname; 
        const token = await this.storage.get('user_token');
        return this.http.post(this.USERACCESS + '?token=' + token, data).toPromise().catch(this.handleError);
    }
    async updateContact(data): Promise<object> {
        const token = await this.storage.get('user_token');
        return this.http.post(this.UPDATECONTACT + '?token=' + token, data).toPromise().catch(this.handleError);
    }
    updateUser(userDat) {
        userDat._body = JSON.parse(userDat._body);
       
        this.user.address = userDat._body.address;
        this.user.address2 = userDat._body.address2;
        this.user.email = userDat._body.email;
        this.user.country = userDat._body.country;
        this.user.city = userDat._body.city;
        this.user.state = userDat._body.state;
        this.user.postcode = userDat._body.postcode;
        this.user.phone = userDat._body.phone;
    }
    setUser(user) { this.user = (typeof(user._body) !== 'undefined') ? JSON.parse(user._body) : false; }
    verifyFirst() {
        if ('undefined' == typeof(this.user) || 'undefined' == typeof(this.user.token)) return false;
        return (this.jwtHelper.isTokenExpired(this.user.token)) ? 0 : 1;
    }
    getCurrent(): UserTempModel {
        if (typeof(this.user) === 'undefined') { return; }
        if (this.jwtHelper.isTokenExpired(this.user.token)) { return; }
        if (this.user && typeof(this.user.fullname) !== 'undefined') { return this.user; }
    }
    //checkAuthentication() {   }
    signIn(form) {
        let params = new URLSearchParams();
        params.set('username', form.username);
        params.set('password', form.password);
        return  this.http.post(this.LOGIN_URL, params)
        .toPromise()
            .catch(this.handleError);
    }
    logout() {
        this.storage.remove('user_token');
        delete this.user;
    }
    authSuccess(token) {
        if (!token) {
            return;
        }
        const user = this.jwtHelper.decodeToken(token);
        this.storage.set('user_token', token).then(() => {});
    }
    async countriesList() {
        let countriesServer: any = await this.http.get(this.COUNTRIES).toPromise();
        countriesServer = JSON.parse(countriesServer._body);
        const countries = Array();
        countriesServer.map((element, index) => { countries[index] = { abbr: element.code, country: element.title }; });
        return countries;
    }
    private handleError(error: any): Promise<any> {
        //alert('An error has occurred');
        //console.log('An error occurred: ' + JSON.stringify(error)); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
