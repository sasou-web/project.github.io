document.addEventListener('DOMContentLoaded', () => {
    // Animation au survol des produits
    const productColumns = document.querySelectorAll('.product-column');
    
    productColumns.forEach(column => {
        column.addEventListener('mouseenter', () => {
            column.style.transform = 'translateY(-5px)';
            column.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        column.addEventListener('mouseleave', () => {
            column.style.transform = 'translateY(0)';
            column.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // Gestion du panier
    const cartCounter = document.getElementById('cart-counter');
    let cartItems = 0;

    productColumns.forEach(column => {
        column.addEventListener('click', () => {
            cartItems++;
            cartCounter.textContent = cartItems;
            cartCounter.style.background = 'rgba(255, 255, 255, 0.2)';
            setTimeout(() => {
                cartCounter.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 200);
        });
    });

    // Animation de la barre de recherche
    const searchBar = document.querySelector('.search-bar');
    
    searchBar.addEventListener('focus', () => {
        searchBar.style.width = '200px';
        searchBar.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    searchBar.addEventListener('blur', () => {
        searchBar.style.width = '150px';
        searchBar.style.background = 'rgba(255, 255, 255, 0.1)';
    });

    // Mise à jour dynamique de l'année
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    document.body.appendChild(yearSpan).style.position = 'fixed';
    yearSpan.style.bottom = '10px';
    yearSpan.style.right = '10px';
    yearSpan.style.opacity = '0.5';
    yearSpan.style.fontSize = '0.8rem';
});