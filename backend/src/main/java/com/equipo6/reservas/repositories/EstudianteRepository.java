package com.equipo6.reservas.repositories;

import com.equipo6.reservas.models.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Integer> {

    @Query("SELECT e FROM Estudiante e WHERE LOWER(e.nombre) LIKE LOWER(CONCAT('%', :termino, '%')) OR LOWER(e.apellido) LIKE LOWER(CONCAT('%', :termino, '%')) OR e.rut LIKE CONCAT('%', :termino, '%')")
    List<Estudiante> buscarPorTermino(@Param("termino") String termino);

    @Query("SELECT e FROM Estudiante e WHERE e.rut = :rut")
    List<Estudiante> findByRutExacto(@Param("rut") String rut);

    @Query("SELECT e FROM Estudiante e WHERE e.correo = :correo")
    List<Estudiante> findByCorreoExacto(@Param("correo") String correo);

    @Query("SELECT e FROM Estudiante e WHERE e.telefono = :telefono")
    List<Estudiante> findByTelefonoExacto(@Param("telefono") String telefono);

    @Query(
        value = "SELECT e.rut, e.nombre, e.apellido, COUNT(r.id) AS total_reservas " +
                "FROM ESTUDIANTE e " +
                "LEFT JOIN RESERVA r ON e.id = r.id_estudiante " +
                "GROUP BY e.id, e.rut, e.nombre, e.apellido " +
                "ORDER BY total_reservas DESC",
        nativeQuery = true
    )
    List<Object[]> findEstudiantesConTotalReservas();
}