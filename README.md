# Sistema de Reserva de Salas — ICIFG003 Equipo 6

> Sistema web para reservar salas de estudio en una biblioteca universitaria.
> **Spring Boot 3.2.5** (Backend) + **Angular 21** (Frontend) + **MySQL 8.0** (Base de datos) + **Docker Compose** (Contenedores).

---

## Inicio Rápido con Docker 

```bash

git clone https://github.com/ufromero/ICIFG003-SOL2-EQUIPO6.git
cd ICIFG003-SOL2-EQUIPO6
git checkout QA

docker compose up -d #Levanta los 3 servicios
docker compose stop backend #Detiene solo el backend
docker compose down #Detiene los 3 servicios

#En MySQL Workbench:
Connection Name: Reserva Salas Docker
Port: 3307
Default Schema (Opcional): reserva_salas_db

select * from estudiante;

```

### Salas
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/salas` | Lista todas las salas |
| GET | `/api/salas?capacidad=N` | Filtra salas por capacidad mínima |
| GET | `/api/salas/{id}` | Obtiene una sala por ID |
| POST | `/api/salas` | Crea una nueva sala |
| PUT | `/api/salas/{id}` | Actualiza una sala |
| DELETE | `/api/salas/{id}` | Elimina una sala |

### Estudiantes
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estudiantes` | Lista todos los estudiantes |
| GET | `/api/estudiantes/{id}` | Obtiene un estudiante por ID |
| GET | `/api/estudiantes/ranking` | Obtiene el ranking de estudiantes con cantidad de reservas |
| GET | `/api/estudiantes/buscar/rut?rut=XX` | Busca estudiante por RUT exacto |
| GET | `/api/estudiantes/buscar?q=XX` | Busca estudiantes por nombre, apellido o RUT |
| POST | `/api/estudiantes` | Crea un nuevo estudiante |

### Horarios
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/horarios?sala=N` | Lista horarios de una sala |
| GET | `/api/horarios/disponibles?sala=N&fecha=YYYY-MM-DD` | Horarios libres de una sala en una fecha |

### Reservas
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/reservas` | Lista todas las reservas |
| GET | `/api/reservas?sala=N&fecha=YYYY-MM-DD` | Reservas de una sala en una fecha |
| GET | `/api/reservas/mis-reservas?rut=XX` | Obtiene las reservas de un estudiante por su RUT |
| POST | `/api/reservas` | Crea una reserva (valida solapes, límites, etc.) |

---
