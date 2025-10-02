// Funcionalidad para las pestañas
function showTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabContents.forEach(content => content.classList.remove('active'));
    tabButtons.forEach(button => button.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Re-aplicar animaciones al cambiar de pestaña para un efecto más dinámico
    const timelineItems = document.querySelectorAll('.timeline-item, .flow-step');
    timelineItems.forEach((item, index) => {
        item.style.animation = 'none'; // Resetear animación
        setTimeout(() => {
            item.style.animation = `slideInLeft 0.8s ease forwards`;
            item.style.animationDelay = `${index * 0.2}s`;
        }, 10);
    });
}

// Función para mostrar/ocultar detalles
function toggleDetails(sectionId) {
    const details = document.getElementById(sectionId + '-details');
    const indicator = document.getElementById(sectionId + '-indicator');
    const section = details.closest('.interactive-section');
    
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        indicator.textContent = '+';
        section.classList.remove('expanded');
    } else {
        details.classList.add('show');
        indicator.textContent = '−';
        section.classList.add('expanded');
    }
}

// Navegación entre páginas
function goToNextPage() {
    window.location.href = '../M2/M2_pg3.html';
}

function backPage() {
    window.location.href = 'M2_pg1.html';
}

// Inicialización cuando se carga la página
window.addEventListener('DOMContentLoaded', () => {
    // Inicializar SCORM
    ScormManager.init();
    ScormManager.guardarProgreso("M2_modos_operacion.html");
    
    // Cargar progreso
    const progreso = ScormManager.cargarProgreso();
    const porcentaje = progreso.score ? parseInt(progreso.score) : 0;
    const barra = document.getElementById("progreso-barra");
    const texto = document.getElementById("progreso-texto");
    
    if (barra) barra.style.width = porcentaje + "%";
    if (texto) texto.textContent = porcentaje + "%";
    
    // Aplicar animaciones a los elementos
    const timelineItems = document.querySelectorAll('.timeline-item, .flow-step');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Configurar eventos para las pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });
});

// Manejo de eventos para elementos interactivos
document.addEventListener('click', function(e) {
    // Manejo de secciones expandibles
    if (e.target.classList.contains('toggle-details')) {
        const sectionId = e.target.getAttribute('data-section');
        if (sectionId) {
            toggleDetails(sectionId);
        }
    }
});