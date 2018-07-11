import { Injectable } from '@angular/core';
import { SessionModel } from '../_models/session';

@Injectable()
export class SessionService {

  getUserId(): string {
    if (localStorage.getItem('session')) {
      const session: SessionModel = JSON.parse(localStorage.getItem('session'));
      return (session.user._id);
    } else {
      return ('');
    }
  }

  getSession(): SessionModel {
    if (localStorage.getItem('session')) {
      const session: SessionModel = JSON.parse(localStorage.getItem('session'));
      return (session);
    } else {
      return (new SessionModel());
    }
  }

  getJWT(): String {
    if (localStorage.getItem('session')) {
      const session: SessionModel = JSON.parse(localStorage.getItem('session'));
      return (session.jwt);
    } else {
      return ('');
    }
  }
}
