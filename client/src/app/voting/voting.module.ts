import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotingPageRoutingModule } from './voting-routing.module';

import { LeaderboardPage } from './leaderboard/leaderboard.page';
import { VotingPage } from './voting.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VotingPageRoutingModule],
  declarations: [VotingPage, LeaderboardPage],
})
export class VotingPageModule {}
