document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.curso-section');
  
  sections.forEach(section => {
    const header = section.querySelector('.curso-section-header');
    
    header.addEventListener('click', function() {
      const isActive = section.classList.contains('active');
      
      if (isActive) {
        section.classList.remove('active');
      } else {
        section.classList.add('active');
      }
    });
  });
  
  const contentElements = document.querySelectorAll('.curso-section-content');
  contentElements.forEach(content => {
    content.style.maxHeight = content.scrollHeight + 'px';
  });
  
  window.addEventListener('resize', function() {
    const activeContents = document.querySelectorAll('.curso-section.active .curso-section-content');
    activeContents.forEach(content => {
      content.style.maxHeight = content.scrollHeight + 'px';
    });
  });
});