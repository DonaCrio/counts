import { Injectable } from '@angular/core';
import { UserModel } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(
    private _http: HttpClient,
    private _sessionService: SessionService
  ) { }

  getUsers(): Observable<UserModel[]> {
    const path = '/api/users';
    const headers = new HttpHeaders({ 'authorization': 'bearer ' + String(this._sessionService.getJWT()) });
    return this._http.get<{ users: UserModel[] }>(path, { headers: headers })
      .map((data: { users: UserModel[] }) => {
        const users = data.users;
        for (const user of users) {
          const url = '/api/' + user.avatar;
          user.avatar = url;
        }
        return users;
      })
      .catch((err: any) => {
        return (Observable.throw({
          status: err.status,
          message: err.message
        }));
      });
  }

  getUser(id: string): Observable<UserModel> {
    const path = '/api/users/' + id;
    const headers = new HttpHeaders({ 'authorization': 'bearer ' + String(this._sessionService.getJWT()) });
    return this._http.get<{ user: UserModel }>(path, { headers: headers })
      .map((data: { user: UserModel }) => {
        const user = data.user;
        const url = '/api/' + user.avatar;
        user.avatar = url;
        return user;
      })
      .catch((err: any) => {
        return (Observable.throw({
          status: err.status,
          message: err.message
        }));
      });
  }

}
