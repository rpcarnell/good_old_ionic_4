
import { Component, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { Place } from '../../services/place-service';
import { Category } from 'src/app/services/categories';
import { Coordinates } from '@ionic-native/geolocation/ngx';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'place-list-page',
  templateUrl: 'place-list.html',
  styleUrls: ['place-list.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('100ms', [animate('300ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class PlaceListPage extends BasePage {

  public params: any = {};
  public category: Category;
  public skeletonArray: any;
  public places: Place[] = [];
  public location: Coordinates;

  constructor(injector: Injector,
    private geolocationService: GeolocationService,
    private placeService: Place) {
    super(injector);

    this.skeletonArray = Array(12);
    this.params = Object.assign({}, this.getQueryParams());
    this.params.unit = this.preference.unit;
    this.params.limit = 20;
    this.params.page = 0;
  }

  async ngOnInit() {
  }

  async ionViewDidEnter() {

    const title = await this.getTrans('PLACES');
    this.setPageTitle(title);

    this.setMetaTags({
      title: title
    });

    if (!this.places.length) {

      await this.showLoadingView({ showOverlay: false });

      if (this.params.category) {
        this.category = new Category;
        this.category.id = this.params.category;
        this.category.fetch();

        this.params.category = this.category;
      }

      if (this.params.nearby) {
        const coords = await this.geolocationService.getCurrentPosition();
        this.location = coords;
        this.params.location = coords;
      } else {
        this.loadLocation();
      }

      this.loadData();
    }
  }

  enableMenuSwipe() {
    return false;
  }

  async loadLocation(): Promise<Coordinates> {
    try {
      const coords = await this.geolocationService.getCurrentPosition();
      this.location = coords;
      return coords;
    } catch (error) {
      return null;
    }
  }

  async loadData() {

    try {

      const places = await this.placeService.load(this.params);

      for (let place of places) {
        this.places.push(place);
      }

      this.onRefreshComplete(places);

      if (this.places.length) {
        this.showContentView();
      } else {
        this.showEmptyView();
      }

    } catch (err) {

      this.showContentView();
      this.onRefreshComplete();

      let message = await this.getTrans('ERROR_NETWORK');
      this.showToast(message);
    }
  }

  onLoadMore(event: any = {}) {
    this.infiniteScroll = event.target;
    this.params.page++;
    this.loadData();
  }

  async onReload(event: any = {}) {
    this.refresher = event.target;
    this.places = [];
    this.params.page = 0;


    if (this.params.nearby) {
      const coords = await this.loadLocation();
      this.location = coords;
      this.params.location = coords;
    } else {
      this.loadLocation();
    }

    this.loadData();
  }

}
