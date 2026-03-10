import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PermissionsService } from '../../../services/permissions.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, PasswordModule, MessageModule, InputTextModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  loginError = '';
  successMessage = '';

  constructor(
    private readonly router: Router,
    private readonly permissionsService: PermissionsService
  ) {}

  onSubmit(): void {
    this.loginError = '';
    if (!this.email || !this.password) {
      this.loginError = 'Todos los campos son obligatorios';
      return;
    }
    if (this.email === 'admin' && this.password === '1234*A') {
      this.permissionsService.loginAsSuperuser('superadmin');
      this.successMessage = 'Bienvenido administrador, login exitoso!';
      setTimeout(() => this.router.navigate(['/home']), 1500);
      return;
    }

    if (this.email.trim() && this.password.trim()) {
      this.permissionsService.loginAsDefaultUser(this.email);
      this.successMessage = 'Login exitoso';
      setTimeout(() => this.router.navigate(['/home']), 1000);
    } else {
      this.loginError = 'Credenciales inválidas';
    }
  }
}

