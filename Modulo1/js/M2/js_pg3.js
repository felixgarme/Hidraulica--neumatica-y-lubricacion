// script.js
(function() {
    const contentData = {
        distribuidores42: {
            title: 'Distribuidores 4/2',
            content: `
                <h2>Distribuidores 4/2</h2>
                <p>Este tipo de válvulas (distribuidor en dos posiciones) son por excelencia los controles para aplicaciones neumáticas.</p>
                <p>Sin embargo, dentro de las aplicaciones hidráulicas su empleo es más limitado, ya que rara vez nuestra aplicación (en zona de potencia) trabajará en “todo o nada”.</p>
                
                <h3>Su empleo viene, por tanto, más encaminado a funciones auxiliares, tales como:</h3>
                <div class="motor-info-box">
                   <ul>
                        <li>Corte a cámaras</li>
                        <li>Funciones de despresurización</li>
                        <li>Descargas a presión reducida, etc.</li>
                   </ul>
                </div>

                <h3>Locución:</h3>
                <blockquote>El motivo de no emplear este tipo de válvulas se encuentra en que cuando el cilindro haga tope físico (en máxima o mínima), se producirá un incremento de presión que hará saltar la limitadora.<br><br>De este modo, la aplicación (cuando el actuador no se encuentre en movimiento) se encontrararía a máxima presión y, por tanto, a pleno consumo.</blockquote>
            `
        },
        distribuidores43: {
            title: 'Distribuidores 4/3',
            content: `
                <h2>Distribuidores 4/3</h2>
                <p>Imaginemos un circuito donde se precisa un corte de caudal. Para ello, tan solo deberemos emplear una válvula de 2 vías (abrir / cerrar).</p>
                <p>Los distribuidores de tres posiciones resultan sin duda los más interesantes dentro de las aplicaciones hidráulicas.</p>
                <p>Sus aplicaciones resultan del todo variadas, pero sin duda son en los controles direccionales donde “más jugo” se les puede sacar.</p>
                <p>De las tres posiciones comentadas, dos de ellas son conocidas, correspondientes a las distribuciones clásicas “cruzadas y paralelas”, o en otras palabras, distribuciones hacia A y B.</p>
                <p>Es precisamente la tercera posición la más interesante.</p>
                <p>Esta corresponde a la posición de reposo en los electrodistribuidores, y coincide con la posición central.</p>
                <p>La forma en que se establecen las comunicaciones entre las vías es del todo variada, haciendo que sean numerosas las referencias que podemos encontrar en catálogo.</p>
                <blockquote>Este tipo de válvulas presenta cierre de todas sus vías en reposo.<br><br>Esto tiene como consecuencia que el fluido de las cámaras del actuador no puede ni entrar ni salir (forzándose un teórico bloqueo de las mismas), mientras que, al ser P un cierre, el sistema generará presión.</blockquote>
            `
        }
    };

    // Actualizamos el orden para que coincida con los nuevos datos
    const paramOrder = ['distribuidores42', 'distribuidores43'];
    const cards = document.querySelectorAll('.motor-param-card');
    const detailSection = document.getElementById('detailSection');
    const detailContent = document.getElementById('detailContent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    let visitedParams = new Set();

    function showDetail(param) {
        const data = contentData[param];
        if (data) {
            detailContent.innerHTML = data.content;
            detailSection.classList.add('visible');
            detailSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            visitedParams.add(param);
            updateVisitedCards();
            checkCompletion();
        }
    }

    function setActiveCard(index) {
        cards.forEach(card => card.classList.remove('active'));
        // Asegurarse de que exista una tarjeta para el índice antes de añadir la clase
        if (cards[index]) {
            cards[index].classList.add('active');
        }
        currentIndex = index;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === paramOrder.length - 1;
    }

    function updateVisitedCards() {
        cards.forEach(card => {
            const param = card.getAttribute('data-param');
            if (visitedParams.has(param) && !card.classList.contains('active')) {
                card.classList.add('visited');
            }
        });
    }

    function checkCompletion() {
        if (visitedParams.size === paramOrder.length) {
            window.parent.postMessage({ type: "terminado" }, "*");
            console.log("terminado");
        }
    }

    function navigateToParam(index) {
        if (index >= 0 && index < paramOrder.length) {
            const param = paramOrder[index];
            setActiveCard(index);
            showDetail(param);
        }
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Buscamos el índice correcto en paramOrder basado en el data-param de la tarjeta
            const param = card.getAttribute('data-param');
            const newIndex = paramOrder.indexOf(param);
            if (newIndex !== -1) {
                navigateToParam(newIndex);
            }
        });
    });

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            navigateToParam(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < paramOrder.length - 1) {
            navigateToParam(currentIndex + 1);
        }
    });
    
    // Iniciar con el primer elemento si existe
    if (paramOrder.length > 0) {
        navigateToParam(0);
    }
})();