import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuNavComponent } from './components/menu-nav/menu-nav';
import { MensajeComponent } from './components/mensaje/mensaje';
import { TarjetaSalaComponent } from './components/tarjeta-sala/tarjeta-sala';
import { FormularioReservaComponent } from './components/formulario-reserva/formulario-reserva';
import { ListadoReservasComponent } from './components/listado-reservas/listado-reservas';
import { BuscadorReservasComponent } from './components/buscador-reservas/buscador-reservas';
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta';
import { SalaService } from './services/sala.service';
import { AuthService } from './services/auth.service';
import { Sala } from './interfaces/sala.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, FormsModule, 
    MenuNavComponent, MensajeComponent, TarjetaSalaComponent, 
    FormularioReservaComponent, ListadoReservasComponent, BuscadorReservasComponent,
    LoginComponent, RegistroComponent, MiCuentaComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  // --- Issue 13: Filtrado de Salas ---
  salas: Sala[] = [];
  filtroCapacidad: number = 0;
  filtroFecha: string = new Date().toISOString().split('T')[0];
  hoy: string = this.filtroFecha;
  cargandoSalas = false;

  // Modales
  mostrarLogin = false;
  mostrarRegistro = false;
  mostrarMiCuenta = false;
  mostrarBuscadorReservas = false;

  constructor(
    private salaService: SalaService,
    public authService: AuthService
  ) {}

  // --- Issue 14: Formulario de Reserva ---
  salaSeleccionada: Sala | null = null;

  // --- Issue 15: Listado de reservas por sala (RF04) ---
  salaParaListado: Sala | null = null;

  onVerReservas(idSala: number) {
    const sala = this.salas.find(s => s.id === idSala);
    if (sala) this.salaParaListado = sala;
  }

  trackPorId(_index: number, sala: Sala): number {
    return sala.id;
  }

  onCerrarListado() {
    this.salaParaListado = null;
  }

  abrirBuscadorReservas() {
    if (this.authService.isLoggedIn()) {
      this.mostrarMiCuenta = true;
    } else {
      this.mostrarBuscadorReservas = true;
    }
  }

  cerrarBuscadorReservas() {
    this.mostrarBuscadorReservas = false;
  }

  // --- Mensaje (éxito / error) ---
  mensajeVisible = false;
  mensajeTipo: 'exito' | 'error' = 'exito';
  mensajeTexto = '';

  mostrarMensaje(tipo: 'exito' | 'error', texto: string) {
    this.mensajeTipo = tipo;
    this.mensajeTexto = texto;
    this.mensajeVisible = true;
  }

  cerrarMensaje() {
    this.mensajeVisible = false;
  }

  // --- 2. Carrusel Hero ---
  // Utilizamos imágenes online reales de bibliotecas para el Demo, 
  // pero ya tienes listos los archivos en assets/carousel/ para reemplazarlos.
  slides = [
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80', // Biblioteca clásica
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1600&q=80', // Libros iluminados
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80'  // Estantes
  ];
  currentSlide = 0;
  private carouselInterval: any;

  ngOnInit() {
    this.startCarousel();
    this.cargarSalas();
  }

  // --- Métodos Issue 13 ---
  cargarSalas() {
    this.cargandoSalas = true;
    this.salaService.getSalas().subscribe({
      next: (data) => {
        this.salas = data;
        this.cargandoSalas = false;
      },
      error: (err) => {
        console.error('Error cargando salas', err);
        this.cargandoSalas = false;
        this.mostrarMensaje('error', 'No se pudieron cargar las salas desde el servidor.');
      }
    });
  }

  aplicarFiltros() {
    this.cargandoSalas = true;
    if (this.filtroCapacidad > 0) {
      this.salaService.getSalasPorCapacidad(this.filtroCapacidad).subscribe({
        next: (data) => {
          this.salas = data;
          this.cargandoSalas = false;
        },
        error: (err) => {
          console.error('Error filtrando salas', err);
          this.cargandoSalas = false;
        }
      });
    } else {
      this.cargarSalas();
    }
  }

  onReservar(idSala: number) {
    const sala = this.salas.find(s => s.id === idSala);
    if (sala) this.salaSeleccionada = sala;
  }

  onReservaCreada() {
    this.salaSeleccionada = null;
    this.mostrarMensaje('exito', 'Reserva creada exitosamente.');
  }

  onCancelarReserva() {
    this.salaSeleccionada = null;
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    // Cambio automático cada 10 segundos
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 10000); 
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Reiniciar temporizador al hacer clic manual
    this.stopCarousel();
    this.startCarousel();
  }



  // --- 3. Floater Widget ---
  isFloaterOpen = false;

  toggleFloater() {
    this.isFloaterOpen = !this.isFloaterOpen;
  }
}
