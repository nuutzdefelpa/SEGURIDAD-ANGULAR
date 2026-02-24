import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, ButtonModule, AnimateOnScrollModule, AvatarModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
