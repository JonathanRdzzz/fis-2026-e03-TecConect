# Instituto Tecnológico Superior de San Pedro de las Colonias

**Ingeniería en Sistemas Computacionales**  
**Grupo:** 5A  
**Materia:** Fundamentos de Ingeniería de Software  
**Docente:** Ruth Aivi Chávez Rodríguez

## Requisitos Individuales

**Integrantes del equipo:**

- Jonathan Alfredo Rodríguez Ramírez
- Erick Martínez Rocha
- Alexis Rubio Galván
- Yahir Alejandro Vázquez Maciel

**Autor de este aporte:** Erick Martínez Rocha  
**Proceso:** Registro de préstamo y devolución de equipo didáctico

## Requisitos Funcionales

### 1. Requisito Funcional 3 (RF-03)

**Tipo:** Funcional  
**Enunciado:** El sistema debe impedir que se confirme un préstamo cuando falte un dato obligatorio, el estudiante no esté autorizado o el equipo no esté disponible, y debe mostrar la causa para que el personal la corrija o cancele la operación.  
**Fuente:** E01 de la Unidad 2 (proceso TO-BE, caso con error y RF-01)  
**Prioridad:** P1 - Alta (Evita que se preste un equipo que ya está prestado o que se registre un préstamo incompleto).  
**Autor:** Erick Martínez  
**Estado de validación:** Por validar

**Criterio de Aceptación:**

- **Entrada / Condición:** El personal seleccionó al estudiante y el equipo, pero no capturó la condición inicial del equipo.
- **Acción:** El personal intenta confirmar el préstamo.
- **Resultado esperado:** El sistema no registra el préstamo, indica que falta la condición inicial y permite completarla o cancelar.

### 2. Requisito Funcional 4 (RF-04)

**Tipo:** Funcional  
**Enunciado:** El sistema debe registrar un préstamo con fecha, hora, matrícula, equipo y condición inicial cuando los datos sean correctos.  
**Fuente:** E01 de la Unidad 2 (propuesta de valor y proceso TO-BE, caso normal)  
**Prioridad:** P1 - Alta (Sin este registro no queda constancia del préstamo ni se le puede dar seguimiento).  
**Autor:** Erick Martínez  
**Estado de validación:** Por validar

**Criterio de Aceptación:**

- **Entrada / Condición:** La matrícula es válida, el equipo está disponible y se capturó la condición inicial.
- **Acción:** El personal confirma el préstamo.
- **Resultado esperado:** El sistema registra el préstamo como activo con fecha y hora, y el equipo deja de aparecer como disponible.

### 3. Requisito Funcional 5 (RF-05)

**Tipo:** Funcional  
**Enunciado:** El sistema debe registrar la devolución con la condición final del equipo y, si regresa completo y sin daños, cerrar el préstamo, dejar el equipo disponible y guardar el historial. Si el equipo regresa incompleto o con daño, no debe quedar disponible.  
**Fuente:** E01 de la Unidad 2 (proceso TO-BE, caso normal y caso con error)  
**Prioridad:** P1 - Alta (Sin el cierre el equipo seguiría como prestado y no se podría volver a prestar).  
**Autor:** Erick Martínez  
**Estado de validación:** Por validar

**Criterio de Aceptación:**

- **Entrada / Condición:** Hay un préstamo activo y el equipo regresa completo y sin daños.
- **Acción:** El personal registra la devolución y la condición final.
- **Resultado esperado:** El préstamo se cierra, el equipo vuelve a estar disponible y el préstamo queda en el historial del equipo.

### 4. Requisito Funcional 6 (RF-06)

**Tipo:** Funcional  
**Enunciado:** El sistema debe permitir al personal buscar a un estudiante por su matrícula y seleccionar el equipo que solicita.  
**Fuente:** E01 de la Unidad 2 (mejora propuesta y proceso TO-BE, caso normal)  
**Prioridad:** P1 - Alta (Es el primer paso del préstamo; sin encontrar al estudiante y elegir el equipo no se puede iniciar).  
**Autor:** Erick Martínez  
**Estado de validación:** Por validar

**Criterio de Aceptación:**

- **Entrada / Condición:** El personal escribe una matrícula registrada en la sección de préstamos.
- **Acción:** El personal busca al estudiante.
- **Resultado esperado:** Se muestran los datos del estudiante y se puede seleccionar un equipo disponible. Si la matrícula no existe, se avisa que no se encontró y se puede corregir.
