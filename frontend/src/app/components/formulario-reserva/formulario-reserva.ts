import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { SalaService } from '../../services/sala.service';
import { ReservaService } from '../../services/reserva.service';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { Horario } from '../../interfaces/horario.interface';

@Component({
  selector: 'app-formulario-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-reserva.html',
  styleUrl: './formulario-reserva.scss'
})
export class FormularioReservaComponent implements OnInit, OnChanges {
  @Input() idSala: number | null = null;
  @Output() reservaCreada = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;
  estudiantesEncontrados: Estudiante[] = [];
  horariosDisponibles: Horario[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  submitted = false;
  cargandoHorarios = false;

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private salaService: SalaService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idSala'] && !changes['idSala'].firstChange && this.idSala) {
      this.cargarHorarios();
    }
  }

  private initForm() {
    this.form = this.fb.group({
      estudiante: ['', Validators.required],
      fecha: ['', [Validators.required, this.fechaNoAnteriorValidator]],
      idHorario: [null, Validators.required],
      observaciones: ['', [Validators.required, Validators.minLength(15)]]
    });
  }

  private fechaNoAnteriorValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(control.value + 'T00:00:00');
    return fecha < hoy ? { fechaNoAnterior: true } : null;
  }

  buscarEstudiantes(termino: string) {
    if (!termino || termino.trim().length < 2) {
      this.estudiantesEncontrados = [];
      return;
    }
    this.estudianteService.buscarEstudiantes(termino.trim()).subscribe({
      next: (data) => this.estudiantesEncontrados = data,
      error: () => this.estudiantesEncontrados = []
    });
  }

  seleccionarEstudiante(est: Estudiante) {
    this.estudianteSeleccionado = est;
    this.estudiantesEncontrados = [];
    this.form.patchValue({ estudiante: `${est.nombre} ${est.apellido} — ${est.rut}` });
  }

  onFechaChange() {
    if (this.idSala && this.form.value.fecha) {
      this.cargarHorarios();
    }
  }

  cargarHorarios() {
    if (!this.idSala || !this.form.value.fecha) return;
    this.cargandoHorarios = true;
    this.horariosDisponibles = [];
    this.salaService.getHorariosDisponibles(this.idSala, this.form.value.fecha).subscribe({
      next: (data) => {
        this.horariosDisponibles = data;
        this.cargandoHorarios = false;
      },
      error: () => this.cargandoHorarios = false
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid || !this.estudianteSeleccionado || !this.idSala) return;

    const body = {
      fechaReserva: this.form.value.fecha,
      observacion: this.form.value.observaciones,
      idEstudiante: this.estudianteSeleccionado.id,
      idSala: this.idSala,
      idHorario: this.form.value.idHorario,
      idEstado: 1
    };

    this.reservaService.crearReserva(body).subscribe({
      next: () => {
        this.reservaCreada.emit();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creando reserva', err);
      }
    });
  }

  resetForm() {
    this.form.reset({ estudiante: '', fecha: '', idHorario: null, observaciones: '' });
    this.estudianteSeleccionado = null;
    this.estudiantesEncontrados = [];
    this.horariosDisponibles = [];
    this.submitted = false;
  }
}
