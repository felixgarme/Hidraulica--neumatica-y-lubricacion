/* ------------------------------------------- */
/* ------------ Script JavaScript ------------ */
/* ------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const cards = document.querySelectorAll('.modulo-card');
    const progressFill = document.querySelector('.progreso-fill');
    const progressIndicators = document.querySelectorAll('.progreso-indicador');
    const totalSlides = cards.length;
    let currentSlide = 0;
    
    // Función para habilitar el botón "Continuar" en el documento padre
    const enableContinueButton = () => {
        // Accede al documento padre (la página principal)
        try {
            const parentDocument = window.parent.document;
            const continueButton = parentDocument.querySelector('.start-button');
            
            // Si el botón existe en el documento padre, lo habilita
            if (continueButton) {
                continueButton.disabled = false;
                console.log('Botón "Continuar" habilitado en el documento padre.');
            }
        } catch (e) {
            // Manejar posibles errores de seguridad si los dominios no coinciden
            console.error('No se pudo acceder al documento padre. Error:', e);
        }
    };

    // Función principal para actualizar la interfaz de usuario
    const updateUI = (index) => {
        // Actualiza las tarjetas (slides)
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        // Actualiza los botones de navegación
        navButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        // Actualiza la barra de progreso
        const progressPercentage = (index / (totalSlides - 1)) * 100;
        
        // Verifica si progressFill existe antes de intentar modificarlo
        if (progressFill) {
            progressFill.style.width = progressPercentage + '%';
        }

        // Verifica que los indicadores de progreso existan
        if (progressIndicators.length > 1) {
            progressIndicators[0].textContent = index + 1;
            progressIndicators[1].textContent = totalSlides;
        }
        
        // Reposiciona el indicador de progreso activo
        const activeIndicator = document.querySelector('.progreso-indicador:first-child');
        
        // **NUEVA CORRECCIÓN:** Solo intenta modificar el estilo si el elemento existe
        if (activeIndicator) {
            const indicatorPosition = ((index) / (totalSlides - 1)) * 100;
            activeIndicator.style.left = `calc(${indicatorPosition}% - 10px)`;
        }

        // Verifica si es la última tarjeta para habilitar/deshabilitar el botón
        if (index === totalSlides - 1) {
            enableContinueButton();
        } else {
            // Deshabilita el botón si no es la última diapositiva
            try {
                const parentDocument = window.parent.document;
                const continueButton = parentDocument.querySelector('.start-button');
                if (continueButton) {
                    continueButton.disabled = true;
                }
            } catch (e) {
                // Manejar error de seguridad si aplica
            }
        }
    };

    // Función para ir a un slide específico
    const goToSlide = (index) => {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updateUI(currentSlide);
        }
    };

    // Manejar la navegación con teclado
    const handleKeydown = (e) => {
        if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        }
    };

    // Asignar eventos a los botones de navegación
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Asignar evento para navegación con teclado
    document.addEventListener('keydown', handleKeydown);

    // Iniciar la UI con el primer slide
    updateUI(currentSlide);
});