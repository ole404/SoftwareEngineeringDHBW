import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotingPageRoutingModule } from './voting-routing.module';

import { VotingPage } from './voting.page';

import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VotingPageRoutingModule],
  declarations: [VotingPage, TreeComponent],
})
export class VotingPageModule {}
