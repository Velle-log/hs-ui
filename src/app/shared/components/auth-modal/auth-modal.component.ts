import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HSAuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GitHubLoginProvider } from '../../services/github.provider';
import { emailValidationPattern, snackBarDefaultOpt } from 'src/app/config/app.config';
import { SnackBarCloseMsg, LoginFailMsg, SocialLoginFailMsg, LoginSuccessMsg } from '../../messages/auth.messages';

// TODO: Create a messages.ts file for storing message strings
// TODO: Add overlay loaders for god sake please.

@Component({
  selector: 'auth-modal-content',
  styles: ['::ng-deep .mat-form-field-flex > .mat-form-field-infix { padding: 0.6em 0px !important;}',
          '::ng-deep .mat-form-field-label-wrapper { top: -1.35em; }',
          '::ng-deep .mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label { transform: translateY(-1.2em) scale(.75);width: 133.33333%;}',
          '.mw-80 { min-width:80%; }',
          '.mw-25v { min-width: 25vw; }'],
  templateUrl: './auth-modal.component.html',
  providers: [{
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }],
})
export class AuthModalContent implements OnInit {
  emailBuffer: { email: String, isVerified: Boolean };
  OTP: Number;
  password: String;

  loginForm: FormGroup;
  invalidCreds: Boolean = false;
  isLoading: Boolean = false;

  constructor(private authService: HSAuthService, 
              private _formBuilder: FormBuilder,
              private _modalRef: MatDialogRef<AuthModalContent>,
              private _messageBar: MatSnackBar
              ) {
                this.loginForm = this._formBuilder.group({
                  username: new FormControl('', Validators.compose([
                      Validators.required,
                      // Validators.pattern(emailValidationPattern) TODO: Add email also as login username
                  ])),
                  password: new FormControl('', Validators.required)
                })
              }
    
  ngOnInit() {
    this.emailBuffer = { email: "", isVerified: false };
  }

  private defaultMsg(msg: string, closeLoader?: Boolean): void {
    this._messageBar.open(msg, SnackBarCloseMsg, snackBarDefaultOpt);
    if(closeLoader)
      this.stopLoader();
  }

  private stopLoader() {
    setTimeout(() => {this.isLoading = false}, 200)
  }

  private startLoader() {
    this.isLoading = true;
  }
   
  public socialSignIn(provider: string) {
    this.isLoading = true;
    this.authService.socialSignIn(provider).subscribe((user) => {
      if(user)
        this.authService.convertAuthToken(user).subscribe(() => {
          this.defaultMsg(LoginSuccessMsg, true);
          this._modalRef.close();
        });
      else
        this.defaultMsg(SocialLoginFailMsg, true);
    }, 
    error => this.defaultMsg(`${LoginFailMsg} ${error}`, true)
    );
  }

  public googleSignIn(): void {  
    this.socialSignIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public githubSignIn(): void { 
    this.socialSignIn(GitHubLoginProvider.PROVIDER_ID);
  }

  public facebookSignIn(): void { 
    this.socialSignIn(FacebookLoginProvider.PROVIDER_ID);
  }

  login() {
    this.invalidCreds = false;
    this.isLoading = true;
    if(this.loginForm.valid){
      const req = this.authService.credLogin(this.loginForm.value.username, this.loginForm.value.password);
      req.subscribe((res) => {
        this._modalRef.close();
        this.defaultMsg(LoginSuccessMsg, true);
        this.loginForm.reset();
      }, (error) => {
        this.invalidCreds = true;
        this.isLoading = false;
      });
    }
  }

  checkEmail(stepper) {
    if(this.emailBuffer.email != ''){
      this.emailBuffer.email.match(emailValidationPattern);
    }
  }
}
