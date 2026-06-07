package com.equipo6.reservas.dtos;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservaDTO {
    private Integer id;
    private LocalDate fechaReserva;
    private String observacion;
    private Integer idEstudiante;
    private Integer idSala;
    private Integer idHorario;
    private Integer idEstado;
    private String nombreEstudiante;
    private String nombreSala;
    private String horaInicio;
    private String horaTermino;
    private String nombreEstado;
}