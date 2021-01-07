import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
 // { path: '', loadChildren: './products-manage/products-manage.module#ProductsManagePageModule' },
  //{ path: 'usercontact', loadChildren: './usercontact/usercontact.module#UsercontactPageModule' },
  //{ path: 'proof', loadChildren: './proof/proof.module#ProofPageModule' },
 // { path: 'signin', loadChildren: './pages/sign-in/sign-in.' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'corrected'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
