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

---

## 7. Implementar queries objetales (JPQL) y nativas (Issue 7)
**Objetivo:** Desarrollar las consultas específicas necesarias para soportar los requerimientos avanzados del frontend (filtrado y cruce de datos).

### Archivos Afectados
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

## 10. Página principal: Layout CSS Grid y Semántica HTML (Issue 10)
**Objetivo:** Crear la estructura y diseño general de la página principal según normativas HTML5, CSS Grid y dotar de un diseño premium responsivo a la aplicación.

### Archivos Afectados
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
