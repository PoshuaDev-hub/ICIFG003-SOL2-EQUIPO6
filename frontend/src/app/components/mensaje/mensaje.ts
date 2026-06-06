import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensaje.html',
  styleUrl: './mensaje.scss'
})
export class MensajeComponent implements OnChanges, OnDestroy {
  @Input() tipo: 'exito' | 'error' = 'exito';
  @Input() texto: string = '';
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();

  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']?.currentValue === true) {
      this.clearTimer();
      this.timer = setTimeout(() => this.cerrar.emit(), 4000);
    } else {
      this.clearTimer();
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  onCerrar() {
    this.clearTimer();
    this.cerrar.emit();
  }

  private clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
