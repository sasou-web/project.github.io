// assets/js/index.js
document.addEventListener('DOMContentLoaded', () => {
  // À chaque clic n’importe où dans le body, on redirige vers presentation.html
  document.body.addEventListener('click', () => {
    window.location.href = 'presentation.html';
  });
});
