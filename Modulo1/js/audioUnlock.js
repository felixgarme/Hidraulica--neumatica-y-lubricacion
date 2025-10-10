// Archivo: audioUnlock.js

(function() {
  'use strict';

  // 1. Se genera una clave ÚNICA para cada página usando su ruta.
  // Ejemplo: para "M1_pg4.html", la clave será "unlock_status_/ruta/M1_pg4.html"
  const pagePath = window.location.pathname;
  const STORAGE_KEY = `unlock_status_${pagePath}`;

  // 2. Se busca el botón a desbloquear en la página actual.
  const continueBtn = document.getElementById('continueBtn');

  // Si la página no tiene un botón con id="continueBtn", el script no hace nada más.
  if (!continueBtn) {
    return;
  }

  // 3. Función centralizada para habilitar el botón y guardar el estado.
  function habilitarBotonYGuardar() {
    if (continueBtn.disabled) {
      continueBtn.disabled = false;
      console.log(`Botón habilitado para la página: ${pagePath}`);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }

  // 4. Al cargar la página, se revisa si ya estaba desbloqueada.
  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      habilitarBotonYGuardar();
    }
  });

  // 5. Se escucha el mensaje 'audio-terminado' desde cualquier iframe.
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'audio-terminado') {
      habilitarBotonYGuardar();
    }
  });

})();