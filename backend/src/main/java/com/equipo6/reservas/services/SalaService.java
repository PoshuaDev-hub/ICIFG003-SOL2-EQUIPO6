package com.equipo6.reservas.services;

import com.equipo6.reservas.models.Sala;
import com.equipo6.reservas.repositories.SalaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class SalaService {

    private Logger log = LoggerFactory.getLogger(SalaService.class);

    @Autowired
    private SalaRepository salaRepository;

    public List<Sala> obtenerTodas() {
        log.info("Obteniendo todas las salas");
        return salaRepository.findAll();
    }

    public List<Sala> obtenerPorCapacidadExacta(Integer capacidad) {
        log.info("Obteniendo salas con capacidad exacta de: {}", capacidad);
        return salaRepository.findByCapacidadExacta(capacidad);
    }

    public Optional<Sala> obtenerPorId(Integer id) {
        log.info("Obteniendo sala con ID: {}", id);
        return salaRepository.findById(id);
    }

    @Transactional
    public Sala crearSala(Sala sala) {
        log.info("Creando nueva sala: {}", sala.getNombreSala());
        return salaRepository.save(sala);
    }

    @Transactional
    public Sala actualizarSala(Integer id, Sala salaActualizada) {
        log.info("Actualizando sala con ID: {}", id);
        return salaRepository.findById(id).map(sala -> {
            sala.setNombreSala(salaActualizada.getNombreSala());
            sala.setCapacidad(salaActualizada.getCapacidad());
            sala.setEdificio(salaActualizada.getEdificio());
            return salaRepository.save(sala);
        }).orElseThrow(() -> new IllegalArgumentException("La sala con ID " + id + " no existe."));
    }

    @Transactional
    public void eliminarSala(Integer id) {
        log.info("Eliminando sala con ID: {}", id);
        salaRepository.deleteById(id);
    }
}
