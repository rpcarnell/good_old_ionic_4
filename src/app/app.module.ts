import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

const icons = [faFacebookF, faTwitter, faWhatsapp];
library.add(...icons);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { StarRatingModule } from 'angular-star-rating';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { WalkthroughPageModule } from './pages/walkthrough/walkthrough.module';

import 'hammerjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RegisterService } from './services/register-service';
import { EntityService } from './services/entity-service';
import { CameraService } from './services/camera-service';
import { ProductsService } from './services/products-service';
import { ModelsService } from './services/models-service';

import { Http, RequestOptions, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { Storage} from '@ionic/storage';
import { Crop } from '@ionic-native/crop/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

export function HttpLoaderFactory(http: HttpClient) { return new TranslateHttpLoader(http, './assets/i18n/', '.json'); }

export function authHttpServiceFactory(storage: Storage, http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
      // tokenName: 'id_token',
      // tokenGetter: () => storage.get('id_token'),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

export function provideStorage() {
  return new Storage({
      name: '_ionicstorage',
      storeName: '_ionicnearmekv',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
  });
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ImgFallbackModule,
    WalkthroughPageModule,
    IonicStorageModule.forRoot(),
    StarRatingModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    FileOpener,
    Camera,
    Facebook,
    HeaderColor,
    InAppBrowser,
    Geolocation,
    StatusBar,
    SocialSharing,
    SplashScreen,
    SafariViewController,
    RegisterService,
    EntityService,
    ProductsService,
    ModelsService,
    CameraService,
    Crop,
    JwtHelper,
    /*{provide: ErrorHandler, useClass: IonicErrorHandler},*/
    {
           provide: AuthHttp,
           useFactory: authHttpServiceFactory,
           deps: [Storage, Http, RequestOptions]
       },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
