import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import Tree from '../../interfaces/tree';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  trees: Tree[] = [
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
  ];

  openModal = false;

  constructor() {}

  ngOnInit(): void {}

  dismisModal() {
    this.openModal = false;
  }
}
