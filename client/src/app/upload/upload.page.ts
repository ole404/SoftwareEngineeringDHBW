import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  passedImage: string = null;

  constructor(
    private navParams: NavParams,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.passedImage = this.navParams.get('passedImage');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
