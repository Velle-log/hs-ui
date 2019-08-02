import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatMenuModule, MatButtonModule, MatGridListModule,
        MatSidenavModule, MatCardModule, MatTabsModule, MatDialogModule, 
        MatFormFieldModule, MatInputModule, MatDividerModule, MatStepperModule, 
        MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { HeaderComponent } from './shared/components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModalContent } from './shared/components/auth-modal/auth-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { getSocialAuthConfig } from './config/app.config';
import { HttpClientModule } from '@angular/common/http';

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

    // Operations
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,

    // Material Component
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
    MatStepperModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  entryComponents: [
    AuthModalContent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getSocialAuthConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
