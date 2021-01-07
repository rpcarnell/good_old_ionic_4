//import { Component, OnInit,  Output, Injector, ViewChild, ElementRef, Input} from '@angular/core';
import { Component, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { TranslateService  } from '@ngx-translate/core';
import { RegisterService } from '../../services/register-service';
//import { Platform, ActionSheetController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
//import { WebView } from '@ionic-native/ionic-webview/ngx';
//import { FilePath } from '@ionic-native/file-path/ngx';
import { configLinks } from '../../environment/configlinks';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

export class UserTempModel {
  fullname: string;
  username: string;
  token: string;
}

export class DocuObject {
    document_name: string;
}

@Component({
  selector: 'app-proof',
  templateUrl: './proof.page.html',
  styleUrls: ['./proof.page.scss'],
})
export class ProofPage  extends BasePage {

  /*@ViewChild('fileInput') fileInput: ElementRef;

  @Input() text: string;

  @Output('onFileUploaded')*/
  UPLOADDOCS: string = configLinks.UPLOADDOCS;
  GETUSERDOCS: string = configLinks.GETUSERDOCS;
  SHOWDOC: string = configLinks.SHOWDOC;
  user: UserTempModel;
  docu: string;
  try: Array<boolean> = Array();
  uploadedLinks: Array<string> = Array();
  viewFile: Array<boolean> = Array();
  constructor(protected fileOpener: FileOpener, private storage: Storage, protected httpClient: HttpClient,
      protected translate: TranslateService, injector: Injector, private registerService: RegisterService,
      private actSheet: ActionSheetController) {
      super(injector);
      this.user = this.registerService.getCurrent();
      this.try[0] = this.viewFile[0] = true;
      this.try[1] = this.viewFile[1] =  true;
      this.try[2] = this.viewFile[2] =  true;
      this.try[3] = this.viewFile[3] =  true;
      this.try[4] = this.viewFile[4] =  true;
      
  }
  ionViewWillEnter()
  {
      
      this.storage.get('user_token').then(token => {
        const endpoint = this.GETUSERDOCS + '?token=' + token;
        this.httpClient.post(endpoint, {})
        .subscribe(data => 
          {
              for (let i in data)
              {
                  this.viewFile[ data[i].document_type - 1] = false;
                  this.uploadedLinks[ data[i].document_type - 1] = this.SHOWDOC + "/" + (data[i].document_type) + "/" + data[i].document_name;
              }
          }, err => { alert('There has been an error'); this.dismissLoadingView(); });
      });
  }
  ngOnInit() {  }
  enableMenuSwipe() {
    return true;
  }
  async handleFileInput(files: FileList) {
    if (! this.registerService.verifyFirst()) { this.navigateToRelative('./profile'); }
    
    this.storage.get('user_token').then(token => {
       try {
       this.postFile(token, files.item(0)).subscribe(data => {
         // this.dismissLoadingView();
          for(let i in this.try) { this.try[i] = true; }
          if ((parseInt(this.docu) - 1) <= 0) { this.docu = '1'; }
          this.try[parseInt(this.docu) - 1] = false;
          this.viewFile[parseInt(this.docu) - 1] =  false;
          this.uploadedLinks[ parseInt(this.docu) - 1] = this.SHOWDOC + "/" + this.docu + "/" + data.document_name;
     }, err => { 
           if (typeof(err.error) == 'undefined') { alert('There has been an error: ' + JSON.stringify(err.error)); }
           //this.dismissLoadingView(); 
           let error2 = err.error;
           this.showToast(error2.error);
      });
      }  catch (err) { /*alert("but what the?"  + err); /*this.dismissLoadingView(); */}
   });
}

viewFileFunc(num) { return this.viewFile[num]; }
fileURL(num) { window.open(this.uploadedLinks[num], '_blank');  }
tryy(num) { return this.try[num]; }
postFile(token, fileToUpload: File): Observable<DocuObject> {
    //this.showLoadingView({ showOverlay: true });
    if (fileToUpload == null) { return; }
    const endpoint = this.UPLOADDOCS + '?token=' + token;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append('docu', this.docu);
    const yourHeadersConfig = [];//new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<DocuObject>(endpoint, formData);
    /* .then(() => { return true; })
      .catch((e) => this.handleError(e));*/
}
   handleError(e) {
     alert(JSON.stringify(e));
  }
  uploadView(docu) {
      this.fileOpener.open('http://www.pdf995.com/samples/pdf.pdf', 'application/pdf')
      .then(() => alert('File is opened'))
      .catch(e => alert('Error opening file: ' + e));
      this.fileOpener.showOpenWithDialog('http://www.pdf995.com/samples/pdf.pdf', 'application/pdf')
      .then(() => alert('File is opened'))
      .catch(e => alert('Error opening file: ' + e));
  }
  async uploadDoc(docu) {
      this.docu = docu;
      let element: HTMLElement = document.querySelector("input[name='file_1']") as HTMLElement;
      element.click();
      /*const trans = await this.translate.get([
        'PHOTO_LIBRARY',
        'UPLOAD',
        'CAMERA',
        'CANCEL',
        'CHOOSE_AN_OPTION']
      ).toPromise();
      const actionSheet = await this.actSheet.create({
            header: trans.CHOOSE_AN_OPTION,
            buttons: [{
              text: trans.UPLOAD,
              handler: () => {
                let element: HTMLElement = document.querySelector("input[name='file_1']") as HTMLElement;
                element.click();
                //this.chooseImage(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            }, 
            {
              text: trans.CANCEL,
              role: 'cancel'
            }]
          });
      await actionSheet.present();*/
}
}
