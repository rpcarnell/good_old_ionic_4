import { Component,  Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register-service';
import { EntityService } from '../../services/entity-service';
//import { EntityManagePage } from '../entity-manage/entity-manage';
import { ActivatedRoute } from '@angular/router';
import { configLinks } from '../../environment/configlinks';

export class EntityModel {
    title: string;
    description: string;
    keyword: string;
}

@Component({
  selector: 'app-entityshow',
  templateUrl: './entity-show.html',
  styleUrls: ['./entity-show.scss'],
})
export class EntityShowPage extends BasePage {
  /*public form: FormGroup;
  private username: string;
  private countriesList: Array<any>;
  private countryAbbr: string;*/
  entity: EntityModel;
  BACKENDURL: string = configLinks.BACKENDURL + '/';
  showOpeningHours = false;
  PLACE_IMAGE_URL = './assets/';
  openingHours = {};
  constructor(private route: ActivatedRoute, injector: Injector, private entityService: EntityService) {
      super(injector);
      const id = this.route.snapshot.paramMap.get('id');
      this.entityService.getEntity(id)
      .then(data => {
          this.entity = JSON.parse(data._body).entity;
          this.entityService.getOpeningHours(id)
          .then(data2 => { if (data2._body) {
               const a = JSON.parse(data2._body);
               if ('undefined' !== typeof(a.entity)) {
                    this.openingHours = a;
                    this.showOpeningHours = true;
               } } });
      }).catch(err => {
        err = JSON.parse(err._body);
        this.showToast(err.error);
    });

  }
  daysOn(onoff) { return (onoff) ? 'on' : 'off'; }
  daysOnStyle(onoff) { return (onoff) ? { color: '#000'} : { color: '#aaa'}; }
  onDismiss() { this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }

}
