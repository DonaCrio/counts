import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { SignInModel } from '../_models/signin';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

    private _signInForm: FormGroup;
    private _signInData: SignInModel;
    public loading = false;
    public error: string;

    constructor(
        private _formBuilder: FormBuilder,
        private _authenticationService: AuthenticationService,
        private _router: Router
    ) { }

    ngOnInit() {
        this._signInForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        this._signInData = new SignInModel();
    }

    onFormSubmit(): void {
        this.loading = true;
        if (this._signInForm.valid) {
            this._signInData = this._signInForm.value;
            this._authenticationService.sign_in(this._signInData)
                .subscribe(
                    (result: boolean) => {
                        if (result) {
                            this.loading = false;
                            this._router.navigate(['/']);
                        } else {
                            this.loading = false;
                            this.error = 'Session is not valid !';
                        }
                    },
                    (err) => {
                        this.loading = false;
                        this.error = err.message;
                    }
                );
        }
    }

    get email() { return this._signInForm.get('email'); }
    get password() { return this._signInForm.get('password'); }

}
