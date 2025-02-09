// assets/js/main.js

document.addEventListener("DOMContentLoaded", function() {
    /* --- Mise en évidence du lien de navigation actif --- */
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      if (window.location.href.includes(link.getAttribute('href'))) {
        link.classList.add('active');
      }
    });
  
    /* --- Effet de fondu lors du chargement de la page --- */
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1s ease-in';
    setTimeout(() => {
      document.body.style.opacity = 1;
    }, 100);
  
    /* --- Effet de scaling sur le bouton START (index.html) --- */
    const startButton = document.querySelector('.start-button');
    if (startButton) {
      startButton.addEventListener('click', function() {
        startButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
          startButton.style.transform = 'scale(1)';
        }, 200);
      });
    }
  
    /* --- Carousel pour la galerie d'images (images.html) --- */
    // Récupérer toutes les images de la galerie et stocker leurs sources
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const imageSources = [];
    galleryImages.forEach((img, index) => {
      imageSources.push(img.src);
      // Stocker l'indice dans un attribut data-index
      img.dataset.index = index;
      // Ajouter l'écouteur d'événement pour ouvrir le carousel
      img.addEventListener('click', openCarousel);
    });
  
    let currentIndex = 0;
    let keydownHandlerAttached = false;
    let touchstartX = null;
    let touchendX = null;
  
    // Ouvre le carousel en affichant le modal
    function openCarousel(event) {
      const clickedImg = event.currentTarget;
      currentIndex = parseInt(clickedImg.dataset.index);
  
      let modal = document.getElementById('carouselModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'carouselModal';
        modal.innerHTML = `
          <div class="carousel-container">
            <button class="close-modal">&times; Retour</button>
            <button class="prev">&lt;</button>
            <img class="carousel-image" src="" alt="Image en grand">
            <button class="next">&gt;</button>
          </div>
        `;
        document.body.appendChild(modal);
  
        // Bouton de fermeture
        modal.querySelector('.close-modal').addEventListener('click', closeCarousel);
        // Bouton Précédent
        modal.querySelector('.prev').addEventListener('click', function(e) {
          e.stopPropagation();
          prevImage();
        });
        // Bouton Suivant
        modal.querySelector('.next').addEventListener('click', function(e) {
          e.stopPropagation();
          nextImage();
        });
        // Fermer le modal si l'utilisateur clique en dehors du conteneur
        modal.addEventListener('click', function(e) {
          if (e.target === modal) {
            closeCarousel();
          }
        });
        
        // Ajout des événements tactiles pour la navigation par swipe
        modal.addEventListener('touchstart', handleTouchStart, false);
        modal.addEventListener('touchend', handleTouchEnd, false);
      }
  
      updateModalImage();
      modal.style.display = 'flex';
      document.body.classList.add('modal-open');
  
      // Ajouter l'écouteur pour la navigation au clavier si ce n'est pas déjà fait
      if (!keydownHandlerAttached) {
        document.addEventListener('keydown', keydownHandler);
        keydownHandlerAttached = true;
      }
    }
  
    // Met à jour l'image affichée dans le modal
    function updateModalImage() {
      const modal = document.getElementById('carouselModal');
      if (modal) {
        const carouselImage = modal.querySelector('.carousel-image');
        carouselImage.src = imageSources[currentIndex];
      }
    }
  
    // Ferme le carousel et retire les écouteurs associés
    function closeCarousel() {
      const modal = document.getElementById('carouselModal');
      if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
      if (keydownHandlerAttached) {
        document.removeEventListener('keydown', keydownHandler);
        keydownHandlerAttached = false;
      }
    }
  
    // Passe à l'image précédente
    function prevImage() {
      currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
      updateModalImage();
    }
  
    // Passe à l'image suivante
    function nextImage() {
      currentIndex = (currentIndex + 1) % imageSources.length;
      updateModalImage();
    }
  
    // Gestionnaire d'événements clavier pour la navigation dans le carousel
    function keydownHandler(e) {
      const modal = document.getElementById('carouselModal');
      if (modal && modal.style.display === 'flex') {
        if (e.key === "ArrowLeft") {
          prevImage();
        } else if (e.key === "ArrowRight") {
          nextImage();
        } else if (e.key === "Escape") {
          closeCarousel();
        }
      }
    }
  
    // Gestion des événements tactiles pour le swipe
    function handleTouchStart(e) {
      touchstartX = e.changedTouches[0].screenX;
    }
  
    function handleTouchEnd(e) {
      touchendX = e.changedTouches[0].screenX;
      handleGesture();
    }
  
    function handleGesture() {
      if (touchstartX === null || touchendX === null) return;
      const diff = touchstartX - touchendX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
      touchstartX = null;
      touchendX = null;
    }
  
    console.log('Main.js chargé et prêt.');
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Fondu d'entrée
    document.body.style.opacity = 1;
  
    // Fondu de sortie
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Vérifier qu'on ne fait pas de fade-out pour un ancrage interne (ex: #section)
        if (href && !href.startsWith('#')) {
          e.preventDefault();
          // Lance le fade-out
          document.body.style.opacity = 0;
  
          // Navigue vers la page une fois le fade-out terminé
          setTimeout(() => {
            window.location.href = href;
          }, 500); // 500ms = durée de la transition
        }
      });
    });
  });
  