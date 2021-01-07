import { Component, Injector, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { EntityService } from '../../services/entity-service';

@Component({
  selector: 'delete-entity',
  templateUrl: 'delete-entity.html',
  styleUrls: ['delete-entity.scss']
})
export class DeleteEntity extends BasePage {

  entityId: number;
  index: number;
  entity: {'title': string, 'description': string} = {title: '', description: ''};
  constructor(public events1: Events, injector: Injector, private entityservice: EntityService) { super(injector); }
  ionViewDidEnter() {
      if (isNaN(this.entityId)) { return; }
      this.entityservice.getEntity(this.entityId)
      .then(data => {
         this.entity = JSON.parse(data._body).entity;
      }).catch(err => {
            err = JSON.parse(err._body);
            this.showToast(err.error);
        });
  }
  async deleteEntity() {
      await this.showLoadingView({ showOverlay: true });
      this.entityservice.deleteEntity(this.entityId)
      .then(data => {
        this.entity = JSON.parse(data._body).entity;
        this.dismissLoadingView();
      }).catch(err => {
           err = JSON.parse(err._body);
           this.showToast(err.error);
           this.dismissLoadingView();
      });
      this.events1.publish('my-delete', {id: this.entityId, index: this.index });
      this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  onDismiss() { this.modalCtrl.dismiss(); }
}
