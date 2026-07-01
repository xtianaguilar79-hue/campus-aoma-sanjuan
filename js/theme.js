// Sistema de Temas (Dark/Light Mode)
const theme = {
    currentTheme: 'light',
    toggleBtn: null,
    
    init() {
        this.toggleBtn = document.getElementById('themeToggle');
        
        // Cargar tema guardado
        const savedTheme = localStorage.getItem(CONFIG.storageKeys.theme);
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Detectar preferencia del sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
        
        // Event listener
        this.toggleBtn?.addEventListener('click', () => {
            this.toggle();
        });
    },
    
    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },
    
    setTheme(themeName) {
        this.currentTheme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem(CONFIG.storageKeys.theme, themeName);
        
        // Actualizar icono
        const icon = this.toggleBtn?.querySelector('i');
        if (icon) {
            icon.className = themeName === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
};