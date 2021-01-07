import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ModelsService } from '../../services/models-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../services/register-service';

@Component({
  selector: 'model-add',
  templateUrl: 'model-add.html',
  styleUrls: ['model-add.scss']
})
export class ModelAdd extends BasePage {

  productId: number;
  index: number;
  praddform: FormGroup;
  productModel: {'title': string} = {title: ''};
  docu: string;
  showAddPhoto: boolean = true;
  fileToUpload: File;
  itemPic: File;
  constructor(public events1: Events, injector: Injector, private registerService: RegisterService, private modelsservice: ModelsService,
      private route: ActivatedRoute) {
      super(injector);
      this.praddform = new FormGroup({
        productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        productStatus: new FormControl(false),
        dateBegin: new FormControl('', [Validators.required]),
        dateEnd: new FormControl('', [Validators.required]),
        offerpublic: new FormControl(true),
        internaluse: new FormControl(true),
        online_deliver: new FormControl(false),
        cost: new FormControl('', [Validators.required]),
        unit: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        price: new FormControl('', [Validators.required]),
        flexible_price: new FormControl(false)
      });
  }
  ionViewDidEnter() {
      if (! this.registerService.verifyFirst()) { this.navigateToRelative('/1/privates/'); }
      this.productId = parseInt(this.route.snapshot.paramMap.get('productId'));
      if (isNaN(this.productId)) { return; }
  }
  async addModel() {
      if (this.praddform.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        return this.showToast(message);
      }
      const formData = this.praddform.value;
      await this.showLoadingView({ showOverlay: true });
      //fileToUpload, 
      //alert(typeof(this.fileToUpload.name));
      
      this.modelsservice.addModel(this.productId, formData, this.fileToUpload)
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
      this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
  onSubmit() { }
  async handleFileInput(files: any) {
       this.fileChange(files);
       files = files.target.files;
       this.fileToUpload = files.item(0);
       //this.itemPic = this.fileToUpload;
      //this.uploadedLinks[0] = this.SHOWDOC + "/" + this.docu + "/" + data.document_name;
  }
  async addPhoto(docu) {
      //this.docu = docu;
      let element: HTMLElement = document.querySelector("input[name='file_1']") as HTMLElement;
      element.click();
  }

  fileChange(event) {
        if(event.target.files && event.target.files[0]) {
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
