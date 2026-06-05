package com.equipo6.reservas.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "edificio")
public class Edificio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_edificio", length = 100, nullable = false)
    private String nombreEdificio;

    @Column(length = 200, nullable = false)
    private String direccion;

    @OneToMany(mappedBy = "edificio", cascade = CascadeType.ALL)
    private List<Sala> salas;
}