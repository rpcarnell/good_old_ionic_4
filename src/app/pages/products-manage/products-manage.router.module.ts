import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsManagePage } from './products-manage';
//import { AuthGuard } from '../services/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: 'models',
    children: [
      {
        path: 'manage',
        loadChildren: '../pages/models-manage/models-manage.module#ModelsManagePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManageRoutingModule {}