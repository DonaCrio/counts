import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public route: string[];

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this._router.events.subscribe((res) => {
      this.route = this._router.url.split('/');
    });
  }

}
