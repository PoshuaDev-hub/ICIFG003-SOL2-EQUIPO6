import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../interfaces/reserva.interface';

@Component({
  selector: 'app-listado-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-reservas.html',
  styleUrl: './listado-reservas.scss'
})
export class ListadoReservasComponent implements OnChanges {
  @Input({ required: true }) idSala!: number;
  @Input() salaNombre: string = '';
  @Input({ required: true }) fecha!: string;
  @Output() cerrar = new EventEmitter<void>();

  reservas: Reserva[] = [];
  cargando = false;

  constructor(private reservaService: ReservaService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['idSala'] || changes['fecha']) && this.idSala && this.fecha) {
      this.cargarReservas();
    }
  }

  // RF04: Listado de reservas por sala y fecha
  cargarReservas() {
    this.cargando = true;
    this.reservaService.getReservasPorSalaYFecha(this.idSala, this.fecha).subscribe({
      next: (data) => {
        this.reservas = data;
        this.cargando = false;
      },
      error: () => {
        this.reservas = [];
        this.cargando = false;
      }
    });
  }
}
