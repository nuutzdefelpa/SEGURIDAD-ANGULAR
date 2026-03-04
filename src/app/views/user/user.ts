import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    AvatarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  // placeholder perfil de usuario (dino‑nombres)
  user: any = {
    usuario: 'dino_user_01',
    fullName: 'Dino Nombre',
    email: 'dino@erp.local',
    dob: '1990-01-01',
    phone: '+34 600 000 000',
    address: 'Valle Jurásico 123',
  };

  userCopy: any = {};
  displayEditDialog = false;
  userDeleted = false;

  constructor(private confirmation: ConfirmationService) {}

  editProfile(): void {
    this.userCopy = { ...this.user };
    this.displayEditDialog = true;
  }

  saveProfile(): void {
    this.user = { ...this.userCopy };
    this.displayEditDialog = false;
  }

  confirmDelete(): void {
    this.confirmation.confirm({
      message: '¿Deseas eliminar tu cuenta? Esta acción es lógica y se puede revertir.',
      accept: () => {
        this.userDeleted = true;
      },
    });
  }
}
