import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './pages/landing.page';
import { LandingRoutingModule } from './landing-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatMenuModule, MatButtonModule, MatGridListModule,
  MatSidenavModule, MatCardModule, MatTabsModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
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
  ],
  exports: [
    LandingComponent
  ],
})
export class LandingModule { }
