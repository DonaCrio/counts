import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewNoteModel } from '../_models/new-note';
import { NoteService } from '../_services/note.service';
import { NoteModel } from '../_models/note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  private _newNoteForm: FormGroup;
  private _newNoteData: NewNoteModel;
  public loading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _noteService: NoteService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._newNoteForm = this._formBuilder.group({
      object: ['', [Validators.required]],
      amount: [, [Validators.required]],
      comment: ['', []],
      contributors: [{}, Validators.required],
      indebteds: [{}, [Validators.required]]
    });
    this._newNoteData = new NewNoteModel();
  }
  onFormSubmit(): void {
    this.loading = true;
    if (this._newNoteForm.valid) {
      this._newNoteData = this._newNoteForm.value;
      this._noteService.createNote(this._newNoteData)
        .subscribe(
          (note: NoteModel) => {
            this.loading = false;
            this._router.navigate(['notes', note._id]);
          },
          (err) => {
            this.loading = false;
          }
        );
    }
  }
}

