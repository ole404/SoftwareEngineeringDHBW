import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { UploadPage } from '../upload/upload.page';
import Tree from '../interfaces/tree';

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

  imageUrl: string = null;
  base64image: object = null;

  // Used for click validation, so the user can't click multiple times
  clickable = true;
  fade = false;
  winner: Winner;
  isWinnerLeft = false;
  isWinnerRight = false;

  // Mock a tree object.
  // TODO: query this from api
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

  // TODO: query this from api
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

  // Won and lost (see note above) bound to tree component
  wonRight = false;
  lostRight = false;

  constructor(
    public routerOutlet: IonRouterOutlet,
    public photoService: PhotoService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  openLeaderboard() {
    this.leaderboard.openModal = true;
  }

  takePicture() {
    this.photoService
      .takePicture()
      .then((image) => {
        console.log(image);
        this.base64image = image;
        this.launchUploadModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async launchUploadModal() {
    const modal = await this.modalCtrl.create({
      component: UploadPage,
      componentProps: {
        passedImage: this.base64image,
      },
    });
    modal.present();
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

    requestMock().then(() => {
      this.resetView();
    });
  }

  // Reset everyting and query new stuff
  resetView() {
    // TODO: update trees from GET Request from 'after Select'
    // This simulates wait for GET Request
    this.fade = true;

    const fadeAnimationLength = 300;
    const transformAnimationLength = 500;

    setTimeout(
      (() => {
        this.winner = undefined;
        this.isWinnerLeft = this.winner === Winner.left;
        this.isWinnerRight = this.winner === Winner.right;
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
