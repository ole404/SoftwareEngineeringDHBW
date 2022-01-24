import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { PhotoService } from '../services/photo.service';
import { ApiService } from '../services/api.service';
import { GeoService } from '../services/geo.service';

import { Tree } from '../interfaces/index';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  treeLocations: Tree[] = [];

  constructor(
    public plt: Platform,
    public photoService: PhotoService,
    private api: ApiService,
    private geoService: GeoService
  ) {}

  ngOnInit() {}
  //ngAfterViewInit(): void{}
  ionViewDidLoad(): void {}
  ionViewDidEnter() {
    this.initMap();
  }
  takePicture() {
    this.photoService.takePicture();
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

  async getLocations(map) {
    this.treeLocations = await this.api.getTrees(0);
    console.log(this.treeLocations);
  }

  private async initMap() {
    const { coords } = await this.geoService.getCurrentPosition();
    const map = new Map('map').setView([coords.latitude, coords.longitude], 23); //TODO: maybe adapt zoom and starting location to trees

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.invalidateSize();

    const customMarkerIcon = icon({
      iconUrl: '', //TODO: add tree icon and add to marker()
      iconSize: [64, 64],
      popupAnchor: [0, -20],
    });

    this.getLocations(map);
  }
}
