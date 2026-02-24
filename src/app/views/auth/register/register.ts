import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    DatePickerModule,
    MessageModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  today = new Date();
  es = {
    firstDayOfWeek: 1,
    dayNames: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
    dayNamesShort: ['dom','lun','mar','mié','jue','vie','sáb'],
    dayNamesMin: ['D','L','M','X','J','V','S'],
    monthNames: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
    monthNamesShort: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  };

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        usuario: ['', Validators.required],
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern(/.*[!@#$%^&*(),.?"{}|<>].*/)
          ]
        ],
        confirmPassword: ['', Validators.required],
        dob: [null, [Validators.required, this.ageValidator(18)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        address: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ageValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const dob = control.value;
      if (!dob) return null;
      const age = Math.floor(
        (Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      );
      return age >= minAge ? null : { ageInvalid: true };
    };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pw = control.get('password')?.value;
    const cpw = control.get('confirmPassword')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Registro exitoso (simulado)');
      console.log('Registro:', this.registerForm.value);
    }
  }
}

