import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, ButtonModule, CardModule, DividerModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  features = [
    {
      icon: '📊',
      title: 'Gestión Completa',
      description: 'Sistema ERP completo para administrar todos los aspectos de tu negocio'
    },
    {
      icon: '📈',
      title: 'Análisis en Tiempo Real',
      description: 'Reportes y análisis en tiempo real para tomar mejores decisiones'
    },
    {
      icon: '🔒',
      title: 'Seguridad Garantizada',
      description: 'Protección de datos con encriptación de nivel empresarial'
    },
    {
      icon: '⚡',
      title: 'Alto Rendimiento',
      description: 'Velocidad y eficiencia optimizadas para tu productividad'
    }
  ];
}
