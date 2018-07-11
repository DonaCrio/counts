import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NoteService } from '../_services/note.service';
import { NoteModel } from '../_models/note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public displayedColumns = ['creationDate', 'object', 'amount', 'updateDate'];
  public dataSource = new MatTableDataSource<NoteModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _noteService: NoteService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._noteService.getNotes()
      .subscribe(
        (notes) => {
          this.dataSource = new MatTableDataSource(notes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => { }
      );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onRowClicked(row) {
    this._router.navigate(['notes', row._id]);
  }

}
