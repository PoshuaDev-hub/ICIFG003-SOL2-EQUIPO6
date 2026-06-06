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
- [ ] Generar el componente `tarjeta-sala`.
- [ ] Usar `@Input()` para recibir los datos de la sala.
- [ ] Usar `@Output()` para emitir el evento del botón "Reservar".
- [ ] Aplicar diseño con **Flexbox**.
- [ ] Asegurar accesibilidad (atributo `alt` en la imagen, `aria-label` en el botón).

---

## Issue 12
**Título:** [Sprint 4] Componentes reutilizables: MenuNavComponent y MensajeComponent
**Asignado a:** Lucas
**Etiquetas sugeridas:** `frontend`, `sprint-4`, `enhancement`

### Descripción
**Objetivo:** Desarrollar los componentes modulares para navegación y retroalimentación del sistema.

**Tareas a realizar:**
- [ ] Generar componente `menu-nav` usando Flexbox, con versión responsiva (hamburguesa en móvil).
- [ ] Generar componente `mensaje` para alertas de éxito o error.
- [ ] Configurar el `mensaje` para que se cierre automáticamente tras 4 segundos.

---

## Issue 13
**Título:** [Sprint 5] Visualización y filtrado de salas (RF02 y RF03)
**Asignado a:** Joshua
**Etiquetas sugeridas:** `frontend`, `sprint-5`, `enhancement`

### Descripción
**Objetivo:** Mostrar dinámicamente las salas y permitir buscar por capacidad y fecha.

**Tareas a realizar:**
- [ ] En el componente principal, consumir `SalaService` para obtener la lista.
- [ ] Renderizar las salas iterando con `*ngFor` usando `<app-tarjeta-sala>`.
- [ ] Crear los filtros UI (botones o select) para capacidad y un Datepicker para fecha.
- [ ] Implementar lógica en Angular para filtrar la lista mostrada en pantalla.

---

## Issue 14
**Título:** [Sprint 5] Formulario de solicitud de reserva (RF05)
**Asignado a:** Subaru
**Etiquetas sugeridas:** `frontend`, `sprint-5`, `enhancement`

### Descripción
**Objetivo:** Construir el formulario para registrar nuevas reservas con todas sus validaciones en tiempo real.

**Tareas a realizar:**
- [ ] Usar **Reactive Forms** de Angular para construir el formulario.
- [ ] Crear autocompletado o buscador para el estudiante.
- [ ] Cargar los horarios disponibles dinámicamente según la sala elegida.
- [ ] Aplicar validaciones frontend (requeridos, correo, mínimo 15 caracteres).
- [ ] Enviar datos a la API e invocar `MensajeComponent` con el resultado.

---

## Issue 15
**Título:** [Sprint 5] Listado de reservas por sala (RF04)
**Asignado a:** Lucas
**Etiquetas sugeridas:** `frontend`, `sprint-5`, `enhancement`

### Descripción
**Objetivo:** Mostrar las reservas existentes al consultar una sala en un día específico.

**Tareas a realizar:**
- [ ] Crear un panel/tabla que se active al seleccionar una fecha y una sala.
- [ ] Llamar al API para obtener las reservas de ese cruce.
- [ ] Mostrar Sala, Nº Reserva, Inicio, Fin, y Estado.
- [ ] Mantener un contador dinámico "Reservas realizadas: N".

---

## Issue 16
**Título:** [Sprint 5] Pruebas globales, Accesibilidad y Readme
**Asignado a:** Victor
**Etiquetas sugeridas:** `testing`, `sprint-5`, `documentation`

### Descripción
**Objetivo:** Garantizar que el sistema cumpla con el 100% de la rúbrica y esté listo para entrega.

**Tareas a realizar:**
- [ ] Probar el flujo completo desde el navegador.
- [ ] Verificar adaptabilidad responsiva en los 3 breakpoints solicitados (F12 > Device Toolbar).
- [ ] Auditar accesibilidad (uso de `labels`, `alt`, tabulación con teclado).
- [ ] Completar el archivo `README.md` del repositorio con instrucciones de compilación y pruebas.
- [ ] Preparar repositorio para el clon en directo del viernes.
