package com.equipo6.reservas.controllers;

import com.equipo6.reservas.models.Estudiante;
import com.equipo6.reservas.services.EstudianteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "http://localhost:4200")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    /**
     * Endpoint para listar todos los estudiantes.
     */
    @GetMapping
    public ResponseEntity<List<Estudiante>> listarEstudiantes() {
        return ResponseEntity.ok(estudianteService.obtenerTodos());
    }

    /**
     * Endpoint para obtener un estudiante específico por su ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerEstudiante(@PathVariable Integer id) {
        return estudianteService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * Endpoint para crear un nuevo estudiante.
     */
    @PostMapping
    public ResponseEntity<Estudiante> crearEstudiante(@RequestBody Estudiante estudiante) {
        Estudiante nuevoEstudiante = estudianteService.crearEstudiante(estudiante);
        return new ResponseEntity<>(nuevoEstudiante, HttpStatus.CREATED);
    }

    /**
     * Endpoint para actualizar un estudiante existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEstudiante(@PathVariable Integer id, @RequestBody Estudiante estudiante) {
        try {
            Estudiante estudianteActualizado = estudianteService.actualizarEstudiante(id, estudiante);
            return ResponseEntity.ok(estudianteActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Endpoint para eliminar un estudiante.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEstudiante(@PathVariable Integer id) {
        estudianteService.eliminarEstudiante(id);
        return ResponseEntity.noContent().build();
    }
}
