/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: search.js (UI Premium Edition)
 */

window.SearchModule = {
    searchIndex: [],

    init() {
        this.buildSearchIndex();
        this.bindSearchEvents();
    },

    buildSearchIndex() {
        this.searchIndex = [
            { title: 'Perforación Voladura e Infraestructura', desc: 'Técnicas avanzadas de perforación minera y manejo seguro de explosivos.', route: '#capacitaciones', category: 'Capacitación' },
            { title: 'Higiene y Seguridad en Yacimientos', desc: 'Protocolos críticos de prevención de riesgos y uso correcto de EPP.', route: '#capacitaciones', category: 'Capacitación' },
            { title: 'Operación Segura de Camiones Fuera de Ruta', desc: 'Manejo de flota pesada y maquinaria de extracción a cielo abierto.', route: '#capacitaciones', category: 'Capacitación' },
            { title: 'Molienda y Concentración de Minerales', desc: 'Procesamiento metalúrgico y optimización de líneas de producción.', route: '#capacitaciones', category: 'Capacitación' },
            { title: 'Video: Inducción en Planta Calera', desc: 'Recorrido instructivo por las medidas de seguridad en hornos de cal.', route: '#videos', category: 'Videoteca' },
            { title: 'Video: Maniobras de RCP en Alta Montaña', desc: 'Primeros auxilios ante contingencias en yacimientos.', route: '#videos', category: 'Videoteca' },
            { title: 'Convenio Colectivo CCT 599/10', desc: 'Normativa laboral de la rama de minería metalífera nacional.', route: '#convenios', category: 'Convenio' },
            { title: 'Convenio Colectivo CCT 444/06', desc: 'Encuadre y derechos de los trabajadores de la industria calera.', route: '#convenios', category: 'Convenio' },
            { title: 'Escala Salarial Metalífera 2026', desc: 'Tablas de haberes homologadas para el sector de metales.', route: '#escalas', category: 'Salarios' },
            { title: 'Panel de Administración', desc: 'Gestión de delegados, aprobación de certificados y carga de noticias.', route: '#admin', category: 'Sistema' },
            { title: 'Preguntas Frecuentes Gremiales', desc: 'Respuestas a dudas sobre liquidación de horas, licencias y aportes.', route: '#faq', category: 'Soporte' }
        ];
    },

    bindSearchEvents() {
        const searchInput = document.getElementById('global-search-input');
        if (!searchInput) return;

        let resultsContainer = document.getElementById('search-results-dropdown');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results-dropdown';
            resultsContainer.className = 'card-premium hidden animate-slide-up';
            
            // Estilos estructurales puros heredados por CSS
            resultsContainer.style.position = 'absolute';
            resultsContainer.style.top = '100%';
            resultsContainer.style.left = '0';
            resultsContainer.style.width = '100%';
            resultsContainer.style.marginTop = '8px';
            resultsContainer.style.maxHeight = '320px';
            resultsContainer.style.overflowY = 'auto';
            resultsContainer.style.zIndex = 'var(--z-dropdown)';
            resultsContainer.style.padding = 'var(--space-2) 0';
            
            searchInput.parentElement.style.position = 'relative';
            searchInput.parentElement.appendChild(resultsContainer);
        }

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            this.executeSearch(query, resultsContainer);
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
                resultsContainer.classList.add('hidden');
            }
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= 2) {
                resultsContainer.classList.remove('hidden');
            }
        });
    },

    executeSearch(query, container) {
        if (query.length < 2) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        const filtered = this.searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="padding: var(--space-4); color: var(--text-muted); font-size: var(--font-sm); text-align: center;">
                    <i class="fa-solid fa-magnifying-glass-blur" style="margin-right:8px;"></i> No se encontraron resultados
                </div>`;
            container.classList.remove('hidden');
            return;
        }

        container.innerHTML = filtered.map(item => `
            <a href="${item.route}" class="nav-trigger" style="display: block; padding: var(--space-3) var(--space-4); text-decoration: none; border-bottom: 1px solid var(--border-subtle); transition: background 0.15s;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-weight: var(--weight-semibold); color: var(--text-main); font-size: var(--font-sm);">${item.title}</span>
                    <span class="badge badge-primary">${item.category}</span>
                </div>
                <p style="color: var(--text-muted); font-size: 12px; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.desc}</p>
            </a>
        `).join('');

        container.querySelectorAll('.nav-trigger').forEach(link => {
            link.addEventListener('click', () => {
                container.classList.add('hidden');
                document.getElementById('global-search-input').value = '';
            });
        });

        container.classList.remove('hidden');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.SearchModule.init();
});