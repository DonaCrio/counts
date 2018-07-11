import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserModel } from '../_models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user = new UserModel();

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) { }

  ngOnInit() {
    let user_id: string;
    this._route.params.subscribe((params) => {
      user_id = params.id;
    });

    this._userService.getUser(user_id)
    .subscribe(
      (user: UserModel) => {
        this.user = user;
      },
      (err) => {}
    );
  }

}
