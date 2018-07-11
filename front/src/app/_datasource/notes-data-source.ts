import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { NoteModel } from '../_models/note';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NoteService } from '../_services/note.service';

export class NoteDataSource extends DataSource<NoteModel> {

    private notesSubject = new BehaviorSubject<NoteModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private _noteService: NoteService
    ) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<NoteModel[]> {
        return this.notesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.notesSubject.complete();
        this.loadingSubject.complete();
    }

    loadNotes() {
        this.loadingSubject.next(true);
        this._noteService.getNotes().pipe(
            catchError(() => []),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(notes => this.notesSubject.next(notes));
    }
}
