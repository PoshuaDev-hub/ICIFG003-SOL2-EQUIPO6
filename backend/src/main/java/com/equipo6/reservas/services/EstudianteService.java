package com.equipo6.reservas.services;

import com.equipo6.reservas.models.Estudiante;
import com.equipo6.reservas.repositories.EstudianteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    /**
     * Obtiene todos los estudiantes registrados.
     * @return Lista de estudiantes
     */
    public List<Estudiante> obtenerTodos() {
        log.info("Obteniendo todos los estudiantes");
        return estudianteRepository.findAll();
    }

    /**
     * Obtiene un estudiante por su ID.
     * @param id ID del estudiante
     * @return Estudiante opcional
     */
    public Optional<Estudiante> obtenerPorId(Integer id) {
        log.info("Obteniendo estudiante con ID: {}", id);
        return estudianteRepository.findById(id);
    }

    /**
     * Crea un nuevo estudiante.
     * @param estudiante Entidad estudiante a crear
     * @return Estudiante creado
     */
    public Estudiante crearEstudiante(Estudiante estudiante) {
        log.info("Creando nuevo estudiante: {}", estudiante.getNombre());
        return estudianteRepository.save(estudiante);
    }

    /**
     * Actualiza un estudiante existente.
     * @param id ID del estudiante a actualizar
     * @param estudianteActualizado Datos nuevos del estudiante
     * @return Estudiante actualizado
     */
    public Estudiante actualizarEstudiante(Integer id, Estudiante estudianteActualizado) {
        log.info("Actualizando estudiante con ID: {}", id);
        return estudianteRepository.findById(id).map(estudiante -> {
            estudiante.setRut(estudianteActualizado.getRut());
            estudiante.setNombre(estudianteActualizado.getNombre());
            estudiante.setCorreo(estudianteActualizado.getCorreo());
            estudiante.setCarrera(estudianteActualizado.getCarrera());
            return estudianteRepository.save(estudiante);
        }).orElseThrow(() -> new IllegalArgumentException("El estudiante con ID " + id + " no existe."));
    }

    /**
     * Elimina un estudiante por su ID.
     * @param id ID del estudiante a eliminar
     */
    public void eliminarEstudiante(Integer id) {
        log.info("Eliminando estudiante con ID: {}", id);
        estudianteRepository.deleteById(id);
    }
}
