import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import axios from 'axios';
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  passedImage = null;
  imageAsString: string = null;
  treeNameInput: string = null;
  lat = 0;
  lon = 0;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private storage: Storage,
    private geolocation: Geolocation
  ) {}

  async ngOnInit() {
    this.passedImage = this.navParams.get('passedImage');
    this.imageAsString = this.passedImage.base64String;

    const { coords } = await this.geolocation.getCurrentPosition();
    this.lat = coords.latitude;
    this.lon = coords.longitude;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async uploadItem() {
    const username = await this.storage.get('name');
    const treename = await this.treeNameInput;
    if (!treename) return false;
    if (!this.lat || !this.lon) return false;
    axios
      .post('/trees/upload', {
        userName: username,
        treeName: treename,
        geo: {
          lat: this.lat,
          lon: this.lon,
        },
        image: this.imageAsString,
      })
      .then((response) => {
        console.log(response);
        this.closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
