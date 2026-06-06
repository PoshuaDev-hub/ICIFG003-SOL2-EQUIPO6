import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sala } from '../../interfaces/sala.interface';

@Component({
  selector: 'app-tarjeta-sala',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-sala.html',
  styleUrl: './tarjeta-sala.scss'
})
export class TarjetaSalaComponent {
  @Input({ required: true }) sala!: Sala;
  @Output() reservar = new EventEmitter<number>();

  getImagenSala(): string {
    const id = (this.sala.id % 5) + 1;
    return `https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80`;
  }
}
