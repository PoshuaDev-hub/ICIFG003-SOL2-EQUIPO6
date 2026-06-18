# Issues para GitHub Kanban - Proyecto 3 - Equipo 6

Instrucciones: Crea un "Issue" nuevo en GitHub por cada uno de los bloques a continuación. Copia el título en el campo del título del issue, y todo el texto desde "### Descripción" hacia abajo en la descripción del issue. Luego, asígnalo al responsable indicado.

---

## Roles Asignados (REQ0)

De acuerdo a la experticia de cada integrante del equipo, se han reasignado los siguientes roles principales para el desarrollo del Proyecto 3:

*   **Subaru:** Especialista en DevOps, Arquitectura de Despliegue y Gestión Git.
*   **Joshua:** Especialista en Backend y Modelado/Migración de Bases de Datos.
*   **Lucas:** Especialista en Frontend, Interfaces de Usuario y UI/UX.
*   **Victor:** Especialista en QA, Automatización de Pruebas, Integración y Documentación Técnica.

---

## Issue 1
**Título:** [Gestión] Reasignación de roles, respaldo, taggeo y estructura de ramas Git (REQ0, REQ1, REQ2, REQ3, REQ4)
**Asignado a:** Subaru
**Etiquetas sugeridas:** `gestión`, `git`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Establecer la base del repositorio para el Proyecto 3, resguardando la entrega del Solemne 2 e implementando el flujo de ramas requerido.

**Tareas a realizar:**
- [ ] Documentar formalmente la reasignación de roles del equipo (REQ0).
- [ ] Realizar un respaldo físico/digital del estado del repositorio Git tras finalizar el Solemne 2 (REQ1).
- [ ] Crear el tag `v2.0-solemne2` en el commit correspondiente a la entrega final de la unidad anterior y subirlo a GitHub (REQ2).
- [ ] Crear las ramas de trabajo `DEV` (para desarrollo rápido) y `QA` (para pruebas de integración y compilación final estable) (REQ3).
- [ ] Demostrar el uso y flujo entre ambas ramas, asegurando que la versión final integrada para revisión se clone desde la rama `QA`.
- [ ] Inicializar y mantener actualizado el tablero Kanban de GitHub para el seguimiento de actividades (REQ4).

---

## Issue 2
**Título:** [Arquitectura] Dockerizar la aplicación completa localmente (REQ14, REQ15)
**Asignado a:** Subaru
**Etiquetas sugeridas:** `arquitectura`, `docker`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Configurar la infraestructura del proyecto para que pueda ser ejecutada en contenedores Docker mediante una sola instrucción de orquestación.

**Tareas a realizar:**
- [ ] Crear el archivo `Dockerfile` para empaquetar y ejecutar la aplicación del backend (Spring Boot).
- [ ] Crear el archivo `Dockerfile` para compilar y servir la aplicación del frontend (Angular).
- [ ] Crear el archivo `docker-compose.yml` en la raíz del proyecto para levantar el ecosistema completo (REQ14):
    - **Servicio `db`:** Base de datos MySQL 8.0 (configurar variables de entorno para usuario/password, exponer puerto 3306 y usar volúmenes para persistencia de datos).
    - **Servicio `backend`:** Aplicación Spring Boot (esperar a que el servicio `db` esté listo, enlazar credenciales mediante variables de entorno y exponer el puerto 8080).
    - **Servicio `frontend`:** Aplicación Angular (exponer el puerto 4200 y conectar al endpoint del backend).
- [ ] Probar el control del ciclo de vida de los contenedores utilizando Docker Compose (`docker compose up` y `docker compose down`), garantizando que los servicios inicien y se detengan limpiamente mediante composer (REQ15).

---

## Issue 3
**Título:** [Backend] Migración de conexión de Base de Datos a MySQL (REQ6)
**Asignado a:** Joshua
**Etiquetas sugeridas:** `backend`, `database`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Adaptar el backend desarrollado en Spring Boot para que interactúe con el motor de base de datos MySQL en lugar de PostgreSQL.

**Tareas a realizar:**
- [ ] Reemplazar la dependencia del driver de PostgreSQL por la de MySQL (`mysql-connector-j`) en el archivo `backend/pom.xml`.
- [ ] Actualizar el archivo `backend/src/main/resources/application.properties` con los parámetros de conexión para MySQL (REQ6):
    - Configurar la URL JDBC (`jdbc:mysql://localhost:3306/reserva_salas_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`).
    - Configurar las credenciales (usuario y contraseña correspondientes a la base de datos).
    - Configurar el dialecto de JPA Hibernate para MySQL (`org.hibernate.dialect.MySQLDialect`).

---

## Issue 4
**Título:** [Backend] Generación Automática de DDL por Hibernate (REQ5, REQ7)
**Asignado a:** Joshua
**Etiquetas sugeridas:** `backend`, `database`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Configurar el backend para que la base de datos y todas sus tablas se autogeneren a partir del modelo de entidades JPA, eliminando la necesidad de scripts DDL manuales.

**Tareas a realizar:**
- [ ] Configurar en `application.properties` la propiedad de Hibernate `spring.jpa.hibernate.ddl-auto=update` o `create` para asegurar que las tablas se creen al ejecutar el backend sin que el equipo escriba archivos DDL manuales (REQ5, REQ7).
- [ ] Verificar y ajustar el mapeo de las entidades JPA existentes para evitar discrepancias de tipo de datos al migrar a MySQL (como tipos de datos, llaves foráneas y restricciones).
- [ ] Validar que al arrancar el backend con una base de datos MySQL vacía, Hibernate cree el esquema de tablas en su totalidad de manera automática.

---

## Issue 5
**Título:** [Backend] Poblado de Datos Base Automático con data.sql (REQ5)
**Asignado a:** Joshua
**Etiquetas sugeridas:** `backend`, `database`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Implementar la carga automatizada de datos iniciales en la base de datos MySQL al iniciar el servidor siguiendo los estándares de Spring Boot.

**Tareas a realizar:**
- [ ] Crear el archivo `backend/src/main/resources/data.sql` con las sentencias DML (`INSERT`) para poblar la base de datos con datos de prueba consistentes.
- [ ] Migrar el script seed anterior (`02_seed.sql`) a la sintaxis y tipos de MySQL.
- [ ] Configurar las propiedades en `application.properties` para diferir el inicio del datasource y garantizar que el script de datos se ejecute inmediatamente después de la creación automática de tablas por parte de Hibernate:
    - `spring.sql.init.mode=always`
    - `spring.jpa.defer-datasource-initialization=true`
- [ ] Validar que los registros iniciales se inserten sin errores y que las secuencias de autoincremento (IDs auto-generados por MySQL) queden configuradas correctamente.

---

## Issue 6
**Título:** [Backend] Implementación de Logger en Archivo de Log (REQ10)
**Asignado a:** Joshua
**Etiquetas sugeridas:** `backend`, `logging`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Implementar un sistema de registro de eventos (logging) en el backend que escriba los registros en un archivo local llamado `backend.log`.

**Tareas a realizar:**
- [ ] Configurar el sistema de logs en `backend/src/main/resources/application.properties` definiendo la ruta del archivo de log:
    - `logging.file.name=logs/backend.log` (o en la raíz del backend como `backend.log`).
    - Configurar los niveles de logging deseados (ej. `logging.level.com.equipo6.reservas=INFO`).
- [ ] Declarar e implementar el uso de `Logger` (SLF4J/LoggerFactory) o a través de la anotación `@Slf4j` de Lombok en controladores y servicios principales (`ReservaController`, `ReservaService`, `EstudianteService`).
- [ ] Agregar sentencias `logger.info("...")` descriptivas que registren el flujo del negocio y las llamadas a los endpoints (ej. creación de reservas, búsquedas, login o consultas).
- [ ] Confirmar que al realizar interacciones con la API se escriba y guarde la información de manera persistente en el archivo `backend.log`.

---

## Issue 7
**Título:** [Frontend] Robustecer Validaciones y Mensajes de Información (REQ12)
**Asignado a:** Lucas
**Etiquetas sugeridas:** `frontend`, `usability`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Mejorar las validaciones en todos los campos solicitados de la interfaz del frontend y asegurar una retroalimentación detallada y robusta al usuario en caso de error o éxito.

**Tareas a realizar:**
- [ ] Validar rigurosamente los campos del formulario reactivo de reservas (RUT con formato válido, Nombre/Apellido no vacíos, observaciones cuando corresponda).
- [ ] Implementar visualización clara en la interfaz cuando un campo es inválido (ej. bordes rojos en inputs y mensajes de ayuda legibles como "RUT requerido con formato 12345678-9").
- [ ] Capturar las respuestas de error estructuradas que provengan del backend (como códigos `400 Bad Request` o `409 Conflict` por horario ocupado) y presentarlas mediante el `MensajeComponent` de forma elegante y comprensible para el usuario final.

---

## Issue 8
**Título:** [Frontend] Optimizar Usabilidad y Reducir Datos Innecesarios (REQ13)
**Asignado a:** Lucas
**Etiquetas sugeridas:** `frontend`, `usability`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Modificar el flujo de interacción en el cliente para evitar solicitar información redundante y autocompletar o deducir datos implícitos.

**Tareas a realizar:**
- [ ] Configurar el sistema para deducir datos implícitos: por ejemplo, deducir automáticamente el correo electrónico institucional del estudiante en formato `rut@usm.cl` en base al RUT ingresado, sin requerir que el usuario lo escriba.
- [ ] Optimizar el flujo de creación de reservas: si el estudiante ya existe en la base de datos, cargar automáticamente su nombre y apellido en el formulario al ingresar el RUT, impidiendo que el usuario deba digitar campos ya registrados.
- [ ] Establecer la fecha actual del sistema como valor por defecto en los Datepickers de búsqueda y reserva para acelerar el proceso.

---

## Issue 9
**Título:** [QA / Testing] Pruebas en Frontend con Backend Detenido (REQ11)
**Asignado a:** Victor
**Etiquetas sugeridas:** `frontend`, `testing`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Desarrollar la resiliencia en el frontend para manejar caídas o falta de disponibilidad del servidor, entregando una experiencia de usuario controlada y profesional.

**Tareas a realizar:**
- [ ] Implementar un interceptor HTTP en Angular o extender el manejo de errores en los servicios para capturar errores de conexión (ej. `HttpErrorResponse` con `status: 0`).
- [ ] Diseñar y mostrar un mensaje visual de error ("Servidor Fuera de Línea", "No se pudo establecer conexión con el backend. Por favor, intente más tarde") en pantalla mediante `MensajeComponent` o un banner informativo persistente cuando ocurran estos errores.
- [ ] Detener el backend localmente de forma deliberada y validar que al intentar interactuar con la aplicación (listar salas, buscar reservas o enviar formularios) el frontend no colapse, sino que devuelva el mensaje controlado de fracaso de conexión (REQ11).
- [ ] Registrar y documentar las pruebas de comportamiento offline del frontend.

---

## Issue 10
**Título:** [Backend / DB] Ingeniería Inversa y Generación de Diagrama MER (REQ8)
**Asignado a:** Victor
**Etiquetas sugeridas:** `database`, `documentation`, `sprint-1`, `enhancement`

### Descripción
**Objetivo:** Generar el diagrama del Modelo Entidad-Relación (MER) a partir del esquema físico MySQL creado automáticamente por Hibernate, mediante la herramienta de ingeniería inversa de MySQL Workbench.

**Tareas a realizar:**
- [ ] Levantar la base de datos MySQL local del proyecto con las tablas creadas por Hibernate.
- [ ] Abrir MySQL Workbench y configurar una conexión a la base de datos local `reserva_salas_db`.
- [ ] Ejecutar el proceso de Ingeniería Inversa (Reverse Engineer) seleccionando el esquema del proyecto.
- [ ] Organizar de manera lógica y ordenada el diagrama físico resultante para asegurar una lectura fluida del MER.
- [ ] Exportar el diagrama obtenido en formato de imagen (.PNG) y PDF, y almacenarlo en la ruta `docs_p3/assets/` para que esté disponible para el equipo, la documentación final y la presentación del proyecto.

---

## Issue 11
**Título:** [Gestión] Integración Final, Verificación de Persistencia y Cierre de Entrega (REQ3, REQ9)
**Asignado a:** Victor
**Etiquetas sugeridas:** `gestión`, `testing`, `documentation`, `sprint-1`

### Descripción
**Objetivo:** Validar el funcionamiento del sistema completo integrado en Docker, asegurar la persistencia en MySQL y preparar los entregables finales de la presentación grupal.

**Tareas a realizar:**
- [ ] Integrar (merge) todos los avances en la rama `QA`, resolver posibles conflictos y verificar que el despliegue mediante Docker Compose funcione perfectamente.
- [ ] Realizar pruebas globales para garantizar que todas las operaciones del frontend (reserva de salas, consultas, registro automático de estudiantes) persistan de manera efectiva en la base de datos MySQL en el backend (REQ9).
- [ ] Completar la documentación en `docs_p3/Implementacion_Lista.md` actualizando el estado de todos los Issues a Completado ✅, detallando los archivos modificados y la lógica agregada.
- [ ] Diseñar y armar la presentación grupal (formato PowerPoint) conteniendo las 5 secciones obligatorias: Gestión de Proyecto, Arquitectura, Backend, Frontend y Conclusiones, asignando la defensa de cada bloque de acuerdo al expertise y rol de cada integrante (REQ0).
