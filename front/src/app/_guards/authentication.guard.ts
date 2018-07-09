import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SessionModel } from '../_models/session';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate() {
        if (localStorage.getItem('session')) {
            const session: SessionModel = JSON.parse(localStorage.getItem('session'));
            if (session.user) {
                return (true);
            }
        }
        localStorage.clear();
        this._router.navigate(['login']);
        return (false);
    }

}
