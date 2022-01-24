import { Injectable } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ModalController } from '@ionic/angular';
import { UploadPage } from 'src/app/upload/upload.page';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  imageUrl: string = null;
  base64image: object = null;

  constructor(
    public photoService: PhotoService,
    private modalCtrl: ModalController
  ) {}

  takePicture() {
    this.photoService
      .takePicture()
      .then((image) => {
        console.log(image);
        this.base64image = image;
        this.launchUploadModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async launchUploadModal() {
    const modal = await this.modalCtrl.create({
      component: UploadPage,
      componentProps: {
        passedImage: this.base64image,
      },
    });
    modal.present();
  }
}
