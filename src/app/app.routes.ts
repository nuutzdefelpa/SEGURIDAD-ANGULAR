import { Routes } from '@angular/router';
import { Landing } from './views/landing/landing';
import { Login } from './views/auth/login/login';
import { Register } from './views/auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: 'landing' }
];
