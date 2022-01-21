import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { VotingPageRoutingModule } from './voting-routing.module';

import { LeaderboardPage } from './leaderboard/leaderboard.page';
import { VotingPage } from './voting.page';

import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VotingPageRoutingModule],
  declarations: [VotingPage, LeaderboardPage, TreeComponent],
  providers: [Geolocation],
})
export class VotingPageModule {}
