# U3-E01 — Especificación de requisitos TecConect (A–I)

**Institución:** Instituto Tecnológico Superior de San Pedro de las Colonias  
**Carrera / grupo:** Ingeniería en Sistemas Computacionales · 5A  
**Asignatura:** Fundamentos de Ingeniería de Software  
**Docente:** Ruth Aivi Chávez Rodríguez  
**Equipo:** EQ06  
**Proyecto:** **TecConect — Sistema de gestión de préstamos y devoluciones de equipos TIC**  
**Versión:** Final · **Entrega U3-E01 — especificación unificada**  
**Fecha:** 17 de noviembre de 2026  
**Repositorio:** https://github.com/JonathanRdzzz/fis-2026-e03-TecConect

> **Alcance y control documental.** La presente versión integra el catálogo final de **seis requisitos funcionales y dos no funcionales** del módulo de préstamos y devoluciones de equipos TIC. RF-01, RF-02, RNF-01 y RNF-02 corresponden a Jonathan Alfredo Rodríguez Ramírez; RF-03 a RF-06 corresponden a Erick Martínez Rocha. El prototipo HTML/CSS/JavaScript fue revisado estáticamente. Los controles de seguridad y la meta de rendimiento son requisitos especificados, **no funcionalidades verificadas**. No se afirman entrevistas, políticas institucionales aprobadas, pruebas ejecutadas ni aportaciones sin evidencia.

## A. Equipo, roles y aportaciones

| Integrante | Rol documentado en este trabajo | Aportación identificada | Observación |
|---|---|---|---|
| Jonathan Alfredo Rodríguez Ramírez | Análisis | RF-01, RF-02, RNF-01 y RNF-02: catálogo, preparación del préstamo, seguridad y rendimiento | Requisitos integrados en la especificación final |
| Erick Martínez Rocha | Desarrollo | RF-03, RF-04, RF-05 y RF-06, centrados en préstamos y devoluciones | Basados en su aporte individual |
| Alexis Rubio Galván | Calidad y Documentacion | No se recibió evidencia para este documento | No se atribuyen actividades |
| Yahir Alejandro Vázquez Maciel | Coordinacion | No se recibió evidencia para este documento | No se atribuyen actividades |

**Delimitación de esta entrega:** el sistema estudiado es el control de equipos TIC: consulta de disponibilidad, solicitud o selección de recursos, validación, registro de entrega, devolución, historial y protección de datos. Horarios, kardex y anuncios **quedan fuera del alcance de esta versión**; no se afirma que estén implementados. Este es el alcance definido para el entregable U3-E01.

**Riesgo de evaluación:** la guía U3 solicita dos requisitos individuales por integrante. El catálogo identifica cuatro requisitos de Jonathan y cuatro de Erick; esta versión no atribuye aportaciones a integrantes sin evidencia. La distribución individual de la guía no queda acreditada por este catálogo.

## B. Investigación y fuentes

### B1. Contexto y método

El documento *U2-E01: Modelo de negocio de TecConect* describe la intención general de mejorar servicios estudiantiles y desarrolla de manera específica un flujo **AS-IS/TO-BE de préstamo y devolución de equipo**. En el AS-IS se describen operaciones manuales y dificultades de seguimiento; en el TO-BE se propone consultar al estudiante por matrícula, revisar disponibilidad, registrar condición inicial y final, bloquear operaciones inválidas y conservar historial. El documento de U2 también deja pendientes verificaciones con personal responsable; no debe tratarse como política institucional aprobada.

La delimitación a préstamos TIC responde a la información proporcionada por el equipo: **el prototipo programado se centra en préstamos**, no en horarios, kardex ni anuncios. Se cuenta con el código fuente y con enlaces a capturas del prototipo; las pruebas de ejecución documentadas no se acreditan únicamente con esas capturas.

### B2. Fuentes identificadas

| ID | Fuente | Evidencia / localización | Uso y alcance |
|---|---|---|---|
| F-01 | EQ06, *U2-E01: Modelo de negocio de TecConect* (27/10/2026) | `U2-E01_TecConect_ModeloNegocio.pdf`, pp. 2–7 | Contexto, flujo manual y propuesta TO-BE de préstamos/devoluciones; no constituye aprobación institucional |
| F-02 | Erick Martínez Rocha, *Requisitos individuales* | `Erick_Martinez_Aporte.md` · [Trello](https://trello.com/c/2Gb4s6hl/16-requisitos-funcionales-individuales) | Origen documental de RF-03, RF-04, RF-05 y RF-06 |
| F-03 | Jonathan Alfredo Rodríguez Ramírez, *Requisitos individuales* | `Borrador_Requisitos.docx` · [Trello](https://trello.com/c/5uGdCAhl/12-requisitos-funcionales-y-no-funcionales-individuales) | Referencia del trabajo de requisitos de Jonathan; el catálogo definitivo del presente documento establece RF-01, RF-02, RNF-01 y RNF-02 para el módulo de préstamos TIC |
| F-04 | Equipo TecConect, seguimiento del prototipo | [Tarjeta «Prototipo»](https://trello.com/c/vcrXVvSj/21-prototipo) | Enlace aportado por el equipo; contenido y adjuntos no inspeccionados |
| F-05 | Equipo TecConect, gestión del trabajo | [Tablero de Trello](https://trello.com/b/0ssnu0On/tecconnect) | Seguimiento de tareas, no evidencia de aprobación de requisitos |
| F-06 | Equipo TecConect, repositorio | [GitHub del proyecto](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect) | Ubicación general de versiones y entregables; sin vincular commits ni PR individuales |
| F-07 | EQ06, decisión de alcance comunicada durante la elaboración | Acuerdo de concentrar U3-E01 en el prototipo de préstamos TIC | Define el alcance del catálogo unificado de requisitos de préstamos TIC |
| F-08 | Equipo TecConect, código fuente del prototipo U3 | `index.html` (71 líneas), `styles.css` (347 líneas) y `app.js` (561 líneas), entregados para esta revisión | Evidencia directa de pantallas, flujos, validaciones y límites de implementación; inspección estática, no prueba ejecutada |

### B3. Hallazgos y necesidades

- **F-01/F-02:** la operación requiere identificar estudiantes y recursos, prevenir préstamos inconsistentes, registrar entregas y devoluciones y mantener historial.
- **F-03/F-08:** la preparación del préstamo reúne la identificación del estudiante, la consulta de disponibilidad, la selección del equipo y el resumen previo a su confirmación.
- **F-07/F-08:** el código implementa búsqueda de matrícula, listado de equipos con disponibilidad, selección, condición inicial, confirmación, errores y devolución. La seguridad de acceso y el objetivo de rendimiento siguen siendo propuestas sin prueba. **Son decisiones de diseño pendientes de validación, no resultados de investigación institucional.**

### B4. Preguntas pendientes

| Cuestión | Evidencia necesaria | Afecta |
|---|---|---|
| ¿Se añadirá un proceso de solicitud independiente? Actualmente opera el personal de resguardo y confirma directamente el préstamo. | Decisión del equipo; no hay flujo de solicitud pendiente en el código | RF-02, RF-04 |
| ¿Se validaron los estados en ejecución real y se tomaron capturas? | Pruebas en navegador y capturas | RF-01 a RF-06 |
| ¿Cómo se determina que una matrícula está autorizada? | Procedimiento del área TIC | RF-03, RF-06 |
| ¿Qué ocurre con equipos dañados y con préstamos cerrados con incidencia? | Reglas operativas del área TIC | RF-05 |
| ¿Existe autenticación por roles y dónde se almacenan los datos? | Código, arquitectura y diseño de seguridad | RNF-01 |
| ¿Es pertinente una meta de 2 segundos y cómo se medirá? | Acuerdo de condiciones de prueba | RNF-02 |

## C. Necesidades del sistema

| ID | Necesidad | Origen |
|---|---|---|
| N-01 | Conocer qué equipos TIC existen y cuáles están disponibles | F-01, F-03, F-07 |
| N-02 | Preparar la operación de préstamo identificando estudiante y equipo, antes de confirmar su registro | F-03, F-07, F-08; ajuste de alcance |
| N-03 | Evitar confirmar operaciones con información incompleta, usuarios no autorizados o equipos ocupados | F-01, F-02 |
| N-04 | Dejar constancia de cada entrega y bloquear la disponibilidad del equipo prestado | F-01, F-02 |
| N-05 | Registrar la devolución, conservar historial y separar recursos con incidencias | F-01, F-02 |
| N-06 | Identificar al estudiante mediante matrícula y seleccionar un recurso | F-01, F-02 |
| N-07 | Restringir el acceso y la modificación de registros de préstamos | F-07, **propuesta técnica por validar** |
| N-08 | Obtener respuesta ágil al consultar el catálogo y la disponibilidad | F-07, **meta propuesta por validar** |

## D. Reglas del dominio y decisiones

| ID | Regla propuesta | Origen / estado |
|---|---|---|
| RD-01 | Un equipo no puede figurar en dos préstamos activos simultáneos. | F-01/F-02; pendiente de validación operativa |
| RD-02 | Antes de confirmar deben existir matrícula, equipo, disponibilidad y condición inicial. | F-01/F-02; pendiente de validación |
| RD-03 | En el prototipo, la preparación de préstamo y su confirmación forman un mismo recorrido; **no existe una solicitud independiente ni captura de duración estimada**. | F-08; aclaración técnica, pendiente de aprobación documental |
| RD-04 | Un equipo devuelto dañado o incompleto no vuelve automáticamente al catálogo disponible. | F-01/F-02; validar tratamiento de incidencia |
| RD-05 | La búsqueda por matrícula no debe asignar un préstamo a otro estudiante. | F-02; criterio propuesto |
| RD-06 | Los registros de préstamos solo deben consultarse o modificarse según los permisos asignados. | F-07; propuesta de seguridad, no política oficial |
| RD-07 | El catálogo debe responder dentro de una meta de **2 segundos**, en un entorno de prueba acordado. | F-07; objetivo tentativo, no medición realizada |
| RD-08 | Duración máxima, penalizaciones, credenciales, pérdida y mantenimiento. | **No definidos**; no inventar valores |

## E. Catálogo unificado de ocho requisitos

**Estado documental:** requisitos consolidados para la entrega U3-E01. **Estado de validación:** las reglas operativas y los requisitos no funcionales requieren pruebas o confirmación, según corresponda. Las prioridades representan la planificación del equipo. La autoría identifica a los responsables de los requisitos en este catálogo, sin afirmar que existan pruebas o aprobaciones institucionales.

| ID | Tipo | Enunciado verificable | Necesidad / fuente | Prioridad | Responsable documental | Estado |
|---|---|---|---|---|---|---|
| **RF-01** | Funcional | El sistema debe permitir consultar el catálogo de equipos TIC e indicar para cada recurso su identificación, descripción y estado de disponibilidad. | N-01 · F-01/F-07 | P1 · Permite elegir recursos | Jonathan Alfredo Rodríguez Ramírez | Especificado; código revisado |
| **RF-02** | Funcional | El sistema debe permitir preparar un préstamo mediante la identificación del estudiante, selección de un equipo disponible y captura de su condición inicial, mostrando un resumen previo a la confirmación. El registro definitivo se efectúa mediante RF-04. | N-02 · F-03/F-07/F-08 | P1 · Inicio del proceso | Jonathan Alfredo Rodríguez Ramírez | Especificado; código revisado |
| **RF-03** | Funcional | El sistema debe impedir confirmar un préstamo si falta un dato obligatorio, el estudiante no está autorizado o el equipo no está disponible; debe informar la causa y permitir corregir o cancelar. | N-03 · F-01/F-02 | P1 · Previene errores | Erick Martínez Rocha | Por validar |
| **RF-04** | Funcional | El sistema debe registrar el préstamo con fecha, hora, matrícula, equipo y condición inicial cuando los datos sean correctos, marcarlo activo y dejar el equipo no disponible. | N-04 · F-01/F-02 | P1 · Trazabilidad de entrega | Erick Martínez Rocha | Por validar |
| **RF-05** | Funcional | El sistema debe registrar la devolución y la condición final; si el equipo está completo y sin daños, cerrar el préstamo, habilitar disponibilidad y conservar historial; en caso de daño o faltantes, impedir que vuelva a estar disponible. | N-05 · F-01/F-02 | P1 · Cierre y control de incidencias | Erick Martínez Rocha | Por validar |
| **RF-06** | Funcional | El sistema debe permitir al personal buscar a un estudiante por matrícula y seleccionar un equipo disponible para gestionar el préstamo. | N-06 · F-01/F-02 | P1 · Identificación | Erick Martínez Rocha | Por validar |
| **RNF-01** | No funcional · Seguridad | El sistema debe impedir que usuarios no autorizados consulten o modifiquen registros de préstamos y datos personales asociados, aplicando controles de acceso según el rol definido. | N-07 · F-07 | P1 · Protección de datos | Jonathan Alfredo Rodríguez Ramírez | Especificado; implementación de seguridad pendiente |
| **RNF-02** | No funcional · Rendimiento | El sistema debe mostrar el catálogo de equipos y su disponibilidad en un tiempo objetivo máximo de **2 segundos** bajo condiciones de prueba previamente definidas. | N-08 · F-07 | P2 · Usabilidad | Jonathan Alfredo Rodríguez Ramírez | Especificado; medición pendiente |

## F. Criterios de aceptación (Dado / Cuando / Entonces)

### RF-01 — Catálogo de equipos
- **CA-RF01-01 · Éxito:** **Dado** que existen equipos registrados, **cuando** el usuario abre el catálogo, **entonces** se muestran los equipos con su identificación y disponibilidad.
- **CA-RF01-02 · Alternativa:** **Dado** que no hay equipos registrados o disponibles, **cuando** se consulta el catálogo, **entonces** se muestra un estado vacío o la indicación de no disponibilidad, sin permitir seleccionar un equipo inexistente.

### RF-02 — Preparación del préstamo
- **CA-RF02-01 · Éxito:** **Dado** un estudiante localizado, **cuando** el personal continúa, selecciona un equipo disponible y captura la condición inicial, **entonces** se muestra el resumen del vale de resguardo antes de confirmar el préstamo.
- **CA-RF02-02 · Alternativa:** **Dado** que no se ha seleccionado equipo o falta condición inicial, **cuando** se intenta confirmar el préstamo, **entonces** se señalan los campos faltantes y no se genera un préstamo (validación detallada en RF-03).
- **Evidencia de código:** `vista01()`, `vista02()` y `resumen()` en `app.js`. No se registra una solicitud separada; el registro ocurre al confirmar en `confirmar()`.

### RF-03 — Validación
- **CA-RF03-01 · Error por dato faltante:** **Dado** que no se capturó la condición inicial, **cuando** el personal confirma, **entonces** el préstamo no se registra y se indica el dato faltante.
- **CA-RF03-02 · Error por autorización o disponibilidad:** **Dado** un estudiante no autorizado o equipo ocupado, **cuando** se intenta confirmar, **entonces** se bloquea la operación y se explica la causa.

### RF-04 — Registro de entrega
- **CA-RF04-01 · Éxito:** **Dado** matrícula válida, equipo disponible y condición inicial capturada, **cuando** el personal confirma, **entonces** se registra fecha/hora, matrícula, equipo y condición inicial, el préstamo queda activo y el equipo deja de estar disponible.
- **CA-RF04-02 · Alternativa:** **Dado** un equipo con préstamo activo, **cuando** se intenta generar otro préstamo, **entonces** no se duplica el préstamo activo.

### RF-05 — Devolución
- **CA-RF05-01 · Éxito:** **Dado** un préstamo activo y devolución completa sin daños, **cuando** se registra la condición final, **entonces** se cierra el préstamo, el equipo queda disponible y se conserva historial.
- **CA-RF05-02 · Incidencia:** **Dado** un préstamo activo con devolución dañada o incompleta, **cuando** se registra la condición final, **entonces** se registra la incidencia y el equipo no se habilita como disponible.
- **Evidencia de código:** una devolución dañada cambia el préstamo a `incidencia` y el equipo a `revision`; el propio prototipo indica que el tratamiento operativo definitivo está pendiente de validar.

### RF-06 — Matrícula y selección
- **CA-RF06-01 · Éxito:** **Dado** una matrícula registrada, **cuando** el personal la busca, **entonces** se identifica al estudiante y se permite elegir un equipo disponible.
- **CA-RF06-02 · Error:** **Dado** una matrícula inexistente, **cuando** se busca, **entonces** se muestra “no encontrado” y se permite corregir la búsqueda sin seleccionar a otro estudiante.

### RNF-01 — Seguridad
- **CA-RNF01-01 · Acceso denegado:** **Dado** un usuario sin permisos para consultar o modificar préstamos, **cuando** intenta acceder a un registro mediante la interfaz o una petición directa, **entonces** se rechaza la operación y no se divulgan datos personales.
- **CA-RNF01-02 · Acceso permitido:** **Dado** un usuario autorizado con permisos definidos, **cuando** accede a los registros correspondientes, **entonces** solo puede realizar las acciones permitidas por su rol.
- **Prueba pendiente:** definir autenticación, roles, almacenamiento y validación del lado servidor. **Ocultar botones con JavaScript no equivale a control de acceso seguro.**

### RNF-02 — Rendimiento
- **CA-RNF02-01 · Medición propuesta:** **Dado** un dispositivo, navegador, red, conjunto de datos y procedimiento de medición previamente acordados, **cuando** se abre el catálogo y termina de visualizarse su disponibilidad, **entonces** el tiempo medido es **≤ 2 segundos**.
- **Pendiente:** acordar volumen de equipos, cantidad de repeticiones, percentil y equipo de referencia. **No hay mediciones aportadas.**

## G. Backlog priorizado y prototipo

### G1. Backlog

| Orden sugerido | Requisito | Prioridad | Dependencias y motivo |
|---|---|---|---|
| 1 | RF-01 · Catálogo y disponibilidad | P1 | Permite identificar recursos; fuente de selección |
| 2 | RF-06 · Búsqueda por matrícula y selección | P1 | Precede al registro de entrega |
| 3 | RF-03 · Validaciones | P1 | Evita operaciones inconsistentes |
| 4 | RF-04 · Registro de préstamo | P1 | Depende de RF-06 y RF-03 |
| 5 | RF-05 · Devolución e incidencias | P1 | Requiere préstamo activo |
| 6 | RF-02 · Preparación y resumen previo | P1 | Integrado en el recorrido RF-06 → RF-04; sin solicitud independiente |
| Transversal | RNF-01 · Seguridad | P1 | Diseñar junto con identificación y registro; no postergar |
| Transversal | RNF-02 · Rendimiento | P2 | Medir cuando catálogo y condiciones de prueba estén definidos |

**Gestión de avances:** [Trello TecConect](https://trello.com/b/0ssnu0On/tecconnect). Este orden es propuesto; no se afirma que coincida con el orden histórico de implementación.

### G2. Recorrido de prototipo 01–04

**Artefacto:** prototipo navegable de préstamos y devoluciones TIC desarrollado con HTML, CSS y JavaScript en Visual Studio Code. **Evidencia publicada en la rama `docs/u3-erick-martinez`:** [carpeta del prototipo](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/tree/docs/u3-erick-martinez/docs/U3/prototipo) · [tarjeta Trello](https://trello.com/c/vcrXVvSj/21-prototipo).

| Bloque | Funcionalidad representada | Requisitos vinculados | Evidencia visual |
|---|---|---|---|
| **01 · Inicio** | Identificación y búsqueda del estudiante por matrícula; alternativa de matrícula no encontrada | RF-06 | [Captura 01 · Inicio](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/U3_Prototipo_TecConect_01_Inicio.png) |
| **02 · Acción** | Catálogo y disponibilidad, selección del equipo, condición inicial y resumen previo | RF-01, RF-02, RF-06 | [Captura 02 · Acción](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/U3_Prototipo_TecConect_02_Accion.png) |
| **03A · Éxito** | Confirmación del préstamo, folio, fecha/hora y equipo marcado como prestado | RF-04 | [Captura 03A · Éxito](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/U3_Prototipo_TecConect_03A_Exito.png) |
| **03B · Error** | Bloqueo de confirmación y presentación de errores de validación | RF-03 | [Captura 03B · Error](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/U3_Prototipo_TecConect_03B_Error.png) |
| **04 · Devolución** | Selección de préstamo activo y captura de condición final | RF-05 | [Captura 04 · Devolución](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/U3_Prototipo_TecConect_04_Devolucion.png) |
| **04R · Resultado** | Resultado de devolución, estado del equipo y visualización de historial como propuesta | RF-05 | [Captura 04R · Resultado](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/U3_Prototipo_TecConect_04_Resultado.png) |

**Vista global:** [Recorrido completo del prototipo](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/U3_Prototipo_TecConect_Recorrido.png).

**Archivos editables del prototipo:** [index.html](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/index.html) · [styles.css](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/styles.css) · [app.js](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/blob/docs/u3-erick-martinez/docs/U3/prototipo/app.js). Estos archivos permiten revisar y modificar el prototipo sin requerir un diseño adicional en otra herramienta. El recorrido contempla las alternativas de éxito y error; no incluye un módulo independiente de solicitudes pendientes de aprobación.

**Estado de publicación:** las evidencias están enlazadas a la rama `docs/u3-erick-martinez`. La integración a `main` deberá comprobarse al preparar la entrega en la rama principal; los enlaces anteriores documentan la ubicación compartida por el equipo y no acreditan por sí solos pruebas de ejecución.

### G2.1. Verificación estática del prototipo recibido (F-08)

| Requisito | Evidencia encontrada en el código | Límite o precaución |
|---|---|---|
| RF-01 | `equipos` y `vista02()` muestran código, nombre y estado; `aplicarFiltro()` filtra por nombre/código | El catálogo aparece dentro del recorrido de préstamo; no es un módulo independiente |
| RF-02 | `vista01()`, `vista02()` y `resumen()` preparan los datos y el vale | No hay solicitud pendiente, duración estimada ni aprobación independiente |
| RF-03 | `confirmar()` comprueba `autorizado`, disponibilidad, selección y condición inicial; muestra errores en `03B` | Validación local con datos de ejemplo, no verificación institucional o de servidor |
| RF-04 | `confirmar()` crea objeto con `id`, `matricula`, `codigo`, `inicio`, `condIni`, estado `activo` y cambia equipo a `prestado` | Registro en memoria; no hay base de datos ni persistencia de préstamos |
| RF-05 | `registrarDevolucion()` registra fecha y observación, cierra o marca incidencia y cambia disponibilidad; `vista04R()` presenta resultado | Historial se muestra como **propuesta sin requisito propio**; tratamiento final de incidencias por validar |
| RF-06 | `buscar()` localiza matrícula en `ESTUDIANTES`; `vista02()` permite seleccionar equipo disponible | Estudiantes precargados en memoria, sin consulta a padrón real |
| RNF-01 | La interfaz identifica al «Personal de resguardo» | **No hay login, autenticación, roles comprobados ni control de acceso real**; pendiente de implementar |
| RNF-02 | El catálogo se renderiza con JavaScript y estilos locales | **No se midió** tiempo de respuesta ni se verificó el objetivo de 2 segundos |

**Restricción técnica comprobada:** `app.js` define `ESTUDIANTES`, `equipos`, `prestamos` e `historial` como datos locales de ejemplo; `localStorage` solo conserva la preferencia de mostrar anotaciones, **no** préstamos o devoluciones. Al recargar la página se reinicializan los datos de negocio. `index.html` referencia recursos de `assets/` que deben incluirse al publicar el prototipo. El código contiene una barra de anotaciones para explicar el recorrido; esas anotaciones no son parte del sistema operativo final. **Esta revisión es estática; no se afirma que se ejecutaron pruebas de navegador.**

### G3. Control de versiones

**Repositorio general:** https://github.com/JonathanRdzzz/fis-2026-e03-TecConect  
**Tarjeta de prototipo:** https://trello.com/c/vcrXVvSj/21-prototipo  
**Carpeta de evidencias en GitHub (rama de Erick):** https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/tree/docs/u3-erick-martinez/docs/U3/prototipo

Los enlaces individuales de commits y Pull Requests se reservarán para la bitácora personal U3-E04, según decisión del equipo, **sin atribuir cambios de la unidad anterior a esta entrega**. Esto no elimina los requisitos de evidencia que pudiera exigir la rúbrica; se mantiene como riesgo de evaluación.

## H. Matriz de trazabilidad

| Fuente | Necesidad | Requisito | Criterio de aceptación | Pantalla / verificación prevista | Estado |
|---|---|---|---|---|---|
| F-01/F-07 | N-01 | RF-01 | CA-RF01-01/02 | G2 · 02, catálogo | Código cotejado; captura 02 enlazada |
| F-03/F-07 | N-02 | RF-02 | CA-RF02-01/02 | G2 · 02, preparación y resumen | Código cotejado; captura 02 enlazada; prueba pendiente |
| F-01/F-02 | N-03 | RF-03 | CA-RF03-01/02 | G2 · 03B, bloqueo y mensajes | Código cotejado; captura enlazada; prueba pendiente |
| F-01/F-02 | N-04 | RF-04 | CA-RF04-01/02 | G2 · 03A, registro | Código cotejado; captura enlazada; prueba pendiente |
| F-01/F-02 | N-05 | RF-05 | CA-RF05-01/02 | G2 · 04/04R, devolución e incidencia | Código cotejado; captura enlazada; prueba pendiente |
| F-01/F-02 | N-06 | RF-06 | CA-RF06-01/02 | G2 · 01/02, matrícula | Código cotejado; captura enlazada; prueba pendiente |
| F-07 | N-07 | RNF-01 | CA-RNF01-01/02 | Prueba de autorización; no basta prototipo visual | Diseño y prueba pendientes |
| F-07 | N-08 | RNF-02 | CA-RNF02-01 | Medición reproducible del catálogo | Meta y prueba pendientes |

## I. Referencias, herramientas y atribuciones

### I1. Referencias documentales

1. **EQ06.** (27/10/2026). *U2-E01: Modelo de negocio de TecConect*. Documento interno, `U2-E01_TecConect_ModeloNegocio.pdf`.
2. **Erick Martínez Rocha.** *Requisitos individuales del proceso de préstamo y devolución*. `Erick_Martinez_Aporte.md`. [Tarjeta Trello](https://trello.com/c/2Gb4s6hl/16-requisitos-funcionales-individuales).
3. **Jonathan Alfredo Rodríguez Ramírez.** *Requisitos funcionales y no funcionales individuales*. `Borrador_Requisitos.docx`. [Tarjeta Trello](https://trello.com/c/5uGdCAhl/12-requisitos-funcionales-y-no-funcionales-individuales). Requisitos definitivos incluidos en el apartado E.
4. **Equipo TecConect.** [Tablero general de Trello](https://trello.com/b/0ssnu0On/tecconnect).
5. **Equipo TecConect.** [Tarjeta del prototipo](https://trello.com/c/vcrXVvSj/21-prototipo).
6. **Equipo TecConect.** [Repositorio general de GitHub](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect).
7. **Equipo TecConect.** *Prototipo U3 y evidencias gráficas*: [carpeta de capturas y código](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/tree/docs/u3-erick-martinez/docs/U3/prototipo); incluye recorrido, seis capturas y los archivos editables `index.html`, `styles.css` y `app.js`. Datos simulados en memoria.
8. **Asignatura Fundamentos de Ingeniería de Software.** *FIS · U3 · Semana 2 · Especificación A–I, prototipo y cierre*. Guía de entrega y evaluación proporcionada por el equipo.

### I2. Herramientas utilizadas según declaración del equipo

| Herramienta / tecnología | Uso |
|---|---|
| **Microsoft Word** | Elaboración y edición de documentos de requisitos y entregables académicos |
| **Visual Studio Code** | Editor utilizado para programar el prototipo |
| **HTML** | Estructura de las pantallas web del prototipo |
| **CSS** | Presentación y estilos de las pantallas |
| **JavaScript** | Interacciones y comportamiento del prototipo |
| **Trello** | Organización de actividades y control de avances |
| **GitHub** | Repositorio de versiones y entregables finales |

**Asistencia de IA:** se utilizó ChatGPT para apoyar la estructuración, redacción y revisión de consistencia de esta especificación. La autoría documental se identifica en el catálogo de requisitos; la asistencia de IA no constituye evidencia de implementación o validación.

**Atribuciones visuales:** `index.html` referencia `assets/logo-tec-san-pedro.png` y `assets/escudo-tec-san-pedro.png`; `styles.css` referencia tipografías locales Big Shoulders, Instrument Sans e IBM Plex Mono e indica licencia OFL. Esos archivos `assets/` no se adjuntaron para verificar existencia, procedencia o licencias específicas. Las capturas del prototipo se encuentran enlazadas en G2 y corresponden a evidencias del trabajo del equipo. Para imágenes de terceros, conservar la fuente y el permiso o licencia aplicable.

---

## Estado de entrega y limitaciones verificables

La especificación A–I y el catálogo de **ocho requisitos** quedan consolidados como versión final del documento U3-E01. El código del prototipo permite rastrear el recorrido 01–04 y sus variantes de éxito/error. **Esta versión documental no equivale a certificar la ejecución de pruebas, la aprobación de reglas institucionales ni la implementación de autenticación o rendimiento medido.**

Las capturas del recorrido y el código están referenciados desde `docs/U3/prototipo/` en la rama `docs/u3-erick-martinez`. Antes de cerrar la entrega en `main`, comprobar su integración y la accesibilidad de los enlaces. Los commits y Pull Requests específicos se mantienen fuera de este archivo, reservados para la bitácora personal, según lo acordado por el equipo.
