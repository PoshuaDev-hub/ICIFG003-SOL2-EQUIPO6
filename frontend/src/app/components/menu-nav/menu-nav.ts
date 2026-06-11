import { Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-nav.html',
  styleUrl: './menu-nav.scss'
})
export class MenuNavComponent {
  authService = inject(AuthService);

  isScrolled = false;
  isMenuOpen = false;
  isDropdownOpen = false;

  @Output() misReservasClick = new EventEmitter<void>();
  @Output() loginClick = new EventEmitter<void>();
  @Output() registroClick = new EventEmitter<void>();
  @Output() miCuentaClick = new EventEmitter<void>();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', [])
  onDocumentClick() {
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    sessionStorage.removeItem('biblioteca_pass');
  }
}
