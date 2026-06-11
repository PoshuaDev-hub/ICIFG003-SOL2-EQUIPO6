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

  // Búsqueda por RUT ahora requiere contraseña
  getReservasPorRut(rut: string, contrasena: string): Observable<ReservaDTO[]> {
    const params = new HttpParams().set('rut', rut).set('contrasena', contrasena);
    return this.http.get<ReservaDTO[]>(`${this.baseUrl}/mis-reservas`, { params });
  }

  getReservasPorCorreo(correo: string, contrasena: string): Observable<ReservaDTO[]> {
    const params = new HttpParams().set('correo', correo).set('contrasena', contrasena);
    return this.http.get<ReservaDTO[]>(`${this.baseUrl}/mis-reservas/correo`, { params });
  }

  getReservasPorTelefono(telefono: string, contrasena: string): Observable<ReservaDTO[]> {
    const params = new HttpParams().set('telefono', telefono).set('contrasena', contrasena);
    return this.http.get<ReservaDTO[]>(`${this.baseUrl}/mis-reservas/telefono`, { params });
  }

  actualizarObservacion(id: number, observacion: string): Observable<ReservaDTO> {
    return this.http.patch<ReservaDTO>(`${this.baseUrl}/${id}/observacion`, { observacion });
  }

  cancelarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
