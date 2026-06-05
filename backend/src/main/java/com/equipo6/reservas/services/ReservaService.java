package com.equipo6.reservas.services;

import com.equipo6.reservas.dtos.ReservaDTO;
import com.equipo6.reservas.models.*;
import com.equipo6.reservas.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired private EstudianteRepository estudianteRepository;
    @Autowired private SalaRepository salaRepository;
    @Autowired private HorarioDisponibleRepository horarioRepository;
    @Autowired private EstadoReservaRepository estadoRepository;

    public ReservaDTO crearReserva(ReservaDTO dto) {
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

        return dto;
    }

    private void validarFecha(LocalDate fecha) {
        if (fecha == null || fecha.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("La fecha de reserva no puede ser anterior al día actual.");
        }
    }

    private void validarObservacion(String observacion) {
        if (observacion == null || observacion.trim().length() < 15) {
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
        return reservaRepository.findAll().stream().map(reserva -> {
            ReservaDTO dto = new ReservaDTO();
            dto.setId(reserva.getId());
            dto.setFechaReserva(reserva.getFechaReserva());
            dto.setObservacion(reserva.getObservacion());
            dto.setIdEstudiante(reserva.getEstudiante().getId());
            dto.setIdSala(reserva.getSala().getId());
            dto.setIdHorario(reserva.getHorario().getId());
            dto.setIdEstado(reserva.getEstado().getIdEstado());
            return dto;
        }).collect(Collectors.toList());
    }
}