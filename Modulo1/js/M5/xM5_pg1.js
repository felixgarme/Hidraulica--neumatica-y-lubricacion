
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 1;
    const totalSlides = 3;

    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showSlide(slideNumber) {
        if (slideNumber < 1) slideNumber = 1;
        if (slideNumber > totalSlides) slideNumber = totalSlides;

        slides.forEach(slide => slide.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        document.getElementById(`slide-${slideNumber}`).classList.add('active');
        document.querySelector(`[data-slide="${slideNumber}"].nav-btn`).classList.add('active');
        document.querySelector(`[data-slide="${slideNumber}"].indicator`).classList.add('active');

        currentSlide = slideNumber;

        prevBtn.style.opacity = currentSlide === 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentSlide === 1 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.5' : '1';
        nextBtn.style.cursor = currentSlide === totalSlides ? 'not-allowed' : 'pointer';
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const slideNum = parseInt(this.getAttribute('data-slide'));
            showSlide(slideNum);
        });
    });

    indicators.forEach(ind => {
        ind.addEventListener('click', function() {
            const slideNum = parseInt(this.getAttribute('data-slide'));
            showSlide(slideNum);
        });
    });

    prevBtn.addEventListener('click', function() {
        if (currentSlide > 1) {
            showSlide(currentSlide - 1);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentSlide < totalSlides) {
            showSlide(currentSlide + 1);
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (currentSlide > 1) showSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            if (currentSlide < totalSlides) showSlide(currentSlide + 1);
        }
    });

    showSlide(1);
});
