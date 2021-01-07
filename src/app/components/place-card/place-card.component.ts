import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from 'src/app/services/place-service';
import { Observable } from 'rxjs';
import { starRatingSizes } from 'angular-star-rating/src/interfaces/star-rating-config.interface';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
})
export class PlaceCardComponent implements OnInit {

  @Input() place: Place;
  @Input() scrollObservable: Observable<any>;
  @Input() extraParams: any = {};
  @Input() starSize: starRatingSizes = 'medium';
  @Input() color = 'white';
  @Input() showStatus: boolean;

  constructor() { }

  ngOnInit() {}

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
