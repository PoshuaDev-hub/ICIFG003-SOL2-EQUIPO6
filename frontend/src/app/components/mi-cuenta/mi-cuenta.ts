import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EstudianteService } from '../../services/estudiante.service';
import { ReservaService } from '../../services/reserva.service';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { ReservaDTO } from '../../interfaces/reserva.interface';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.scss'
})
export class MiCuentaComponent implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  @Output() sesionCerrada = new EventEmitter<void>();

  seccion: 'perfil' | 'reservas' = 'perfil';
  usuario: Estudiante | null = null;

  // Perfil edit
  editandoTelefono = false;
  nuevoTelefono = '';
  guardandoTelefono = false;
  telefonoMsg = '';
  telefonoError = false;

  // Reservas
  reservas: ReservaDTO[] = [];
  cargandoReservas = false;
  errorReservas = '';

  // Editar observacion
  editandoId: number | null = null;
  nuevaObservacion = '';
  guardandoObs = false;
  obsMsg = '';

  // Cancelar reserva
  cancelandoId: number | null = null;
  confirmarCancelacion = false;

  constructor(
    private authService: AuthService,
    private estudianteService: EstudianteService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.usuario = this.authService.currentUser;
    this.nuevoTelefono = this.usuario?.telefono ?? '';
    this.cargarReservas();
  }

  cargarReservas() {
    if (!this.usuario) return;
    this.cargandoReservas = true;
    this.errorReservas = '';
    // Usamos sessionStorage para recuperar la contraseña de la sesión actual
    const session = sessionStorage.getItem('biblioteca_usuario');
    // La contraseña no se guarda en el usuario; usamos el servicio de auth con RUT
    // Para ver reservas del usuario logueado, buscamos por idEstudiante en el DTO
    // Hacemos la búsqueda por correo que sí tiene el usuario logueado (seguro)
    // Sin embargo necesitamos la contraseña — usamos un campo especial almacenado
    const pass = sessionStorage.getItem('biblioteca_pass') ?? '';
    this.reservaService.getReservasPorRut(this.usuario.rut, pass).subscribe({
      next: (data) => {
        this.reservas = data;
        this.cargandoReservas = false;
      },
      error: () => {
        this.errorReservas = 'No se pudieron cargar tus reservas.';
        this.cargandoReservas = false;
      }
    });
  }

  // ===== PERFIL =====
  iniciarEdicionTelefono() {
    this.editandoTelefono = true;
    this.nuevoTelefono = this.usuario?.telefono ?? '';
    this.telefonoMsg = '';
    this.telefonoError = false;
  }

  cancelarEdicionTelefono() {
    this.editandoTelefono = false;
    this.telefonoMsg = '';
  }

  guardarTelefono() {
    if (!this.usuario) return;
    this.guardandoTelefono = true;
    this.telefonoMsg = '';
    this.estudianteService.actualizarTelefono(this.usuario.id, this.nuevoTelefono).subscribe({
      next: (updated) => {
        this.guardandoTelefono = false;
        this.editandoTelefono = false;
        this.telefonoError = false;
        this.telefonoMsg = 'Teléfono actualizado correctamente.';
        this.authService.updateLocalUser({ telefono: updated.telefono });
        this.usuario = this.authService.currentUser;
        setTimeout(() => this.telefonoMsg = '', 3000);
      },
      error: () => {
        this.guardandoTelefono = false;
        this.telefonoError = true;
        this.telefonoMsg = 'Error al actualizar el teléfono.';
      }
    });
  }

  // ===== RESERVAS — EDITAR OBSERVACIÓN =====
  iniciarEdicionObs(reserva: ReservaDTO) {
    this.editandoId = reserva.id;
    this.nuevaObservacion = reserva.observacion ?? '';
    this.obsMsg = '';
  }

  cancelarEdicionObs() {
    this.editandoId = null;
    this.obsMsg = '';
  }

  guardarObservacion() {
    if (this.editandoId === null) return;
    this.guardandoObs = true;
    this.reservaService.actualizarObservacion(this.editandoId, this.nuevaObservacion).subscribe({
      next: (updated) => {
        this.guardandoObs = false;
        const idx = this.reservas.findIndex(r => r.id === this.editandoId);
        if (idx > -1) this.reservas[idx] = updated;
        this.editandoId = null;
        this.obsMsg = 'Observación actualizada.';
        setTimeout(() => this.obsMsg = '', 3000);
      },
      error: (err) => {
        this.guardandoObs = false;
        this.obsMsg = err.error?.error ?? 'Error al actualizar.';
      }
    });
  }

  // ===== RESERVAS — CANCELAR =====
  pedirConfirmacion(id: number) {
    this.cancelandoId = id;
    this.confirmarCancelacion = true;
  }

  cancelarConfirmacion() {
    this.cancelandoId = null;
    this.confirmarCancelacion = false;
  }

  confirmarCancelar() {
    if (this.cancelandoId === null) return;
    this.reservaService.cancelarReserva(this.cancelandoId).subscribe({
      next: () => {
        this.reservas = this.reservas.filter(r => r.id !== this.cancelandoId);
        this.cancelandoId = null;
        this.confirmarCancelacion = false;
        this.cargarReservas(); // reload to get updated status
      },
      error: () => {
        this.cancelandoId = null;
        this.confirmarCancelacion = false;
      }
    });
  }

  // ===== CERRAR SESIÓN =====
  cerrarSesion() {
    this.authService.logout();
    sessionStorage.removeItem('biblioteca_pass');
    this.sesionCerrada.emit();
    this.cerrar.emit();
  }
}
