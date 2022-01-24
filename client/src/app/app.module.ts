import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { ApiService } from './services/api.service';
import { GeoService } from './services/geo.service';
import { PhotoService } from './services/photo.service';
import { MenuComponent } from './components/menu/menu.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { UploadComponent } from './components/upload/upload.component';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx'; //TODO: remove

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LeaderboardComponent,
    UploadComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__tannder', // This is a local storage key for the entire map
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    ApiService,
    GeoService,
    PhotoService,
    Geolocation //TODO: remove
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
