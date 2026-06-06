package com.equipo6.reservas.repositories;

import com.equipo6.reservas.models.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalaRepository extends JpaRepository<Sala, Integer> {
    
    // JPQL: Filtrar salas por capacidad exacta (RF02)
    @Query("SELECT s FROM Sala s WHERE s.capacidad = :capacidad")
    List<Sala> findByCapacidadExacta(@Param("capacidad") Integer capacidad);
}