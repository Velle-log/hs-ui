import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './pages/challenges.page';
import { ChallengesRoutingModule } from './challenges-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatMenuModule, MatButtonModule, MatGridListModule,
  MatSidenavModule, MatCardModule, MatTabsModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ChallengesComponent
  ],
  imports: [
    CommonModule,
    ChallengesRoutingModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule
  ]
})
export class ChallengesModule { }
