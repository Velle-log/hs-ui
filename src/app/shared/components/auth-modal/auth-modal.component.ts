import { Component, OnInit, ElementRef } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HSAuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

// TODO: Create a messages.ts file for storing message strings
// TODO: Add loaders for god sake please.

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

    constructor(private authService: HSAuthService, 
                private formBuilder: FormBuilder,
                private _modalRef: MatDialogRef<AuthModalContent>
                ) {
                    this.loginForm = this.formBuilder.group({
                        username: new FormControl('', Validators.compose([
                            Validators.required,
                            // Validators.pattern(emailValidationPattern) TODO: Add email also as login username
                        ])),
                        password: new FormControl('', Validators.required)
                    })
                }

    login() {
        this.invalidCreds = false;
        if(this.loginForm.valid){
            const req = this.authService.credLogin(this.loginForm.value.username, this.loginForm.value.password);
            req.subscribe((res) => {
                this._modalRef.close();
            }, (error) => {
                this.invalidCreds = true;
                // console.log(this.invalidCreds);
            });
        }
    }

    loginSuccessMsg() {   // TODO: Replace this with message.ts constants
        return "Successfully Logged In!";
    }

    invalidCredsErrorMsg() {    // TODO: Replace this with message.ts constants
        return "Invalid username/password.";
    }

    ngOnInit() {
        this.emailBuffer = { email: "", isVerified: false };
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
