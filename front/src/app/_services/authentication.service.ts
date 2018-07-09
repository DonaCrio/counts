import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SignInModel } from '../_models/signin';
import { SessionModel } from '../_models/session';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    private _session: SessionModel;

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
        const session = JSON.parse(localStorage.getItem('session'));
        this._session = session;
    }

    sign_in(signInData: SignInModel): Observable<boolean> {
        const path = '/api/login';
        return this._http.post(path, { user: signInData })
            .map((res: SessionModel) => {
                const session = res;
                if (session) {
                    this._session = session;
                    localStorage.setItem('session', JSON.stringify(session));
                    return (true);
                } else {
                    return (false);
                }
            })
            .catch((err: any) => {
                let message = '';
                if (err.status === 404) {
                    message = 'User not found.';
                } else if (err.status === 401) {
                    message = 'Password is not valid.';
                } else if (err.status === 500) {
                    message = 'An error occured';
                }
                return (Observable.throw({ message: message }));
            });
    }

    signOut(): void {
        this._session = null;
        localStorage.removeItem('session');
        this._router.navigate(['/login']);
    }
}
