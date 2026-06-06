# Sistema de Reserva de Salas — EQUIPO 6

Sistema web para reservar salas de estudio en una biblioteca universitaria.
Backend con **Spring Boot 3.2.5** + **PostgreSQL** y frontend con **Angular 21**.

---

## Tecnologías y Versiones

### Backend
| Herramienta | Versión |
|---|---|
| Java | 17+ |
| Spring Boot | 3.2.5 |
| Maven | (wrapper incluido) |
| PostgreSQL | 13+ |

### Frontend
| Herramienta | Versión |
|---|---|
| Node.js | 20.x o 22.x |
| npm | 10+ |
| Angular CLI | 21.2.7 |

---

## Estructura del Proyecto

```
/
├── backend/              # Spring Boot (API REST)
│   ├── src/main/java/    # Código fuente Java
│   └── pom.xml           # Dependencias Maven
├── frontend/             # Angular (SPA)
│   ├── src/app/          # Componentes, servicios, interfaces
│   └── package.json
├── database/             # Scripts SQL
│   ├── 01_schema.sql     # DDL (creación de tablas)
│   └── 02_seed.sql       # Datos de prueba
├── docs/                 # Documentación del proyecto
└── package.json          # Script raíz (inicio simultáneo)
```

---

## Guía de Instalación y Ejecución

### 1. Requisitos Previos

Instalar en el sistema:

```bash
# Java 17+
sudo apt install openjdk-17-jdk

# PostgreSQL
sudo apt install postgresql postgresql-client

# Node.js y npm (vía nvm recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
```

Verificar versiones:

```bash
java -version            # >= 17
node -v                  # >= 20
npm -v                   # >= 10
psql --version           # >= 13
```

### 2. Crear Base de Datos

```bash
# Iniciar PostgreSQL si no está corriendo
sudo systemctl start postgresql

# Crear la base de datos
psql -U postgres -h localhost -c "CREATE DATABASE reserva_salas_db;"

# Ejecutar schema (tablas)
psql -U postgres -h localhost -d reserva_salas_db -f database/01_schema.sql

# Ejecutar seed (datos de prueba)
psql -U postgres -h localhost -d reserva_salas_db -f database/02_seed.sql
```

> Si tu usuario de PostgreSQL tiene contraseña, usa `PGPASSWORD=tuclave` al inicio:
> `PGPASSWORD=1234 psql -U postgres -h localhost ...`

### 3. Configurar Backend

Editar `backend/src/main/resources/application.properties` con tus credenciales:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/reserva_salas_db
spring.datasource.username=postgres
spring.datasource.password=1234
```

El backend usa `hibernate.ddl-auto=validate`, por lo que las tablas deben crearse
previamente con el script `01_schema.sql`.

### 4. Ejecutar Backend

```bash
cd backend
chmod +x mvnw          # solo primera vez
./mvnw spring-boot:run
```

La API queda disponible en `http://localhost:8080/api/`.

Endpoints disponibles:
- `GET /api/reservas` — lista todas las reservas
- `POST /api/reservas` — crear una nueva reserva (con validaciones)

### 5. Ejecutar Frontend

```bash
cd frontend
npm install
npx ng serve
```

Abrir en el navegador: `http://localhost:4200`

### 6. Ejecutar ambos a la vez (opcional)

```bash
npm install            # instalar dependencias raíz
npm run dev            # levanta backend + frontend simultáneamente
```

---

## Vista del Frontend

Al abrir `http://localhost:4200` se ve:

| Elemento | Descripción |
|---|---|
| **Navbar** | Logo "Biblioteca Central" + menú (Inicio, Reservar Salas, Mis Reservas). Se vuelve más delgado al hacer scroll. |
| **Carrusel Hero** | 3 imágenes de bibliotecas con fade automático cada 10s. Flechas para navegar y puntos indicadores. |
| **Salas Disponibles** | Sección con tarjetas de salas (actualmente datos estáticos de ejemplo). |
| **Aside** | Panel lateral con normativas de la biblioteca. |
| **Footer** | Pie de página con enlaces. |
| **Floater** | Botón redondo en esquina inferior derecha para contacto y horarios. |

El layout es responsive:
- **Escritorio** (>1024px): grid de 2 columnas (main + aside)
- **Tablet** (768-1023px): aside más angosto
- **Móvil** (<768px): todo en 1 columna, menú vertical

---

## Scripts de Base de Datos

| Script | Propósito |
|---|---|
| `database/01_schema.sql` | Crea 7 tablas: CARRERA, ESTUDIANTE, EDIFICIO, SALA, HORARIO_DISPONIBLE, ESTADO_RESERVA, RESERVA con PKs, FKs y restricciones. |
| `database/02_seed.sql` | Pobla con datos de prueba: 4 carreras, 2 edificios, 6 salas, 6 estudiantes, 30 horarios, 2 estados y 10 reservas. |

---

## Integrantes — Equipo 6

| Nombre | Rol |
|---|---|
| Joshua | Backend + Frontend |
| Subaru | Backend + Documentación |
| Lucas | Base de Datos |
| Victor | Backend |
