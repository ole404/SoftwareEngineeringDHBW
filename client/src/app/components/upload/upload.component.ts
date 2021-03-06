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
  base64image: string = null; // Temporarely store the image local as base64string
  treeNameInput: string = null; // Input for Name of the tree
  lat = 0; // Geo Latitude
  lon = 0; // Geo Longitude

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

  /**
   * Run on init ->
   * 1. Ask user for camera and geo permission
   * 2. Open Camera -> Generall overlay so the upload modal can live under it
   * 3. Get lat & lon
   * On any error (close the camera, goes back, or reject permissions...) close this modal
   */
  async getPhotoAndGeo() {
    this.geoService
      .getCurrentPosition()
      .then(({ coords }) => {
        this.lat = coords.latitude;
        this.lon = coords.longitude;
        this.getPhoto();
      })
      .catch(async (error) => {
        if (error.code === 1) {
          const alert = await this.alertController.create({
            header: 'Cant access Location!',
            message: 'Please ensure you allowed the use of the GPS!',
            buttons: ['Okay'],
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Cant access Location!',
            message: 'Some weired error occured, dont know why :/ !',
            buttons: ['Okay'],
          });
          await alert.present();
        }
        this.dismiss();
      });
  }

  async getPhoto() {
    this.photoService
      .takePicture()
      .then((image) => {
        this.base64image = image.base64String;
      })
      .catch(async (error) => {
        if (error.message !== 'User cancelled photos app') {
          const alert = await this.alertController.create({
            header: 'Cant open Camera!',
            message: 'Please ensure you allowed the use of the Camera!',
            buttons: ['Okay'],
          });
          await alert.present();
        }
        this.dismiss();
      });
  }

  /**
   * Uploads the image with coordinates, user name and tree name.
   * On error -> Show error, then close
   * Else just close
   */
  async uploadItem() {
    const userName = await this.storage.get('name');
    const treeName = this.treeNameInput;
    if (!treeName) {
      const alert = await this.alertController.create({
        header: 'Wrong inputs!',
        message: 'Please give you Tree a name!',
        buttons: ['Okay'],
      });
      await alert.present();
      return false;
    }
    console.log(this.lon, this.lat);
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
          this.errorAlert(errorStatus);
        },
        complete: () => {
          window.location.reload();
        },
      });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private async errorAlert(errorStatus) {
    const errorMsg =
      errorStatus === 489
        ? 'It seems like you uploaded image shows no tree!'
        : this.api.getErrorMsg(errorStatus);
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: errorMsg,
      buttons: ['Okay'],
    });

    await alert.present();
  }
}
