import { Injectable } from '@angular/core';
import { NoteModel } from '../_models/note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';
import { NewNoteModel } from '../_models/new-note';

@Injectable()
export class NoteService {

  constructor(
    private _http: HttpClient,
    private _sessionService: SessionService
  ) { }

  getNotes(): Observable<NoteModel[]> {
    const path = '/api/notes';
    const headers = new HttpHeaders({ 'authorization': 'bearer ' + String(this._sessionService.getJWT()) });
    return this._http.get<{ notes: NoteModel[] }>(path, { headers: headers })
      .map((data: { notes: NoteModel[] }) => {
        const notes = data.notes;
        for (const note of notes) {
          const url = '/api/' + note.picture;
          note.picture = url;
        }
        return notes;
      })
      .catch((err: any) => {
        return (Observable.throw({
          status: err.status,
          message: err.message
        }));
      });
  }

  getNote(id: string): Observable<NoteModel> {
    const path = '/api/notes/' + id;
    const headers = new HttpHeaders({ 'authorization': 'bearer ' + String(this._sessionService.getJWT()) });
    return this._http.get<{ note: NoteModel }>(path, { headers: headers })
      .map((data: { note: NoteModel }) => {
        const note = data.note;
        const url = '/api/' + note.picture;
        note.picture = url;
        return note;
      })
      .catch((err: any) => {
        return (Observable.throw({
          status: err.status,
          message: err.message
        }));
      });
  }

  createNote(newNote: NewNoteModel): Observable<NoteModel> {
    const path = '/api/notes';
    const headers = new HttpHeaders({ 'authorization': 'bearer ' + String(this._sessionService.getJWT()) });
    return this._http.post<{ note: NoteModel }>(path, { note: newNote }, { headers: headers })
      .map((data: { note: NoteModel }) => {
        const note = data.note;
        const url = '/api/' + note.picture;
        note.picture = url;
        return note;
      })
      .catch((err: any) => {
        return (Observable.throw({
          status: err.status,
          message: err.message
        }));
      });
  }

}
