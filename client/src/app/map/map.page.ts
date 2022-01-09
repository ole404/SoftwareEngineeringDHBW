import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Map, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  constructor(public plt: Platform) {}
  ngOnInit() {}
  //ngAfterViewInit(): void{}
  //ionViewDidLoad(): void{}
  ionViewDidEnter() {
    this.initMap();
  }
  private initMap() {
    const map = new Map('map').setView([42.380098, -71.116629], 23); //TODO: maybe adapt zoom and starting location to trees

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.invalidateSize();

    const customMarkerIcon = icon({
      iconUrl: '', //TODO: add tree icon and add with marker()
      iconSize: [64, 64],
      popupAnchor: [0, -20],
    });
  }
}
