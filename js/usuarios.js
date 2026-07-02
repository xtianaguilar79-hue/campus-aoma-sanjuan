/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: usuarios.js (Profile & Affiliation Management)
 */

window.ModuleUsuarios = {
    init(container) {
        this.renderProfilePanel(container);
    },

    renderProfilePanel(container) {
        const session = JSON.parse(localStorage.getItem('aoma_session')) || {};
        
        container.innerHTML = `
            <div class="container-premium space-y-6 max-w-2xl animate-fade-in">
                <div>
                    <h2 class="text-xl font-bold text-white">Mi Legajo Digital</h2>
                    <p class="text-slate-400 text-xs mt-1">Información de encuadramiento convencional reportada por su empleador.</p>
                </div>

                <div class="card-premium space-y-4 p-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                            <label class="text-slate-500 block mb-1">Nombre Completo</label>
                            <input type="text" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 outline-none" value="${session.nombre || 'Afiliado Gremial'}">
                        </div>
                        <div>
                            <label class="text-slate-500 block mb-1">Seccional Sindical</label>
                            <input type="text" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 outline-none" value="San Juan (Sede Central)">
                        </div>
                        <div>
                            <label class="text-slate-500 block mb-1">Rama de Actividad</label>
                            <input type="text" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-400 font-medium outline-none" value="${session.rama || 'General'}">
                        </div>
                        <div>
                            <label class="text-slate-500 block mb-1">Empresa / Contratista</label>
                            <input type="text" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 outline-none" value="${session.empresa || 'No Asignada'}">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};