package com.equipo6.reservas.controllers;

import com.equipo6.reservas.models.HorarioDisponible;
import com.equipo6.reservas.services.HorarioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/horarios")
public class HorarioController {

    @Autowired
    private HorarioService horarioService;

    /**
     * Endpoint para listar todos los horarios, o filtrarlos por sala.
     */
    @GetMapping
    public ResponseEntity<List<HorarioDisponible>> listarHorarios(@RequestParam(required = false) Integer sala) {
        log.info("Listar horarios - sala: {}", sala);
        if (sala != null) {
            return ResponseEntity.ok(horarioService.obtenerPorSala(sala));
        }
        return ResponseEntity.ok(horarioService.obtenerTodos());
    }

    /**
     * Endpoint para obtener horarios disponibles de una sala en una fecha específica.
     */
    @GetMapping("/disponibles")
    public ResponseEntity<List<HorarioDisponible>> listarHorariosDisponibles(
            @RequestParam Integer sala,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(horarioService.obtenerDisponibles(sala, fecha));
    }

    /**
     * Endpoint para obtener un horario específico por su ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerHorario(@PathVariable Integer id) {
        return horarioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * Endpoint para crear un nuevo horario.
     */
    @PostMapping
    public ResponseEntity<HorarioDisponible> crearHorario(@RequestBody HorarioDisponible horario) {
        HorarioDisponible nuevoHorario = horarioService.crearHorario(horario);
        return new ResponseEntity<>(nuevoHorario, HttpStatus.CREATED);
    }

    /**
     * Endpoint para actualizar un horario existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarHorario(@PathVariable Integer id, @RequestBody HorarioDisponible horario) {
        try {
            HorarioDisponible horarioActualizado = horarioService.actualizarHorario(id, horario);
            return ResponseEntity.ok(horarioActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Endpoint para eliminar un horario.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarHorario(@PathVariable Integer id) {
        horarioService.eliminarHorario(id);
        return ResponseEntity.noContent().build();
    }
}
