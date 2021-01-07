import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModelManageViewDetailPage } from './model-manageviewdetail';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInPageModule } from '../sign-in/sign-in.module';
import { ModelViewDetailDeleteModule } from '../model-viewdetaildelete/model-viewdetaildelete.module';

@NgModule({
  declarations: [ModelManageViewDetailPage],
  imports: [
    SignInPageModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModelViewDetailDeleteModule,
    RouterModule.forChild([
    {
      path: '',
      component: ModelManageViewDetailPage
    }
    ])
  ],
  entryComponents: [ModelManageViewDetailPage]
})
export class ModelManageViewDetailModule {}