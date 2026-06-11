import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estudiante } from '../interfaces/estudiante.interface';

export type TipoLogin = 'rut' | 'correo' | 'telefono';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = `${environment.apiUrl}/auth/login`;
  private readonly SESSION_KEY = 'biblioteca_usuario';

  private _currentUser = new BehaviorSubject<Estudiante | null>(this.loadFromStorage());
  currentUser$ = this._currentUser.asObservable();

  constructor(private http: HttpClient) {}

  get currentUser(): Estudiante | null {
    return this._currentUser.value;
  }

  isLoggedIn(): boolean {
    return this._currentUser.value !== null;
  }

  login(identificador: string, contrasena: string, tipo: TipoLogin): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.loginUrl, { identificador, contrasena, tipo }).pipe(
      tap((user) => {
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
        sessionStorage.setItem('biblioteca_pass', contrasena);
        this._currentUser.next(user);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    this._currentUser.next(null);
  }

  updateLocalUser(updated: Partial<Estudiante>): void {
    const current = this._currentUser.value;
    if (current) {
      const merged = { ...current, ...updated };
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(merged));
      this._currentUser.next(merged);
    }
  }

  loginDirect(user: Estudiante, contrasena: string): void {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    sessionStorage.setItem('biblioteca_pass', contrasena);
    this._currentUser.next(user);
  }

  normalizarRut(rut: string): string {
    let clean = rut.replace(/[^0-9kK]/g, '');
    if (clean.length < 2) return clean;
    let cuerpo = clean.slice(0, -1);
    let dv = clean.slice(-1).toUpperCase();
    return `${cuerpo}-${dv}`;
  }

  formatearRut(valor: string): string {
    if (!valor) return '';
    let clean = valor.replace(/[^0-9kK]/g, '');
    if (clean.length <= 1) return clean;
    if (clean.length > 9) {
      clean = clean.slice(0, 9);
    }
    let cuerpo = clean.slice(0, -1);
    let dv = clean.slice(-1).toUpperCase();
    return `${cuerpo}-${dv}`;
  }

  private loadFromStorage(): Estudiante | null {
    try {
      const raw = sessionStorage.getItem(this.SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
