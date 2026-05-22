document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MODO ESCURO COM LOCALSTORAGE ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const rootHtml = document.documentElement;
    
    // Checa preferência salva
    const currentTheme = localStorage.getItem('agroTheme') || 'light';
    rootHtml.setAttribute('data-theme', currentTheme);
    updateThemeButtonText(currentTheme);

    themeSwitcher.addEventListener('click', () => {
        let theme = rootHtml.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        
        rootHtml.setAttribute('data-theme', newTheme);
        localStorage.setItem('agroTheme', newTheme);
        updateThemeButtonText(newTheme);
    });

    function updateThemeButtonText(theme) {
        themeSwitcher.textContent = theme === 'light' ? '🌙 Escuro' : '☀️ Claro';
    }


    // --- 2. CALCULADORA DE IMPACTO INTERATIVA (Dados 2026) ---
    const hectaresInput = document.getElementById('hectares');
    const hectaresDisplay = document.getElementById('hectares-display');
    const waterSavedDisplay = document.getElementById('water-saved');
    const carbonSavedDisplay = document.getElementById('carbon-saved');

    // Função que calcula baseada na tecnologia agrícola de 2026
    function calculateImpact(hectares) {
        // Economia de água usando IoT e gotejamento inteligente (Aprox. 12.500 Litros/ha/ano)
        const waterSaved = hectares * 12500; 
        // Sequestro de carbono através de Plantio Direto e Bioinsumos (Aprox. 3.2 Toneladas/ha/ano)
        const carbonSaved = hectares * 3.2; 

        // Formatação para facilitar a leitura
        waterSavedDisplay.textContent = waterSaved.toLocaleString('pt-BR');
        carbonSavedDisplay.textContent = carbonSaved.toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1});
    }

    // Ouve a interação de arrastar a barra (Slider) em tempo real
    hectaresInput.addEventListener('input', (e) => {
        const value = e.target.value;
        hectaresDisplay.textContent = value;
        calculateImpact(value);
    });

    // Inicia os valores padrão ao carregar a página
    calculateImpact(hectaresInput.value);


    // --- 3. ANIMAÇÕES DE ROLAGEM COM INTERSECTION OBSERVER ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara a animação quando