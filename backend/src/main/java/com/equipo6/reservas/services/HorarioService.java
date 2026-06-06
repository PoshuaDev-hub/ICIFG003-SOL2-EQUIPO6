package com.equipo6.reservas.services;

import com.equipo6.reservas.models.HorarioDisponible;
import com.equipo6.reservas.repositories.HorarioDisponibleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class HorarioService {

    @Autowired
    private HorarioDisponibleRepository horarioRepository;

    /**
     * Obtiene todos los horarios disponibles registrados.
     * @return Lista de horarios
     */
    public List<HorarioDisponible> obtenerTodos() {
        log.info("Obteniendo todos los horarios");
        return horarioRepository.findAll();
    }

    /**
     * Obtiene los horarios asociados a una sala específica.
     * @param salaId ID de la sala
     * @return Lista de horarios de la sala
     */
    public List<HorarioDisponible> obtenerPorSala(Integer salaId) {
        log.info("Obteniendo horarios para la sala ID: {}", salaId);
        return horarioRepository.findHorariosPorSala(salaId);
    }

    /**
     * Obtiene los horarios disponibles de una sala excluyendo los ya reservados en estado Confirmada.
     * @param salaId ID de la sala
     * @param fecha Fecha de la reserva
     * @return Lista de horarios disponibles
     */
    public List<HorarioDisponible> obtenerDisponibles(Integer salaId, LocalDate fecha) {
        log.info("Obteniendo horarios disponibles para la sala ID: {} en la fecha: {}", salaId, fecha);
        return horarioRepository.findHorariosDisponiblesNativos(salaId, fecha);
    }

    /**
     * Obtiene un horario por su ID.
     * @param id ID del horario
     * @return Horario opcional
     */
    public Optional<HorarioDisponible> obtenerPorId(Integer id) {
        log.info("Obteniendo horario con ID: {}", id);
        return horarioRepository.findById(id);
    }

    /**
     * Crea un nuevo horario.
     * @param horario Entidad horario a crear
     * @return Horario creado
     */
    public HorarioDisponible crearHorario(HorarioDisponible horario) {
        log.info("Creando nuevo horario");
        return horarioRepository.save(horario);
    }

    /**
     * Actualiza un horario existente.
     * @param id ID del horario a actualizar
     * @param horarioActualizado Datos nuevos del horario
     * @return Horario actualizado
     */
    public HorarioDisponible actualizarHorario(Integer id, HorarioDisponible horarioActualizado) {
        log.info("Actualizando horario con ID: {}", id);
        return horarioRepository.findById(id).map(horario -> {
            horario.setHoraInicio(horarioActualizado.getHoraInicio());
            horario.setHoraTermino(horarioActualizado.getHoraTermino());
            horario.setSala(horarioActualizado.getSala());
            return horarioRepository.save(horario);
        }).orElseThrow(() -> new IllegalArgumentException("El horario con ID " + id + " no existe."));
    }

    /**
     * Elimina un horario por su ID.
     * @param id ID del horario a eliminar
     */
    public void eliminarHorario(Integer id) {
        log.info("Eliminando horario con ID: {}", id);
        horarioRepository.deleteById(id);
    }
}
