import { Routes } from '@angular/router';
import { Landing } from './views/landing/landing';
import { Login } from './views/auth/login/login';
import { Register } from './views/auth/register/register';
import { Home } from './views/home/home';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'home', component: Home }
    ]
  },
  { path: '**', redirectTo: 'landing' }
];
