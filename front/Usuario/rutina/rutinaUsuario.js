//esta variable se obtendrá del usuario segun su plan (como parametro o localstorage)
const esPremiun = true;

//listener para cargar la rutina
document.addEventListener('DOMContentLoaded', function () {
  
  const main = document.querySelector('main');
  main.innerHTML = ''; // Limpia el contenido actual

  // Botones de semana
  const btnsSemana = document.createElement('div');
  btnsSemana.className = 'btns-semana-container';

  rutinaData.semanas.forEach((semana, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn-semana' + (i === 0 ? ' active' : '');
    btn.textContent = semana.nombre;
    btn.onclick = (e) => abrirSemana(e, `semana${i + 1}`);
    btnsSemana.appendChild(btn);
  });
  main.appendChild(btnsSemana);

  // Contenido de semanas
  rutinaData.semanas.forEach((semana, i) => {
    const semanaDiv = document.createElement('div');
    semanaDiv.id = `semana${i + 1}`;
    semanaDiv.className = 'semana-container' + (i === 0 ? ' active' : '');

    // Encabezado de semana
    const encab = document.createElement('div');
    encab.className = 'encab-semana';
    encab.innerHTML = `<h2>${semana.nombre}</h2>`;

    // Botones de días
    const btnsDias = document.createElement('div');
    btnsDias.className = 'btns-dias-container';
    semana.dias.forEach((dia, j) => {
      const btn = document.createElement('button');
      btn.className = 'btn-dia' + (j === 0 ? ' active' : '');
      btn.textContent = dia.nombre;
      btn.onclick = (e) => abrirEjDelDia(e, `s${i + 1}-dia${j + 1}`, `semana${i + 1}`);
      btnsDias.appendChild(btn);
    });
    encab.appendChild(btnsDias);
    semanaDiv.appendChild(encab);

    // Días
    semana.dias.forEach((dia, j) => {
      const diaDiv = document.createElement('div');
      diaDiv.id = `s${i + 1}-dia${j + 1}`;
      diaDiv.className = 'ejercicios-por-dia' + (j === 0 ? ' active' : '');

      // Ejercicios
      const seccionesDia = document.createElement('div');
      seccionesDia.className = 'secciones-dia';

      // Columna izquierda: ejercicios
      const izq = document.createElement('div');
      izq.className = 'secc-izq-dia';
      izq.innerHTML = `<h3>Ejercicios del ${dia.nombre} (${semana.nombre})</h3>`;
      const ul = document.createElement('ul');
      ul.className = 'lista-ejercicios';
      dia.ejercicios.forEach((ej, k) => {
        const li = document.createElement('li');
        li.innerHTML = `
  <div class="encab-ejercicio-container">
    <input type="checkbox" id="s${i + 1}d${j + 1}ej${k + 1}" />
    <label for="s${i + 1}d${j + 1}ej${k + 1}">${ej.nombre}</label>
    <button class="btn-desplegable" aria-expanded="false" aria-controls="detalle-s${i + 1}d${j + 1}ej${k + 1}">
      <i class="fas fa-chevron-down"></i>
    </button>
  </div>
  <div class="detalle-ejercicio" id="detalle-s${i + 1}d${j + 1}ej${k + 1}">
    <div class="contenedor-detalle-ejercicio">
      <label>Repeticiones:</label>
      <input type="text" class="detalle-pausa" value="${ej.repeticiones || ''}" readonly>
    </div>
    <div class="contenedor-detalle-ejercicio">
      <label>Peso Sugerido:</label>
      <input type="text" class="detalle-pausa" value="${ej.peso || ''}" readonly>
    </div>
    <div class="contenedor-detalle-ejercicio">
      <label>Dificultad:</label>
      <input type="text" class="detalle-pausa" value="${ej.dificultad || ''}" readonly>
    </div>
    <div class="contenedor-detalle-ejercicio">
      <label>Observaciones:</label>
      <input type="text" class="detalle-link" value="${ej.observaciones || ''}" readonly>
    </div>
   ${ej.video ? `
  <div class="contenedor-detalle-ejercicio">
    <label>Video:</label>
    ${esPremiun ? `
      <a href="${ej.video}" target="_blank" class="detalle-link-video">
        Ver explicación <i class="fab fa-youtube"></i>
      </a>
    ` : `
      <span class="detalle-link-video no-premium">
        Hazte <strong>PREMIUM</strong> para ver el video 
      </span>
    `}
  </div>
` : ''}
  </div>
`;
        ul.appendChild(li);
      });
      izq.appendChild(ul);
      seccionesDia.appendChild(izq);

      // Columna derecha: descripción e imagen
      const der = document.createElement('div');
      der.className = 'secc-derecha-dia';
      der.innerHTML = `
        <div class="text-box">
          <h4>Descripción ${dia.nombre} - ${semana.nombre}</h4>
          <p>${dia.descripcion || ''}</p>
        </div>
        <img src="${dia.imagen || ''}" alt="Imagen descriptiva de rutina" />
      `;
      seccionesDia.appendChild(der);

      diaDiv.appendChild(seccionesDia);
      semanaDiv.appendChild(diaDiv);
    });

    main.appendChild(semanaDiv);
  });
});


//listener para "desplegar" o "cerrar" y ejercicio
document.addEventListener('click', function (e) {
  if (e.target.closest('.btn-desplegable')) {
    const btn = e.target.closest('.btn-desplegable');
    const icon = btn.querySelector('i');
    const detalleId = btn.getAttribute('aria-controls');
    const detalle = document.getElementById(detalleId);

    if (detalle) {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      // Cierra todos los detalles y resetea los botones de este ul
      const ul = btn.closest('ul.lista-ejercicios');
      if (ul) {
        ul.querySelectorAll('.detalle-ejercicio').forEach(d => d.style.display = 'none');
        ul.querySelectorAll('.btn-desplegable').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          const i = b.querySelector('i');
          if (i) {
            i.classList.add('fa-chevron-down');
            i.classList.remove('fa-chevron-up');
          }
        });
      }

      // Si estaba cerrado, lo abrimos
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        detalle.style.display = 'block';
        if (icon) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        }
      }
    }
  }
});

// Oculta todos los detalles al inicio
document.querySelectorAll('.detalle-ejercicio').forEach(detalle => {
  detalle.style.display = 'none';
});

// -------------------------- FUNCIONES -----------------------------------
function abrirSemana(event, semanaId) {
  document.querySelectorAll('.btn-semana').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.semana-container').forEach(div => div.classList.remove('active'));
  document.getElementById(semanaId).classList.add('active');
}

function abrirEjDelDia(event, diaId, semanaId) {
  const semanaDiv = document.getElementById(semanaId);
  semanaDiv.querySelectorAll('.btn-dia').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  semanaDiv.querySelectorAll('.ejercicios-por-dia').forEach(div => div.classList.remove('active'));
  semanaDiv.querySelector(`#${diaId}`).classList.add('active');
}


