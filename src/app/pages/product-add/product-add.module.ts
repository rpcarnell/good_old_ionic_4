import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductAdd } from './product-add';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductAdd],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ProductAdd]
})
export class ProductAddModule {}