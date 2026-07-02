/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: noticias.js (Gremial News Feed - Standalone)
 */

window.ModuleNoticias = {
    noticiasData: [],

    init(container) {
        this.loadNoticiasDatabase();
        this.render(container);
    },

    loadNoticiasDatabase() {
        this.noticiasData = [
            {
                id: 'n1',
                title: 'Nuevas Escalas Salariales Homologadas - Rama Cal y Piedra',
                date: 'Reciente',
                summary: 'Se publicaron las planillas de salarios básicos definitivas acordadas para el trimestre en la Seccional San Juan.'
            },
            {
                id: 'n2',
                title: 'Entrega de Kits Escolares para Hijos de Afiliados',
                date: 'Vigente',
                summary: 'Comienza el cronograma de retiro de útiles e indumentaria escolar en la sede central de AOMA San Juan.'
            }
        ];
    },

    render(container) {
        container.innerHTML = `
            <div class="space-y-4 animate-fade-in">
                <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">Novedades Sindicales</h3>
                <div class="grid grid-cols-1 gap-4">
                    ${this.noticiasData.map(item => `
                        <div class="card-premium p-4 space-y-2">
                            <div class="flex justify-between items-start gap-4">
                                <h4 class="text-sm font-semibold text-white leading-snug">${item.title}</h4>
                                <span class="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium">${item.date}</span>
                            </div>
                            <p class="text-slate-400 text-xs leading-relaxed">${item.summary}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};