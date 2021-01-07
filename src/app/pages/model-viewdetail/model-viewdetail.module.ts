import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModelViewDetailPage } from './model-viewdetail';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelViewDetailDeleteModule } from '../model-viewdetaildelete/model-viewdetaildelete.module';

@NgModule({
  declarations: [ModelViewDetailPage],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModelViewDetailDeleteModule,
    RouterModule.forChild([
    {
      path: '',
      component: ModelViewDetailPage
    }
    ])
  ],
  entryComponents: [ModelViewDetailPage]
})
export class ModelViewDetailModule {}