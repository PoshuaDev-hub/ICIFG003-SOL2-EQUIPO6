import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { ReservaDTO } from '../../interfaces/reserva.interface';

@Component({
  selector: 'app-buscador-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador-reservas.html',
  styleUrl: './buscador-reservas.scss'
})
export class BuscadorReservasComponent {
  @Output() cerrar = new EventEmitter<void>();

  rut: string = '';
  reservas: ReservaDTO[] = [];
  buscado = false;
  cargando = false;
  errorMsg: string = '';

  constructor(private reservaService: ReservaService) {}

  buscar() {
    const rutTrim = this.rut.trim();
    if (!rutTrim) return;
    this.cargando = true;
    this.buscado = true;
    this.errorMsg = '';
    this.reservaService.getReservasPorRut(rutTrim).subscribe({
      next: (data) => {
        this.reservas = data;
        this.cargando = false;
      },
      error: () => {
        this.reservas = [];
        this.cargando = false;
        this.errorMsg = 'Error al buscar reservas. Verifica el RUT ingresado.';
      }
    });
  }
}
