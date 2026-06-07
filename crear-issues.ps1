# Script: Crear los 16 issues del proyecto en GitHub
# Repositorio: PoshuaDev-hub/ICIFG003-SOL2-EQUIPO6
# Uso: Ejecutar desde PowerShell con gh CLI instalado y autenticado

$REPO = "PoshuaDev-hub/ICIFG003-SOL2-EQUIPO6"

Write-Host "== Creando etiquetas ==" -ForegroundColor Cyan

gh label create "backend"       --color "0075ca" --description "Tareas del backend Spring Boot"  --repo $REPO 2>$null
gh label create "database"      --color "e4e669" --description "Tareas de base de datos"          --repo $REPO 2>$null
gh label create "frontend"      --color "d93f0b" --description "Tareas del frontend Angular"      --repo $REPO 2>$null
gh label create "testing"       --color "0e8a16" --description "Pruebas y QA"                     --repo $REPO 2>$null
gh label create "documentation" --color "1d76db" --description "Documentacion del proyecto"       --repo $REPO 2>$null
gh label create "sprint-2"      --color "bfd4f2" --description "Sprint 2"                         --repo $REPO 2>$null
gh label create "sprint-3"      --color "bfd4f2" --description "Sprint 3"                         --repo $REPO 2>$null
gh label create "sprint-4"      --color "bfd4f2" --description "Sprint 4"                         --repo $REPO 2>$null
gh label create "sprint-5"      --color "bfd4f2" --description "Sprint 5"                         --repo $REPO 2>$null

Write-Host "Etiquetas listas." -ForegroundColor Green
Write-Host ""
Write-Host "== Creando issues ==" -ForegroundColor Cyan

# --- ISSUE 1 ---
$body = @'
**Objetivo:** Configurar el proyecto Spring Boot para que se conecte correctamente a la base de datos PostgreSQL local.

**Tareas a realizar:**
- [x] Editar `backend/src/main/resources/application.properties`
- [x] Agregar credenciales y URL JDBC de PostgreSQL.
- [x] Configurar JPA (`hibernate.ddl-auto=validate`, `show-sql=true`, dialecto).
- [x] Verificar que la aplicacion levante sin arrojar errores de conexion.
'@
gh issue create --repo $REPO --title "Issue 1: [Sprint 2] Configurar conexion Spring Boot - PostgreSQL" --body $body --label "backend,sprint-2,enhancement" --assignee "PoshuaDev-hub"
Write-Host "Issue 1 creado." -ForegroundColor Green

# --- ISSUE 2 ---
$body = @'
**Objetivo:** Construir el modelo relacional fisico en la base de datos de acuerdo al MER especificado.

**Tareas a realizar:**
- [x] Crear el archivo `database/01_schema.sql`.
- [x] Implementar la creacion de tablas: `CARRERA`, `ESTUDIANTE`, `EDIFICIO`, `SALA`, `HORARIO_DISPONIBLE`, `ESTADO_RESERVA`, `RESERVA`.
- [x] Anadir llaves primarias y foraneas correspondientes.
- [x] Incluir restricciones `NOT NULL`, `UNIQUE` y tipos de dato segun la rubrica.
'@
gh issue create --repo $REPO --title "Issue 2: [Sprint 2] Disenar y crear script DDL (01_schema.sql)" --body $body --label "database,sprint-2,enhancement" --assignee "SubaruDev0"
Write-Host "Issue 2 creado." -ForegroundColor Green

# --- ISSUE 3 ---
$body = @'
**Objetivo:** Poblar la base de datos con informacion base para poder desarrollar y testear el sistema.

**Tareas a realizar:**
- [x] Crear el archivo `database/02_seed.sql`.
- [x] Insertar al menos 3 carreras y 5 estudiantes (con RUT y correos validos).
- [x] Insertar 1-2 edificios y al menos 5 salas de estudio.
- [x] Insertar horarios disponibles por sala y estados ("Confirmada", "Cancelada").
- [x] Insertar algunas reservas iniciales para las pruebas.
'@
gh issue create --repo $REPO --title "Issue 3: [Sprint 2] Crear script de datos de prueba (02_seed.sql)" --body $body --label "database,sprint-2,enhancement" --assignee "L0OKASS"
Write-Host "Issue 3 creado." -ForegroundColor Green

# --- ISSUE 4 ---
$body = @'
**Objetivo:** Mapear el modelo de base de datos a objetos de Java usando JPA y simplificar el codigo con Lombok.

**Tareas a realizar:**
- [x] Crear paquetes `model` o `entity`.
- [x] Crear clases Java para cada tabla del MER (Carrera, Estudiante, etc.).
- [x] Configurar anotaciones `@Entity`, `@Table`, `@Id`, `@GeneratedValue`.
- [x] Implementar relaciones usando `@ManyToOne` y `@OneToMany`.
- [x] Integrar Lombok con `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`.
'@
gh issue create --repo $REPO --title "Issue 4: [Sprint 2] Crear entidades JPA con relaciones y Lombok" --body $body --label "backend,sprint-2,enhancement" --assignee "vvalenzuelac"
Write-Host "Issue 4 creado." -ForegroundColor Green

# --- ISSUE 5 ---
$body = @'
**Objetivo:** Crear la capa de acceso a datos y la logica de negocio base.

**Tareas a realizar:**
- [x] Crear interfaces `Repository` extendiendo de `JpaRepository` para las entidades clave.
- [x] Crear clases `Service` con anotacion `@Service`.
- [x] Implementar metodos base en los servicios (ej. `findAll()`, `findById()`, `save()`).
'@
gh issue create --repo $REPO --title "Issue 5: [Sprint 3] Crear Repositories y Services (CRUD base)" --body $body --label "backend,sprint-3,enhancement" --assignee "vvalenzuelac"
Write-Host "Issue 5 creado." -ForegroundColor Green

# --- ISSUE 6 ---
$body = @'
**Objetivo:** Exponer la API REST para que el frontend pueda consumirla.

**Tareas a realizar:**
- [x] Crear los DTOs necesarios (ej. `ReservaRequestDTO`, `SalaResponseDTO`).
- [x] Implementar `Controllers` (`@RestController`, `@RequestMapping`).
- [x] Exponer los Endpoints base (GET salas, GET estudiantes, etc.).
- [x] Configurar CORS (`@CrossOrigin`) para permitir peticiones desde `localhost:4200`.
'@
gh issue create --repo $REPO --title "Issue 6: [Sprint 3] Crear Controllers y DTOs (Endpoints y CORS)" --body $body --label "backend,sprint-3,enhancement" --assignee "vvalenzuelac"
Write-Host "Issue 6 creado." -ForegroundColor Green

# --- ISSUE 7 ---
$body = @'
**Objetivo:** Desarrollar las consultas especificas necesarias para los requerimientos del frontend.

**Tareas a realizar:**
- [x] Implementar minimo 3 queries objetales (JPQL) en los repositorios (Ej. `findByCapacidadLessThanEqual`).
- [x] Implementar minimo 2 queries nativas (`@Query(nativeQuery=true)`). Ejemplo: disponibilidad de sala y lista de reservas unida al estudiante.
- [x] Documentar o comentar que requerimiento suple cada query.
'@
gh issue create --repo $REPO --title "Issue 7: [Sprint 3] Implementar queries objetales (JPQL) y nativas" --body $body --label "backend,sprint-3,enhancement" --assignee "PoshuaDev-hub"
Write-Host "Issue 7 creado." -ForegroundColor Green

# --- ISSUE 8 ---
$body = @'
**Objetivo:** Proveer el endpoint de creacion de reserva aplicando todas las reglas de negocio estrictas.

**Tareas a realizar:**
- [x] Desarrollar logica en `ReservaService` para el metodo de crear reserva.
- [x] Validar que la fecha sea >= hoy.
- [x] Validar que el horario no este ya reservado (y en estado Confirmada).
- [x] Validar que el estudiante exista en la DB.
- [x] Validar que la observacion tenga >= 15 caracteres.
- [x] Retornar codigo HTTP correcto (ej. 400 Bad Request o 409 Conflict) con mensaje descriptivo si falla.
'@
gh issue create --repo $REPO --title "Issue 8: [Sprint 3] Endpoint POST /api/reservas con validaciones" --body $body --label "backend,sprint-3,enhancement" --assignee "SubaruDev0"
Write-Host "Issue 8 creado." -ForegroundColor Green

# --- ISSUE 9 ---
$body = @'
**Objetivo:** Configurar la conexion base en el frontend para comunicarse con la API de Spring Boot.

**Tareas a realizar:**
- [x] Configurar `environment.ts` con la URL base del backend.
- [x] Importar y configurar `HttpClientModule`.
- [x] Crear interfaces TypeScript (`Sala`, `Estudiante`, `Reserva`, `Horario`).
- [x] Crear los servicios Angular (`SalaService`, `ReservaService`, `EstudianteService`).
'@
gh issue create --repo $REPO --title "Issue 9: [Sprint 4] Crear servicios Angular (HttpClient) e Interfaces TS" --body $body --label "frontend,sprint-4,enhancement" --assignee "L0OKASS"
Write-Host "Issue 9 creado." -ForegroundColor Green

# --- ISSUE 10 ---
$body = @'
**Objetivo:** Crear la estructura y diseno general de la pagina principal segun las normativas de HTML5 y CSS Grid.

**Tareas a realizar:**
- [x] En `app.component.html`, utilizar etiquetas semanticas obligatorias: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- [x] Implementar **CSS Grid** para el Layout principal.
- [x] Implementar Media Queries para Escritorio (>1024px), Tablet (768-1023px) y Movil (<768px).
- [x] Asegurar que el aside pase debajo del contenido principal en movil.
'@
gh issue create --repo $REPO --title "Issue 10: [Sprint 4] Pagina principal: Layout CSS Grid y Semantica HTML" --body $body --label "frontend,sprint-4,enhancement" --assignee "PoshuaDev-hub"
Write-Host "Issue 10 creado." -ForegroundColor Green

# --- ISSUE 11 ---
$body = @'
**Objetivo:** Crear el componente visual que muestra la informacion individual de una sala.

**Tareas a realizar:**
- [x] Generar el componente `tarjeta-sala`.
- [x] Usar `@Input()` para recibir los datos de la sala.
- [x] Usar `@Output()` para emitir el evento del boton "Reservar".
- [x] Aplicar diseno con **Flexbox**.
- [x] Asegurar accesibilidad (atributo `alt` en la imagen, `aria-label` en el boton).
'@
gh issue create --repo $REPO --title "Issue 11: [Sprint 4] Componente reutilizable: TarjetaSalaComponent" --body $body --label "frontend,sprint-4,enhancement" --assignee "SubaruDev0"
Write-Host "Issue 11 creado." -ForegroundColor Green

# --- ISSUE 12 ---
$body = @'
**Objetivo:** Desarrollar los componentes modulares para navegacion y retroalimentacion del sistema.

**Tareas a realizar:**
- [x] Generar componente `menu-nav` usando Flexbox, con version responsiva (hamburguesa en movil).
- [x] Generar componente `mensaje` para alertas de exito o error.
- [x] Configurar el `mensaje` para que se cierre automaticamente tras 4 segundos.
'@
gh issue create --repo $REPO --title "Issue 12: [Sprint 4] Componentes reutilizables: MenuNavComponent y MensajeComponent" --body $body --label "frontend,sprint-4,enhancement" --assignee "L0OKASS"
Write-Host "Issue 12 creado." -ForegroundColor Green

# --- ISSUE 13 ---
$body = @'
**Objetivo:** Mostrar dinamicamente las salas y permitir buscar por capacidad y fecha.

**Tareas a realizar:**
- [ ] En el componente principal, consumir `SalaService` para obtener la lista.
- [ ] Renderizar las salas iterando con `*ngFor` usando `<app-tarjeta-sala>`.
- [ ] Crear los filtros UI (botones o select) para capacidad y un Datepicker para fecha.
- [ ] Implementar logica en Angular para filtrar la lista mostrada en pantalla.
'@
gh issue create --repo $REPO --title "Issue 13: [Sprint 5] Visualizacion y filtrado de salas (RF02 y RF03)" --body $body --label "frontend,sprint-5,enhancement" --assignee "PoshuaDev-hub"
Write-Host "Issue 13 creado." -ForegroundColor Green

# --- ISSUE 14 ---
$body = @'
**Objetivo:** Construir el formulario para registrar nuevas reservas con todas sus validaciones en tiempo real.

**Tareas a realizar:**
- [ ] Usar **Reactive Forms** de Angular para construir el formulario.
- [ ] Crear autocompletado o buscador para el estudiante.
- [ ] Cargar los horarios disponibles dinamicamente segun la sala elegida.
- [ ] Aplicar validaciones frontend (requeridos, correo, minimo 15 caracteres).
- [ ] Enviar datos a la API e invocar `MensajeComponent` con el resultado.
'@
gh issue create --repo $REPO --title "Issue 14: [Sprint 5] Formulario de solicitud de reserva (RF05)" --body $body --label "frontend,sprint-5,enhancement" --assignee "SubaruDev0"
Write-Host "Issue 14 creado." -ForegroundColor Green

# --- ISSUE 15 ---
$body = @'
**Objetivo:** Mostrar las reservas existentes al consultar una sala en un dia especifico.

**Tareas a realizar:**
- [ ] Crear un panel/tabla que se active al seleccionar una fecha y una sala.
- [ ] Llamar al API para obtener las reservas de ese cruce.
- [ ] Mostrar Sala, N Reserva, Inicio, Fin, y Estado.
- [ ] Mantener un contador dinamico "Reservas realizadas: N".
'@
gh issue create --repo $REPO --title "Issue 15: [Sprint 5] Listado de reservas por sala (RF04)" --body $body --label "frontend,sprint-5,enhancement" --assignee "L0OKASS"
Write-Host "Issue 15 creado." -ForegroundColor Green

# --- ISSUE 16 ---
$body = @'
**Objetivo:** Garantizar que el sistema cumpla con el 100% de la rubrica y este listo para entrega.

**Tareas a realizar:**
- [ ] Probar el flujo completo desde el navegador.
- [ ] Verificar adaptabilidad responsiva en los 3 breakpoints solicitados (F12 > Device Toolbar).
- [ ] Auditar accesibilidad (uso de `labels`, `alt`, tabulacion con teclado).
- [ ] Completar el archivo `README.md` del repositorio con instrucciones de compilacion y pruebas.
- [ ] Preparar repositorio para el clon en directo del viernes.
'@
gh issue create --repo $REPO --title "Issue 16: [Sprint 5] Pruebas globales, Accesibilidad y Readme" --body $body --label "testing,sprint-5,documentation" --assignee "vvalenzuelac"
Write-Host "Issue 16 creado." -ForegroundColor Green

Write-Host ""
Write-Host "== Todos los issues creados ==" -ForegroundColor Cyan
Write-Host "Visita: https://github.com/$REPO/issues" -ForegroundColor Yellow
