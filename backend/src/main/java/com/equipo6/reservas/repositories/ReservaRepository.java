package com.equipo6.reservas.repositories;

import com.equipo6.reservas.models.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    // JpaRepository ya incluye métodos como save(), findAll(), findById(), deleteById()
}