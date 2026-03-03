import { Routes } from '@angular/router';
import { Landing } from './views/landing/landing';
import { Login } from './views/auth/login/login';
import { Register } from './views/auth/register/register';
import { Home } from './views/home/home';
import { User } from './views/user/user';
import { Groups } from './views/groups/groups';
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
      { path: 'home', component: Home },
      { path: 'user', component: User },
      { path: 'groups', component: Groups }
    ]
  },
  { path: '**', redirectTo: 'landing' }
];
