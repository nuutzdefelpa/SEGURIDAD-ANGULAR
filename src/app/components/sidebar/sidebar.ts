import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Permission, PermissionsService } from '../../services/permissions.service';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
  requiredPermission?: Permission;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, ButtonModule, DividerModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems: MenuItem[] = [
    { label: 'Mis grupos', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Dashboard grupo', icon: 'pi pi-chart-bar', routerLink: '/dashboard', requiredPermission: 'ticket:view' },
    { label: 'Tablero tickets', icon: 'pi pi-th-large', routerLink: '/tickets/board', requiredPermission: 'ticket:view' },
    { label: 'Lista tickets', icon: 'pi pi-list', routerLink: '/tickets/list', requiredPermission: 'ticket:view' },
    { label: 'Crear ticket', icon: 'pi pi-plus-circle', routerLink: '/tickets/create', requiredPermission: 'ticket:add' },
    { label: 'Mi perfil', icon: 'pi pi-user', routerLink: '/user', requiredPermission: 'user:view' },
    { label: 'Gestión grupo', icon: 'pi pi-users', routerLink: '/groups', requiredPermission: 'group:view' },
    { label: 'Gestión usuarios', icon: 'pi pi-shield', routerLink: '/users', requiredPermission: 'users:view' },
  ];

  version = 'dino-version v1.dino.alpha🦖';

  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly router: Router
  ) {}

  get visibleMenuItems(): MenuItem[] {
    return this.menuItems.filter(item => {
      if (!item.requiredPermission) {
        return true;
      }
      return this.permissionsService.hasPermission(item.requiredPermission);
    });
  }

  logout(): void {
    this.permissionsService.logout();
    this.router.navigate(['/landing']);
  }
}
