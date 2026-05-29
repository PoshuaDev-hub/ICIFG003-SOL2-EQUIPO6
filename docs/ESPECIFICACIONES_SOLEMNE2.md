# Especificaciones del Proyecto - Solemne 2

| **Asignatura** | ICIF G003 Aplicaciones y Tecnologías de la Web |
| :--- | :--- |
| **Evaluación** | Solemne 2 |
| **Fecha** | 29-05-2026 |
| **Sección** | 2 |
| **Docente** | Leonardo Hernández Vera |

---

## 1. Tabla de Especificaciones

| Criterio | Habilidad Procedimental Evaluada | Nivel Cognitivo (Bloom) | % Ponderación |
| :--- | :--- | :--- | :--- |
| **Diseño de página/sistema web** | Diseñar página o sistema web. Propone las bases de una arquitectura frontend en aspectos de comunicación, funcionalidad y transaccionalidad. | **Diseñar** | **60%** |
| **Trabajo en equipo** | Organización del trabajo y seguimiento del mismo. Participa activamente en grupos de trabajo, aplica responsablemente protocolos y procedimientos profesionales. Cumple sus tareas respetando plazos y procedimientos establecidos. | **Planificar** | **20%** |
| **Desarrollo Frontend** | Construcción y desarrollo de frontend. Usa tecnologías de construcción web plana, usando bases de diseño, maquetación y herramientas. Maneja el desarrollo frontend haciendo uso de las últimas tendencias y herramientas disponibles. | **Aplicar** | **20%** |

> **Puntaje Total:** 65 puntos | **Exigencia:** 60%

---

## 2. Rúbrica Detallada de Evaluación

### 2.1 Criterio 1: Diseño de página/sistema web (60%)

| ITEM | % | Habilidad Procedimental Evaluada | MB (100%) | BD (80%) | DA (60%) | DI (30%) | DN (0%) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Estructura semántica del documento** | 12% | Construir la estructura de un documento HTML utilizando etiquetas semánticas de forma adecuada. Organizar el contenido en secciones lógicas de acuerdo con su rol en la página (encabezado, navegación, contenido principal). | El documento HTML usa de forma completa y correcta las etiquetas semánticas de HTML5 (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), con jerarquía de títulos coherente y sin anidamientos incorrectos. Toda la estructura refleja claramente la organización lógica del contenido. | Usa la mayoría de las etiquetas semánticas pertinentes y la jerarquía de títulos es mayormente correcta, presentando solo pequeños errores de elección o anidamiento que no afectan significativamente la comprensión del documento. | Utiliza algunas etiquetas semánticas, pero mezcla frecuentemente elementos genéricos (`div`, `span`) donde correspondería un elemento semántico, o la jerarquía de títulos presenta inconsistencias que dificultan parcialmente la organización del contenido. | La estructura se basa principalmente en `div` y `span`, con escaso o nulo uso de etiquetas semánticas; la jerarquía de títulos es confusa o inexistente, dificultando la lectura y comprensión de la estructura. | La página no presenta una estructura HTML válida o se limita a un contenido mínimo sin organización ni uso adecuado de etiquetas; no se evidencian intentos de aplicar estructura semántica. |
| **Organización y claridad del contenido** | 12% | Organizar y redactar el contenido de la página de manera jerárquica y legible, aplicando las bases de diseño de información. Aplicar buenas prácticas básicas de accesibilidad en la estructuración del contenido. | El contenido está claramente seccionado, con títulos, subtítulos, párrafos y listas bien utilizados; el flujo de lectura es lógico y las prácticas básicas de accesibilidad (`alt` en imágenes, `labels` en formularios, orden de tabulación) se aplican de forma consistente. | El contenido se encuentra mayormente organizado, con solo leves problemas de orden o redundancias; se aplican varias prácticas de accesibilidad, aunque algunas están incompletas o ausentes. | Existe una organización básica del contenido (secciones y títulos) pero presenta desorden, duplicidades o textos largos sin estructura; las prácticas de accesibilidad son parciales o inconsistentes. | El contenido aparece casi sin estructura (texto plano, pocos títulos o listas), dificultando la comprensión; apenas se observan prácticas de accesibilidad o están mal aplicadas. | No hay organización reconocible del contenido ni uso de elementos de estructuración; no se evidencia ninguna consideración de accesibilidad. |
| **Aplicación de estilos y layout con CSS** | 12% | Definir y vincular hojas de estilo externas, aplicando selectores y propiedades CSS para dar formato al contenido. Implementar layouts utilizando flexbox y/o CSS grid para distribuir los elementos en la interfaz. | El CSS está correctamente externalizado y organizado; se usan selectores adecuados y propiedades de forma coherente. El layout principal se implementa con flexbox y/o grid, logrando una distribución clara y estable de todas las secciones, sin problemas visibles de alineación ni desbordes. | El CSS se aplica principalmente desde un archivo externo, con algunos detalles menores de organización o repetición; el layout con flexbox/grid funciona bien en la mayor parte de la página, presentando solo pequeños desajustes visuales. | Se utilizan estilos CSS externos pero combinados con estilos internos o en línea; el layout con flexbox/grid se aplica solo en algunas secciones o presenta problemas de alineación que afectan parcialmente la experiencia. | La mayor parte de los estilos se define en línea o de forma desorganizada; el uso de flexbox/grid es mínimo, incorrecto o inexistente, generando un layout desordenado y poco comprensible. | No se evidencian hojas de estilo ni aplicación relevante de CSS; el layout se limita a la disposición por defecto del navegador, sin intento de maquetación. |
| **Diseño responsive y adaptabilidad** | 12% | Aplicar media queries y técnicas de diseño responsive para adaptar la página a diferentes dispositivos. Ajustar el layout y los componentes para asegurar la usabilidad en diferentes resoluciones. | Se utilizan media queries y técnicas de diseño responsive que permiten que la página se vea y funcione correctamente en móvil, tablet y escritorio; los elementos se reacomodan sin solaparse, manteniendo legibilidad y funcionalidad en todos los tamaños probados. | La página es mayormente responsive, con media queries bien aplicadas; en algunos tamaños específicos se observan leves desajustes visuales (pequeños solapamientos o espacios sobrantes) que no impiden el uso. | Existen algunos ajustes responsive (por ejemplo, para móvil o escritorio) pero no cubren todos los casos; se observan varios desajustes de layout y tipografía que dificultan parcialmente la experiencia en ciertos dispositivos. | La página muestra mínimos intentos de responsividad (por ejemplo, una sola media query o uso básico de unidades relativas), pero en la práctica casi no se adapta y presenta importantes problemas de solapamiento o desbordes. | No se observa ningún mecanismo de diseño responsive; la página solo se visualiza correctamente en un tamaño específico y se rompe completamente en otros dispositivos. |
| **Coherencia visual e integración funcional básica** | 12% | Definir y aplicar una línea gráfica coherente (paleta de colores, tipografías, tamaños, espaciados) que apoye la comunicación del sitio. Implementar interacciones básicas del frontend (navegación, botones, enlaces) que aporten a la funcionalidad de la página. | La página mantiene una identidad visual clara y consistente (colores, tipografías, tamaños, espaciados); se aplica una jerarquía visual evidente. Todos los enlaces y botones funcionan correctamente, con estados de interacción (hover, focus, active) implementados y una navegación fluida. | La coherencia visual es alta, con algunos detalles menores de inconsistencia; la mayoría de los elementos interactivos funcionan bien, aunque uno o dos componentes presentan comportamientos o estilos incompletos. | Existe cierta coherencia visual, pero se observan cambios bruscos de estilo (colores, tipografías, tamaños) entre secciones; varios enlaces/botones funcionan, aunque otros no tienen acciones claras o retroalimentación visual. | La página muestra estilos mezclados sin criterio unificador; los elementos interactivos son pocos, incompletos o no proporcionan feedback adecuado, dificultando la navegación del usuario. | No se evidencia un diseño visual intencionado (uso de estilos por defecto) ni elementos interactivos funcionales; la navegación es inexistente o impracticable. |

### 2.2 Criterio 2: Trabajo en equipo (20%)

| ITEM | % | Habilidad Procedimental Evaluada | MB (100%) | BD (80%) | DA (60%) | DI (30%) | DN (0%) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Participación activa en el equipo** | 4% | Participar activamente en las tareas del equipo, aportando ideas, opiniones y trabajo concreto en las actividades asignadas. Asumir responsabilidad personal sobre las tareas comprometidas. | Participa de forma constante y proactiva en todas las actividades del equipo, aporta entregables de calidad y cumple siempre con los plazos acordados; su contribución es claramente reconocida por sus compañeros. | Participa regularmente y cumple la mayoría de los compromisos; sus entregables son adecuados y solo presenta retrasos menores o aislados que no afectan significativamente al equipo. | Participa de manera intermitente; cumple con parte de las tareas asignadas, pero requiere recordatorios o presenta retrasos que obligan al equipo a ajustar su planificación. | Su participación es baja o irregular; frecuentemente no entrega o entrega muy tarde sus tareas, generando sobrecarga o problemas evidentes para el resto del equipo. | No participa en las actividades del equipo ni entrega las tareas comprometidas; su ausencia obliga al equipo a redistribuir completamente su trabajo. |
| **Comunicación efectiva dentro del equipo** | 4% | Comunicar de forma clara, respetuosa y oportuna con los integrantes del equipo, utilizando los canales definidos (reuniones, repositorios, mensajería, actas). Compartir información relevante sobre avances, problemas y decisiones técnicas. | Se comunica de forma clara, respetuosa y oportuna; informa sistemáticamente sus avances y dificultades, documenta adecuadamente en los canales definidos y facilita la coordinación del equipo. | Mantiene una comunicación generalmente clara y respetuosa; informa la mayoría de sus avances y problemas, con pocas omisiones que no generan grandes dificultades al equipo. | Se comunica, pero de forma irregular o incompleta; a veces omite informar retrasos o decisiones, lo que genera cierta descoordinación o malentendidos dentro del equipo. | Rara vez informa adecuadamente sus avances o dificultades; su comunicación es poco clara o tardía, provocando problemas de coordinación y confusión entre los compañeros. | No utiliza los canales de comunicación del equipo ni informa su estado de trabajo; su falta de comunicación impide al equipo planificar y coordinarse. |
| **Colaboración y apoyo a los compañeros** | 4% | Colaborar con otros miembros del equipo, ofreciendo ayuda técnica o logística cuando es necesario. Compartir conocimientos y buenas prácticas para mejorar el trabajo colectivo. | Colabora activamente con sus compañeros, ofrece ayuda técnica y comparte conocimientos sin que se lo pidan; participa en revisiones, brinda retroalimentación constructiva y contribuye a mejorar el resultado colectivo. | Apoya a sus compañeros cuando se le solicita y participa en algunas actividades de colaboración (revisiones, ayudas puntuales), mostrando disposición positiva y respeto. | Colabora de forma limitada o esporádica; ofrece ayuda solo en ocasiones y su participación en actividades de apoyo es más bien reactiva que proactiva. | Muestra poca disposición a colaborar; evita asumir tareas de apoyo y rara vez participa en revisiones o en la solución conjunta de problemas. | No colabora con sus compañeros, rechaza o ignora solicitudes de ayuda y su actitud afecta negativamente el clima de trabajo del equipo. |
| **Gestión de roles, responsabilidades y compromisos** | 4% | Asumir y cumplir el rol asignado dentro del equipo (encargado de frontend, documentación, pruebas, integrador). Planificar y gestionar sus tareas personales en coherencia con la planificación global del equipo. | Asume claramente su rol dentro del equipo, organiza sus tareas de acuerdo al plan de trabajo y cumple rigurosamente sus compromisos; se adapta responsablemente a cambios de rol o prioridades. | Conoce su rol y, en general, cumple con sus responsabilidades; presenta algunos ajustes menores de planificación, pero los comunica y gestiona adecuadamente con el equipo. | Entiende su rol, pero su gestión de tareas es irregular; a veces pierde de vista prioridades o plazos y requiere supervisión o apoyo adicional para organizar su trabajo. | Tiene dificultades para asumir o mantener su rol; frecuentemente incumple compromisos o desatiende tareas sin coordinar con el equipo, afectando la ejecución del plan. | No asume un rol definido ni se responsabiliza de tareas concretas; su falta de gestión de compromisos impide que el equipo confíe en su participación. |
| **Resolución de conflictos y respeto de protocolos profesionales** | 4% | Manejar desacuerdos y conflictos de manera profesional, respetando las opiniones del resto del equipo. Aplicar los protocolos y procedimientos establecidos para la toma de decisiones y la resolución de problemas. | Maneja desacuerdos de forma madura y profesional; escucha, argumenta en base a criterios técnicos, respeta las decisiones del grupo y contribuye activamente a encontrar soluciones consensuadas siguiendo los protocolos definidos. | Generalmente respeta a sus compañeros y los acuerdos del equipo; en situaciones de conflicto mantiene una actitud adecuada, aunque ocasionalmente requiere orientación para canalizar sus opiniones. | Acepta los acuerdos del equipo, pero muestra dificultades ocasionales para manejar el desacuerdo (se frustra o se cierra al diálogo); respeta los protocolos de forma parcial. | Maneja mal los conflictos, se involucra en discusiones poco constructivas o ignora los acuerdos establecidos; su respeto por los protocolos profesionales es limitado o inconsistente. | No respeta a sus compañeros ni los protocolos del curso; genera o agrava conflictos y sabotea las decisiones del equipo, afectando gravemente el trabajo colaborativo. |

### 2.3 Criterio 3: Desarrollo Frontend (20%)

| ITEM | % | Habilidad Procedimental Evaluada | MB (100%) | BD (80%) | DA (60%) | DI (30%) | DN (0%) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Lógica Frontend y Manipulación del DOM** | 6.66% | Manipulación del DOM / renderizado dinámico. | Muestra datos dinámicos en la interfaz. Implementa lógica completa, clara y eficiente; manipulación dinámica correcta de la interfaz. | Lógica mayormente correcta, con pequeños errores no críticos. | Lógica básica funcional, pero limitada o poco robusta. | Lógica incompleta o con errores frecuentes. | No implementa lógica funcional. |
| **Interacción y Manejo de Eventos** | 6.66% | Programación con JavaScript (lógica frontend). Manejo de eventos e interacción de usuario. | Implementa lógica (eventos, validaciones, flujos). Responde a acciones (click, input, etc.). Manejo completo de eventos, interacción fluida y sin errores. | Manejo adecuado con pequeños fallos. | Interacción básica limitada. | Interacción deficiente o inconsistente. | No hay interacción funcional. |
| **Componentes y Reutilización** | 6.66% | Implementación de componentes reutilizables. | Divide la interfaz en partes reutilizables. Código modular, reutilizable y bien organizado. | Buena organización con cierta reutilización. | Organización básica, poca reutilización. | Código repetitivo y desorganizado. | No hay estructura modular. |

---

## 3. Co-evaluación del Equipo

La siguiente tabla se utilizará para la **co-evaluación entre compañeros** del equipo:

| Criterio | ITEM | Habilidad Procedimental Evaluada | Evidencia para MB | MB (100%) | BD (80%) | DA (60%) | DI (30%) | DN (0%) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **2. Trabajo en equipo** | Participación activa en el equipo | Participar activamente en las tareas del equipo, aportando ideas, opiniones y trabajo concreto. Asumir responsabilidad personal sobre las tareas comprometidas. | Registros o informes de avances muestran que el estudiante aporta entregables concretos (código, documentación, maquetas, pruebas) dentro de los plazos acordados. En autoevaluaciones y coevaluaciones, los compañeros identifican su participación como constante y significativa. | Participa de forma constante y proactiva en todas las actividades del equipo, aporta entregables de calidad y cumple siempre con los plazos acordados; su contribución es claramente reconocida por sus compañeros. | Participa regularmente y cumple la mayoría de los compromisos; sus entregables son adecuados y solo presenta retrasos menores o aislados que no afectan significativamente al equipo. | Participa de manera intermitente; cumple con parte de las tareas asignadas, pero requiere recordatorios o presenta retrasos que obligan al equipo a ajustar su planificación. | Su participación es baja o irregular; frecuentemente no entrega o entrega muy tarde sus tareas, generando sobrecarga o problemas evidentes para el resto del equipo. | No participa en las actividades del equipo ni entrega las tareas comprometidas; su ausencia obliga al equipo a redistribuir completamente su trabajo. |
| **2. Trabajo en equipo** | Comunicación efectiva dentro del equipo | Comunicar de forma clara, respetuosa y oportuna con los integrantes del equipo, utilizando los canales definidos (reuniones, repositorios, mensajería, actas). Compartir información relevante sobre avances, problemas y decisiones técnicas. | El estudiante documenta sus avances en los medios acordados (commits con mensajes claros, comentarios en issues, actas de reunión, chats de trabajo). Sus compañeros reconocen que informa a tiempo sobre dificultades y coordina con el equipo antes de tomar decisiones que impactan el trabajo conjunto. | Se comunica de forma clara, respetuosa y oportuna; informa sistemáticamente sus avances y dificultades, documenta adecuadamente en los canales definidos y facilita la coordinación del equipo. | Mantiene una comunicación generalmente clara y respetuosa; informa la mayoría de sus avances y problemas, con pocas omisiones que no generan grandes dificultades al equipo. | Se comunica, pero de forma irregular o incompleta; a veces omite informar retrasos o decisiones, lo que genera cierta descoordinación o malentendidos dentro del equipo. | Rara vez informa adecuadamente sus avances o dificultades; su comunicación es poco clara o tardía, provocando problemas de coordinación y confusión entre los compañeros. | No utiliza los canales de comunicación del equipo ni informa su estado de trabajo; su falta de comunicación impide al equipo planificar y coordinarse. |
| **2. Trabajo en equipo** | Colaboración y apoyo a los compañeros | Colaborar con otros miembros del equipo, ofreciendo ayuda técnica o logística cuando es necesario. Compartir conocimientos y buenas prácticas para mejorar el trabajo colectivo. | El estudiante participa en actividades de revisión de código, apoyo en problemas técnicos, o acompañamiento a compañeros en tareas específicas (pair programming, revisión de maquetas, pruebas conjuntas). Los registros de trabajo muestran que aporta sugerencias constructivas y ayuda a resolver problemas del equipo. | Colabora activamente con sus compañeros, ofrece ayuda técnica y comparte conocimientos sin que se lo pidan; participa en revisiones, brinda retroalimentación constructiva y contribuye a mejorar el resultado colectivo. | Apoya a sus compañeros cuando se le solicita y participa en algunas actividades de colaboración (revisiones, ayudas puntuales), mostrando disposición positiva y respeto. | Colabora de forma limitada o esporádica; ofrece ayuda solo en ocasiones y su participación en actividades de apoyo es más bien reactiva que proactiva. | Muestra poca disposición a colaborar; evita asumir tareas de apoyo y rara vez participa en revisiones o en la solución conjunta de problemas. | No colabora con sus compañeros, rechaza o ignora solicitudes de ayuda y su actitud afecta negativamente el clima de trabajo del equipo. |
| **2. Trabajo en equipo** | Gestión de roles, responsabilidades y compromisos | Asumir y cumplir el rol asignado dentro del equipo (encargado de frontend, documentación, pruebas, integrador). Planificar y gestionar sus tareas personales en coherencia con la planificación global del equipo. | El estudiante cumple con las tareas que se le asignaron en el cronograma (tablero Kanban, plan de trabajo, acta de roles) y registra su avance. No se observan retrasos recurrentes atribuibles a su falta de gestión. | Asume claramente su rol dentro del equipo, organiza sus tareas de acuerdo al plan de trabajo y cumple rigurosamente sus compromisos; se adapta responsablemente a cambios de rol o prioridades. | Conoce su rol y, en general, cumple con sus responsabilidades; presenta algunos ajustes menores de planificación, pero los comunica y gestiona adecuadamente con el equipo. | Entiende su rol, pero su gestión de tareas es irregular; a veces pierde de vista prioridades o plazos y requiere supervisión o apoyo adicional para organizar su trabajo. | Tiene dificultades para asumir o mantener su rol; frecuentemente incumple compromisos o desatiende tareas sin coordinar con el equipo, afectando la ejecución del plan. | No asume un rol definido ni se responsabiliza de tareas concretas; su falta de gestión de compromisos impide que el equipo confíe en su participación. |
| **2. Trabajo en equipo** | Resolución de conflictos y respeto de protocolos profesionales | Manejar desacuerdos y conflictos de manera profesional, respetando las opiniones del resto del equipo. Aplicar los protocolos y procedimientos establecidos para la toma de decisiones y la resolución de problemas. | En situaciones de desacuerdo, el estudiante participa de forma respetuosa, argumentando en base a criterios técnicos y aceptando acuerdos del grupo. No se registran conductas disruptivas o faltas de respeto. | Maneja desacuerdos de forma madura y profesional; escucha, argumenta en base a criterios técnicos, respeta las decisiones del grupo y contribuye activamente a encontrar soluciones consensuadas. | Generalmente respeta a sus compañeros y los acuerdos del equipo; en situaciones de conflicto mantiene una actitud adecuada, aunque ocasionalmente requiere orientación para canalizar sus opiniones. | Acepta los acuerdos del equipo, pero muestra dificultades ocasionales para manejar el desacuerdo; respeta los protocolos de forma parcial. | Maneja mal los conflictos, se involucra en discusiones poco constructivas o ignora los acuerdos establecidos; su respeto por los protocolos profesionales es limitado. | No respeta a sus compañeros ni los protocolos del curso; genera o agrava conflictos y sabotea las decisiones del equipo. |

---

## 4. Caso Propuesto y Requerimientos Funcionales

**Caso:** *"Sistema Web de Reserva de Salas de Estudio para una Biblioteca Universitaria"*

**Contexto:** La biblioteca de una universidad necesita una aplicación web que permita a los estudiantes consultar y reservar salas de estudio. Actualmente las reservas se gestionan manualmente mediante una planilla, generando conflictos de horarios y poca visibilidad de la disponibilidad. El objetivo es desarrollar una aplicación web frontend que permita visualizar las salas disponibles, filtrar información y realizar reservas simuladas utilizando HTML5, CSS3 y JavaScript (Angular).

| ID | Requerimiento | Descripción Detallada |
| :--- | :--- | :--- |
| **RF01** | **Página Principal** | Debe contener: Logo de la biblioteca, menú de navegación, información general, sección de salas disponibles, panel lateral con avisos importantes y pie de página institucional. |
| **RF02** | **Visualización de Salas** | Mostrar dinámicamente un conjunto de salas. Cada sala debe contener: nombre, capacidad, ubicación, horario disponible, imagen representativa y botón Reservar. |
| **RF03** | **Filtrado de Salas** | El usuario podrá filtrar salas según: Todas, Hasta 4 personas, Hasta 8 personas, Más de 8 personas, y Fecha (día de consulta). |
| **RF04** | **Mostrar Reservas de Salas** | Al seleccionar una sala y un día específico (fecha): mostrar el listado de reservas, la información de cada reserva y actualizar un contador de reservas realizadas. |
| **RF05** | **Formulario de Solicitud de Reserva** | Permitir: buscar/filtrar estudiante registrado, seleccionar fecha, seleccionar horario, agregar observaciones. Validaciones obligatorias: estudiante debe existir, todos los campos requeridos, correo válido, fecha no anterior al día actual, no se puede reservar horario ya reservado (a menos que esté cancelada), observaciones mínimo 15 caracteres. |

---

## 5. Modelo Entidad Relación (MER)

### Tabla: CARRERA
| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| id | INT | PK |
| nombre_carrera | VARCHAR(100) | NOT NULL |
| facultad | VARCHAR(100) | NOT NULL |

### Tabla: ESTUDIANTE
| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| id | INT | PK |
| rut | VARCHAR(12) | UNIQUE |
| nombre | VARCHAR(100) | NOT NULL |
| apellido | VARCHAR(100) | NOT NULL |
| correo | VARCHAR(150) | UNIQUE |
| telefono | VARCHAR(20) | |
| fecha_registro | DATE | NOT NULL |
| id_carrera | INT | FK → CARRERA |

### Tabla: EDIFICIO
| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| id | INT | PK |
| nombre_edificio | VARCHAR(100) | NOT NULL |
| direccion | VARCHAR(200) | NOT NULL |

### Tabla: SALA
| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| id | INT | PK |
| codigo_sala | VARCHAR(20) | UNIQUE |
| nombre_sala | VARCHAR(100) | NOT NULL |
| capacidad | INT | NOT NULL |
| piso | INT | NOT NULL |
| descripcion | VARCHAR(255) | NOT NULL |
| estado | VARCHAR(30) | NOT NULL |
| id_edificio | INT | FK → EDIFICIO |

### Tabla: HORARIO_DISPONIBLE
| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| id | INT | PK |
| id_sala | INT | FK → SALA |
| hora_inicio | TIME | NOT NULL |
| hora_termino | TIME | NOT NULL |

### Tabla: ESTADO_RESERVA
| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| id_estado | INT | PK |
| nombre_estado | VARCHAR(30) | NOT NULL |

### Tabla: RESERVA
| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| id | INT | PK |
| fecha_reserva | DATE | NOT NULL |
| observacion | VARCHAR(255) | NOT NULL |
| fecha_creacion | DATETIME | NOT NULL |
| id_estudiante | INT | FK → ESTUDIANTE |
| id_sala | INT | FK → SALA |
| id_horario | INT | FK → HORARIO_DISPONIBLE |
| id_estado | INT | FK → ESTADO_RESERVA |

---

## 6. Requerimientos Técnicos del Desarrollo

### 6.1 HTML
La página debe utilizar obligatoriamente las siguientes etiquetas semánticas:
```html
<header> <nav> <main> <section> <article> <aside> <footer>
<h1> <h2> <h3> <p> <ul> <li>
```

### 6.2 CSS
| Técnica | Aplicación |
| :--- | :--- |
| **Flexbox** | Menú de navegación, Tarjetas de salas |
| **CSS Grid** | Layout principal |
| **Media Queries** | Escritorio (>1024px), Tablet (768-1023px), Móvil (<768px) |

**Comportamiento Responsive:**
- Al reducir la pantalla: menú pasa a vertical, salas pasan a una sola columna, sidebar se ubica debajo del contenido principal.

### 6.3 Accesibilidad
- Uso correcto de `labels` en formularios.
- Texto alternativo (`alt`) en todas las imágenes.
- Orden lógico de tabulación.
- Contraste adecuado de colores.
- Navegación comprensible mediante teclado.

### 6.4 Frontend (Angular)
| Componente Reutilizable | Función |
| :--- | :--- |
| **SalaComponent** | Genera dinámicamente cada tarjeta de sala |
| **MenuNavComponent** | Construye la navegación (responsive) |
| **MensajeComponent** | Muestra errores o confirmaciones |

### 6.5 Backend (Spring Boot)
- **Persistencia:** Hibernate con relaciones 1:1, 1:N, M:N.
- **Consultas:** Querys objetales (JPQL) y nativas.
- **Base de datos:** PostgreSQL 13.23.

---

## 7. Instrucciones de Entrega

1. El equipo debe crear un repositorio en GitHub llamado `ICIFG003-SOL2-EQUIPO?`, invitando a `leoehernandezv` como colaborador.
2. El equipo debe crear un proyecto asociado al repositorio en GitHub de tipo **Kanban** y gestionar el proyecto mediante este tablero.
3. El proyecto se presentará el **viernes 12 de junio de 2026** en hora de clases. Se realizará un clon en directo para la evaluación.
4. El backend debe implementarse en Spring Boot utilizando el MER indicado, con persistencia Hibernate y relaciones 1:1, 1:N, M:N, querys objetales y nativas. La base de datos es PostgreSQL y debe existir un script con datos de prueba para cada tabla.
5. El frontend debe implementarse en Angular.
6. La estructura de directorios y `README.md` en el repositorio debe ser similar a la utilizada en el Control de Proyecto #2.

---

## 8. Plan de Trabajo (Backlog Sugerido)

### Sprint 2 — 30 May – 2 Jun
| # | Tarea | Área | Prioridad |
| :--- | :--- | :--- | :--- |
| 1 | Configurar conexión Spring Boot ↔ PostgreSQL (`application.properties`) | BE/DB | Alta |
| 2 | Crear entidades JPA con relaciones Hibernate y Lombok | BE | Alta |
| 3 | Diseñar y crear script DDL (`01_schema.sql`) | DB | Alta |
| 4 | Crear script de datos de prueba (`02_seed.sql`) | DB | Alta |

### Sprint 3 — 3–5 Jun
| # | Tarea | Área | Prioridad |
| :--- | :--- | :--- | :--- |
| 5 | Crear Repositories, Services y Controllers (CRUD base + DTOs + CORS) | BE | Alta |
| 6 | Implementar queries objetales (JPQL) y nativas (@Query) | BE | Media |
| 7 | Endpoint POST /api/reservas con validaciones de negocio | BE | Alta |

### Sprint 4 — 6–8 Jun
| # | Tarea | Área | Prioridad |
| :--- | :--- | :--- | :--- |
| 8 | Crear servicios Angular (HttpClient) y modelos TypeScript | FE | Alta |
| 9 | Componente reutilizable: TarjetaSalaComponent (@Input/@Output) | FE | Media |
| 10 | Componente reutilizable: MenuNavComponent (responsive hamburguesa) | FE | Media |
| 11 | Componente reutilizable: MensajeComponent (auto-cierre 4s) | FE | Media |
| 12 | Página principal: HTML semántico + CSS Grid + Media Queries | FE | Alta |

### Sprint 5 — 9–10 Jun
| # | Tarea | Área | Prioridad |
| :--- | :--- | :--- | :--- |
| 13 | RF02+RF03: Visualización y filtrado de salas (API + *ngFor/*ngIf) | FE | Alta |
| 14 | RF04: Listado de reservas por sala y fecha (tabla + contador) | FE | Alta |
| 15 | RF05: Formulario de solicitud de reserva (Reactive Forms + validaciones) | FE | Alta |
| 16 | Pruebas de integración, accesibilidad (a11y), responsive 3 breakpoints, correcciones finales | TEAM | Alta |

---

## 9. Criterios de Aceptación (Resumen MB)

Para obtener **Muy Buen Desempeño (100% / Nota 7.0)**, el equipo debe cumplir con:

### Diseño Web y Frontend
- **Estructura Semántica:** Uso completo y correcto de etiquetas HTML5 y jerarquía de títulos lógica.
- **Accesibilidad:** Implementación consistente de `alt`, `labels`, orden de tabulación y contraste.
- **Layout:** Uso efectivo de Flexbox (menú/tarjetas) y CSS Grid (layout principal) sin errores.
- **Responsive:** Adaptabilidad total en Escritorio, Tablet y Móvil mediante media queries.
- **Lógica Frontend:** Manipulación dinámica del DOM, eventos robustos y componentes reutilizables.

### Trabajo en Equipo
- **Participación:** Aportes constantes y entregables de calidad dentro de los plazos.
- **Comunicación:** Documentación clara en repositorio y uso del Kanban.
- **Colaboración:** Apoyo técnico proactivo entre compañeros.
- **Gestión:** Cumplimiento riguroso del rol asignado.
- **Resolución de Conflictos:** Manejo maduro de desacuerdos técnicos.


algunas extras: ver si estan o no en github proyects:


Configurar conexión Spring Boot ↔ PostgreSQL
application.properties: datasource url, username, password, driver. JPA: hibernate.ddl-auto=validate, show-sql=true, dialect=PostgreSQL. Verificar que Hibernate levanta sin errores contra el schema creado. Archivo: /backend/src/main/resources/application.properties.
BE
DB
V
Crear entidades JPA con relaciones Hibernate
Clases: Carrera, Edificio, Sala (@ManyToOne Edificio), Estudiante (@ManyToOne Carrera), HorarioDisponible (@ManyToOne Sala), EstadoReserva, Reserva (@ManyToOne Estudiante, Sala, HorarioDisponible, EstadoReserva). Anotaciones: @Entity, @Table, @Id, @GeneratedValue, @Column, @ManyToOne, @OneToMany, @JoinColumn. Usar Lombok @Data @NoArgsConstructor @AllArgsConstructor.
BE
V
Sprint 3 — 3–5 Jun
0/4 tareas
Crear repositories, services y controllers (CRUD base)
Por cada entidad: interface XRepository extends JpaRepository. Service con lógica de negocio. Controller @RestController @RequestMapping("/api/...") con endpoints GET/POST/PUT/DELETE. Configurar CORS para Angular (localhost:4200). DTOs para request y response.
BE
V
Implementar queries objetales y nativas
JPQL: findByCapacidadLessThanEqual, findBySalaAndFechaReserva, findByEstadoReserva. Nativas (@Query nativeQuery=true): disponibilidad de sala por fecha/horario, listado de reservas con JOIN a estudiante+sala+estado. Mínimo 3 queries objetales y 2 nativas documentadas.
BE
J
Endpoint de reserva con validaciones de negocio
POST /api/reservas: validar que fecha ≥ hoy, que horario no esté reservado en estado Confirmada para esa sala+fecha, que estudiante exista, observacion ≥ 15 chars, correo válido. Retornar errores descriptivos 400/409. Actualizar contador.
BE
J
Crear servicios Angular y modelos TypeScript
Interfaces: Sala, Estudiante, Reserva, Horario, EstadoReserva. Servicios HttpClient: SalaService, ReservaService, EstudianteService con métodos getAll(), getById(), create(), filtrarPorCapacidad(). Configurar HttpClientModule y environment con baseUrl.
FE
L
Sprint 4 — 6–8 Jun
0/4 tareas
Componente reutilizable: TarjetaSalaComponent
Input: @Input() sala: Sala. Muestra nombre, capacidad, ubicación, horario, imagen representativa, botón Reservar. Emite @Output() reservar: EventEmitter. Accesibilidad: alt en imagen, aria-label en botón. Usar en grid de salas con *ngFor.
FE
L
Componente reutilizable: MenuNavComponent
@Input() links: NavLink[]. Construye navegación con RouterLink. Responsive: en móvil (<768px) pasa a vertical con menú hamburguesa. Uso de Flexbox. aria-nav, tabulación lógica.
FE
X
Componente reutilizable: MensajeComponent
@Input() tipo: "error"|"exito"|"info". @Input() mensaje: string. Muestra alert con ícono y estilo diferenciado. Temporizador de auto-cierre 4s. @Output() cerrar: EventEmitter. Para validaciones del formulario y confirmaciones de reserva.
FE
X
Página principal: HTML semántico y layout CSS Grid
Estructura obligatoria:
logo+título,
menú,
con
salas +
avisos,
institucional. CSS Grid para layout principal (header/nav/main+aside/footer). Flexbox para nav y tarjetas. Media queries: >1024px escritorio, 768-1023px tablet, <768px móvil (menú vertical, salas 1 col, aside debajo).
FE
L
Sprint 5 — 9–10 Jun
0/4 tareas
RF02+RF03: Visualización y filtrado de salas
Renderizado dinámico desde API. Filtros: Todas / ≤4 personas / ≤8 personas / >8 personas / Fecha. Manipulación DOM con Angular: *ngFor, *ngIf, pipes. Botón Reservar activa formulario de RF05. Sin recarga de página.
FE
L
RF04: Listado de reservas por sala y fecha
Al seleccionar sala + fecha: llamar a API GET /api/reservas?sala=&fecha=. Mostrar tabla: Sala / Nº Reserva / Inicio / Fin / Estado. Actualizar contador dinámico "Reservas realizadas: N". Manejo de estado vacío.
FE
X
RF05: Formulario de solicitud de reserva
Campos: buscador estudiante (autocomplete desde API), fecha, selector horario disponible (se carga según sala+fecha), observaciones. Validaciones Angular Reactive Forms: estudiante existe, todos campos requeridos, correo válido, fecha ≥ hoy, horario libre, observación ≥ 15 chars. Mostrar MensajeComponent en éxito/error.
FE
J
Pruebas de integración y correcciones finales
Probar flujo completo: listar salas → filtrar → ver reservas → crear reserva → ver reserva creada. Verificar responsive en 3 breakpoints. Validar estructura HTML semántica. Revisar accesibilidad: alt, labels, tabulación. Corregir bugs. Actualizar README con pasos de ejecución.
TEAM
VJLX