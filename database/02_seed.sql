-- =====================================================================
--  02_seed.sql  |  Datos de prueba - Sistema de Reserva de Salas
--  Proyecto: ICIFG003-SOL2-EQUIPO6  |  Issue #3 (Sprint 2)
--  Responsable: Lucas Chong
--  Base de datos: PostgreSQL
--
--  USO:
--    1) psql -d reserva_salas_db -f database/01_schema.sql   (Issue #2)
--    2) psql -d reserva_salas_db -f database/02_seed.sql      (este script)
--
--  NOTA SOBRE IDs:
--    Las PK son SERIAL, por lo que NO se insertan IDs explícitos:
--    se generan automáticamente según el orden de inserción
--    (CARRERA 1..n, SALA 1..n, etc.). Las FKs referencian esos
--    correlativos. La única excepción es ESTADO_RESERVA, cuya PK
--    (id_estado) es INT y por eso se asigna manualmente.
--    El TRUNCATE ... RESTART IDENTITY inicial reinicia los SERIAL,
--    de modo que el script puede re-ejecutarse sin romper las FKs.
-- =====================================================================

TRUNCATE TABLE RESERVA, CREDENCIAL, HORARIO_DISPONIBLE, SALA, EDIFICIO,
               ESTADO_RESERVA, ESTUDIANTE, CARRERA RESTART IDENTITY CASCADE;

-- =====================================================================
-- 1. CARRERA  (minimo 3)
-- =====================================================================
INSERT INTO CARRERA (nombre_carrera, facultad) VALUES
  ('Ingeniería Civil Informática', 'Facultad de Ingeniería'),          -- id 1
  ('Ingeniería Comercial',         'Facultad de Economía y Negocios'), -- id 2
  ('Derecho',                      'Facultad de Ciencias Jurídicas'),  -- id 3
  ('Psicología',                   'Facultad de Ciencias Sociales');   -- id 4

-- =====================================================================
-- 2. EDIFICIO  (1-2 segun el ticket)
-- =====================================================================
INSERT INTO EDIFICIO (nombre_edificio, direccion) VALUES
  ('Biblioteca Central',        'Av. Libertador Bernardo O''Higgins 1234, Santiago'), -- id 1
  ('Edificio de Estudio Anexo', 'Av. Vicuña Mackenna 4860, Macul, Santiago');         -- id 2

-- =====================================================================
-- 3. SALA  (minimo 5; capacidades cubren los filtros del RF03: <=4, <=8, >8)
-- =====================================================================
INSERT INTO SALA (codigo_sala, nombre_sala, capacidad, piso, descripcion, estado, id_edificio) VALUES
  ('A101', 'Sala A101', 4,  1, 'Sala pequeña silenciosa para estudio individual o en parejas.', 'Disponible', 1), -- id 1
  ('B102', 'Sala B102', 4,  1, 'Sala pequeña con pizarra acrílica.',                             'Disponible', 1), -- id 2
  ('C201', 'Sala C201', 8,  2, 'Sala mediana con proyector para grupos.',                        'Disponible', 1), -- id 3
  ('D202', 'Sala D202', 8,  2, 'Sala mediana con equipo de videoconferencia.',                   'Disponible', 2), -- id 4
  ('E301', 'Sala E301', 12, 3, 'Sala grande para talleres y reuniones de equipo.',               'Disponible', 2), -- id 5
  ('F302', 'Sala F302', 20, 3, 'Sala grande tipo auditorio para presentaciones.',                'Mantención', 2); -- id 6

-- =====================================================================
-- 4. ESTADO_RESERVA  (PK INT manual; valores de la rubrica)
-- =====================================================================
INSERT INTO ESTADO_RESERVA (id_estado, nombre_estado) VALUES
  (1, 'Confirmada'),
  (2, 'Cancelada');

-- =====================================================================
-- 5. ESTUDIANTE  (minimo 5; RUT con digito verificador valido y correo unico)
-- =====================================================================
INSERT INTO ESTUDIANTE (rut, nombre, apellido, correo, telefono, fecha_registro, id_carrera) VALUES
  ('12345678-5', 'Lucas',     'Chong',    'lucas.chong@alumnos.uni.cl',     '+56912345678', '2025-03-10', 1), -- id 1
  ('21123456-3', 'María',     'González', 'maria.gonzalez@alumnos.uni.cl',  '+56987654321', '2025-03-12', 2), -- id 2
  ('19876543-0', 'Diego',     'Fuentes',  'diego.fuentes@alumnos.uni.cl',   '+56911112222', '2024-08-01', 1), -- id 3
  ('20345678-6', 'Camila',    'Rojas',    'camila.rojas@alumnos.uni.cl',    '+56922223333', '2025-03-15', 3), -- id 4
  ('18234567-9', 'Joaquín',   'Soto',     'joaquin.soto@alumnos.uni.cl',    '+56933334444', '2023-03-20', 4), -- id 5
  ('17555444-0', 'Valentina', 'Pérez',    'valentina.perez@alumnos.uni.cl', '+56944445555', '2024-03-05', 2); -- id 6

-- =====================================================================
-- 6. HORARIO_DISPONIBLE  (5 bloques por sala -> ids 1..30, agrupados por sala)
--    Sala 1: 1-5 | Sala 2: 6-10 | Sala 3: 11-15 | Sala 4: 16-20 | Sala 5: 21-25 | Sala 6: 26-30
-- =====================================================================
INSERT INTO HORARIO_DISPONIBLE (id_sala, hora_inicio, hora_termino) VALUES
  (1, '08:00', '09:30'), (1, '09:30', '11:00'), (1, '11:00', '12:30'), (1, '12:30', '14:00'), (1, '14:00', '15:30'),
  (2, '08:00', '09:30'), (2, '09:30', '11:00'), (2, '11:00', '12:30'), (2, '12:30', '14:00'), (2, '14:00', '15:30'),
  (3, '08:00', '09:30'), (3, '09:30', '11:00'), (3, '11:00', '12:30'), (3, '12:30', '14:00'), (3, '14:00', '15:30'),
  (4, '08:00', '09:30'), (4, '09:30', '11:00'), (4, '11:00', '12:30'), (4, '12:30', '14:00'), (4, '14:00', '15:30'),
  (5, '08:00', '09:30'), (5, '09:30', '11:00'), (5, '11:00', '12:30'), (5, '12:30', '14:00'), (5, '14:00', '15:30'),
  (6, '08:00', '09:30'), (6, '09:30', '11:00'), (6, '11:00', '12:30'), (6, '12:30', '14:00'), (6, '14:00', '15:30');

-- =====================================================================
-- 7. RESERVA  (reservas iniciales de prueba)
--    Reglas respetadas:
--      - observacion >= 15 caracteres (regla del Issue #8).
--      - id_horario pertenece al id_sala indicado.
--      - sin choques en estado Confirmada para la misma sala+horario+fecha.
-- =====================================================================
INSERT INTO RESERVA (fecha_reserva, observacion, fecha_creacion, id_estudiante, id_sala, id_horario, id_estado) VALUES
  ('2026-06-09', 'Reunión de estudio para el examen de cálculo II.',          '2026-06-04 09:15:00', 1, 1, 1,  1),
  ('2026-06-09', 'Preparación de presentación grupal de marketing.',          '2026-06-04 10:05:00', 2, 1, 2,  1),
  ('2026-06-10', 'Sesión cancelada por cambio de horario del grupo.',         '2026-06-03 16:20:00', 3, 2, 6,  2),
  ('2026-06-10', 'Estudio para el certamen de programación avanzada.',        '2026-06-04 11:40:00', 4, 3, 11, 1),
  ('2026-06-11', 'Ensayo de la defensa del proyecto de título grupal.',       '2026-06-04 08:30:00', 5, 4, 16, 1),
  ('2026-06-11', 'Reunión de coordinación del trabajo semestral en equipo.',  '2026-06-04 12:00:00', 6, 5, 21, 1),
  ('2026-06-12', 'Revisión final del informe antes de la entrega del viernes.','2026-06-04 13:25:00', 1, 6, 26, 1),
  ('2026-06-12', 'Trabajo colaborativo de análisis de datos del proyecto.',   '2026-06-04 14:10:00', 2, 2, 7,  1),
  ('2026-06-08', 'Reserva anulada por disponibilidad de otra sala libre.',    '2026-06-02 17:45:00', 3, 1, 3,  2),
  ('2026-06-09', 'Sesión de repaso de bases de datos relacionales SQL.',      '2026-06-04 15:00:00', 4, 3, 12, 1);

-- =====================================================================
-- 8. CREDENCIAL  (al menos 3 filas con datos de prueba)
-- =====================================================================
INSERT INTO CREDENCIAL (numero_credencial, fecha_vencimiento, estudiante_id) VALUES
  ('123456', '2028-12-31', 1),
  ('654321', '2029-06-30', 2),
  ('987654', '2028-08-15', 3);

-- Fin del seed.
