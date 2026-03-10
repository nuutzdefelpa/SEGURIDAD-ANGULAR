import { Routes } from '@angular/router';
import { Landing } from './views/landing/landing';
import { Login } from './views/auth/login/login';
import { Register } from './views/auth/register/register';
import { Home } from './views/home/home';
import { User } from './views/user/user';
import { Groups } from './views/groups/groups';
import { MainLayout } from './layout/main-layout/main-layout';
import { permissionGuard } from './guards/permission.guard';
import { authGuard } from './guards/auth.guard';
import { GroupDashboard } from './views/group-dashboard/group-dashboard';
import { Board } from './views/tickets/board/board';
import { List } from './views/tickets/list/list';
import { Detail } from './views/tickets/detail/detail';
import { Create } from './views/tickets/create/create';
import { Users } from './views/users/users';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: Home,
        canActivate: [permissionGuard],
        data: { permissions: 'group:view' }
      },
      {
        path: 'dashboard',
        component: GroupDashboard,
        canActivate: [permissionGuard],
        data: { permissions: 'ticket:view' }
      },
      {
        path: 'tickets/board',
        component: Board,
        canActivate: [permissionGuard],
        data: { permissions: 'ticket:view' }
      },
      {
        path: 'tickets/list',
        component: List,
        canActivate: [permissionGuard],
        data: { permissions: 'ticket:view' }
      },
      {
        path: 'tickets/create',
        component: Create,
        canActivate: [permissionGuard],
        data: { permissions: 'ticket:add' }
      },
      {
        path: 'tickets/:id',
        component: Detail,
        canActivate: [permissionGuard],
        data: { permissions: 'ticket:view' }
      },
      {
        path: 'user',
        component: User,
        canActivate: [permissionGuard],
        data: { permissions: 'user:view' }
      },
      {
        path: 'groups',
        component: Groups,
        canActivate: [permissionGuard],
        data: { permissions: 'group:view' }
      },
      {
        path: 'users',
        component: Users,
        canActivate: [permissionGuard],
        data: { permissions: 'users:view' }
      }
    ]
  },
  { path: '**', redirectTo: 'landing' }
];
