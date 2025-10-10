const equipos = [
  {
    nombre: 'ESPESADOR',
    imagen: '../../../assets/images/M1/b1.png',
    respuestaCorrecta: 'cilindro-nivel',
    textoRespuesta: 'Cilindro de nivel de rastra y motor de giro de rastra'
  },
  {
    nombre: 'CHANCADORA PRIMARIA',
    imagen: '../../../assets/images/M1/b2.png',
    respuestaCorrecta: 'hidroset',
    textoRespuesta: 'Hidroset'
  },
  {
    nombre: 'MOLINO SAG',
    imagen: '../../../assets/images/M1/b3.png',
    respuestaCorrecta: 'sistema-frenos',
    textoRespuesta: 'Sistema de frenos'
  },
  {
    nombre: 'FILTRO PRENSA',
    imagen: '../../../assets/images/M1/b4.png',
    respuestaCorrecta: 'qac-cilindros',
    textoRespuesta: 'QAC, Cilindro de sellado y Cilindro estabilizador'
  }
];

let equipoActual = 0;
let respuestas = {};

const equipoNombre = document.getElementById('equipoNombre');
const equipoImagen = document.getElementById('equipoImagen');
const zonaDrop = document.getElementById('zonaDrop');
const respuestaContainer = document.getElementById('respuestaContainer');
const opcionesGrid = document.getElementById('opcionesGrid');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const progresoTexto = document.getElementById('progresoTexto');
const resultadoModal = document.getElementById('resultadoModal');
const resultadoIcono = document.getElementById('resultadoIcono');
const resultadoTitulo = document.getElementById('resultadoTitulo');
const resultadoMensaje = document.getElementById('resultadoMensaje');
const btnContinuar = document.getElementById('btnContinuar');

function actualizarEquipo() {
  const equipo = equipos[equipoActual];
  equipoNombre.textContent = equipo.nombre;
  equipoImagen.src = equipo.imagen;
  equipoImagen.alt = equipo.nombre;
  progresoTexto.textContent = `Equipo ${equipoActual + 1} de ${equipos.length}`;
  
  btnAnterior.disabled = equipoActual === 0;
  
  const respuestaPrevia = respuestas[equipoActual];
  if (respuestaPrevia) {
    mostrarRespuesta(respuestaPrevia);
  } else {
    limpiarRespuesta();
  }
}

function mostrarRespuesta(opcion) {
  const zonaText = zonaDrop.querySelector('.zona-text');
  if (zonaText) {
    zonaText.style.display = 'none';
  }
  
  respuestaContainer.innerHTML = `<div class="respuesta-seleccionada">${opcion.texto}</div>`;
  
  const opciones = opcionesGrid.querySelectorAll('.opcion-card');
  opciones.forEach(card => {
    if (card.dataset.opcion === opcion.id) {
      card.classList.add('hidden');
    } else {
      card.classList.remove('hidden');
    }
  });
}

function limpiarRespuesta() {
  const zonaText = zonaDrop.querySelector('.zona-text');
  if (zonaText) {
    zonaText.style.display = 'block';
  }
  
  respuestaContainer.innerHTML = '';
  
  const opciones = opcionesGrid.querySelectorAll('.opcion-card');
  opciones.forEach(card => {
    card.classList.remove('hidden');
  });
}

function verificarRespuesta() {
  const respuestaActual = respuestas[equipoActual];
  if (!respuestaActual) {
    return false;
  }
  
  const equipo = equipos[equipoActual];
  return respuestaActual.id === equipo.respuestaCorrecta;
}

function mostrarResultado(esCorrecto) {
  const equipo = equipos[equipoActual];
  
  resultadoIcono.className = `resultado-icono ${esCorrecto ? 'correcto' : 'incorrecto'}`;
  resultadoTitulo.textContent = esCorrecto ? 'Correcto' : 'Incorrecto';
  resultadoMensaje.textContent = esCorrecto 
    ? `Has identificado correctamente el actuador hidráulico del ${equipo.nombre}.`
    : `La respuesta correcta es: ${equipo.textoRespuesta}`;
  
  resultadoModal.classList.add('show');
}

const opciones = opcionesGrid.querySelectorAll('.opcion-card');
opciones.forEach(opcion => {
  opcion.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', opcion.dataset.opcion);
    opcion.classList.add('dragging');
  });
  
  opcion.addEventListener('dragend', () => {
    opcion.classList.remove('dragging');
  });
});

zonaDrop.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  zonaDrop.classList.add('drag-over');
});

zonaDrop.addEventListener('dragleave', () => {
  zonaDrop.classList.remove('drag-over');
});

zonaDrop.addEventListener('drop', (e) => {
  e.preventDefault();
  zonaDrop.classList.remove('drag-over');
  
  const opcionId = e.dataTransfer.getData('text/plain');
  const opcionCard = opcionesGrid.querySelector(`[data-opcion="${opcionId}"]`);
  const textoOpcion = opcionCard.querySelector('p').textContent;
  
  respuestas[equipoActual] = {
    id: opcionId,
    texto: textoOpcion
  };
  
  mostrarRespuesta(respuestas[equipoActual]);
});

btnAnterior.addEventListener('click', () => {
  if (equipoActual > 0) {
    equipoActual--;
    actualizarEquipo();
  }
});

btnSiguiente.addEventListener('click', () => {
  if (!respuestas[equipoActual]) {
    alert('Por favor, selecciona un actuador hidráulico antes de continuar.');
    return;
  }
  
  const esCorrecto = verificarRespuesta();
  mostrarResultado(esCorrecto);
});

btnContinuar.addEventListener('click', () => {
  resultadoModal.classList.remove('show');
  
  if (equipoActual < equipos.length - 1) {
    equipoActual++;
    actualizarEquipo();
  } else {
    const totalCorrectas = Object.keys(respuestas).filter((key) => {
      const respuesta = respuestas[key];
      const equipo = equipos[key];
      return respuesta.id === equipo.respuestaCorrecta;
    }).length;
    
    resultadoTitulo.textContent = 'Actividad Completada';
    resultadoMensaje.textContent = `Has completado la identificación de todos los equipos. Respuestas correctas: ${totalCorrectas} de ${equipos.length}`;
    resultadoIcono.className = 'resultado-icono correcto';
    btnContinuar.textContent = 'Finalizar';
    resultadoModal.classList.add('show');
    
    btnContinuar.onclick = () => {
      // Mensaje enviado al finalizar la actividad
      window.parent.postMessage({ type: "terminado" }, "*");
      
      resultadoModal.classList.remove('show');
      equipoActual = 0;
      respuestas = {};
      btnContinuar.textContent = 'Continuar';
      btnContinuar.onclick = continuarSiguienteEquipo;
      actualizarEquipo();
    };
    
  }
});

function continuarSiguienteEquipo() {
  resultadoModal.classList.remove('show');
  
  if (equipoActual < equipos.length - 1) {
    equipoActual++;
    actualizarEquipo();
  }
}

actualizarEquipo();