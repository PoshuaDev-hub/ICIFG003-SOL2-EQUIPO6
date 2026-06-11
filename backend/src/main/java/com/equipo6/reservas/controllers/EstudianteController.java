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
     * Endpoint para buscar estudiantes por nombre, apellido o RUT.
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<Estudiante>> buscarEstudiantes(@RequestParam String q) {
        return ResponseEntity.ok(estudianteService.buscar(q));
    }

    @GetMapping("/buscar/rut")
    public ResponseEntity<?> buscarEstudiantePorRut(@RequestParam String rut) {
        List<Estudiante> resultados = estudianteService.buscarPorRutExacto(rut);
        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Estudiante no encontrado con RUT: " + rut));
        }
        return ResponseEntity.ok(resultados.get(0));
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
     * Endpoint para crear un nuevo estudiante (con contraseña para credencial).
     */
    @PostMapping
    public ResponseEntity<Estudiante> crearEstudiante(@RequestBody Map<String, Object> body) {
        Estudiante estudiante = new Estudiante();
        estudiante.setRut((String) body.get("rut"));
        estudiante.setNombre((String) body.get("nombre"));
        estudiante.setApellido((String) body.get("apellido"));
        estudiante.setCorreo((String) body.get("correo"));
        if (body.get("telefono") != null) estudiante.setTelefono((String) body.get("telefono"));
        String contrasena = (String) body.get("contrasena");
        Estudiante nuevo = estudianteService.crearEstudiante(estudiante, contrasena);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    /**
     * Actualizar sólo el teléfono de un estudiante.
     */
    @PatchMapping("/{id}/telefono")
    public ResponseEntity<?> actualizarTelefono(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        try {
            String telefono = body.get("telefono");
            Estudiante actualizado = estudianteService.actualizarTelefono(id, telefono);
            return ResponseEntity.ok(actualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
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

    @GetMapping("/ranking")
    public ResponseEntity<List<Map<String, Object>>> obtenerRanking() {
        return ResponseEntity.ok(estudianteService.obtenerRankingReservas());
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
