import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteModel } from '../_models/note';
import { NoteService } from '../_services/note.service';
import { UserService } from '../_services/user.service';
import { UserModel } from '../_models/user';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  public note = new NoteModel();
  public contributors = new Array<{_id: String, pseudo: String, amount: Number}>();
  public indebteds = new Array<{_id: String, pseudo: String, amount: Number}>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _noteService: NoteService,
    private _userService: UserService) {
  }

  ngOnInit() {
    let note_id: string;
    this._route.params.subscribe((params) => {
      note_id = params.id;
    });

    this._noteService.getNote(note_id)
      .subscribe(
        (note: NoteModel) => {
          this.note = note;
          for (const contributor of this.note.contributors) {
            this._userService.getUser(contributor._id)
              .subscribe(
                (user: UserModel) => {
                  this.contributors.push({
                    _id: user._id,
                    pseudo: user.pseudo,
                    amount: contributor.amount
                  });
                },
                (err) => { }
              );
          }
          for (const indebted of this.note.indebteds) {
            this._userService.getUser(indebted._id)
              .subscribe(
                (user: UserModel) => {
                  this.indebteds.push({
                    _id: user._id,
                    pseudo: user.pseudo,
                    amount: indebted.amount
                  });
                },
                (err) => { }
              );
          }
        },
        (err) => { }
      );
  }

  navigateTo(user: { _id: String, pseudo: String, amount: Number }): void {
    this._router.navigate(['users', user._id]);
  }

}
