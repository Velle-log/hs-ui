import { Component, OnInit, ElementRef } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
    emailBuffer: {email: String, isVerified: Boolean};
    OTP: Number;
    password: String;

    constructor(private socialAuthService: AuthService) {}

    googleSignIn(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    
    facebookSignIn(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    ngOnInit() {
        this.emailBuffer = {email: "", isVerified: false};
    }

    checkEmail(stepper) {
        if(this.emailBuffer.email != ''){
            // TODO: Add email verification logic.
            // Dummy flow start
            this.emailBuffer.isVerified = true;
            setTimeout(() => stepper.next(), 200);
            // Dummy flow end
        }
    }
}
