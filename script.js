// Configuration globale
const CONFIG = {
    cartAnimation: {
        duration: 400,
        scale: 1.3
    },
    loaderDelay: 1500,
    search: {
        expandWidth: '18rem',
        collapseWidth: '2.8rem'
    },
    parallax: {
        sensitivity: 30
    }
};

// Classe principale de l'application
class AlpineStore {
    constructor() {
        this.init();
    }

    init() {
        this.cacheElements();
        this.initModules();
        this.setupEventListeners();
    }

    cacheElements() {
        this.elements = {
            cartButton: document.querySelector('.cart-button'),
            cartCount: document.querySelector('.cart-count'),
            searchInput: document.querySelector('.search-input'),
            productCards: document.querySelectorAll('.product-card'),
            themeButton: document.createElement('div'),
            loader: document.querySelector('.loader'),
            parallaxScene: document.querySelector('.parallax-container')
        };
    }

    initModules() {
        this.initAOS();
        this.initParallax();
        this.createThemeToggle();
        this.setupAudio();
    }

    // Initialisation des animations au scroll
    initAOS() {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out-quart'
        });
    }

    // Effet parallaxe
    initParallax() {
        if (this.elements.parallaxScene) {
            new Parallax(this.elements.parallaxScene, {
                relativeInput: true,
                clipRelativeInput: true,
                scalarX: CONFIG.parallax.sensitivity,
                scalarY: CONFIG.parallax.sensitivity
            });
        }
    }

    // Gestion du thème
    createThemeToggle() {
        this.elements.themeButton.className = 'nav-icon theme-toggle';
        this.elements.themeButton.innerHTML = '<i class="fas fa-moon"></i>';
        document.querySelector('.nav-group').appendChild(this.elements.themeButton);
        
        this.elements.themeButton.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            this.toggleThemeIcon();
            this.saveThemePreference();
        });
    }

    toggleThemeIcon() {
        const icon = this.elements.themeButton.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }

    saveThemePreference() {
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    }

    // Système audio
    setupAudio() {
        this.clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2929/2929-preview.mp3');
    }

    // Gestion du panier
    setupCart() {
        let cartItems = 0;

        document.querySelectorAll('.product-cta').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                cartItems++;
                this.updateCart(cartItems);
                this.animateCartButton();
                this.playClickSound();
            });
        });
    }

    updateCart(count) {
        this.elements.cartCount.textContent = count;
    }

    animateCartButton() {
        this.elements.cartButton.animate([
            { transform: 'scale(1)' },
            { transform: `scale(${CONFIG.cartAnimation.scale})` },
            { transform: 'scale(1)' }
        ], {
            duration: CONFIG.cartAnimation.duration,
            easing: 'ease-out'
        });
    }

    // Gestion de la recherche
    setupSearch() {
        this.elements.searchInput.addEventListener('focus', () => {
            this.elements.searchInput.style.width = CONFIG.search.expandWidth;
        });

        this.elements.searchInput.addEventListener('blur', () => {
            if (!this.elements.searchInput.value) {
                this.elements.searchInput.style.width = CONFIG.search.collapseWidth;
            }
        });
    }

    // Loader
    handleLoader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.elements.loader.style.opacity = '0';
                setTimeout(() => this.elements.loader.remove(), 600);
            }, CONFIG.loaderDelay);
        });
    }

    // Sons d'interaction
    playClickSound() {
        this.clickSound.currentTime = 0;
        this.clickSound.play().catch(() => {
            console.warn('Le son interactif est désactivé');
        });
    }

    // Événements globaux
    setupEventListeners() {
        // Header intelligent au scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const nav = document.querySelector('.glass-nav');
            
            if (currentScroll > lastScroll) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });

        // Initialisation des composants
        this.setupCart();
        this.setupSearch();
        this.handleLoader();

        // Clic général
        document.addEventListener('click', (e) => {
            if (e.target.closest('button')) {
                this.playClickSound();
            }
        });
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    const store = new AlpineStore();
});