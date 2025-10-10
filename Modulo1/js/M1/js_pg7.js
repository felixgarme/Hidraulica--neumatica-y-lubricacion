// script.js
(function() {
    const contentData = {
        cilindrada: {
            title: 'Cilindrada',
            content: `
                <h2>Cilindrada</h2>
                <p>La cilindrada se entiende como la cantidad necesaria de aceite (habitualmente expresada en cm³) necesaria para forzar una revolución (vuelta completa del eje motor).</p>
                <p>En otras palabras, ya que los motores presentan cámaras internas (por ejemplo, en uno de engranajes serían los huecos de los dientes), se entiende que la cilindrada será el producto del volumen de cada una de las cámaras por el número de ellas.</p>
                
                <h3>Cálculo de la cilindrada</h3>
                <div class="motor-info-box">
                    <p>Para su cálculo tenemos... Se desprende que, de la fórmula del caudal necesario, se puede despejar la cilindrada del motor (algo generalmente conocido, ya que es un dato del catálogo del fabricante).</p>
                </div>
                
                <h3>Tipos de cilindrada</h3>
                <p>Como ya se ha comentado, la cilindrada podrá ser fija o variable (mediante diferentes mecanismos), lo cual constituye motores de velocidad fija o variable.</p>
                <p>No obstante, los más comunes son los de cilindrada fija y, por tanto, de velocidad fija, donde se emplearán componentes auxiliares para la regulación de la misma.</p>
            `
        },
        par: {
            title: 'Par Motor',
            content: `
                <h2>Par Motor</h2>
                <p>El par de un motor hidráulico corresponde al esfuerzo de rotación que un motor puede ejecutar. El equivalente con actuadores lineales es la fuerza que estos desarrollan.</p>
                
                <div class="motor-info-box">
                    <ul>
                        <li>En actuación lineal (cilindro) → FUERZA.</li>
                        <li>En actuación rotativa (motor) → PAR.</li>
                    </ul>
                </div>
                
                <h3>Ejemplo de par motor</h3>
                <div class="motor-example-box">
                    <p>Conociendo que el par corresponde al producto de la carga por el radio:</p>
                    <div class="motor-formula-box">
                        <p>Par (polea A) = 50 · 100 = 5000 Kp·cm</p>
                        <p>Par (polea B) = 100 · 100 = 10000 Kp·cm</p>
                    </div>
                    <p>Se observa que el par a conseguir es mayor en el caso B (para carga constante). Se debe tener en cuenta que, si ambos motores actúan a la misma velocidad, la elevación mediante la polea A será más lenta que en B.</p>
                </div>
                
                <h3>Cálculo del par motor</h3>
                <p>El par viene determinado por:</p>
                <ul>
                    <li>La cilindrada.</li>
                    <li>La diferencia de presiones del motor en sus bocas (entrada y salida o descarga).</li>
                    <li>El rendimiento mecánico.</li>
                </ul>
                <p>Su cálculo es realizado mediante fórmulas específicas.</p>
                <p>Despejando de la fórmula base, pueden obtenerse el resto de las variables, como por ejemplo:</p>
                <ul>
                    <li>Cálculo de caídas de presión necesarias.</li>
                    <li>Cálculo de cilindradas.</li>
                    <li>Otras magnitudes relacionadas.</li>
                </ul>
            `
        },
        caida: {
            title: 'Caída de presión',
            content: `
                <h2>Caída de presión</h2>
                <div class="motor-info-box">
                    <p>La caída de presión es un parámetro fundamental en el funcionamiento de los motores hidráulicos. Se refiere a la diferencia de presión entre la entrada y la salida del motor.</p>
                </div>
                <p>Este parámetro está directamente relacionado con el par motor que puede desarrollar el sistema y es esencial para dimensionar correctamente los componentes del circuito hidráulico.</p>
                <p>La caída de presión se calcula a partir de las fórmulas de par motor, despejando la variable correspondiente a la diferencia de presiones entre las bocas del motor.</p>
            `
        },
        potencia: {
            title: 'Potencia',
            content: `
                <h2>Potencia</h2>
                <p>La potencia desarrollada por un motor hidráulico será calculada en base a los parámetros anteriores, considerando el caudal, la presión y el rendimiento del sistema.</p>
                <div class="motor-info-box">
                    <p>La potencia representa la capacidad de trabajo que puede realizar el motor en un tiempo determinado y es resultado de la combinación de todos los parámetros estudiados anteriormente.</p>
                </div>
                <img src="../../../assets/images/M1/a2.png" alt="Fórmula de la potencia hidráulica" style="width: 100%; max-width: 500px; display: block; margin: 20px auto; border-radius: 8px;">
                <p>Para su cálculo, se tienen en cuenta factores como la cilindrada del motor, el caudal de fluido que lo atraviesa, la diferencia de presión entre entrada y salida, y los rendimientos mecánico y volumétrico del equipo.</p>
            `
        }
    };

    const paramOrder = ['cilindrada', 'par', 'caida', 'potencia'];
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
        cards[index].classList.add('active');
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
        const param = paramOrder[index];
        setActiveCard(index);
        showDetail(param);
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            navigateToParam(index);
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

    navigateToParam(0);
})();