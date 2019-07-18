import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatMenuModule, MatButtonModule, MatGridListModule,
        MatSidenavModule, MatCardModule, MatTabsModule, MatDialogModule, MatFormFieldModule, MatFormFieldControl, MatInputModule, MatDividerModule, MatStepperModule } from '@angular/material';
import { HeaderComponent } from './shared/components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModalContent } from './shared/components/auth-modal/auth-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthModalContent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatStepperModule
  ],
  entryComponents: [
    AuthModalContent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
