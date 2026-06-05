package com.equipo6.reservas.services;

import com.equipo6.reservas.dtos.ReservaDTO;
import com.equipo6.reservas.models.*;
import com.equipo6.reservas.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    // Métodos para obtener los registros completos usando los IDs del DTO
    @Autowired private EstudianteRepository estudianteRepository;
    @Autowired private SalaRepository salaRepository;
    @Autowired private HorarioDisponibleRepository horarioRepository;
    @Autowired private EstadoReservaRepository estadoRepository;

    public ReservaDTO crearReserva(ReservaDTO dto) {
        Reserva reserva = new Reserva();
        reserva.setFechaReserva(dto.getFechaReserva());
        reserva.setObservacion(dto.getObservacion());
        reserva.setFechaCreacion(LocalDateTime.now());

        // Buscamos las entidades por su ID y las asignamos
        reserva.setEstudiante(estudianteRepository.findById(dto.getIdEstudiante()).orElseThrow());
        reserva.setSala(salaRepository.findById(dto.getIdSala()).orElseThrow());
        reserva.setHorario(horarioRepository.findById(dto.getIdHorario()).orElseThrow());
        reserva.setEstado(estadoRepository.findById(dto.getIdEstado()).orElseThrow());

        Reserva reservaGuardada = reservaRepository.save(reserva);
        dto.setId(reservaGuardada.getId());
        
        return dto;
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