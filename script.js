document.addEventListener('DOMContentLoaded', () => {

    // 1. GESTÃO DE TEMA COM LOCAL STORAGE (Memória do navegador)
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement;
    
    // Verifica se o usuário já tinha uma preferência salva anteriormente
    const savedTheme = localStorage.getItem('ecoAgroTheme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateButtonText(savedTheme);

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ecoAgroTheme', newTheme); // Salva no navegador
        updateButtonText(newTheme);
    });

    function updateButtonText(theme) {
        themeSwitcher.textContent = theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro';
    }

    // 2. INTERSECTION OBSERVER (Animações ao rolar a página)
    // Isso é o que difere um site amador de um profissional em 2026
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível na tela
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que faz a animação de fade-in acontecer
                entry.target.classList.add('visible');
                // Para de observar depois que já apareceu (melhora performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos com a classe fade-in e os observa
    document.querySelectorAll('.fade-in').forEach(element => {
        scrollObserver.observe(element);
    });

    // 3. VALIDAÇÃO DE FORMULÁRIO CUSTOMIZADA (Sem o `alert()` padrão)
    const premiumForm = document.getElementById('premium-form');
    const statusMessage = document.getElementById('status-message');

    premiumForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento
        
        const name = document.getElementById('user-name').value.trim();
        const email = document.getElementById('user-email').value.trim();
        
        // Reset de classes
        statusMessage.className = 'status-box'; 

        // Validação Inteligente
        if (name.length < 3) {
            showStatus('O nome precisa ter pelo menos 3 caracteres.', 'error');
            return;
        }

        // Expressão regular (Regex) para validar o formato de email de forma robusta
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('Por favor, insira um e-mail válido (ex: seu@email.com).', 'error');
            return;
        }

        // Sucesso
        showStatus(`Pronto, ${name.split(' ')[0]}! Manifesto enviado para ${email}.`, 'success');
        premiumForm.reset(); // Limpa os campos
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.classList.add(type);
        statusMessage.classList.remove('hidden');
        
        // Esconde a mensagem automaticamente após 5 segundos
        setTimeout(() => {
            statusMessage.classList.add('hidden');
        }, 5000);
    }
});