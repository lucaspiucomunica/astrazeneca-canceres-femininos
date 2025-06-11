// ------------------------------------- BANNER ------------------------------------- //

document.addEventListener("DOMContentLoaded", function() {
    const itensBanner = gsap.timeline({ delay: 0});

    itensBanner
    .from(".banner .banner-grafismo-1", {
        duration: 1,
        opacity: 0,
        left: '-100%',
        rotate: -45,
        top: '-100%',
        ease: "power2.out",
    })

    .from(".banner .banner-grafismo-2", {
        duration: 1, 
        opacity: 0,
        right: '-100%',
        top: '-100%',
        rotate: 45,
        ease: "power2.out",
    }, "-=0.8")

    .from(".banner .banner-grafismo-3", {
        duration: 1, 
        opacity: 0,
        right: '-100%',
        ease: "power2.out",
    }, "-=0.6")

    .from(".banner .banner-content h1", {
        duration: 1, 
        opacity: 0,
        y: -100,
        scale: 0.6,
        ease: "power2.out",
    }, "-=1.0")

    .from(".banner .banner-content h2", {
        duration: 1, 
        opacity: 0,
        y: 100,
        scale: 0.6,
        ease: "power2.out",
    }, "-=0.6")

    .from(".banner .banner-content .video", {
        duration: 1, 
        opacity: 0,
        y: 100,
        scale: 0.6,
        ease: "power2.out",
    }, "-=0.8")

    .from(".site-header", {
        duration: 1, 
        opacity: 0,
        y: -20,
        ease: "power2.out",
    }, "-=0.6")

    // Adicionando o efeito de deslocamento ao rolar a tela
    gsap.to(`.banner .banner-grafismo-3`, {
        yPercent: -10,
        scrollTrigger: {
            trigger: `.banner`,
            start: "top top",
            scrub: true,
        }
    });
});

// ------------------------------------- SECTION ONE ------------------------------------- //

document.addEventListener("DOMContentLoaded", function() {
    const sectionOneText = gsap.timeline({ 
        delay: 0,
        scrollTrigger: {
            trigger: ".section-one .section-one-text", // O gatilho para iniciar a animação
            start: "top 80%", // Iniciar a animação quando o topo do gatilho estiver a 80% da altura da viewport
            // markers: true,
        }
    });

    sectionOneText
    .from(".section-one .section-one-text", {
        duration: 1, 
        opacity: 0,
        y: 100,
        ease: "power2.out",
    })
});

document.addEventListener("DOMContentLoaded", function() {
    const sectionOneCards = gsap.timeline({ 
        delay: 0,
        scrollTrigger: {
            trigger: ".section-one .section-one-cards", // O gatilho para iniciar a animação
            start: "top 80%", // Iniciar a animação quando o topo do gatilho estiver a 80% da altura da viewport
            // markers: true,
        }
    });

    sectionOneCards
    .from(".section-one .section-one-cards > *", {
        duration: 1.2, 
        opacity: 0,
        scale: 0.8,
        ease: "power2.out",
        stagger: 0.2,
    })
});

document.addEventListener("DOMContentLoaded", function() {
    const animations = [
        { class: "fade-in", props: { opacity: 0 } },
        { class: "fade-in-top", props: { opacity: 0, y: 50 } },
        { class: "fade-in-bottom", props: { opacity: 0, y: -50 } },
        { class: "fade-in-left", props: { opacity: 0, x: -50 } },
        { class: "fade-in-right", props: { opacity: 0, x: 50 } },
        { class: "zoom-in", props: { opacity: 0, scale: 0.8 } },
        { class: "zoom-out", props: { opacity: 0, scale: 1.2 } },
        { class: "rotate-in", props: { opacity: 0, rotation: -45, scale: 0.8 } },
        { class: "rotate-out", props: { opacity: 0, rotation: 45, scale: 1.2 } },
        { class: "flip-x", props: { opacity: 0, rotationX: 90 } },
        { class: "flip-y", props: { opacity: 0, rotationY: 90 } },
        { class: "slide-in-top", props: { y: -100, opacity: 0 } },
        { class: "slide-in-bottom", props: { y: 100, opacity: 0 } },
        { class: "slide-in-left", props: { x: -100, opacity: 0 } },
        { class: "slide-in-right", props: { x: 100, opacity: 0 } }
    ];

    animations.forEach(animation => {
        const elements = document.querySelectorAll(`.${animation.class}`);

        elements.forEach(element => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    // markers: true, // Descomente para ver marcadores de debug
                }
            }).from(element, {
                duration: 1.2,
                ...animation.props,
                ease: "power2.out"
            });
        });
    });
});