import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EntityManagePage } from './entity-manage';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInPageModule } from '../sign-in/sign-in.module';
import { DeleteEntityModule } from '../delete-entity/delete-entity.module';
//import { EntityManagePageModule } from '../entity-manage/entity-manage.module';
import { EntityTitleModule } from '../entity-title/entity-title.module';

@NgModule({
  declarations: [
    EntityManagePage,
 ],
  imports: [
    SignInPageModule,
    DeleteEntityModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntityTitleModule,
    //EntityManagePageModule,
    RouterModule.forChild([
      {
        path: '',
        component: EntityManagePage
      }
    ])
  ],
})
export class EntityManagePageModule {}

