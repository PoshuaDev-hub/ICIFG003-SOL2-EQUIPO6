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

    @Query("SELECT h FROM HorarioDisponible h JOIN FETCH h.sala WHERE h.sala.id = :salaId")
    List<HorarioDisponible> findHorariosPorSala(@Param("salaId") Integer salaId);

    @Query("SELECT h FROM HorarioDisponible h JOIN FETCH h.sala WHERE h.sala.id = :salaId AND NOT EXISTS (SELECT 1 FROM Reserva r WHERE r.horario.id = h.id AND r.sala.id = :salaId AND r.fechaReserva = :fecha AND r.estado.nombreEstado = 'Confirmada')")
    List<HorarioDisponible> findHorariosDisponibles(@Param("salaId") Integer salaId, @Param("fecha") LocalDate fecha);

    @Query("SELECT CASE WHEN COUNT(h) > 0 THEN true ELSE false END FROM HorarioDisponible h WHERE h.sala.id = :salaId AND NOT EXISTS (SELECT 1 FROM Reserva r WHERE r.horario.id = h.id AND r.sala.id = :salaId AND r.fechaReserva = :fecha AND r.estado.nombreEstado = 'Confirmada')")
    boolean existsDisponible(@Param("salaId") Integer salaId, @Param("fecha") LocalDate fecha);
}