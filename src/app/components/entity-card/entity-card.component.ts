import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityService } from 'src/app/services/entity-service';
import { Observable } from 'rxjs';
import { starRatingSizes } from 'angular-star-rating/src/interfaces/star-rating-config.interface';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { configLinks } from '../../environment/configlinks';

@Component({
  selector: 'entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
})
export class EntityCardComponent implements OnInit {

  @Input() entityService: EntityService;
  @Input() entity: object;
  @Input() scrollObservable: Observable<any>;
  SHOWIMAGE: string = configLinks.SHOWIMAGE;
  PLACE_IMAGE_URL: string = configLinks.BACKENDURL + '/';//'./assets/';
  //entity: {title: string} = {title: ''};

  constructor() { /*console.log("fis: " + this.id); this.entity.title = '';*/ }

  ngOnInit() {  //console.log("bas: " + this.id);
      /*this.entityService.getEntity(this.id)
      .then(data => {
        var data = JSON.parse(data._body);
        this.entity = data.entity;
      }).catch(err => {
            err = JSON.parse(err._body);
            //this.showToast(err.error);
        });*/
  }

  getStatusColor(status: string) {
    if (status === 'Pending') {
      return 'warning';
    } else if (status === 'Approved') {
      return 'success';
    } else if (status === 'Rejected') {
      return 'danger';
    } else  {
      console.log('no match found');
    }
  }

}
