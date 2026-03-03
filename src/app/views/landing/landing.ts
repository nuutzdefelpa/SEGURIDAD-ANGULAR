import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, ButtonModule, AnimateOnScrollModule, CardModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  modules = [
    {
      name: 'Ventas',
      emoji: '🦖',
      description: 'Gestión completa de ventas, pedidos y facturación.'
    },
    {
      name: 'Inventario',
      emoji: '🦕',
      description: 'Control de stock, materiales y productos en tiempo real.'
    },
    {
      name: 'Clientes',
      emoji: '🦖',
      description: 'Base de datos de clientes con historial y contacto.'
    },
    {
      name: 'Proyectos',
      emoji: '🦕',
      description: 'Planea y supervisa trabajos especiales y contratos.'
    }
  ];

  features = [
    {
      icon: 'pi pi-lock',
      title: 'Seguridad de datos',
      description: 'Tu información protegida con encriptación de último nivel.'
    },
    {
      icon: 'pi pi-cog',
      title: 'Totalmente personalizable',
      description: 'Adapta los módulos a las necesidades de tu empresa.'
    },
    {
      icon: 'pi pi-cloud',
      title: 'Acceso en la nube',
      description: 'Trabaja desde cualquier lugar con una sola cuenta.'
    },
    {
      icon: 'pi pi-headset',
      title: 'Soporte 24/7',
      description: 'Asistencia continua para mantenerte siempre operativo.'
    }
  ];
}
