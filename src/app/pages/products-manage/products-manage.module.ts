import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductsManagePage } from './products-manage';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDeleteModule } from '../product-delete/product-delete.module';
import { ProductAddModule } from '../product-add/product-add.module';
import { ProductEditModule } from '../product-edit/product-edit.module';
//import { ModelsManageModule } from '../models-manage/models-manage.module';
//import { ProductsManageRoutingModule } from './products-manage.router.module';
/*
import { ModelDeleteModule } from '../model-delete/model-delete.module';
import { ModelAddModule } from '../model-add/model-add.module';
import { ModelEditModule } from '../model-edit/model-edit.module';
import { ModelViewDetailModule } from '../model-viewdetail/model-viewdetail.module';*/

@NgModule({
  declarations: [
    ProductsManagePage,
   // ModelsManagePage
 ], imports: [
   // ModelsManageModule,
    ProductDeleteModule,
    ProductEditModule,
    ProductAddModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
   // ModelAddModule, ModelEditModule, ModelViewDetailModule,
   // ModelDeleteModule,//we put it here because we are also including models here
   // ProductsManageRoutingModule,
    RouterModule.forChild([
       {
        path: '',
        component: ProductsManagePage,
      }
    ])
  ],
  entryComponents: [ProductsManagePage]
})
export class ProductsManagePageModule {}