package com.equipo6.reservas.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sala")
public class Sala {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "codigo_sala", length = 20, unique = true, nullable = false)
    private String codigoSala;

    @Column(name = "nombre_sala", length = 100, nullable = false)
    private String nombreSala;

    @Column(nullable = false)
    private Integer capacidad;

    @Column(nullable = false)
    private Integer piso;

    @Column(length = 255, nullable = false)
    private String descripcion;

    @Column(length = 30, nullable = false)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_edificio", nullable = false)
    @JsonIgnoreProperties("salas")
    private Edificio edificio;

    @OneToMany(mappedBy = "sala", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<HorarioDisponible> horariosDisponibles;
}