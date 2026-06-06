import { Carrera } from './carrera.interface';

export interface Estudiante {
  id: number;
  rut: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  fechaRegistro: string;
  carrera: Carrera;
}
