(function() {
  const pairs = [
    {
      indicator: 'Carga del molino',
      definition: 'Cantidad de mineral y bolas dentro del molino durante la molienda.'
    },
    {
      indicator: 'P80',
      definition: 'Tamaño de partícula en el que el 80% del material pasa por la malla.'
    },
    {
      indicator: 'Recuperación de mineral',
      definition: 'Porcentaje de mineral valioso recuperado respecto al mineral original procesado.'
    },
    {
      indicator: 'Consumo de energía por tonelada',
      definition: 'Energía consumida (kWh) por cada tonelada de mineral procesado.'
    },
    {
      indicator: 'Carga circulante',
      definition: 'Fracción de material que retorna al molino porque no alcanzó el tamaño requerido.'
    },
    {
      indicator: 'Disponibilidad del molino',
      definition: 'Porcentaje de tiempo que el molino está operativo respecto al plan.'
    },
    {
      indicator: 'Tiempo de molienda por tonelada',
      definition: 'Tiempo que tarda el molino en procesar una tonelada de mineral.'
    },
    {
      indicator: 'Relación de molienda (A/B)',
      definition: 'Relación entre el tamaño de alimentación y el tamaño del producto final.'
    }
  ];

  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let attempts = 0;
  let canFlip = true;

  function initGame() {
    const cardsGrid = document.getElementById('cardsGrid');
    const gameCards = [];

    pairs.forEach((pair, index) => {
      gameCards.push({
        id: index,
        type: 'indicator',
        content: pair.indicator,
        matched: false
      });
      gameCards.push({
        id: index,
        type: 'definition',
        content: pair.definition,
        matched: false
      });
    });

    cards = shuffleArray(gameCards);
    cardsGrid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    canFlip = true;

    updateStats();

    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.dataset.index = index;
      cardElement.innerHTML = `<div class="card-content">${card.content}</div>`;
      cardElement.addEventListener('click', () => flipCard(index));
      cardsGrid.appendChild(cardElement);
    });
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function flipCard(index) {
    if (!canFlip) return;
    
    const cardElement = document.querySelector(`[data-index="${index}"]`);
    const card = cards[index];

    if (card.matched || flippedCards.includes(index)) return;

    cardElement.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
      canFlip = false;
      attempts++;
      updateStats();
      checkMatch();
    }
  }

  function checkMatch() {
    const [index1, index2] = flippedCards;
    const card1 = cards[index1];
    const card2 = cards[index2];

    const cardElement1 = document.querySelector(`[data-index="${index1}"]`);
    const cardElement2 = document.querySelector(`[data-index="${index2}"]`);

    if (card1.id === card2.id) {
      setTimeout(() => {
        card1.matched = true;
        card2.matched = true;
        cardElement1.classList.add('matched');
        cardElement2.classList.add('matched');
        matchedPairs++;
        updateStats();
        flippedCards = [];
        canFlip = true;

        if (matchedPairs === pairs.length) {
          setTimeout(() => showVictory(), 500);
        }
      }, 600);
    } else {
      setTimeout(() => {
        cardElement1.classList.remove('flipped');
        cardElement2.classList.remove('flipped');
        flippedCards = [];
        canFlip = true;
      }, 1000);
    }
  }

  function updateStats() {
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('pairsFound').textContent = matchedPairs;
  }

  function showVictory() {
    document.getElementById('victoryMessage').classList.add('show');
  }

  function hideVictory() {
    document.getElementById('victoryMessage').classList.remove('show');
  }

  document.getElementById('resetBtn').addEventListener('click', () => {
    hideVictory();
    initGame();
  });

  document.getElementById('playAgainBtn').addEventListener('click', () => {
    hideVictory();
    initGame();
  });

  initGame();
})();