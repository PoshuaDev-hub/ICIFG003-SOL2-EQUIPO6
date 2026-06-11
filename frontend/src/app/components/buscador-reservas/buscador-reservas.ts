import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { ReservaDTO } from '../../interfaces/reserva.interface';
import { AuthService } from '../../services/auth.service';

type ModosBusqueda = 'rut' | 'correo' | 'telefono';

@Component({
  selector: 'app-buscador-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador-reservas.html',
  styleUrl: './buscador-reservas.scss'
})
export class BuscadorReservasComponent {
  @Output() cerrar = new EventEmitter<void>();

  modo: ModosBusqueda = 'rut';
  identificador: string = '';
  contrasena: string = '';
  mostrarPass = false;

  reservas: ReservaDTO[] = [];
  buscado = false;
  cargando = false;
  errorMsg: string = '';

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  seleccionarModo(m: ModosBusqueda) {
    this.modo = m;
    this.identificador = '';
    this.contrasena = '';
    this.reservas = [];
    this.buscado = false;
    this.errorMsg = '';
  }

  onIdentificadorChange(val: string) {
    if (this.modo === 'rut') {
      this.identificador = this.authService.formatearRut(val);
    }
  }

  buscar() {
    let id = this.identificador.trim();
    const pass = this.contrasena.trim();
    if (!id || !pass) return;

    if (this.modo === 'rut') {
      id = this.authService.normalizarRut(id);
    }

    this.cargando = true;
    this.buscado = true;
    this.errorMsg = '';
    this.reservas = [];

    const handleResult = (data: ReservaDTO[]) => {
      this.reservas = data;
      this.cargando = false;
      if (data.length === 0) {
        this.errorMsg = 'Credenciales incorrectas o no tienes reservas.';
      }
    };

    const handleError = () => {
      this.reservas = [];
      this.cargando = false;
      this.errorMsg = 'Credenciales incorrectas.';
    };

    if (this.modo === 'rut') {
      this.reservaService.getReservasPorRut(id, pass).subscribe({ next: handleResult, error: handleError });
    } else if (this.modo === 'correo') {
      this.reservaService.getReservasPorCorreo(id, pass).subscribe({ next: handleResult, error: handleError });
    } else {
      this.reservaService.getReservasPorTelefono(id, pass).subscribe({ next: handleResult, error: handleError });
    }
  }
}
