-- Script de DDL actualizado según MER especificado
DROP TABLE IF EXISTS RESERVA;
DROP TABLE IF EXISTS CREDENCIAL;
DROP TABLE IF EXISTS HORARIO_DISPONIBLE;
DROP TABLE IF EXISTS SALA;
DROP TABLE IF EXISTS ESTUDIANTE;
DROP TABLE IF EXISTS ESTADO_RESERVA;
DROP TABLE IF EXISTS EDIFICIO;
DROP TABLE IF EXISTS CARRERA;

CREATE TABLE CARRERA (
    id SERIAL PRIMARY KEY,
    nombre_carrera VARCHAR(100) NOT NULL,
    facultad VARCHAR(100) NOT NULL
);

CREATE TABLE ESTUDIANTE (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_registro DATE NOT NULL,
    id_carrera INT REFERENCES CARRERA(id)
);

CREATE TABLE EDIFICIO (
    id SERIAL PRIMARY KEY,
    nombre_edificio VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL
);

CREATE TABLE SALA (
    id SERIAL PRIMARY KEY,
    codigo_sala VARCHAR(20) UNIQUE NOT NULL,
    nombre_sala VARCHAR(100) NOT NULL,
    capacidad INT NOT NULL,
    piso INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    id_edificio INT REFERENCES EDIFICIO(id)
);

CREATE TABLE HORARIO_DISPONIBLE (
    id SERIAL PRIMARY KEY,
    id_sala INT REFERENCES SALA(id),
    hora_inicio TIME NOT NULL,
    hora_termino TIME NOT NULL
);

CREATE TABLE ESTADO_RESERVA (
    id_estado INT PRIMARY KEY,
    nombre_estado VARCHAR(30) NOT NULL
);

CREATE TABLE RESERVA (
    id SERIAL PRIMARY KEY,
    fecha_reserva DATE NOT NULL,
    observacion VARCHAR(255),
    fecha_creacion TIMESTAMP NOT NULL,
    id_estudiante INT REFERENCES ESTUDIANTE(id),
    id_sala INT REFERENCES SALA(id),
    id_horario INT REFERENCES HORARIO_DISPONIBLE(id),
    id_estado INT REFERENCES ESTADO_RESERVA(id_estado)
);

-- Índices para rendimiento de búsquedas frecuentes
CREATE INDEX idx_estudiante_nombre ON ESTUDIANTE (nombre);
CREATE INDEX idx_estudiante_apellido ON ESTUDIANTE (apellido);
CREATE INDEX idx_estudiante_rut ON ESTUDIANTE (rut);
CREATE INDEX idx_horario_sala ON HORARIO_DISPONIBLE (id_sala);
CREATE INDEX idx_reserva_sala_fecha ON RESERVA (id_sala, fecha_reserva);
CREATE INDEX idx_reserva_horario ON RESERVA (id_horario);
CREATE INDEX idx_reserva_estudiante ON RESERVA (id_estudiante);

CREATE TABLE CREDENCIAL (
  id BIGSERIAL PRIMARY KEY,
  numero_credencial VARCHAR(20) NOT NULL UNIQUE,
  fecha_vencimiento DATE NOT NULL,
  estudiante_id INT NOT NULL UNIQUE,
  CONSTRAINT fk_credencial_estudiante
    FOREIGN KEY (estudiante_id) REFERENCES ESTUDIANTE(id)
);
