import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  private readonly credentials = {
    email: 'admin@erp.com',
    password: 'P@ssw0rd!'
  };

  onSubmit(): void {
    this.loginError = '';
    if (!this.email || !this.password) {
      this.loginError = 'Todos los campos son obligatorios';
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

