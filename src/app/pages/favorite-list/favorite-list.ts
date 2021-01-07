
import { Component, Injector } from '@angular/core';
import { Place } from '../../services/place-service';
import { BasePage } from '../base-page/base-page';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { Coordinates } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from 'src/app/services/geolocation.service';


@Component({
  selector: 'page-favorite-list',
  templateUrl: 'favorite-list.html',
  styleUrls: ['favorite-list.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('100ms', [animate('300ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class FavoriteListPage extends BasePage {

  protected params: any = {};

  public skeletonArray: any;
  public places: Place[] = [];

  public location: Coordinates;

  constructor(injector: Injector,
    private geolocationService: GeolocationService,
    private placeService: Place) {
    super(injector);

    this.skeletonArray = Array(12);
    this.params.limit = 20;
    this.params.page = 0;
  }

  enableMenuSwipe() {
    return true;
  }

  async ngOnInit() {
    
  }

  async ionViewDidEnter() {

    if (!this.places.length) {
      await this.showLoadingView({ showOverlay: false });
      this.loadData();
    }

    const title = await this.getTrans('FAVORITES');
    this.setPageTitle(title);

    this.loadLocation();
  }

  async loadLocation() {
    try {
      const coords = await this.geolocationService.getCurrentPosition();
      this.location = coords;
    } catch (err) {
      console.warn(err);
    }
  }

  async loadData() {

    try {

      const places = await this.placeService.loadFavorites(this.params);

      for (let place of places) {
        this.places.push(place);
      }

      if (this.places.length) {
        this.showContentView();
      } else {
        this.showEmptyView();
      }

      this.onRefreshComplete(places);
      
    } catch (error) {
      this.translate.get('ERROR_NETWORK').subscribe(str => this.showToast(str));
      this.showContentView();
      this.onRefreshComplete();
    }
  }

  onLoadMore(event: any = {}) {
    this.infiniteScroll = event.target;
    this.params.page++;
    this.loadData();
  }

  onReload(event: any = {}) {
    this.refresher = event.target;
    this.places = [];
    this.params.page = 0;
    this.loadData();
  }

}
