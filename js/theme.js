/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: theme.js (UI Premium Edition)
 */

window.ModuleTheme = {
    currentTheme: 'dark',

    init() {
        this.injectDesignTokens();
        this.loadSavedTheme();
    },

    injectDesignTokens() {
        const styleElement = document.createElement('style');
        styleElement.id = 'aoma-design-tokens';
        styleElement.innerHTML = `
            :root {
                --primary: #3b92ff;
                --primary-light: #60a5fa;
                --primary-dark: #1d4ed8;
                --success: #10b981;
                --success-bg: rgba(16, 185, 129, 0.12);
                --warning: #f59e0b;
                --warning-bg: rgba(245, 158, 11, 0.12);
                --danger: #ef4444;
                --danger-bg: rgba(239, 68, 68, 0.12);
                
                --space-1: 0.25rem;
                --space-2: 0.5rem;
                --space-3: 0.75rem;
                --space-4: 1rem;
                --space-5: 1.25rem;
                --space-6: 1.5rem;
                --space-8: 2rem;
                --space-12: 3rem;

                --font-xs: 0.75rem;
                --font-sm: 0.875rem;
                --font-base: 1rem;
                --font-lg: 1.125rem;
                --font-xl: 1.25rem;
                --font-2xl: 1.5rem;
                --font-3xl: 1.875rem;
                --font-4xl: 2.25rem;

                --weight-normal: 400;
                --weight-medium: 500;
                --weight-semibold: 600;
                --weight-bold: 700;

                --radius-sm: 6px;
                --radius-md: 10px;
                --radius-lg: 16px;
                --radius-round: 9999px;
                --z-dropdown: 3000;
                --z-modal: 5000;
            }

            [data-theme="dark"] {
                --bg-app: #080b11;
                --bg-surface: #101622;
                --text-main: #f9fafb;
                --text-muted: #9ca3af;
                --border-subtle: #1e293b;
                --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
                --shadow-premium: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
            }

            [data-theme="light"] {
                --bg-app: #f8fafc;
                --bg-surface: #ffffff;
                --text-main: #0f172a;
                --text-muted: #64748b;
                --border-subtle: #e2e8f0;
                --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                --shadow-premium: 0 20px 25px -5px rgba(15, 23, 42, 0.05);
            }
        `;
        document.head.appendChild(styleElement);
    },

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('aoma_theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            this.currentTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        this.applyThemeToDOM();
    },

    applyThemeToDOM() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateTogglerIcon();
    },

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('aoma_theme', this.currentTheme);
        this.applyThemeToDOM();

        if (window.AppInstance) {
            const msg = this.currentTheme === 'dark' ? 'Modo Industrial Activado' : 'Modo Administrativo Activado';
            window.AppInstance.showToast(msg, 'info');
        }
    },

    updateTogglerIcon() {
        const icon = document.getElementById('theme-toggle-icon');
        if (!icon) return;
        if (this.currentTheme === 'dark') {
            icon.className = 'fa-solid fa-sun';
            icon.style.color = '#f59e0b';
        } else {
            icon.className = 'fa-solid fa-moon';
            icon.style.color = '#1e293b';
        }
    }
};