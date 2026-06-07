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
}