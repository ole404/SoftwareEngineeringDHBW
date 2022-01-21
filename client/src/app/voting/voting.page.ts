import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { UploadPage } from '../upload/upload.page';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  imageUrl: string = null;
  base64image: object = null;

  constructor(
    public photoService: PhotoService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

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
    // now here there should be no errors from above side after we put aeait before modal create
    // const { data, role } = await modal.onWillDismiss();
  }
}
