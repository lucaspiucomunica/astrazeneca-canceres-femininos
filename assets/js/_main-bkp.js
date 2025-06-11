// IMG to SVG

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todas as imagens SVG
    const svgImages = document.querySelectorAll('img.svg-inline');

    svgImages.forEach(img => {
        const imgURL = img.src;
        
        // Faz uma requisição para obter o conteúdo do SVG
        fetch(imgURL)
        .then(response => response.text())
        .then(svgData => {
            // Cria um contêiner temporário para transformar o texto em um elemento DOM
            const div = document.createElement('div');
            div.innerHTML = svgData;

            // Extrai o elemento SVG e substitui a imagem
            const svgElement = div.querySelector('svg');

            if (svgElement) {
            // Copia os atributos da imagem para o SVG
            if (img.id) svgElement.id = img.id;
            if (img.className) svgElement.classList = img.classList;

            // Substitui a imagem pelo SVG inline
            img.parentNode.replaceChild(svgElement, img);
            }
        })
        .catch(error => console.error("Erro ao carregar o SVG:", error));
    });
});

// Expandir lista

document.querySelector('.btn-default-expand').addEventListener('click', function(e) {
    e.preventDefault();

    const list = document.querySelector('.list-expand ul');
    const btnText = document.querySelector('.btn-default-expand .btn-text');
    const btnIcon = document.querySelector('.btn-default-expand .btn-icon');
    const btnExpand = document.querySelector('.list-expand .btn-default'); // O botão

    // Captura a altura total da lista e soma a altura do botão
    const totalHeight = list.scrollHeight + btnExpand.offsetHeight + 24;

    if (list.style.height) {
        list.style.height = null; // Recolher
        btnText.textContent = 'Expandir';
        btnIcon.classList.remove('rotate-180');
        list.classList.remove('expanded'); // Remove classe que controla ::before
    } else {
        list.style.height = totalHeight + "px"; // Expande a lista + altura do botão
        btnText.textContent = 'Recolher';
        btnIcon.classList.add('rotate-180');
        list.classList.add('expanded'); // Adiciona classe que controla ::before
    }

    // Adiciona um listener para chamar ScrollTrigger.refresh após a transição
    function onTransitionEnd() {
        ScrollTrigger.refresh(); // Recalcula os triggers
        list.removeEventListener('transitionend', onTransitionEnd); // Remove o listener após a execução
    }

    list.addEventListener('transitionend', onTransitionEnd);
});

// Splide 1

document.addEventListener( 'DOMContentLoaded', function() {
    var splide1 = new Splide( '.splide-1', {
        pagination: false,
        perPage: 2,
        gap: 40,
        padding: { 
            left: 40, 
            right: 40,
        },
        arrowPath: 'M36.5477 19.3392C37.1563 19.9898 37.1563 21.0102 36.5477 21.6607L27.3886 31.4739L25.164 33.7274C22.1711 36.7589 17.323 36.7589 14.3301 33.7274C12.2356 31.6057 11.6059 28.5614 12.4454 25.887C12.7854 24.8071 11.9711 23.7101 10.8504 23.7101H6.17432C4.39877 23.7059 3.08494 22.2347 3.00519 20.5C2.92963 18.7653 4.5163 17.2899 6.17013 17.2899H10.8504C11.9711 17.2899 12.7812 16.1929 12.4454 15.1129C11.6059 12.4385 12.2356 9.39425 14.3301 7.27259C17.323 4.24105 22.1711 4.24105 25.164 7.27259L27.3886 9.52605L36.5477 19.3435V19.3392Z',
        breakpoints: {
            1023: {
                padding: {
                    right: 0,
                    left: 0,
                },
                gap: 24,
            },
            639: {
                perPage: 1,
            },
        },
    } );
    splide1.mount();
} );

// Validar formulário

document.querySelector('form').addEventListener('submit', function(event) {
    // Previne o envio do formulário
    event.preventDefault();
    
    // Verifica os campos obrigatórios no envio
    validarFormulario();
});

function validarFormulario() {
    const camposObrigatorios = document.querySelectorAll('input[required]');
    
    camposObrigatorios.forEach(function(campo) {
        let aviso;

        if (campo.type === 'checkbox') {
            // Para checkbox
            aviso = campo.closest('.form-label-group').querySelector('.obrigatorio');
        } else {
            // Para campos de texto e e-mail
            aviso = campo.nextElementSibling;
        }

        if (!campo.checkValidity()) {
            aviso.classList.remove('hidden');
        } else {
            aviso.classList.add('hidden');
        }

        // Adicionar eventos para remover a mensagem assim que o campo for preenchido
        campo.addEventListener(campo.type === 'checkbox' ? 'change' : 'input', function() {
            if (campo.checkValidity()) {
                aviso.classList.add('hidden');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Máscara de telefone (formato brasileiro)
    const telefoneInput = document.getElementById('telefone');
    
    telefoneInput.addEventListener('input', function(e) {
        let telefone = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

        if (telefone.length === 0) {
            e.target.value = ''; // Se o campo estiver vazio, não exibe nada
            return;
        }

        if (telefone.length > 11) {
            telefone = telefone.slice(0, 11); // Limita a 11 dígitos
        }

        if (telefone.length > 10) {
            // Formato celular: (99) 99999-9999
            telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (telefone.length > 6) {
            // Formato fixo: (99) 9999-9999
            telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (telefone.length > 2) {
            // Com DDD: (99) 9999
            telefone = telefone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            // Apenas DDD: (99
            telefone = telefone.replace(/^(\d{0,2})/, '($1');
        }

        e.target.value = telefone;
    });
});

// 

document.addEventListener('DOMContentLoaded', function() {
    const btnPlay = document.querySelector('.btn-play');
    const video = document.querySelector('.video video');
    const thumbnail = document.querySelector('.video img');

    // Adiciona os controles ao vídeo
    video.controls = true;

    btnPlay.addEventListener('click', function() {
        // Fade out the thumbnail and the play button
        thumbnail.style.transition = 'opacity 0.5s';
        btnPlay.style.transition = 'opacity 0.5s';
        thumbnail.style.opacity = '0';
        btnPlay.style.opacity = '0';

        // Play the video
        video.play();

        // Hide the thumbnail and the play button completely after fade out
        video.addEventListener('play', function() {
        setTimeout(() => {
            thumbnail.style.display = 'none';
            btnPlay.style.display = 'none'; // Hide the play button
        }, 500); // Match the fade-out duration
        });
    });
});

// 

document.addEventListener('DOMContentLoaded', () => {
    const btnNav = document.querySelector('.btn-nav');
    const navContent = document.querySelector('.nav-content');

    if (btnNav && navContent) {
        // Função para abrir e fechar o menu
        const toggleMenu = () => {
        navContent.classList.toggle('active');
        btnNav.classList.toggle('active');
        };

        // Adiciona evento de clique no botão
        btnNav.addEventListener('click', (event) => {
        event.stopPropagation(); // Previne que o clique no botão feche o menu
        toggleMenu();
        });

        // Fecha o menu se clicar fora dele
        document.addEventListener('click', (event) => {
        if (!navContent.contains(event.target) && !btnNav.contains(event.target)) {
            if (navContent.classList.contains('active')) {
            toggleMenu();
            }
        }
        });

        // Fecha o menu ao rolar a página
        document.addEventListener('scroll', () => {
        if (navContent.classList.contains('active')) {
            toggleMenu();
        }
        });
    }
});

// GSAP

document.addEventListener('DOMContentLoaded', function() {

    ScrollTrigger.create({
        trigger: "#informacao-e-apoio",
        start: "-1% top",
        endTrigger: "#como-dar-apoio",
        end: "bottom bottom",
        toggleClass: { targets: ".nav-flutuante", className: "active" },
        // markers: true
    });

    const sections = [
    { trigger: "#informacao-e-apoio", btnIndex: 1 },
    { trigger: "#onde-buscar-apoio", btnIndex: 2 },
    { trigger: "#como-dar-apoio", btnIndex: 3 }
    ];

    sections.forEach(({ trigger, btnIndex }) => {
        const btn = document.querySelector(`.nav-flutuante-content .btn-default:nth-child(${btnIndex})`);

        ScrollTrigger.create({
            trigger: trigger,
            start: "-1% top",
            end: "bottom bottom",
            onEnter: () => btn.classList.add("active"),
            onLeave: () => btn.classList.remove("active"),
            onEnterBack: () => btn.classList.add("active"),
            onLeaveBack: () => btn.classList.remove("active"),
            // markers: true
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Atraso de 200ms para garantir que todos os elementos estejam renderizados
    setTimeout(function() {
        // Atualiza todos os ScrollTriggers
        ScrollTrigger.refresh();
    }, 100);
});

// Modal

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o modal, o botão de abrir e o de fechar
    const modal = document.getElementById('myModal1');
    const openModalBtn = document.getElementById('openModal1');
    const closeModalBtn = document.getElementById('closeModal1');

    // Abre o modal quando o botão é clicado
    openModalBtn.onclick = function() {
        modal.classList.add('show');
    }

    // Fecha o modal quando o botão de fechar é clicado
    closeModalBtn.onclick = function() {
        modal.classList.remove('show');
    }

    // Fecha o modal quando clicar fora da área de conteúdo
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    }
});