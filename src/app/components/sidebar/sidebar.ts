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
    { label: 'Dino-Home', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Dino-Dashboard', icon: 'pi pi-chart-bar', routerLink: '#' },
    { label: 'Dino-Productos', icon: 'pi pi-shopping-cart', routerLink: '#' },
    { label: 'Dino-Clientes', icon: 'pi pi-users', routerLink: '#' },
    { label: 'Dino-Reportes', icon: 'pi pi-file', routerLink: '#' },
    { label: 'Dino-Usuarios', icon: 'pi pi-user', routerLink: '/user', requiredPermission: 'user:view' },
    { label: 'Dino-Grupos', icon: 'pi pi-users', routerLink: '/groups', requiredPermission: 'group:view' },
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
