package com.equipo6.reservas.services;

import com.equipo6.reservas.dtos.ReservaDTO;
import com.equipo6.reservas.models.*;
import com.equipo6.reservas.repositories.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired private EstudianteRepository estudianteRepository;
    @Autowired private SalaRepository salaRepository;
    @Autowired private HorarioDisponibleRepository horarioRepository;
    @Autowired private EstadoReservaRepository estadoRepository;
    @Autowired private CredencialRepository credencialRepository;

    @Transactional
    public ReservaDTO crearReserva(ReservaDTO dto) {
        log.info("Creando reserva: sala={}, fecha={}, horario={}, estudiante={}",
                dto.getIdSala(), dto.getFechaReserva(), dto.getIdHorario(), dto.getIdEstudiante());
        validarFecha(dto.getFechaReserva());
        validarObservacion(dto.getObservacion());

        Estudiante estudiante = estudianteRepository.findById(dto.getIdEstudiante())
                .orElseThrow(() -> new IllegalArgumentException("El estudiante con ID " + dto.getIdEstudiante() + " no existe en los registros."));
        Sala sala = salaRepository.findById(dto.getIdSala())
                .orElseThrow(() -> new IllegalArgumentException("La sala con ID " + dto.getIdSala() + " no existe."));
        HorarioDisponible horario = horarioRepository.findById(dto.getIdHorario())
                .orElseThrow(() -> new IllegalArgumentException("El horario con ID " + dto.getIdHorario() + " no existe."));

        validarDisponibilidad(dto.getIdSala(), dto.getFechaReserva(), dto.getIdHorario());

        EstadoReserva estado = estadoRepository.findById(dto.getIdEstado())
                .orElseThrow(() -> new IllegalArgumentException("El estado de reserva con ID " + dto.getIdEstado() + " no existe."));

        Reserva reserva = new Reserva();
        reserva.setFechaReserva(dto.getFechaReserva());
        reserva.setObservacion(dto.getObservacion());
        reserva.setFechaCreacion(LocalDateTime.now());
        reserva.setEstudiante(estudiante);
        reserva.setSala(sala);
        reserva.setHorario(horario);
        reserva.setEstado(estado);

        Reserva reservaGuardada = reservaRepository.save(reserva);
        dto.setId(reservaGuardada.getId());
        dto.setNombreEstudiante(estudiante.getNombre() + " " + estudiante.getApellido());
        dto.setNombreSala(sala.getNombreSala());
        dto.setHoraInicio(horario.getHoraInicio().toString());
        dto.setHoraTermino(horario.getHoraTermino().toString());
        dto.setNombreEstado(estado.getNombreEstado());

        return dto;
    }

    private void validarFecha(LocalDate fecha) {
        if (fecha == null || fecha.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("La fecha de reserva no puede ser anterior al día actual.");
        }
    }

    private void validarObservacion(String observacion) {
        if (observacion != null && !observacion.trim().isEmpty() && observacion.trim().length() < 15) {
            throw new IllegalArgumentException("La observación debe tener al menos 15 caracteres.");
        }
    }

    private void validarDisponibilidad(Integer idSala, LocalDate fecha, Integer idHorario) {
        boolean existeConflicto = reservaRepository.existsReservaConfirmada(idSala, fecha, idHorario);
        if (existeConflicto) {
            throw new IllegalStateException("El horario seleccionado ya está reservado para esta sala en la fecha indicada.");
        }
    }

    public List<ReservaDTO> obtenerTodas() {
        return reservaRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<ReservaDTO> obtenerPorSalaYFecha(Integer idSala, LocalDate fecha) {
        return reservaRepository.findReservasPorSalaYFecha(idSala, fecha).stream().map(this::toDto).collect(Collectors.toList());
    }

    private ReservaDTO toDto(Reserva reserva) {
        ReservaDTO dto = new ReservaDTO();
        dto.setId(reserva.getId());
        dto.setFechaReserva(reserva.getFechaReserva());
        dto.setObservacion(reserva.getObservacion());
        dto.setIdEstudiante(reserva.getEstudiante().getId());
        dto.setIdSala(reserva.getSala().getId());
        dto.setIdHorario(reserva.getHorario().getId());
        dto.setIdEstado(reserva.getEstado().getIdEstado());
        dto.setNombreEstudiante(reserva.getEstudiante().getNombre() + " " + reserva.getEstudiante().getApellido());
        dto.setNombreSala(reserva.getSala().getNombreSala());
        dto.setHoraInicio(reserva.getHorario().getHoraInicio().toString());
        dto.setHoraTermino(reserva.getHorario().getHoraTermino().toString());
        dto.setNombreEstado(reserva.getEstado().getNombreEstado());
        return dto;
    }

    public List<ReservaDTO> obtenerPorRut(String rut, String contrasena) {
        // Verificar credencial antes de devolver reservas
        boolean credencialValida = credencialRepository.findByRutYContrasena(rut, contrasena).isPresent();
        if (!credencialValida) return java.util.Collections.emptyList();
        return reservaRepository.findByEstudianteRut(rut).stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<ReservaDTO> obtenerPorCorreo(String correo, String contrasena) {
        boolean valida = credencialRepository.findByCorreoYContrasena(correo, contrasena).isPresent();
        if (!valida) return java.util.Collections.emptyList();
        return reservaRepository.findByEstudianteCorreo(correo).stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<ReservaDTO> obtenerPorTelefono(String telefono, String contrasena) {
        boolean valida = credencialRepository.findByTelefonoYContrasena(telefono, contrasena).isPresent();
        if (!valida) return java.util.Collections.emptyList();
        return reservaRepository.findByEstudianteTelefono(telefono).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public ReservaDTO actualizarObservacion(Integer id, String observacion) {
        validarObservacion(observacion);
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reserva con ID " + id + " no encontrada."));
        reserva.setObservacion(observacion);
        return toDto(reservaRepository.save(reserva));
    }

    @Transactional
    public void cancelarReserva(Integer id) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reserva con ID " + id + " no encontrada."));
        // Marcar como cancelada (estado 2) en lugar de eliminar físicamente
        estadoRepository.findById(2).ifPresentOrElse(
            reserva::setEstado,
            () -> reservaRepository.deleteById(id)
        );
        if (reserva.getId() != null) reservaRepository.save(reserva);
    }
}