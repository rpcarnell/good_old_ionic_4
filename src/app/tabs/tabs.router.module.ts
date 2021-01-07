import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from '../services/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '1',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/entities/entities.module#EntitiesPageModule'
          },
          {
            path: 'entityshow/:id',
            loadChildren: '../pages/entity-show/entity-show.module#EntityShowPageModule'
          },
        ]
      },
      {
        path: 'privates',
        children: [
          {
            path: '',
            loadChildren: '../pages/privates/privates.module#PrivatesPageModule'
          },
          {
              path: 'EntitiesManage',
              loadChildren: '../pages/entities-manage/entities-manage.module#EntitiesManagePageModule'
          },
          {
            path: 'EntitiesManage/EntityManage/:id',
            loadChildren: '../pages/entity-manage/entity-manage.module#EntityManagePageModule'
          },
          {
              path: 'EntitiesManage/EntityTitle/:id',
              loadChildren: '../pages/entitytitle-manage/entitytitle-manage.module#EntityManageTitleModule'
          },

          {
            path: 'EntitiesManage/Products/:id',
            loadChildren: '../pages/products-manage/products-manage.module#ProductsManagePageModule'
          },
          {
            path: 'EntitiesManage/Products/:id/models/:productId',
            loadChildren: '../pages/models-manage/models-manage.module#ModelsManageModule'
          }
          ,
          {
            path: 'EntitiesManage/Products/:id/models/:productId/add',
            loadChildren: '../pages/model-add/model-add.module#ModelAddModule'
          },
          {
            path: 'EntitiesManage/Products/:id/models/:productId/edit/:modelId',
            loadChildren: '../pages/model-edit/model-edit.module#ModelEditModule'
          },
          {
            path: 'EntitiesManage/Products/:id/models/:productId/viewmodeldetail/:modelId',
            loadChildren: '../pages/model-manageviewdetail/model-manageviewdetail.module#ModelManageViewDetailModule'
          },
          {
            path: 'EntitiesManage/Products/:id/models/:productId/viewmodeldetail/:modelId/add',
            loadChildren: '../pages/model-viewdetail/model-viewdetail.module#ModelViewDetailModule'
          },
          {
            path: 'EntitiesManage/Products/:id/models/:productId/viewmodeldetail/:modelId/edit/:modelDetailId',
            loadChildren: '../pages/model-viewdetailedit/model-viewdetailedit.module#ModelViewDetailEditModule'
          }
        ]
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            loadChildren: '../pages/post-list/post-list.module#PostListPageModule'
          },
          {
            path: 'places/:id/reviews',
            loadChildren: '../pages/review-list/review-list.module#ReviewListPageModule'
          },
          {
            path: 'places/:id/:slug/reviews',
            loadChildren: '../pages/review-list/review-list.module#ReviewListPageModule'
          },
          {
            path: 'places/:id',
            loadChildren: '../pages/place-detail/place-detail.module#PlaceDetailPageModule'
          },
          {
            path: 'places/:id/:slug',
            loadChildren: '../pages/place-detail/place-detail.module#PlaceDetailPageModule'
          },
          {
            path: ':id',
            loadChildren: '../pages/post-detail/post-detail.module#PostDetailPageModule'
          },
          {
            path: ':id/:slug',
            loadChildren: '../pages/post-detail/post-detail.module#PostDetailPageModule'
          },
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../pages/profile/profile.module#ProfilePageModule'
          },
          {
            path: 'proof',
            loadChildren: '../pages/proof/proof.module#ProofPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/1/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/1/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}