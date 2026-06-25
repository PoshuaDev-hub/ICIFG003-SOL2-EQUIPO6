package com.equipo6.reservas.services;

import com.equipo6.reservas.models.Carrera;
import com.equipo6.reservas.models.Credencial;
import com.equipo6.reservas.models.Estudiante;
import com.equipo6.reservas.repositories.CarreraRepository;
import com.equipo6.reservas.repositories.CredencialRepository;
import com.equipo6.reservas.repositories.EstudianteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class EstudianteService {

    private Logger log = LoggerFactory.getLogger(EstudianteService.class);

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private CarreraRepository carreraRepository;

    @Autowired
    private CredencialRepository credencialRepository;

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
    @Transactional
    public Estudiante crearEstudiante(Estudiante estudiante, String contrasena) {
        if (estudiante.getCorreo() == null || estudiante.getCorreo().isBlank()) {
            estudiante.setCorreo(estudiante.getRut() + "@usm.cl");
        }
        if (estudiante.getFechaRegistro() == null) {
            estudiante.setFechaRegistro(LocalDate.now());
        }
        if (estudiante.getCarrera() == null) {
            carreraRepository.findById(1).ifPresent(estudiante::setCarrera);
        }
        log.info("Creando nuevo estudiante: {}", estudiante.getNombre());
        Estudiante guardado = estudianteRepository.save(estudiante);
        // Crear credencial con la contraseña elegida por el usuario
        String numCred = (contrasena != null && !contrasena.isBlank()) ? contrasena : guardado.getRut();
        Credencial credencial = new Credencial();
        credencial.setNumeroCredencial(numCred);
        credencial.setFechaVencimiento(LocalDate.now().plusYears(4));
        credencial.setEstudiante(guardado);
        credencialRepository.save(credencial);
        return guardado;
    }

    /**
     * Actualiza un estudiante existente.
     * @param id ID del estudiante a actualizar
     * @param estudianteActualizado Datos nuevos del estudiante
     * @return Estudiante actualizado
     */
    @Transactional
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
     * Busca estudiantes por nombre, apellido o RUT.
     * @param termino Texto de búsqueda
     * @return Lista de estudiantes que coinciden
     */
    public List<Estudiante> buscar(String termino) {
        log.info("Buscando estudiantes con: {}", termino);
        return estudianteRepository.buscarPorTermino(termino);
    }

    public List<Estudiante> buscarPorRutExacto(String rut) {
        log.info("Buscando estudiante por RUT exacto: {}", rut);
        return estudianteRepository.findByRutExacto(rut);
    }

    /**
     * Elimina un estudiante por su ID.
     * @param id ID del estudiante a eliminar
     */
    @Transactional
    public void eliminarEstudiante(Integer id) {
        log.info("Eliminando estudiante con ID: {}", id);
        estudianteRepository.deleteById(id);
    }

    @Transactional
    public Estudiante actualizarTelefono(Integer id, String telefono) {
        return estudianteRepository.findById(id).map(est -> {
            est.setTelefono(telefono);
            return estudianteRepository.save(est);
        }).orElseThrow(() -> new IllegalArgumentException("Estudiante con ID " + id + " no encontrado."));
    }

    public List<java.util.Map<String, Object>> obtenerRankingReservas() {
        log.info("Obteniendo ranking de estudiantes con total de reservas");
        List<Object[]> resultados = estudianteRepository.findEstudiantesConTotalReservas();
        return resultados.stream().map(fila -> {
            java.util.Map<String, Object> map = new java.util.HashMap<>();
            map.put("rut", fila[0]);
            map.put("nombre", fila[1]);
            map.put("apellido", fila[2]);
            map.put("total_reservas", fila[3]);
            return map;
        }).toList();
    }

    @Transactional(readOnly = false)
    @org.springframework.context.event.EventListener(org.springframework.boot.context.event.ApplicationReadyEvent.class)
    public void inicializarCredencialesFaltantes() {
        try {
            log.info("Inicializando credenciales faltantes para estudiantes existentes...");
            List<Estudiante> todos = estudianteRepository.findAll();
            for (Estudiante est : todos) {
                if (credencialRepository.findByEstudianteId(est.getId()).isEmpty()) {
                    log.info("Creando credencial por defecto (RUT) para estudiante ID: {}", est.getId());
                    Credencial c = new Credencial();
                    c.setNumeroCredencial(est.getRut());
                    c.setFechaVencimiento(LocalDate.now().plusYears(4));
                    c.setEstudiante(est);
                    credencialRepository.save(c);
                }
            }
        } catch (Exception e) {
            log.error("Error al inicializar credenciales faltantes", e);
        }
    }
}
