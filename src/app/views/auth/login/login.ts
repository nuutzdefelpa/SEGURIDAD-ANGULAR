import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';

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

  private readonly credentials = {
    email: 'admin@erp.com',
    password: 'P@ssw0rd!'
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    this.loginError = '';
    if (!this.email || !this.password) {
      this.loginError = 'Todos los campos son obligatorios';
      return;
    }
    if (this.email === 'admin' && this.password === '1234*A') {
      this.successMessage = 'Bienvenido administrador, login exitoso!';
      setTimeout(() => this.router.navigate(['/home']), 1500);
      return;
    }

    if (
      this.email === this.credentials.email &&
      this.password === this.credentials.password
    ) {
      alert('Login exitoso (simulado)');
    } else {
      this.loginError = 'Credenciales inválidas';
    }
  }
}

