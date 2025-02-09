// Assurez-vous que le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.start-button');
  const content = document.querySelector('.content');

  // Écoute de l'événement mousemove sur le conteneur
  content.addEventListener('mousemove', (e) => {
    // Récupérer la position relative du curseur dans le conteneur
    const { left, top, width, height } = content.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculer des angles en fonction de la position
    // Ajustez ces coefficients pour obtenir l'effet souhaité
    const rx = ((y / height) - 0.5) * 20; // angle en degrés
    const ry = ((x / width) - 0.5) * -20;
    
    // Mettre à jour les variables CSS sur le bouton
    button.style.setProperty('--rx', `${rx}deg`);
    button.style.setProperty('--ry', `${ry}deg`);
  });

  // Réinitialiser l'effet lorsque la souris quitte le conteneur
  content.addEventListener('mouseleave', () => {
    button.style.setProperty('--rx', `0deg`);
    button.style.setProperty('--ry', `0deg`);
  });
});
