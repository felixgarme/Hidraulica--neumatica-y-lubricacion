document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.transfer-material, .molienda-sag');

  sections.forEach(section => {
    section.addEventListener('click', () => {
      section.classList.toggle('active');
    });
  });
});