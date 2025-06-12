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

    // Parallax effect on scroll
    gsap.to(`.banner .banner-grafismo-3`, {
        yPercent: -10,
        scale: 1.1,
        scrollTrigger: {
            trigger: `.banner`,
            start: "top top",
            scrub: true,
        }
    });
});

// ------------------------------------- MAIN ANIMATIONS ------------------------------------- //

document.addEventListener("DOMContentLoaded", function() {
    // Configuração das classes de animação
    const animationConfig = {
        basic: [
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
        ],
        splitText: [
            'split-text-1', 'split-text-2', 'split-text-3', 'split-text-4', 'split-text-5'
        ]
    };

    // Função para aplicar animação básica
    function applyBasicAnimation(element, animationClass) {
        const animation = animationConfig.basic.find(anim => anim.class === animationClass);
        if (!animation) return;

        gsap.from(element, {
            duration: 1.2,
            ...animation.props,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                once: true
            }
        });
    }

    // Função para aplicar animação de split text
    function applySplitTextAnimation(element, animationClass) {
        let splitText, targets, animationProps;

        switch(animationClass) {
            case 'split-text-1':
                splitText = new SplitText(element, { type: "lines,words,chars", linesClass: "line" });
                gsap.set(splitText.chars, { opacity: 0, x: -20 });
                targets = splitText.chars;
                animationProps = {
                    duration: 0.8,
                    opacity: 1,
                    x: 0,
                    ease: "power2.out",
                    stagger: 0.02
                };
                break;

            case 'split-text-2':
                splitText = new SplitText(element, { type: "lines,words,chars", linesClass: "line" });
                gsap.set(splitText.lines, { opacity: 0, y: 30 });
                targets = splitText.lines;
                animationProps = {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    stagger: 0.1
                };
                break;

            case 'split-text-3':
                splitText = new SplitText(element, { type: "lines,words,chars", linesClass: "line" });
                gsap.set(splitText.chars, { opacity: 0, y: 30 });
                targets = splitText.chars;
                animationProps = {
                    duration: 0.6,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    stagger: 0.03
                };
                break;

            case 'split-text-4':
                splitText = new SplitText(element, { type: "lines,words,chars", linesClass: "line" });
                gsap.set(splitText.lines, { opacity: 0, y: 50, filter: "blur(10px)" });
                targets = splitText.lines;
                animationProps = {
                    duration: 1,
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    ease: "power2.out",
                    stagger: 0.15
                };
                break;

            case 'split-text-5':
                splitText = new SplitText(element, { type: "lines,words,chars", linesClass: "line" });
                gsap.set(splitText.lines, { opacity: 0, y: 50, filter: "blur(7px)" });
                targets = splitText.lines;
                animationProps = {
                    duration: 1,
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    ease: "power2.out",
                    stagger: 0.15
                };
                break;
        }

        if (targets) {
            gsap.to(targets, {
                ...animationProps,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    once: true
                }
            });
        }
    }

    // Aplicar animações básicas
    animationConfig.basic.forEach(({ class: className }) => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            applyBasicAnimation(element, className);
        });
    });

    // Aplicar animações de split text
    animationConfig.splitText.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            applySplitTextAnimation(element, className);
        });
    });

    // Refresh ScrollTrigger após configurar todas as animações
    ScrollTrigger.refresh();
});