import { Component, OnInit } from '@angular/core';
import Tree from '../interfaces/tree';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  treeLeft: Tree = {
    id: 'abcd',
    userName: 'Tobias',
    treeName: 'Peter Lightning',
    eloRating: 1020,
    geo: {
      lat: 42.380098,
      long: -71.116629,
    },
  };
  wonLeft = false;
  lostLeft = false;

  treeRight: Tree = {
    id: 'njaslkd',
    userName: 'Hans',
    treeName: 'Hansis Schatz',
    eloRating: 1201,
    geo: {
      lat: 42.380198,
      long: -71.116529,
    },
  };
  wonRight = false;
  lostRight = false;
  constructor() {}

  ngOnInit() {}

  onLeft() {
    this.wonLeft = true;
    this.lostRight = true;
    setTimeout(
      (() => {
        this.resetView();
      }).bind(this),
      3000
    );
  }

  onRight() {
    this.wonRight = true;
    this.lostLeft = true;
    setTimeout(
      (() => {
        this.resetView();
      }).bind(this),
      3000
    );
  }

  resetView() {
    this.wonLeft = false;
    this.wonRight = false;
    this.lostLeft = false;
    this.lostRight = false;
  }
}
