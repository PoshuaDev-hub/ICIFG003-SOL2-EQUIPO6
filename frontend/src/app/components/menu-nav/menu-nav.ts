import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-nav.html',
  styleUrl: './menu-nav.scss'
})
export class MenuNavComponent {
  isScrolled = false;
  isMenuOpen = false;
  @Output() misReservasClick = new EventEmitter<void>();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
