import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reserva, ReservaRequest } from '../interfaces/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly baseUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {}

  // RF04: Obtener reservas de una sala en una fecha específica
  getReservasPorSalaYFecha(idSala: number, fecha: string): Observable<Reserva[]> {
    const params = new HttpParams()
      .set('sala', idSala.toString())
      .set('fecha', fecha);
    return this.http.get<Reserva[]>(this.baseUrl, { params });
  }

  // RF05: Crear una nueva reserva
  crearReserva(reserva: ReservaRequest): Observable<Reserva> {
    return this.http.post<Reserva>(this.baseUrl, reserva);
  }

  // Obtener todas las reservas
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.baseUrl);
  }
}
