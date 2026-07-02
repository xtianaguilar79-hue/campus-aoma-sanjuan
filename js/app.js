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
        // Objeto de contingencia ultra-seguro por si localStorage está vacío, roto o corrupto
        const sessionDefault = { 
            loggedIn: false, 
            nombre: "Afiliado Gremial", 
            rama: "General", 
            empresa: "No Asignada", 
            cct: "No Asignado",
            rol: "afiliado" 
        };
        
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

        // CONTROL DE NULOS ABSOLUTO: Si la propiedad no existe, usa el fallback string de la derecha
        const nombreUser = session.nombre || 'Afiliado';
        const ramaUser = String(session.rama || 'General').toUpperCase();
        const empresaUser = session.empresa || 'No Asignada';
        const cctUser = session.cct || 'No Asignado';

        // Inyección defensiva en el contenedor de perfil lateral (Evita textos encimados y undefined)
        const profileTarget = document.getElementById('user-profile-target');
        if (profileTarget) {
            profileTarget.innerHTML = `
                <div style="padding: 1rem; background: rgba(7, 10, 19, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; margin-top: 1rem;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 0.75rem;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(6, 182, 212, 0.2); border: 1px solid rgba(6, 182, 212, 0.3); display: flex; align-items: center; justify-content: center; color: #06b6d4; font-weight: bold; font-size: 14px;">
                            ${nombreUser.charAt(0)}
                        </div>
                        <div>
                            <h4 style="margin: 0; font-size: 13px; font-weight: 700; color: #ffffff;">Buenas tardes, ${nombreUser}</h4>
                            <p style="margin: 0; font-size: 11px; color: #94a3b8;">Legajo activo - San Juan</p>
                        </div>
                    </div>
                    <div style="padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.05); display: grid; grid-template-cols: 1fr 1fr; gap: 8px; font-size: 11px;">
                        <div><span style="color: #64748b; display: block;">Empresa:</span> <span style="color: #cbd5e1; font-weight: 500;">${empresaUser}</span></div>
                        <div><span style="color: #64748b; display: block;">Rama:</span> <span style="color: #cbd5e1; font-weight: 500;">${ramaUser}</span></div>
                        <div style="grid-column: span 2;"><span style="color: #64748b; display: block;">Convenio Laboral:</span> <span style="color: #cbd5e1; font-weight: 500;">CCT ${cctUser}</span></div>
                    </div>
                </div>
            `;
        }
    },

    bindGlobalEvents() {
        window.removeEventListener('hashchange', this.handleHashChange);
        this.handleHashChange = () => this.route(window.location.hash);
        window.addEventListener('hashchange', this.handleHashChange);
    },

    route(hash) {
        const container = document.getElementById('main-content-viewport');
        if (!container) return;

        // Reset de modales e hilos colgados
        document.getElementById('video-player-modal')?.remove();
        document.body.style.overflow = '';

        // Manejador Interno SPA: Si un archivo secundario da 404, el Router no se muere
        switch (hash) {
            case '#panel':
                container.innerHTML = `
                    <div style="padding: 1.5rem; color: #fff;" class="animate-fade-in">
                        <div style="margin-bottom: 2rem;">
                            <h2 style="font-size: 1.5rem; font-weight: 700; margin: 0;">Panel Central de Afiliados</h2>
                            <p style="color: #94a3b8; font-size: 0.875rem; margin: 4px 0 0 0;">Acceso unificado a sus herramientas y trayectos formativos homologados.</p>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                            <a href="#capacitaciones" style="display: block; padding: 1.5rem; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; text-decoration: none; transition: all 0.3s;">
                                <h3 style="color: #fff; font-size: 1rem; margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px;">📚 Cursos Activos</h3>
                                <p style="color: #94a3b8; font-size: 0.75rem; margin: 0; line-height: 1.5;">Aulas virtuales asignadas y seguimiento de calificaciones por trayecto.</p>
                            </a>
                            <a href="#videoteca" style="display: block; padding: 1.5rem; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; text-decoration: none; transition: all 0.3s;">
                                <h3 style="color: #fff; font-size: 1rem; margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px;">🎬 Videoteca Instructiva</h3>
                                <p style="color: #94a3b8; font-size: 0.75rem; margin: 0; line-height: 1.5;">Capacitaciones audiovisuales técnicas y de seguridad en planta por rama minera.</p>
                            </a>
                        </div>
                    </div>
                `;
                break;

            case '#videoteca':
                if (window.ModuleVideos) {
                    window.ModuleVideos.init(container);
                } else {
                    this.renderFallbackModule(container, "Videoteca", "Asegúrese de cargar correctamente el archivo 'videos.js' en la cabecera.");
                }
                break;

            case '#capacitaciones':
                container.innerHTML = `
                    <div style="padding: 1.5rem; color: #fff;">
                        <h2 style="font-size: 1.25rem; font-weight: 700;">Capacitaciones de Higiene y Seguridad</h2>
                        <p style="color: #94a3b8; font-size: 0.875rem;">Módulos evaluativos y certificaciones con validez sindical en preparación.</p>
                    </div>`;
                break;

            case '#chat':
                container.innerHTML = `
                    <div style="padding: 1.5rem; color: #fff;">
                        <h2 style="font-size: 1.25rem; font-weight: 700;">Asistente de Inteligencia Artificial IA</h2>
                        <p style="color: #94a3b8; font-size: 0.875rem;">Consultas interactivas sobre convenios colectivos CCT 36/89 y CCT 53/89 próximamente disponibles.</p>
                    </div>`;
                break;

            default:
                // Fallback elegante para hashes no registrados o en desarrollo
                container.innerHTML = `
                    <div style="padding: 3rem; text-align: center; color: #94a3b8;">
                        <p style="font-size: 0.875rem; margin: 0;">Sección en mantenimiento técnico o desarrollo.</p>
                        <a href="#panel" style="color: #06b6d4; font-size: 12px; display: inline-block; margin-top: 12px; text-decoration: none;">Volver al Panel Principal</a>
                    </div>`;
                break;
        }

        if (window.lucide) lucide.createIcons();
    },

    renderFallbackModule(container, moduleName, description) {
        container.innerHTML = `
            <div style="max-w: 500px; margin: 2rem auto; padding: 2rem; background: rgba(15,23,42,0.6); border: 1px solid rgba(245,158,11,0.2); border-radius: 16px; text-align: center;">
                <h3 style="color: #fff; font-size: 15px; margin: 0 0 8px 0;">Módulo ${moduleName} Temporalmente No Disponible</h3>
                <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.6;">${description}</p>
            </div>
        `;
    },

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style = `position: fixed; bottom: 16px; right: 16px; z-index: 9999; padding: 12px 16px; border-radius: 12px; font-size: 12px; display: flex; align-items: center; gap: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5); border: 1px solid; ${
            type === 'success' 
                ? 'background: rgba(6,78,59,0.95); color: #34d399; border-color: rgba(52,211,153,0.2);' 
                : 'background: rgba(153,27,27,0.95); color: #f87171; border-color: rgba(248,113,113,0.2);'
        }`;
        toast.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4500);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.AppInstance.init();
});