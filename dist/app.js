const origin = 'https://ull-esit-sistemas-operativos.github.io/ssoo-apuntes/';
const nav = document.querySelector('#nav');
const view = document.querySelector('#view');
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');

const topics = groups.flatMap(([group, path, entries]) => entries.map(
  ([title, id, summary, points, example, demo]) => ({group, path, title, id, summary, points, example, demo})
));

nav.innerHTML = groups.map(([group, , entries]) => `
  <details><summary>${group}</summary>
    ${entries.map(([title, id]) => `<a href="#${id}">${title}</a>`).join('')}
  </details>`).join('');

function toggleMenu(open) {
  sidebar.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
}
menu.addEventListener('click', () => toggleMenu(!sidebar.classList.contains('open')));
nav.addEventListener('click', event => {
  if (event.target.matches('a')) toggleMenu(false);
});

function diagram(nodes, description) {
  return `<div class="signal">${nodes.map(node => `<span class="node">${node}</span>`).join('<span class="arrow" aria-hidden="true">→</span>')}</div><p>${description}</p>`;
}

function selectDemo(controls, display, label, options, update) {
  controls.innerHTML = `<label for="choice" class="form-label">${label}</label>
    <select id="choice" class="form-select">${options.map((option, i) => `<option value="${i}">${option}</option>`).join('')}</select>`;
  const select = controls.querySelector('select');
  const render = () => { display.innerHTML = update(Number(select.value)); };
  select.addEventListener('change', render);
  render();
}

function numberDemo(controls, display, label, value, max, update) {
  controls.innerHTML = `<label for="amount" class="form-label">${label}</label>
    <input type="number" id="amount" class="form-control" min="0" max="${max}" step="1" value="${value}">`;
  const input = controls.querySelector('input');
  const render = () => {
    display.innerHTML = input.value && input.validity.valid
      ? update(input.valueAsNumber)
      : `<p>Introduce un entero entre 0 y ${max}.</p>`;
  };
  input.addEventListener('input', render);
  render();
}

function actionDemo(controls, actions) {
  controls.innerHTML = Object.keys(actions).map((label, i) =>
    `<button type="button" class="btn btn-outline-light btn-sm" data-action="${i}">${label}</button>`).join(' ');
  for (const [i, action] of Object.values(actions).entries()) {
    controls.querySelector(`[data-action="${i}"]`).addEventListener('click', action);
  }
}

function format(value) {
  return new Intl.NumberFormat('es-EC', {maximumFractionDigits: 2}).format(value);
}

const demos = {
  schedule(controls, display) {
    selectDemo(controls, display, 'Algoritmo · A = 4 ms, B = 2 ms, C = 1 ms (llegan en t = 0)',
      ['FCFS', 'SJF', 'Round Robin (2 ms)'], option => {
        const segments = [
          [['A', 4], ['B', 2], ['C', 1]],
          [['C', 1], ['B', 2], ['A', 4]],
          [['A', 2], ['B', 2], ['C', 1], ['A', 2]]
        ][option];
        let time = 0;
        const bars = segments.map(([task, duration]) => {
          const start = time;
          time += duration;
          return `<div class="node gantt-${task}" style="flex:${duration}"><b>${task}</b><br>${start}–${time}</div>`;
        });
        return `<div class="gantt">${bars.join('')}</div><p>Tiempo en ms. Espera media: ${format([10/3, 4/3, 3][option])} ms.</p>`;
      });
  },
  messages(controls, display) {
    const queue = [];
    let next = 1;
    const render = status => {
      display.innerHTML = diagram(['Emisor', `Cola [${queue.join(' | ') || 'vacía'}]`, 'Receptor'], status);
    };
    actionDemo(controls, {
      Enviar: () => {
        if (queue.length === 2) return render('Cola llena. El envío no bloqueante debe reintentarse.');
        const message = `M${next++}`;
        queue.push(message);
        render(`${message} se añade al final de la cola.`);
      },
      Recibir: () => {
        const message = queue.shift();
        render(message ? `El receptor retira ${message}, el primer mensaje de la cola.` : 'Cola vacía. Aún no hay un mensaje para recibir.');
      },
      Reiniciar: () => {
        queue.length = 0;
        next = 1;
        render('Cola vacía.');
      }
    });
    render('Envía dos mensajes y observa en qué orden se reciben.');
  },
  shared(controls, display) {
    let value = 0;
    const render = description => {
      display.innerHTML = diagram(['Proceso A', `Celda común [${value}]`, 'Proceso B'], description);
    };
    actionDemo(controls, {
      'A escribe +1': () => {
        value++;
        render(`A actualizó la celda a ${value}.`);
      },
      'B lee': () => render(`B leyó ${value} desde la misma región.`),
      Reiniciar: () => {
        value = 0;
        render('La celda vuelve a contener 0.');
      }
    });
    render('La celda empieza en 0. Escribe desde A y lee el resultado desde B.');
  },
  threads(controls, display) {
    numberDemo(controls, display, 'Número de hilos · 12 MiB compartidos y 1 MiB de pila por hilo', 4, 256, count =>
      `<div class="memory-track" aria-hidden="true"><span style="flex:12">Compartida</span><span style="flex:${count};display:${count ? 'block' : 'none'}"></span></div>` +
      diagram([`12 MiB compartidos`, `+${count} MiB en pilas`, `${12 + count} MiB estimados`],
        'Modelo simplificado de memoria reservada. El uso real depende del sistema y de las páginas de pila que se utilicen.'));
  },
  base(controls, display) {
    numberDemo(controls, display, 'Dirección lógica · base física 4000, límite 1000 bytes', 240, 2000, address =>
      address < 1000
        ? diagram([`Lógica ${address}`, `4000 + ${address}`, `Física ${4000 + address}`], 'El desplazamiento está dentro de la región asignada.')
        : diagram([`Lógica ${address}`, 'Límite 1000', 'Acceso rechazado'], 'La dirección alcanza o supera el límite.'));
  },
  paging(controls, display) {
    const frames = [5, 2, 7, 1];
    numberDemo(controls, display, 'Dirección virtual en bytes · páginas 0 a 3', 5000, 16383, address => {
      const page = Math.floor(address / 4096);
      const offset = address % 4096;
      const frame = frames[page];
      return diagram([`Página ${page}`, `Marco ${frame}`, `Física ${frame * 4096 + offset}`],
        `Tabla: 0→5, 1→2, 2→7, 3→1. Se conserva el desplazamiento de ${offset} bytes.`);
    });
  },
  virtual(controls, display) {
    const trace = ['A', 'B', 'A', 'C', 'A', 'B'];
    const frames = [];
    let step = 0;
    let faults = 0;
    const render = description => {
      display.innerHTML = diagram([`Referencias: ${trace.slice(0, step).join(' ') || '—'}`,
        `Marcos: ${frames[0] ?? 'libre'} | ${frames[1] ?? 'libre'}`, `Fallos: ${faults}`], description);
    };
    actionDemo(controls, {
      'Siguiente acceso': () => {
        const page = trace[step++];
        const found = frames.indexOf(page);
        if (found !== -1) {
          render(`Acierto: ${page} ya está en RAM.`);
        } else {
          const evicted = frames.length === 2 ? frames.shift() : null;
          frames.push(page);
          faults++;
          render(evicted ? `Fallo: ${page} reemplaza a ${evicted} por FIFO.` : `Fallo: ${page} ocupa un marco libre.`);
        }
        if (step === trace.length) controls.firstElementChild.disabled = true;
      },
      Reiniciar: () => {
        step = faults = frames.length = 0;
        controls.firstElementChild.disabled = false;
        render('Traza: A, B, A, C, A, B. Avanza para ver cómo se llenan los marcos.');
      }
    });
    render('Traza: A, B, A, C, A, B. Avanza para ver cómo se llenan los marcos.');
  }
};

function renderTopic() {
  const hash = location.hash.slice(1);
  if (hash === 'topic') return;
  const index = Math.max(0, topics.findIndex(topic => topic.id === hash));
  const topic = topics[index];
  document.title = `${topic.title} · Sistemas operativos`;
  for (const link of nav.querySelectorAll('a')) {
    if (link.hash === `#${topic.id}`) {
      link.setAttribute('aria-current', 'page');
      link.closest('details').open = true;
    } else {
      link.removeAttribute('aria-current');
    }
  }
  const prev = topics[index - 1];
  const next = topics[index + 1];
  view.innerHTML = `
    <div class="eyebrow">${topic.group}</div>
    <h1>${topic.title}</h1>
    <p class="lede">${topic.summary}</p>
    <div class="row g-3">
      <div class="col-xl-5"><section class="panel">
        <h2>Puntos importantes</h2>
        <ul class="points">${topic.points.map(point => `<li>${point}</li>`).join('')}</ul>
      </section></div>
      <div class="col-xl-7"><section class="panel lab">
        <h2>Ejemplo interactivo</h2>
        <h3 class="demo-title">${topic.example}</h3>
        <div class="controls my-3"></div>
        <div class="display" aria-live="polite"></div>
      </section></div>
    </div>
    <div class="sequence">
      <div>${prev ? `<a class="btn btn-outline-light btn-sm" href="#${prev.id}">← ${prev.title}</a>` : ''}</div>
      ${next ? `<a class="btn btn-outline-light btn-sm" href="#${next.id}">${next.title} →</a>` : ''}
    </div>
    <a class="d-inline-block mt-3" href="${origin}${topic.path}/${topic.id}/">Leer el capítulo original <span aria-hidden="true">↗</span></a>`;
  const controls = view.querySelector('.controls');
  const display = view.querySelector('.display');
  if (Array.isArray(topic.demo)) {
    selectDemo(controls, display, 'Elige un caso', topic.demo.map(([label]) => label), selected => {
      const [, nodes, description] = topic.demo[selected];
      return diagram(nodes.split(' › '), description);
    });
  } else {
    demos[topic.demo](controls, display);
  }
}

window.addEventListener('hashchange', () => {
  if (location.hash !== '#topic') {
    renderTopic();
    toggleMenu(false);
    window.scrollTo(0, 0);
    document.querySelector('#topic').focus({preventScroll:true});
  }
});
if (location.hash === '#topic') history.replaceState(null, '', location.pathname + location.search);
renderTopic();
