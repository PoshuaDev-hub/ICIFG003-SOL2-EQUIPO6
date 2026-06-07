# Issues para GitHub Kanban - Equipo 6

Instrucciones: Crea un "Issue" nuevo en GitHub por cada uno de los bloques a continuación. Copia el título en el campo del título del issue, y todo el texto desde "### Descripción" hacia abajo en la descripción del issue. Luego, asígnalo al responsable indicado.

**🚨 NOTA CRÍTICA PARA DISEÑO FRONTEND (Humanos e IAs):** 
Para cualquier diseño visual, botones o menú, se DEBE utilizar **exclusivamente iconos vectoriales (SVG)** en línea. Está estrictamente prohibido el uso de imágenes rasterizadas (como PNG o JPG) para la iconografía del sitio, con el fin de mantener un rendimiento y nitidez óptimos.

---

## Issue 1
**Título:** [Sprint 2] Configurar conexión Spring Boot ↔ PostgreSQL
**Asignado a:** Joshua
**Etiquetas sugeridas:** `backend`, `sprint-2`, `enhancement`

### Descripción
**Objetivo:** Configurar el proyecto Spring Boot para que se conecte correctamente a la base de datos PostgreSQL local.

**Tareas a realizar:**
- [x] Editar `backend/src/main/resources/application.properties`
- [x] Agregar credenciales y URL JDBC de PostgreSQL.
- [x] Configurar JPA (`hibernate.ddl-auto=validate`, `show-sql=true`, dialecto).
- [x] Verificar que la aplicación levante sin arrojar errores de conexión.

---

## Issue 2
**Título:** [Sprint 2] Diseñar y crear script DDL (01_schema.sql)
**Asignado a:** Subaru
**Etiquetas sugeridas:** `database`, `sprint-2`, `enhancement`

### Descripción
**Objetivo:** Construir el modelo relacional físico en la base de datos de acuerdo al MER especificado.

**Tareas a realizar:**
- [x] Crear el archivo `database/01_schema.sql`.
- [x] Implementar la creación de tablas: `CARRERA`, `ESTUDIANTE`, `EDIFICIO`, `SALA`, `HORARIO_DISPONIBLE`, `ESTADO_RESERVA`, `RESERVA`.
- [x] Añadir llaves primarias y foráneas correspondientes.
- [x] Incluir restricciones `NOT NULL`, `UNIQUE` y tipos de dato según la rúbrica.

---

## Issue 3
**Título:** [Sprint 2] Crear script de datos de prueba (02_seed.sql)
**Asignado a:** Lucas
**Etiquetas sugeridas:** `database`, `sprint-2`, `enhancement`

### Descripción
**Objetivo:** Poblar la base de datos con información base para poder desarrollar y testear el sistema.

**Tareas a realizar:**
- [x] Crear el archivo `database/02_seed.sql`.
- [x] Insertar al menos 3 carreras y 5 estudiantes (con RUT y correos válidos).
- [x] Insertar 1-2 edificios y al menos 5 salas de estudio.
- [x] Insertar horarios disponibles por sala y estados ("Confirmada", "Cancelada").
- [x] Insertar algunas reservas iniciales para las pruebas.

---

## Issue 4
**Título:** [Sprint 2] Crear entidades JPA con relaciones y Lombok
**Asignado a:** Victor
**Etiquetas sugeridas:** `backend`, `sprint-2`, `enhancement`

### Descripción
**Objetivo:** Mapear el modelo de base de datos a objetos de Java usando JPA y simplificar el código con Lombok.

**Tareas a realizar:**
- [x] Crear paquetes `model` o `entity`.
- [x] Crear clases Java para cada tabla del MER (Carrera, Estudiante, etc.).
- [x] Configurar anotaciones `@Entity`, `@Table`, `@Id`, `@GeneratedValue`.
- [x] Implementar relaciones usando `@ManyToOne` y `@OneToMany`.
- [x] Integrar Lombok con `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`.

---

## Issue 5
**Título:** [Sprint 3] Crear Repositories y Services (CRUD base)
**Asignado a:** Victor
**Etiquetas sugeridas:** `backend`, `sprint-3`, `enhancement`

### Descripción
**Objetivo:** Crear la capa de acceso a datos y la lógica de negocio base.

**Tareas a realizar:**
- [x] Crear interfaces `Repository` extendiendo de `JpaRepository` para las entidades clave.
- [x] Crear clases `Service` con anotación `@Service`.
- [x] Implementar métodos base en los servicios (ej. `findAll()`, `findById()`, `save()`).

---

## Issue 6
**Título:** [Sprint 3] Crear Controllers y DTOs (Endpoints y CORS)
**Asignado a:** Victor
**Etiquetas sugeridas:** `backend`, `sprint-3`, `enhancement`

### Descripción
**Objetivo:** Exponer la API REST para que el frontend pueda consumirla.

**Tareas a realizar:**
- [x] Crear los DTOs necesarios (ej. `ReservaRequestDTO`, `SalaResponseDTO`).
- [x] Implementar `Controllers` (`@RestController`, `@RequestMapping`).
- [x] Exponer los Endpoints base (GET salas, GET estudiantes, etc.).
- [x] Configurar CORS (`@CrossOrigin`) para permitir peticiones desde `localhost:4200`.

---

## Issue 7
**Título:** [Sprint 3] Implementar queries objetales (JPQL) y nativas
**Asignado a:** Joshua
**Etiquetas sugeridas:** `backend`, `sprint-3`, `enhancement`

### Descripción
**Objetivo:** Desarrollar las consultas específicas necesarias para los requerimientos del frontend.

**Tareas a realizar:**
- [x] Implementar mínimo 3 queries objetales (JPQL) en los repositorios (Ej. `findByCapacidadLessThanEqual`).
- [x] Implementar mínimo 2 queries nativas (`@Query(nativeQuery=true)`). Ejemplo: disponibilidad de sala y lista de reservas unida al estudiante.
- [x] Documentar o comentar qué requerimiento suple cada query.

---

## Issue 8
**Título:** [Sprint 3] Endpoint POST /api/reservas con validaciones
**Asignado a:** Subaru
**Etiquetas sugeridas:** `backend`, `sprint-3`, `enhancement`

### Descripción
**Objetivo:** Proveer el endpoint de creación de reserva aplicando todas las reglas de negocio estrictas.

**Tareas a realizar:**
- [x] Desarrollar lógica en `ReservaService` para el método de crear reserva.
- [x] Validar que la fecha sea ≥ hoy.
- [x] Validar que el horario no esté ya reservado (y en estado Confirmada).
- [x] Validar que el estudiante exista en la DB.
- [x] Validar que la observación tenga ≥ 15 caracteres.
- [x] Retornar código HTTP correcto (ej. 400 Bad Request o 409 Conflict) con mensaje descriptivo si falla.

---

## Issue 9
**Título:** [Sprint 4] Crear servicios Angular (HttpClient) e Interfaces TS
**Asignado a:** Lucas
**Etiquetas sugeridas:** `frontend`, `sprint-4`, `enhancement`

### Descripción
**Objetivo:** Configurar la conexión base en el frontend para comunicarse con la API de Spring Boot.

**Tareas a realizar:**
- [x] Configurar `environment.ts` con la URL base del backend.
- [x] Importar y configurar `HttpClientModule`.
- [x] Crear interfaces TypeScript (`Sala`, `Estudiante`, `Reserva`, `Horario`).
- [x] Crear los servicios Angular (`SalaService`, `ReservaService`, `EstudianteService`).

---

## Issue 10
**Título:** [Sprint 4] Página principal: Layout CSS Grid y Semántica HTML
**Asignado a:** Joshua
**Etiquetas sugeridas:** `frontend`, `sprint-4`, `enhancement`

### Descripción
**Objetivo:** Crear la estructura y diseño general de la página principal según las normativas de HTML5 y CSS Grid.

**Tareas a realizar:**
- [x] En `app.component.html`, utilizar etiquetas semánticas obligatorias: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- [x] Implementar **CSS Grid** para el Layout principal.
- [x] Implementar Media Queries para Escritorio (>1024px), Tablet (768-1023px) y Móvil (<768px).
- [x] Asegurar que el aside pase debajo del contenido principal en móvil.

---

## Issue 11
**Título:** [Sprint 4] Componente reutilizable: TarjetaSalaComponent
**Asignado a:** Subaru
**Etiquetas sugeridas:** `frontend`, `sprint-4`, `enhancement`

### Descripción
**Objetivo:** Crear el componente visual que muestra la información individual de una sala.

**Tareas a realizar:**
- [x] Generar el componente `tarjeta-sala`.
- [x] Usar `@Input()` para recibir los datos de la sala.
- [x] Usar `@Output()` para emitir el evento del botón "Reservar".
- [x] Aplicar diseño con **Flexbox**.
- [x] Asegurar accesibilidad (atributo `alt` en la imagen, `aria-label` en el botón).

---

## Issue 12
**Título:** [Sprint 4] Componentes reutilizables: MenuNavComponent y MensajeComponent
**Asignado a:** Lucas
**Etiquetas sugeridas:** `frontend`, `sprint-4`, `enhancement`

### Descripción
**Objetivo:** Desarrollar los componentes modulares para navegación y retroalimentación del sistema.

**Tareas a realizar:**
- [x] Generar componente `menu-nav` usando Flexbox, con versión responsiva (hamburguesa en móvil).
- [x] Generar componente `mensaje` para alertas de éxito o error.
- [x] Configurar el `mensaje` para que se cierre automáticamente tras 4 segundos.

---

## Issue 13
**Título:** [Sprint 5] Visualización y filtrado de salas (RF02 y RF03)
**Asignado a:** Joshua
**Etiquetas sugeridas:** `frontend`, `sprint-5`, `enhancement`

### Descripción
**Objetivo:** Mostrar dinámicamente las salas y permitir buscar por capacidad y fecha.

**Tareas a realizar:**
- [x] En el componente principal, consumir `SalaService` para obtener la lista.
- [x] Renderizar las salas iterando con `*ngFor` usando `<app-tarjeta-sala>`.
- [x] Crear los filtros UI (botones o select) para capacidad y un Datepicker para fecha.
- [x] Implementar lógica en Angular para filtrar la lista mostrada en pantalla.

---

## Issue 14
**Título:** [Sprint 5] Formulario de solicitud de reserva (RF05)
**Asignado a:** Subaru
**Etiquetas sugeridas:** `frontend`, `sprint-5`, `enhancement`

### Descripción
**Objetivo:** Construir el formulario para registrar nuevas reservas con todas sus validaciones en tiempo real.

**Tareas a realizar:**
- [x] Usar **Reactive Forms** de Angular para construir el formulario.
- [x] Crear autocompletado o buscador para el estudiante.
- [x] Cargar los horarios disponibles dinámicamente según la sala elegida.
- [x] Aplicar validaciones frontend (requeridos, correo, mínimo 15 caracteres).
- [x] Enviar datos a la API e invocar `MensajeComponent` con el resultado.

**Fixes post-implementación:**
- [x] Corregir serialización circular `HorarioDisponible ↔ Sala` (`@JsonIgnoreProperties`)
- [x] Corregir serialización circular `Sala ↔ Edificio` (`@JsonIgnoreProperties`)
- [x] Corregir serialización circular `Estudiante ↔ Carrera` (`@JsonIgnoreProperties`)
- [x] Precargar fecha del filtro en el formulario (`fechaInicial`)
- [x] Mostrar nombre de la sala en el modal en vez del ID genérico
- [x] Auto-cargar horarios al abrir el modal con fecha ya seteada
- [x] `min` de fecha hoy en inputs date (filtro y formulario) para evitar selección manual de fechas pasadas

---

## Issue 15
**Título:** [Sprint 5] Listado de reservas por sala (RF04)
**Asignado a:** Lucas
**Etiquetas sugeridas:** `frontend`, `sprint-5`, `enhancement`

### Descripción
**Objetivo:** Mostrar las reservas existentes al consultar una sala en un día específico.

**Tareas a realizar:**
- [x] Crear un panel/tabla que se active al seleccionar una fecha y una sala.
- [x] Llamar al API para obtener las reservas de ese cruce.
- [x] Mostrar Sala, Nº Reserva, Inicio, Fin, y Estado.
- [x] Mantener un contador dinámico "Reservas realizadas: N".

---

## Issue 16
**Título:** [Sprint 5] Pruebas globales, Accesibilidad y Readme
**Asignado a:** Joshua
**Etiquetas sugeridas:** `testing`, `sprint-5`, `documentation`

### Descripción
**Objetivo:** Garantizar que el sistema cumpla con el 100% de la rúbrica y esté listo para entrega.

**Tareas a realizar:**
- [ ] Probar el flujo completo desde el navegador.
- [ ] Verificar adaptabilidad responsiva en los 3 breakpoints solicitados (F12 > Device Toolbar).
- [ ] Auditar accesibilidad (uso de `labels`, `alt`, tabulación con teclado).
- [ ] Completar el archivo `README.md` del repositorio con instrucciones de compilación y pruebas.
- [ ] Preparar repositorio para el clon en directo del viernes.

---

## Issue 17
**Título:** [Hotfix] Optimización de rendimiento, corrección de bugs críticos y simplificación del formulario
**Asignado a:** Subaru
**Etiquetas sugeridas:** `backend`, `frontend`, `performance`, `bug`, `hotfix`

### Descripción
**Objetivo:** Corregir rendimiento de consultas SQL, bug del botón "Reservar", bug del filtrado de reservas por sala+fecha, simplificar formulario a solo RUT+nombre+apellido con auto-registro, y agregar imágenes de stock a las tarjetas.

### Tareas realizadas:

#### Base de Datos — Índices de rendimiento
- [x] Agregar `idx_estudiante_nombre` en `ESTUDIANTE(nombre)`
- [x] Agregar `idx_estudiante_apellido` en `ESTUDIANTE(apellido)`
- [x] Agregar `idx_estudiante_rut` en `ESTUDIANTE(rut)`
- [x] Agregar `idx_horario_sala` en `HORARIO_DISPONIBLE(id_sala)`
- [x] Agregar `idx_reserva_sala_fecha` en `RESERVA(id_sala, fecha_reserva)` (compuesto)
- [x] Agregar `idx_reserva_horario` en `RESERVA(id_horario)`
- [x] Agregar `idx_reserva_estudiante` en `RESERVA(id_estudiante)`

#### Backend — Optimización de consultas
- [x] `SalaRepository`: `JOIN FETCH s.edificio` en `findByCapacidadExacta()` (elimina N+1)
- [x] `HorarioDisponibleRepository`: cambiar `NOT IN` por `NOT EXISTS` + convertir a JPQL con `JOIN FETCH h.sala` (evita `LazyInitializationException` con `open-in-view=false`)
- [x] `HorarioDisponible.java`: `@ManyToOne(fetch = FetchType.LAZY)` en campo `sala`
- [x] `EstudianteRepository`: `@Query` explícita + `findByRutExacto()`

#### Backend — Corrección de bugs
- [x] `ReservaController.java`: parámetros opcionales `sala` y `fecha` en `GET /api/reservas`
- [x] `ReservaService.java`: `obtenerPorSalaYFecha()` + `@Transactional(readOnly = true)` a nivel de clase
- [x] `EstudianteController.java`: endpoint `GET /api/estudiantes/buscar/rut?rut=XX`
- [x] `ReservaService.java`: `validarObservacion()` relajada para permitir null/vacío (observaciones ahora opcional)
- [x] `Reserva.java`: columna `observacion` ahora nullable
- [x] `CarreraRepository.java`: nuevo repositorio para auto-asignar carrera por defecto al registrar estudiante
- [x] `EstudianteService.crearEstudiante()`: auto-completa correo (`rut@usm.cl`), fechaRegistro (hoy), carrera (id=1)

#### Backend — Configuración
- [x] `application.properties`: `spring.jpa.open-in-view=false`, batch_size=20, eliminado show-sql y dialecto

#### Backend — Servicios con @Transactional
- [x] `SalaService.java`: `@Transactional(readOnly = true)` a nivel de clase
- [x] `EstudianteService.java`: `@Transactional(readOnly = true)` a nivel de clase
- [x] `HorarioService.java`: `@Transactional(readOnly = true)` a nivel de clase

#### Frontend — Formulario simplificado (solo RUT + auto-registro)
- [x] `formulario-reserva.ts`: Reemplazar búsqueda+autocomplete por campos RUT, Nombre, Apellido + modo registro
- [x] `formulario-reserva.html`: Inputs simples con validación de RUT (pattern), nombre y apellido requeridos
- [x] Observaciones ahora opcional (sin validators)
- [x] `volverAReserva()` resetea `submitted = false` (evita botón deshabilitado fantasma)
- [x] Mensaje de éxito verde "Estudiante registrado correctamente. Confirma la reserva."

#### Frontend — Imágenes de stock en tarjetas
- [x] `tarjeta-sala.ts`: Array de 8 imágenes Unsplash + getter `imagenSala` que selecciona por `sala.id % 8`
- [x] `tarjeta-sala.html`: Reemplazar placeholder monograma por `<img>` con `loading="lazy"`
- [x] `tarjeta-sala.scss`: Eliminar estilos de placeholder; agregar `object-fit: cover`

#### Frontend — Zone.js + Change Detection
- [x] Instalar `zone.js` como dependencia
- [x] `main.ts`: `import 'zone.js'` al inicio
- [x] `app.config.ts`: `provideZoneChangeDetection()` para habilitar zone-based CD en Angular 21

---

## Issue 18
**Título:** [Sprint 6] Ver mis reservas por RUT + limpieza de código + documentación
**Asignado a:** Subaru
**Etiquetas sugeridas:** `frontend`, `backend`, `enhancement`, `cleanup`, `documentation`

### Descripción
**Objetivo:** Agregar modal "Mis Reservas" en el header para consultar reservas por RUT, mostrar nombre del estudiante en listado de reservas, limpiar código muerto y actualizar documentación.

### Tareas realizadas:

#### Backend — Nuevo endpoint + DTO extendido
- [x] `ReservaDTO.java`: Agregar campos `nombreEstudiante`, `nombreSala`, `horaInicio`, `horaTermino`, `nombreEstado`
- [x] `ReservaService.toDto()`: Poblar los nuevos campos desde las entidades relacionadas
- [x] `ReservaService.crearReserva()`: Poblar display fields en la respuesta
- [x] `ReservaService.obtenerPorRut(rut)`: Nuevo método que busca reservas por RUT del estudiante
- [x] `ReservaRepository.findByEstudianteRut(rut)`: Nueva JPQL con `JOIN FETCH`
- [x] `ReservaController.java`: `GET /api/reservas/mis-reservas?rut=XX`

#### Frontend — Componente BuscadorReservas
- [x] `buscador-reservas.ts`: Modal con input de RUT, búsqueda y tabla de resultados
- [x] `buscador-reservas.html`: Overlay + input + tabla responsive
- [x] `buscador-reservas.scss`: Estilos consistentes con el sistema de diseño
- [x] `reserva.service.ts`: `getReservasPorRut(rut)` + actualizar tipos a `ReservaDTO`
- [x] `reserva.interface.ts`: Agregar interfaz `ReservaDTO` con campos planos
- [x] `menu-nav.ts`: Agregar `@Output() misReservasClick`
- [x] `menu-nav.html`: Link "Mis Reservas" emite evento en vez de hacer scroll
- [x] `app.ts`: `mostrarBuscadorReservas`, `abrirBuscadorReservas()`, `cerrarBuscadorReservas()`
- [x] `app.html`: Integrar `<app-buscador-reservas>` y conectar evento del menú

#### Frontend — Listado de reservas con nombre del estudiante
- [x] `listado-reservas.html`: Agregar columna "Estudiante" + cambiar a campos planos del DTO
- [x] `listado-reservas.ts`: Actualizar tipo a `Reserva[]` (el DTO ahora incluye nombres)

#### Frontend — Limpieza de código muerto
- [x] `formulario-reserva.scss`: Eliminar bloque CSS `.autocomplete` (ya no se usa)
- [x] `app.scss`: Eliminar bloque CSS `.room-card`/`.btn-reserve` (código legacy)
- [x] `sala.service.ts`: Eliminar métodos sin uso `getSalaById()`, `getHorariosPorSala()`
- [x] `estudiante.service.ts`: Eliminar métodos sin uso `getEstudiantes()`, `buscarEstudiantes()`, `getEstudianteById()`
- [x] `reserva.service.ts`: Eliminar `getReservas()` sin uso
- [x] `app.spec.ts`: Actualizar test a texto real del template
- [x] `SalaController.java`, `EstudianteController.java`, `HorarioController.java`: Eliminar `@CrossOrigin` redundante (ya hay CorsConfig global)

#### Frontend — Correcciones
- [x] `ReservaService.java`: Agregar logging (`@Slf4j`) para trazabilidad de errores en creación de reservas
