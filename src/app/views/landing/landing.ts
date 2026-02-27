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
  dinosaurs = [
    {
      name: 'T-Rex',
      emoji: '🦖',
      description: 'El rey de los dinosaurios. Feroz, imponente y coleccionador\'s item favorito.',
      price: '$299.99'
    },
    {
      name: 'Triceratops',
      emoji: '🦖',
      description: 'Con tres cuernos y un corazón de oro. Perfecto para amantes de la naturaleza.',
      price: '$199.99'
    },
    {
      name: 'Stegosaurus',
      emoji: '🦖',
      description: 'Placas dorsales que brillan. Un clásico del Jurásico.',
      price: '$249.99'
    },
    {
      name: 'Velociraptor',
      emoji: '🦖',
      description: 'Rápido, inteligente y peligroso. Para los aventureros.',
      price: '$179.99'
    }
  ];

  features = [
    {
      icon: 'pi pi-home',
      title: 'Tienda Segura',
      description: 'Compra tus dinosaurios favoritos con total seguridad.'
    },
    {
      icon: 'pi pi-truck',
      title: 'Envío Rápido',
      description: 'Entrega en 24 horas a cualquier parte del mundo.'
    },
    {
      icon: 'pi pi-shield',
      title: 'Garantía 100%',
      description: 'Satisfecho o tu dinero de vuelta. Sin preguntas.'
    },
    {
      icon: 'pi pi-heart',
      title: 'Atención Premium',
      description: 'Soporte 24/7 para todas tus dudas de dinosaurios.'
    }
  ];
}
