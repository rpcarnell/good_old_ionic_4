import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivatesPage } from './privates';
import { SharedModule } from '../../shared.module';
import { SignInPageModule } from '../sign-in/sign-in.module';

import { EntityAddPageModule } from '../entity-add/entity-add.module';
import { EntityManagePageModule } from '../entity-manage/entity-manage.module';
//import { EntitiesManagePageModule } from '../entities-manage/entities-manage.module';
import { EntityWorkPageModule } from '../entity-work/entity-work.module';
import { EntityInvoicePageModule } from '../entity-invoice/entity-invoice.module';
import { EntityStudyPageModule } from '../entity-study/entity-study.module';

@NgModule({
  declarations: [
    PrivatesPage,
  ],
  imports: [
    SharedModule,
    SignInPageModule,
    EntityWorkPageModule,
    //EntityManagePageModule,
    EntityAddPageModule,
    EntityInvoicePageModule,
    EntityStudyPageModule,
    //EntitiesManagePageModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrivatesPage
      }
    ])
  ]
})
export class PrivatesPageModule {}
