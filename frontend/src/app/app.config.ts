import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// 1. Agregamos HTTP_INTERCEPTORS y withInterceptorsFromDi a esta línea
import { provideHttpClient, withFetch, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
// 2. Importamos clase ErrorInterceptor
import { ErrorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // 3. Le decimos a HttpClient que use Fetch y que además escuche a nuestro interceptor
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    // 4. Registramos oficialmente el guardia
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
};