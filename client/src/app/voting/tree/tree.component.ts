import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Tree from 'src/app/interfaces/tree';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-voting-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input() tree: Tree;
  @Output() voteEvent = new EventEmitter();

  host = environment.backendApi; // necessary for getting tree images via <img src=""> tag

  openPreview = false; // Show image full-screen

  constructor() {}

  ngOnInit() {}

  dismisModal() {
    this.openPreview = false;
  }
}
