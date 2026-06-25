import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'; // <-- Importamos SweetAlert2

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        
        // Status 0 significa que el backend no responde
        if (error.status === 0) {
          // Reemplazamos el alert() feo por una alerta profesional
          Swal.fire({
            icon: 'error',
            title: 'Servidor Fuera de Línea',
            text: 'No se pudo establecer conexión con el backend. Por favor, intente más tarde.',
            confirmButtonColor: '#dc3545', // Un rojo elegante
            confirmButtonText: 'Entendido',
            background: '#333', // Opcional: fondo oscuro si tu web es oscura
            color: '#fff' // Opcional: texto blanco
          });
          console.error('Error de conexión:', error.error);
        }
        
        return throwError(() => new Error('Error en la petición HTTP'));
      })
    );
  }
}