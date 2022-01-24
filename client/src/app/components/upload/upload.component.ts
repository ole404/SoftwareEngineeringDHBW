import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Storage } from '@ionic/storage-angular';
import axios from 'axios';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx'; //TODO: replace with Geoservice

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  base64image: string = null;
  treeNameInput: string = null;
  lat = 0;
  lon = 0;

  constructor(
    public modalController: ModalController,
    public photoService: PhotoService,
    private storage: Storage,
    private geolocation: Geolocation
  ) {}

  async ngOnInit() {
    this.photoService.takePicture()
    .then((image) => {
      console.log(image);
      this.base64image = image.base64String;
    })
    .catch(
      ((err) => {
        this.dismiss();
      }).bind(this)
    );
    const { coords } = await this.geolocation.getCurrentPosition(); //TODO: replace with Geoservuce
    this.lat = coords.latitude;
    this.lon = coords.longitude;
  }

  async uploadItem() {
    const username = await this.storage.get('name');
    const treename = await this.treeNameInput;
    if (!treename) return false;
    axios //todo: replace with api service
      .post('/trees/upload', {
        userName: username,
        treeName: treename,
        geo: {
          lat: this.lat,
          lon: this.lon,
        },
        image: this.base64image,
      })
      .then((response) => {
        console.log(response);
        this.dismiss()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
