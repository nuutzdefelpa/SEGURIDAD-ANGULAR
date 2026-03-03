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
    { title: 'Facturas Emitidas', value: '1,234', icon: 'pi pi-file', color: '#3498db' },
    { title: 'Clientes Activos', value: '876', icon: 'pi pi-users', color: '#2ecc71' },
    { title: 'Items en Inventario', value: '3,450', icon: 'pi pi-box', color: '#e74c3c' },
    { title: 'Proyectos Activos', value: '27', icon: 'pi pi-briefcase', color: '#f39c12' },
  ];

  recentActivities = [
    { user: 'Juan Pérez', action: 'Generó factura #456', time: 'Hace 2 horas' },
    { user: 'María García', action: 'Registró cliente nuevo', time: 'Hace 4 horas' },
    { user: 'Carlos López', action: 'Actualizó inventario', time: 'Hace 6 horas' },
    { user: 'Ana Martínez', action: 'Cerró proyecto Alpha', time: 'Hace 8 horas' },
  ];
}
