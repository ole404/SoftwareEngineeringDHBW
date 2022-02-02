import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
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

const fadeAnimationLength = 300;
const transformAnimationLength = 500;
@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  @ViewChild('leaderboard') leaderboard;

  fade = true; // Sets opacity of cards to 0
  winner: Winner;
  isWinnerLeft = false;
  isWinnerRight = false;

  treeLeft: Tree;
  treeRight: Tree;
  loadingTrees = true;
  errorMsg = '';
  // Used for click validation, so the user can't click multiple times
  clickable = false;
  animate = false;

  constructor(
    public routerOutlet: IonRouterOutlet,
    private api: ApiService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.fetch();
  }

  reset() {
    this.treeLeft = undefined;
    this.treeRight = undefined;
    this.loadingTrees = true;
    this.errorMsg = '';
    this.clickable = false;
    this.fade = true;
    this.isWinnerLeft = false;
    this.isWinnerRight = false;
    this.winner = undefined;
  }

  async fetch() {
    await sleep(
      this.animate ? fadeAnimationLength + transformAnimationLength : 0
    );
    this.reset();
    this.api.getNextTrees().subscribe(
      (body) => {
        this.treeLeft = body.treeLeft;
        this.treeRight = body.treeRight;
        this.loadingTrees = false;
        this.inAnimation();
      },
      (errorStatus: number) => {
        this.loadingTrees = false;
        console.log(errorStatus);
        if (errorStatus === 579) {
          this.errorMsg =
            'The database has not enough Trees! Please upload images first (The plus button in the bottom right menu)';
        } else {
          this.errorMsg = this.api.getErrorMsg(errorStatus);
        }
        this.errorAlert();
      }
    );
  }
  // User selected left tree
  onLeft() {
    this.vote(Winner.left);
  }
  // User selected right tree
  onRight() {
    this.vote(Winner.right);
  }

  vote(winner: Winner) {
    if (!this.verify()) return;
    this.clickable = false;
    this.winner = winner;

    const winnerId =
      this.winner === Winner.left ? this.treeLeft.id : this.treeRight.id;
    const loserId =
      this.winner === Winner.left ? this.treeRight.id : this.treeLeft.id;

    this.api.postVote(winnerId, loserId).subscribe(
      () => {
        this.fetch();
      },
      (errorStatus: number) => {
        this.loadingTrees = false;
        if (errorStatus === 579) {
          this.errorMsg =
            'The database has not enough Trees! Please upload images first (The plus button in the bottom right menu)';
        } else {
          this.errorMsg = this.api.getErrorMsg(errorStatus);
        }
        this.errorAlert();
      }
    );
    this.outAnimation();
  }

  inAnimation() {
    this.animate = true;
    this.fade = false;
    setTimeout(() => {
      this.animate = false;
      this.clickable = true;
    }, fadeAnimationLength);
  }

  outAnimation() {
    this.animate = true;
    this.isWinnerLeft = this.winner === Winner.left;
    this.isWinnerRight = this.winner === Winner.right;

    setTimeout(() => {
      this.fade = true;
    }, transformAnimationLength);

    setTimeout(() => {
      this.isWinnerRight = false;
      this.isWinnerLeft = false;
      this.animate = false;
    }, fadeAnimationLength + transformAnimationLength);
  }

  // Checks if user already selected a tree
  private verify() {
    return this.clickable;
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
