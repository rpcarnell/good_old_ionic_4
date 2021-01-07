import { Component, Injector, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import * as Parse from 'parse';
import { Slide } from '../../services/slide';
import { Category } from '../../services/categories';
import { Place } from '../../services/place-service';
import { Subject, Observable, merge } from 'rxjs';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Installation } from 'src/app/services/installation';
import { WindowRef } from 'src/app/services/window-ref';

//import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomePage extends BasePage {

  @ViewChild(IonContent) container: IonContent;

  protected slides: Slide[] = [];

  protected featuredPlaces: Place[] = [];
  protected newPlaces: Place[] = [];
  protected randomPlaces: Place[] = [];
  protected nearbyPlaces: Place[] = [];

  protected categories: Category[] = [];

  protected randomParams: any = {};

  protected slideOpts = {};

  protected skeletonArray: any;

  protected location: any;

  protected slidesTopEvent: Subject<any>;
  protected slidesTopObservable: Observable<any>;

  protected horizontalScroll: Subject<any>;
  protected onHorizontalScroll: Observable<any>;

  protected contentLoaded: Subject<any>;
  protected loadAndScroll: Observable<any>;
  
  

  constructor(
     injector: Injector,
     private geolocationService: GeolocationService,
     private installationService: Installation,
     private windowRef: WindowRef,
     private placeService: Place,
     public nav: NavController,
   ) {
      super(injector);
       
      //this.nav.navigateForward('signin');
      this.skeletonArray = Array(6);
  }

  enableMenuSwipe(): boolean {
    return false;
  }

  async ionViewDidEnter() {
    const title = await this.getTrans('APP_NAME');
    this.setPageTitle(title);

    this.setMetaTags({
      title: title
    });
  }

  async ngOnInit() {
    this.setupObservables();
    this.setupSliders();
    
    await this.showLoadingView({ showOverlay: false });
    this.loadData();
    this.loadNearbyPlaces();
  }

  onReload(event: any = {}) {
    this.refresher = event.target;
    this.showLoadingView({ showOverlay: false });
    this.loadData();
    this.loadNearbyPlaces();
  }

  onScroll() {
    this.horizontalScroll.next();
  }

  onSlidesTopDidLoad() {
   this.slidesTopEvent.next();
  }

  onSlidesTopWillChange() {
    this.slidesTopEvent.next();
  }

  onContentLoaded() {
    this.contentLoaded.next();
  }

  setupObservables() {

    this.slidesTopEvent = new Subject();
    this.horizontalScroll = new Subject();
    this.contentLoaded = new Subject();

    this.loadAndScroll = merge(
      this.container.ionScroll,
      this.horizontalScroll,
      this.contentLoaded,
      this.slidesTopEvent,
    );
  }

  setupSliders() {
    
    this.slideOpts = {
      autoplay: {
        delay: 7000
      },
      spaceBetween: 16,
      zoom: false,
      touchStartPreventDefault: false
    };
  }

  async loadData() {

    try {

      const data: any = await Parse.Cloud.run('getHomePageData');

      this.randomPlaces = data.randomPlaces;
      this.newPlaces = data.newPlaces;
      this.featuredPlaces = data.featuredPlaces;
      this.categories = data.categories;
      this.slides = data.slides;

      this.onRefreshComplete();
      this.showContentView();
      this.onContentLoaded();

    } catch (error) {

      this.showErrorView();
      this.onRefreshComplete();

      this.translate.get('ERROR_NETWORK')
        .subscribe(str => this.showToast(str));

      if (error.code === 209) {
        this.events.publish('user:logout');
      }

    }

  }

  loadMoreRandomPlaces() {

    Parse.Cloud.run('getRandomPlaces').then((places: Place[]) => {

      for (const place of places) {
        this.randomPlaces.push(place);
      }

      this.onRefreshComplete();

    }, () => {
      this.onRefreshComplete();
      this.translate.get('ERROR_NETWORK').subscribe(str => this.showToast(str));
    });

  }

  async updateInstallation() {

    try {

      const objWindow = this.windowRef.nativeWindow;

      if (objWindow.ParsePushPlugin) {

        const location = this.geolocationService.toParseGeoPoint(this.location);

        const id = await this.installationService.getId();
  
        const res = await this.installationService.save(id, { location })
        console.log('Installation updated', res);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  async loadNearbyPlaces() {

    try {

      const coords = await this.geolocationService.getCurrentPosition();

      if (coords) {
        this.location = coords;
        this.updateInstallation();

        this.nearbyPlaces = await this.placeService.load({
          location: this.location,
          limit: 12
        });
      }

    } catch (err) {
      console.warn(err);
    }

  }

  onLoadMore(event: any = {}) {
    this.infiniteScroll = event.target;
    this.randomParams.page++;
    this.loadMoreRandomPlaces();
  }

  onPlaceTouched(place: Place) {
    this.navigateToRelative('/places/' + place.id + '/' + place.slug);
  }

  onSlideTouched(slide: Slide) {

    if (slide.url && slide.type === 'url') {
      this.openUrl(slide.url);
    } else if (slide.place && slide.type === 'place') {
      this.onPlaceTouched(slide.place);
    } else {
      // no match...
    }
  }

}
