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

## Issue 4: [Sprint 2] Implementar arquitectura de tres capas, DTOs y mapeo de entidades

**Estado:** Completado ✅

### Archivos Modificados / Creados
1. **`backend/src/main/java/com/equipo6/reservas/models/*` (Creados):**
   - Se crearon las 7 entidades que representan el MER: `Carrera`, `Edificio`, `Sala`, `Estudiante`, `HorarioDisponible`, `EstadoReserva` y `Reserva`.
   - Se implementó JPA (`@Entity`, `@Table`, `@ManyToOne`, `@OneToMany`, `@JoinColumn`) respetando la cardinalidad estricta (1:N y M:N).
   - Se integró Lombok (`@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`) para optimizar el código y reducir el *boilerplate* (getters, setters y constructores).

2. **`backend/src/main/java/com/equipo6/reservas/repositories/*` (Creados):**
   - Se crearon las interfaces correspondientes para cada entidad extendiendo de `JpaRepository` para la interacción directa con PostgreSQL.

3. **`backend/src/main/java/com/equipo6/reservas/dtos/ReservaDTO.java` (Creado):**
   - Se implementó el patrón DTO (Data Transfer Object) para la entidad transaccional principal (`Reserva`), asegurando que solo se transfieran los IDs de las relaciones (estudiante, sala, horario, estado) en lugar de exponer los objetos completos de la base de datos hacia la API.

4. **`backend/src/main/java/com/equipo6/reservas/services/ReservaService.java` (Creado):**
   - Se encapsuló la lógica de negocio. Se encarga de la transformación de datos (Entity ↔ DTO) y de gestionar la recuperación de las entidades relacionadas a través de los repositorios antes de persistir una nueva reserva.

5. **`backend/src/main/java/com/equipo6/reservas/controllers/ReservaController.java` (Creado):**
   - Se creó el controlador REST (`@RestController`, `@RequestMapping("/api/reservas")`) con los endpoints iniciales (GET y POST) para interactuar con el frontend.

6. **`backend/src/main/java/com/equipo6/reservas/config/CorsConfig.java` (Creado):**
   - Se implementó `WebMvcConfigurer` para establecer una configuración global de CORS, habilitando explícitamente el origen `http://localhost:4200` y los métodos HTTP requeridos para el consumo desde Angular.

### Lógica y Contexto
- **Mapeo Relacional Estratégico:** La relación M:N original de las reservas se modeló correctamente promoviendo la tabla intermedia a una Entidad JPA independiente (`Reserva`). Esto permite alojar los atributos propios de la relación (`observacion`, `fecha_reserva`, `fecha_creacion`) sin romper las reglas de persistencia de Hibernate.
- **Seguridad y Desacoplamiento (DTOs):** Al usar DTOs, la capa de presentación (Controller) se aísla completamente del diseño de la base de datos (Entity). Esto previene bucles infinitos en la serialización JSON (problema común en relaciones bidireccionales de JPA) y protege la integridad del esquema validado en el Issue 1.
- **Preparación para la Integración:** La configuración global de CORS centraliza las políticas de seguridad, evitando la necesidad de usar anotaciones `@CrossOrigin` repetitivas en cada controlador futuro y garantizando una comunicación fluida con la capa frontend desarrollada por el equipo.
