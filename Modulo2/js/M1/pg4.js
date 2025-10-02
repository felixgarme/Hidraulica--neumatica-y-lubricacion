(function() {
  const correctAnswers = {
    'energia': 'A',
    'agua': 'A',
    'bolas': 'A',
    'mantenimiento': 'A',
    'repuestos': 'A',
    'seguridad': 'B',
    'personal': 'B',
    'depreciacion': 'B'
  };

  // NUEVO: Clave única para guardar el progreso en localStorage
  const progressKey = 'dragDropProgress_M1_pg4';

  let draggedElement = null;

  function initDragAndDrop() {
    const items = document.querySelectorAll('.curso-item');
    const dropZones = document.querySelectorAll('.curso-drop-zone');

    items.forEach(item => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
    });

    dropZones.forEach(zone => {
      zone.addEventListener('dragover', handleDragOver);
      zone.addEventListener('drop', handleDrop);
      zone.addEventListener('dragleave', handleDragLeave);
      zone.addEventListener('dragenter', handleDragEnter);
    });

    const itemsContainer = document.getElementById('itemsContainer');
    if (itemsContainer) {
      itemsContainer.addEventListener('dragover', handleDragOver);
      itemsContainer.addEventListener('drop', handleDrop);
      itemsContainer.addEventListener('dragleave', handleDragLeave);
      itemsContainer.addEventListener('dragenter', handleDragEnter);
    }
  }

  function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragEnd(e) {
    this.classList.remove('dragging');
    const dropZones = document.querySelectorAll('.curso-drop-zone');
    dropZones.forEach(zone => zone.classList.remove('drag-over'));
    const itemsContainer = document.getElementById('itemsContainer');
    if (itemsContainer) {
      itemsContainer.classList.remove('drag-over');
    }
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    if (this.classList.contains('curso-drop-zone') || this.id === 'itemsContainer') {
      this.classList.add('drag-over');
    }
  }

  function handleDragLeave(e) {
    if (e.target === this) {
      this.classList.remove('drag-over');
    }
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    e.preventDefault();

    this.classList.remove('drag-over');

    if (draggedElement && draggedElement !== this) {
      // Si el destino es una zona de arrastre o el contenedor inicial, permite soltarlo.
      if (this.classList.contains('curso-drop-zone') || this.id === 'itemsContainer') {
        this.appendChild(draggedElement);
        updateEmptyMessages();
        saveProgress(); // NUEVO: Guarda el progreso cada vez que se suelta un elemento.
      }
    }

    return false;
  }

  function updateEmptyMessages() {
    const dropZones = document.querySelectorAll('.curso-drop-zone');
    dropZones.forEach(zone => {
      const emptyMsg = zone.querySelector('.curso-drop-zone-empty');
      const items = zone.querySelectorAll('.curso-item');
      
      if (items.length > 0) {
        if (emptyMsg) emptyMsg.style.display = 'none';
      } else {
        if (emptyMsg) emptyMsg.style.display = 'block';
      }
    });

    const itemsContainer = document.getElementById('itemsContainer');
    const items = itemsContainer.querySelectorAll('.curso-item');
    if (items.length === 0) {
      itemsContainer.style.minHeight = '50px';
    } else {
      itemsContainer.style.minHeight = '100px';
    }
  }

  function checkAnswers() {
    const groupA = document.getElementById('groupA');
    const groupB = document.getElementById('groupB');
    const feedback = document.getElementById('feedback');
    const continueButton = document.getElementById('continueButton');

    const itemsInA = groupA.querySelectorAll('.curso-item');
    const itemsInB = groupB.querySelectorAll('.curso-item');

    let correct = 0;
    let total = 0;
    let allPlaced = true;

    const itemsContainer = document.getElementById('itemsContainer');
    const itemsNotPlaced = itemsContainer.querySelectorAll('.curso-item');

    if (itemsNotPlaced.length > 0) {
      allPlaced = false;
    }

    if (!allPlaced) {
      feedback.textContent = 'Por favor, coloca todos los elementos en los grupos antes de verificar.';
      feedback.className = 'curso-feedback error';
      feedback.style.display = 'block';
      return;
    }

    itemsInA.forEach(item => {
      const itemId = item.getAttribute('data-item');
      total++;
      if (correctAnswers[itemId] === 'A') {
        correct++;
      }
    });

    itemsInB.forEach(item => {
      const itemId = item.getAttribute('data-item');
      total++;
      if (correctAnswers[itemId] === 'B') {
        correct++;
      }
    });

    feedback.style.display = 'block';
    if (correct === total && total === Object.keys(correctAnswers).length) {
      feedback.textContent = 'Excelente trabajo. Todas las respuestas son correctas.';
      feedback.className = 'curso-feedback success';
      if (continueButton) {
        continueButton.style.display = 'block';
      }
    } else {
      feedback.textContent = `Tienes ${correct} de ${total} respuestas correctas. Revisa tu clasificación e intenta nuevamente.`;
      feedback.className = 'curso-feedback error';
      if (continueButton) {
        continueButton.style.display = 'none';
      }
    }
    saveProgress(); // NUEVO: Guarda el estado final (feedback y botón)
  }

  function resetActivity() {
    const itemsContainer = document.getElementById('itemsContainer');
    const allItems = document.querySelectorAll('.curso-item');
    const feedback = document.getElementById('feedback');
    const continueButton = document.getElementById('continueButton');

    allItems.forEach(item => {
      itemsContainer.appendChild(item);
    });

    feedback.className = 'curso-feedback';
    feedback.style.display = 'none';
    
    if (continueButton) {
      continueButton.style.display = 'none';
    }
    
    // NUEVO: Limpia el progreso guardado al reiniciar
    localStorage.removeItem(progressKey);

    updateEmptyMessages();
  }
  
  // NUEVO: Función para guardar el estado actual del ejercicio.
  function saveProgress() {
    const items = document.querySelectorAll('.curso-item');
    const progress = {
      itemPositions: {},
      feedback: {
        text: document.getElementById('feedback').textContent,
        className: document.getElementById('feedback').className,
        display: document.getElementById('feedback').style.display
      },
      continueButtonVisible: document.getElementById('continueButton').style.display === 'block'
    };

    items.forEach(item => {
      const itemId = item.getAttribute('data-item');
      const parentId = item.parentElement.id;
      progress.itemPositions[itemId] = parentId;
    });

    localStorage.setItem(progressKey, JSON.stringify(progress));
  }
  
  // NUEVO: Función para cargar y restaurar el progreso guardado.
  function loadProgress() {
    const savedProgress = localStorage.getItem(progressKey);
    if (!savedProgress) return;

    const progress = JSON.parse(savedProgress);

    // Restaurar posiciones de los items
    Object.keys(progress.itemPositions).forEach(itemId => {
      const parentId = progress.itemPositions[itemId];
      const itemElement = document.querySelector(`.curso-item[data-item="${itemId}"]`);
      const parentElement = document.getElementById(parentId);

      if (itemElement && parentElement) {
        parentElement.appendChild(itemElement);
      }
    });
    
    // Restaurar el feedback
    const feedback = document.getElementById('feedback');
    feedback.textContent = progress.feedback.text;
    feedback.className = progress.feedback.className;
    feedback.style.display = progress.feedback.display;

    // Restaurar visibilidad del botón continuar
    if (progress.continueButtonVisible) {
      document.getElementById('continueButton').style.display = 'block';
    }

    updateEmptyMessages(); // Actualizar la UI después de mover los elementos
  }

  document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
    loadProgress(); // NUEVO: Carga el progreso guardado tan pronto como la página está lista.
    updateEmptyMessages();

    const checkButton = document.getElementById('checkButton');
    const resetButton = document.getElementById('resetButton');

    if (checkButton) {
      checkButton.addEventListener('click', checkAnswers);
    }

    if (resetButton) {
      resetButton.addEventListener('click', resetActivity);
    }
  });
})();