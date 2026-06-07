import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Input() salaNombre: string = '';
  @Input() fechaInicial: string = '';
  @Output() reservaCreada = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;
  horariosDisponibles: Horario[] = [];
  submitted = false;
  cargandoHorarios = false;
  enviando = false;
  errorMsg: string = '';
  hoyMin: string = new Date().toISOString().split('T')[0];
  modo: 'reserva' | 'registro' = 'reserva';

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private salaService: SalaService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.initForm();
    if (this.fechaInicial) {
      this.form.patchValue({ fecha: this.fechaInicial });
    }
    if (this.idSala && this.form.value.fecha) {
      this.cargarHorarios();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idSala'] && !changes['idSala'].firstChange && this.idSala && this.form?.value?.fecha) {
      this.cargarHorarios();
    }
  }

  private initForm() {
    this.form = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern(/^\d{1,8}-[\dkK]$/)]],
      nombre: [''],
      apellido: [''],
      fecha: ['', [Validators.required, this.fechaNoAnteriorValidator]],
      idHorario: [null, Validators.required],
      observaciones: ['']
    });
  }

  private fechaNoAnteriorValidator(control: import('@angular/forms').AbstractControl): import('@angular/forms').ValidationErrors | null {
    if (!control.value) return null;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(control.value + 'T00:00:00');
    return fecha < hoy ? { fechaNoAnterior: true } : null;
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

  irARegistro() {
    this.modo = 'registro';
    this.form.controls['nombre'].setValidators([Validators.required]);
    this.form.controls['apellido'].setValidators([Validators.required]);
    this.form.controls['nombre'].updateValueAndValidity();
    this.form.controls['apellido'].updateValueAndValidity();
    this.errorMsg = '';
  }

  volverAReserva() {
    this.modo = 'reserva';
    this.submitted = false;
    this.form.controls['nombre'].clearValidators();
    this.form.controls['apellido'].clearValidators();
    this.form.controls['nombre'].updateValueAndValidity();
    this.form.controls['apellido'].updateValueAndValidity();
    this.errorMsg = '';
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = '';

    if (this.form.invalid) return;
    if (!this.idSala) return;

    const { rut, nombre, apellido, fecha, idHorario, observaciones } = this.form.value;
    const salaId: number = this.idSala;

    if (this.modo === 'registro') {
      this.enviando = true;
      this.estudianteService.crearEstudiante(rut, nombre, apellido).subscribe({
        next: () => {
          this.enviando = false;
          this.volverAReserva();
          this.errorMsg = 'Estudiante registrado correctamente. Confirma la reserva.';
        },
        error: () => {
          this.enviando = false;
          this.errorMsg = 'Error al registrar el estudiante. Intenta de nuevo.';
        }
      });
      return;
    }

    const crearReserva = (idEstudiante: number) => {
      const body = {
        fechaReserva: fecha,
        observacion: observaciones || null,
        idEstudiante,
        idSala: salaId,
        idHorario,
        idEstado: 1
      };

      this.enviando = true;
      this.reservaService.crearReserva(body).subscribe({
        next: () => {
          this.enviando = false;
          this.reservaCreada.emit();
          this.resetForm();
        },
        error: (err) => {
          this.enviando = false;
          if (err.status === 400) {
            this.errorMsg = 'Datos inválidos. Revisa los campos e intenta de nuevo.';
          } else if (err.status === 409) {
            this.errorMsg = 'Conflicto de horario: ya existe una reserva en ese mismo bloque.';
          } else {
            this.errorMsg = 'Error del servidor. Intenta de nuevo más tarde.';
          }
        }
      });
    };

    this.estudianteService.buscarEstudiantePorRut(rut).subscribe({
      next: (estudiante) => crearReserva(estudiante.id),
      error: () => {
        this.errorMsg = 'Estudiante no encontrado.';
      }
    });
  }

  resetForm() {
    this.form.reset({ rut: '', nombre: '', apellido: '', fecha: '', idHorario: null, observaciones: '' });
    this.horariosDisponibles = [];
    this.submitted = false;
    this.modo = 'reserva';
  }
}
