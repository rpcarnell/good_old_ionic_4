import { Component, OnInit,  Output, Injector, ViewChild, ElementRef, Input} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BasePage } from '../base-page/base-page';
import { TranslateService  } from '@ngx-translate/core';
import { EntityService } from '../../services/entity-service';
import { configLinks } from '../../environment/configlinks';

export class UserTempModel {
  fullname: string;
  username: string;
  token: string;
}

export class DocuObject {
    document_name: string;
}

@Component({
  selector: 'app-entities',
  templateUrl: './entities.page.html',
  styleUrls: ['./entities.page.scss'],
})
export class EntitiesPage  extends BasePage {

      entities: Array<any> = Array();
      isContentViewVisible: boolean = true;
      page: number = 0;
      loadMore: boolean = true;
      keyword: string;
      entitiesFound: boolean = true;
      BACKENDURL: string = configLinks.BACKENDURL + '/';
      constructor(injector: Injector, private geolocation: Geolocation, private entityService: EntityService) {
          super(injector);
          this.loadEntities('new');
      }

      async loadEntities(type, event: any = '') {

          this.geolocation.getCurrentPosition({maximumAge: 5000, timeout: 5000, enableHighAccuracy: false})
          .then((resp) => {
               //alert(resp.coords.latitude);
               //alert(resp.coords.longitude);
           }).catch((error) => {
               console.log('Error getting location', error);
           });

          try {
              let data = await this.entityService.getAllEntities(this.page, this.keyword);
            /*.then(data =>*/
              this.page += 1;
              data = JSON.parse(data._body);
              this.onRefreshComplete(data);
              if (type === 'new') {
                  this.entities = data;

                  if (this.entities.length === 0) { this.entitiesFound = false; } else { this.entitiesFound = true; }

                  if (event !== '') {
                    event.target.complete();
                    //this.loadMore = true;
                  }
              } else {
                this.entities = this.entities.concat(data);
                //event.target.complete();
              //if (data.length === 0) { this.loadMore = false; }
                //this.onRefreshComplete(data);
              }
            } catch (err) {
              this.onRefreshComplete();
            }
      }
      goToEntity(id) { this.navigateToRelative('./entityshow/' + id); }
      ionViewWillEnter() { }
      onLoadMore(event) {
        this.infiniteScroll =  event.target;
        //if (false === this.loadMore) { event.target.complete(); return; }
        //alert('loading more');
        this.loadEntities('more', event);
      }
      onReload(event) {
        //alert('reloading');
        this.refresher = event.target;
        this.page = 0;
        this.loadEntities('new', event);
      }
      ngOnInit() {  }
      enableMenuSwipe() {
        return true;
      }
      async handleFileInput(files: FileList) { }

      async loadSearchData(event: any = {}) {

        //this.refresher = event.target;
        this.page = 0;
        //this.infiniteScroll.disabled = false;
        
        this.loadEntities('new');
        /*try {
    
          this.places = await this.placeService.load(this.params);
      
          if (this.places.length) {
            this.showContentView();
          } else {
            this.showEmptyView();
          }
    
          this.onRefreshComplete(this.places);
    
        } catch (err) {
          this.translate.get('ERROR_NETWORK').subscribe(str => this.showToast(str));
          this.showContentView();
          this.onRefreshComplete();
        }*/
      }
    
      async onSearch(e: any = {}) {
        this.keyword = e.target.value;
        if (this.keyword && this.keyword.trim() !== '') {
          this.keyword = this.keyword.toLowerCase();
          this.loadSearchData();
        }
      }
      onCancelSearch(e: any = {}) {
          this.keyword = '';
          this.loadSearchData();
      }
}
