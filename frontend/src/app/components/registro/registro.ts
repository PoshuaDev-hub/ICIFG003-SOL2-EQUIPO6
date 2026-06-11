import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class RegistroComponent implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  @Output() registroExitoso = new EventEmitter<void>();
  @Output() irALoginClick = new EventEmitter<void>();

  irALogin() {
    this.cerrar.emit();
    this.irALoginClick.emit();
  }

  form!: FormGroup;
  submitted = false;
  enviando = false;
  errorMsg = '';
  exitoMsg = '';
  mostrarPass = false;
  mostrarConfirmPass = false;

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern(/^\d{1,8}-[\dkK]$/)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    }, {
      validators: this.contrasenaMatchValidator
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

  private contrasenaMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass && confirm && pass !== confirm ? { contrasenaNoCoincide: true } : null;
  }

  registrar() {
    this.submitted = true;
    this.errorMsg = '';
    this.exitoMsg = '';

    if (this.form.invalid) return;

    const { rut, nombre, apellido, correo, contrasena, telefono } = this.form.value;
    const normalizedRut = this.authService.normalizarRut(rut);

    this.enviando = true;
    this.estudianteService.crearEstudiante(normalizedRut, nombre, apellido, correo, contrasena, telefono || undefined).subscribe({
      next: (estudiante) => {
        this.enviando = false;
        this.authService.loginDirect(estudiante, contrasena);
        this.exitoMsg = 'Registro completado exitosamente. ¡Sesión iniciada!';
        this.registroExitoso.emit();
        setTimeout(() => {
          this.cerrar.emit();
        }, 1500);
      },
      error: (err) => {
        this.enviando = false;
        if (err.status === 409) {
          this.errorMsg = 'Ya existe un usuario con ese RUT o correo electrónico.';
        } else {
          this.errorMsg = 'Error al registrar el estudiante. Inténtalo más tarde.';
        }
      }
    });
  }
}
