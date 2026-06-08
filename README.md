# Sistema de Reserva de Salas — ICIFG003 Equipo 6

> Sistema web para reservar salas de estudio en una biblioteca universitaria.
> **Spring Boot 3.2.5** (Backend) + **Angular 21** (Frontend) + **PostgreSQL** (Base de datos).

---

## 🚀 Inicio Rápido (TL;DR)

> **Sigue este orden exacto. Si saltas un paso, el sistema no arrancará.**

### Paso 0 — Requisitos mínimos instalados
| Herramienta | Versión mínima | Verificar con |
|---|---|---|
| Java | 17 | `java -version` |
| Node.js | 20 | `node -v` |
| npm | 10 | `npm -v` |
| PostgreSQL | 13 | `psql --version` |

---

### Paso 1 — Crear la base de datos

Crea un usuario en PostgreSQL:

```bash
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD '1234';"
sudo -u postgres psql -c "ALTER USER postgres WITH SUPERUSER;"
```

Crea la base de datos:

```bash
sudo -u postgres psql -c "CREATE DATABASE reserva_salas_db OWNER postgres;"
```

Carga el esquema y los datos de prueba:

```bash
PGPASSWORD=1234 psql -U postgres -h localhost -d reserva_salas_db -f database/01_schema.sql

PGPASSWORD=1234 psql -U postgres -h localhost -d reserva_salas_db -f database/02_seed.sql
```

El archivo `02_seed.sql` inserta: 4 carreras, 2 edificios, 6 salas, 2 estados de reserva, 6 estudiantes, 30 horarios (5 por sala) y 10 reservas iniciales.

---

### Paso 2 — Verificar las credenciales del backend

Abre `backend/src/main/resources/application.properties` y confirma que coincidan con las credenciales que creaste:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/reserva_salas_db
spring.datasource.username=postgres
spring.datasource.password=1234
```

---

### Paso 3 — Instalar dependencias

```bash
# En la RAÍZ del proyecto (instala 'concurrently')
npm install

# En la carpeta FRONTEND (instala Angular y sus módulos)
cd frontend
npm install
cd ..
```

---

### Paso 4 — Levantar todo el sistema

```bash
# Desde la RAÍZ del proyecto (levanta backend + frontend simultáneamente)
npm run dev
```

| URL | Descripción |
|---|---|
| `http://localhost:4200` | Aplicación Angular (Frontend) |
| `http://localhost:8080/api` | API REST Spring Boot (Backend) |

---

## 📁 Estructura del Proyecto

```
/
├── backend/                  # API REST — Spring Boot
│   ├── src/main/java/        # Código fuente Java (controllers, services, models...)
│   ├── src/main/resources/   # application.properties (credenciales BD)
│   └── pom.xml               # Dependencias Maven
│
├── frontend/                 # SPA — Angular 21
│   ├── src/app/
│   │   ├── components/       # Componentes reutilizables (tarjeta-sala, menu-nav, mensaje)
│   │   ├── services/         # Servicios HTTP (sala, estudiante, reserva)
│   │   ├── interfaces/       # Tipos TypeScript (Sala, Horario, Reserva, Estudiante...)
│   │   └── environments/     # URL base del backend
│   └── package.json
│
├── database/
│   ├── 01_schema.sql         # DDL — Crea las 7 tablas del MER
│   └── 02_seed.sql           # Datos de prueba (6 salas, 6 estudiantes, 30 horarios...)
│
├── docs/
│   ├── KANBAN_ISSUES.md      # Tablero de Issues con estado de cada tarea
│   ├── Implementacion_Lista.md # Registro técnico detallado de cada Issue completado
│   ├── ESPECIFICACIONES_SOLEMNE2.md
│   └── SOLEMNE2_ICIFG003_SEC2.md
│
└── package.json              # Script raíz con 'npm run dev' para levantar todo
```

---

## 🔌 Endpoints de la API

### Salas
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/salas` | Lista todas las salas |
| GET | `/api/salas?capacidad=N` | Filtra salas por capacidad mínima (RF03) |
| GET | `/api/salas/{id}` | Obtiene una sala por ID |
| POST | `/api/salas` | Crea una nueva sala |
| PUT | `/api/salas/{id}` | Actualiza una sala |
| DELETE | `/api/salas/{id}` | Elimina una sala |

### Estudiantes
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estudiantes` | Lista todos los estudiantes |
| GET | `/api/estudiantes/{id}` | Obtiene un estudiante por ID |
| GET | `/api/estudiantes/ranking` | Obtiene el ranking de estudiantes con cantidad de reservas (Query Nativa) (RF05/Issue 7) |
| GET | `/api/estudiantes/buscar/rut?rut=XX` | Busca estudiante por RUT exacto |
| GET | `/api/estudiantes/buscar?q=XX` | Busca estudiantes por nombre, apellido o RUT |
| POST | `/api/estudiantes` | Crea un nuevo estudiante |

### Horarios
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/horarios?sala=N` | Lista horarios de una sala (RF05) |
| GET | `/api/horarios/disponibles?sala=N&fecha=YYYY-MM-DD` | Horarios libres de una sala en una fecha (RF05) |

### Reservas
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/reservas` | Lista todas las reservas |
| GET | `/api/reservas?sala=N&fecha=YYYY-MM-DD` | Reservas de una sala en una fecha (RF04) |
| GET | `/api/reservas/mis-reservas?rut=XX` | Obtiene las reservas asociadas a un estudiante por su RUT |
| POST | `/api/reservas` | Crea una reserva (con validaciones RF05) |

---

## 🌐 Vista del Frontend

| Sección | Descripción |
|---|---|
| **Navbar** | Logo + menú responsivo con hamburguesa en móvil. Se comprime al hacer scroll. |
| **Carrusel Hero** | Imágenes de biblioteca con transición automática cada 10s. |
| **Filtros** | Selector de capacidad mínima + datepicker de fecha. |
| **Tarjetas de Salas** | Datos reales desde la BD. Se filtran dinámicamente sin recargar la página. |
| **Panel Lateral (Aside)** | Normativa de la biblioteca. |
| **Footer** | Pie de página con enlaces. |
| **Floater** | Botón de contacto y horarios de atención. |

**Breakpoints responsive:**
- 🖥️ **Escritorio** (>1024px): grid 2 columnas (main + aside)
- 📱 **Tablet** (768–1023px): aside más compacto
- 📲 **Móvil** (<768px): 1 columna, menú hamburguesa

---

## 👥 Integrantes — Equipo 6

| Nombre | Responsabilidades |
|---|---|
| **Joshua** | Backend (Issues 1, 7), Frontend (Issues 10, 13) |
| **Subaru** | Backend (Issues 2, 8), Frontend (Issue 11) |
| **Lucas** | Base de Datos (Issue 3), Frontend (Issues 9, 12) |
| **Victor** | Backend (Issues 4, 5, 6) |
