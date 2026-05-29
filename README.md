# Sistema de Reservas - EQUIPO 6

Este proyecto es un sistema de reservas desarrollado con una arquitectura desacoplada, utilizando **Spring Boot** para el backend y **Angular** para el frontend.

## Estructura del Proyecto

La estructura de directorios está organizada de la siguiente forma:

- **/backend**: Código fuente del backend implementado con Spring Boot (Java 17) y Maven.
- **/frontend**: Código fuente del frontend implementado con Angular.
- **/database**: Contiene los scripts SQL de inicialización y migración para PostgreSQL.
- **/docs**: Documentación técnica, diagramas y otros recursos.

---

## Tecnologías

### Backend
- **Java**: 17
- **Spring Boot**: 4.0.6
- **Maven**: (Uso de Maven Wrapper)
- **Base de Datos**: PostgreSQL

### Frontend
- **Node.js**: 22.x
- **Angular CLI**: 21.2.7

---

## Integrantes - Equipo 6

* Desarrollador Backend
* Desarrollador Frontend
* Administrador de Base de Datos
* Analista de Sistemas

---

## Instrucciones de ejecución local

### 1. Requisitos previos
- JDK 17 instalado.
- Node.js (22+) y npm.
- Servidor PostgreSQL instalado y en ejecución.

### 2. Configuración de Base de Datos
1. Crea una base de datos llamada `reservas_db` en PostgreSQL.
2. Ejecuta los scripts ubicados en `/database`.

### 3. Ejecutar el Backend
1. Navega a `/backend`.
2. Edita `src/main/resources/application.properties` con tus credenciales:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/reservas_db
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña
   ```
3. Ejecuta con: `.\mvnw.cmd spring-boot:run`

### 4. Ejecutar el Frontend
1. Navega a `/frontend`.
2. Ejecuta: `npm start`
3. Accede desde tu navegador a `http://localhost:4200`.
