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
  @Output() verReservas = new EventEmitter<number>();

  private imagenes = [
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80',
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    'https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?w=600&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
    'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80',
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80'
  ];

  get imagenSala(): string {
    return this.imagenes[this.sala.id % this.imagenes.length];
  }
}
