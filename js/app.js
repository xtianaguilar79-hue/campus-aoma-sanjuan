/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Core 01: Enrutador SPA, Guardia de Seguridad Estricto y Renderizado Premium Mapeado
 */

window.AppInstance = {
    currentRoute: '#dashboard',
    
    // Inicializador del Shell Integral
    init() {
        this.bindShellEvents();
        this.checkInitialRoute();
        this.updateUserSessionUI();
        this.renderGlobalToasts();
    },

    // Vinculación Estricta de Eventos de Interfaz
    bindShellEvents() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const layoutContainer = document.getElementById('main-platform-layout');
        
        if (sidebarToggle && layoutContainer) {
            sidebarToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                layoutContainer.classList.toggle('sidebar-collapsed');
            });
        }

        // Trigger Menú Perfil Flotante
        const profileTrigger = document.getElementById('profile-menu-trigger');
        const profileDropdown = document.getElementById('profile-dropdown-menu');
        if (profileTrigger && profileDropdown) {
            profileTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('hidden');
            });
            document.addEventListener('click', () => profileDropdown.classList.add('hidden'));
        }

        // Intercepción del Enrutador Dinámico por Clics
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.nav-trigger');
            if (trigger) {
                e.preventDefault();
                const route = trigger.getAttribute('href');
                if (route) this.navigateTo(route);
            }
        });

        // Soporte Historial del Navegador (Botones Atrás/Adelante)
        window.addEventListener('popstate', () => {
            this.checkInitialRoute();
        });
    },

    // Control de Guardia Imperativo del Sistema
    checkInitialRoute() {
        const sessionActive = localStorage.getItem('aoma_session');
        
        if (!sessionActive) {
            // Forzar visualización de Login si no hay sesión
            const authLayout = document.getElementById('auth-layout-wrapper');
            const mainLayout = document.getElementById('main-platform-layout');
            if (authLayout && mainLayout) {
                authLayout.classList.remove('hidden');
                mainLayout.classList.add('hidden');
            }
            window.location.hash = '';
            return;
        }

        const hash = window.location.hash || '#dashboard';
        this.navigateTo(hash, false);
    },

    // Enrutador Centralizado SPA
    navigateTo(route, updateHistory = true) {
        // Validación de Seguridad en cada Salto de Ruta
        if (!localStorage.getItem('aoma_session')) {
            this.checkInitialRoute();
            return;
        }

        this.currentRoute = route;
        if (updateHistory) {
            window.history.pushState(null, '', route);
        }

        // Marcar enlace activo visualmente
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === route) {
                link.classList.add('active');
            }
        });

        this.renderView(route);
    },

    // Sincronización y Validación Robusta de Datos del Afiliado
    updateUserSessionUI() {
        const session = JSON.parse(localStorage.getItem('aoma_session'));
        if (!session) return;

        const nameDisplay = document.getElementById('user-name-display');
        const roleDisplay = document.getElementById('user-role-display');
        const badgeDisplay = document.getElementById('sidebar-role-badge');
        const avatarDisplay = document.getElementById('user-avatar-display');

        if (nameDisplay) nameDisplay.textContent = `${session.nombre} ${session.apellido}`;
        if (roleDisplay) roleDisplay.textContent = session.empresa || session.puesto || 'Afiliado Gremial';
        if (badgeDisplay) badgeDisplay.textContent = (session.rol || 'USER').toUpperCase();
        if (avatarDisplay && session.avatar) avatarDisplay.src = session.avatar;

        // Gestión de Elementos Administrativos VIP
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            if (session.rol === 'admin') {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });

        if (window.lucide) lucide.createIcons();
    },

    // Generador de Saludo Algorítmico Temporal
    getTemporalGreeting() {
        const hours = new Date().getHours();
        if (hours >= 6 && hours < 13) return "Buenos días";
        if (hours >= 13 && hours < 20) return "Buenas tardes";
        return "Buenas noches";
    },

    // Motor de Inyección de Plantillas Dinámicas Premium
    renderView(route) {
        const container = document.getElementById('app-content-target');
        if (!container) return;

        // Inyección de Skeletons con Aceleración por Hardware
        container.innerHTML = `
            <div class="space-y-6 animate-pulse">
                <div class="h-8 bg-slate-900 rounded-lg w-1/4"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="h-32 bg-slate-900 rounded-xl"></div>
                    <div class="h-32 bg-slate-900 rounded-xl"></div>
                    <div class="h-32 bg-slate-900 rounded-xl"></div>
                </div>
            </div>
        `;

        setTimeout(() => {
            switch(route) {
                case '#dashboard':
                    this.viewDashboard(container);
                    break;
                case '#capacitaciones':
                    this.viewCapacitaciones(container);
                    break;
                case '#evaluaciones':
                    if (window.ModuleEvaluaciones) {
                        window.ModuleEvaluaciones.init(container);
                    } else {
                        this.viewFallback(container, 'Evaluaciones Técnicas');
                    }
                    break;
                default:
                    this.viewDashboard(container);
            }
            if (window.lucide) lucide.createIcons();
        }, 200);
    },

    // ========================================== //
    // REINGENIERÍA COMPLETA: DASHBOARD PREMIUM   //
    // ========================================== //
    viewDashboard(target) {
        const session = JSON.parse(localStorage.getItem('aoma_session')) || {};
        const greeting = this.getTemporalGreeting();

        target.innerHTML = `
            <div class="animate-fade-in space-y-8">
                <div class="card-premium glass-panel border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-8">
                    <div class="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
                        <img src="${session.avatar}" class="w-20 h-20 rounded-2xl object-cover ring-4 ring-cyan-500/20" />
                        <div>
                            <h2 class="text-2xl font-bold text-white">${greeting}, ${session.nombre || 'Afiliado'}</h2>
                            <p class="text-slate-400 text-sm mt-1">Legajo activo en Seccional: <span class="text-cyan-400 font-medium">${session.seccional || 'San Juan'}</span></p>
                            <div class="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                                <span class="bg-slate-950 px-3 py-1 rounded-lg text-xs border border-slate-800 text-slate-300">Empresa: ${session.empresa || 'No Asignada'}</span>
                                <span class="bg-slate-950 px-3 py-1 rounded-lg text-xs border border-slate-800 text-slate-300">Rama: ${session.rama || 'General'}</span>
                                <span class="bg-slate-950 px-3 py-1 rounded-lg text-xs border border-slate-800 text-slate-300">CCT: ${session.convenio || 'General'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Herramientas Operativas</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a href="#capacitaciones" class="nav-trigger card-premium group block">
                            <div class="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                                <i data-lucide="book-open" class="h-5 w-5"></i>
                            </div>
                            <h4 class="text-white font-medium text-base">Cursos Activos</h4>
                            <p class="text-xs text-slate-400 mt-1">Acceda a los trayectos de capacitación formativa homologados.</p>
                        </a>

                        <a href="#videos" class="nav-trigger card-premium group block">
                            <div class="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                <i data-lucide="video" class="h-5 w-5"></i>
                            </div>
                            <h4 class="text-white font-medium text-base">Videoteca</h4>
                            <p class="text-xs text-slate-400 mt-1">Material audiovisual instructivo e inducciones de campo.</p>
                        </a>

                        <a href="#evaluaciones" class="nav-trigger card-premium group block">
                            <div class="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <i data-lucide="file-check" class="h-5 w-5"></i>
                            </div>
                            <h4 class="text-white font-medium text-base">Evaluaciones</h4>
                            <p class="text-xs text-slate-400 mt-1">Renda los exámenes obligatorios para habilitación de planta.</p>
                        </a>

                        <a href="#chat" class="nav-trigger card-premium group block">
                            <div class="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                <i data-lucide="sparkles" class="h-5 w-5"></i>
                            </div>
                            <h4 class="text-white font-medium text-base">Asistente IA</h4>
                            <p class="text-xs text-slate-400 mt-1">Consultas rápidas sobre normativas laborales con Inteligencia Artificial.</p>
                        </a>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="card-premium lg:col-span-2">
                        <h4 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Progreso Académico Acumulado</h4>
                        <div class="flex items-end justify-between h-48 pt-6 border-b border-slate-800">
                            <div class="w-12 flex flex-col items-center gap-2">
                                <div class="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-md transition-all duration-500" style="height: 40%"></div>
                                <span class="text-[10px] text-slate-500">Abril</span>
                            </div>
                            <div class="w-12 flex flex-col items-center gap-2">
                                <div class="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-md transition-all duration-500" style="height: 75%"></div>
                                <span class="text-[10px] text-slate-500">Mayo</span>
                            </div>
                            <div class="w-12 flex flex-col items-center gap-2">
                                <div class="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-md transition-all duration-500" style="height: 95%"></div>
                                <span class="text-[10px] text-slate-500">Junio</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-premium flex flex-col justify-between">
                        <h4 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Estado de Legajo</h4>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                                <span class="text-xs text-slate-400">Horas Realizadas</span>
                                <span class="text-sm font-bold text-white">48 hs</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                                <span class="text-xs text-slate-400">Exámenes Aprobados</span>
                                <span class="text-sm font-bold text-emerald-400">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // ========================================== //
    // REINGENIERÍA: MODULO DE CAPACITACIONES SEG.//
    // ========================================== //
    viewCapacitaciones(target) {
        const session = JSON.parse(localStorage.getItem('aoma_session')) || {};
        
        // Renderizado Dinámico e Inteligente en base al Perfil Restringido del Usuario
        target.innerHTML = `
            <div class="animate-fade-in space-y-6">
                <div>
                    <h2 class="text-2xl font-bold text-white">Ecosistema de Capacitación</h2>
                    <p class="text-slate-400 text-sm mt-1">Contenido técnico segmentado de acuerdo a su encuadre convencional.</p>
                </div>

                <div id="branch-render-target" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${session.rama === 'MINERÍA EXTRACTIVA' ? `
                        <div class="card-premium lg:col-span-2">
                            <div class="flex items-center gap-3 mb-6">
                                <i data-lucide="pickaxe" class="h-6 w-6 text-cyan-400"></i>
                                <h3 class="text-lg font-bold text-white">Proyectos de la Rama: Minería Extractiva</h3>
                            </div>
                            <p class="text-slate-400 text-sm mb-4">Usted tiene acceso exclusivo a los módulos de: <strong>${session.empresa}</strong></p>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div class="p-5 bg-slate-950 border border-cyan-500/30 rounded-xl shadow-lg relative overflow-hidden group">
                                    <div class="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl"></div>
                                    <h4 class="text-white font-semibold text-base">${session.empresa}</h4>
                                    <p class="text-xs text-slate-500 mt-1">CCT e Inducciones de Campo Activas.</p>
                                    <button class="mt-4 w-full btn btn-primary py-2 text-xs" onclick="AppInstance.navigateTo('#evaluaciones')">Ingresar a Contenido</button>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <div class="card-premium group">
                            <h3 class="text-xl font-bold text-white mb-2">${session.rama || 'Rama General'}</h3>
                            <p class="text-sm text-slate-400 mb-4">Acceso unificado a la biblioteca convencional y técnica de su sector industrial.</p>
                            <span class="inline-flex items-center rounded-md bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-400 ring-1 ring-inset ring-cyan-500/20">${session.convenio || 'CCT Activo'}</span>
                            <button class="mt-6 w-full btn btn-secondary py-2.5" onclick="AppInstance.navigateTo('#evaluaciones')">Ver Módulos de Evaluación</button>
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    viewFallback(container, moduleName) {
        container.innerHTML = `
            <div class="text-center py-12 card-premium">
                <i data-lucide="construction" class="h-12 w-12 text-slate-600 mx-auto mb-4"></i>
                <h3 class="text-lg font-bold text-white">Módulo ${moduleName} en Acople Técnico</h3>
                <p class="text-sm text-slate-400 mt-2">La vista solicitada se integrará por completo en la siguiente fase de desarrollo.</p>
            </div>
        `;
    },

    renderGlobalToasts() {
        if (!document.getElementById('toast-container')) {
            const wrapper = document.createElement('div');
            wrapper.id = 'toast-container';
            wrapper.className = 'toast-wrapper';
            document.body.appendChild(wrapper);
        }
    },

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type} animate-fade-in`;
        
        const icons = { success: 'circle-check', danger: 'circle-alert', warning: 'triangle-alert' };

        toast.innerHTML = `
            <i data-lucide="${icons[type] || 'info'}" class="h-5 w-5"></i>
            <span class="text-sm font-medium text-white">${message}</span>
        `;
        container.appendChild(toast);
        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.AppInstance.init();
});