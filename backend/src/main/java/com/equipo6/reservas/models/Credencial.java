package com.equipo6.reservas.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CREDENCIAL")
public class Credencial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_credencial", length = 20, unique = true, nullable = false)
    private String numeroCredencial;

    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    @OneToOne
    @JoinColumn(name = "estudiante_id", unique = true, nullable = false)
    @JsonIgnoreProperties("credencial")
    private Estudiante estudiante;
}
