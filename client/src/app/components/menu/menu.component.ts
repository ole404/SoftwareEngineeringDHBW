import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async openLeaderboard() {
    const modal = await this.modalController.create({
      component: LeaderboardComponent,
      cssClass: 'app-leaderboard',
    });
    return await modal.present();
  }

  async openUpload() {
    const modal = await this.modalController.create({
      component: UploadComponent,
      cssClass: 'app-upload',
    });
    return await modal.present();
  }
}
