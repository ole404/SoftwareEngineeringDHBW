/**
 * Important note on won & lost states:
 * Before the user selected the winning tree, won and lost (for left and right) are both false, since a tree has neither lost nor won yet. After the user selects a tree, won and lost variables will be set respectively. They are bound to the tree component. The tree component use these to render the gifs.
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Tree from '../interfaces/tree';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  @ViewChild('left') leftComponent;
  @ViewChild('right') rightComponent;

  // Used for click validation, so the user can't click multiple times
  clickable = true;

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
  // Won and lost (see note above) bound to tree component
  wonLeft = false;
  lostLeft = false;

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
  constructor(public routerOutlet: IonRouterOutlet) {}

  ngOnInit() {}

  // User selected left tree
  onLeft() {
    if (!this.verify()) return;
    this.clickable = false;
    this.wonLeft = true;
    this.lostRight = true;
    // TODO: Api Post here
    this.afterSelect();
  }

  // User selected right tree
  onRight() {
    if (!this.verify()) return;
    this.clickable = false;
    this.wonRight = true;
    this.lostLeft = true;
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
    setTimeout(
      (() => {
        this.animationOut();
      }).bind(this),
      1000
    );
    setTimeout(
      (() => {
        this.resetView();
      }).bind(this),
      2000
    );
  }

  // Start fade animation
  animationOut() {
    this.leftComponent.fade = true;
    this.rightComponent.fade = true;
  }

  // Reset everyting and query new stuff
  resetView() {
    // TODO: update trees from GET Request from 'after Select'
    this.clickable = true;
    this.wonLeft = false;
    this.wonRight = false;
    this.lostLeft = false;
    this.lostRight = false;
    this.leftComponent.fade = false;
    this.rightComponent.fade = false;
  }
}
