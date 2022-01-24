import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    public photoService: PhotoService
  ) {}

  async ngOnInit() {
    this.photoService.takePicture().catch(
      ((err) => {
        this.dismiss();
      }).bind(this)
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
