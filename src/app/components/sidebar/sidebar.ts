import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, ButtonModule, DividerModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = [
    { label: 'Dino-Home', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Dino-Dashboard', icon: 'pi pi-chart-bar', routerLink: '#' },
    { label: 'Dino-Productos', icon: 'pi pi-shopping-cart', routerLink: '#' },
    { label: 'Dino-Clientes', icon: 'pi pi-users', routerLink: '#' },
    { label: 'Dino-Reportes', icon: 'pi pi-file', routerLink: '#' },
    { label: 'Dino-Usuarios', icon: 'pi pi-user', routerLink: '/user' },
    { label: 'Dino-Grupos', icon: 'pi pi-users', routerLink: '/groups' },
  ];

  version = 'dino-version v1.dino.alpha🦖';

  logout(): void {
    window.location.href = '/landing';
  }
}
