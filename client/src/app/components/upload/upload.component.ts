import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Storage } from '@ionic/storage-angular';
import axios from 'axios';
import { GeoService } from '../../services/geo.service';
import { ApiService } from 'src/app/services/api.service';
import { CameraResultType } from '@capacitor/camera';

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
    private geoService: GeoService,
    private apiServer: ApiService
  ) {}

  async ngOnInit() {
    this.photoService
      .takePicture()
      .then((image) => {
        console.log(image);
        this.base64image = image.base64String;
      })
      .catch(((err) => this.dismiss()).bind(this));
    const { coords } = await this.geoService.getCurrentPosition();
    this.lat = coords.latitude;
    this.lon = coords.longitude;
  }

  async uploadItem() {
    const userName = await this.storage.get('name');
    const treeName = this.treeNameInput;
    if (!treeName) return false;
    this.apiServer
      .postUpload({
        userName,
        treeName,
        geo: {
          lat: this.lat,
          lon: this.lon,
        },
        image: this.base64image as CameraResultType.Base64,
      })
      .subscribe(this.dismiss.bind(this));
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
