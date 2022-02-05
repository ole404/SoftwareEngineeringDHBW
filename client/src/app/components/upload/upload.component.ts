import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Storage } from '@ionic/storage-angular';
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
  errorMsg = '';

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public photoService: PhotoService,
    private storage: Storage,
    private geoService: GeoService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.getPhotoAndGeo();
  }

  async getPhotoAndGeo() {
    await this.askPermissions();
    this.photoService
      .takePicture()
      .then((image) => {
        this.base64image = image.base64String;
      })
      .catch(this.dismiss.bind(this));
    this.geoService
      .getCurrentPosition()
      .then(({ coords }) => {
        console.log(coords);
        this.lat = coords.latitude;
        this.lon = coords.longitude;
      })
      .catch(this.dismiss.bind(this));
  }

  async uploadItem() {
    const userName = await this.storage.get('name');
    const treeName = this.treeNameInput;
    if (!treeName) {
      this.errorMsg = "please give your tree a name";
      this.errorAlert();
      return false;
    }
    this.api
      .postUpload({
        userName,
        treeName,
        geo: {
          lat: this.lat,
          lon: this.lon,
        },
        image: this.base64image as CameraResultType.Base64,
      })
      .subscribe({
        //complete: () => {console.log("upload completed"); this.dismiss.bind(this)}, 
        error: (errorStatus: number) => {
          console.log("an error occured")
          this.errorMsg = this.api.getErrorMsg(errorStatus);
          console.log("error: ", this.errorMsg)
          this.errorAlert();
        },
        complete: this.dismiss.bind(this), 
      });
  }

  async askPermissions() {
    console.log('TODO'); // TODO: implement permission handling
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: this.errorMsg,
      buttons: ['Okay'],
    });

    await alert.present();
  }
}
