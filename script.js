// Configuration
const CONFIG = {
    cartAnimationDuration: 400,
    loaderTimeout: 1500,
    maxBlur: 5,
    searchBar: {
        expandedWidth: '200px',
        collapsedWidth: '150px',
        focusBg: 'rgba(255, 255, 255, 0.2)',
        blurBg: 'rgba(255, 255, 255, 0.1)'
    },
    productHover: {
        translateY: '-5px',
        bg: 'rgba(255, 255, 255, 0.1)'
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    if (!document.querySelector('.product-column')) return;
    
    setupProductHover();
    setupCartSystem();
    setupSearchBar();
    setupYearDisplay();
    setupThemeToggle();
    setupParallax();
    setupAOS();
    setupLoader();
    setupClickSounds();
    setupScrollBlur();
}

// Modules
function setupProductHover() {
    const productColumns = document.querySelectorAll('.product-column');
    
    productColumns.forEach(column => {
        column.addEventListener('mouseenter', () => {
            column.style.transform = `translateY(${CONFIG.productHover.translateY})`;
            column.style.background = CONFIG.productHover.bg;
        });
        
        column.addEventListener('mouseleave', () => {
            column.style.transform = 'translateY(0)';
            column.style.background = '';
        });
    });
}

function setupCartSystem() {
    const cartCounter = document.getElementById('cart-counter');
    if (!cartCounter) return;

    let cartItems = 0;
    const cart = new CartSystem();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            cartItems++;
            cartCounter.textContent = cartItems;
            cart.animateAddToCart();
        });
    });
}

function setupSearchBar() {
    const searchBar = document.querySelector('.search-bar');
    if (!searchBar) return;

    searchBar.addEventListener('focus', () => {
        searchBar.style.width = CONFIG.searchBar.expandedWidth;
        searchBar.style.background = CONFIG.searchBar.focusBg;
    });
    
    searchBar.addEventListener('blur', () => {
        searchBar.style.width = CONFIG.searchBar.collapsedWidth;
        searchBar.style.background = CONFIG.searchBar.blurBg;
    });
}

function setupYearDisplay() {
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    Object.assign(yearSpan.style, {
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        opacity: '0.5',
        fontSize: '0.8rem'
    });
    document.body.appendChild(yearSpan);
}

function setupThemeToggle() {
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    themeToggle.innerHTML = document.body.classList.contains('light-mode') 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

function setupParallax() {
    const parallaxContainer = document.querySelector('.parallax-container');
    if (parallaxContainer) {
        new Parallax(parallaxContainer);
    }
}

function setupAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out-quart'
    });
}

function setupLoader() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (!loader) return;

        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 600);
        }, CONFIG.loaderTimeout);
    });
}

function setupClickSounds() {
    const clickSound = new Audio('soft-click.mp3');
    
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {
                console.warn('Audio playback failed');
            });
        });
    });
}

function setupScrollBlur() {
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollY = window.scrollY;
            document.documentElement.style.setProperty(
                '--blur-intensity', 
                `${Math.min(scrollY / 100, CONFIG.maxBlur)}px`
            );
        }, 66); // ~15fps
    });
}

// Cart System Class
class CartSystem {
    constructor() {
        this.items = [];
        this.drawer = document.querySelector('.cart-drawer');
    }

    addItem(item) {
        this.items.push(item);
        this.updateDisplay();
        this.animateAddToCart();
    }

    animateAddToCart() {
        const cartCounter = document.getElementById('cart-counter');
        if (!cartCounter) return;

        cartCounter.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.5)', opacity: 0.5 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: CONFIG.cartAnimationDuration });
    }
}