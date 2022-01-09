import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  constructor(public photoService: PhotoService) {}

  ngOnInit() {}

  takePicture() {
    this.photoService.takePicture();
  }
}
