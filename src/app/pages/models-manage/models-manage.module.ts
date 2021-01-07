import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModelsManagePage } from './models-manage';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInPageModule } from '../sign-in/sign-in.module';
import { ModelDeleteModule } from '../model-delete/model-delete.module';
//import { ModelEditModule } from '../model-edit/model-edit.module';
//import { EntityManagePageModule } from '../entity-manage/entity-manage.module';
//import { EntitiesManagePageRoutingModule } from './entities-manage.router.module';

@NgModule({
  declarations: [
    ModelsManagePage,
 ],
  imports: [
    SignInPageModule,
    ModelDeleteModule,
    //ModelEditModule,
    SharedModule,
    FormsModule,
    //EntityManagePageModule,
    //EntitiesManagePageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ModelsManagePage
      }
    ])
  ],
})
export class ModelsManageModule {}
