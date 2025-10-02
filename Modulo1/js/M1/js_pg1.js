class CarouselController {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 9;
    this.track = document.getElementById('carouselTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.currentSlideSpan = document.getElementById('currentSlide');
    this.progressFill = document.getElementById('progressFill');
    this.indicators = document.getElementById('indicators');
    this.init();
  }

  init() {
    this.createIndicators();
    this.updateCarousel();
    this.addKeyboardSupport();
  }

  createIndicators() {
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      indicator.onclick = () => this.goToSlide(i);
      this.indicators.appendChild(indicator);
    }
  }

  updateCarousel() {
    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    this.currentSlideSpan.textContent = this.currentSlide + 1;
    this.prevBtn.disabled = this.currentSlide === 0;
    this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
    this.progressFill.style.width = `${progress}%`;
    const indicators = this.indicators.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });

    // Cuando se llega a la última diapositiva, mostrar en consola "carrucel-terminado".
    if (this.currentSlide === this.totalSlides - 1) {
      console.log('carrucel-terminado');
      window.parent.postMessage('carrucel-terminado', '*');
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateCarousel();
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateCarousel();
    }
  }

  goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < this.totalSlides) {
      this.currentSlide = slideIndex;
      this.updateCarousel();
    }
  }

  addKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      else if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
}

const carousel = new CarouselController();
function nextSlide() { carousel.nextSlide(); }
function previousSlide() { carousel.previousSlide(); }

let startX = 0, endX = 0;
const carouselContainer = document.querySelector('.carousel-wrapper');

carouselContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
carouselContainer.addEventListener('touchmove', (e) => {
  e.preventDefault();
});
carouselContainer.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  const difference = startX - endX;
  if (Math.abs(difference) > 50) {
    if (difference > 0) carousel.nextSlide();
    else carousel.previousSlide();
  }
});
