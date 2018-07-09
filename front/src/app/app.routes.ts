import { Routes } from '@angular/router';
import { SignInComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './_guards/authentication.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
    { path: 'login', component: SignInComponent },
    { path: '**', redirectTo: '' },
];
