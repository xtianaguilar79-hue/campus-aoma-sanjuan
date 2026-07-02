/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Core 03: Motor de Búsqueda Global, Indexador en Memoria y Panel de Resultados Reactivo
 */

window.SearchModule = {
    searchIndex: [],

    // Inicializador del motor de búsqueda
    init() {
        this.buildSearchIndex();
        this.bindSearchEvents();
    },

    // Construcción del índice plano para búsquedas ultra-rápidas sin consultas al servidor
    buildSearchIndex() {
        this.searchIndex = [
            // Sección Capacitaciones / Cursos
            { title: 'Perforación Voladura e Infraestructura', desc: 'Técnicas avanzadas de perforación minera y manejo seguro de explosivos.', route: '#capacitaciones', category: 'Capacitación' },
            { title: 'Higiene y Seguridad en Yacimientos', desc: 'Protocolos críticos de prevención de riesgos y uso correcto de EPP.', route: '#capacitaciones', category: 'Capacitación' },
            { title: 'Operación Segura de Camiones Fuera de Ruta', desc: 'Manejo de flota pesada y maquinaria de extracción a cielo abierto.', route: '#capacitaciones', category: 'Capacitación' },
            { title: 'Molienda y Concentración de Minerales', desc: 'Procesamiento metalúrgico y optimización de líneas de producción triturada.', route: '#capacitaciones', category: 'Capacitación' },
            
            // Sección Videoteca
            { title: 'Video: Inducción en Planta Calera', desc: 'Recorrido instructivo por las medidas de seguridad en hornos de cal.', route: '#videos', category: 'Videoteca' },
            { title: 'Video: Maniobras de RCP en Alta Montaña', desc: 'Primeros auxilios ante contingencias climáticas o de salud en yacimientos.', route: '#videos', category: 'Videoteca' },
            
            // Sección Legislación y Convenios
            { title: 'Convenio Colectivo CCT 599/10', desc: 'Normativa laboral de la rama de minería metalífera a nivel nacional.', route: '#convenios', category: 'Convenio' },
            { title: 'Convenio Colectivo CCT 444/06', desc: 'Encuadre y derechos de los trabajadores de la industria calera.', route: '#convenios', category: 'Convenio' },
            { title: 'Escala Salarial Metalífera 2026', desc: 'Tablas de haberes homologadas para el sector de extracción de metales.', route: '#escalas', category: 'Salarios' },
            
            // Secciones del Sistema
            { title: 'Panel de Administración', desc: 'Gestión de delegados, aprobación de certificados y carga de noticias.', route: '#admin', category: 'Sistema' },
            { title: 'Preguntas Frecuentes Gremiales', desc: 'Respuestas a dudas sobre liquidación de horas, licencias y aportes.', route: '#faq', category: 'Soporte' }
        ];
    },

    // Vinculación de eventos de teclado y foco en la interfaz
    bindSearchEvents() {
        const searchInput = document.getElementById('global-search-input');
        
        if (!searchInput) return;

        // Crear dinámicamente el contenedor flotante de resultados si no existe
        let resultsContainer = document.getElementById('search-results-dropdown');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results-dropdown';
            resultsContainer.className = 'glassmorphism hidden animate-slide-down';
            resultsContainer.style.position = 'absolute';
            resultsContainer.style.top = '100%';
            resultsContainer.style.left = '0';
            resultsContainer.style.width = '100%';
            resultsContainer.style.marginTop = '8px';
            resultsContainer.style.maxHeight = '320px';
            resultsContainer.style.overflowY = 'auto';
            resultsContainer.style.zIndex = 'var(--z-dropdown)';
            resultsContainer.style.borderRadius = 'var(--radius-md)';
            resultsContainer.style.padding = 'var(--space-2) 0';
            searchInput.parentElement.style.position = 'relative';
            searchInput.parentElement.appendChild(resultsContainer);
        }

        // Evento de escucha en tiempo real al escribir
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            this.executeSearch(query, resultsContainer);
        });

        // Ocultar panel al perder el foco
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
                resultsContainer.classList.add('hidden');
            }
        });

        // Mostrar de nuevo al enfocar si contiene texto
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= 2) {
                resultsContainer.classList.remove('hidden');
            }
        });
    },

    // Algoritmo de emparejamiento y renderizado reactivo del menú
    executeSearch(query, container) {
        if (query.length < 2) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        // Filtrado por coincidencia en título, descripción o categoría
        const filtered = this.searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="padding: var(--space-4) var(--space-5); color: var(--text-muted); font-size: var(--font-sm); text-align: center;">
                    <i class="fa-solid fa-magnifying-glass-blur" style="margin-right:8px;"></i> No se encontraron coincidencias
                </div>`;
            container.classList.remove('hidden');
            return;
        }

        // Inyección atómica de los resultados encontrados
        container.innerHTML = filtered.map(item => `
            <a href="${item.route}" class="nav-trigger" style="display: block; padding: var(--space-3) var(--space-5); text-decoration: none; transition: background 0.2s ease; border-bottom: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                    <span style="font-weight: var(--weight-semibold); color: var(--primary-dark); font-size: var(--font-sm);">${item.title}</span>
                    <span style="font-size: 10px; background: rgba(59, 146, 255, 0.15); color: var(--primary-light); padding: 2px 6px; border-radius: var(--radius-sm); font-weight: var(--weight-bold); text-transform: uppercase;">${item.category}</span>
                </div>
                <p style="color: var(--text-muted); font-size: 12px; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.desc}</p>
            </a>
        `).join('');

        // Interceptar clics en los nuevos enlaces generados para sincronizar el cierre del panel
        container.querySelectorAll('.nav-trigger').forEach(link => {
            link.addEventListener('click', () => {
                container.classList.add('hidden');
                document.getElementById('global-search-input').value = '';
            });
        });

        container.classList.remove('hidden');
    }
};

// Auto-inicialización del módulo al cargar la estructura del árbol DOM
document.addEventListener('DOMContentLoaded', () => {
    window.SearchModule.init();
});