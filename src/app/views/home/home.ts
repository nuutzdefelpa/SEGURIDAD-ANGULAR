import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardModule, ButtonModule, DividerModule, AvatarModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  dashboardStats = [
    { title: 'Total Ventas', value: '$45,250', icon: 'pi pi-dollar', color: '#3498db' },
    { title: 'Clientes', value: '1,240', icon: 'pi pi-users', color: '#2ecc71' },
    { title: 'Órdenes', value: '856', icon: 'pi pi-shopping-cart', color: '#e74c3c' },
    { title: 'Ingresos', value: '$12,450', icon: 'pi pi-chart-line', color: '#f39c12' },
  ];

  recentActivities = [
    { user: 'Juan Pérez', action: 'Creó una nueva orden', time: 'Hace 2 horas' },
    { user: 'María García', action: 'Actualizó cliente #1234', time: 'Hace 4 horas' },
    { user: 'Carlos López', action: 'Finalizó reporte mensual', time: 'Hace 6 horas' },
    { user: 'Ana Martínez', action: 'Agregó nuevo producto', time: 'Hace 8 horas' },
  ];
}
