// Panel de Administración
const admin = {
    init() {
        console.log('Panel de administración inicializado');
        // Verificar permisos de admin
        if (app.currentUser && app.currentUser.role !== 'admin') {
            console.warn('Usuario no tiene permisos de administrador');
        }
    },

    async render(page, container) {
        if (!container) {
            container = document.getElementById('pageContent');
        }

        switch(page) {
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
        const evaluations = JSON.parse(localStorage.getItem('aoma_evaluations_completed') || '{}');
        
        const activeUsers = users.filter(u => u.active).length;
        const totalEvaluations = Object.keys(evaluations).length;
        
        container.innerHTML = `
            <div class="admin-dashboard animate-fade-in">
                <div class="page-header">
                    <h1>Panel de Administración</h1>
                    <p>Gestión del Campus Virtual AOMA</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon primary">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-value">${users.length}</div>
                        <div class="stat-label">Usuarios Registrados</div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon success">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="stat-value">${activeUsers}</div>
                        <div class="stat-label">Usuarios Activos</div>
                    </div>
                    <div class="stat-card accent">
                        <div class="stat-icon accent">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="stat-value">${courses.length}</div>
                        <div class="stat-label">Cursos Activos</div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon warning">
                            <i class="fas fa-certificate"></i>
                        </div>
                        <div class="stat-value">${certificates.length}</div>
                        <div class="stat-label">Certificados Emitidos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon primary">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div class="stat-value">${totalEvaluations}</div>
                        <div class="stat-label">Evaluaciones Completadas</div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <h2 class="section-title">Accesos Rápidos</h2>
                    </div>
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
                        <button class="btn btn-secondary" onclick="usuarios.exportToJSON()">
                            <i class="fas fa-download"></i> Exportar Usuarios
                        </button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header">
                        <h2 class="section-title">Actividad Reciente</h2>
                    </div>
                    <div class="recent-activity">
                        ${this.getRecentActivity()}
                    </div>
                </div>
            </div>
        `;
    },

    getRecentActivity() {
        const evaluations = JSON.parse(localStorage.getItem('aoma_evaluations_completed') || '{}');
        const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
        const certs = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        
        // Combinar evaluaciones y certificados
        let activities = [];
        
        Object.entries(evaluations).forEach(([key, value]) => {
            const [userId] = key.split('_');
            const user = users.find(u => u.id == userId);
            activities.push({
                type: 'evaluation',
                user: user ? user.name : 'Usuario desconocido',
                action: 'completó una evaluación',
                score: value.score + '%',
                date: value.date
            });
        });
        
        certs.forEach(cert => {
            const user = users.find(u => u.id == cert.userId);
            activities.push({
                type: 'certificate',
                user: user ? user.name : 'Usuario desconocido',
                action: 'obtuvo un certificado',
                course: cert.courseName,
                date: cert.date
            });
        });
        
        // Ordenar por fecha
        activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Tomar las últimas 5
        return activities.slice(0, 5).map(activity => `
            <div class="activity-item" style="padding: 1rem; border-bottom: 1px solid var(--border-color); display: flex; gap: 1rem; align-items: center;">
                <div class="activity-icon" style="width: 40px; height: 40px; background: ${activity.type === 'certificate' ? 'var(--success-light)' : 'var(--info-light)'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: ${activity.type === 'certificate' ? 'var(--success)' : 'var(--info)'};">
                    <i class="fas ${activity.type === 'certificate' ? 'fa-certificate' : 'fa-clipboard-check'}"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: var(--text-primary);">${activity.user}</div>
                    <div style="font-size: var(--text-sm); color: var(--text-secondary);">${activity.action} ${activity.score || activity.course || ''}</div>
                </div>
                <div style="font-size: var(--text-xs); color: var(--text-tertiary);">${Utils.formatDate(activity.date)}</div>
            </div>
        `).join('') || '<p style="padding: 2rem; text-align: center; color: var(--text-tertiary);">No hay actividad reciente</p>';
    },

    async renderUsuarios(container) {
        const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
        
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h1>Gestión de Usuarios</h1>
                        <p>Administra los usuarios del campus</p>
                    </div>
                    <button class="btn btn-primary" onclick="admin.showUserModal()">
                        <i class="fas fa-plus"></i> Nuevo Usuario
                    </button>
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
                                        <td>
                                            <div style="font-weight: 600;">${user.username}</div>
                                            <div style="font-size: var(--text-xs); color: var(--text-tertiary);">ID: ${user.id}</div>
                                        </td>
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
                                                <button class="btn-icon" onclick="admin.editUser(${user.id})" title="Editar">
                                                    <i class="fas fa-edit"></i>
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
        const user = usuarios.toggleStatus(userId);
        if (user) {
            app.showToast(`Usuario ${user.active ? 'activado' : 'bloqueado'} correctamente`, 'success');
            this.render('admin-usuarios');
        }
    },

    showUserModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-overlay active" onclick="admin.closeUserModal()"></div>
            <div class="modal-content modal-medium">
                <div class="modal-header">
                    <h3>Nuevo Usuario</h3>
                    <button class="modal-close" onclick="admin.closeUserModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="newUserForm" onsubmit="admin.createUser(event)">
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label class="app-label">Nombre completo</label>
                            <input type="text" name="name" class="app-input" required placeholder="Ej: Juan Carlos Pérez">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label class="app-label">Usuario</label>
                            <input type="text" name="username" class="app-input" required placeholder="Ej: jperez">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label class="app-label">Email</label>
                            <input type="email" name="email" class="app-input" required placeholder="Ej: jperez@aoma.org.ar">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label class="app-label">Contraseña</label>
                            <input type="password" name="password" class="app-input" required placeholder="••••••••">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label class="app-label">Rol</label>
                            <select name="role" class="app-select" required>
                                <option value="delegado">Delegado</option>
                                <option value="dirigente">Dirigente</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                            <button type="button" class="btn btn-secondary" onclick="admin.closeUserModal()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Crear Usuario</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    closeUserModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    },

    createUser(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        const newUser = {
            name: formData.get('name'),
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        };
        
        usuarios.create(newUser);
        this.closeUserModal();
        app.showToast('Usuario creado correctamente', 'success');
        this.render('admin-usuarios');
    },

    editUser(userId) {
        const user = usuarios.getById(userId);
        if (user) {
            app.showToast(`Editando usuario: ${user.name}`, 'info');
            // Implementar edición completa si es necesario
        }
    },

    deleteUser(userId) {
        if (confirm('¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer.')) {
            usuarios.delete(userId);
            app.showToast('Usuario eliminado correctamente', 'success');
            this.render('admin-usuarios');
        }
    },

    async renderCursos(container) {
        const courses = JSON.parse(localStorage.getItem(CONFIG.storageKeys.courses) || '[]');
        
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h1>Gestión de Cursos</h1>
                        <p>Administra los cursos y capacitaciones</p>
                    </div>
                    <button class="btn btn-primary" onclick="admin.showCourseModal()">
                        <i class="fas fa-plus"></i> Nuevo Curso
                    </button>
                </div>
                
                <div class="cards-grid">
                    ${courses.map(course => `
                        <div class="course-card-admin scroll-reveal">
                            <img src="${course.image}" alt="${course.title}" onerror="this.src='https://via.placeholder.com/400x200?text=Sin+imagen'">
                            <div class="course-info">
                                <span class="badge ${course.category}" style="margin-bottom: 0.5rem; display: inline-block;">${course.category}</span>
                                <h3>${course.title}</h3>
                                <p>${course.duration} • ${course.level}</p>
                                <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: 1rem;">
                                    Instructor: ${course.instructor}
                                </p>
                                <div class="course-actions">
                                    <button class="btn btn-secondary btn-sm" onclick="admin.editCourse(${course.id})">
                                        <i class="fas fa-edit"></i> Editar
                                    </button>
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

    showCourseModal() {
        app.showToast('Función en desarrollo', 'info');
    },

    editCourse(courseId) {
        app.showToast(`Editando curso ${courseId}`, 'info');
    },

    deleteCourse(courseId) {
        if (confirm('¿Está seguro que desea eliminar este curso?')) {
            let courses = JSON.parse(localStorage.getItem(CONFIG.storageKeys.courses) || '[]');
            courses = courses.filter(c => c.id !== courseId);
            localStorage.setItem(CONFIG.storageKeys.courses, JSON.stringify(courses));
            app.showToast('Curso eliminado correctamente', 'success');
            this.render('admin-cursos');
        }
    },

    async renderEstadisticas(container) {
        const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
        const certs = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const evals = JSON.parse(localStorage.getItem('aoma_evaluations_completed') || '{}');
        
        const activeUsers = users.filter(u => u.active).length;
        const inactiveUsers = users.length - activeUsers;
        
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header">
                    <h1>Estadísticas del Campus</h1>
                    <p>Análisis detallado de la plataforma</p>
                </div>
                
                <div class="stats-grid" style="margin-bottom: 2rem;">
                    <div class="stat-card">
                        <div class="stat-value">${users.length}</div>
                        <div class="stat-label">Total Usuarios</div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-value">${activeUsers}</div>
                        <div class="stat-label">Usuarios Activos</div>
                    </div>
                    <div class="stat-card danger">
                        <div class="stat-value">${inactiveUsers}</div>
                        <div class="stat-label">Usuarios Inactivos</div>
                    </div>
                    <div class="stat-card accent">
                        <div class="stat-value">${Object.keys(evals).length}</div>
                        <div class="stat-label">Evaluaciones Realizadas</div>
                    </div>
                </div>
                
                <div class="section">
                    <h2 style="margin-bottom: 1.5rem;">Distribución por Rol</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        ${this.getRoleDistribution(users)}
                    </div>
                </div>
                
                <div class="section" style="margin-top: 2rem;">
                    <h2 style="margin-bottom: 1.5rem;">Certificados Emitidos</h2>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Curso</th>
                                    <th>Usuario</th>
                                    <th>Puntaje</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${certs.slice(0, 10).map(cert => {
                                    const user = users.find(u => u.id == cert.userId);
                                    return `
                                        <tr>
                                            <td>${cert.courseName}</td>
                                            <td>${user ? user.name : 'Usuario desconocido'}</td>
                                            <td><span class="badge success">${cert.score}%</span></td>
                                            <td>${Utils.formatDate(cert.date)}</td>
                                        </tr>
                                    `;
                                }).join('') || '<tr><td colspan="4" style="text-align: center; padding: 2rem;">No hay certificados</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    getRoleDistribution(users) {
        const roles = {};
        users.forEach(u => {
            roles[u.role] = (roles[u.role] || 0) + 1;
        });
        
        return Object.entries(roles).map(([role, count]) => {
            const percentage = (count / users.length * 100).toFixed(1);
            return `
                <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--radius-lg); text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary); margin-bottom: 0.5rem;">${count}</div>
                    <div style="text-transform: capitalize; font-weight: 600; margin-bottom: 0.5rem;">${role}</div>
                    <div style="font-size: var(--text-sm); color: var(--text-tertiary);">${percentage}%</div>
                    <div style="margin-top: 1rem; height: 6px; background: var(--gray-200); border-radius: var(--radius-full); overflow: hidden;">
                        <div style="width: ${percentage}%; height: 100%; background: var(--gradient-primary); border-radius: var(--radius-full);"></div>
                    </div>
                </div>
            `;
        }).join('');
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.admin = admin;
}
