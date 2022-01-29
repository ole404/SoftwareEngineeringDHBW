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
  trees: Tree[];
  loadingTrees = true;
  errorMsg = '';
  host = environment.backendApi;

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
        this.errorMsg = this.api.getErrorMsg(errorStatus);
        this.errorAlert();
      }
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: this.errorMsg,
      buttons: ['Okay'],
    });

    await alert.present();
  }
}
