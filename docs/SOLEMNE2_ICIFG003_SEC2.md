# ICIF G003 — Aplicaciones y Tecnologías de la Web
## SOLEMNE 2 | Fecha: 29-05-2026 | Sección 2 | Docente: Leonardo Hernández Vera

---

## Tabla de Especificaciones

| Criterio | Habilidad Procedimental Evaluada | Criterio de Evaluación Asociado | Nivel Cognitivo (Bloom) | % Ponderación |
|---|---|---|---|---|
| 1. Diseño de página/sistema web | Diseñar página o sistema web | Propone las bases de una arquitectura frontend en aspectos de comunicación, funcionalidad y transaccionalidad | Diseñar | 60% |
| 2. Trabajo en equipo | Organización del trabajo y seguimiento del mismo | Participa activamente en grupos de trabajo. Aplica responsablemente protocolos y procedimientos profesionales. Cumple sus tareas respetando plazos y procedimientos establecidos. | Planificar | 20% |
| 3. Desarrollo Frontend | Construcción y desarrollo de frontend | Usa tecnologías de construcción web plana, usando bases de diseño, maquetación y herramientas. Maneja el desarrollo frontend haciendo uso de las últimas tendencias y herramientas disponibles. | Aplicar | 20% |

> **Cada ítem vale 5 puntos | Puntaje Total = 65 | Exigencia = 60%**

---

## Instrucciones Generales

- El profesor asignará equipos de trabajo aleatorios de **3 o máximo 4 estudiantes**.
- El equipo debe crear un repositorio en GitHub con el nombre: `ICIFG003-SOL2-EQUIPO0?` e invitar al usuario `leoehernandezv`.
- Crear un **proyecto Kanban** asociado al repositorio en GitHub para gestión del proyecto.
- El proyecto se presentará el **viernes 12 de junio 2026** en hora de clases (se realizará un clone en directo).
- Implementar el **backend en Spring Boot** con:
  - Persistencia Hibernate
  - Relaciones: 1..1, 1..N, M..N
  - Queries objetales y nativas
  - Base de datos: PostgreSQL
  - Script con datos de prueba para cada tabla
- Implementar el **frontend en Angular**.
- La estructura de directorios y `README.md` debe seguir el mismo formato que el Control Proyecto #2.

---

## Caso Propuesto: Sistema Web de Reserva de Salas de Estudio para una Biblioteca Universitaria

**Contexto:** La biblioteca de una universidad necesita una aplicación web que permita a los estudiantes consultar y reservar salas de estudio. Actualmente las reservas se gestionan manualmente mediante una planilla, generando conflictos de horarios y poca visibilidad de la disponibilidad.

---

## Requerimientos Funcionales

### RF01: Página Principal
La página principal debe contener:
- Logo de la biblioteca
- Menú de navegación
- Información general
- Sección de salas disponibles
- Panel lateral con avisos importantes
- Pie de página institucional

### RF02: Visualización de Salas
El sistema debe mostrar dinámicamente un conjunto de salas. Cada sala debe mostrar:
- Nombre de la sala
- Capacidad
- Ubicación
- Horario disponible
- Imagen representativa
- Botón "Reservar"

**Ejemplo de datos:**

| Sala | Capacidad | Ubicación |
|---|---|---|
| Sala A101 | 6 personas | Primer piso |
| Sala B202 | 10 personas | Segundo piso |
| Sala C303 | 4 personas | Tercer piso |

### RF03: Filtrado de Salas
El usuario podrá filtrar salas según:
- Todas
- Hasta 4 personas
- Hasta 8 personas
- Más de 8 personas
- Fecha (día de consulta)

### RF04: Mostrar Reservas de Salas
Al seleccionar una sala y un día específico (fecha):
- Se muestra el listado de reservas
- Se muestra la información de la reserva
- Se actualiza un contador de reservas realizadas

**Ejemplo:**

Reservas realizadas — Fecha: 29-05-2026

| Sala | Reserva | Inicio | Fin | Estado |
|---|---|---|---|---|
| Sala A101 | 105 | 10:15 | 13:30 | Confirmada |
| Sala B202 | 209 | 14:00 | 17:00 | Cancelada |

Total reservas: 2

### RF05: Formulario de Solicitud de Reserva
Campos requeridos:
- Buscar/filtrar un estudiante registrado en tabla ESTUDIANTE
- Fecha
- Seleccionar horario
- Observaciones

**Validaciones obligatorias:**
- El estudiante debe existir en los registros de la universidad
- Todos los campos son requeridos
- Correo válido
- La fecha no puede ser anterior al día actual
- No se puede reservar en un horario ya reservado (salvo que esté cancelado)
- Observaciones: mínimo 15 caracteres

---

## Requerimientos de Diseño HTML

La página debe usar **obligatoriamente** las siguientes etiquetas semánticas:

```
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
<h1>, <h2>, <h3>, <p>, <ul>, <li>
```

---

## Requerimientos CSS

### Flexbox — usar para:
- Menú de navegación
- Tarjetas de salas

### CSS Grid — usar para:
- Layout principal

### Media Queries — implementar para:
| Dispositivo | Rango |
|---|---|
| Escritorio | Mayor a 1024px |
| Tablet | Entre 768px y 1023px |
| Móvil | Menor a 768px |

---

## Requerimientos de Accesibilidad

- Uso correcto de `<label>`
- Texto alternativo (`alt`) en imágenes
- Orden lógico de tabulación
- Contraste adecuado de colores
- Navegación comprensible mediante teclado

---

## Diseño Responsive

Al reducir la pantalla:
- Menú pasa a disposición vertical
- Salas pasan a una sola columna
- Sidebar se ubica debajo del contenido principal

---

## Componentes Reutilizables

| Componente | Descripción |
|---|---|
| Componente Sala | Genera dinámicamente cada tarjeta de sala |
| Componente Menú | Construye la navegación |
| Componente Mensaje | Muestra errores o confirmaciones |

---

## Modelo Entidad Relación (MER)

### Tabla: CARRERA
Almacena las carreras impartidas por la institución.

| Campo | Tipo | Restricción |
|---|---|---|
| id | INT | PK |
| nombre_carrera | VARCHAR(100) | NOT NULL |
| facultad | VARCHAR(100) | NOT NULL |

### Tabla: ESTUDIANTE
Almacena los estudiantes que realizan reservas.

| Campo | Tipo | Restricción |
|---|---|---|
| id | INT | PK |
| rut | VARCHAR(12) | UNIQUE |
| nombre | VARCHAR(100) | NOT NULL |
| apellido | VARCHAR(100) | NOT NULL |
| correo | VARCHAR(150) | UNIQUE |
| telefono | VARCHAR(20) | — |
| fecha_registro | DATE | NOT NULL |
| id_carrera | INT | FK → CARRERA |

### Tabla: EDIFICIO
Permite identificar dónde se encuentran las salas.

| Campo | Tipo | Restricción |
|---|---|---|
| id | INT | PK |
| nombre_edificio | VARCHAR(100) | NOT NULL |
| direccion | VARCHAR(200) | NOT NULL |

### Tabla: SALA
Información de las salas de estudio.

| Campo | Tipo | Restricción |
|---|---|---|
| id | INT | PK |
| codigo_sala | VARCHAR(20) | UNIQUE |
| nombre_sala | VARCHAR(100) | NOT NULL |
| capacidad | INT | NOT NULL |
| piso | INT | NOT NULL |
| descripcion | VARCHAR(255) | NOT NULL |
| estado | VARCHAR(30) | NOT NULL |
| id_edificio | INT | FK → EDIFICIO |

### Tabla: HORARIO_DISPONIBLE
Define los bloques horarios que pueden reservarse.

| Campo | Tipo | Restricción |
|---|---|---|
| id | INT | PK |
| id_sala | INT | FK → SALA |
| hora_inicio | TIME | NOT NULL |
| hora_termino | TIME | NOT NULL |

**Ejemplos de bloques horarios:**

| Inicio | Término |
|---|---|
| 08:00 | 09:30 |
| 09:30 | 11:00 |
| 11:00 | 14:30 |

### Tabla: ESTADO_RESERVA
Catálogo de estados posibles de una reserva.

| Campo | Tipo | Restricción |
|---|---|---|
| id_estado | INT | PK |
| nombre_estado | VARCHAR(30) | NOT NULL |

**Valores de ejemplo:** Confirmada, Cancelada

### Tabla: RESERVA
Entidad principal del sistema.

| Campo | Tipo | Restricción |
|---|---|---|
| id | INT | PK |
| fecha_reserva | DATE | NOT NULL |
| observacion | VARCHAR(255) | NOT NULL |
| fecha_creacion | DATETIME | NOT NULL |
| id_estudiante | INT | FK → ESTUDIANTE |
| id_sala | INT | FK → SALA |
| id_horario | INT | FK → HORARIO_DISPONIBLE |
| id_estado | INT | FK → ESTADO_RESERVA |

---

## Rúbrica de Evaluación — Criterio 1: Diseño de Página/Sistema Web

### Ítem: Estructura Semántica del Documento (12%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Uso completo y correcto de etiquetas semánticas HTML5 (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), jerarquía de títulos coherente, sin anidamientos incorrectos. |
| **BD (80%)** | Usa la mayoría de etiquetas semánticas con jerarquía mayormente correcta; solo pequeños errores que no afectan significativamente. |
| **DA (60%)** | Usa algunas etiquetas semánticas pero mezcla frecuentemente con `div`/`span`; jerarquía de títulos con inconsistencias. |
| **DI (30%)** | Estructura basada principalmente en `div` y `span`; escaso uso semántico; jerarquía confusa. |
| **DN (0%)** | Sin estructura HTML válida o contenido mínimo sin organización ni semántica. |

### Ítem: Organización y Claridad del Contenido (12%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Contenido claramente seccionado; títulos, subtítulos, párrafos y listas bien usados; flujo lógico; accesibilidad aplicada consistentemente (`alt`, `label`, tabulación). |
| **BD (80%)** | Contenido mayormente organizado; algunas prácticas de accesibilidad incompletas o ausentes. |
| **DA (60%)** | Organización básica con desorden, duplicidades o textos largos sin estructura; accesibilidad parcial. |
| **DI (30%)** | Casi sin estructura; pocas prácticas de accesibilidad o mal aplicadas. |
| **DN (0%)** | Sin organización reconocible ni consideración de accesibilidad. |

### Ítem: Aplicación de Estilos y Layout con CSS (12%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | CSS externalizado y organizado; selectores y propiedades coherentes; layout con flexbox y/o grid claro y estable; sin desbordes ni problemas de alineación. |
| **BD (80%)** | CSS principalmente externo; layout con flexbox/grid funcional con pequeños desajustes visuales menores. |
| **DA (60%)** | Estilos externos combinados con internos o en línea; flexbox/grid parcial o con problemas de alineación. |
| **DI (30%)** | Estilos mayormente en línea o desorganizados; flexbox/grid mínimo o incorrecto. |
| **DN (0%)** | Sin hojas de estilo ni CSS relevante; layout por defecto del navegador. |

### Ítem: Diseño Responsive y Adaptabilidad (12%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Media queries para móvil, tablet y escritorio; elementos se reacomodan correctamente en todos los tamaños sin solaparse ni desbordarse. |
| **BD (80%)** | Responsive en la mayoría de los casos; leves desajustes visuales en algunos tamaños que no impiden el uso. |
| **DA (60%)** | Algunos ajustes responsive pero no cubren todos los casos; varios desajustes de layout y tipografía. |
| **DI (30%)** | Mínimos intentos de responsividad; casi no se adapta; importantes problemas de solapamiento. |
| **DN (0%)** | Sin mecanismo responsive; solo funciona correctamente en un tamaño específico. |

### Ítem: Coherencia Visual e Integración Funcional Básica (12%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Identidad visual clara y consistente (colores, tipografías, tamaños, espaciados); jerarquía visual evidente; todos los enlaces y botones funcionan con estados de interacción (hover, focus, active). |
| **BD (80%)** | Alta coherencia visual con detalles menores de inconsistencia; mayoría de elementos interactivos funcionan bien. |
| **DA (60%)** | Cierta coherencia pero con cambios bruscos de estilo entre secciones; varios botones/enlaces funcionan, otros no. |
| **DI (30%)** | Estilos mezclados sin criterio unificador; elementos interactivos pocos o sin feedback adecuado. |
| **DN (0%)** | Sin diseño visual intencionado ni elementos interactivos funcionales. |

---

## Rúbrica de Evaluación — Criterio 2: Trabajo en Equipo

### Ítem: Participación Activa en el Equipo (4%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Participa constante y proactivamente; aporta entregables de calidad; cumple siempre los plazos; contribución reconocida por compañeros. |
| **BD (80%)** | Participa regularmente; cumple la mayoría de compromisos; retrasos menores y aislados. |
| **DA (60%)** | Participación intermitente; cumple parte de las tareas; requiere recordatorios o presenta retrasos que obligan al equipo a ajustar. |
| **DI (30%)** | Participación baja o irregular; frecuentemente no entrega o entrega tarde; genera sobrecarga al equipo. |
| **DN (0%)** | No participa ni entrega tareas; su ausencia obliga a redistribuir completamente el trabajo. |

### Ítem: Comunicación Efectiva dentro del Equipo (4%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Comunicación clara, respetuosa y oportuna; documenta avances en canales definidos (commits, issues, actas); facilita la coordinación. |
| **BD (80%)** | Comunicación generalmente clara y respetuosa; pocas omisiones que no generan grandes dificultades. |
| **DA (60%)** | Comunicación irregular o incompleta; a veces omite informar retrasos o decisiones; genera cierta descoordinación. |
| **DI (30%)** | Rara vez informa adecuadamente; comunicación poco clara o tardía; provoca problemas de coordinación. |
| **DN (0%)** | No utiliza canales de comunicación ni informa su estado; impide al equipo planificar. |

### Ítem: Colaboración y Apoyo a los Compañeros (4%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Colabora activamente; ofrece ayuda técnica sin que se lo pidan; participa en revisiones; brinda retroalimentación constructiva. |
| **BD (80%)** | Apoya cuando se le solicita; participa en algunas actividades de colaboración; disposición positiva y respetuosa. |
| **DA (60%)** | Colaboración limitada o esporádica; ayuda solo en ocasiones; participación más reactiva que proactiva. |
| **DI (30%)** | Poca disposición a colaborar; evita tareas de apoyo; rara vez participa en revisiones. |
| **DN (0%)** | No colabora; rechaza o ignora solicitudes de ayuda; afecta negativamente el clima de trabajo. |

### Ítem: Gestión de Roles, Responsabilidades y Compromisos (4%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Asume claramente su rol; organiza tareas según el plan; cumple rigurosamente compromisos; se adapta a cambios de prioridades. |
| **BD (80%)** | Conoce su rol y cumple responsabilidades; ajustes menores bien comunicados y gestionados. |
| **DA (60%)** | Entiende su rol pero gestión irregular; pierde de vista prioridades o plazos; requiere supervisión adicional. |
| **DI (30%)** | Dificultades para asumir su rol; incumple compromisos frecuentemente sin coordinar con el equipo. |
| **DN (0%)** | Sin rol definido ni responsabilidades asumidas; el equipo no puede confiar en su participación. |

### Ítem: Resolución de Conflictos y Respeto de Protocolos Profesionales (4%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Maneja desacuerdos de forma madura y profesional; escucha, argumenta con criterios técnicos; respeta decisiones del grupo; busca consensos. |
| **BD (80%)** | Generalmente respetuoso con compañeros y acuerdos; en conflictos mantiene actitud adecuada; ocasionalmente requiere orientación. |
| **DA (60%)** | Acepta acuerdos del equipo pero con dificultades ocasionales para el desacuerdo (frustración, cierre al diálogo); respeta protocolos parcialmente. |
| **DI (30%)** | Maneja mal los conflictos; discusiones poco constructivas o ignora acuerdos; respeto a protocolos limitado. |
| **DN (0%)** | No respeta a compañeros ni protocolos; genera o agrava conflictos; sabotea decisiones del equipo. |

---

## Rúbrica de Evaluación — Criterio 3: Desarrollo Frontend

### Ítem: Lógica Frontend y Manipulación DOM (6.67%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Lógica completa, clara y eficiente; manipulación dinámica correcta de la interfaz. |
| **BD (80%)** | Lógica mayormente correcta con pequeños errores no críticos. |
| **DA (60%)** | Lógica básica funcional pero limitada o poco robusta. |
| **DI (30%)** | Lógica incompleta o con errores frecuentes. |
| **DN (0%)** | No implementa lógica funcional. |

### Ítem: Interacción y Manejo de Eventos (6.67%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Manejo completo de eventos; interacción fluida y sin errores; responde a acciones (click, input, etc.). |
| **BD (80%)** | Manejo adecuado con pequeños fallos. |
| **DA (60%)** | Interacción básica limitada. |
| **DI (30%)** | Interacción deficiente o inconsistente. |
| **DN (0%)** | Sin interacción funcional. |

### Ítem: Componentes y Reutilización (6.67%)

| Nivel | Descripción |
|---|---|
| **MB (100%)** | Código modular, reutilizable y bien organizado; interfaz dividida en partes reutilizables. |
| **BD (80%)** | Buena organización con cierta reutilización. |
| **DA (60%)** | Organización básica, poca reutilización. |
| **DI (30%)** | Código repetitivo y desorganizado. |
| **DN (0%)** | Sin estructura modular. |

---

## Resumen de Ponderaciones

| Criterio | Ítems | Puntaje por ítem | % Total |
|---|---|---|---|
| 1. Diseño de página/sistema web | 5 ítems × 5 pts | 5 pts c/u | 60% |
| 2. Trabajo en equipo | 5 ítems × 5 pts | 5 pts c/u | 20% |
| 3. Desarrollo Frontend | 3 ítems × 5 pts | 5 pts c/u | 20% |
| **Total** | **13 ítems** | **65 pts** | **100%** |

> **Exigencia: 60% → mínimo 39 puntos para aprobar**
