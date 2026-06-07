# Registro de Implementación de Issues

Este documento detalla los archivos modificados y la lógica implementada tras la finalización de cada Issue. El objetivo es mantener al equipo sincronizado y facilitar la revisión del código.

---

## Issue 1: [Sprint 2] Configurar conexión Spring Boot ↔ PostgreSQL

**Estado:** Completado ✅

### Archivos Modificados / Creados
1. **`backend/src/main/resources/application.properties` (Modificado):**
   - Se agregaron las credenciales y la URL JDBC para conectar la aplicación a la base de datos PostgreSQL local (`reserva_salas_db`).
   - Se configuró JPA con `hibernate.ddl-auto=validate`, `show-sql=true` y el dialecto de PostgreSQL.

2. **`backend/pom.xml` (Modificado):**
   - Se actualizó la versión de Spring Boot (a la 3.2.5) debido a que la versión especificada en la plantilla no existía, lo que impedía que Maven descargara las librerías.
   - Se corrigieron los nombres de los "starters" de Spring Boot.
   - Se limpió la configuración del `maven-compiler-plugin` para que la integración con Lombok y Spring Boot funcione por defecto sin arrojar errores.

3. **`package.json` en la raíz (Nuevo):**
   - Se agregó una configuración en formato JSON en la raíz del proyecto para que se ejecute todo de manera correcta en la Virtual Box.
   - Esto incluye scripts usando `concurrently` (`npm run dev`) que permiten levantar tanto el backend (Maven) como el frontend (npm) de forma simultánea, agilizando el flujo de desarrollo del equipo.

### Lógica y Contexto
- **Conexión a Base de Datos:** Se estableció el puente entre el backend y PostgreSQL. Para validar la lógica, se creó la base de datos localmente y se ejecutó un test de contexto (`mvnw test`), confirmando que la aplicación logra inicializar el pool de conexiones hacia la base de datos de manera exitosa.
- **Orquestación del Entorno:** La introducción del `package.json` unifica el inicio del sistema. De este modo, cualquier integrante del equipo (o al trabajar dentro de la Virtual Box) solo necesita instalar las dependencias (`npm install`) y ejecutar `npm run dev` para tener todo el ecosistema funcionando sin tener que gestionar múltiples terminales.

---

## Issue 2: [Sprint 2] Diseñar y crear script DDL (01_schema.sql)

**Estado:** Completado ✅

### Archivos Modificados / Creados
1. **`database/01_schema.sql` (Creado):**
   - Se implementó la creación de todas las tablas del MER: `CARRERA`, `ESTUDIANTE`, `EDIFICIO`, `SALA`, `HORARIO_DISPONIBLE`, `ESTADO_RESERVA` y `RESERVA`.
   - Se añadieron llaves primarias (`SERIAL PRIMARY KEY` e `INT PRIMARY KEY` para `ESTADO_RESERVA`).
   - Se añadieron llaves foráneas con `REFERENCES` para todas las relaciones del modelo.
   - Se incluyeron restricciones `NOT NULL` y `UNIQUE` según la rúbrica.
   - Se agregó una sección de limpieza inicial (`DROP TABLE IF EXISTS`) para garantizar que el script sea idempotente.

### Lógica y Contexto
- **Modelo Relacional Físico:** Se construyó el script DDL que traduce fielmente el MER especificado en los documentos del proyecto. Las tablas quedaron correctamente relacionadas mediante claves foráneas, respetando los tipos de datos (`SERIAL`, `VARCHAR`, `INT`, `DATE`, `TIME`, `TIMESTAMP`) y las restricciones definidas en la rúbrica.
- **Compatibilidad con JPA:** La estructura del schema está alineada con las entidades JPA del backend, permitiendo que `hibernate.ddl-auto=validate` funcione sin errores al validar el mapeo objeto-relacional.

---

## Issue 3: [Sprint 2] Crear script de datos de prueba (02_seed.sql)

**Estado:** Completado ✅

### Archivos Modificados / Creados
1. **`database/02_seed.sql` (Creado):**
   - Se pobló la base con datos coherentes para las 7 tablas del MER, respetando el orden de dependencias de llaves foráneas (`CARRERA → EDIFICIO → SALA → ESTADO_RESERVA → ESTUDIANTE → HORARIO_DISPONIBLE → RESERVA`).
   - **CARRERA:** 4 carreras (supera el mínimo de 3).
   - **ESTUDIANTE:** 6 estudiantes con RUT de dígito verificador válido (algoritmo módulo 11) y correos únicos (supera el mínimo de 5).
   - **EDIFICIO:** 2 edificios (acota al rango 1-2 que pide el ticket).
   - **SALA:** 6 salas con capacidades 4, 4, 8, 8, 12 y 20, de modo que quede cobertura para los tres filtros del RF03 (≤4, ≤8, >8).
   - **HORARIO_DISPONIBLE:** 30 bloques (5 por sala), cada horario amarrado a su `id_sala`.
   - **ESTADO_RESERVA:** Confirmada y Cancelada, con `id_estado` asignado manualmente.
   - **RESERVA:** 10 reservas iniciales mezclando estados Confirmada y Cancelada.
   - Se agregó un `TRUNCATE ... RESTART IDENTITY CASCADE` inicial para que el script sea idempotente y re-ejecutable sin romper las llaves foráneas.

### Lógica y Contexto
- **Manejo de IDs:** Dado que el `01_schema.sql` define las PK como `SERIAL` (salvo `ESTADO_RESERVA`, que es `INT`), el seed **no** inserta IDs explícitos en las tablas SERIAL: deja que PostgreSQL los genere por orden de inserción y las FKs referencian esos correlativos (CARRERA 1..4, SALA 1..6, etc.). La única tabla con `id_estado` manual es `ESTADO_RESERVA`. Como nunca se fuerzan valores en las secuencias, los `INSERT` que haga el backend más adelante (Issue #8) toman el siguiente correlativo sin colisiones.
- **Anticipación de reglas de negocio (Issue #8):** Aunque las validaciones viven en la capa de servicio, los datos del seed ya las cumplen para no generar inconsistencias en las pruebas: todas las observaciones tienen ≥ 15 caracteres, ninguna combinación `sala + horario + fecha` se repite en estado Confirmada (no se "pisan" reservas), y cada `id_horario` pertenece efectivamente a su `id_sala`.
- **Validación realizada:** El script se ejecutó sobre el `01_schema.sql` real en PostgreSQL 16 sin errores, respetando todas las restricciones `NOT NULL`, `UNIQUE` y de llave foránea. Se verificó adicionalmente que un `INSERT` posterior sin `id` genera correctamente el siguiente correlativo, confirmando que las secuencias quedan sanas para el desarrollo del backend.

---

---

## Issue 4: [Sprint 2] Crear entidades JPA con relaciones y Lombok

**Estado:** Completado ✅

### Archivos Modificados / Creados
* **`backend/src/main/java/com/equipo6/reservas/models/*` (Creados):** Se crearon las clases Java para las tablas del MER (`Carrera`, `Edificio`, `Sala`, `Estudiante`, `HorarioDisponible`, `EstadoReserva`, `Reserva`).
* **Anotaciones base:** Se configuró JPA mediante `@Entity`, `@Table`, `@Id`, y `@GeneratedValue(strategy = GenerationType.IDENTITY)` para el auto-incremento.
* **Relaciones:** Se implementó la cardinalidad estricta usando `@ManyToOne` y `@OneToMany` con sus respectivos `@JoinColumn` para enlazar las llaves foráneas.
* **Integración Lombok:** Se añadieron `@Data`, `@NoArgsConstructor` y `@AllArgsConstructor` para automatizar getters, setters y constructores, limpiando el código de métodos repetitivos.

### Lógica y Contexto
Se mapeó exitosamente el modelo físico de la base de datos a objetos Java. La relación M:N original de las reservas se modeló según el estándar relacional, promoviendo la tabla intermedia a una Entidad JPA independiente (`Reserva`). Esto permite alojar los atributos propios de la relación sin romper las reglas de persistencia de Hibernate.

---

## Issue 5: [Sprint 3] Crear Repositories y Services (CRUD base)

**Estado:** Completado ✅

### Archivos Modificados / Creados
* **`backend/src/main/java/com/equipo6/reservas/repositories/*` (Creados):** Se crearon interfaces para cada entidad clave extendiendo de `JpaRepository`, habilitando el acceso a datos sin necesidad de implementar sentencias SQL manuales.
* **`backend/src/main/java/com/equipo6/reservas/services/*` (Creados):** Se implementaron las clases de servicio con la anotación `@Service`.
* **Métodos CRUD:** Se establecieron los métodos base de la lógica de negocio, haciendo uso de `findAll()`, `findById()` y `save()` proporcionados por el repositorio para gestionar el ciclo de vida de los datos.

### Lógica y Contexto
Se separó la capa de acceso a datos de la capa de lógica de negocio, cumpliendo con la arquitectura limpia. Los servicios ahora actúan como intermediarios que pueden procesar validaciones antes de contactar a los repositorios, preparando el terreno para la inyección de datos desde los controladores.
**(Actualización Sprint 5):** Se crearon los servicios faltantes `SalaService.java`, `EstudianteService.java` y `HorarioService.java` para proveer todas las operaciones CRUD y exponer los endpoints requeridos por el frontend.

---

## Issue 6: [Sprint 3] Crear Controllers y DTOs (Endpoints y CORS)

**Estado:** Completado ✅

### Archivos Modificados / Creados
* **`backend/src/main/java/com/equipo6/reservas/dtos/*` (Creados):** Se implementaron los objetos de transferencia de datos (ej. `ReservaDTO`) para capturar y enviar información desde y hacia el cliente.
* **`backend/src/main/java/com/equipo6/reservas/controllers/*` (Creados):** Se establecieron los controladores con `@RestController` y `@RequestMapping("/api/...")`.
* **Endpoints base:** Se expusieron las rutas HTTP iniciales (GET, POST) para que el frontend pueda consumir los recursos de salas, estudiantes y reservas.
* **`backend/src/main/java/com/equipo6/reservas/config/CorsConfig.java` (Creado):** Se configuró una política CORS global para habilitar explícitamente el origen `http://localhost:4200`, permitiendo la comunicación segura con Angular.

### Lógica y Contexto
La capa de presentación quedó completamente habilitada. El uso de DTOs asegura que la API solo transfiera las referencias necesarias (como los IDs) hacia el exterior, evitando exponer el modelo completo de la base de datos y previniendo problemas de serialización JSON. Además, la configuración CORS garantiza que el frontend y el backend interactúen sin bloqueos del navegador.
**(Actualización Sprint 5):** Se crearon los controladores faltantes `SalaController.java`, `EstudianteController.java` y `HorarioController.java` con sus respectivos endpoints REST (GET, POST, PUT, DELETE) siguiendo la arquitectura establecida y la inyección de dependencias hacia los nuevos servicios creados.

---

## Issue 7: [Sprint 3] Implementar queries objetales (JPQL) y nativas

**Estado:** Completado ✅

### Archivos Modificados / Creados
* **`backend/src/main/java/com/equipo6/reservas/repositories/SalaRepository.java` (Modificado):**
  * Se agregó la consulta JPQL `@Query("SELECT s FROM Sala s WHERE s.capacidad >= :capacidad")` para filtrar salas según su capacidad mínima (RF02).
* **`backend/src/main/java/com/equipo6/reservas/repositories/ReservaRepository.java` (Modificado):**
  * Se agregó la consulta JPQL para listar reservas de una sala en una fecha concreta (RF04).
  * Se implementó una **Native Query** (`SELECT r.* FROM reserva r JOIN estudiante e ...`) para obtener el detalle de las reservas unido a la información del estudiante asociado a una sala.
* **`backend/src/main/java/com/equipo6/reservas/repositories/HorarioDisponibleRepository.java` (Modificado):**
  * Se incluyó una consulta JPQL para traer todos los horarios base de una sala específica (RF05).
  * Se construyó una **Native Query** compleja (`SELECT hd.* FROM horario_disponible hd WHERE ... NOT IN (...)`) para calcular en tiempo real los horarios disponibles de una sala excluyendo aquellos que ya poseen una reserva "Confirmada".

### Lógica y Contexto
Todas las consultas necesarias para el filtrado dinámico del frontend están listas en la capa de persistencia. Se utilizaron `@Query` y `@Param` explícitos asegurando escalabilidad. Cada consulta fue documentada internamente para relacionarla de forma trazable con el requerimiento de negocio que satisface.

---

## Issue 8: [Sprint 3] Endpoint POST /api/reservas con validaciones de negocio

**Estado:** Completado ✅

### Archivos Modificados / Creados
1. **`backend/src/main/java/com/equipo6/reservas/services/ReservaService.java` (Modificado):**
   - Se agregó el método `validarFecha()` que verifica que `fechaReserva >= hoy`, lanzando `IllegalArgumentException` en caso contrario.
   - Se agregó el método `validarObservacion()` que comprueba que la observación tenga al menos 15 caracteres (trim, no espacios en blanco).
   - Se agregó el método `validarDisponibilidad()` que consulta `ReservaRepository.existsReservaConfirmada()` para detectar conflictos de horario con reservas en estado "Confirmada".
   - Se reemplazaron los `orElseThrow()` genéricos por mensajes descriptivos que indican qué ID no se encontró.

2. **`backend/src/main/java/com/equipo6/reservas/controllers/ReservaController.java` (Modificado):**
   - Se cambió el tipo de retorno de `POST /api/reservas` a `ResponseEntity<?>` para poder devolver tanto el DTO creado (201) como mensajes de error.
   - Se captura `IllegalArgumentException` → retorna `400 Bad Request` con mensaje descriptivo.
   - Se captura `IllegalStateException` → retorna `409 Conflict` con mensaje de horario ocupado.

3. **`backend/src/main/java/com/equipo6/reservas/repositories/ReservaRepository.java` (Modificado):**
   - Se agregó la consulta JPQL `existsReservaConfirmada()` que verifica mediante `COUNT` si existe una reserva con la misma sala, fecha y horario en estado "Confirmada", retornando `boolean`.

### Lógica y Contexto
- **Validaciones de negocio implementadas:**
  - Fecha de reserva no puede ser anterior al día actual.
  - Observación debe tener mínimo 15 caracteres.
  - El estudiante debe existir en la base de datos (con mensaje de error por ID).
  - La sala y horario deben existir en la base de datos.
  - No se puede reservar un horario que ya tenga una reserva Confirmada para la misma sala y fecha.
- **Códigos HTTP:** Se utiliza `400 Bad Request` para errores de validación de campos y `409 Conflict` para conflictos de disponibilidad, siguiendo las buenas prácticas REST.
- **Integridad referencial:** Las validaciones previenen la creación de reservas duplicadas o inválidas, manteniendo la consistencia de los datos en la base de datos.

---

## Issue 9: [Sprint 4] Crear servicios Angular (HttpClient) e Interfaces TS

**Estado:** Completado ✅

### Archivos Modificados / Creados
1. **`frontend/src/environments/environment.ts` (Creado):**
   - Se configuró `apiUrl: 'http://localhost:8080/api'` como constante de entorno, desacoplando la URL del backend del código de los servicios.

2. **`frontend/src/environments/environment.prod.ts` (Creado):**
   - Versión de producción del archivo de entorno, con el flag `production: true` y la misma `apiUrl`.

3. **`frontend/src/app/interfaces/` (Creados — 6 archivos):**
   - `carrera.interface.ts`: campos `id`, `nombreCarrera`, `facultad`.
   - `edificio.interface.ts`: campos `id`, `nombreEdificio`, `direccion`.
   - `sala.interface.ts`: campos del MER más referencia tipada a `Edificio`.
   - `horario.interface.ts`: campos `id`, `idSala`, `horaInicio`, `horaTermino`.
   - `estudiante.interface.ts`: campos del MER más referencia tipada a `Carrera`.
   - `reserva.interface.ts`: interfaces `EstadoReserva`, `Reserva` y `ReservaRequest` (DTO de creación para el POST).

4. **`frontend/src/app/services/sala.service.ts` (Creado):**
   - `getSalas()`: obtiene todas las salas (RF02).
   - `getSalasPorCapacidad(capacidad)`: filtra salas por query param `?capacidad=N` (RF03).
   - `getSalaById(id)`: obtiene una sala por ID.
   - `getHorariosDisponibles(idSala, fecha)`: trae horarios libres de una sala en una fecha (RF05).
   - `getHorariosPorSala(idSala)`: trae todos los horarios de una sala (RF05).

5. **`frontend/src/app/services/estudiante.service.ts` (Creado):**
   - `getEstudiantes()`: obtiene el listado completo para el buscador (RF05).
   - `buscarEstudiantes(termino)`: búsqueda por nombre o RUT con query param `?q=termino` (RF05).
   - `getEstudianteById(id)`: obtiene un estudiante por ID.

6. **`frontend/src/app/services/reserva.service.ts` (Creado):**
   - `getReservasPorSalaYFecha(idSala, fecha)`: obtiene reservas filtradas por sala y fecha (RF04).
   - `crearReserva(reserva)`: envía `POST /api/reservas` con el `ReservaRequest` DTO (RF05).
   - `getReservas()`: obtiene todas las reservas.

7. **`frontend/src/app/app.config.ts` (Modificado):**
   - Se agregó `provideHttpClient(withFetch())` al array de `providers`, habilitando `HttpClient` globalmente (API funcional de Angular 21 que reemplaza el deprecado `HttpClientModule`).

### Lógica y Contexto
- **Separación de entornos:** Al hacer build de producción (`ng build --configuration production`), Angular reemplaza automáticamente `environment.ts` por `environment.prod.ts`, sin cambiar ningún servicio.
- **Tipado estricto:** Las interfaces reflejan fielmente el MER del backend, garantizando que cualquier respuesta de la API quede tipada y los errores de contrato se detecten en tiempo de compilación.
- **Servicios singleton:** Al usar `providedIn: 'root'`, los tres servicios se registran como singletons globales sin necesidad de declararlos en ningún módulo.
- **Preparación para Issues 13, 14 y 15:** Cada método de servicio está diseñado para ser consumido directamente por los componentes de filtrado de salas (Issue 13), el formulario de reserva (Issue 14) y el panel de reservas por sala (Issue 15).

---

## Issue 10: [Sprint 4] Página principal: Layout CSS Grid y Semántica HTML

**Estado:** Completado ✅

### Archivos Modificados / Creados
* **`frontend/src/styles.scss` (Modificado):**
  * Se definieron variables de colores CSS (Glassmorphism, sombras, índigo como color primario).
  * Se importó la fuente global *Outfit* de Google Fonts para dar un acabado profesional.
  * Reset básico de márgenes, paddings y `box-sizing`.
* **`frontend/src/app/app.html` (Modificado):**
  * Se borró el placeholder por defecto de Angular.
  * Se incluyeron las etiquetas semánticas exigidas: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
  * Se creó la jerarquía DOM para facilitar la aplicación de Grid.
* **`frontend/src/app/app.scss` (Modificado):**
  * Se implementó **CSS Grid** (`display: grid;`) en el layout global y en el contenedor del cuerpo (main y aside).
  * Se configuraron los Media Queries solicitados: Escritorio (>1024px), Tablet (768-1023px) ajustando los paddings, y Móvil (<768px) donde la grilla pasa a 1 sola columna permitiendo que el `<aside>` caiga fluidamente bajo el `<main>`.

### Lógica y Contexto
Esta implementación es fundamental porque establece el esqueleto responsivo y la estética de toda la plataforma de aquí en adelante. Gracias a las variables CSS en `styles.scss`, los futuros componentes (como tarjetas de sala y formularios) podrán usar de manera consistente los colores y tipografías establecidas aquí, reduciendo código duplicado.

---

## Issue 11: [Sprint 4] Componente reutilizable: TarjetaSalaComponent

**Estado:** Completado ✅

### Archivos Modificados / Creados
1. **`frontend/src/app/components/tarjeta-sala/tarjeta-sala.ts` (Creado):**
   - Componente standalone con `@Input({ required: true }) sala: Sala` que recibe los datos de la sala.
   - `@Output() reservar = new EventEmitter<number>()` que emite el ID de la sala al hacer clic.
   - Método `getImagenSala()` que retorna una imagen representativa.

2. **`frontend/src/app/components/tarjeta-sala/tarjeta-sala.html` (Creado):**
   - Template con etiqueta semántica `<article>` para cada tarjeta.
   - Imagen con `alt` dinámico (`'Imagen de ' + sala.nombreSala`) y `loading="lazy"`.
   - Muestra: nombre de la sala, capacidad, ubicación (piso + edificio), horario disponible y botón "Reservar".
   - Botón con `aria-label` dinámico (`'Reservar ' + sala.nombreSala`).

3. **`frontend/src/app/components/tarjeta-sala/tarjeta-sala.scss` (Creado):**
   - Layout con Flexbox (`display: flex; flex-direction: column`).
   - Distribución vertical de la información dentro de la tarjeta.
   - Efecto hover con elevación (`translateY` + `box-shadow`).
   - Botón con estados `hover` y `focus-visible` para accesibilidad por teclado.

### Lógica y Contexto
- **Componente reutilizable:** Recibe una sala mediante `@Input()` y emite eventos con `@Output()`, lo que permite usarlo con `*ngFor` en cualquier parte de la aplicación sin acoplarse a un servicio específico.
- **Flexbox:** Se usó `display: flex` tanto en la tarjeta principal (columna) como en la distribución de la información, cumpliendo con el requerimiento de la rúbrica.
- **Accesibilidad:** La imagen tiene `alt` descriptivo, el botón tiene `aria-label` y `focus-visible`, y el orden de tabulación es lógico de arriba a abajo.

---

## Issue 12: [Sprint 4] Componentes reutilizables: MenuNavComponent y MensajeComponent

**Estado:** Completado ✅

### Archivos Modificados / Creados
1. **`frontend/src/app/components/menu-nav/menu-nav.ts` (Creado):**
   - Componente standalone que gestiona su propio scroll con `@HostListener('window:scroll')`.
   - Propiedad `isScrolled` para aplicar la clase comprimida al header.
   - Propiedad `isMenuOpen` para controlar la visibilidad del menú en móvil.
   - Métodos `toggleMenu()` y `closeMenu()` para el comportamiento del hamburger.

2. **`frontend/src/app/components/menu-nav/menu-nav.html` (Creado):**
   - Etiqueta semántica `<header>` con `<nav aria-label="Navegación principal">`.
   - Botón hamburguesa con SVG inline, `aria-expanded` y `aria-label` dinámico (accesibilidad).
   - El ícono cambia de ☰ a ✕ según el estado de `isMenuOpen`.
   - Los enlaces llaman a `closeMenu()` para cerrar el menú al navegar.

3. **`frontend/src/app/components/menu-nav/menu-nav.scss` (Creado):**
   - Layout con **Flexbox** (`display: flex; justify-content: space-between`).
   - Desktop: hamburger oculto, nav horizontal con `gap: 3rem`.
   - Móvil (<768px): hamburger visible, nav colapsado con `display: none` / expandido con `.open`.
   - Animación de scroll: `padding` y `backdrop-filter` al agregar clase `.scrolled`.

4. **`frontend/src/app/components/mensaje/mensaje.ts` (Creado):**
   - `@Input() tipo: 'exito' | 'error'`, `@Input() texto`, `@Input() visible`.
   - `@Output() cerrar` para notificar al padre cuando el mensaje debe ocultarse.
   - `ngOnChanges`: inicia `setTimeout` de 4 segundos al volverse visible; cancela el timer si se oculta antes.
   - `ngOnDestroy`: limpia el timer para evitar memory leaks.

5. **`frontend/src/app/components/mensaje/mensaje.html` (Creado):**
   - `*ngIf="visible"` con `role="alert"` y `aria-live="polite"` para lectores de pantalla.
   - SVG de check para éxito y SVG de X para error (iconografía vectorial).
   - Botón de cierre manual con `aria-label="Cerrar mensaje"`.

6. **`frontend/src/app/components/mensaje/mensaje.scss` (Creado):**
   - Toast fijo (`position: fixed; bottom: 2rem`) centrado horizontalmente.
   - Paleta diferenciada: verde suave para éxito, rojo suave para error.
   - Animación de entrada `slideUp` con `@keyframes`.
   - En móvil: ocupa el ancho completo menos márgenes.

7. **`frontend/src/app/app.ts` (Modificado):**
   - Se eliminó `isScrolled` y `@HostListener` (ahora viven en `MenuNavComponent`).
   - Se importaron `MenuNavComponent` y `MensajeComponent`.
   - Se añadieron `mensajeVisible`, `mensajeTipo`, `mensajeTexto` y métodos `mostrarMensaje()` / `cerrarMensaje()`.
   - `simularReserva()` ahora invoca `mostrarMensaje('exito', ...)`.

8. **`frontend/src/app/app.html` (Modificado):**
   - El bloque `<header>` fue reemplazado por `<app-menu-nav>`.
   - Se añadió `<app-mensaje>` con binding bidireccional de inputs/outputs.

9. **`frontend/src/app/app.scss` (Modificado):**
   - Se eliminó el bloque `.lib-header` (migrado a `menu-nav.scss`).
   - Se eliminaron las referencias al header en las media queries.

### Lógica y Contexto
- **Separación de responsabilidades:** El scroll del navbar ya no contamina `App` — `MenuNavComponent` es autocontenido. Esto facilita reutilizarlo en cualquier otra página sin acoplar estado.
- **Cierre automático del mensaje:** Se usa `ngOnChanges` en lugar de `ngOnInit` para detectar cada vez que `visible` cambia a `true`, reiniciando el timer. Sin esto, el segundo mensaje nunca arrancaría el timer.
- **Accesibilidad del hamburger:** El botón usa `aria-expanded` dinámico y `aria-controls`, lo que permite a lectores de pantalla anunciar el estado del menú.
- **Preparación para Issues 14 y 15:** `MensajeComponent` está listo para ser invocado desde el formulario de reserva (Issue 14) y el panel de reservas (Issue 15) simplemente llamando a `mostrarMensaje(tipo, texto)` desde el componente padre.

---

## Issue 13: [Sprint 5] Visualización y filtrado de salas (RF02 y RF03)

**Estado:** Completado ✅

### Archivos Modificados / Creados

1. **`frontend/src/app/app.ts` (Modificado):**
   - Se importaron `FormsModule`, `TarjetaSalaComponent`, `SalaService` e interface `Sala`.
   - Se inyectó `SalaService` mediante el constructor (inyección de dependencias de Angular).
   - Se declararon las variables de estado: `salas: Sala[]`, `filtroCapacidad: number` y `filtroFecha: string` (inicializada con la fecha actual del sistema).
   - Se implementó `cargarSalas()`: llama a `salaService.getSalas()` y suscribe el resultado al array `salas`. Incluye manejo de error con `MensajeComponent`.
   - Se implementó `aplicarFiltros()`: si `filtroCapacidad > 0`, llama a `salaService.getSalasPorCapacidad()`; en caso contrario llama a `cargarSalas()`.
   - Se implementó `onReservar(idSala)`: recibe el ID emitido por `TarjetaSalaComponent` y muestra un mensaje preparatorio para el Issue 14.
   - Se invoca `cargarSalas()` desde `ngOnInit()`.

2. **`frontend/src/app/app.html` (Modificado):**
   - Se eliminaron las dos tarjetas de sala estáticas ("Borges" y "Mistral").
   - Se añadió `<div class="filters-container">` con dos controles de filtrado:
     - `<select id="capacidadFilter">` con opciones 0 (todas), 4, 8, 12 y 20+ personas, vinculado con `[(ngModel)]="filtroCapacidad"` y `(change)="aplicarFiltros()"`.
     - `<input type="date" id="fechaFilter">` vinculado con `[(ngModel)]="filtroFecha"`.
   - Se añadió `<div class="cards-grid" *ngIf="salas.length > 0">` con iteración dinámica:
     ```html
     <app-tarjeta-sala *ngFor="let s of salas" [sala]="s" (reservar)="onReservar($event)">
     ```
   - Se añadió mensaje de estado vacío: `<div class="no-salas-msg" *ngIf="salas.length === 0">`.

3. **`frontend/src/app/app.scss` (Modificado):**
   - Se añadieron estilos para `.filters-container`: `display: flex`, `gap: 2rem`, fondo `var(--bg-card)`, bordes con variables del sistema.
   - Se añadió `.filter-group` con `flex-direction: column` para apilar etiqueta e input verticalmente.
   - Los controles `select` e `input[type="date"]` heredan la paleta del proyecto (variables CSS globales) con estilo `focus` que resalta con `var(--accent-wood)`.
   - Se añadió `.no-salas-msg` con estilo centrado y borde discontinuo para indicar ausencia de resultados.

4. **Backend (Creados previamente como pre-requisito):**
   - `backend/src/main/java/com/equipo6/reservas/services/SalaService.java` (Creado).
   - `backend/src/main/java/com/equipo6/reservas/controllers/SalaController.java` (Creado).
   - Endpoints habilitados: `GET /api/salas` y `GET /api/salas?capacidad=N`.

### Lógica y Contexto
- **Conexión Frontend ↔ Backend:** `SalaService` (Angular) apunta a `http://localhost:8080/api/salas`. El backend expone ese endpoint desde `SalaController`, que delega en `SalaService` (Java), que usa `SalaRepository.findAll()` o `findByCapacidadMinima()` según el parámetro recibido.
- **Filtro de Capacidad (RF03):** El filtrado se realiza del lado del servidor mediante la JPQL query `findByCapacidadMinima()` en `SalaRepository`, garantizando que solo lleguen al cliente las salas que cumplen el criterio.
- **Filtro de Fecha:** La variable `filtroFecha` queda almacenada en el estado del componente con la fecha actual del sistema como valor por defecto, lista para ser consumida por el Issue 14 (formulario de reserva) al momento de cargar los horarios disponibles de una sala.
- **Manejo de Errores:** Si el backend no responde, se captura el error en el `subscribe` y se invoca `MensajeComponent` con tipo `'error'` para notificar al usuario de forma visual.
- **Tipado Estricto:** El array `salas` está tipado como `Sala[]`, garantizando que cualquier discrepancia entre los campos del backend y del frontend sea detectada en tiempo de compilación.
- **CORS:** La comunicación está habilitada gracias a `CorsConfig.java` (global) y las anotaciones `@CrossOrigin` en cada controller, permitiendo peticiones desde `http://localhost:4200`.

---

## Issue 14: [Sprint 5] Formulario de solicitud de reserva (RF05)

**Estado:** Completado ✅

### Archivos Creados

1. **`frontend/src/app/components/formulario-reserva/formulario-reserva.ts` (Creado):**
   - Componente standalone importando `ReactiveFormsModule`, `CommonModule`.
   - `@Input() idSala: number | null` — recibe la sala seleccionada desde `App`.
   - `@Output() reservaCreada` — notifica al padre cuando la reserva se creó exitosamente.
   - `@Output() cancelar` — permite cerrar el modal desde el padre.
   - Formulario reactivo con `FormBuilder` y validaciones:
     - `estudiante`: requerido (input con autocomplete).
     - `fecha`: requerido, validador personalizado `fechaNoAnteriorValidator`.
     - `idHorario`: requerido (select cargado dinamicamente).
     - `observaciones`: requerido, `minLength(15)`.
   - `buscarEstudiantes(termino)`: llama a `EstudianteService.buscarEstudiantes()` si el termino tiene >= 2 caracteres.
   - `seleccionarEstudiante(est)`: asigna el estudiante y limpia la lista de autocomplete.
   - `onFechaChange()` / `cargarHorarios()`: obtiene horarios disponibles desde `SalaService.getHorariosDisponibles()`.
   - `onSubmit()`: construye el body con `idEstado: 1` (Confirmada) y llama a `ReservaService.crearReserva()`.
   - `resetForm()`: limpia todos los campos y el estado despues de crear una reserva.

2. **`frontend/src/app/components/formulario-reserva/formulario-reserva.html` (Creado):**
   - Modal con overlay semitransparente.
   - Header con titulo "Nueva Reserva" y boton cerrar con SVG.
   - Buscador de estudiante con input + lista de autocomplete.
   - Selector de fecha con disparo de carga de horarios al cambiar.
   - Selector de horario cargado dinamicamente y mensaje "No hay horarios disponibles".
   - Textarea para observaciones con placeholder "Minimo 15 caracteres...".
   - Mensajes de error especificos por cada validacion.
   - Botones "Cancelar" y "Confirmar Reserva" con estado disabled si el formulario es invalido.

3. **`frontend/src/app/components/formulario-reserva/formulario-reserva.scss` (Creado):**
   - Overlay con flex centrado y fondo semitransparente.
   - Modal con max-width 520px, sombra flotante, scroll interno.
   - Flexbox en form-group para apilar label + input.
   - Autocomplete posicionado absolutamente debajo del input.
   - Estados focus con color variable accent-wood.
   - Botones con colores diferenciados y disabled con opacidad reducida.

### Archivos Modificados

4. **`frontend/src/app/app.ts` (Modificado):**
   - Se importo `FormularioReservaComponent`.
   - Se agrego `salaSeleccionada: number | null = null` para controlar visibilidad del formulario.
   - `onReservar(idSala)` ahora asigna `this.salaSeleccionada = idSala` (abre el modal).
   - Se agregaron `onReservaCreada()` y `onCancelarReserva()`.
   - Se elimino `simularReserva()` (reemplazado por el formulario real).

5. **`frontend/src/app/app.html` (Modificado):**
   - Se agrego `<app-formulario-reserva>` con `*ngIf="salaSeleccionada"`.

6. **`.gitignore` (Creado):**
   - Se creo `.gitignore` raiz para ignorar `node_modules/` y `package-lock.json`.

### Logica y Contexto
- **Reactive Forms:** Se eligio `ReactiveFormsModule` sobre `FormsModule` porque permite validacion sincrona mas expresiva, validadores personalizados (como `fechaNoAnteriorValidator`) y mejor escalabilidad para formularios complejos.
- **Autocomplete de estudiante:** El input de estudiante dispara busquedas contra el backend solo cuando el usuario escribe al menos 2 caracteres, evitando llamadas innecesarias. Al seleccionar un resultado, el input se rellena con "Nombre Apellido - RUT" y el objeto `Estudiante` completo queda almacenado para el envio.
- **Horarios dinamicos:** Al cambiar la fecha o al abrir el formulario con una sala preseleccionada, se consulta `GET /api/horarios/disponibles?sala=X&fecha=Y` que retorna solo los horarios sin reservas confirmadas.
- **Envio a la API:** El body se construye con `idEstado: 1` (Confirmada) y se envia como `POST /api/reservas`. Errores del backend como conflicto de horario se capturan pero aun no se muestran en MensajeComponent.
- **UX del modal:** El overlay captura clics fuera del formulario para cerrarlo. El modal tiene scroll interno para no desbordar la pantalla en movil.

### Fixes Post-Implementacion

1. **`HorarioDisponible.java`** -- Se agrego `@JsonIgnoreProperties("horariosDisponibles")` en el campo `sala` para romper la recursion infinita al serializar la lista de horarios disponibles. Sin esto, el endpoint `/api/horarios/disponibles` lanzaba `StackOverflowError` y el frontend mostraba "No hay horarios disponibles".

2. **`app.ts`** -- `salaSeleccionada` cambio de `number | null` a `Sala | null`. `onReservar(idSala)` ahora busca la sala completa en `this.salas`.

3. **`app.html`** -- Se agrego `[salaNombre]="salaSeleccionada.nombreSala"` y `[fechaInicial]="filtroFecha"` al formulario.

4. **`formulario-reserva.ts`** -- Nuevos `@Input() salaNombre` y `@Input() fechaInicial`. `ngOnInit` precarga la fecha y dispara `cargarHorarios()` automaticamente si ambos valores existen.

5. **`formulario-reserva.html`** -- Muestra "Reservando: **Nombre Sala**" en lugar de "Reservando sala ID: X".

6. **`Sala.java`** -- Se agrego `@JsonIgnoreProperties("salas")` en el campo `edificio` para romper la recursion infinita `Sala ↔ Edificio`. Sin esto, GET /api/salas lanzaba StackOverflowError y no se mostraban todas las salas.

7. **`Estudiante.java`** -- Se agrego `@JsonIgnoreProperties("estudiantes")` en el campo `carrera` para romper la recursion infinita `Estudiante ↔ Carrera`. Sin esto, la busqueda de estudiantes en el autocomplete podia fallar.

8. **`app.html` y `formulario-reserva.html`** -- Se agrego `[min]="hoy"` y `[attr.min]="hoyMin"` respectivamente en los inputs de tipo date para evitar seleccionar fechas pasadas desde el calendario nativo del navegador.

---

## Issue 15: [Sprint 5] Listado de reservas por sala (RF04)

**Estado:** Completado ✅

### Archivos Creados

1. **`frontend/src/app/components/listado-reservas/listado-reservas.ts` (Creado):**
   - Componente standalone que importa `CommonModule`.
   - `@Input() idSala`, `@Input() salaNombre`, `@Input() fecha` -- reciben la sala y la fecha consultadas desde `App`.
   - `@Output() cerrar` -- notifica al padre para cerrar el panel.
   - `ngOnChanges`: cada vez que cambia `idSala` o `fecha` (con ambos valores presentes) dispara `cargarReservas()`.
   - `cargarReservas()`: consume `ReservaService.getReservasPorSalaYFecha(idSala, fecha)` y guarda el resultado en `reservas: Reserva[]`.

2. **`frontend/src/app/components/listado-reservas/listado-reservas.html` (Creado):**
   - Modal con overlay semitransparente (mismo patron que `formulario-reserva`).
   - Header con nombre de la sala, fecha consultada y boton cerrar con SVG en linea.
   - Contador dinamico "Reservas realizadas: **N**" enlazado a `reservas.length`.
   - Tabla con columnas Sala, Nº Reserva, Inicio, Fin y Estado (badge de color segun `Confirmada`/`Cancelada`).
   - Mensajes de estado: "Cargando reservas..." y "No hay reservas registradas para esta sala en la fecha seleccionada."

3. **`frontend/src/app/components/listado-reservas/listado-reservas.scss` (Creado):**
   - Overlay y modal reutilizando las variables CSS del proyecto (`--bg-card`, `--shadow-float`, `--border-color`, etc.).
   - Tabla con `border-collapse`, encabezados en mayusculas y hover por fila.
   - Badges de estado con colores semanticos (verde para Confirmada, rojo para Cancelada).
   - Media query para reducir el padding y el tamaño de fuente de la tabla en movil (<768px).

### Archivos Modificados

4. **`frontend/src/app/components/tarjeta-sala/tarjeta-sala.ts` y `.html` (Modificado):**
   - Se agrego `@Output() verReservas = new EventEmitter<number>()`.
   - Se agrego un segundo boton "Ver reservas" junto al boton "Reservar", agrupados en `.sala-acciones` (Flexbox).

5. **`frontend/src/app/components/tarjeta-sala/tarjeta-sala.scss` (Modificado):**
   - Se reemplazo el estilo unico `.btn-reservar` por estilos compartidos para ambos botones (`flex: 1` para repartir el ancho) y un estilo secundario `.btn-ver-reservas` con borde neutro.

6. **`frontend/src/app/app.ts` (Modificado):**
   - Se importo `ListadoReservasComponent`.
   - Se agrego `salaParaListado: Sala | null = null`.
   - `onVerReservas(idSala)`: busca la sala en `this.salas` y la asigna a `salaParaListado` (abre el panel).
   - `onCerrarListado()`: limpia `salaParaListado` (cierra el panel).

7. **`frontend/src/app/app.html` (Modificado):**
   - Se agrego `(verReservas)="onVerReservas($event)"` a `<app-tarjeta-sala>`.
   - Se agrego `<app-listado-reservas>` con `*ngIf="salaParaListado"`, pasando `idSala`, `salaNombre` y `fecha` (reutilizando `filtroFecha` del filtro de Issue 13).

### Logica y Contexto
- **Reutilizacion de servicios:** El panel consume directamente `ReservaService.getReservasPorSalaYFecha(idSala, fecha)`, creado en Issue 9, sin necesidad de logica adicional en el servicio.
- **Activacion por sala + fecha:** El boton "Ver reservas" de cada `TarjetaSalaComponent` abre el panel para esa sala, usando la fecha ya seleccionada en el filtro global (`filtroFecha`). Si el usuario cambia la fecha mientras el panel esta abierto, `ngOnChanges` vuelve a consultar la API automaticamente.
- **Contador dinamico:** "Reservas realizadas: N" se calcula directamente desde `reservas.length`, sin estado adicional, garantizando que siempre refleje el resultado mas reciente de la API.
- **Consistencia visual:** El panel reutiliza el patron de modal con overlay de `formulario-reserva` (mismas variables CSS y estructura), manteniendo coherencia visual entre ambos paneles flotantes del sistema.

