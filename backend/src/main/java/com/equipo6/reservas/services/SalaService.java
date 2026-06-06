package com.equipo6.reservas.services;

import com.equipo6.reservas.models.Sala;
import com.equipo6.reservas.repositories.SalaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class SalaService {

    @Autowired
    private SalaRepository salaRepository;

    /**
     * Obtiene todas las salas registradas.
     * @return Lista de salas
     */
    public List<Sala> obtenerTodas() {
        log.info("Obteniendo todas las salas");
        return salaRepository.findAll();
    }

    /**
     * Obtiene las salas que tengan una capacidad mayor o igual a la indicada.
     * @param capacidad Capacidad mínima
     * @return Lista de salas filtradas
     */
    public List<Sala> obtenerPorCapacidadExacta(Integer capacidad) {
        log.info("Obteniendo salas con capacidad exacta de: {}", capacidad);
        return salaRepository.findByCapacidadExacta(capacidad);
    }

    /**
     * Obtiene una sala por su ID.
     * @param id ID de la sala
     * @return Sala opcional
     */
    public Optional<Sala> obtenerPorId(Integer id) {
        log.info("Obteniendo sala con ID: {}", id);
        return salaRepository.findById(id);
    }

    /**
     * Crea una nueva sala.
     * @param sala Entidad sala a crear
     * @return Sala creada
     */
    public Sala crearSala(Sala sala) {
        log.info("Creando nueva sala: {}", sala.getNombreSala());
        return salaRepository.save(sala);
    }

    /**
     * Actualiza una sala existente.
     * @param id ID de la sala a actualizar
     * @param salaActualizada Datos nuevos de la sala
     * @return Sala actualizada
     */
    public Sala actualizarSala(Integer id, Sala salaActualizada) {
        log.info("Actualizando sala con ID: {}", id);
        return salaRepository.findById(id).map(sala -> {
            sala.setNombreSala(salaActualizada.getNombreSala());
            sala.setCapacidad(salaActualizada.getCapacidad());
            sala.setEdificio(salaActualizada.getEdificio());
            return salaRepository.save(sala);
        }).orElseThrow(() -> new IllegalArgumentException("La sala con ID " + id + " no existe."));
    }

    /**
     * Elimina una sala por su ID.
     * @param id ID de la sala a eliminar
     */
    public void eliminarSala(Integer id) {
        log.info("Eliminando sala con ID: {}", id);
        salaRepository.deleteById(id);
    }
}
