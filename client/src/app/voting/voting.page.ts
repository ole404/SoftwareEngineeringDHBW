import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import Tree from '../interfaces/tree';
import { ApiService } from '../services/api.service';

enum Winner {
  left,
  right,
}

/**
 * Sleep function similar to setTimeout but in an async/await fashion
 * ```js
 * // some code goes here
 * await sleep(2000)
 * // after 2 seconds code runs here
 * ```
 *
 * @param ms sleep time in ms
 * @returns void
 */
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// These must be equal to the animation lengths defined in the .scss
const fadeAnimationLength = 300;
const transformAnimationLength = 500;
@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  @ViewChild('leaderboard') leaderboard;

  treeLeft: Tree;
  treeRight: Tree;

  winner: Winner;
  isWinnerLeft = false;
  isWinnerRight = false;

  fade = true; // Sets opacity of cards to 0
  loadingTrees = true; // Used to show a progress bar
  clickable = false; // Used for click validation, so the user can't click multiple times
  animate = false; // Used to time animations, blocks new animation if the old one wasn't finished

  constructor(
    public routerOutlet: IonRouterOutlet,
    private api: ApiService,
    public alertController: AlertController
  ) {}

  /**
   * Overall Flow of this component:
   * - fetch() -> In-Animation / Show Error
   * - _User votes_ -> vote() -> Out-Animation
   * - postVote() -> Reset / Show Error
   */
  ngOnInit() {
    this.fetch();
  }

  reset() {
    this.treeLeft = undefined;
    this.treeRight = undefined;
    this.loadingTrees = true;
    this.clickable = false;
    this.fade = true;
    this.isWinnerLeft = false;
    this.isWinnerRight = false;
    this.winner = undefined;
  }

  async fetch() {
    // Wait for old animation to stop
    await sleep(
      this.animate ? fadeAnimationLength + transformAnimationLength : 0
    );
    // Reset state
    this.reset();
    // Fetch: get two random trees from server
    this.api.getNextTrees().subscribe(
      (body) => {
        // On success: set left/right tree and start fade-in animation
        this.treeLeft = body.treeLeft;
        this.treeRight = body.treeRight;
        this.loadingTrees = false;
        this.inAnimation();
      },
      (errorStatus: number) => {
        // On error: get error message based on response-status and show in dialog
        this.loadingTrees = false;
        this.errorAlert(errorStatus);
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

  // Voting logic
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
        // On success: reset everything and start fetching new trees
        this.fetch();
      },
      (errorStatus: number) => {
        // On error: get error message based on response-status and show in dialog
        this.loadingTrees = false;
        this.errorAlert(errorStatus);
      }
    );
    this.outAnimation();
  }

  /**
   * Starts fade-in animation after fetch
   */
  inAnimation() {
    this.animate = true;
    this.fade = false;
    setTimeout(() => {
      this.animate = false;
      this.clickable = true;
    }, fadeAnimationLength);
  }

  /**
   * Starts out-animation after user voted
   */
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

  // Shows a pre-defined error message in a dialog
  private async errorAlert(errorStatus) {
    const errorMsg =
      errorStatus === 579
        ? 'The database has not enough Trees! Please upload images first (The plus button in the bottom right menu)'
        : this.api.getErrorMsg(errorStatus);

    const alert = await this.alertController.create({
      header: 'Ups!',
      message: errorMsg,
      buttons: ['Okay'],
    });

    await alert.present();
  }
}
