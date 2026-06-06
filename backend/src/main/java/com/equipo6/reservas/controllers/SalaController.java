package com.equipo6.reservas.controllers;

import com.equipo6.reservas.models.Sala;
import com.equipo6.reservas.services.SalaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/salas")
@CrossOrigin(origins = "http://localhost:4200")
public class SalaController {

    @Autowired
    private SalaService salaService;

    /**
     * Endpoint para listar todas las salas o filtrar por capacidad mínima.
     */
    @GetMapping
    public ResponseEntity<List<Sala>> listarSalas(@RequestParam(required = false) Integer capacidad) {
        if (capacidad != null && capacidad > 0) {
            return ResponseEntity.ok(salaService.obtenerPorCapacidadExacta(capacidad));
        }
        return ResponseEntity.ok(salaService.obtenerTodas());
    }

    /**
     * Endpoint para obtener una sala específica por su ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerSala(@PathVariable Integer id) {
        return salaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * Endpoint para crear una nueva sala.
     */
    @PostMapping
    public ResponseEntity<Sala> crearSala(@RequestBody Sala sala) {
        Sala nuevaSala = salaService.crearSala(sala);
        return new ResponseEntity<>(nuevaSala, HttpStatus.CREATED);
    }

    /**
     * Endpoint para actualizar una sala existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarSala(@PathVariable Integer id, @RequestBody Sala sala) {
        try {
            Sala salaActualizada = salaService.actualizarSala(id, sala);
            return ResponseEntity.ok(salaActualizada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Endpoint para eliminar una sala.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSala(@PathVariable Integer id) {
        salaService.eliminarSala(id);
        return ResponseEntity.noContent().build();
    }
}
