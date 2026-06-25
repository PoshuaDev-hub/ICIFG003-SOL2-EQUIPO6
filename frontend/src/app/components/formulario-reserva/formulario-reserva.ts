import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
export class FormularioReservaComponent implements OnInit, OnChanges, OnDestroy {
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

  // REQ13: usabilidad — autollenado por RUT con debounce
  estudianteEncontrado = false;
  buscandoEstudiante = false;
  correoDeducido: string = '';
  private rutBuscador$ = new Subject<string>();
  private rutSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private salaService: SalaService,
    private reservaService: ReservaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();

    // REQ13: la fecha por defecto es hoy (evita pedir un dato deducible)
    const fechaPorDefecto = this.fechaInicial || this.hoyMin;
    this.form.patchValue({ fecha: fechaPorDefecto });

    const user = this.authService.currentUser;
    if (user) {
      // Usuario con sesión: precargamos su RUT y deducimos su correo
      this.form.patchValue({ rut: user.rut });
      this.aplicarCorreoDeducido(user.rut);
      this.estudianteEncontrado = true;
    }

    // REQ13: búsqueda de estudiante por RUT mientras escribe (con debounce)
    this.rutSub = this.rutBuscador$.pipe(
      debounceTime(450),
      distinctUntilChanged()
    ).subscribe(rut => this.buscarYAutollenar(rut));

    if (this.idSala && this.form.value.fecha) {
      this.cargarHorarios();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idSala'] && !changes['idSala'].firstChange && this.idSala && this.form?.value?.fecha) {
      this.cargarHorarios();
    }
  }

  ngOnDestroy() {
    this.rutSub?.unsubscribe();
  }

  private initForm() {
    this.form = this.fb.group({
      // REQ12: RUT con validación de formato y de dígito verificador real
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[\dkK]$/), this.rutDvValidator.bind(this)]],
      // El correo ya no se pide: se deduce del RUT (REQ13). Lo mantenemos como control oculto.
      correo: [''],
      // REQ12: nombre/apellido no vacíos ni solo espacios, mínimo 2 caracteres
      nombre: ['', [this.noSoloEspacios]],
      apellido: ['', [this.noSoloEspacios]],
      telefono: ['', [Validators.pattern(/^\+?\d{8,12}$/)]],
      contrasena: [''],
      confirmarContrasena: [''],
      fecha: ['', [Validators.required, this.fechaNoAnteriorValidator]],
      idHorario: [null, Validators.required],
      // REQ12: observaciones opcional, pero si se escribe debe tener al menos 15 caracteres
      observaciones: ['', [this.minLengthSiPresente(15)]]
    });

    this.form.get('rut')?.valueChanges.subscribe(val => {
      if (val) {
        const formatted = this.authService.formatearRut(val);
        if (val !== formatted) {
          this.form.get('rut')?.setValue(formatted, { emitEvent: false });
        }
        // Deduce el correo institucional en vivo (REQ13)
        this.aplicarCorreoDeducido(formatted);
        // Dispara la búsqueda por RUT con debounce si el formato es válido
        if (this.form.get('rut')?.valid) {
          this.rutBuscador$.next(this.authService.normalizarRut(formatted));
        } else {
          this.estudianteEncontrado = false;
        }
      } else {
        this.correoDeducido = '';
        this.estudianteEncontrado = false;
      }
    });
  }

  /** REQ13: aplica el correo deducido al control oculto y a la vista. */
  private aplicarCorreoDeducido(rut: string) {
    this.correoDeducido = this.estudianteService.deducirCorreoInstitucional(rut);
    this.form.get('correo')?.setValue(this.correoDeducido, { emitEvent: false });
  }

  /** REQ13: busca al estudiante por RUT y autollena nombre/apellido si ya existe. */
  private buscarYAutollenar(rut: string) {
    if (!rut || this.modo === 'registro') return;
    this.buscandoEstudiante = true;
    this.estudianteService.buscarEstudiantePorRut(rut).subscribe({
      next: (est) => {
        this.buscandoEstudiante = false;
        this.estudianteEncontrado = true;
        this.form.patchValue(
          { nombre: est.nombre, apellido: est.apellido, correo: est.correo },
          { emitEvent: false }
        );
        this.correoDeducido = est.correo;
      },
      error: () => {
        this.buscandoEstudiante = false;
        this.estudianteEncontrado = false;
      }
    });
  }

  // ===== Validadores reutilizables (REQ12) =====

  /** Valida el dígito verificador del RUT chileno (módulo 11). */
  private rutDvValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;
    const limpio = String(valor).replace(/[^0-9kK]/g, '');
    if (limpio.length < 2) return { rutInvalido: true };
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1).toUpperCase();
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i], 10) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
    return dv === dvEsperado ? null : { rutDv: true };
  }

  /** No permite valores que sean solo espacios; exige al menos 2 caracteres reales. */
  private noSoloEspacios(control: AbstractControl): ValidationErrors | null {
    if (control.value === null || control.value === '') return null;
    const limpio = String(control.value).trim();
    return limpio.length >= 2 ? null : { nombreInvalido: true };
  }

  /** Exige longitud mínima solo si el campo trae texto. */
  private minLengthSiPresente(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value ? String(control.value).trim() : '';
      if (val.length === 0) return null;
      return val.length >= min ? null : { minLengthSiPresente: { requerido: min, actual: val.length } };
    };
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
    this.form.controls['nombre'].setValidators([Validators.required, this.noSoloEspacios]);
    this.form.controls['apellido'].setValidators([Validators.required, this.noSoloEspacios]);
    this.form.controls['contrasena'].setValidators([Validators.required, Validators.minLength(6)]);
    ['nombre', 'apellido', 'contrasena'].forEach(c =>
      this.form.controls[c].updateValueAndValidity()
    );
    // En registro el correo institucional ya está deducido del RUT (REQ13)
    this.aplicarCorreoDeducido(this.form.get('rut')?.value || '');
    this.form.updateValueAndValidity();
    this.errorMsg = '';
  }

  volverAReserva() {
    this.modo = 'reserva';
    this.submitted = false;
    // Restauramos validadores "suaves" de reserva (no requeridos, pero válidos si hay texto)
    this.form.controls['nombre'].setValidators([this.noSoloEspacios]);
    this.form.controls['apellido'].setValidators([this.noSoloEspacios]);
    ['contrasena', 'confirmarContrasena'].forEach(c => this.form.controls[c].clearValidators());
    ['nombre', 'apellido', 'contrasena', 'confirmarContrasena'].forEach(c =>
      this.form.controls[c].updateValueAndValidity()
    );
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

    // El correo siempre se deduce del RUT (REQ13)
    const correoFinal = correo || this.estudianteService.deducirCorreoInstitucional(normalizedRut);

    if (this.modo === 'registro') {
      this.enviando = true;
      this.estudianteService.crearEstudiante(normalizedRut, nombre, apellido, correoFinal, contrasena, telefono || undefined).subscribe({
        next: (estudiante) => {
          this.enviando = false;
          this.authService.loginDirect(estudiante, contrasena);
          this.volverAReserva();
          this.errorMsg = 'Estudiante registrado correctamente. Confirma la reserva.';
          this.estudianteEncontrado = true;
          this.form.patchValue({ rut: normalizedRut, correo: estudiante.correo });
        },
        error: (err) => {
          this.enviando = false;
          this.errorMsg = this.mensajeDeError(err, 'registro');
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
          this.errorMsg = this.mensajeDeError(err, 'reserva');
        }
      });
    };

    this.estudianteService.buscarEstudiantePorRut(normalizedRut).subscribe({
      next: (estudiante) => crearReserva(estudiante.id),
      error: (err) => {
        // status 0 => backend caído (REQ11); 404 => estudiante no existe
        if (err.status === 0) this.errorMsg = this.mensajeDeError(err, 'reserva');
        else this.errorMsg = 'Estudiante no encontrado.';
      }
    });
  }

  /**
   * REQ12 + REQ11: traduce la respuesta del backend a un mensaje claro para el usuario,
   * priorizando el texto que envíe la API y cubriendo el caso de servidor caído.
   */
  private mensajeDeError(err: any, contexto: 'reserva' | 'registro'): string {
    if (err?.status === 0) {
      return 'No se pudo conectar con el servidor. Verifica tu conexión o inténtalo más tarde.';
    }
    // Si el backend envía un mensaje descriptivo, lo mostramos tal cual
    const apiMsg = err?.error?.message || err?.error?.error || (typeof err?.error === 'string' ? err.error : '');
    if (err?.status === 409) {
      return apiMsg || (contexto === 'registro'
        ? 'Ya existe un usuario con ese RUT o correo.'
        : 'Conflicto de horario: ese bloque ya está reservado.');
    }
    if (err?.status === 400) {
      return apiMsg || 'Datos inválidos. Revisa los campos marcados.';
    }
    if (err?.status === 404) {
      return apiMsg || 'No se encontró el recurso solicitado.';
    }
    return 'Ocurrió un error en el servidor. Inténtalo más tarde.';
  }

  resetForm() {
    // REQ13: al limpiar dejamos la fecha de hoy por defecto (dato deducible)
    this.form.reset({ rut: '', correo: '', nombre: '', apellido: '', telefono: '', contrasena: '', confirmarContrasena: '', fecha: this.hoyMin, idHorario: null, observaciones: '' });
    this.horariosDisponibles = [];
    this.submitted = false;
    this.modo = 'reserva';
    this.mostrarContrasena = false;
    this.mostrarConfirmacion = false;
    this.estudianteEncontrado = false;
    this.correoDeducido = '';
    // Autofill user details if logged in
    const user = this.authService.currentUser;
    if (user) {
      this.form.patchValue({ rut: user.rut });
      this.aplicarCorreoDeducido(user.rut);
      this.estudianteEncontrado = true;
    }
  }
}
