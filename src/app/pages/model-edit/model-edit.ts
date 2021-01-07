import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ModelsService } from '../../services/models-service';
import { RegisterService } from '../../services/register-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configLinks } from '../../environment/configlinks';

@Component({
  selector: 'model-edit',
  templateUrl: 'model-edit.html',
  styleUrls: ['model-edit.scss']
})
export class ModelEdit extends BasePage {

  modelId: number;
  index: number;
  praddform: FormGroup;
  showAddPhoto: boolean = true;
  fileToUpload: File;
  productModel: {'price_flexible': any, 'unit': number, 'cost': number, 'title': string, 'photo': string, 'sales_begin': string,
    'sales_end': string, 'public': boolean, 'internal': boolean, 'price': number, 'status': boolean, 'online_deliver': boolean }
    = {status: false, unit: 0, cost: 0, title: '', photo: '', sales_begin: '', sales_end: '', public: false, internal: false,
    price_flexible: '', price: 0, online_deliver: false };
  PLACE_IMAGE_URL: string = configLinks.BACKENDURL + '/';
  itemPic: string | boolean;
  constructor(public events1: Events, injector: Injector, private registerService: RegisterService,
    private modelsservice: ModelsService, private route: ActivatedRoute) {
        super(injector);
        this.praddform = new FormGroup({
          productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          productStatus: new FormControl(false),
          dateBegin: new FormControl('', [Validators.required]),
          dateEnd: new FormControl('', [Validators.required]),
          offerpublic: new FormControl(true),
          internaluse: new FormControl(true),
          cost: new FormControl('', [Validators.required]),
          unit: new FormControl('', [Validators.required, Validators.maxLength(50)]),
          price: new FormControl('', [Validators.required]),
          flexible_price: new FormControl(''),
          online_deliver: new FormControl(true)
         });
      }
  ionViewDidEnter() {
      if (! this.registerService.verifyFirst()) { this.navigateToRelative('/1/privates/'); }
      this.modelId = parseInt(this.route.snapshot.paramMap.get('modelId'));
      if (isNaN(this.modelId)) { return; }
      this.modelsservice.getModel(this.modelId)
      .then(data => {
         this.productModel = JSON.parse(data._body).productmodel;

         if (! this.productModel.photo) { this.itemPic = false; }
         else { this.itemPic = this.PLACE_IMAGE_URL + this.productModel.photo; }
         
         const public1 = (this.productModel.public) ? true : false;
         const internal = (this.productModel.internal) ? true : false;
         const flexible = (this.productModel.price_flexible) ? true : false;
         const stat = (this.productModel.status) ? true : false;
         const onlineDeliver = (this.productModel.online_deliver) ? true : false;
         this.praddform.patchValue({productName: this.productModel.title, offerpublic: public1, internaluse: internal,
            dateBegin: this.productModel.sales_begin, dateEnd: this.productModel.sales_end, cost: this.productModel.cost,
            unit: this.productModel.unit, flexible_price: flexible, price: this.productModel.price, productStatus: stat,
            online_deliver: onlineDeliver });
         
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  async editModel() {
      if (this.praddform.invalid) {
         const message = await this.getTrans('INVALID_FORM');
         return this.showToast(message);
      }
      const formData = this.praddform.value;
      await this.showLoadingView({ showOverlay: true });
     //fileToUpload, 
     //alert(typeof(this.fileToUpload.name));

      this.modelsservice.editModel(this.modelId, formData, this.fileToUpload) 
      .then(data => {
         this.dismissLoadingView();
         if (typeof(data) != 'undefined') { this.productModel = JSON.parse(data._body).productmodel; }
         this.goBack();
      }).catch(err => {
         this.dismissLoadingView();
         err = JSON.parse(err._body);
         this.showToast(err.error);
      });
    //this.events1.publish('my-delete', {id: this.modelId, index: this.index });
    this.modalCtrl.dismiss();
  }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
  async handleFileInput(files: any) {
        this.fileChange(files);
        files = files.target.files;
        this.fileToUpload = files.item(0);
    }
    async addPhoto(docu) {
        let element: HTMLElement = document.querySelector("input[name='file_1']") as HTMLElement;
        element.click();
    }
    fileChange(event) {
        if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        reader.onload = (event:any) => {
            this.itemPic = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        }
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        console.log(file);
    }
}
