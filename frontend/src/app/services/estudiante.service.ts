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

  buscarEstudiantePorRut(rut: string): Observable<Estudiante> {
    const params = new HttpParams().set('rut', rut);
    return this.http.get<Estudiante>(`${this.baseUrl}/buscar/rut`, { params });
  }

  crearEstudiante(
    rut: string,
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
    telefono?: string
  ): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.baseUrl, { rut, nombre, apellido, correo, contrasena, telefono });
  }

  actualizarTelefono(id: number, telefono: string): Observable<Estudiante> {
    return this.http.patch<Estudiante>(`${this.baseUrl}/${id}/telefono`, { telefono });
  }
}
