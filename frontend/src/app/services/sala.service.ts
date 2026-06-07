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

  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.baseUrl);
  }

  getSalasPorCapacidad(capacidad: number): Observable<Sala[]> {
    const params = new HttpParams().set('capacidad', capacidad.toString());
    return this.http.get<Sala[]>(this.baseUrl, { params });
  }

  getHorariosDisponibles(idSala: number, fecha: string): Observable<Horario[]> {
    const params = new HttpParams()
      .set('sala', idSala.toString())
      .set('fecha', fecha);
    return this.http.get<Horario[]>(`${environment.apiUrl}/horarios/disponibles`, { params });
  }
}
