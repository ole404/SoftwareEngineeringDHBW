import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor(private geolocation: Geolocation) {}

  /**
   * Forward to geolocation.getCurrentPosition
   *
   * @param options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
   * @returns Returns a Promise that resolves with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or rejects with an error.
   */
  getCurrentPosition() {
    return this.geolocation.getCurrentPosition();
  }
}
