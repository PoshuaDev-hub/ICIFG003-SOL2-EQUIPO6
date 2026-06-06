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
    return `https://picsum.photos/seed/sala${this.sala.id}/400/300`;
  }
}
