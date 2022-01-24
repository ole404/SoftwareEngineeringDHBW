import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Tree from '../../interfaces/tree';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const mockTrees = async () => {
  await sleep(500);
  return [
    {
      id: 'abcd',
      treeName: 'Bayern',
      userName: 'Söder Markus',
      eloRating: 1243,
      geo: {
        lat: 34.124,
        lon: -12.09,
      },
    },
    {
      id: 'abcdasd',
      treeName: 'Cherie',
      userName: 'Lisa (24)',
      eloRating: 123,
      geo: {
        lat: 32.176,
        lon: -12.023,
      },
    },
    {
      id: 'abasdcd',
      treeName: 'Anna Zugan',
      userName: 'B. Stinson',
      eloRating: 1643,
      geo: {
        lat: 35.114,
        lon: -13.19,
      },
    },
  ] as Tree[];
};

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  trees: Tree[];

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    mockTrees().then((trees) => (this.trees = trees));
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
