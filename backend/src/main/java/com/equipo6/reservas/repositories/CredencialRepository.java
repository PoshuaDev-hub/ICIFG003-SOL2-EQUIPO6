package com.equipo6.reservas.repositories;

import com.equipo6.reservas.models.Credencial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CredencialRepository extends JpaRepository<Credencial, Long> {

    @Query("SELECT c FROM Credencial c WHERE c.estudiante.id = :estudianteId")
    Optional<Credencial> findByEstudianteId(@Param("estudianteId") Integer estudianteId);

    @Query("SELECT c FROM Credencial c WHERE c.estudiante.rut = :rut AND c.numeroCredencial = :contrasena")
    Optional<Credencial> findByRutYContrasena(@Param("rut") String rut, @Param("contrasena") String contrasena);

    @Query("SELECT c FROM Credencial c WHERE c.estudiante.correo = :correo AND c.numeroCredencial = :contrasena")
    Optional<Credencial> findByCorreoYContrasena(@Param("correo") String correo, @Param("contrasena") String contrasena);

    @Query("SELECT c FROM Credencial c WHERE c.estudiante.telefono = :telefono AND c.numeroCredencial = :contrasena")
    Optional<Credencial> findByTelefonoYContrasena(@Param("telefono") String telefono, @Param("contrasena") String contrasena);
}
