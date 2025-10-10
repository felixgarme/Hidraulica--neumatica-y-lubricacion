// script.js
(function() {
    const contentData = {
        engranes: {
            title: 'Motores de Engranes',
            content: `
                <h2>Motores de Engranes</h2>
                <p>En este grupo encontramos los motores de engranajes exteriores y los interiores (o planetarios). Ambos tipos son frecuentemente empleados ya que se consideran motores “económicos”.</p>
                
                <h3>Funcionamiento</h3>
                <p>Cuando se aplica un fluido hidráulico por la boca de entrada, este obliga a los dientes de los engranajes a girar (uno conductor y otro conducido). El fluido es transportado entre los huecos de los dientes hasta la boca de salida, la cual debe estar comunicada con el retorno a central (excepto en circuitos cerrados).</p>
                <p>La mecánica del componente permite que cualquiera de las dos bocas pueda comportarse como punto de alimentación, sometida a la presión del sistema.</p>
                
                <h3>Características Generales</h3>
                <div class="motor-info-box">
                   <p>Aunque la oferta de los fabricantes es muy amplia, a modo general se pueden encontrar motores de engranajes con las siguientes características:</p>
                   <ul>
                        <li><strong>Presiones:</strong> hasta 300 bar.</li>
                        <li><strong>Cilindradas:</strong> de 1 a 200 cm³.</li>
                        <li><strong>Rango de rotación:</strong> de 500 a 10,000 r.p.m.</li>
                   </ul>
                </div>
            `
        },
        paletas: {
            title: 'Motores de Paletas',
            content: `
                <h2>Motores de Paletas</h2>
                <p>El funcionamiento de estos actuadores es similar al de las bombas de paletas, pero a la inversa. Se aplica un fluido a presión para obtener el giro del eje motor.</p>
                
                <h3>Características Generales</h3>
                 <div class="motor-info-box">
                   <p>A modo muy general, sus características técnicas suelen ser:</p>
                   <ul>
                        <li><strong>Presiones:</strong> hasta 200 bar.</li>
                        <li><strong>Cilindradas:</strong> de 20 a 300 cm³.</li>
                        <li><strong>Rango de rotación:</strong> de 2000 a 4000 r.p.m.</li>
                   </ul>
                </div>
            `
        },
        pistones: {
            title: 'Motores de Pistones',
            content: `
                <h2>Motores de Pistones</h2>
                <p>Su funcionamiento es similar al de las bombas del mismo tipo. Existen motores de pistones de carácter radial (activados mediante una excéntrica) y de carácter axial.</p>
                <p>Una de sus principales ventajas es que se prestan muy bien a la <strong>variación de cilindrada</strong> y, consecuentemente, a la variación de la velocidad de salida de su eje.</p>

                <h3>Características Generales</h3>
                <div class="motor-info-box">
                   <p>Estos motores se caracterizan por su robustez y versatilidad:</p>
                   <ul>
                        <li><strong>Presiones:</strong> muy elevadas.</li>
                        <li><strong>Cilindradas:</strong> de 100 a 8000 cm³.</li>
                        <li><strong>Rango de rotación:</strong> de 1 a 3000 r.p.m.</li>
                   </ul>
                </div>
            `
        }
    };

    // Actualizamos el orden para que coincida con los nuevos datos
    const paramOrder = ['engranes', 'paletas', 'pistones'];
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