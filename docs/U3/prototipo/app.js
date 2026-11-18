'use strict';

const ESTUDIANTES = {
  '22010001': { nombre: 'Estudiante de ejemplo', carrera: 'Ing. en Sistemas Computacionales', autorizado: true },
  '21010500': { nombre: 'Estudiante no autorizado (ejemplo)', carrera: 'Ing. Industrial', autorizado: false },
  '22010458': { nombre: 'Otro estudiante (ejemplo)', carrera: 'Ing. en Gestión Empresarial', autorizado: true },
  '21010932': { nombre: 'Estudiante de 7.º (ejemplo)', carrera: 'Ing. Mecatrónica', autorizado: true }
};

const equipos = [
  { codigo: 'PRY-03', nombre: 'Proyector Epson', tipo: 'proyector', estado: 'disponible' },
  { codigo: 'LAP-07', nombre: 'Laptop Dell Latitude', tipo: 'laptop', estado: 'prestado' },
  { codigo: 'BOC-01', nombre: 'Bocina Bluetooth JBL', tipo: 'bocina', estado: 'disponible' },
  { codigo: 'CAM-02', nombre: 'Cámara Canon EOS', tipo: 'camara', estado: 'disponible' },
  { codigo: 'PRY-05', nombre: 'Proyector BenQ', tipo: 'proyector', estado: 'disponible' },
  { codigo: 'LAP-02', nombre: 'Laptop HP ProBook', tipo: 'laptop', estado: 'prestado' }
];

let siguienteId = 3;
const prestamos = [
  { id: 1, matricula: '22010458', codigo: 'LAP-07', inicio: new Date(2026, 10, 12, 9, 10), condIni: 'Sin daños, con cargador.', estado: 'activo' },
  { id: 2, matricula: '21010932', codigo: 'LAP-02', inicio: new Date(2026, 10, 11, 16, 40), condIni: 'Rayón leve en la tapa, con cargador.', estado: 'activo' }
];

const historial = [
  { codigo: 'PRY-03', fecha: new Date(2026, 10, 5, 12, 0), matricula: '22010458', cond: 'Completo y sin daños' },
  { codigo: 'PRY-03', fecha: new Date(2026, 9, 29, 13, 30), matricula: '21010932', cond: 'Completo y sin daños' }
];

const VISTAS = {
  '01': { nombre: 'Inicio', req: 'RF-06', paso: 'Buscar al estudiante por matrícula. Alternativa: matrícula no encontrada.' },
  '02': { nombre: 'Acción', req: 'RF-06 · RF-04', paso: 'Seleccionar equipo y capturar la condición inicial.' },
  '03A': { nombre: 'Respuesta: éxito', req: 'RF-04', paso: 'Préstamo activo con fecha y hora; el equipo deja de estar disponible.' },
  '03B': { nombre: 'Respuesta: error', req: 'RF-03', paso: 'Se bloquea la confirmación y se muestra la causa.' },
  '04': { nombre: 'Devolución', req: 'RF-05', paso: 'Registrar la condición final del equipo.' },
  '04R': { nombre: 'Resultado', req: 'RF-05 · Historial: propuesta', paso: 'Préstamo cerrado y equipo disponible. El historial no tiene RF propio.' }
};

const state = {
  vista: '01',
  matricula: '',
  noEncontrada: false,
  matriculaEstudiante: null,
  codigoEquipo: null,
  condicion: '',
  filtro: '',
  errores: null,
  prestamoRegistrado: null,
  devolucion: { id: null, cond: 'completo', obs: '', error: false },
  prestamoDevuelto: null,
  anotaciones: leerPreferencia()
};

const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icono = (n, cls = '') => `<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const fecha = (d) => d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' · ' +
  d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });
const equipoPor = (codigo) => equipos.find((e) => e.codigo === codigo);
const seccionDe = (vista) => (vista === '04' || vista === '04R' ? 'devoluciones' : 'prestamos');

function leerPreferencia() {
  try { return localStorage.getItem('tecconect-anotaciones') !== 'no'; } catch { return true; }
}
function guardarPreferencia(v) {
  try {
    localStorage.setItem('tecconect-anotaciones', v ? 'si' : 'no');
    return true;
  } catch {
    return false;
  }
}
function anunciar(texto) {
  const a = $('#aviso'); a.textContent = ''; setTimeout(() => { a.textContent = texto; }, 30);
}

const ESTADOS = {
  disponible: ['Disponible', 'chip-ok'],
  prestado: ['Prestado', 'chip-muted'],
  revision: ['No disponible', 'chip-muted'],
  activo: ['Activo', 'chip-gold'],
  cerrado: ['Cerrado', 'chip-dark'],
  incidencia: ['Con incidencia · por validar', 'chip-err']
};
const chip = (estado) => `<span class="chip ${ESTADOS[estado][1]}">${ESTADOS[estado][0]}</span>`;

function encabezado(miga, titulo, sub) {
  return `<header class="page-head">
    <p class="crumb">${miga}</p>
    <h1 tabindex="-1">${titulo}</h1>
    ${sub ? `<p class="sub">${sub}</p>` : ''}
  </header>`;
}

function pasos(actual) {
  const nombres = ['Estudiante', 'Equipo y condición', 'Confirmación'];
  const items = nombres.map((n, i) => {
    const num = i + 1;
    const clase = num < actual ? 'is-done' : num === actual ? 'is-current' : 'is-next';
    const dot = num < actual ? icono('check', 'ic-sm') : num;
    const linea = num < 3 ? `<li class="step-line ${num < actual ? 'is-done' : ''}" aria-hidden="true"></li>` : '';
    return `<li class="step ${clase}" ${num === actual ? 'aria-current="step"' : ''}>
      <span class="step-dot">${dot}</span><span class="step-label">${n}</span></li>${linea}`;
  }).join('');
  const caption = actual > 3 ? 'Préstamo confirmado' : `Paso ${actual} de 3 · ${nombres[actual - 1]}`;
  return `<nav aria-label="Progreso del préstamo">
    <ol class="steps">${items}</ol>
    <p class="steps-caption">${caption}</p>
  </nav>`;
}

function persona(matricula, grande = false) {
  const e = ESTUDIANTES[matricula];
  return `<div class="person ${grande ? 'is-lg' : ''}">
    <span class="mat mono"><span class="sr-only">Matrícula </span>${matricula}</span>
    <div class="grow">
      <p class="person-name">${esc(e.nombre)}</p>
      <p class="person-meta">${esc(e.carrera)}</p>
    </div>
    ${grande ? '' : '<button class="btn btn-link" type="button" data-act="cambiar">Cambiar</button>'}
  </div>`;
}

function resumen(titulo, filas, nota, clase = '') {
  const dl = filas.map(([k, v, c]) => `<div class="kv"><dt>${k}</dt><dd class="${c || ''}" ${c && c.includes('js-condicion') ? 'id="res-condicion"' : ''}>${v}</dd></div>`).join('');
  return `<aside class="summary ${clase}" aria-label="${titulo}">
    <h2>${titulo}</h2>
    <dl>${dl}</dl>
    ${nota ? `<p class="note">${nota}</p>` : ''}
  </aside>`;
}

function alerta(tipo, titulo, cuerpo) {
  const ic = tipo === 'ok' ? 'check' : 'alerta';
  return `<section class="alert alert-${tipo}" role="${tipo === 'error' ? 'alert' : 'status'}">
    <span class="alert-mark">${icono(ic)}</span>
    <div><h2>${titulo}</h2>${cuerpo}</div>
  </section>`;
}

function vista01() {
  const e = state.matriculaEstudiante;
  const no = state.noEncontrada;
  return `${encabezado('Préstamos / Nuevo préstamo', 'Nuevo préstamo', 'Identifica al estudiante por su matrícula. Ya no se retiene la credencial física.')}
  ${pasos(1)}
  <div class="layout">
    <div class="col">
      <section class="card" aria-labelledby="t-buscar">
        <h2 class="card-title" id="t-buscar"><span class="num">01</span>Identificar al estudiante</h2>
        <form class="search-row" id="f-buscar" novalidate>
          <div class="field">
            <label for="matricula">Matrícula</label>
            <div class="input ${no ? 'is-error' : ''}">
              ${icono('buscar')}
              <input id="matricula" name="matricula" inputmode="numeric" autocomplete="off" placeholder="Ej. 22010001"
                value="${esc(state.matricula)}" aria-describedby="ayuda-matricula" ${no ? 'aria-invalid="true"' : ''}>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Buscar</button>
        </form>
        <p class="help ${no ? 'is-error' : ''}" id="ayuda-matricula" ${no ? 'role="alert"' : ''}>
          ${no ? icono('alerta', 'ic-sm') + 'No se encontró la matrícula. Revísala e intenta de nuevo.' : 'Escribe la matrícula completa y presiona Buscar.'}
        </p>
      </section>
      ${e ? `<section class="card" aria-labelledby="t-encontrado">
        <h2 class="card-title" id="t-encontrado"><span class="num">02</span>Estudiante encontrado</h2>
        ${persona(e, true)}
        <div class="actions end"><button class="btn btn-primary" type="button" data-act="continuar">Continuar con el equipo</button></div>
      </section>` : ''}
    </div>
    ${resumen('Vale de resguardo', [
      ['Estudiante', e ? esc(ESTUDIANTES[e].nombre) : 'Pendiente', e ? '' : 'is-pending'],
      ['Equipo', 'Pendiente', 'is-pending'],
      ['Condición inicial', 'Pendiente', 'is-pending']
    ], 'La fecha y la hora se registran al confirmar.')}
  </div>`;
}

function vista02() {
  const err = state.errores;
  const campos = err ? err.campos : {};
  const filtro = state.filtro.trim().toLowerCase();
  const tarjetas = equipos.map((q) => {
    const off = q.estado !== 'disponible';
    const oculto = filtro && !(`${q.nombre} ${q.codigo}`.toLowerCase().includes(filtro));
    return `<label class="equipo ${off ? 'is-off' : ''}" ${oculto ? 'hidden' : ''} data-texto="${esc((q.nombre + ' ' + q.codigo).toLowerCase())}">
      <input class="sr-only" type="radio" name="equipo" value="${q.codigo}" ${state.codigoEquipo === q.codigo ? 'checked' : ''} ${off ? 'disabled' : ''}>
      <span class="tile">${icono(q.tipo)}</span>
      <span class="equipo-check" aria-hidden="true">${icono('check', 'ic-sm')}</span>
      <span class="equipo-name">${esc(q.nombre)}</span>
      <span class="equipo-code mono">${q.codigo}</span>
      ${chip(q.estado)}
    </label>`;
  }).join('');
  const sel = state.codigoEquipo ? equipoPor(state.codigoEquipo) : null;
  const cuerpoError = err ? `<ul>${err.lista.map((m) => `<li>${m}</li>`).join('')}</ul><p>Corrige el dato o cancela la operación.</p>` : '';

  return `${encabezado('Préstamos / Nuevo préstamo', 'Nuevo préstamo')}
  ${pasos(2)}
  <div class="layout">
    <form class="col" id="f-prestamo" novalidate>
      ${err ? alerta('error', 'No se puede confirmar el préstamo', cuerpoError) : ''}
      <section class="card" aria-labelledby="t-est">
        <h2 class="card-title" id="t-est"><span class="num">01</span>Estudiante</h2>
        ${persona(state.matriculaEstudiante)}
      </section>
      <section class="card" aria-labelledby="t-eq">
        <h2 class="card-title" id="t-eq"><span class="num">02</span>Selecciona el equipo</h2>
        <div class="field">
          <label for="filtro">Buscar equipo</label>
          <div class="input">${icono('buscar')}<input id="filtro" type="search" placeholder="Nombre o código" value="${esc(state.filtro)}" autocomplete="off"></div>
        </div>
        <fieldset class="equipos" ${campos.equipo ? 'aria-invalid="true" aria-describedby="error-equipo"' : ''}>
          <legend class="sr-only">Equipo disponible</legend>
          <div class="grid-equipos">${tarjetas}</div>
        </fieldset>
        <p class="empty" id="sin-resultados" hidden>No hay equipos que coincidan con la búsqueda.</p>
        ${campos.equipo ? `<p class="help is-error" id="error-equipo">${icono('alerta', 'ic-sm')}${campos.equipo}</p>` : ''}
      </section>
      <section class="card" aria-labelledby="t-cond">
        <h2 class="card-title" id="t-cond"><span class="num">03</span>Condición inicial</h2>
        <div class="field">
          <label for="condicion">Describe cómo se entrega el equipo</label>
          <textarea class="input ${campos.condicion ? 'is-error' : ''}" id="condicion" rows="3" required
            placeholder="Ej. sin daños, con cable HDMI y control remoto"
            aria-describedby="ayuda-condicion" ${campos.condicion ? 'aria-invalid="true"' : ''}>${esc(state.condicion)}</textarea>
          <p class="help ${campos.condicion ? 'is-error' : ''}" id="ayuda-condicion">
            ${campos.condicion ? icono('alerta', 'ic-sm') + 'Este dato es obligatorio. El préstamo no se registró.' : 'Dato obligatorio.'}
          </p>
        </div>
      </section>
      <div class="actions">
        <button class="btn btn-secondary" type="button" data-act="cancelar">Cancelar</button>
        <button class="btn btn-primary" type="submit">${err ? 'Completar y confirmar' : 'Confirmar préstamo'}</button>
      </div>
    </form>
    ${resumen('Vale de resguardo', [
      ['Estudiante', `${esc(ESTUDIANTES[state.matriculaEstudiante].nombre)} · <span class="mono">${state.matriculaEstudiante}</span>`],
      ['Equipo', sel ? `${esc(sel.nombre)} · <span class="mono">${sel.codigo}</span>` : 'Pendiente', sel ? '' : 'is-pending'],
      ['Condición inicial', state.condicion.trim() ? esc(state.condicion) : (campos.condicion ? 'Falta capturarla' : 'Pendiente'),
        'js-condicion ' + (state.condicion.trim() ? '' : campos.condicion ? 'is-missing' : 'is-pending')]
    ], 'Al confirmar, el equipo deja de estar disponible.')}
  </div>`;
}

function vista03A() {
  const p = state.prestamoRegistrado;
  const e = ESTUDIANTES[p.matricula];
  const q = equipoPor(p.codigo);
  return `${encabezado('Préstamos / Nuevo préstamo', 'Nuevo préstamo')}
  ${pasos(4)}
  <div class="layout">
    <div class="col">
      <section class="summary vale-lg" role="status" aria-labelledby="t-det">
        <p class="folio">Préstamo n.º <span class="mono">${String(p.id).padStart(4, '0')}</span></p>
        <h2 id="t-det">Préstamo registrado</h2>
        <span class="stamp">Activo</span>
        <p class="note">El préstamo quedó activo y el equipo ya no aparece como disponible.</p>
        <dl class="detail-grid">
          <div class="kv"><dt>Fecha y hora</dt><dd>${fecha(p.inicio)}</dd></div>
          <div class="kv"><dt>Estudiante</dt><dd>${esc(e.nombre)}, <span class="mono">${p.matricula}</span></dd></div>
          <div class="kv"><dt>Equipo</dt><dd>${esc(q.nombre)}, <span class="mono">${q.codigo}</span></dd></div>
          <div class="kv"><dt>Estado del equipo</dt><dd>${chip(q.estado)}</dd></div>
          <div class="kv kv-wide"><dt>Condición inicial</dt><dd>${esc(p.condIni)}</dd></div>
        </dl>
      </section>
      <div class="actions">
        <button class="btn btn-secondary" type="button" data-act="nuevo">Nuevo préstamo</button>
        <button class="btn btn-primary" type="button" data-act="ir-devolucion" data-id="${p.id}">Ir a devoluciones</button>
      </div>
    </div>
    ${resumen('Qué sigue', [
      ['Préstamo', 'Activo hasta registrar la devolución.'],
      ['Devolución', 'Se registra en Devoluciones con la condición final.']
    ], null, 'is-note')}
  </div>`;
}

function vista04() {
  const activos = prestamos.filter((p) => p.estado === 'activo');
  const d = state.devolucion;
  if (d.id && !activos.some((p) => p.id === d.id)) d.id = null;
  const lista = activos.length ? activos.map((p) => {
    const q = equipoPor(p.codigo); const e = ESTUDIANTES[p.matricula];
    return `<label class="row-item loan">
      <input type="radio" name="prestamo" value="${p.id}" ${d.id === p.id ? 'checked' : ''}>
      <span class="tile">${icono(q.tipo, 'ic-md')}</span>
      <span class="grow">
        <span class="row-title">${esc(q.nombre)} · <span class="mono">${q.codigo}</span></span>
        <span class="row-meta"><span>${esc(e.nombre)} · <span class="mono">${p.matricula}</span></span><span>Desde ${fecha(p.inicio)}</span></span>
      </span>
      ${chip('activo')}
    </label>`;
  }).join('') : '<p class="empty">No hay préstamos activos.</p>';

  const sel = activos.find((p) => p.id === d.id);
  return `${encabezado('Devoluciones / Registrar devolución', 'Registrar devolución', 'Elige el préstamo, revisa el equipo y anota cómo regresa.')}
  <div class="layout">
    <form class="col" id="f-devolucion" novalidate>
      <section class="card" aria-labelledby="t-act">
        <h2 class="card-title" id="t-act"><span class="num">01</span>Préstamos activos</h2>
        <fieldset class="equipos" ${d.error ? 'aria-invalid="true" aria-describedby="error-prestamo"' : ''}>
          <legend class="sr-only">Préstamo a devolver</legend>
          <div class="col">${lista}</div>
        </fieldset>
        ${d.error ? `<p class="help is-error" id="error-prestamo" role="alert">${icono('alerta', 'ic-sm')}Selecciona el préstamo que se va a devolver.</p>` : ''}
      </section>
      <section class="card" aria-labelledby="t-fin">
        <h2 class="card-title" id="t-fin"><span class="num">02</span>Condición final</h2>
        <fieldset class="equipos">
          <legend class="sr-only">Condición final del equipo</legend>
          <div class="options">
            <label class="option"><input type="radio" name="cond" value="completo" ${d.cond === 'completo' ? 'checked' : ''}>
              <span><strong>Completo y sin daños</strong><small>El préstamo se cierra y el equipo vuelve a estar disponible.</small></span></label>
            <label class="option"><input type="radio" name="cond" value="dano" ${d.cond === 'dano' ? 'checked' : ''}>
              <span><strong>Con daño o incompleto</strong><small>El equipo no queda disponible. La incidencia es otro requisito, aún sin responsable.</small></span></label>
          </div>
        </fieldset>
        <div class="field">
          <label for="obs">Observaciones (opcional)</label>
          <textarea class="input" id="obs" rows="2" placeholder="Ej. se entrega con cable y control remoto">${esc(d.obs)}</textarea>
        </div>
      </section>
      <div class="actions">
        <button class="btn btn-secondary" type="button" data-act="cancelar-dev">Cancelar</button>
        <button class="btn btn-primary" type="submit">Registrar devolución</button>
      </div>
    </form>
    ${resumen('Al registrar', [
      ['Préstamo', sel ? `${esc(equipoPor(sel.codigo).nombre)} · <span class="mono">${sel.codigo}</span> pasa de Activo a Cerrado.` : 'Pasa de Activo a Cerrado.'],
      ['Equipo', 'Vuelve a Disponible si regresa completo y sin daños.'],
      ['Historial', 'El préstamo se guarda en el historial del equipo (propuesta).']
    ], null, 'is-note')}
  </div>`;
}

function vista04R() {
  const p = state.prestamoDevuelto;
  const q = equipoPor(p.codigo);
  const ok = p.estado === 'cerrado';
  const hist = historial.filter((h) => h.codigo === p.codigo).sort((a, b) => b.fecha - a.fecha);
  return `${encabezado(`Devoluciones / <span class="mono">${q.codigo}</span>`, ok ? 'Préstamo cerrado' : 'Devolución con incidencia')}
  <div class="layout">
    <div class="col">
      ${ok
        ? alerta('ok', 'Devolución registrada', `<p>El préstamo se cerró y ${esc(q.nombre)} · ${q.codigo} vuelve a estar disponible.</p>`)
        : alerta('warn', 'Equipo no disponible', '<p>Se registró la devolución con daño o faltantes. Si el préstamo se cierra o sigue abierto está pendiente de validar (pregunta 3).</p>')}
      <section class="summary vale-lg" aria-labelledby="t-res">
        <p class="folio">Préstamo n.º <span class="mono">${String(p.id).padStart(4, '0')}</span></p>
        <h2 id="t-res">Vale de resguardo</h2>
        <span class="stamp ${ok ? 'stamp-black' : ''}">${ok ? 'Cerrado' : 'Incidencia'}</span>
        <p class="chips">Préstamo ${chip(p.estado)} Equipo ${chip(q.estado)}</p>
        <ol class="timeline">
          <li><strong>Préstamo registrado</strong><span class="when mono">${fecha(p.inicio)}</span><p>Condición inicial: ${esc(p.condIni)}</p></li>
          <li class="${ok ? 'is-ok' : 'is-err'}"><strong>Devolución registrada</strong><span class="when mono">${fecha(p.fin)}</span>
            <p>Condición final: ${ok ? 'completo y sin daños' : 'con daño o incompleto'}${p.obs ? '. ' + esc(p.obs) : '.'}</p></li>
        </ol>
      </section>
      <div class="actions end">
        <button class="btn btn-primary" type="button" data-act="volver-dev">Volver a devoluciones</button>
      </div>
    </div>
    <aside class="summary is-proposal" aria-label="Historial del equipo">
      <span class="tag-prop">Propuesta, sin requisito propio</span>
      <h2>Historial del equipo</h2>
      <ul class="history">${hist.map((h) => `<li><span class="mono">${fecha(h.fecha)}</span> · <span class="mono">${h.matricula}</span><br>${esc(h.cond)}</li>`).join('')}</ul>
      <p class="note">Pendiente de validar con el personal de resguardo y de asignar un requisito.</p>
    </aside>
  </div>`;
}

const RENDER = { '01': vista01, '02': vista02, '03A': vista03A, '03B': vista02, '04': vista04, '04R': vista04R };

function anotacion() {
  const el = $('#anotacion');
  if (!state.anotaciones) {
    el.className = 'anot is-min';
    el.innerHTML = `<button class="anot-open" type="button" data-act="anot-abrir">${icono('capas', 'ic-md')}Anotaciones</button>`;
    return;
  }
  const v = VISTAS[state.vista];
  const opciones = Object.entries(VISTAS).map(([k, x]) => `<option value="${k}" ${k === state.vista ? 'selected' : ''}>${k === '04R' ? '04' : k} · ${x.nombre}</option>`).join('');
  el.className = 'anot';
  el.innerHTML = `<div class="anot-head">
      <span class="anot-title">Vista ${state.vista === '04R' ? '04' : state.vista} · ${v.nombre}</span>
      <span class="anot-req">${v.req}</span>
      <button class="anot-x" type="button" data-act="anot-cerrar" aria-label="Ocultar anotaciones">${icono('cerrar', 'ic-md')}</button>
    </div>
    <p>${v.paso} Prototipo · datos de ejemplo · pendiente de validar.</p>
    <label>Ir a vista <select id="ir-vista">${opciones}</select></label>
    <details><summary>Datos de prueba</summary><ul>
      <li><span class="mono">22010001</span>: estudiante autorizado</li>
      <li><span class="mono">21010500</span>: estudiante no autorizado (regla por definir)</li>
      <li>Cualquier otra: matrícula no encontrada</li>
    </ul></details>`;
}

function render(enfocar = true) {
  const main = $('#contenido');
  main.innerHTML = `<div class="view">${RENDER[state.vista]()}</div>`;
  const seccion = seccionDe(state.vista);
  document.querySelectorAll('[data-nav]').forEach((b) => {
    if (b.dataset.nav === seccion) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  document.title = `${VISTAS[state.vista].nombre} · TecConect`;
  anotacion();
  aplicarFiltro();
  if (enfocar) { const h = $('h1', main); if (h) h.focus({ preventScroll: true }); window.scrollTo({ top: 0 }); }
}

function ir(vista) { state.vista = vista; render(); }

function buscar(valor) {
  state.matricula = valor.trim();
  if (ESTUDIANTES[state.matricula]) {
    state.matriculaEstudiante = state.matricula; state.noEncontrada = false;
    anunciar('Estudiante encontrado.');
  } else {
    state.matriculaEstudiante = null; state.noEncontrada = true;
  }
  render(false);
  if (state.matriculaEstudiante) $('[data-act="continuar"]').focus(); else $('#matricula').focus();
}

function confirmar() {
  const lista = []; const campos = {};
  const e = ESTUDIANTES[state.matriculaEstudiante];
  const q = state.codigoEquipo ? equipoPor(state.codigoEquipo) : null;
  if (!e.autorizado) lista.push('El estudiante no está autorizado para solicitar equipo.');
  if (!q) { lista.push('No se seleccionó un equipo.'); campos.equipo = 'Selecciona un equipo disponible.'; }
  else if (q.estado !== 'disponible') { lista.push('El equipo no está disponible.'); campos.equipo = 'El equipo seleccionado no está disponible.'; }
  if (!state.condicion.trim()) { lista.push('Falta un dato obligatorio: la condición inicial del equipo.'); campos.condicion = true; }

  if (lista.length) {
    state.errores = { lista, campos };
    ir('03B');
    return;
  }
  const p = { id: siguienteId++, matricula: state.matriculaEstudiante, codigo: q.codigo, inicio: new Date(), condIni: state.condicion.trim(), estado: 'activo' };
  prestamos.push(p);
  q.estado = 'prestado';
  state.prestamoRegistrado = p;
  limpiarBorrador();
  ir('03A');
}

function registrarDevolucion() {
  const d = state.devolucion;
  const p = prestamos.find((x) => x.id === d.id && x.estado === 'activo');
  if (!p) { d.error = true; render(false); $('input[name="prestamo"]')?.focus(); return; }
  const q = equipoPor(p.codigo);
  p.fin = new Date(); p.obs = d.obs.trim();
  if (d.cond === 'completo') {
    p.estado = 'cerrado'; q.estado = 'disponible';
    historial.push({ codigo: q.codigo, fecha: p.fin, matricula: p.matricula, cond: 'Completo y sin daños' });
  } else {
    p.estado = 'incidencia'; q.estado = 'revision';
    historial.push({ codigo: q.codigo, fecha: p.fin, matricula: p.matricula, cond: 'Con daño o incompleto · incidencia por registrar' });
  }
  state.prestamoDevuelto = p;
  state.devolucion = { id: null, cond: 'completo', obs: '', error: false };
  ir('04R');
}

function limpiarBorrador() {
  Object.assign(state, { matricula: '', noEncontrada: false, matriculaEstudiante: null, codigoEquipo: null, condicion: '', filtro: '', errores: null });
}

function aplicarFiltro() {
  const grid = $('.grid-equipos'); if (!grid) return;
  const f = state.filtro.trim().toLowerCase();
  let visibles = 0;
  grid.querySelectorAll('.equipo').forEach((c) => {
    const ver = !f || c.dataset.texto.includes(f); c.hidden = !ver; if (ver) visibles++;
  });
  $('#sin-resultados').hidden = visibles > 0;
}

function mostrarVistaDeEjemplo(vista) {
  const libre = () => (equipoPor('PRY-03').estado === 'disponible' ? 'PRY-03' : equipos.find((q) => q.estado === 'disponible')?.codigo);
  if (vista === '01') { limpiarBorrador(); return ir('01'); }
  if (vista === '02') { limpiarBorrador(); state.matriculaEstudiante = '22010001'; state.matricula = '22010001'; return ir('02'); }
  if (vista === '03B') { limpiarBorrador(); state.matriculaEstudiante = '22010001'; state.codigoEquipo = libre(); return confirmar(); }
  if (vista === '03A') {
    limpiarBorrador(); state.matriculaEstudiante = '22010001'; state.codigoEquipo = libre();
    state.condicion = 'Sin daños, con cable HDMI y control remoto.';
    if (!state.codigoEquipo) { equipoPor('PRY-03').estado = 'disponible'; state.codigoEquipo = 'PRY-03'; }
    return confirmar();
  }
  if (vista === '04') return ir('04');
  if (vista === '04R') {
    let p = prestamos.find((x) => x.estado === 'activo');
    if (!p) { mostrarVistaDeEjemplo('03A'); p = state.prestamoRegistrado; }
    state.devolucion = { id: p.id, cond: 'completo', obs: '', error: false };
    return registrarDevolucion();
  }
}

document.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (ev.target.id === 'f-buscar') buscar($('#matricula').value);
  if (ev.target.id === 'f-prestamo') confirmar();
  if (ev.target.id === 'f-devolucion') registrarDevolucion();
});

document.addEventListener('click', (ev) => {
  const nav = ev.target.closest('[data-nav]');
  if (nav) {
    if (nav.dataset.nav === 'prestamos') { if (seccionDe(state.vista) !== 'prestamos') { limpiarBorrador(); ir('01'); } }
    else ir('04');
    return;
  }
  const b = ev.target.closest('[data-act]'); if (!b) return;
  switch (b.dataset.act) {
    case 'continuar': state.errores = null; ir('02'); break;
    case 'cambiar': limpiarBorrador(); ir('01'); break;
    case 'cancelar': limpiarBorrador(); ir('01'); anunciar('Préstamo cancelado.'); break;
    case 'nuevo': limpiarBorrador(); ir('01'); break;
    case 'ir-devolucion': state.devolucion = { id: Number(b.dataset.id), cond: 'completo', obs: '', error: false }; ir('04'); break;
    case 'cancelar-dev': state.devolucion = { id: null, cond: 'completo', obs: '', error: false }; render(false); break;
    case 'volver-dev': ir('04'); break;
    case 'anot-cerrar': state.anotaciones = false; guardarPreferencia(false); anotacion(); $('.anot-open').focus(); break;
    case 'anot-abrir': state.anotaciones = true; guardarPreferencia(true); anotacion(); $('#ir-vista').focus(); break;
  }
});

document.addEventListener('input', (ev) => {
  const t = ev.target;
  if (t.id === 'filtro') { state.filtro = t.value; aplicarFiltro(); }
  if (t.id === 'condicion') {
    state.condicion = t.value;
    const dd = $('#res-condicion');
    if (dd) { dd.textContent = t.value.trim() || 'Pendiente'; dd.className = 'js-condicion ' + (t.value.trim() ? '' : 'is-pending'); }
  }
  if (t.id === 'obs') state.devolucion.obs = t.value;
});

document.addEventListener('change', (ev) => {
  const t = ev.target;
  if (t.name === 'equipo') {
    state.codigoEquipo = t.value;
    if (state.errores) delete state.errores.campos.equipo;
    render(false);
    document.querySelector(`input[name="equipo"][value="${t.value}"]`)?.focus();
  }
  if (t.name === 'prestamo') { state.devolucion.id = Number(t.value); state.devolucion.error = false; render(false); $(`input[name="prestamo"][value="${t.value}"]`)?.focus(); }
  if (t.name === 'cond') state.devolucion.cond = t.value;
  if (t.id === 'ir-vista') mostrarVistaDeEjemplo(t.value);
});

render(false);
