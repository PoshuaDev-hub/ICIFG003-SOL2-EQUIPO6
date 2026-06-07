import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estudiante } from '../interfaces/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private readonly baseUrl = `${environment.apiUrl}/estudiantes`;

  constructor(private http: HttpClient) {}

  // RF05: Obtener todos los estudiantes para el buscador
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl);
  }

  // RF05: Buscar estudiantes por nombre o RUT
  buscarEstudiantes(termino: string): Observable<Estudiante[]> {
    const params = new HttpParams().set('q', termino);
    return this.http.get<Estudiante[]>(`${this.baseUrl}/buscar`, { params });
  }

  // RF05: Buscar un estudiante por RUT exacto
  buscarEstudiantePorRut(rut: string): Observable<Estudiante[]> {
    const params = new HttpParams().set('q', rut);
    return this.http.get<Estudiante[]>(`${this.baseUrl}/buscar`, { params });
  }

  // RF05: Obtener un estudiante por ID
  getEstudianteById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/${id}`);
  }
}
