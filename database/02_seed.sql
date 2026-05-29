-- Seed de datos de prueba
-- CARRERAS
INSERT INTO CARRERA (nombre_carrera, facultad) VALUES 
('Ingeniería Civil Informática', 'Facultad de Ingeniería'),
('Arquitectura', 'Facultad de Arquitectura'),
('Psicología', 'Facultad de Ciencias Sociales');

-- EDIFICIOS
INSERT INTO EDIFICIO (nombre_edificio, direccion) VALUES 
('Edificio A', 'Av. Principal 123'),
('Edificio B', 'Av. Secundaria 456'),
('Edificio C', 'Av. Terciaria 789');

-- SALAS (Capacidades: <=4, <=8, >8)
INSERT INTO SALA (codigo_sala, nombre_sala, capacidad, piso, descripcion, estado, id_edificio) VALUES 
('S1', 'Estudio 1', 4, 1, 'Sala pequeña', 'Activa', 1),
('S2', 'Estudio 2', 4, 1, 'Sala pequeña', 'Activa', 1),
('S3', 'Estudio 3', 8, 2, 'Sala mediana', 'Activa', 2),
('S4', 'Estudio 4', 8, 2, 'Sala mediana', 'Activa', 2),
('S5', 'Estudio 5', 20, 3, 'Sala grande', 'Activa', 3),
('S6', 'Estudio 6', 30, 3, 'Sala grande', 'Activa', 3);

-- ESTADOS
INSERT INTO ESTADO_RESERVA (id_estado, nombre_estado) VALUES 
(1, 'Confirmada'),
(2, 'Cancelada');

-- ESTUDIANTES
INSERT INTO ESTUDIANTE (rut, nombre, apellido, correo, telefono, fecha_registro, id_carrera) VALUES 
('11111111-1', 'Juan', 'Perez', 'j.perez@uni.cl', '911111111', '2026-01-01', 1),
('22222222-2', 'Maria', 'Gomez', 'm.gomez@uni.cl', '922222222', '2026-01-02', 1),
('33333333-3', 'Pedro', 'Lopez', 'p.lopez@uni.cl', '933333333', '2026-01-03', 2),
('44444444-4', 'Ana', 'Diaz', 'a.diaz@uni.cl', '944444444', '2026-01-04', 2),
('55555555-5', 'Luis', 'Ruiz', 'l.ruiz@uni.cl', '955555555', '2026-01-05', 3),
('66666666-6', 'Carla', 'Soto', 'c.soto@uni.cl', '966666666', '2026-01-06', 3),
('77777777-7', 'Diego', 'Mora', 'd.mora@uni.cl', '977777777', '2026-01-07', 1),
('88888888-8', 'Sofia', 'Vega', 's.vega@uni.cl', '988888888', '2026-01-08', 2),
('99999999-9', 'Jorge', 'Silva', 'j.silva@uni.cl', '999999999', '2026-01-09', 3),
('00000000-0', 'Elena', 'Rios', 'e.rios@uni.cl', '900000000', '2026-01-10', 1);

-- HORARIOS (5 por sala)
INSERT INTO HORARIO_DISPONIBLE (id_sala, hora_inicio, hora_termino) VALUES 
(1, '08:00', '09:30'), (1, '09:30', '11:00'), (1, '11:00', '12:30'), (1, '12:30', '14:00'), (1, '14:00', '15:30'),
(2, '08:00', '09:30'), (2, '09:30', '11:00'), (2, '11:00', '12:30'), (2, '12:30', '14:00'), (2, '14:00', '15:30'),
(3, '08:00', '09:30'), (3, '09:30', '11:00'), (3, '11:00', '12:30'), (3, '12:30', '14:00'), (3, '14:00', '15:30'),
(4, '08:00', '09:30'), (4, '09:30', '11:00'), (4, '11:00', '12:30'), (4, '12:30', '14:00'), (4, '14:00', '15:30'),
(5, '08:00', '09:30'), (5, '09:30', '11:00'), (5, '11:00', '12:30'), (5, '12:30', '14:00'), (5, '14:00', '15:30'),
(6, '08:00', '09:30'), (6, '09:30', '11:00'), (6, '11:00', '12:30'), (6, '12:30', '14:00'), (6, '14:00', '15:30');

-- RESERVAS
INSERT INTO RESERVA (fecha_reserva, observacion, fecha_creacion, id_estudiante, id_sala, id_horario, id_estado) VALUES 
('2026-05-29', 'Reserva hoy', '2026-05-28 10:00:00', 1, 1, 1, 1),
('2026-05-29', 'Reserva hoy urgente', '2026-05-28 11:00:00', 2, 2, 6, 1),
('2026-05-29', 'Estudio grupal', '2026-05-28 12:00:00', 3, 3, 11, 2),
('2026-05-30', 'Mañana', '2026-05-28 13:00:00', 4, 4, 16, 1),
('2026-05-30', 'Mañana', '2026-05-28 14:00:00', 5, 5, 21, 1),
('2026-05-31', 'Finde', '2026-05-28 15:00:00', 6, 6, 26, 1),
('2026-06-01', 'Proximo mes', '2026-05-28 16:00:00', 7, 1, 2, 1),
('2026-06-02', 'Proximo mes', '2026-05-28 17:00:00', 8, 2, 7, 1),
('2026-06-03', 'Proximo mes', '2026-05-28 18:00:00', 9, 3, 12, 1),
('2026-06-04', 'Proximo mes', '2026-05-28 19:00:00', 10, 4, 17, 1),
('2026-06-05', 'Proximo mes', '2026-05-28 20:00:00', 1, 5, 22, 1),
('2026-06-06', 'Proximo mes', '2026-05-28 21:00:00', 2, 6, 27, 1),
('2026-06-07', 'Proximo mes', '2026-05-28 22:00:00', 3, 1, 3, 2),
('2026-06-08', 'Proximo mes', '2026-05-28 23:00:00', 4, 2, 8, 1),
('2026-06-09', 'Proximo mes', '2026-05-28 09:00:00', 5, 3, 13, 1);
