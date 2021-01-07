import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EntitiesManagePage } from './entities-manage';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInPageModule } from '../sign-in/sign-in.module';
import { DeleteEntityModule } from '../delete-entity/delete-entity.module';
import { EntityTitleModule } from '../entity-title/entity-title.module';
//import { EntityManagePageModule } from '../entity-manage/entity-manage.module';
//import { EntitiesManagePageRoutingModule } from './entities-manage.router.module';

@NgModule({
  declarations: [
    EntitiesManagePage,
 ],
  imports: [
    SignInPageModule,
    DeleteEntityModule,
    SharedModule,
    FormsModule,
    EntityTitleModule,
    //EntityManagePageModule,
    //EntitiesManagePageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: EntitiesManagePage
      }
    ])
  ],
})
export class EntitiesManagePageModule {}
