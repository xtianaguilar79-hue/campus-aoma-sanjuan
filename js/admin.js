/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: admin.js (UI Premium Edition)
 */

window.ModuleAdmin = {
    init(container) {
        const session = JSON.parse(localStorage.getItem('aoma_session'));
        if (!session || session.rol !== 'admin') {
            container.innerHTML = `
                <div style="text-align:center; padding: var(--space-12) 0;">
                    <i class="fa-solid fa-ban" style="font-size: 3.5rem; color: var(--danger); margin-bottom: var(--space-4);"></i>
                    <h3 class="page-title" style="font-size:var(--font-xl);">Acceso Restringido</h3>
                    <p class="page-subtitle">Se requieren privilegios de Administrador Gremial.</p>
                </div>`;
            return;
        }
        this.renderAdminLayout(container);
    },

    renderAdminLayout(container) {
        container.innerHTML = `
            <div class="container-premium animate-fade-in">
                <div style="margin-bottom: var(--space-6);">
                    <h2 class="page-title">Panel de Control Gremial</h2>
                    <p class="page-subtitle">Auditoría corporativa, actualización de haberes paritarios y gestión de legajos.</p>
                </div>

                <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle); padding-bottom: 1px;">
                    <button class="btn btn-primary admin-tab-btn" data-target="usuarios">Padrón Digital</button>
                    <button class="btn btn-secondary admin-tab-btn" data-target="escalas">Escalas Salariales</button>
                    <button class="btn btn-secondary admin-tab-btn" data-target="comunicados">Nueva Circular</button>
                </div>

                <div id="admin-subview-target" class="animate-slide-up"></div>
            </div>
        `;
        this.bindTabEvents(container);
        this.renderSubViewUsuarios();
    },

    bindTabEvents(container) {
        container.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.admin-tab-btn').forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-secondary');
                });
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary');

                const target = btn.getAttribute('data-target');
                if (target === 'usuarios') this.renderSubViewUsuarios();
                if (target === 'escalas') this.renderEscalas(document.getElementById('admin-subview-target'));
                if (target === 'comunicados') this.renderSubViewComunicados();
            });
        });
    },

    renderSubViewUsuarios() {
        const subview = document.getElementById('admin-subview-target');
        if (!subview) return;

        const usuarios = JSON.parse(localStorage.getItem('aoma_usuarios')) || [];

        subview.innerHTML = `
            <div class="card-premium" style="padding: var(--space-4);">
                <table class="table-premium">
                    <thead>
                        <tr>
                            <th>Afiliado</th>
                            <th>Legajo Virtual</th>
                            <th>Rama / Especialidad</th>
                            <th>Rango</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuarios.map(u => `
                            <tr>
                                <td style="font-weight: var(--weight-medium);">${u.apellido}, ${u.nombre}</td>
                                <td style="color: var(--text-muted); font-family: monospace;">${u.email}</td>
                                <td>${u.puesto || 'General'}</td>
                                <td><span class="badge ${u.rol === 'admin' ? 'badge-danger' : 'badge-primary'}">${u.rol}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderEscalas(targetContainer) {
        if (!targetContainer) return;

        const escalasData = [
            { rama: 'Minería Metalífera (CCT 599/10)', categoria: 'Operario Especializado A', basico: '$1.250.000', vigencia: 'Julio 2026' },
            { rama: 'Fabricación de Cemento (CCT 53/89)', categoria: 'Técnico de Planta Mecánico', basico: '$1.180.000', vigencia: 'Julio 2026' },
            { rama: 'Industria de la Cal (CCT 444/06)', categoria: 'Foguista de Horno Industrial', basico: '$980.000', vigencia: 'Julio 2026' }
        ];

        targetContainer.innerHTML = `
            <div class="card-premium">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: var(--space-4);">
                    <h4 style="color:var(--text-main); font-weight:var(--weight-semibold);"><i class="fa-solid fa-coins"></i> Convenios Colectivos Homologados 2026</h4>
                    <button class="btn btn-secondary btn-sm" onclick="AppInstance.showToast('Acción paritaria bloqueada en ambiente local.', 'warning')">Actualizar Grilla</button>
                </div>
                <table class="table-premium">
                    <thead>
                        <tr>
                            <th>Rama</th>
                            <th>Categoría</th>
                            <th>Básico Conformado</th>
                            <th>Vigencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${escalasData.map(e => `
                            <tr>
                                <td style="font-weight: var(--weight-medium); color: var(--primary-light);">${e.rama}</td>
                                <td>${e.categoria}</td>
                                <td style="font-weight: var(--weight-bold); color: var(--success); font-family: monospace;">${e.basico}</td>
                                <td style="color: var(--text-muted);">${e.vigencia}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderSubViewComunicados() {
        const subview = document.getElementById('admin-subview-target');
        if (!subview) return;

        subview.innerHTML = `
            <div class="card-premium" style="max-width: 600px;">
                <h4 style="margin-bottom: var(--space-4); font-weight: var(--weight-semibold);">Emitir Comunicado Oficial Urgente</h4>
                <form id="admin-comunicado-form">
                    <div class="form-group">
                        <label class="form-label">Título de la Circular</label>
                        <input type="text" id="comunicado-title" class="form-input" required placeholder="Ej: Convocatoria a Asamblea Paritaria" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contenido / Cuerpo normativo</label>
                        <textarea id="comunicado-desc" class="form-input" rows="4" required placeholder="Detalles de la circular..." style="font-family:inherit; resize:none;"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;"><i class="fa-solid fa-bullhorn"></i> Publicar en Muro Global</button>
                </form>
            </div>
        `;

        document.getElementById('admin-comunicado-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (window.AppInstance) {
                window.AppInstance.showToast('Circular distribuida con éxito.', 'success');
                document.getElementById('admin-comunicado-form').reset();
            }
        });
    }
};