// Utilitários
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Força o favicon
const forceFavicon = () => {
    const faviconLinks = [
        { rel: 'icon', type: 'image/x-icon', href: '/assets/img/ico.ico' },
        { rel: 'icon', type: 'image/png', href: '/assets/img/ico.png' },
        { rel: 'apple-touch-icon', href: '/assets/img/ico.png' }
    ];

    // Remove favicons existentes
    document.querySelectorAll('link[rel*="icon"]').forEach(link => link.remove());

    // Adiciona novos favicons
    faviconLinks.forEach(favicon => {
        const link = document.createElement('link');
        Object.assign(link, favicon);
        document.head.appendChild(link);
    });
};

// Cache dos elementos DOM
const DOMCache = {
    svgImages: null,
    btnPlay: null,
    video: null,
    thumbnail: null,
    btnNav: null,
    navContent: null,
    modal: null,
    openModalBtn: null,
    closeModalBtn: null,
    
    init() {
        this.svgImages = document.querySelectorAll('img.svg-inline');
        this.btnPlay = document.querySelector('.btn-play');
        this.video = document.querySelector('.video video');
        this.thumbnail = document.querySelector('.video img');
        this.btnNav = document.querySelector('.btn-nav');
        this.navContent = document.querySelector('.nav-content');
        this.modal = document.getElementById('myModal1');
        this.openModalBtn = document.getElementById('openModal1');
        this.closeModalBtn = document.getElementById('closeModal1');
    }
};

// IMG to SVG
const initSVGInline = async () => {
    if (!DOMCache.svgImages.length) return;

    const loadSVG = async (img) => {
        try {
            const response = await fetch(img.src);
            const svgData = await response.text();
            
            const div = document.createElement('div');
            div.innerHTML = svgData;
            
            const svgElement = div.querySelector('svg');
            if (!svgElement) return;
            
            // Copia atributos da imagem para o SVG
            if (img.id) svgElement.id = img.id;
            if (img.className) svgElement.classList = img.classList;
            
            img.parentNode.replaceChild(svgElement, img);
        } catch (error) {
            console.error("Erro ao carregar o SVG:", error);
        }
    };

    // Processa os SVGs em paralelo
    const promises = Array.from(DOMCache.svgImages).map(loadSVG);
    await Promise.allSettled(promises);
};

// Video
const initVideo = () => {
    const { btnPlay, video, thumbnail } = DOMCache;
    if (!btnPlay || !video || !thumbnail) return;

    // Adiciona os controles ao vídeo
    video.controls = true;

    const handlePlayClick = () => {
        // Fade out simultâneo
        [thumbnail, btnPlay].forEach(element => {
            element.style.transition = 'opacity 0.5s';
            element.style.opacity = '0';
        });

        video.play();

        // Hide elementos após fade out
        const hideElements = () => {
            thumbnail.style.display = 'none';
            btnPlay.style.display = 'none';
        };

        video.addEventListener('play', () => {
            setTimeout(hideElements, 500);
        }, { once: true });
    };

    btnPlay.addEventListener('click', handlePlayClick);
};

// Navigation
const initNavigation = () => {
    const { btnNav, navContent } = DOMCache;
    if (!btnNav || !navContent) return;

    const toggleMenu = () => {
        // Manipula as classes do Tailwind diretamente
        const isOpen = navContent.classList.contains('opacity-100');
        
        if (isOpen) {
            // Fecha o menu
            navContent.classList.remove('opacity-100', 'visible');
            navContent.classList.add('opacity-0', 'invisible');
            btnNav.classList.remove('active');
        } else {
            // Abre o menu
            navContent.classList.remove('opacity-0', 'invisible');
            navContent.classList.add('opacity-100', 'visible');
            btnNav.classList.add('active');
        }
    };

    const closeMenu = () => {
        const isOpen = navContent.classList.contains('opacity-100');
        if (isOpen) {
            navContent.classList.remove('opacity-100', 'visible');
            navContent.classList.add('opacity-0', 'invisible');
            btnNav.classList.remove('active');
        }
    };

    // Event listeners
    btnNav.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // Otimiza o click outside usando event delegation
    document.addEventListener('click', (event) => {
        if (!navContent.contains(event.target) && !btnNav.contains(event.target)) {
            closeMenu();
        }
    });

    // Debounce no scroll para melhor performance
    const debouncedScroll = debounce(closeMenu, 100);
    document.addEventListener('scroll', debouncedScroll, { passive: true });
};

// Modal
const initModal = () => {
    const { modal, openModalBtn, closeModalBtn } = DOMCache;
    if (!modal || !openModalBtn || !closeModalBtn) return;

    const openModal = () => {
        modal.classList.add('show');
    };

    const closeModal = () => {
        modal.classList.remove('show');
    };

    const handleOutsideClick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Event listeners
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', handleOutsideClick);
};

// GSAP - Menu flutuante
const initGSAP = () => {
    // Registra o plugin ScrollTrigger no GSAP
    gsap.registerPlugin(ScrollTrigger);

    // ScrollTrigger para mostrar/esconder o menu flutuante
    ScrollTrigger.create({
        trigger: ".trigger-cancer-de-mama-start",
        start: "top 80%",
        endTrigger: ".trigger-cancer-de-endometrio", 
        end: "bottom 50%",
        toggleClass: { targets: ".nav-flutuante", className: "active" },
        // markers: true // Para debug
    });

    // Seções e seus respectivos botões
    const sections = [
        { 
            trigger: ".trigger-cancer-de-mama-start", 
            endTrigger: ".trigger-cancer-de-mama-end",
            btnSelector: 'a[href="#cancer-de-mama"]' 
        },
        { trigger: ".trigger-cancer-de-ovario", btnSelector: 'a[href="#cancer-de-ovario"]' },
        { trigger: ".trigger-cancer-de-endometrio", btnSelector: 'a[href="#cancer-de-endometrio"]' }
    ];

    // Cria ScrollTriggers para cada seção
    sections.forEach(({ trigger, endTrigger, btnSelector }) => {
        const btn = document.querySelector(`.nav-flutuante-content ${btnSelector}`);
        
        if (btn) {
            // Configuração diferente para câncer de mama (com start e end específicos)
            if (endTrigger) {
                ScrollTrigger.create({
                    trigger: trigger,
                    start: "top 80%",
                    endTrigger: endTrigger,
                    end: "bottom 50%",
                    onEnter: () => {
                        // Remove active de todos os botões
                        document.querySelectorAll('.nav-flutuante-content .btn-default').forEach(b => b.classList.remove("active"));
                        // Adiciona active no botão atual
                        btn.classList.add("active");
                    },
                    onEnterBack: () => {
                        // Remove active de todos os botões
                        document.querySelectorAll('.nav-flutuante-content .btn-default').forEach(b => b.classList.remove("active"));
                        // Adiciona active no botão atual
                        btn.classList.add("active");
                    },
                    onLeave: () => {
                        // Remove active quando sai da seção (scrolling down)
                        btn.classList.remove("active");
                    },
                    onLeaveBack: () => {
                        // Remove active quando sai da seção (scrolling up)
                        btn.classList.remove("active");
                    },
                    // markers: true // Para debug
                });
            } else {
                // Configuração padrão para outras seções
                ScrollTrigger.create({
                    trigger: trigger,
                    start: "top 50%",
                    end: "bottom 50%",
                    onEnter: () => {
                        // Remove active de todos os botões
                        document.querySelectorAll('.nav-flutuante-content .btn-default').forEach(b => b.classList.remove("active"));
                        // Adiciona active no botão atual
                        btn.classList.add("active");
                    },
                    onEnterBack: () => {
                        // Remove active de todos os botões
                        document.querySelectorAll('.nav-flutuante-content .btn-default').forEach(b => b.classList.remove("active"));
                        // Adiciona active no botão atual
                        btn.classList.add("active");
                    },
                    onLeave: () => {
                        // Remove active quando sai da seção (scrolling down)
                        btn.classList.remove("active");
                    },
                    onLeaveBack: () => {
                        // Remove active quando sai da seção (scrolling up)
                        btn.classList.remove("active");
                    },
                    // markers: true // Para debug
                });
            }
        } else {
            console.warn(`Botão não encontrado para: ${btnSelector}`);
        }
    });

    // Atraso para garantir que todos os elementos estejam renderizados
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
};

// Inicialização principal
document.addEventListener('DOMContentLoaded', async () => {
    // Força o favicon
    forceFavicon();
    
    // Inicializa cache dos elementos DOM
    DOMCache.init();
    
    // Inicializa todas as funcionalidades
    await initSVGInline();
    initVideo();
    initNavigation();
    initModal();
    
    // Inicializa GSAP após tudo estar pronto
    initGSAP();
});