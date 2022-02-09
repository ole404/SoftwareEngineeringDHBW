import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(public modalController: ModalController, public router: Router) {}

  ngOnInit() {}

  async openLeaderboard() {
    const modal = await this.modalController.create({
      component: LeaderboardComponent,
      cssClass: 'app-leaderboard',
      swipeToClose: true,
      animated: true,
      keyboardClose: true,
    });
    return await modal.present();
  }

  async openUpload() {
    const modal = await this.modalController.create({
      component: UploadComponent,
      cssClass: 'app-upload',
      swipeToClose: true,
      animated: true,
      keyboardClose: true,
    });
    return await modal.present();
  }
}
