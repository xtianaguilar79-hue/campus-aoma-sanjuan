// Panel de Administración
const admin = {
    init() {
        console.log('✅ Panel de administración inicializado');
    },

    async render(page, container) {
        if (!container) container = document.getElementById('pageContent');
        if (!container) return;

        switch (page) {
            case 'admin-dashboard':
                await this.renderDashboard(container);
                break;
            case 'admin-usuarios':
                await this.renderUsuarios(container);
                break;
            case 'admin-cursos':
                await this.renderCursos(container);
                break;
            case 'admin-estadisticas':
                await this.renderEstadisticas(container);
                break;
            default:
                await this.renderDashboard(container);
        }
    },

    async renderDashboard(container) {
        const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
        const courses = JSON.parse(localStorage.getItem(CONFIG.storageKeys.courses) || '[]');
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');

        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header">
                    <h1>Panel de Administración</h1>
                    <p>Gestión del Campus Virtual AOMA</p>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon primary"><i class="fas fa-users"></i></div>
                        <div class="stat-value">${users.length}</div>
                        <div class="stat-label">Usuarios Registrados</div>
                    </div>
                    <div class="stat-card accent">
                        <div class="stat-icon accent"><i class="fas fa-graduation-cap"></i></div>
                        <div class="stat-value">${courses.length}</div>
                        <div class="stat-label">Cursos Activos</div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon success"><i class="fas fa-certificate"></i></div>
                        <div class="stat-value">${certificates.length}</div>
                        <div class="stat-label">Certificados Emitidos</div>
                    </div>
                </div>
                <div class="section">
                    <h2 class="section-title" style="margin-bottom: 1rem;">Accesos Rápidos</h2>
                    <div class="admin-actions">
                        <button class="btn btn-primary" onclick="admin.render('admin-usuarios')">
                            <i class="fas fa-users"></i> Gestionar Usuarios
                        </button>
                        <button class="btn btn-primary" onclick="admin.render('admin-cursos')">
                            <i class="fas fa-book"></i> Gestionar Cursos
                        </button>
                        <button class="btn btn-primary" onclick="admin.render('admin-estadisticas')">
                            <i class="fas fa-chart-bar"></i> Ver Estadísticas
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    async renderUsuarios(container) {
        const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header">
                    <h1>Gestión de Usuarios</h1>
                    <p>Administra los usuarios del campus</p>
                </div>
                <div class="section">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${users.map(user => `
                                    <tr>
                                        <td><b>${user.username}</b></td>
                                        <td>${user.name}</td>
                                        <td>${user.email || '-'}</td>
                                        <td><span class="badge ${user.role}">${user.role}</span></td>
                                        <td>
                                            <span class="status-badge ${user.active ? 'active' : 'inactive'}">
                                                ${user.active ? 'Activo' : 'Bloqueado'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style="display: flex; gap: 0.5rem;">
                                                <button class="btn-icon" onclick="admin.toggleUserStatus(${user.id})" title="${user.active ? 'Bloquear' : 'Activar'}">
                                                    <i class="fas ${user.active ? 'fa-ban' : 'fa-check'}"></i>
                                                </button>
                                                ${user.role !== 'admin' ? `
                                                    <button class="btn-icon danger" onclick="admin.deleteUser(${user.id})" title="Eliminar">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                ` : ''}
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    toggleUserStatus(userId) {
        const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
        const user = users.find(u => u.id === userId);
        if (user) {
            user.active = !user.active;
            localStorage.setItem(CONFIG.storageKeys.users, JSON.stringify(users));
            app.showToast(`Usuario ${user.active ? 'activado' : 'bloqueado'}`, 'success');
            this.render('admin-usuarios');
        }
    },

    deleteUser(userId) {
        if (confirm('¿Está seguro que desea eliminar este usuario?')) {
            const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
            const filtered = users.filter(u => u.id !== userId);
            localStorage.setItem(CONFIG.storageKeys.users, JSON.stringify(filtered));
            app.showToast('Usuario eliminado', 'success');
            this.render('admin-usuarios');
        }
    },

    async renderCursos(container) {
        const courses = JSON.parse(localStorage.getItem(CONFIG.storageKeys.courses) || '[]');
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header">
                    <h1>Gestión de Cursos</h1>
                    <p>Administra los cursos y capacitaciones</p>
                </div>
                <div class="cards-grid">
                    ${courses.map(course => `
                        <div class="course-card-admin scroll-reveal">
                            <img src="${course.image}" alt="${course.title}" onerror="this.src='https://via.placeholder.com/400x200?text=Curso'">
                            <div class="course-info">
                                <h3>${course.title}</h3>
                                <p>${course.category} • ${course.duration}</p>
                                <div class="course-actions">
                                    <button class="btn btn-danger btn-sm" onclick="admin.deleteCourse(${course.id})">
                                        <i class="fas fa-trash"></i> Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    deleteCourse(courseId) {
        if (confirm('¿Eliminar este curso?')) {
            let courses = JSON.parse(localStorage.getItem(CONFIG.storageKeys.courses) || '[]');
            courses = courses.filter(c => c.id !== courseId);
            localStorage.setItem(CONFIG.storageKeys.courses, JSON.stringify(courses));
            app.showToast('Curso eliminado', 'success');
            this.render('admin-cursos');
        }
    },

    async renderEstadisticas(container) {
        const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
        const certs = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const evals = JSON.parse(localStorage.getItem('aoma_evaluations_completed') || '{}');

        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header">
                    <h1>Estadísticas del Campus</h1>
                    <p>Análisis detallado de la plataforma</p>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${users.length}</div>
                        <div class="stat-label">Total Usuarios</div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-value">${users.filter(u => u.active).length}</div>
                        <div class="stat-label">Usuarios Activos</div>
                    </div>
                    <div class="stat-card accent">
                        <div class="stat-value">${Object.keys(evals).length}</div>
                        <div class="stat-label">Evaluaciones Realizadas</div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-value">${certs.length}</div>
                        <div class="stat-label">Certificados Emitidos</div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.admin = admin;
}
