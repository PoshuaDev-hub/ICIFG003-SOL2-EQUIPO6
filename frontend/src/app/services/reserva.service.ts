import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReservaDTO, ReservaRequest } from '../interfaces/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly baseUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {}

  getReservasPorSalaYFecha(idSala: number, fecha: string): Observable<ReservaDTO[]> {
    const params = new HttpParams()
      .set('sala', idSala.toString())
      .set('fecha', fecha);
    return this.http.get<ReservaDTO[]>(this.baseUrl, { params });
  }

  crearReserva(reserva: ReservaRequest): Observable<ReservaDTO> {
    return this.http.post<ReservaDTO>(this.baseUrl, reserva);
  }

  getReservasPorRut(rut: string): Observable<ReservaDTO[]> {
    const params = new HttpParams().set('rut', rut);
    return this.http.get<ReservaDTO[]>(`${this.baseUrl}/mis-reservas`, { params });
  }
}
