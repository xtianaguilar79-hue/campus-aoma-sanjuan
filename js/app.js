// Aplicación Principal AOMA Campus Virtual
class AOMACampus {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.init();
    }

    async init() {
        // Mostrar loading
        this.showLoading();
        
        // Inicializar datos si no existen
        this.initializeData();
        
        // Verificar sesión
        const savedSession = localStorage.getItem(CONFIG.storageKeys.session);
        if (savedSession) {
            this.currentUser = JSON.parse(savedSession);
            // Verificar si el usuario sigue activo
            const users = this.getUsers();
            const user = users.find(u => u.id === this.currentUser.id);
            if (user && user.active) {
                await this.loginSuccess();
            } else {
                localStorage.removeItem(CONFIG.storageKeys.session);
            }
        }
        
        // Ocultar loading
        setTimeout(() => {
            this.hideLoading();
        }, 1000);
        
        // Event listeners
        this.setupEventListeners();
        
        // Inicializar componentes
        theme.init();
        search.init();
        chat.init();
        videos.init();
        evaluaciones.init();
        certificados.init();
        admin.init();
        
        // Scroll reveal
        this.initScrollReveal();
    }

    initializeData() {
        // Inicializar usuarios
        if (!localStorage.getItem(CONFIG.storageKeys.users)) {
            localStorage.setItem(CONFIG.storageKeys.users, JSON.stringify(CONFIG.defaultUsers));
        }
        
        // Inicializar cursos
        if (!localStorage.getItem(CONFIG.storageKeys.courses)) {
            localStorage.setItem(CONFIG.storageKeys.courses, JSON.stringify(CONFIG.courses));
        }
        
        // Inicializar videos
        if (!localStorage.getItem(CONFIG.storageKeys.videos)) {
            localStorage.setItem(CONFIG.storageKeys.videos, JSON.stringify(CONFIG.videos));
        }
        
        // Inicializar evaluaciones
        if (!localStorage.getItem(CONFIG.storageKeys.evaluations)) {
            localStorage.setItem(CONFIG.storageKeys.evaluations, JSON.stringify(CONFIG.evaluations));
        }
        
        // Inicializar certificados
        if (!localStorage.getItem(CONFIG.storageKeys.certificates)) {
            localStorage.setItem(CONFIG.storageKeys.certificates, JSON.stringify([]));
        }
        
        // Inicializar noticias
        if (!localStorage.getItem(CONFIG.storageKeys.news)) {
            localStorage.setItem(CONFIG.storageKeys.news, JSON.stringify(CONFIG.news));
        }
    }

    setupEventListeners() {
        // Sidebar toggle
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            this.toggleSidebar();
        });
        
        // User dropdown
        document.getElementById('userAvatar')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleUserDropdown();
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                document.getElementById('userDropdown')?.classList.remove('active');
            }
        });
        
        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            theme.toggle();
        });
        
        // Chat toggle
        document.getElementById('chatToggle')?.addEventListener('click', () => {
            chat.toggle();
        });
        
        document.getElementById('chatClose')?.addEventListener('click', () => {
            chat.close();
        });
        
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.closest('.nav-item').dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+K para búsqueda
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
            }
            // Escape para cerrar modales
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
        
        // Window resize
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
    }

    showLoading() {
        document.getElementById('loadingScreen')?.classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingScreen')?.classList.add('hidden');
    }

    async loginSuccess() {
        // Ocultar login, mostrar app
        document.getElementById('loginScreen')?.classList.add('hidden');
        document.getElementById('app')?.classList.remove('hidden');
        
        // Actualizar UI de usuario
        this.updateUserInfo();
        
        // Cargar dashboard
        await this.navigateTo('dashboard');
        
        // Mostrar bienvenida
        this.showToast(`Bienvenido, ${this.currentUser.name}`, 'success');
    }

    updateUserInfo() {
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('userRole').textContent = this.currentUser.role === 'admin' ? 'Administrador' : 
                                                            this.currentUser.role === 'dirigente' ? 'Dirigente' : 'Delegado';
        
        // Avatar
        const avatarInitials = this.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        document.querySelector('.avatar-initials').textContent = avatarInitials;
        
        // Mostrar/ocultar menú admin
        if (this.currentUser.role === 'admin') {
            document.querySelector('.admin-only')?.classList.remove('hidden');
        }
        
        // Actualizar progreso
        this.updateProgress();
    }

    updateProgress() {
        // Calcular progreso general
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const userCerts = certificates.filter(c => c.userId === this.currentUser.id);
        const totalCourses = this.getCourses().length;
        const progress = totalCourses > 0 ? Math.round((userCerts.length / totalCourses) * 100) : 0;
        
        document.getElementById('sidebarProgress').textContent = `${progress}%`;
        document.getElementById('sidebarProgressFill').style.width = `${progress}%`;
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        this.sidebarCollapsed = !this.sidebarCollapsed;
        
        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        }
    }

    toggleUserDropdown() {
        document.getElementById('userDropdown')?.classList.toggle('active');
    }

    async navigateTo(page) {
        this.currentPage = page;
        
        // Actualizar navegación activa
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });
        
        // Cerrar sidebar en móvil
        if (window.innerWidth < 1024) {
            document.getElementById('sidebar')?.classList.add('hidden');
        }
        
        // Mostrar loading
        const content = document.getElementById('pageContent');
        content.innerHTML = '<div class="skeleton" style="height: 400px;"></div>';
        
        // Cargar página
        await this.loadPage(page);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async loadPage(page) {
        const content = document.getElementById('pageContent');
        
        switch(page) {
            case 'dashboard':
                await this.renderDashboard(content);
                break;
            case 'cursos':
                await this.renderCursos(content);
                break;
            case 'videos':
                await this.renderVideos(content);
                break;
            case 'evaluaciones':
                await this.renderEvaluaciones(content);
                break;
            case 'certificados':
                await this.renderCertificados(content);
                break;
            case 'escalas':
                await this.renderEscalas(content);
                break;
            case 'noticias':
                await this.renderNoticias(content);
                break;
            case 'faq':
                await this.renderFAQ(content);
                break;
            case 'chat':
                chat.open();
                break;
            case 'admin-dashboard':
            case 'admin-usuarios':
            case 'admin-cursos':
            case 'admin-estadisticas':
                if (this.currentUser.role === 'admin') {
                    await admin.render(page, content);
                }
                break;
            default:
                // Actividades
                if (page.startsWith('actividad-')) {
                    const activity = page.replace('actividad-', '');
                    await this.renderActividad(content, activity);
                }
        }
        
        // Inicializar scroll reveal
        this.initScrollReveal();
    }

    async renderDashboard(container) {
        const courses = this.getCourses();
        const videos = this.getVideos();
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const userCerts = certificates.filter(c => c.userId === this.currentUser.id);
        const news = this.getNews().slice(0, 3);
        
        container.innerHTML = `
            <div class="dashboard animate-fade-in">
                <div class="dashboard-header">
                    <h1 class="dashboard-title">¡Bienvenido, ${this.currentUser.name.split(' ')[0]}! 👋</h1>
                    <p class="dashboard-subtitle">Aquí está tu resumen de actividad</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card primary scroll-reveal">
                        <div class="stat-header">
                            <div class="stat-icon primary">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="stat-trend up">
                                <i class="fas fa-arrow-up"></i>
                                <span>12%</span>
                            </div>
                        </div>
                        <div class="stat-value">${courses.length}</div>
                        <div class="stat-label">Cursos Disponibles</div>
                    </div>
                    
                    <div class="stat-card accent scroll-reveal">
                        <div class="stat-header">
                            <div class="stat-icon accent">
                                <i class="fas fa-play-circle"></i>
                            </div>
                        </div>
                        <div class="stat-value">${videos.length}</div>
                        <div class="stat-label">Videos en Biblioteca</div>
                    </div>
                    
                    <div class="stat-card success scroll-reveal">
                        <div class="stat-header">
                            <div class="stat-icon success">
                                <i class="fas fa-certificate"></i>
                            </div>
                        </div>
                        <div class="stat-value">${userCerts.length}</div>
                        <div class="stat-label">Certificados Obtenidos</div>
                    </div>
                    
                    <div class="stat-card warning scroll-reveal">
                        <div class="stat-header">
                            <div class="stat-icon warning">
                                <i class="fas fa-clock"></i>
                            </div>
                        </div>
                        <div class="stat-value">24h</div>
                        <div class="stat-label">Horas de Capacitación</div>
                    </div>
                </div>
                
                <div class="section scroll-reveal">
                    <div class="section-header">
                        <h2 class="section-title">Cursos Destacados</h2>
                        <a href="#" class="section-link" onclick="app.navigateTo('cursos'); return false;">
                            Ver todos <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="cards-grid">
                        ${courses.slice(0, 3).map(course => this.renderCourseCard(course)).join('')}
                    </div>
                </div>
                
                <div class="section scroll-reveal">
                    <div class="section-header">
                        <h2 class="section-title">Últimas Noticias</h2>
                        <a href="#" class="section-link" onclick="app.navigateTo('noticias'); return false;">
                            Ver todas <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="news-grid">
                        ${news.map(item => this.renderNewsItem(item)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderCourseCard(course) {
        return `
            <div class="course-card hover-lift scroll-reveal" onclick="app.showCourseDetail(${course.id})">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}" loading="lazy">
                    <span class="course-badge">${course.category}</span>
                    <button class="course-favorite" onclick="event.stopPropagation(); app.toggleFavorite(${course.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="course-content">
                    <div class="course-category">${CONFIG.activities[course.activity]?.name || 'General'}</div>
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-signal"></i> ${course.level}</span>
                        <span><i class="fas fa-star" style="color: var(--accent)"></i> ${course.rating}</span>
                    </div>
                    <div class="course-instructor">
                        <div class="instructor-avatar">${course.instructor.split(' ').map(n => n[0]).join('')}</div>
                        <span class="instructor-name">${course.instructor}</span>
                    </div>
                    <div class="course-footer">
                        <div class="course-progress">
                            <div class="progress-text">
                                <span>Progreso</span>
                                <span>0%</span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-track-fill" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderNewsItem(news) {
        return `
            <div class="news-item scroll-reveal">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <div class="news-content">
                    <span class="news-category">${news.category}</span>
                    <h3>${news.title}</h3>
                    <p>${news.excerpt}</p>
                    <div class="news-meta">
                        <span><i class="far fa-user"></i> ${news.author}</span>
                        <span><i class="far fa-calendar"></i> ${Utils.formatDate(news.date)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Métodos de datos
    getUsers() {
        return JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
    }

    getCourses() {
        return JSON.parse(localStorage.getItem(CONFIG.storageKeys.courses) || '[]');
    }

    getVideos() {
        return JSON.parse(localStorage.getItem(CONFIG.storageKeys.videos) || '[]');
    }

    getNews() {
        return JSON.parse(localStorage.getItem(CONFIG.storageKeys.news) || '[]');
    }

    // Utilidades UI
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="fas ${icons[type]} toast-icon"></i>
            <div class="toast-content">
                <div class="toast-title">${type === 'success' ? 'Éxito' : type === 'error' ? 'Error' : 'Información'}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.closest('.toast').remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeInDown 0.3s reverse';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    showCourseDetail(courseId) {
        // Implementar modal de detalle de curso
        this.showToast(`Detalle del curso ${courseId}`, 'info');
    }

    toggleFavorite(courseId) {
        this.showToast('Agregado a favoritos', 'success');
    }

    showProfile() {
        this.showToast('Perfil de usuario', 'info');
    }

    showSettings() {
        this.showToast('Configuración', 'info');
    }

    showForgotPassword() {
        this.showToast('Contacte al administrador para recuperar su contraseña', 'info');
    }

    logout() {
        if (confirm('¿Está seguro que desea cerrar sesión?')) {
            localStorage.removeItem(CONFIG.storageKeys.session);
            location.reload();
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.getElementById('modalOverlay')?.classList.remove('active');
    }

    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    handleResize() {
        if (window.innerWidth < 1024) {
            document.getElementById('sidebar')?.classList.add('hidden');
        } else {
            document.getElementById('sidebar')?.classList.remove('hidden');
        }
    }

    // Renderizar otras páginas (implementaciones similares)
    async renderCursos(container) { /* ... */ }
    async renderVideos(container) { /* ... */ }
    async renderEvaluaciones(container) { /* ... */ }
    async renderCertificados(container) { /* ... */ }
    async renderEscalas(container) { /* ... */ }
    async renderNoticias(container) { /* ... */ }
    async renderFAQ(container) { /* ... */ }
    async renderActividad(container, activity) { /* ... */ }
}

// Instancia global
const app = new AOMACampus();