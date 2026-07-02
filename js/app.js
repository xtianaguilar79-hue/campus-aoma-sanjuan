/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo Central: app.js (SPA Core Router & Safe Session Engine)
 */

window.AppInstance = {
    init() {
        console.log("AOMA Campus Virtual: Inicializando sistema...");
        this.verifySessionState();
        this.bindGlobalEvents();
        this.route(window.location.hash || '#panel');
    },

    verifySessionState() {
        // Objeto seguro por defecto si localStorage está vacío o corrupto
        const sessionDefault = { loggedIn: false, nombre: "Invitado", rama: "No Asignada", empresa: "No Asignada", rol: "afiliado" };
        
        try {
            let session = localStorage.getItem('aoma_session');
            if (!session) {
                localStorage.setItem('aoma_session', JSON.stringify(sessionDefault));
            }
        } catch (e) {
            console.error("Error accediendo al localStorage:", e);
        }
        
        this.updateUserSessionUI();
    },

    updateUserSessionUI() {
        let session = {};
        try {
            session = JSON.parse(localStorage.getItem('aoma_session')) || {};
        } catch(e) {
            session = {};
        }

        // CONTROL DE NULOS ULTRA SEGURO: Evita el Uncaught TypeError detectado en la consola
        const nombreUser = session.nombre || 'Afiliado';
        const ramaUser = (session.rama || 'General').toUpperCase();
        const empresaUser = (session.empresa || 'No Asignada');
        const cctUser = session.cct || 'No Asignado';

        // Renderizado defensivo del bloque de perfil (Sidebar / Header Dropdown)
        const profileTarget = document.getElementById('user-profile-target');
        if (profileTarget) {
            profileTarget.innerHTML = `
                <div class="p-4 bg-slate-950/40 rounded-xl border border-slate-800 space-y-3">
                    <div class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                            ${nombreUser.charAt(0)}
                        </div>
                        <div>
                            <h4 class="text-sm font-bold text-white">Buenas tardes, ${nombreUser}</h4>
                            <p class="text-[11px] text-slate-400">Legajo activo en San Juan</p>
                        </div>
                    </div>
                    <div class="pt-2 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-[11px]">
                        <div><span class="text-slate-500 block">Empresa:</span> <span class="text-slate-300 font-medium">${empresaUser}</span></div>
                        <div><span class="text-slate-500 block">Rama:</span> <span class="text-slate-300 font-medium">${ramaUser}</span></div>
                        <div class="col-span-full"><span class="text-slate-500 block">Convenio:</span> <span class="text-slate-300 font-medium">CCT ${cctUser}</span></div>
                    </div>
                </div>
            `;
        }
    },

    bindGlobalEvents() {
        window.addEventListener('hashchange', () => {
            this.route(window.location.hash);
        });

        // Toggle del Sidebar móvil si aplica
        document.getElementById('mobile-menu-trigger')?.addEventListener('click', () => {
            document.getElementById('sidebar-main')?.classList.toggle('-translate-x-full');
        });
    },

    route(hash) {
        const container = document.getElementById('main-content-viewport');
        if (!container) return;

        // Limpieza de Modales huérfanos de vistas anteriores
        document.getElementById('video-player-modal')?.remove();
        document.body.style.overflow = '';

        // Enrutador seguro: Si el módulo no se cargó (Error 404), muestra un aviso limpio sin romper la app
        switch (hash) {
            case '#panel':
                container.innerHTML = `
                    <div class="container-premium animate-fade-in space-y-6">
                        <div>
                            <h2 class="text-2xl font-bold text-white">Panel Central</h2>
                            <p class="text-slate-400 text-sm mt-1">Acceso rápido a sus herramientas y trayectos formativos gremiales.</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="#capacitaciones" class="card-premium hover:border-cyan-500/40 transition-all p-6 space-y-2 block">
                                <h3 class="text-white font-semibold text-base flex items-center gap-2"><i class="fa-solid fa-graduation-cap text-cyan-400"></i> Cursos Activos</h3>
                                <p class="text-slate-400 text-xs leading-relaxed">Acceda a las aulas virtuales y trayectos formativos homologados vigentes.</p>
                            </a>
                            <a href="#videoteca" class="card-premium hover:border-cyan-500/40 transition-all p-6 space-y-2 block">
                                <h3 class="text-white font-semibold text-base flex items-center gap-2"><i class="fa-solid fa-video text-cyan-400"></i> Videoteca</h3>
                                <p class="text-slate-400 text-xs leading-relaxed">Clases técnicas y de seguridad en planta segmentadas por su rama laboral.</p>
                            </a>
                        </div>
                    </div>
                `;
                break;

            case '#videoteca':
                if (window.ModuleVideos) {
                    window.ModuleVideos.init(container);
                } else {
                    this.renderModuleLoadError(container, "Videoteca (videos.js)");
                }
                break;

            case '#capacitaciones':
                container.innerHTML = `
                    <div class="container-premium animate-fade-in space-y-4">
                        <h2 class="text-xl font-bold text-white">Capacitaciones Gremiales</h2>
                        <p class="text-slate-400 text-sm">Aulas y exámenes de certificación técnica en desarrollo.</p>
                    </div>`;
                break;

            default:
                container.innerHTML = `<div class="p-8 text-center text-slate-400">Vista no encontrada.</div>`;
                break;
        }

        if (window.lucide) lucide.createIcons();
    },

    renderModuleLoadError(container, moduleName) {
        container.innerHTML = `
            <div class="card-premium text-center py-12 flex flex-col items-center justify-center gap-3 max-w-xl mx-auto mt-8">
                <i class="fa-solid fa-triangle-exclamation text-amber-500 text-2xl"></i>
                <h3 class="text-white font-semibold">Error al cargar el módulo</h3>
                <p class="text-slate-400 text-xs">No se pudo compilar el archivo de la <strong>${moduleName}</strong>. Asegúrese de que el script esté subido correctamente en su entorno de Vercel.</p>
            </div>
        `;
    },

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl border text-xs shadow-xl animate-slide-up flex items-center gap-2 ${
            type === 'success' 
                ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/30' 
                : 'bg-rose-950/90 text-rose-400 border-rose-500/30'
        }`;
        toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> <span>${message}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.AppInstance.init();
});