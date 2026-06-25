package com.equipo6.reservas.controllers;

import com.equipo6.reservas.dtos.ReservaDTO;
import com.equipo6.reservas.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private Logger log = LoggerFactory.getLogger(ReservaController.class);

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> listarReservas(
            @RequestParam(required = false) Integer sala,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        log.info("Listar reservas - sala: {}, fecha: {}", sala, fecha);
        if (sala != null && fecha != null) {
            return ResponseEntity.ok(reservaService.obtenerPorSalaYFecha(sala, fecha));
        }
        return ResponseEntity.ok(reservaService.obtenerTodas());
    }

    @GetMapping("/mis-reservas")
    public ResponseEntity<List<ReservaDTO>> misReservas(
            @RequestParam String rut,
            @RequestParam String contrasena) {
        List<ReservaDTO> reservas = reservaService.obtenerPorRut(rut, contrasena);
        if (reservas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(reservas);
        }
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/mis-reservas/correo")
    public ResponseEntity<List<ReservaDTO>> misReservasPorCorreo(
            @RequestParam String correo,
            @RequestParam String contrasena) {
        List<ReservaDTO> reservas = reservaService.obtenerPorCorreo(correo, contrasena);
        if (reservas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(reservas);
        }
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/mis-reservas/telefono")
    public ResponseEntity<List<ReservaDTO>> misReservasPorTelefono(
            @RequestParam String telefono,
            @RequestParam String contrasena) {
        List<ReservaDTO> reservas = reservaService.obtenerPorTelefono(telefono, contrasena);
        if (reservas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(reservas);
        }
        return ResponseEntity.ok(reservas);
    }

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaDTO reservaDTO) {
        log.info("Crear reserva - sala: {}, fecha: {}, horario: {}, estudiante: {}",
                reservaDTO.getIdSala(), reservaDTO.getFechaReserva(),
                reservaDTO.getIdHorario(), reservaDTO.getIdEstudiante());
        try {
            ReservaDTO nuevaReserva = reservaService.crearReserva(reservaDTO);
            log.info("Reserva creada exitosamente con ID: {}", nuevaReserva.getId());
            return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/observacion")
    public ResponseEntity<?> actualizarObservacion(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        log.info("Petición PATCH para actualizar observación de reserva ID: {}, cuerpo: {}", id, body);
        try {
            String observacion = body != null ? body.get("observacion") : null;
            ReservaDTO actualizada = reservaService.actualizarObservacion(id, observacion);
            log.info("Observación de reserva ID {} actualizada con éxito", id);
            return ResponseEntity.ok(actualizada);
        } catch (IllegalArgumentException e) {
            log.error("Error al actualizar observación para reserva ID {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("Error inesperado al actualizar observación para reserva ID {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error interno al actualizar la observación."));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelarReserva(@PathVariable Integer id) {
        log.info("Cancelar reserva ID: {}", id);
        try {
            reservaService.cancelarReserva(id);
            log.info("Reserva ID {} cancelada exitosamente", id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}