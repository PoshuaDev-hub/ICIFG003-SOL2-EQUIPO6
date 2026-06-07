export interface Horario {
  id: number;
  horaInicio: string;
  horaTermino: string;
  sala?: { id: number };
}
