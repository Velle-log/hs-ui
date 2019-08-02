import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatToolbarModule, MatMenuModule, MatButtonModule, 
        MatGridListModule, MatSidenavModule, MatCardModule, MatTabsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatStepperModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthModalContent } from './shared/components/auth-modal/auth-modal.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { getSocialAuthConfig } from './config/app.config';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        // Operations
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
        HttpClientModule,

        // material components
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
      declarations: [
        AppComponent,
        HeaderComponent,
        AuthModalContent
      ],
      providers: [
        {
          provide: AuthServiceConfig,
          useFactory: getSocialAuthConfig,
        }
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Hire Smart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Hire Smart');
  });
});
