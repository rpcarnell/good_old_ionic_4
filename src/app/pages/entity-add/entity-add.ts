import { Component,  Injector } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register-service';
import { CameraService } from '../../services/camera-service';
import { EntityService } from '../../services/entity-service';
import { EntityManagePage } from '../entity-manage/entity-manage';
import { Crop } from '@ionic-native/crop/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-entityadd',
  templateUrl: './entity-add.html',
  styleUrls: ['./entity-add.scss'],
})
export class EntityAddPage extends BasePage {
  public form: FormGroup;
  private username: string;
  private countriesList: Array<any>;
  private countryAbbr: string;
  private showAddPhoto: boolean = true;
  private itemPic: string;
  constructor(public events1: Events, injector: Injector, private geolocation: Geolocation, private registerService: RegisterService,
              private camService: CameraService, public cropService: Crop, private entityService: EntityService) {
      super(injector);
      this.form = new FormGroup({
        code: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        entitytype: new FormControl('', [Validators.required]),
      });
  }
  onDismiss() { this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  async presentModal(id) {
      /*await this.showLoadingView({ showOverlay: true });
      const modal = await this.modalCtrl.create({ component: EntityManagePage,
      componentProps: { entityId: id } });
      await modal.present();
      await this.dismissLoadingView();*/
      this.events1.publish('entity-added', { });
  }
  async onSubmit() {
    let resp: any = {};
    resp.coords = { speed: 0.0, heading: 0.0, latitude: 0.00, longitude: 0.00, accuracy: 0.0, altitude: 0.0, altitudeAccuracy: 0.0 };
    try { resp = await this.geolocation.getCurrentPosition({maximumAge: 5000, timeout: 5000, enableHighAccuracy: false});
    } catch (e) { /*resp = {};*/ }
          /*.then((resp) => {
               //alert(resp.coords.latitude);
               //alert(resp.coords.longitude);
           }).catch((error) => {
               console.log('Error getting location', error);
           });*/
    if (typeof(resp.coords) == 'undefined') {}
    if (this.form.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        return this.showToast(message);
    }
    const formData = this.form.value;
    formData.longitude = resp.coords.longitude;
    formData.latitude = resp.coords.latitude;
    if (formData.code.length > 50) {
      return this.translate.get('OVER_LENGTH_CODE').subscribe(str => this.showToast(str)); }
    if (formData.title.length > 100) {
      return this.translate.get('OVER_LENGTH_ENTITY_TITLE').subscribe(str => this.showToast(str)); }
    this.entityService.create(formData)
    .then(data => { //in case the token has expired, the data will return as undefined and cause an error
        if (typeof(data) != 'undefined') { data = JSON.parse(data._body); }
        this.onDismiss();
        if (typeof(data) != 'undefined') {
            if (!isNaN(data.id)) { this.presentModal(data.id); }
            this.translate.get('SAVED').subscribe(str => this.showToast(str)); }
    }).catch(err => {
        err = JSON.parse(err._body);
        err = err[0];
        if (1 === err.code) { this.translate.get('DUPLICATE_CODE').subscribe(str => this.showToast(str)); }
        else if (2 === err.code) { this.translate.get('LOGIN').subscribe(str => this.showToast(str)); }
        else { alert (err.error); }
    });
  }
  addPhoto() {
      
       this.camService.showSheet((err, data) => {
          if (err) {
                console.log(err);
                //this.presentToast('Error while pick photo.');
                return;
          }

          if (data) { alert(data);
                //let loader = this.loadingCtrl.create({ content: "",  });
                  //loader.present();
                 /* this.cropService.crop(data, {quality: 75}).then(
                      newImage => {
                   */
            this.entityService.uploadItemImage(data, (data2, error) =>
            {
                //loader.dismiss();
                if (data2)
                {
                    let image  = data2;// normalizeURL(data2);
                    this.itemPic = image;
                    data2.response = JSON.parse(data2.response);
                    //this.itemPicIDs.push(data2.response['item_id']);
                    //if (3 > this.itemPicIDs.length) { this.getImageInfo(data2.response['item_full_image']); }//get image info only for the first three images
                    this.showAddPhoto = false; //make the + button disappear, if there are more than 10 images
                }
                if (error) { /*this.presentToast('Error uploading image.'); */ /*loader.dismiss();*/ }
            } );

                      /*},
                      error => {  }
       );*/
            }


            //let loading = this.loadingCtrl.create({ content: 'Please wait...' });
            //loading.present();
            //this.itemPic.push('data:image/jpeg;base64,' + data);
            //this.itemPics.push(normalizeURL(data));
        });
      
  }
}
