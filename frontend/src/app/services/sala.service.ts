import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Sala } from '../interfaces/sala.interface';
import { Horario } from '../interfaces/horario.interface';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private readonly baseUrl = `${environment.apiUrl}/salas`;

  constructor(private http: HttpClient) {}

  // RF02: Obtener todas las salas
  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.baseUrl);
  }

  // RF03: Filtrar salas por capacidad exacta
  getSalasPorCapacidad(capacidad: number): Observable<Sala[]> {
    const params = new HttpParams().set('capacidad', capacidad.toString());
    return this.http.get<Sala[]>(this.baseUrl, { params });
  }

  // RF02: Obtener una sala por ID
  getSalaById(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.baseUrl}/${id}`);
  }

  // RF05: Obtener horarios disponibles de una sala para una fecha
  getHorariosDisponibles(idSala: number, fecha: string): Observable<Horario[]> {
    const params = new HttpParams()
      .set('sala', idSala.toString())
      .set('fecha', fecha);
    return this.http.get<Horario[]>(`${environment.apiUrl}/horarios/disponibles`, { params });
  }

  // RF05: Obtener todos los horarios de una sala
  getHorariosPorSala(idSala: number): Observable<Horario[]> {
    const params = new HttpParams().set('sala', idSala.toString());
    return this.http.get<Horario[]>(`${environment.apiUrl}/horarios`, { params });
  }
}
