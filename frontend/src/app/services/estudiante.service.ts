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

  /**
   * Deduce el correo institucional a partir del RUT (REQ13).
   * Toma solo el cuerpo del RUT (sin puntos, sin guión, sin dígito verificador)
   * y arma el correo en formato institucional: 12345678-9 -> 12345678@usm.cl
   */
  deducirCorreoInstitucional(rut: string): string {
    if (!rut) return '';
    const limpio = rut.replace(/[^0-9kK]/g, '');
    if (limpio.length < 2) return '';
    const cuerpo = limpio.slice(0, -1); // descarta el dígito verificador
    return `${cuerpo}@usm.cl`;
  }
}
