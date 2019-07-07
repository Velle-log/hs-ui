import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatMenuModule, MatButtonModule, MatGridListModule,
        MatSidenavModule, MatCardModule, MatTabsModule, MatDialogModule, MatFormFieldModule, MatFormFieldControl, MatInputModule, MatDividerModule } from '@angular/material';
import { HeaderComponent } from './shared/components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModalContent } from './shared/components/auth-modal/auth-modal.component';

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
    MatDividerModule
  ],
  entryComponents: [
    AuthModalContent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
