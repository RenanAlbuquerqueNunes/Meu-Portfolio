document.addEventListener('DOMContentLoaded', function() {

    // --- VARIÁVEIS GLOBAIS ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggler = document.getElementById('menu-toggler');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // --- SELETOR DE TEMA (DARK/LIGHT MODE) ---
    // Verifica o tema salvo no localStorage ao carregar a página
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
    } else {
        themeToggleBtn.textContent = '🌙';
    }

    // Adiciona o evento de clique para alternar o tema
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        themeToggleBtn.textContent = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // --- LÓGICA DE NAVEGAÇÃO POR CLIQUE ---
    // Função para mostrar a seção correta e destacar o link
    function handleNavClick(targetId) {
        // Esconde todas as seções
        sections.forEach(section => {
            section.classList.remove('show');
        });

        // Remove o destaque de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Mostra a seção alvo
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('show');
        }

        // Adiciona o destaque no link correspondente
        const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // --- LÓGICA DAS ABAS (TABS) NA SEÇÃO DE EDUCAÇÃO ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            // Remove o 'active' de todos os links e painéis
            tabLinks.forEach(item => item.classList.remove('active'));
            tabPanes.forEach(item => item.classList.remove('active'));

            // Adiciona o 'active' no link clicado e no painel correspondente
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Adiciona o evento de clique a cada link da navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão de pular para a âncora
            const targetId = this.getAttribute('href');
            handleNavClick(targetId);

            // Se for mobile, fecha a sidebar após o clique
            if (sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    });

    // Inicia a página com a seção "Sobre" visível e o link ativo
    handleNavClick('#about');


    // --- MENU MOBILE (HAMBÚRGUER) ---
    menuToggler.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });

    // Fecha a sidebar se clicar no conteúdo principal
    mainContent.addEventListener('click', () => {
        if (sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });

});