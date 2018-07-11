import { Routes } from '@angular/router';
import { SignInComponent } from './signin/signin.component';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { NewNoteComponent } from './new-note/new-note.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },
    { path: 'login', component: SignInComponent },
    { path: 'notes', component: NotesComponent, canActivate: [AuthenticationGuard]},
    { path: 'notes/:id', component: NoteComponent, canActivate: [AuthenticationGuard]},
    { path: 'new/note', component: NewNoteComponent, canActivate: [AuthenticationGuard]},
    { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard]},
    { path: 'users/:id', component: UserComponent, canActivate: [AuthenticationGuard]},
    { path: '**', redirectTo: 'dashboard' },
];
