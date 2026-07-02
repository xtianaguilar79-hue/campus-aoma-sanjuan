/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo 00: Arquitectura de Estilos, Tokens del Sistema de Diseño y Motor de Modo Noche/Día
 */

window.ModuleTheme = {
    currentTheme: 'dark', // Valor por defecto del ecosistema industrial

    // Inicializador del módulo (Inyectado al inicio del ciclo de vida en app.js)
    init() {
        this.injectDesignTokens();
        this.loadSavedTheme();
    },

    // Inyección de Design Tokens corporativos en el :root del DOM
    injectDesignTokens() {
        const styleElement = document.createElement('style');
        styleElement.id = 'aoma-design-tokens';
        styleElement.innerHTML = `
            :root {
                /* --- Paleta de Colores Corporativa / Identidad Industrial --- */
                --primary: #3b92ff;
                --primary-light: #60a5fa;
                --primary-dark: #1d4ed8;
                --success: #10b981;
                --success-bg: rgba(16, 185, 129, 0.15);
                --warning: #f59e0b;
                --warning-bg: rgba(245, 158, 11, 0.15);
                --danger: #ef4444;
                --danger-bg: rgba(239, 68, 68, 0.15);
                
                /* --- Escala de Espaciados (Layout Riguroso) --- */
                --space-1: 0.25rem;  /* 4px */
                --space-2: 0.5rem;   /* 8px */
                --space-3: 0.75rem;  /* 12px */
                --space-4: 1rem;     /* 16px */
                --space-5: 1.25rem;  /* 20px */
                --space-6: 1.5rem;   /* 24px */
                --space-8: 2rem;     /* 32px */
                --space-12: 3rem;    /* 48px */

                /* --- Tipografía y Escala de Fuentes --- */
                --font-xs: 0.75rem;   /* 12px */
                --font-sm: 0.875rem;  /* 14px */
                --font-base: 1rem;    /* 16px */
                --font-lg: 1.125rem;  /* 18px */
                --font-xl: 1.25rem;   /* 20px */
                --font-2xl: 1.5rem;   /* 24px */
                --font-3xl: 1.875rem; /* 30px */
                --font-4xl: 2.25rem;  /* 36px */

                --weight-normal: 400;
                --weight-medium: 500;
                --weight-semibold: 600;
                --weight-bold: 700;

                /* --- Bordes y Sombras --- */
                --radius-sm: 4px;
                --radius-md: 8px;
                --radius-lg: 12px;
                --radius-round: 9999px;
                --z-modal: 5000;
                
                /* --- Capas de Efecto Glassmorphism Estándar --- */
                --bg-glass: rgba(255, 255, 255, 0.02);
                --border-glass: rgba(255, 255, 255, 0.05);
                --shadow-premium: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            /* --- Definición Semántica de Variables por Modo de Visualización --- */
            [data-theme="dark"] {
                --bg-app: #0b0f19;          /* Azul mineral profundo */
                --bg-surface: #111827;      /* Gris antracita industrial */
                --text-main: #f3f4f6;       /* Blanco puro refractario */
                --text-muted: #9ca3af;      /* Gris plata de planta */
                --border-subtle: #1f2937;   /* Acero pulido de contención */
                --text-light: #374151;
            }

            [data-theme="light"] {
                --bg-app: #f4f6f9;          /* Blanco caliza administrativo */
                --bg-surface: #ffffff;      /* Superficie limpia institucional */
                --text-main: #1f2937;       /* Grafito oscuro de alta visibilidad */
                --text-muted: #6b7280;      /* Gris medio para anotaciones */
                --border-subtle: #e5e7eb;   /* Línea de grilla administrativa */
                --text-light: #d1d5db;
                --bg-glass: rgba(0, 0, 0, 0.02);
                --border-glass: rgba(0, 0, 0, 0.06);
                --shadow-premium: 0 8px 32px 0 rgba(31, 41, 55, 0.08);
            }

            /* --- Clases Utilitarias Globales del Entorno Gremial --- */
            body {
                background-color: var(--bg-app);
                color: var(--text-main);
                font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                margin: 0;
                padding: 0;
                transition: background-color 0.3s ease, color 0.3s ease;
                -webkit-font-smoothing: antialiased;
            }

            .glassmorphism {
                background: var(--bg-glass);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid var(--border-glass);
                box-shadow: var(--shadow-premium);
                transition: border-color 0.3s ease, background 0.3s ease;
            }

            .card-hover-effect {
                transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            }
            .card-hover-effect:hover {
                transform: translateY(-2px);
                border-color: var(--primary-light);
                box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
            }

            /* Contenedor adaptativo para tablas operativas en móviles */
            .table-responsive-container {
                width: 100%;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                margin-top: var(--space-2);
            }
        `;
        document.head.appendChild(styleElement);
    },

    // Carga inicial basada en persistencia (LocalStorage) o preferencia de hardware
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('aoma_theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Detección automática por Media Query del sistema operativo
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            this.currentTheme = prefersLight ? 'light' : 'dark';
        }
        this.applyThemeToDOM();
    },

    // Inyección del atributo semántico al elemento raíz HTML
    applyThemeToDOM() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateTogglerIcon();
    },

    // Conmutador (Toggle) público para invocar desde la barra superior de UI
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('aoma_theme', this.currentTheme);
        this.applyThemeToDOM();

        if (window.AppInstance) {
            const msg = this.currentTheme === 'dark' ? 'Modo Oscuro (Planta) activado' : 'Modo Claro (Administrativo) activado';
            window.AppInstance.showToast(msg, 'info');
        }
    },

    // Sincroniza dinámicamente el glifo del botón disparador si existiese en el Header
    updateTogglerIcon() {
        const icon = document.getElementById('theme-toggle-icon');
        if (!icon) return;

        if (this.currentTheme === 'dark') {
            icon.className = 'fa-solid fa-sun'; // Si está oscuro, ofrece cambiar al sol
            icon.style.color = 'var(--warning)';
        } else {
            icon.className = 'fa-solid fa-moon'; // Si está claro, ofrece cambiar a la luna
            icon.style.color = 'var(--primary-dark)';
        }
    }
};