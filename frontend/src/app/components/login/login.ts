import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, TipoLogin } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() loginExitoso = new EventEmitter<void>();
  @Output() irARegistroClick = new EventEmitter<void>();

  irARegistro() {
    this.cerrar.emit();
    this.irARegistroClick.emit();
  }

  tipo: TipoLogin = 'rut';
  identificador = '';
  contrasena = '';
  mostrarPass = false;
  cargando = false;
  errorMsg = '';

  constructor(private authService: AuthService) {}

  seleccionarTipo(t: TipoLogin) {
    this.tipo = t;
    this.identificador = '';
    this.contrasena = '';
    this.errorMsg = '';
  }

  onIdentificadorChange(val: string) {
    if (this.tipo === 'rut') {
      this.identificador = this.authService.formatearRut(val);
    }
  }

  get placeholder(): string {
    if (this.tipo === 'rut') return '12345678-5';
    if (this.tipo === 'correo') return 'correo@ejemplo.cl';
    return '+56912345678';
  }

  get labelIdentificador(): string {
    if (this.tipo === 'rut') return 'RUT';
    if (this.tipo === 'correo') return 'Correo Electrónico';
    return 'Teléfono';
  }

  get inputType(): string {
    if (this.tipo === 'correo') return 'email';
    if (this.tipo === 'telefono') return 'tel';
    return 'text';
  }

  login() {
    let id = this.identificador.trim();
    const pass = this.contrasena.trim();
    if (!id || !pass) {
      this.errorMsg = 'Completa todos los campos.';
      return;
    }
    if (this.tipo === 'rut') {
      id = this.authService.normalizarRut(id);
    }
    this.cargando = true;
    this.errorMsg = '';
    this.authService.login(id, pass, this.tipo).subscribe({
      next: () => {
        this.cargando = false;
        this.loginExitoso.emit();
        this.cerrar.emit();
      },
      error: () => {
        this.cargando = false;
        this.errorMsg = 'Credenciales incorrectas. Verifica tus datos.';
      }
    });
  }
}
