package com.equipo6.reservas.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "carrera")
public class Carrera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_carrera", length = 100, nullable = false)
    private String nombreCarrera;

    @Column(length = 100, nullable = false)
    private String facultad;

    // Relación 1:N inverso para navegación bidireccional (Opcional pero recomendado)
    @OneToMany(mappedBy = "carrera", cascade = CascadeType.ALL)
    private List<Estudiante> estudiantes;
}