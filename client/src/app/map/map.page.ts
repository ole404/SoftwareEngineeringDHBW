import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { PhotoService } from '../services/photo.service';
import axios from 'axios';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  treeLocations = [];

  constructor(public plt: Platform, public photoService: PhotoService) {}

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

  getLocations(map) {
    axios
      .get<object, any>('/trees?max=0')
      .then((response) => {
        // handle success
        this.treeLocations = response;
        this.addMarkers(map);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // alway executed
        console.log('always executed');
      });
  }

  private initMap() {
    const map = new Map('map').setView([42.380098, -71.116629], 23); //TODO: maybe adapt zoom and starting location to trees

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
