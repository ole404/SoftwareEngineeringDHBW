import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  host = environment.backendApi;

  constructor(
    public modalController: ModalController,
    private api: ApiService
  ) {}

  async ngOnInit() {
    this.trees = await this.api.getTrees(10);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
