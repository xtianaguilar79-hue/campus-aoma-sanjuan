// Panel de Administración
const admin = {
    async render(page, container) {
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
        }
    },
    
    async renderDashboard(container) {
        const users = app.getUsers();
        const courses = app.getCourses();
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        
        container.innerHTML = `
            <div class="admin-dashboard animate-fade-in">
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
                    <div class="stat-card">
                        <div class="stat-icon accent"><i class="fas fa-graduation-cap"></i></div>
                        <div class="stat-value">${courses.length}</div>
                        <div class="stat-label">Cursos Activos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon success"><i class="fas fa-certificate"></i></div>
                        <div class="stat-value">${certificates.length}</div>
                        <div class="stat-label">Certificados Emitidos</div>
                    </div>
                </div>
                
                <div class="section">
                    <h2>Accesos Rápidos</h2>
                    <div class="admin-actions">
                        <button class="btn btn-primary" onclick="admin.render('admin-usuarios', document.getElementById('pageContent'))">
                            <i class="fas fa-users"></i> Gestionar Usuarios
                        </button>
                        <button class="btn btn-primary" onclick="admin.render('admin-cursos', document.getElementById('pageContent'))">
                            <i class="fas fa-book"></i> Gestionar Cursos
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    async renderUsuarios(container) {
        const users = app.getUsers();
        
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header">
                    <h1>Gestión de Usuarios</h1>
                    <button class="btn btn-primary" onclick="admin.showUserModal()">
                        <i class="fas fa-plus"></i> Nuevo Usuario
                    </button>
                </div>
                
                <div class="table-container scroll-reveal">
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
                                    <td>${user.username}</td>
                                    <td>${user.name}</td>
                                    <td>${user.email}</td>
                                    <td><span class="badge ${user.role}">${user.role}</span></td>
                                    <td>
                                        <span class="status-badge ${user.active ? 'active' : 'inactive'}">
                                            ${user.active ? 'Activo' : 'Bloqueado'}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn-icon" onclick="admin.toggleUserStatus(${user.id})" title="${user.active ? 'Bloquear' : 'Activar'}">
                                            <i class="fas ${user.active ? 'fa-ban' : 'fa-check'}"></i>
                                        </button>
                                        <button class="btn-icon" onclick="admin.editUser(${user.id})" title="Editar">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    toggleUserStatus(userId) {
        const users = app.getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.active = !user.active;
            localStorage.setItem(CONFIG.storageKeys.users, JSON.stringify(users));
            this.render('admin-usuarios', document.getElementById('pageContent'));
            app.showToast(`Usuario ${user.active ? 'activado' : 'bloqueado'}`, 'success');
        }
    },
    
    showUserModal() {
        // Implementar modal de nuevo usuario
        app.showToast('Función en desarrollo', 'info');
    },
    
    editUser(userId) {
        app.showToast('Edición de usuario', 'info');
    },
    
    async renderCursos(container) {
        const courses = app.getCourses();
        
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header">
                    <h1>Gestión de Cursos</h1>
                    <button class="btn btn-primary" onclick="admin.showCourseModal()">
                        <i class="fas fa-plus"></i> Nuevo Curso
                    </button>
                </div>
                
                <div class="cards-grid">
                    ${courses.map(course => `
                        <div class="course-card-admin scroll-reveal">
                            <img src="${course.image}" alt="${course.title}">
                            <div class="course-info">
                                <h3>${course.title}</h3>
                                <p>${course.category} • ${course.duration}</p>
                                <div class="course-actions">
                                    <button class="btn btn-secondary btn-sm">Editar</button>
                                    <button class="btn btn-danger btn-sm">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    showCourseModal() {
        app.showToast('Creación de curso', 'info');
    },
    
    async renderEstadisticas(container) {
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="page-header">
                    <h1>Estadísticas del Campus</h1>
                </div>
                
                <div class="section">
                    <h2>Actividad Reciente</h2>
                    <canvas id="activityChart" width="800" height="400"></canvas>
                </div>
            </div>
        `;
        
        // Renderizar gráfico simple con Canvas
        setTimeout(() => this.renderChart(), 100);
    },
    
    renderChart() {
        const canvas = document.getElementById('activityChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = [12, 19, 15, 25, 22, 30, 28];
        const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        
        // Limpiar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar líneas y puntos
        ctx.strokeStyle = '#0b3d91';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const padding = 60;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        const maxValue = Math.max(...data);
        
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = canvas.height - padding - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Punto
            ctx.fillStyle = '#f5b301';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        labels.forEach((label, index) => {
            const x = padding + (index / (labels.length - 1)) * chartWidth;
            ctx.fillText(label, x, canvas.height - 20);
        });
    }
};