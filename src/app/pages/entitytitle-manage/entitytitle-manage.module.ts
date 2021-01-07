import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EntityManageTitlePage } from './entitytitle-manage';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntityManageTitlePage,
 ], imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EntityManageTitlePage
      }
    ])
  ],
  entryComponents: [EntityManageTitlePage]
})
export class EntityManageTitleModule {}