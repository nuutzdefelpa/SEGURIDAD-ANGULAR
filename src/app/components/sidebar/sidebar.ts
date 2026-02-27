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
    { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '#' },
    { label: 'Productos', icon: 'pi pi-shopping-cart', routerLink: '#' },
    { label: 'Clientes', icon: 'pi pi-users', routerLink: '#' },
    { label: 'Reportes', icon: 'pi pi-file', routerLink: '#' },
  ];

  logout(): void {
    // Redirigir a landing page
    window.location.href = '/landing';
  }
}
