import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityShowPage } from './entity-show';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    EntityShowPage,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EntityShowPage
      }
    ])
  ],
})
export class EntityShowPageModule {}
