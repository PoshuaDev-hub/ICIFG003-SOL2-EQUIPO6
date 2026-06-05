package com.equipo6.reservas.repositories;

import com.equipo6.reservas.models.HorarioDisponible;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HorarioDisponibleRepository extends JpaRepository<HorarioDisponible, Integer> {

    // JPQL Objetal: Requerimiento para obtener todos los horarios de una sala (RF05)
    @Query("SELECT h FROM HorarioDisponible h WHERE h.sala.id = :salaId")
    List<HorarioDisponible> findHorariosPorSala(@Param("salaId") Integer salaId);

    // Native Query: Disponibilidad de sala excluyendo horarios con reservas confirmadas
    @Query(value = "SELECT hd.* FROM horario_disponible hd WHERE hd.id_sala = :salaId AND hd.id NOT IN (SELECT r.id_horario FROM reserva r INNER JOIN estado_reserva er ON r.id_estado = er.id_estado WHERE r.id_sala = :salaId AND r.fecha_reserva = :fecha AND er.nombre_estado = 'Confirmada')", nativeQuery = true)
    List<HorarioDisponible> findHorariosDisponiblesNativos(@Param("salaId") Integer salaId, @Param("fecha") LocalDate fecha);
}