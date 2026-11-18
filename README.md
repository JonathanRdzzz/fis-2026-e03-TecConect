# TecConect

**Proyecto académico · Equipo EQ-06**  
**Ingeniería en Sistemas Computacionales · Fundamentos de Ingeniería de Software**  
**Instituto Tecnológico Superior de San Pedro de las Colonias**

## Acerca del proyecto

**TecConect** es una propuesta de sistema para apoyar la gestión de **préstamos y devoluciones de equipos del área de Tecnologías de la Información y Comunicaciones (TIC)**. Su objetivo es organizar la consulta de disponibilidad, la identificación del estudiante, la preparación del préstamo y el registro de la devolución mediante un flujo claro y verificable.

El proyecto inició con una propuesta más amplia de servicios estudiantiles. Durante la Unidad 3 se delimitó el alcance del prototipo al proceso de préstamo y devolución de equipos TIC, de acuerdo con el modelo de negocio desarrollado en la Unidad 2.

> **Estado actual:** prototipo navegable elaborado con HTML, CSS y JavaScript. Utiliza datos de demostración en memoria; no constituye todavía un sistema institucional conectado a una base de datos ni acredita autenticación real o pruebas de rendimiento.

## Funcionalidades contempladas

- Consulta del catálogo de equipos TIC y su disponibilidad.
- Búsqueda de estudiantes mediante matrícula.
- Selección del equipo y registro de su condición inicial.
- Preparación y revisión de los datos antes de confirmar el préstamo.
- Validación de campos obligatorios y condiciones de disponibilidad.
- Registro demostrativo de préstamos y devoluciones, incluida la condición final del equipo.

### Requisitos de calidad definidos

- **Seguridad:** acceso y operaciones restringidos según los permisos del usuario (**RNF-01**). Pendiente de implementación y validación real.
- **Rendimiento:** objetivo de carga del catálogo de **2 segundos o menos** (**RNF-02**). Pendiente de medición reproducible.

## Tecnologías y herramientas

| Herramienta | Uso en el proyecto |
| --- | --- |
| HTML, CSS y JavaScript | Prototipo navegable de la interfaz |
| Visual Studio Code | Edición de archivos del prototipo |
| Git y GitHub | Versionado y organización de evidencias |
| Trello | Seguimiento de actividades |
| Markdown y documentos PDF/Word | Especificación y entregables académicos |

## Evidencias y documentación

La documentación está organizada en la carpeta [`docs/`](./docs). Incluye entregables de organización, análisis del negocio, requisitos y evidencias de las unidades académicas.

| Unidad | Enfoque |
| --- | --- |
| **Unidad 1** | Organización del equipo y propuesta inicial |
| **Unidad 2** | Modelo de negocio y análisis del proceso de préstamo |
| **Unidad 3** | Ingeniería de requisitos, prototipo, trazabilidad y evidencias individuales |

**Prototipo de la Unidad 3:** [consultar archivos y capturas en la rama de documentación](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect/tree/docs/u3-erick-martinez/docs/U3/prototipo).

## Recorrido del prototipo

1. **Inicio:** identificación del estudiante por matrícula.
2. **Acción:** selección de equipo, revisión de disponibilidad y condición inicial.
3. **Resultado:** confirmación del préstamo o mensaje de error por validación.
4. **Devolución:** registro de la condición final y actualización demostrativa del estado del equipo.

## Equipo EQ-06

| Integrante | Rol registrado |
| --- | --- |
| Jonathan Alfredo Rodríguez Ramírez | Análisis |
| Erick Martínez Rocha | Desarrollo |
| Yahir Alejandro Vázquez Maciel | Coordinación |
| Alexis Rubio Galván | Documentación y Calidad |

*Los roles corresponden a la organización general del equipo; las aportaciones individuales se documentan por separado en sus evidencias.*

## Seguimiento

- [Tablero de Trello de TecConect](https://trello.com/b/0ssnu0On/tecconnect)
- [Repositorio de GitHub](https://github.com/JonathanRdzzz/fis-2026-e03-TecConect)
- **Classroom:** medio institucional de entrega (sin enlace público incluido).

---

*TecConect · Proyecto académico de Fundamentos de Ingeniería de Software · 2026.*
