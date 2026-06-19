-- Carreras
INSERT IGNORE INTO carrera (id, nombre_carrera, facultad) VALUES
  (1, 'Ingeniería Civil Informática', 'Facultad de Ingeniería'),
  (2, 'Ingeniería Comercial',         'Facultad de Economía y Negocios'),
  (3, 'Derecho',                      'Facultad de Ciencias Jurídicas'),
  (4, 'Psicología',                   'Facultad de Ciencias Sociales');

-- Edificios
INSERT IGNORE INTO edificio (id, nombre_edificio, direccion) VALUES
  (1, 'Biblioteca Central',        'Av. Libertador Bernardo O''Higgins 1234, Santiago'),
  (2, 'Edificio de Estudio Anexo', 'Av. Vicuña Mackenna 4860, Macul, Santiago');

-- Salas
INSERT IGNORE INTO sala (id, codigo_sala, nombre_sala, capacidad, piso, descripcion, estado, id_edificio) VALUES
  (1, 'A101', 'Sala A101', 4,  1, 'Sala pequeña silenciosa para estudio individual o en parejas.', 'Disponible', 1),
  (2, 'B102', 'Sala B102', 4,  1, 'Sala pequeña con pizarra acrílica.',                             'Disponible', 1),
  (3, 'C201', 'Sala C201', 8,  2, 'Sala mediana con proyector para grupos.',                        'Disponible', 1),
  (4, 'D202', 'Sala D202', 8,  2, 'Sala mediana con equipo de videoconferencia.',                   'Disponible', 2),
  (5, 'E301', 'Sala E301', 12, 3, 'Sala grande para talleres y reuniones de equipo.',               'Disponible', 2),
  (6, 'F302', 'Sala F302', 20, 3, 'Sala grande tipo auditorio para presentaciones.',                'Mantención', 2);

-- Estados de reserva
INSERT IGNORE INTO estado_reserva (id_estado, nombre_estado) VALUES
  (1, 'Confirmada'),
  (2, 'Cancelada');

-- Estudiantes
INSERT IGNORE INTO estudiante (id, rut, nombre, apellido, correo, telefono, fecha_registro, id_carrera) VALUES
  (1, '12345678-5', 'Lucas',     'Chong',    'lucas.chong@alumnos.uni.cl',     '+56912345678', '2025-03-10', 1),
  (2, '21123456-3', 'María',     'González', 'maria.gonzalez@alumnos.uni.cl',  '+56987654321', '2025-03-12', 2),
  (3, '19876543-0', 'Diego',     'Fuentes',  'diego.fuentes@alumnos.uni.cl',   '+56911112222', '2024-08-01', 1),
  (4, '20345678-6', 'Camila',    'Rojas',    'camila.rojas@alumnos.uni.cl',    '+56922223333', '2025-03-15', 3),
  (5, '18234567-9', 'Joaquín',   'Soto',     'joaquin.soto@alumnos.uni.cl',    '+56933334444', '2023-03-20', 4),
  (6, '17555444-0', 'Valentina', 'Pérez',    'valentina.perez@alumnos.uni.cl', '+56944445555', '2024-03-05', 2);

-- Horarios disponibles (5 bloques por sala)
INSERT IGNORE INTO horario_disponible (id, id_sala, hora_inicio, hora_termino) VALUES
  (1, 1, '08:00', '09:30'), (2, 1, '09:30', '11:00'), (3, 1, '11:00', '12:30'), (4, 1, '12:30', '14:00'), (5, 1, '14:00', '15:30'),
  (6, 2, '08:00', '09:30'), (7, 2, '09:30', '11:00'), (8, 2, '11:00', '12:30'), (9, 2, '12:30', '14:00'), (10, 2, '14:00', '15:30'),
  (11, 3, '08:00', '09:30'), (12, 3, '09:30', '11:00'), (13, 3, '11:00', '12:30'), (14, 3, '12:30', '14:00'), (15, 3, '14:00', '15:30'),
  (16, 4, '08:00', '09:30'), (17, 4, '09:30', '11:00'), (18, 4, '11:00', '12:30'), (19, 4, '12:30', '14:00'), (20, 4, '14:00', '15:30'),
  (21, 5, '08:00', '09:30'), (22, 5, '09:30', '11:00'), (23, 5, '11:00', '12:30'), (24, 5, '12:30', '14:00'), (25, 5, '14:00', '15:30'),
  (26, 6, '08:00', '09:30'), (27, 6, '09:30', '11:00'), (28, 6, '11:00', '12:30'), (29, 6, '12:30', '14:00'), (30, 6, '14:00', '15:30');

-- Reservas
INSERT IGNORE INTO reserva (id, fecha_reserva, observacion, fecha_creacion, id_estudiante, id_sala, id_horario, id_estado) VALUES
  (1, '2026-06-09', 'Reunión de estudio para el examen de cálculo II.',          '2026-06-04 09:15:00', 1, 1, 1,  1),
  (2, '2026-06-09', 'Preparación de presentación grupal de marketing.',          '2026-06-04 10:05:00', 2, 1, 2,  1),
  (3, '2026-06-10', 'Sesión cancelada por cambio de horario del grupo.',         '2026-06-03 16:20:00', 3, 2, 6,  2),
  (4, '2026-06-10', 'Estudio para el certamen de programación avanzada.',        '2026-06-04 11:40:00', 4, 3, 11, 1),
  (5, '2026-06-11', 'Ensayo de la defensa del proyecto de título grupal.',       '2026-06-04 08:30:00', 5, 4, 16, 1),
  (6, '2026-06-11', 'Reunión de coordinación del trabajo semestral en equipo.',  '2026-06-04 12:00:00', 6, 5, 21, 1),
  (7, '2026-06-12', 'Revisión final del informe antes de la entrega del viernes.','2026-06-04 13:25:00', 1, 6, 26, 1),
  (8, '2026-06-12', 'Trabajo colaborativo de análisis de datos del proyecto.',   '2026-06-04 14:10:00', 2, 2, 7,  1),
  (9, '2026-06-08', 'Reserva anulada por disponibilidad de otra sala libre.',    '2026-06-02 17:45:00', 3, 1, 3,  2),
  (10, '2026-06-09', 'Sesión de repaso de bases de datos relacionales SQL.',     '2026-06-04 15:00:00', 4, 3, 12, 1);

-- Credenciales
INSERT IGNORE INTO credencial (id, numero_credencial, fecha_vencimiento, estudiante_id) VALUES
  (1, '123456', '2028-12-31', 1),
  (2, '654321', '2029-06-30', 2),
  (3, '987654', '2028-08-15', 3);
