U3-E02_Jonathan_Rodriguez.md
Proyecto: TecConect — Sistema de gestión de préstamos y devoluciones de equipos TIC
Autor: Jonathan Alfredo Rodríguez Ramírez
Institución: Instituto Tecnológico Superior de San Pedro de las Colonias
Carrera y grupo: Ingeniería en Sistemas Computacionales · 5A
Asignatura: Fundamentos de Ingeniería de Software
Docente: Ruth Aivi Chávez Rodríguez
Equipo: EQ06
Fecha: 17 de noviembre de 2026
1. Propósito y alcance
Esta evidencia individual documenta cuatro requisitos elaborados por Jonathan e incorporados al catálogo final U3-E01: RF-01, RF-02, RNF-01 y RNF-02. Aunque la guía U3-E02 solicita dos requisitos por integrante, se incluyen los cuatro requisitos de autoría de Jonathan para reflejar íntegramente su aportación individual. Esta presentación adicional no implica una excepción formal a la rúbrica.

El alcance corresponde al módulo de préstamos y devoluciones de equipos TIC. No se incluyen horarios, kardex ni tablero de avisos. Se distingue entre la especificación del requisito, su representación en el prototipo y la comprobación mediante pruebas.
2. Fuentes y hallazgos
Fuente	Material consultado	Hallazgo aplicado
F-01	EQ06, U2-E01: Modelo de negocio de TecConect (27/10/2026), pp. 2–7	El flujo AS-IS/TO-BE describe consulta por matrícula, disponibilidad, entrega y devolución de equipo.
F-03	Jonathan, Borrador_Requisitos.docx y tarjeta Trello	Antecedente de su trabajo individual; el catálogo U3-E01 fija los enunciados vigentes centrados en préstamos TIC.
F-07	Acuerdo de alcance de EQ06 recogido en U3-E01	Se delimita la especificación al prototipo de préstamos TIC.
F-08	index.html, styles.css y app.js del prototipo U3	El código contiene catálogo, preparación del préstamo y resumen; no acredita autenticación ni medición de rendimiento.


Necesidades identificadas: N-01, consulta de disponibilidad; N-02, preparación de la operación; N-07, protección de registros; N-08, consulta ágil del catálogo. Estas necesidades mantienen la numeración del U3-E01.
3. Requisitos individuales y criterios de aceptación
RF-01 — Catálogo y disponibilidad de equipos TIC
- Tipo: Funcional
- Autor: Jonathan Alfredo Rodríguez Ramírez
- Enunciado: El sistema debe permitir consultar el catálogo de equipos TIC e indicar para cada recurso su identificación, descripción y estado de disponibilidad.
- Origen y necesidad: N-01 · F-01/F-07
- Prioridad y justificación: P1 — Permite elegir recursos y evitar seleccionar equipos ocupados.
- Estado documental: Integrado en el catálogo U3-E01.
Criterios de aceptación
1. Caso principal: Dado que existen equipos registrados, cuando el usuario abre el catálogo, entonces se muestran los equipos con su identificación y disponibilidad.
2. Caso alternativo o verificación: Dado que no hay equipos registrados o disponibles, cuando se consulta el catálogo, entonces se muestra un estado vacío o la indicación de no disponibilidad, sin permitir seleccionar un equipo inexistente.
Evidencia relacionada: Vista 02 — Acción; revisión de app.js.
Hallazgo de la revisión estática: El arreglo equipos y la función vista02() muestran identificación y estado; los equipos prestados aparecen deshabilitados.
Alcance de la evidencia: Se trata de un catálogo integrado en el recorrido del préstamo, no de una pantalla autónoma.
RF-02 — Preparación y resumen del préstamo
- Tipo: Funcional
- Autor: Jonathan Alfredo Rodríguez Ramírez
- Enunciado: El sistema debe permitir preparar un préstamo mediante la identificación del estudiante, selección de un equipo disponible y captura de su condición inicial, mostrando un resumen previo a la confirmación. El registro definitivo se efectúa mediante RF-04.
- Origen y necesidad: N-02 · F-03/F-07/F-08
- Prioridad y justificación: P1 — Reúne los datos necesarios antes de registrar una entrega.
- Estado documental: Integrado en el catálogo U3-E01.
Criterios de aceptación
1. Caso principal: Dado un estudiante localizado, cuando el personal continúa, selecciona un equipo disponible y captura la condición inicial, entonces se muestra el resumen del vale de resguardo antes de confirmar el préstamo.
2. Caso alternativo o verificación: Dado que no se ha seleccionado equipo o falta condición inicial, cuando se intenta confirmar el préstamo, entonces se señalan los campos faltantes y no se genera un préstamo; la validación se detalla en RF-03.
Evidencia relacionada: Vistas 01 y 02 — Inicio y Acción; revisión de app.js.
Hallazgo de la revisión estática: Las funciones vista01(), vista02() y resumen() presentan estudiante, equipo y condición inicial antes de la confirmación.
Alcance de la evidencia: No existe una solicitud independiente, captura de duración estimada ni aprobación por separado.
RNF-01 — Seguridad y control de acceso
- Tipo: No funcional
- Autor: Jonathan Alfredo Rodríguez Ramírez
- Enunciado: El sistema debe impedir que usuarios no autorizados consulten o modifiquen registros de préstamos y datos personales asociados, aplicando controles de acceso según el rol definido.
- Origen y necesidad: N-07 · F-07
- Prioridad y justificación: P1 — Busca proteger la información de estudiantes y registros de resguardo.
- Estado documental: Integrado en el catálogo U3-E01.
Criterios de aceptación
1. Caso principal: Dado un usuario sin permisos para consultar o modificar préstamos, cuando intenta acceder a un registro mediante la interfaz o una petición directa, entonces se rechaza la operación y no se divulgan datos personales.
2. Caso alternativo o verificación: Dado un usuario autorizado con permisos definidos, cuando accede a los registros correspondientes, entonces solo puede realizar las acciones permitidas por su rol.
Evidencia relacionada: Criterio transversal; el prototipo no acredita seguridad. Consultar evidencia o código.
Hallazgo de la revisión estática: La interfaz identifica al personal de resguardo, pero esa etiqueta no demuestra autorización.
Alcance de la evidencia: El prototipo no incorpora inicio de sesión, control de acceso de servidor ni pruebas de autorización; es un requisito especificado, no verificado.
RNF-02 — Rendimiento del catálogo
- Tipo: No funcional
- Autor: Jonathan Alfredo Rodríguez Ramírez
- Enunciado: El sistema debe mostrar el catálogo de equipos y su disponibilidad en un tiempo objetivo máximo de 2 segundos bajo condiciones de prueba previamente definidas.
- Origen y necesidad: N-08 · F-07
- Prioridad y justificación: P2 — Favorece una consulta ágil del inventario.
- Estado documental: Integrado en el catálogo U3-E01.
Criterios de aceptación
1. Caso principal: Dado un dispositivo, navegador, red, conjunto de datos y procedimiento de medición previamente acordados, cuando se abre el catálogo y termina de visualizarse su disponibilidad, entonces el tiempo medido es menor o igual a 2 segundos.
2. Caso alternativo o verificación: Para verificar el criterio se definirán volumen de equipos, repeticiones, percentil y equipo de referencia; no se declara cumplimiento sin mediciones.
Evidencia relacionada: Catálogo descrito en app.js; medición no documentada.
Hallazgo de la revisión estática: El catálogo se renderiza localmente mediante JavaScript y CSS.
Alcance de la evidencia: La meta de 2 segundos es un objetivo especificado; no se han aportado mediciones reproducibles.
4. Correspondencia con U3-E01
| Requisito | Necesidad | Evidencia | Estado de comprobación |
|---|---|---|
| RF-01 | N-01 | Vista 02 y app.js | Funcionalidad identificada en código; sin acta de prueba ejecutada |
| RF-02 | N-02 | Vistas 01/02 y app.js | Funcionalidad identificada en código; sin acta de prueba ejecutada |
| RNF-01 | N-07 | Criterios de acceso definidos | Seguridad no implementada ni comprobada |
| RNF-02 | N-08 | Meta de 2 s definida | Rendimiento no medido |
5. Archivos fuente del prototipo
- Código JavaScript
- Estructura HTML
- Estilos CSS
Los enlaces permiten consultar el código fuente del prototipo. Su existencia no sustituye pruebas formales de seguridad o rendimiento.
6. Referencias y herramientas
1. EQ06. (2026). U2-E01: Modelo de negocio de TecConect. Documento interno.
2. EQ06. (2026). U3-E01: Especificación de requisitos TecConect (A–I). Catálogo final del proyecto.
3. Jonathan Alfredo Rodríguez Ramírez. Borrador_Requisitos.docx. Documento de trabajo individual.
4. Trello — Requisitos individuales de Jonathan.
5. Repositorio TecConect.
6. Carpeta del prototipo en GitHub.
7. FIS · U3 · Semana 2 · Especificación A–I, prototipo y cierre. Guía de la asignatura.
Herramientas utilizadas: Microsoft Word para documentos, Visual Studio Code para el prototipo HTML/CSS/JavaScript, Trello para seguimiento y GitHub para versiones. ChatGPT se utilizó como apoyo de estructuración y redacción.
7. Cierre individual
La aportación de Jonathan reúne dos requisitos funcionales orientados a consultar equipos y preparar préstamos, y dos no funcionales relativos a seguridad y rendimiento. RF-01 y RF-02 tienen correspondencia directa con el código del prototipo. RNF-01 y RNF-02 establecen condiciones de calidad que deberán verificarse en una implementación posterior; no se presentan como pruebas superadas. Los cuatro requisitos conservan sus identificadores y criterios del U3-E01.
