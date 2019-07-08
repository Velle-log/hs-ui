import { Component } from '@angular/core';

@Component({
    selector: 'auth-modal-content',
    styles: ['::ng-deep .mat-form-field-flex > .mat-form-field-infix { padding: 0.6em 0px !important;}',
            '::ng-deep .mat-form-field-label-wrapper { top: -1.35em; }',
            '::ng-deep .mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label { transform: translateY(-1.2em) scale(.75);width: 133.33333%;}'],
    templateUrl: './auth-modal.component.html',
})
export class AuthModalContent {
}