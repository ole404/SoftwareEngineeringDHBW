import { Component, Input, OnInit } from '@angular/core';
import Tree from 'src/app/interfaces/tree';

@Component({
  selector: 'app-voting-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input() tree: Tree;
  @Input() won: boolean;
  @Input() lost: boolean;
  constructor() {}

  ngOnInit() {}
}
