/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo 04: Panel de Control de Administración, Gestión de Escalas y Auditoría de Legajos
 */

window.ModuleAdmin = {
    // Inicializador del módulo (Inyectado por el Router en app.js)
    init(container) {
        const session = JSON.parse(localStorage.getItem('aoma_session'));
        
        // Control perimetral estricto de roles en el Front-End
        if (!session || session.rol !== 'admin') {
            container.innerHTML = `
                <div style="text-align:center; padding: var(--space-12) 0; color: var(--danger);">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 4rem; margin-bottom: var(--space-4);"></i>
                    <h3>Acceso Restringido</h3>
                    <p style="color: var(--text-muted); font-size: var(--font-sm); margin-top: var(--space-2);">
                        Esta sección requiere credenciales de nivel <strong>Administrador o Delegado Seccional</strong>.
                    </p>
                </div>`;
            return;
        }

        this.renderAdminLayout(container);
    },

    // Render de la estructura modular del panel de control
    renderAdminLayout(container) {
        container.innerHTML = `
            <div style="margin-bottom: var(--space-6);">
                <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Panel de Control y Gestión Gremial</h2>
                <p style="color: var(--text-muted); font-size: var(--font-sm);">Herramientas de auditoría, control de escalas salariales y homologación de certificaciones operativas.</p>
            </div>

            <!-- Tabs de navegación internas del Administrador -->
            <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle); padding-bottom: 1px;">
                <button class="btn btn-primary admin-tab-btn" data-target="usuarios">Padrón de Afiliados</button>
                <button class="btn btn-secondary admin-tab-btn" data-target="escalas">Escalas Salariales</button>
                <button class="btn btn-secondary admin-tab-btn" data-target="comunicados">Publicar Comunicado</button>
            </div>

            <!-- Contenedor dinámico secundario de las sub-vistas de administración -->
            <div id="admin-subview-target" class="animate-fade-in"></div>
        `;

        this.bindTabEvents(container);
        this.renderSubViewUsuarios(); // Vista inicial por defecto
    },

    // Orquestador de clics en pestañas administrativas
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

    // Sub-Vista 01: Padrón y Auditoría de Usuarios Registrados
    renderSubViewUsuarios() {
        const subview = document.getElementById('admin-subview-target');
        if (!subview) return;

        const usuarios = JSON.parse(localStorage.getItem('aoma_usuarios')) || [];

        subview.innerHTML = `
            <div class="glassmorphism" style="padding: var(--space-5); border-radius: var(--radius-md);">
                <h4 style="margin-bottom: var(--space-4); color: var(--primary-dark);"><i class="fa-solid fa-users-gear"></i> Auditoría de Personal y Legajos Digitales</h4>
                <div class="table-responsive-container">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: var(--font-sm);">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--text-light); color: var(--primary-dark);">
                                <th style="padding: var(--space-3);">Trabajador</th>
                                <th style="padding: var(--space-3);">E-mail / Cuenta</th>
                                <th style="padding: var(--space-3);">Rama / Puesto</th>
                                <th style="padding: var(--space-3);">Rango</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${usuarios.map(u => `
                                <tr style="border-bottom: 1px solid var(--border-subtle);">
                                    <td style="padding: var(--space-3); font-weight: var(--weight-semibold);">${u.apellido}, ${u.nombre}</td>
                                    <td style="padding: var(--space-3); color: var(--text-muted);">${u.email}</td>
                                    <td style="padding: var(--space-3);">${u.puesto || 'No Asignado'}</td>
                                    <td style="padding: var(--space-3);"><span style="font-size: 11px; font-weight:var(--weight-bold); background: ${u.rol === 'admin' ? 'var(--danger-bg)' : 'rgba(59,146,255,0.15)'}; color: ${u.rol === 'admin' ? 'var(--danger)' : 'var(--primary-light)'}; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">${u.rol}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // Sub-Vista 02: Gestor de Escalas Salariales (Accesible también desde el enrutador general)
    renderEscalas(targetContainer) {
        if (!targetContainer) return;

        // Base de datos fija/editable de salarios homologados en 2026
        const escalasData = [
            { rama: 'Minería Metalífera (CCT 599/10)', categoria: 'Operario Especializado A', basico: '$1.250.000', vigencia: 'Julio 2026' },
            { rama: 'Fabricación de Cemento (CCT 53/89)', categoria: 'Técnico de Planta Mecánico', basico: '$1.180.000', vigencia: 'Julio 2026' },
            { rama: 'Industria de la Cal (CCT 444/06)', categoria: 'Foguista de Horno Industrial', basico: '$980.000', vigencia: 'Julio 2026' }
        ];

        targetContainer.innerHTML = `
            <div class="glassmorphism" style="padding: var(--space-5); border-radius: var(--radius-md);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-4);">
                    <h4 style="color: var(--primary-dark); margin: 0;"><i class="fa-solid fa-money-check-dollar"></i> Grilla Corporativa de Haberes Homologados</h4>
                    <button class="btn btn-primary btn-sm" id="btn-add-escala" onclick="AppInstance.showToast('Funcionalidad de edición reservada a paritarias nacionales.', 'warning')"><i class="fa-solid fa-cloud-arrow-up"></i> Actualizar Escala</button>
                </div>
                
                <div class="table-responsive-container">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: var(--font-sm);">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--text-light); color: var(--primary-dark);">
                                <th style="padding: var(--space-3);">Rama de la Actividad</th>
                                <th style="padding: var(--space-3);">Categoría de Convenio</th>
                                <th style="padding: var(--space-3);">Sueldo Básico Conformado</th>
                                <th style="padding: var(--space-3);">Período Vigencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${escalasData.map(e => `
                                <tr style="border-bottom: 1px solid var(--border-subtle);">
                                    <td style="padding: var(--space-3); font-weight: var(--weight-semibold); color: var(--primary-light);">${e.rama}</td>
                                    <td style="padding: var(--space-3);">${e.categoria}</td>
                                    <td style="padding: var(--space-3); font-variant-numeric: tabular-nums; font-weight: var(--weight-bold); color: var(--success);">${e.basico}</td>
                                    <td style="padding: var(--space-3); color: var(--text-muted);">${e.vigencia}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // Sub-Vista 03: Publicación de Comunicados de Urgencia
    renderSubViewComunicados() {
        const subview = document.getElementById('admin-subview-target');
        if (!subview) return;

        subview.innerHTML = `
            <div class="glassmorphism" style="padding: var(--space-5); border-radius: var(--radius-md); max-width: 600px;">
                <h4 style="margin-bottom: var(--space-4); color: var(--primary-dark);"><i class="fa-solid fa-bullhorn"></i> Inyección de Novedades y Circulares a la Base de la SPA</h4>
                
                <form id="admin-comunicado-form" style="display: flex; flex-direction: column; gap: var(--space-4);">
                    <div class="input-wrapper" style="display: flex; flex-direction: column; gap: var(--space-1);">
                        <label style="font-size: var(--font-sm); font-weight: var(--weight-medium); color: var(--text-muted);">Título de la Circular</label>
                        <input type="text" id="comunicado-title" required placeholder="Ej: Convocatoria a Asamblea General Ordinaria" style="padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); border: 1px solid var(--text-light); background: rgba(0,0,0,0.1); color: var(--text-main);" />
                    </div>

                    <div class="input-wrapper" style="display: flex; flex-direction: column; gap: var(--space-1);">
                        <label style="font-size: var(--font-sm); font-weight: var(--weight-medium); color: var(--text-muted);">Descripción Corta</label>
                        <textarea id="comunicado-desc" rows="3" required placeholder="Detalles de horarios, locación geográfica o alcances de la normativa gremial..." style="padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); border: 1px solid var(--text-light); background: rgba(0,0,0,0.1); color: var(--text-main); font-family: inherit; resize: none;"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i class="fa-solid fa-paper-plane"></i> Emitir y Notificar a Afiliados
                    </button>
                </form>
            </div>
        `;

        // Interceptador del submit del formulario administrativo
        document.getElementById('admin-comunicado-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('comunicado-title').value.trim();
            const desc = document.getElementById('comunicado-desc').value.trim();

            if (title && desc) {
                if (window.AppInstance) {
                    window.AppInstance.showToast('Circular distribuida correctamente en el muro global del campus.', 'success');
                }
                document.getElementById('admin-comunicado-form').reset();
            }
        });
    }
};