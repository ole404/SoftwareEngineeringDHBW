import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { PhotoService } from '../services/photo.service';
import { ApiService } from '../services/api.service';
import { GeoService } from '../services/geo.service';

import { Tree } from '../interfaces/index';
import { Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
  treeLocations: Tree[] = [];
  loadingTrees = true;
  errorMsg = '';
  public map: Map;
  public zoom: number;

  constructor(
    public alertController: AlertController,
    public plt: Platform,
    public photoService: PhotoService,
    private api: ApiService,
    private geoService: GeoService
  ) {}

  public ngOnInit(): void {}

  ngOnDestroy() {
    if (!this.map) return;
    this.map.clearAllEventListeners();
    this.map.remove();
  }

  //ngAfterViewInit(): void{}
  ionViewDidLoad(): void {}
  ionViewDidEnter(): void {
    this.initMap();
  }

  addMarkers(map) {
    for (const element of this.treeLocations) {
      const nMarker = new marker([element.geo.lat, element.geo.lon])
        .bindPopup(
          '<strong>Hello world!</strong><br />I am ' + element.treeName,
          { maxWidth: 500 }
        )
        .addTo(map);
      console.log(nMarker);
    }
  }

  getLocations(map) {
    this.api.getTrees(10).subscribe(
      (body) => {
        this.treeLocations = body;
        this.loadingTrees = false;
        this.addMarkers(map);
      },
      (errorStatus: number) => {
        this.treeLocations = [];
        this.loadingTrees = false;
        this.errorMsg = this.api.getErrorMsg(errorStatus);
        this.errorAlert();
      }
    );
  }

  private async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: this.errorMsg,
      buttons: ['Okay'],
    });

    await alert.present();
  }

  private getGeo() {
    return new Promise<Geoposition | { coords: undefined }>((res) => {
      this.geoService
        .getCurrentPosition()
        .then((geo) => {
          res(geo);
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
          res({ coords: undefined });
        });
    });
  }
  private async initMap() {
    const { coords } = await this.getGeo();
    if (!coords) return;
    this.map = new Map('map').setView([coords.latitude, coords.longitude], 23);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.invalidateSize();

    const customMarkerIcon = icon({
      iconUrl: '', //TODO: add tree icon and add to marker()
      iconSize: [64, 64],
      popupAnchor: [0, -20],
    });

    this.getLocations(this.map);
  }
}
