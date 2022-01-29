import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import Tree from '../interfaces/tree';
import { ApiService } from '../services/api.service';

enum Winner {
  left,
  right,
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const requestMock = async () => {
  await sleep(500);
  return 0;
};

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  @ViewChild('leaderboard') leaderboard;

  // Used for click validation, so the user can't click multiple times
  clickable = true;
  fade = false;
  winner: Winner;
  isWinnerLeft = false;
  isWinnerRight = false;

  treeLeft: Tree;
  treeRight: Tree;

  constructor(public routerOutlet: IonRouterOutlet, private api: ApiService) {}

  ngOnInit() {
    this.api.getNextTrees().then(this.resetView.bind(this));
  }

  // User selected left tree
  onLeft() {
    if (!this.verify()) return;
    this.clickable = false;
    this.winner = Winner.left;
    // TODO: Api Post here
    this.afterSelect();
  }

  // User selected right tree
  onRight() {
    if (!this.verify()) return;
    this.clickable = false;
    this.winner = Winner.right;
    // TODO: Api Post here
    this.afterSelect();
  }

  // Checks if user already selected a tree
  verify() {
    return this.clickable;
  }

  // User selected any tree -> Make animations and reset view after 2 seconds
  afterSelect() {
    // TODO: Start getting next trees here
    this.isWinnerLeft = this.winner === Winner.left;
    this.isWinnerRight = this.winner === Winner.right;

    const winnerId = this.isWinnerLeft ? this.treeLeft.id : this.treeRight.id;
    const loserId = this.isWinnerLeft ? this.treeRight.id : this.treeLeft.id;

    this.api.postVote(winnerId, loserId).subscribe(() => {
      this.api.getNextTrees().then(this.resetView.bind(this));
    });
  }

  // Reset everyting and query new stuff
  resetView({ treeLeft, treeRight }: { treeLeft: Tree; treeRight: Tree }) {
    if (!treeLeft || !treeRight) return 0;
    this.fade = true;

    const fadeAnimationLength = 300;
    const transformAnimationLength = 500;

    setTimeout(
      (() => {
        this.winner = undefined;
        this.isWinnerLeft = false;
        this.isWinnerRight = false;
        this.treeLeft = treeLeft;
        this.treeRight = treeRight;
      }).bind(this),
      fadeAnimationLength
    );

    setTimeout(
      (() => {
        this.clickable = true;
        this.fade = false;
      }).bind(this),
      fadeAnimationLength + transformAnimationLength
    );
  }
}
