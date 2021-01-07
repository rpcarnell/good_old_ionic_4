import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { configLinks } from '../environment/configlinks';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable({
  providedIn: 'root'
})
export class ProductsService  {
    PRODUCTS: string = configLinks.PRODUCTS;
    DELEPRODUCT: string = configLinks.DELEPRODUCT;
    GETPRODUCTBYID: string = configLinks.GETPRODUCTBYID;
    PRODUCTADD: string = configLinks.PRODUCTADD;
    PRODUCTEDIT: string = configLinks.PRODUCTEDIT;
    constructor(private http: Http, private jwtHelper: JwtHelper, private storage: Storage) { }
    getProducts(id: number) {
        let params = new URLSearchParams();
        params.set('entity_id', String(id));
        return  this.http.post(this.PRODUCTS, params)
        .toPromise()
            .catch(this.handleError);
    }
    getProductById(id: number) {
        let params = new URLSearchParams();
        params.set('id', String(id));
        return  this.http.post(this.GETPRODUCTBYID, params)
        .toPromise()
            .catch(this.handleError);
    }
    async addProduct(name: string, status: boolean | number, entityId: number): Promise<any> {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params = new URLSearchParams();
        params.set('name', name);
        params.set('entityId', String(entityId));
        status = (status) ? 1 : 0;
        params.set('status', String(status));
        return  this.http.post(this.PRODUCTADD + '?token=' + token, params)
        .toPromise()
            .catch(this.handleError);
    }
    async editProduct(id: number, name: string, status: boolean | number, entityId: number): Promise<any> {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params = new URLSearchParams();
        params.set('name', name);
        params.set('entityId', String(entityId));
        status = (status) ? 1 : 0;
        params.set('status', String(status));
        params.set('productId', String(id));
        return  this.http.post(this.PRODUCTEDIT + '?token=' + token, params)
        .toPromise()
            .catch(this.handleError);
    }
    async deleteProduct(id: number): Promise<any> {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params = new URLSearchParams();
        params.set('id', String(id));
        return  this.http.post(this.DELEPRODUCT + '?token=' + token, params)
        .toPromise()
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        //alert('An error has occurred');
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    verifyFirst(token) {
        return this.jwtHelper.isTokenExpired(token);
     }
}
