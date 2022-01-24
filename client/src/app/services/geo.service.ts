import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor(private geolocation: Geolocation) {}

  getCurrentPosition() {
    return this.geolocation.getCurrentPosition();
  }
}
