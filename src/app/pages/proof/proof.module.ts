import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProofPage } from './proof.page';

import { SharedModule } from '../../shared.module';//translator is here

const routes: Routes = [
  {
    path: '',
    component: ProofPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProofPage]
})
export class ProofPageModule {}

/*
 import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { ParseFile } from 'src/app/services/parse-file-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})
export class UploadBoxComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() text: string;

  @Output('onFileUploaded')

  private eventFileUpload: EventEmitter<ParseFile> = new EventEmitter<ParseFile>();
  
  public parseFile: any;
  public isUploading: boolean = false;

  constructor(private platform: Platform,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService) { }

  ngOnInit() {
  }

  onBoxTouched() {
    if (this.platform.is('cordova')) {
      this.presentActionSheet();
    } else {
      this.fileInput.nativeElement.click();
    }
  }
**/