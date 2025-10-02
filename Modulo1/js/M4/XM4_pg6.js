(function() {
  const words = [
    'MOLINOSAG',
    'MOLINODEBOLAS',
    'HIDROCICLÓN',
    'ZARANDAVIBRATORIA',
    'TROMMEL',
    'CHANCADORADEPEBBLES',
    'BOMBADEPULPA'
  ];

  const displayWords = [
    'Molino SAG',
    'Molino de Bolas',
    'Hidrociclón',
    'Zaranda Vibratoria',
    'Trommel',
    'Chancadora de Pebbles',
    'Bomba de Pulpa'
  ];

  let gridSize = 20;
  let grid = [];
  let foundWords = new Set();
  let isSelecting = false;
  let selectedCells = [];
  let startCell = null;

  function updateGridSize() {
    const width = window.innerWidth;
    if (width <= 480) {
      gridSize = 10;
    } else if (width <= 768) {
      gridSize = 12;
    } else if (width <= 1024) {
      gridSize = 15;
    } else {
      gridSize = 20;
    }
  }

  function initGrid() {
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const direction = Math.floor(Math.random() * 4);
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        
        if (canPlaceWord(word, row, col, direction)) {
          placeWord(word, row, col, direction);
          placed = true;
        }
        attempts++;
      }
    });
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
  }

  function canPlaceWord(word, row, col, direction) {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ];
    
    const [dRow, dCol] = directions[direction];
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + (dRow * i);
      const newCol = col + (dCol * i);
      
      if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
        return false;
      }
      
      if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    
    return true;
  }

  function placeWord(word, row, col, direction) {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ];
    
    const [dRow, dCol] = directions[direction];
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + (dRow * i);
      const newCol = col + (dCol * i);
      grid[newRow][newCol] = word[i];
    }
  }

  function renderGrid() {
    const gridElement = document.getElementById('wordsearchGrid');
    gridElement.innerHTML = '';
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = grid[i][j];
        cell.dataset.row = i;
        cell.dataset.col = j;
        
        cell.addEventListener('mousedown', handleMouseDown);
        cell.addEventListener('mouseenter', handleMouseEnter);
        cell.addEventListener('mouseup', handleMouseUp);
        cell.addEventListener('touchstart', handleTouchStart);
        cell.addEventListener('touchmove', handleTouchMove);
        cell.addEventListener('touchend', handleTouchEnd);
        
        gridElement.appendChild(cell);
      }
    }
  }

  function renderWordsList() {
    const wordsListElement = document.getElementById('wordsList');
    wordsListElement.innerHTML = '';
    
    displayWords.forEach((word, index) => {
      const wordItem = document.createElement('div');
      wordItem.className = 'word-item';
      wordItem.textContent = word;
      wordItem.dataset.index = index;
      
      if (foundWords.has(words[index])) {
        wordItem.classList.add('found');
      }
      
      wordsListElement.appendChild(wordItem);
    });
  }

  function handleMouseDown(e) {
    isSelecting = true;
    selectedCells = [];
    startCell = { row: parseInt(e.target.dataset.row), col: parseInt(e.target.dataset.col) };
    selectCell(e.target);
  }

  function handleMouseEnter(e) {
    if (isSelecting) {
      const currentCell = { row: parseInt(e.target.dataset.row), col: parseInt(e.target.dataset.col) };
      updateSelection(startCell, currentCell);
    }
  }

  function handleMouseUp() {
    if (isSelecting) {
      checkSelection();
      clearSelection();
      isSelecting = false;
    }
  }

  function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains('grid-cell')) {
      isSelecting = true;
      selectedCells = [];
      startCell = { row: parseInt(element.dataset.row), col: parseInt(element.dataset.col) };
      selectCell(element);
    }
  }

  function handleTouchMove(e) {
    e.preventDefault();
    if (isSelecting) {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.classList.contains('grid-cell')) {
        const currentCell = { row: parseInt(element.dataset.row), col: parseInt(element.dataset.col) };
        updateSelection(startCell, currentCell);
      }
    }
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    if (isSelecting) {
      checkSelection();
      clearSelection();
      isSelecting = false;
    }
  }

  function selectCell(cell) {
    cell.classList.add('selecting');
    selectedCells.push(cell);
  }

  function updateSelection(start, end) {
    clearSelection();
    
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;
    
    let dRow = 0;
    let dCol = 0;
    
    if (Math.abs(rowDiff) > Math.abs(colDiff)) {
      dRow = rowDiff > 0 ? 1 : -1;
    } else if (Math.abs(colDiff) > Math.abs(rowDiff)) {
      dCol = colDiff > 0 ? 1 : -1;
    } else if (rowDiff !== 0) {
      dRow = rowDiff > 0 ? 1 : -1;
      dCol = colDiff > 0 ? 1 : -1;
    }
    
    let currentRow = start.row;
    let currentCol = start.col;
    
    while (currentRow >= 0 && currentRow < gridSize && currentCol >= 0 && currentCol < gridSize) {
      const cell = document.querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`);
      if (cell) {
        selectCell(cell);
      }
      
      if (currentRow === end.row && currentCol === end.col) break;
      
      currentRow += dRow;
      currentCol += dCol;
    }
  }

  function clearSelection() {
    selectedCells.forEach(cell => cell.classList.remove('selecting'));
    selectedCells = [];
  }

  function checkSelection() {
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');
    const reversedWord = selectedWord.split('').reverse().join('');
    
    let foundWord = null;
    
    if (words.includes(selectedWord) && !foundWords.has(selectedWord)) {
      foundWord = selectedWord;
    } else if (words.includes(reversedWord) && !foundWords.has(reversedWord)) {
      foundWord = reversedWord;
    }
    
    if (foundWord) {
      foundWords.add(foundWord);
      selectedCells.forEach(cell => cell.classList.add('found'));
      updateStats();
      renderWordsList();
      showMessage('Palabra encontrada correctamente', 'success');
      
      // Comprueba si se han encontrado todas las palabras
      if (foundWords.size === words.length) {
        // LÍNEA AGREGADA: Envía el mensaje a la consola

        console.log("sopa-terminada");
        window.parent.postMessage("sopa-terminada", "*");
                
        setTimeout(() => {
          showMessage('Felicitaciones - Has completado la sopa de letras', 'success');
        }, 500);
      }
    }
  }

  function updateStats() {
    document.getElementById('foundCount').textContent = foundWords.size;
  }

  function showMessage(text, type) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = text;
    messageBox.className = 'wordsearch-message show ' + type;
    
    setTimeout(() => {
      messageBox.classList.remove('show');
    }, 3000);
  }

  function reset() {
    foundWords.clear();
    updateGridSize();
    initGrid();
    renderGrid();
    renderWordsList();
    updateStats();
    
    const messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('show');
  }

  function verify() {
    if (foundWords.size === words.length) {
      showMessage('Felicitaciones - Has completado la sopa de letras', 'success');
    } else {
      showMessage('Aún faltan palabras por encontrar', 'error');
    }
  }

  document.getElementById('resetBtn').addEventListener('click', reset);
  document.getElementById('verifyBtn').addEventListener('click', verify);
  
  window.addEventListener('resize', () => {
    const oldSize = gridSize;
    updateGridSize();
    if (oldSize !== gridSize) {
      reset();
    }
  });
  
  updateGridSize();
  initGrid();
  renderGrid();
  renderWordsList();
  updateStats();
})();