// script.js
(function() {
    const contentData = {
        distribuidor4_2: {
            title: 'Distribuidores 4/2',
            content: `
                <h2>Distribuidores 4/2</h2>
                <p>Este tipo de válvulas (distribuidor en dos posiciones) son por excelencia los controles para aplicaciones neumáticas.</p>
                <p>Dentro de las aplicaciones hidráulicas su empleo es más limitado, ya que rara vez una aplicación en zona de potencia trabajará en “todo o nada”.</p>
                <p>Su uso está más orientado a funciones auxiliares, tales como el <strong>corte a cámaras</strong>, <strong>funciones de despresurización</strong> o <strong>descargas a presión reducida</strong>.</p>
                <blockquote>El motivo de no emplear este tipo de válvulas se encuentra en que cuando el cilindro hace tope físico (en máxima o mínima), se produce un incremento de presión que hace saltar la limitadora. 
                De este modo, la aplicación (cuando el actuador no se encuentra en movimiento) se encuentra a máxima presión y, por tanto, a pleno consumo.</blockquote>
            `
        },

        distribuidor4_3: {
            title: 'Distribuidores 4/3',
            content: `
                <h2>Distribuidores 4/3</h2>
                <p>Los distribuidores de tres posiciones resultan sin duda los más interesantes dentro de las aplicaciones hidráulicas.</p>
                <p>Sus aplicaciones son variadas, pero destacan especialmente en los controles direccionales donde se obtiene el máximo aprovechamiento.</p>
                <p>De las tres posiciones comentadas, dos de ellas son conocidas y corresponden a las distribuciones clásicas <strong>cruzadas y paralelas</strong>, o en otras palabras, distribuciones hacia A y B.</p>
                <p>La tercera posición es la más interesante: corresponde a la <strong>posición de reposo</strong> en los electrodistribuidores, coincidente con la <strong>posición central</strong>.</p>
                <p>La forma en que establecen las comunicaciones entre las vías es muy variada, lo que genera numerosas referencias disponibles en los catalogos.</p>
                <p>Este tipo de válvulas presenta <strong>cierre de todas sus vías en reposo</strong>, lo que significa que el fluido de las cámaras del actuador no puede ni entrar ni salir, forzando un bloqueo teórico de las mismas, mientras que al ser P un cierre, el sistema genera presión.</p>
            `
        },

        centroAbiertoPABT: {
            title: 'Centro Abierto (PABT)',
            content: `
                <h2>Centro Abierto (PABT)</h2>
                <p>En un centro abierto todas las vías están comunicadas entre sí, lo que provoca que el cilindro no pueda soportar cargas y no se genere presión en la aplicación.</p>
                <p>En ocasiones, estos efectos pueden ser convenientes, por ejemplo, cuando se desea un <strong>paro de carga</strong> con posibilidad de <strong>variación de posición</strong> (como en el accionamiento manual de un motor hidráulico).</p>
                <p>También se utiliza cuando no se desea generar presión, pero sí se precisa un bloqueo.</p>
                <p>Un centro abierto puede ser adecuado, pero debe combinarse con otros elementos como un <strong>doble antirretorno piloto</strong>. En este caso, la válvula se encarga del control direccional y la despresurización, mientras el doble antirretorno garantiza el bloqueo riguroso.</p>
            `
        },

        centroTandemPTAB: {
            title: 'Centro Tándem (PT/A/B)',
            content: `
                <h2>Centro Tándem (PT/A/B)</h2>
                <p>En este tipo de centro, las aplicaciones A y B se encuentran en bloqueo (no riguroso debido a la mecánica de corredera), mientras que se da comunicación entre P y T.</p>
                <p>De este modo se consigue <strong>despresurizar la aplicación en los periodos de reposo</strong>, logrando una operación más económica.</p>
                <p>Este mismo efecto podría lograrse mediante otros métodos, como válvulas 2/2 o descargas a presión reducida, siendo este solo otro medio alternativo.</p>
                <p>Cuando se trabaja con este tipo de válvulas, generalmente se trata de <strong>componentes únicos</strong>, ya que si existen otros actuadores que deban trabajar, no se podría generar presión de accionamiento a menos que el tándem se encuentre activo.</p>
                <p>En algunas ocasiones, se montan centros en tándem en serie. Este tipo de accionamientos son <strong>selectivos</strong>, ya que si se operan todas las válvulas simultáneamente, se producen <strong>influencias mutuas de presiones y caudales</strong>, por lo que no son circuitos de aplicación frecuente.</p>
            `
        },

        centroTandemPABT: {
            title: 'Centro Tándem (P/ABT)',
            content: `
                <h2>Centro Tándem (P/ABT)</h2>
                <p>Este tipo de válvulas, aunque de aparente poca utilidad direccional, es una de las más importantes a nivel hidráulico.</p>
                <p>En este diseño, <strong>P permanece en bloqueo</strong> (generando presión en el circuito), mientras que <strong>A, B y T se encuentran despresurizados</strong>.</p>
                <p>Una aplicación típica es el <strong>control direccional</strong>, siempre que el bloqueo sea asignado a otros componentes.</p>
                <p>Es común su uso junto con <strong>antirretornos de piloto</strong>, ya que la válvula realiza el avance y retorno del control direccional, despresurizando simultáneamente las líneas de piloto de los antirretornos, garantizando su efectividad total.</p>
                <p>Otra aplicación frecuente es su empleo como <strong>válvula piloto para distribuidores de gran tamaño</strong> (TN 16, 25, 32...), siendo uno de los sistemas más difundidos para este fin.</p>
            `
        },

        centroPAB_T: {
            title: 'Centro PAB/T',
            content: `
                <h2>Centro PAB/T</h2>
                <p>Su aplicación es más limitada que la del centro tándem P/ABT. En este tipo, ambas aplicaciones se encuentran presurizadas y T se encuentra en bloqueo.</p>
                <p>Cuando se activan las diferentes posiciones, una de las aplicaciones continúa en carga mientras que la otra se despresuriza.</p>
                <p>Su función principal consiste en el <strong>pilotaje de otras válvulas (servopilotaje)</strong>, no mediante inyección, sino por la <strong>despresurización de una cámara y el mantenimiento de presión en la inversa</strong>.</p>
            `
        },

        otrasConfiguraciones: {
            title: 'Otras Configuraciones de Centros',
            content: `
                <h2>Otras Configuraciones de Centros</h2>
                <p>Los fabricantes ofrecen una amplia gama de configuraciones de centros, la mayoría con aplicaciones limitadas y específicas.</p>
                <p>Muchos de estos diseños encajan perfectamente con <strong>bloques hidráulicos</strong> desarrollados por los mismos fabricantes, siendo de <strong>dudosa aplicación</strong> en otros circuitos.</p>
                <p>Aunque la variedad es extensa, todos los tipos son fácilmente asimilables en cuanto a funcionamiento.</p>
                <p>No todas las válvulas están diseñadas para montaje en placa; un ejemplo claro son las <strong>válvulas de control manual</strong>, utilizadas en diversas configuraciones especiales.</p>
            `
        }
    };

    // ===== ÚNICO CAMBIO REALIZADO AQUÍ =====
    // Se actualiza el array 'paramOrder' para que sus valores coincidan 
    // con las claves del objeto 'contentData' y los 'data-param' del HTML.
    const paramOrder = [
        'distribuidor4_2', 
        'distribuidor4_3', 
        'centroAbiertoPABT', 
        'centroTandemPTAB', 
        'centroTandemPABT', 
        'centroPAB_T', 
        'otrasConfiguraciones'
    ];
    // =======================================

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