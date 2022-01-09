import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  constructor(public photoService: PhotoService) {}
  ngOnInit() {}

  takePicture() {
    this.photoService.takePicture();
  }
}
