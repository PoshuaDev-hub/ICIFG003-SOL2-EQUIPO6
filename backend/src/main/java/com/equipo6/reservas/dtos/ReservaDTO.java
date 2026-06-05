package com.equipo6.reservas.dtos;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservaDTO {
    private Integer id;
    private LocalDate fechaReserva;
    private String observacion;
    // En lugar de enviar los objetos completos, enviamos solo los IDs
    private Integer idEstudiante;
    private Integer idSala;
    private Integer idHorario;
    private Integer idEstado;
}