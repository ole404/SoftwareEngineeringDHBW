import { Component, Input, OnInit } from '@angular/core';
import Tree from 'src/app/interfaces/tree';

@Component({
  selector: 'app-voting-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  // Binds a tree and weather this tree has won or lost (or neither, then both are false)
  @Input() tree: Tree;
  @Input() won: boolean;
  @Input() lost: boolean;

  fade = false;
  constructor() {}

  ngOnInit() {}
}
