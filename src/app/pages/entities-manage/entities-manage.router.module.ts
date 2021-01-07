import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntitiesManagePage } from './entities-manage';
import { AuthGuard } from '../../services/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EntitiesManagePage,
    children: [
      {
        path: 'entitymanage',
        children: [
          {
            path: ':id',
            loadChildren: '../entity-manage/entity-manage.module#EntityManagePageModule'
          }
         ]
      }/*,
      { //EntitiesManage/EntityTitle/:id'
        path: 'entitymanage',
        children: [
          {
            path: ':id',
            loadChildren: '../entity-manage/entity-manage.module#EntityManagePageModule'
          }
         ]
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesManagePageRoutingModule {}