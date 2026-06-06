import { Estudiante } from './estudiante.interface';
import { Sala } from './sala.interface';
import { Horario } from './horario.interface';

export interface EstadoReserva {
  idEstado: number;
  nombreEstado: string;
}

export interface Reserva {
  id: number;
  fechaReserva: string;
  observacion: string;
  fechaCreacion: string;
  estudiante: Estudiante;
  sala: Sala;
  horario: Horario;
  estado: EstadoReserva;
}

export interface ReservaRequest {
  fechaReserva: string;
  observacion: string;
  idEstudiante: number;
  idSala: number;
  idHorario: number;
  idEstado: number;
}
