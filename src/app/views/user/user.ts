import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-user',
  imports: [CommonModule, CardModule, AvatarModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  // placeholder perfil de usuario (dino‑nombres)
  user = {
    usuario: 'dino_user_01',
    fullName: 'Dino Nombre',
    email: 'dino@erp.local',
    dob: '1990-01-01',
    phone: '+34 600 000 000',
    address: 'Valle Jurásico 123'
  };
}
