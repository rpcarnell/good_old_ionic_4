import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { InfoWindowComponent } from './info-window/info-window';
import { NoResultsMessageComponent } from './no-results-message/no-results-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'angular-star-rating';
import { UploadBoxComponent } from './upload-box/upload-box.component';
import { PlaceCardComponent } from './place-card/place-card.component';
import { EntityCardComponent } from './entity-card/entity-card.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
	declarations: [
		InfoWindowComponent,
		NoResultsMessageComponent,
		UploadBoxComponent,
		PlaceCardComponent,
		EntityCardComponent
	],
	entryComponents: [
		InfoWindowComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		RouterModule,
		TranslateModule,
		StarRatingModule,
		LazyLoadImageModule
	],
	exports: [
		InfoWindowComponent,
		NoResultsMessageComponent,
		UploadBoxComponent,
		PlaceCardComponent,
		EntityCardComponent
	]
})
export class ComponentsModule {}
