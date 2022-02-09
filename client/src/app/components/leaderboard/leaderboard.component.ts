import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { environment } from '../../../environments/environment';

import { ApiService } from 'src/app/services/api.service';
import Tree from '../../interfaces/tree';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  trees: Tree[]; // Best 10 trees
  loadingTrees = true; // Weather progress-bar (loading animation) should be shown
  host = environment.backendApi; // necessary for getting tree images via <img src=""> tag

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.api.getTrees(10).subscribe(
      (body) => {
        this.trees = body;
        this.loadingTrees = false;
      },
      (errorStatus: number) => {
        this.trees = undefined;
        this.loadingTrees = false;
        this.errorAlert(errorStatus);
      }
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private async errorAlert(errorStatus) {
    const errorMsg = this.api.getErrorMsg(errorStatus);
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: errorMsg,
      buttons: ['Okay'],
    });

    await alert.present();
  }
}
