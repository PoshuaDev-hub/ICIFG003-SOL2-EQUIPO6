package com.equipo6.reservas.repositories;

import com.equipo6.reservas.models.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    // JpaRepository ya incluye métodos como save(), findAll(), findById(), deleteById()

    // JPQL Objetal: Requerimiento para obtener las reservas de una sala en un día específico (RF04)
    @Query("SELECT r FROM Reserva r WHERE r.sala.id = :salaId AND r.fechaReserva = :fecha")
    List<Reserva> findReservasPorSalaYFecha(@Param("salaId") Integer salaId, @Param("fecha") LocalDate fecha);

    // Native Query: Requerimiento de lista de reservas unida al estudiante para una sala
    @Query(value = "SELECT r.* FROM reserva r JOIN estudiante e ON r.id_estudiante = e.id WHERE r.id_sala = :salaId", nativeQuery = true)
    List<Reserva> findReservasConEstudianteNative(@Param("salaId") Integer salaId);

    // JPQL: Verificar si existe una reserva confirmada para misma sala+fecha+horario (Issue 8)
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN TRUE ELSE FALSE END FROM Reserva r WHERE r.sala.id = :salaId AND r.fechaReserva = :fecha AND r.horario.id = :horarioId AND r.estado.nombreEstado = 'Confirmada'")
    boolean existsReservaConfirmada(@Param("salaId") Integer salaId, @Param("fecha") LocalDate fecha, @Param("horarioId") Integer horarioId);

    @Query("SELECT r FROM Reserva r JOIN FETCH r.estudiante e WHERE e.rut = :rut")
    List<Reserva> findByEstudianteRut(@Param("rut") String rut);

    @Query("SELECT r FROM Reserva r JOIN FETCH r.estudiante e WHERE e.correo = :correo")
    List<Reserva> findByEstudianteCorreo(@Param("correo") String correo);

    @Query("SELECT r FROM Reserva r JOIN FETCH r.estudiante e WHERE e.telefono = :telefono")
    List<Reserva> findByEstudianteTelefono(@Param("telefono") String telefono);
}