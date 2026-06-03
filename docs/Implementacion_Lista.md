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
