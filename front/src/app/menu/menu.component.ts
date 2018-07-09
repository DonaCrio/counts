import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() retractedState = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  retractMenu(): void {
    this.retractedState.emit(false);
  }

}
