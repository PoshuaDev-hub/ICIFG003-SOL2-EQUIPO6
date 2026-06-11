package com.equipo6.reservas.controllers;

import com.equipo6.reservas.models.Estudiante;
import com.equipo6.reservas.repositories.CredencialRepository;
import com.equipo6.reservas.repositories.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CredencialRepository credencialRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    /**
     * Login de usuario. Acepta identificador (RUT, correo o teléfono) + contraseña.
     * tipo: "rut" | "correo" | "telefono"
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String identificador = body.get("identificador");
        String contrasena = body.get("contrasena");
        String tipo = body.getOrDefault("tipo", "rut");

        if (identificador == null || identificador.isBlank() || contrasena == null || contrasena.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Identificador y contraseña son requeridos."));
        }

        return switch (tipo) {
            case "correo" -> credencialRepository.findByCorreoYContrasena(identificador, contrasena)
                    .map(c -> ResponseEntity.ok(c.getEstudiante()))
                    .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
            case "telefono" -> credencialRepository.findByTelefonoYContrasena(identificador, contrasena)
                    .map(c -> ResponseEntity.ok(c.getEstudiante()))
                    .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
            default -> credencialRepository.findByRutYContrasena(identificador, contrasena)
                    .map(c -> ResponseEntity.ok(c.getEstudiante()))
                    .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
        };
    }
}
