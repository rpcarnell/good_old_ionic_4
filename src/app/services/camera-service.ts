
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';

@Injectable()
export class CameraService {
    constructor(
        private sheetCtrl: ActionSheetController,
        private camera: Camera
    ) { }

    async showSheet(callback) {
        const actionSheet = await this.sheetCtrl.create({
            //title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        this.pickPhoto(false)
                            .then(data => callback(null, data))
                            .catch(err => callback(err, null));
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.pickPhoto(true)
                            .then(data => callback(null, data))
                            .catch(err => callback(err, null));
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }
     pickPhoto(isCamera: boolean = false) {
        return this.camera.getPicture(this.makeOption(isCamera));
    }

    private makeOption(fromCamera) {
        return {
            quality: 100,
            sourceType: fromCamera ?
                this.camera.PictureSourceType.CAMERA :
                this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: true,
            correctOrientation: true,
            destinationType: 1, //this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
    }
}
