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