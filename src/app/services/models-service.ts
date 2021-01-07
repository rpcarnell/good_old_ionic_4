import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { configLinks } from '../environment/configlinks';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable({
  providedIn: 'root'
})
export class ModelsService  {
    GETMODELS: string = configLinks.GETMODELS;
    GETMODEL: string = configLinks.GETMODEL;
    DELETEMODEL: string = configLinks.DELETEMODEL;
    ADDMODEL: string = configLinks.ADDMODEL;
    EDITMODEL: string = configLinks.EDITMODEL;
    GETMODELDETAILS: string = configLinks.GETMODELDETAILS;
    GETMODELDETAIL: string = configLinks.GETMODELDETAIL;
    ADDMODELDETAIL: string = configLinks.ADDMODELDETAIL;
    DELMODELDETAIL: string = configLinks.DELMODELDETAIL;
    EDITMODELDETAIL: string = configLinks.EDITMODELDETAIL;
    constructor(private http: Http, private jwtHelper: JwtHelper, private storage: Storage) { }
    getModelDetails(id: number): Promise<any> {
        let params = new URLSearchParams();
        params.append('model_id', String(id));
        return  this.http.post(this.GETMODELDETAILS, params)
        .toPromise()
            .catch(this.handleError);
    }
    getModelDetail(id: number): Promise<any> {
        let params = new URLSearchParams();
        params.append('modeldetail_id', String(id));
        return  this.http.post(this.GETMODELDETAIL, params)
        .toPromise()
            .catch(this.handleError);
    }
    async editModelViewDetail(id: number, formData): Promise<any>
    {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params: FormData = new FormData();
        params.append('textareadetail', formData.textareadetail);
        params.append('linkto_image_or_vdo', formData.linkto_image_or_vdo);
        params.append('upload_from_user', formData.upload_from_user);
        params.append('status', formData.status);
        params.append('id', String(id));
        return  this.http.post(this.EDITMODELDETAIL + '?token=' + token, params)
        .toPromise()
        .catch(this.handleError);
    }
    async deleteModelDetail(id: number): Promise<any> {
        const token = await this.storage.get('user_token');
        let params = new URLSearchParams();
        params.append('modeldetail_id', String(id));
        return  this.http.post(this.DELMODELDETAIL + '?token=' + token, params)
        .toPromise()
        .catch(this.handleError);
    }
    async addModelViewDetail(modelId: number, formData): Promise<any> {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params: FormData = new FormData();
        params.append('textareadetail', formData.textareadetail);
        params.append('linkto_image_or_vdo', formData.linkto_image_or_vdo);
        params.append('upload_from_user', formData.upload_from_user);
        params.append('status', formData.status);
        params.append('modelId', String(modelId));
        return  this.http.post(this.ADDMODELDETAIL + '?token=' + token, params)
        .toPromise()
        .catch(this.handleError);
    }
    getModels(id: number): Promise<any> {
        let params = new URLSearchParams();
        params.append('product_id', String(id));
        return  this.http.post(this.GETMODELS, params)
        .toPromise()
            .catch(this.handleError);
    }
    getModel(id: number): Promise<any> {
        let params = new URLSearchParams();
        params.append('model_id', String(id));
        return  this.http.post(this.GETMODEL, params)
        .toPromise()
            .catch(this.handleError);
    }
    async addModel(productId: number, formData, fileToUpload): Promise<any> {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params: FormData = new FormData();
        params.append('title', formData.productName);
        params.append('status', formData.productStatus);
        params.append('dateBegin', formData.dateBegin);
        params.append('dateEnd', formData.dateEnd);
        params.append('cost', formData.cost);
        params.append('unit', formData.unit);
        params.append('price', formData.price);
        params.append('flexible_price', formData.flexible_price);
        params.append('public', formData.offerpublic);
        params.append('internal', formData.internaluse);
        params.append('online_deliver', formData.online_deliver);
        if (typeof(fileToUpload) !== 'undefined' && 'undefined' !== typeof(fileToUpload.name)) {
            params.append('fileKey', fileToUpload, fileToUpload.name); } else { params.append('fileKey', ''); }

        params.append('productId', String(productId));
        return  this.http.post(this.ADDMODEL + '?token=' + token, params)
        .toPromise()
        .catch(this.handleError);
    }
    async editModel(modelId: number, formData, fileToUpload): Promise<any> {
        const token = await this.storage.get('user_token');
        if (this.verifyFirst(token)) { alert('Token has Expired. Please log in again.'); return; }
        let params: FormData = new FormData();
        params.append('title', formData.productName);
        params.append('status', formData.productStatus);
        params.append('dateBegin', formData.dateBegin);
        params.append('dateEnd', formData.dateEnd);
        params.append('cost', formData.cost);
        params.append('unit', formData.unit);
        params.append('price', formData.price);
        params.append('flexible_price', formData.flexible_price);
        params.append('public', formData.offerpublic);
        params.append('internal', formData.internaluse);
        params.append('online_deliver', formData.online_deliver);
        if (typeof(fileToUpload) !== 'undefined' && 'undefined' !== typeof(fileToUpload.name)) {
            params.append('fileKey', fileToUpload, fileToUpload.name); } else { params.append('fileKey', ''); }

        params.append('modelId', String(modelId));
        return  this.http.post(this.EDITMODEL + '?token=' + token, params)
        .toPromise()
        .catch(this.handleError);
    }
    async deleteModel(id: number): Promise<any> {
        const token = await this.storage.get('user_token');
        let params = new URLSearchParams();
        params.append('model_id', String(id));
        return  this.http.post(this.DELETEMODEL + '?token=' + token, params)
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
}
