package com.equipo6.reservas.controllers;

import com.equipo6.reservas.dtos.ReservaDTO;
import com.equipo6.reservas.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> listarReservas(
            @RequestParam(required = false) Integer sala,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        if (sala != null && fecha != null) {
            return ResponseEntity.ok(reservaService.obtenerPorSalaYFecha(sala, fecha));
        }
        return ResponseEntity.ok(reservaService.obtenerTodas());
    }

    @GetMapping("/mis-reservas")
    public ResponseEntity<List<ReservaDTO>> misReservas(@RequestParam String rut) {
        return ResponseEntity.ok(reservaService.obtenerPorRut(rut));
    }

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaDTO reservaDTO) {
        try {
            ReservaDTO nuevaReserva = reservaService.crearReserva(reservaDTO);
            return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }
}