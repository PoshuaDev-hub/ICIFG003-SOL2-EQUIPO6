import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { SalaService } from '../../services/sala.service';
import { ReservaService } from '../../services/reserva.service';
import { Horario } from '../../interfaces/horario.interface';
import { AuthService } from '../../services/auth.service';

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
  mostrarContrasena = false;
  mostrarConfirmacion = false;

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private salaService: SalaService,
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    const user = this.authService.currentUser;
    if (user) {
      this.form.patchValue({
        rut: user.rut,
        correo: user.correo
      });
    }
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
      correo: ['', [Validators.required, Validators.email]],
      nombre: [''],
      apellido: [''],
      telefono: [''],
      contrasena: [''],
      confirmarContrasena: [''],
      fecha: ['', [Validators.required, this.fechaNoAnteriorValidator]],
      idHorario: [null, Validators.required],
      observaciones: ['']
    });

    this.form.get('rut')?.valueChanges.subscribe(val => {
      if (val) {
        const formatted = this.authService.formatearRut(val);
        if (val !== formatted) {
          this.form.get('rut')?.setValue(formatted, { emitEvent: false });
        }
      }
    });
  }

  private fechaNoAnteriorValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(control.value + 'T00:00:00');
    return fecha < hoy ? { fechaNoAnterior: true } : null;
  }

  private contrasenaMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass && confirm && pass !== confirm ? { contrasenaNoCoincide: true } : null;
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
    this.submitted = false;
    this.form.controls['nombre'].setValidators([Validators.required]);
    this.form.controls['apellido'].setValidators([Validators.required]);
    this.form.controls['contrasena'].setValidators([Validators.required, Validators.minLength(6)]);
    ['nombre', 'apellido', 'contrasena'].forEach(c =>
      this.form.controls[c].updateValueAndValidity()
    );
    this.form.updateValueAndValidity();
    this.errorMsg = '';
  }

  volverAReserva() {
    this.modo = 'reserva';
    this.submitted = false;
    ['nombre', 'apellido', 'contrasena', 'confirmarContrasena'].forEach(c => {
      this.form.controls[c].clearValidators();
      this.form.controls[c].updateValueAndValidity();
    });
    this.form.clearValidators();
    this.form.updateValueAndValidity();
    this.errorMsg = '';
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = '';

    if (this.form.invalid) return;
    if (!this.idSala) return;

    const { rut, correo, nombre, apellido, telefono, contrasena, fecha, idHorario, observaciones } = this.form.value;
    const salaId: number = this.idSala;
    const normalizedRut = this.authService.normalizarRut(rut);

    if (this.modo === 'registro') {
      this.enviando = true;
      this.estudianteService.crearEstudiante(normalizedRut, nombre, apellido, correo, contrasena, telefono || undefined).subscribe({
        next: (estudiante) => {
          this.enviando = false;
          this.authService.loginDirect(estudiante, contrasena);
          this.volverAReserva();
          this.errorMsg = 'Estudiante registrado correctamente. Confirma la reserva.';
          this.form.patchValue({ rut: normalizedRut, correo: estudiante.correo });
        },
        error: (err) => {
          this.enviando = false;
          this.errorMsg = err.status === 409
            ? 'Ya existe un usuario con ese RUT o correo.'
            : 'Error al registrar. Intenta de nuevo.';
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
          if (err.status === 400) this.errorMsg = 'Datos inválidos. Revisa los campos.';
          else if (err.status === 409) this.errorMsg = 'Conflicto de horario: ya existe una reserva en ese bloque.';
          else this.errorMsg = 'Error del servidor. Intenta más tarde.';
        }
      });
    };

    this.estudianteService.buscarEstudiantePorRut(normalizedRut).subscribe({
      next: (estudiante) => crearReserva(estudiante.id),
      error: () => { this.errorMsg = 'Estudiante no encontrado.'; }
    });
  }

  resetForm() {
    this.form.reset({ rut: '', correo: '', nombre: '', apellido: '', telefono: '', contrasena: '', confirmarContrasena: '', fecha: '', idHorario: null, observaciones: '' });
    this.horariosDisponibles = [];
    this.submitted = false;
    this.modo = 'reserva';
    this.mostrarContrasena = false;
    this.mostrarConfirmacion = false;
    // Autofill user details if logged in
    const user = this.authService.currentUser;
    if (user) {
      this.form.patchValue({
        rut: user.rut,
        correo: user.correo
      });
    }
  }
}
