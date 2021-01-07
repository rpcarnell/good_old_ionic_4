import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EntityWorkPage } from './entity-work';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EntityWorkPage],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [EntityWorkPage]
})
export class EntityWorkPageModule {}