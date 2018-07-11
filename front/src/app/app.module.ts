import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatIconModule, MatFormFieldModule, MatSidenavModule, MatCardModule, MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AuthenticationGuard } from './_guards/authentication.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { SignInComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesComponent } from './notes/notes.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { AuthenticationService } from './_services/authentication.service';
import { SessionService } from './_services/session.service';
import { NoteService } from './_services/note.service';
import { NoteComponent } from './note/note.component';
import { UsersComponent } from './users/users.component';
import { UserService } from './_services/user.service';
import { UserComponent } from './user/user.component';
import { NewNoteComponent } from './new-note/new-note.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    ContentComponent,
    SignInComponent,
    DashboardComponent,
    NotesComponent,
    BreadcrumbComponent,
    NoteComponent,
    UsersComponent,
    UserComponent,
    NewNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    SessionService,
    NoteService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
