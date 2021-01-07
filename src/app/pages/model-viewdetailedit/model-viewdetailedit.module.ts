import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModelViewDetailEditPage } from './model-viewdetailedit';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
//import { ModelViewDetailDeleteModule } from '../model-viewdetaildelete/model-viewdetaildelete.module';

@NgModule({
  declarations: [ModelViewDetailEditPage],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
    {
      path: '',
      component: ModelViewDetailEditPage
    }
    ])
  ],
  entryComponents: [ModelViewDetailEditPage]
})
export class ModelViewDetailEditModule {}