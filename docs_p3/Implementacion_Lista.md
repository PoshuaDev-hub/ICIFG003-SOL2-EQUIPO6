# Registro de Implementación de Issues - Proyecto 3

---

## Issue 1: [Gestión] Reasignación de roles, respaldo, taggeo y estructura de ramas Git

**Estado:** Completado ✅

### Archivos Modificados / Creados
- (solo git operations)

### Lógica y Contexto
- **Tag `v2.0-solemne2`** creado en el commit HEAD (`bff4b9c`) y subido a GitHub. Sirve como punto de respaldo (REQ1) del estado final del Solemne 2 antes de comenzar cambios del Proyecto 3 (REQ2). Un tag es una marca en el historial de git que permite volver a este punto exacto en el futuro.
- **Rama `DEV`** creada desde `main` para desarrollo rápido de cambios (REQ3).
- **Rama `QA`** creada desde `main` para pruebas de integración (REQ3). La versión final revisada se entrega desde QA.
- Roles reasignados según experticia en `docs_p3/KANBAN_REQ.md` (REQ0).

---

## Issue 2: [Arquitectura] Dockerizar la aplicación completa localmente

**Estado:** Completado ✅

### Archivos Modificados / Creados
- `backend/Dockerfile` — Multi-stage: compila con Maven, ejecuta con JRE 17
- `frontend/Dockerfile` — Multi-stage: compila Angular con Node 22, sirve con Nginx
- `frontend/nginx.conf` — Proxy reverso para redirigir `/api/` al backend
- `docker-compose.yml` — Orquestación de 3 servicios (db, backend, frontend)

### Lógica y Contexto
- **docker-compose.yml** define 3 servicios:
  - `db`: MySQL 8.0 con persistencia en volumen, healthcheck para esperar a que esté listo
  - `backend`: Spring Boot que espera a db vía `depends_on: condition: service_healthy`
  - `frontend`: Angular servido por Nginx en puerto 4200, proxy `/api/` hacia backend
- Comandos: `docker compose up` inicia todo, `docker compose down` detiene todo (REQ14, REQ15)

---

## Issue 3: [Backend] Migración de conexión de Base de Datos a MySQL

**Estado:** Completado ✅

### Archivos Modificados / Creados
- `backend/pom.xml` — Reemplazado driver PostgreSQL por MySQL (`mysql-connector-j`)
- `backend/src/main/resources/application.properties` — Cambiada URL JDBC, credenciales, dialecto Hibernate

### Lógica y Contexto
- Se eliminó dependencia `postgresql` y se agregó `mysql-connector-j`
- URL apunta a `jdbc:mysql://localhost:3306/reserva_salas_db?createDatabaseIfNotExist=true...`
- Dialecto configurado a `org.hibernate.dialect.MySQLDialect`

---

## Issue 4: [Backend] Generación Automática de DDL por Hibernate

**Estado:** Completado ✅

### Archivos Modificados / Creados
- `backend/src/main/resources/application.properties` — `spring.jpa.hibernate.ddl-auto=update`

### Lógica y Contexto
- Con `ddl-auto=update`, Hibernate crea las tablas automáticamente desde las entidades JPA al arrancar el backend (REQ5, REQ7)
- Ya no se necesita ejecutar `01_schema.sql` manualmente
- Las tablas se crean con tipos compatibles con MySQL

---

## Issue 5: [Backend] Poblado de Datos Base Automático con data.sql

**Estado:** Completado ✅

### Archivos Modificados / Creados
- `backend/src/main/resources/data.sql` — Seed data en formato MySQL

### Lógica y Contexto
- Archivo `data.sql` con inserts de datos de prueba: carreras, edificios, salas, estados, estudiantes, horarios, reservas y credenciales
- Se usa `INSERT IGNORE` para evitar duplicados en reinicios
- Configurado `spring.sql.init.mode=always` y `spring.jpa.defer-datasource-initialization=true` para que se ejecute después de que Hibernate cree las tablas

---

## Issue 6: [Backend] Implementación de Logger en Archivo de Log

**Estado:** Completado ✅

### Archivos Modificados / Creados
- `backend/src/main/resources/application.properties` — `logging.file.name=logs/backend.log`
- `controllers/AuthController.java` — Agregado `@Slf4j` y logs en login
- `controllers/ReservaController.java` — Agregados logs en listar, crear y cancelar
- `controllers/EstudianteController.java` — Agregados logs en crear estudiante
- `controllers/SalaController.java` — Agregado log en listar salas
- `controllers/HorarioController.java` — Agregado log en listar horarios

### Lógica y Contexto
- Logger SLF4J con anotación `@Slf4j` de Lombok en controladores
- Los mensajes se escriben en `logs/backend.log` con formato: fecha, nivel, clase
- Se registran: intentos de login, creación de reservas, cancelaciones, consultas

---

## Issue 7: [Frontend] Robustecer Validaciones y Mensajes de Información

**Estado:** Completado ✅
**Responsable:** Lucas

### Archivos Modificados / Creados
* `frontend/src/app/components/formulario-reserva/formulario-reserva.ts`
* `frontend/src/app/components/formulario-reserva/formulario-reserva.html`
* `frontend/src/app/components/formulario-reserva/formulario-reserva.scss`

### Lógica y Contexto
Se reforzaron las validaciones del formulario reactivo de reservas/registro (REQ12): validación del
dígito verificador del RUT (módulo 11) mediante `rutDvValidator`; nombre/apellido sin espacios vacíos
(`noSoloEspacios`); teléfono con patrón `^\+?\d{8,12}$`; observaciones con mínimo 15 caracteres solo si
se escriben (`minLengthSiPresente`). Los inputs inválidos reciben la clase `.invalid` (borde rojo) con
mensajes de ayuda legibles. Los errores del backend se traducen en `mensajeDeError()`, que prioriza el
mensaje de la API y cubre los códigos `400`, `404`, `409` y `0` (sin conexión).

---

## Issue 8: [Frontend] Optimizar Usabilidad y Reducir Datos Innecesarios

**Estado:** Completado ✅
**Responsable:** Lucas

### Archivos Modificados / Creados
* `frontend/src/app/services/estudiante.service.ts`
* `frontend/src/app/components/formulario-reserva/formulario-reserva.ts`
* `frontend/src/app/components/formulario-reserva/formulario-reserva.html`
* `frontend/src/app/components/formulario-reserva/formulario-reserva.scss`

### Lógica y Contexto
Se optimizó el flujo de creación de reservas para no pedir datos deducibles (REQ13): correo institucional
automático `rut@usm.cl` mediante `deducirCorreoInstitucional()` (el campo correo se ocultó y se muestra como
dato de solo lectura); autollenado de nombre/apellido buscando por RUT mientras el usuario escribe, con
`debounceTime(450)` + `distinctUntilChanged()`; y fecha de hoy por defecto en el datepicker. La suscripción
del buscador se limpia en `ngOnDestroy`.

---

## Issue 9: [QA / Testing] Pruebas en Frontend con Backend Detenido

**Estado:** Pendiente ⏳

---

## Issue 10: [Backend / DB] Ingeniería Inversa y Generación de Diagrama MER

**Estado:** Pendiente ⏳

---

## Issue 11: [Gestión] Integración Final, Verificación de Persistencia y Cierre de Entrega

**Estado:** Pendiente ⏳
