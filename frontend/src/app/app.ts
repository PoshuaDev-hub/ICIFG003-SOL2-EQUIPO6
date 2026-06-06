import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuNavComponent } from './components/menu-nav/menu-nav';
import { MensajeComponent } from './components/mensaje/mensaje';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuNavComponent, MensajeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
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

  simularReserva() {
    this.mostrarMensaje('exito', 'Reserva registrada correctamente. Recibirás una confirmación pronto.');
  }

  // --- 3. Floater Widget ---
  isFloaterOpen = false;

  toggleFloater() {
    this.isFloaterOpen = !this.isFloaterOpen;
  }
}
