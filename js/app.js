// Aplicación Principal AOMA Campus Virtual
class AOMACampus {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.init();
    }

    async init() {
        try {
            // Ocultar loading después de 500ms máximo
            setTimeout(() => this.hideLoading(), 500);

            // Inicializar datos si no existen
            this.initializeData();

            // Verificar sesión guardada
            const savedSession = localStorage.getItem(CONFIG.storageKeys.session);
            if (savedSession) {
                try {
                    this.currentUser = JSON.parse(savedSession);
                    const users = this.getUsers();
                    const user = users.find(u => u.id === this.currentUser.id);
                    if (user && user.active) {
                        await this.loginSuccess();
                        return;
                    } else {
                        localStorage.removeItem(CONFIG.storageKeys.session);
                    }
                } catch (e) {
                    localStorage.removeItem(CONFIG.storageKeys.session);
                }
            }

            // Mostrar pantalla de login
            document.getElementById('loginScreen')?.classList.remove('hidden');
            document.getElementById('app')?.classList.add('hidden');

            // Inicializar login
            if (typeof login !== 'undefined' && login.init) {
                login.init();
            }

        } catch (error) {
            console.error('Error en init:', error);
            this.hideLoading();
            document.getElementById('loginScreen')?.classList.remove('hidden');
        }

        // Inicializar módulos de forma segura
        this.initModules();
        this.setupEventListeners();
    }

    initModules() {
        const modules = [
            { name: 'theme', obj: typeof theme !== 'undefined' ? theme : null },
            { name: 'search', obj: typeof search !== 'undefined' ? search : null },
            { name: 'chat', obj: typeof chat !== 'undefined' ? chat : null },
            { name: 'videos', obj: typeof videos !== 'undefined' ? videos : null },
            { name: 'evaluaciones', obj: typeof evaluaciones !== 'undefined' ? evaluaciones : null },
            { name: 'certificados', obj: typeof certificados !== 'undefined' ? certificados : null },
            { name: 'usuarios', obj: typeof usuarios !== 'undefined' ? usuarios : null },
            { name: 'admin', obj: typeof admin !== 'undefined' ? admin : null },
        ];

        modules.forEach(mod => {
            if (mod.obj && typeof mod.obj.init === 'function') {
                try {
                    mod.obj.init();
                    console.log(`✅ Módulo ${mod.name} inicializado`);
                } catch (e) {
                    console.warn(`⚠️ Error al inicializar ${mod.name}:`, e.message);
                }
            } else {
                console.warn(`️ Módulo ${mod.name} no disponible`);
            }
        });
    }

    initializeData() {
        const defaults = {
            [CONFIG.storageKeys.users]: CONFIG.defaultUsers,
            [CONFIG.storageKeys.courses]: CONFIG.courses,
            [CONFIG.storageKeys.videos]: CONFIG.videos,
            [CONFIG.storageKeys.evaluations]: CONFIG.evaluations,
            [CONFIG.storageKeys.certificates]: [],
            [CONFIG.storageKeys.news]: CONFIG.news,
        };

        Object.entries(defaults).forEach(([key, value]) => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        });
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
            if (typeof theme !== 'undefined' && theme.toggle) theme.toggle();
        });

        // Chat toggle
        document.getElementById('chatToggle')?.addEventListener('click', () => {
            if (typeof chat !== 'undefined') chat.toggle();
        });

        document.getElementById('chatClose')?.addEventListener('click', () => {
            if (typeof chat !== 'undefined') chat.close();
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const navItem = link.closest('.nav-item');
                if (navItem && navItem.dataset.page) {
                    this.navigateTo(navItem.dataset.page);
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
            }
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
        const loading = document.getElementById('loadingScreen');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => loading.style.display = 'none', 500);
        }
    }

    async loginSuccess() {
        try {
            document.getElementById('loginScreen')?.classList.add('hidden');
            document.getElementById('app')?.classList.remove('hidden');

            this.updateUserInfo();
            await this.navigateTo('dashboard');
            this.showToast(`Bienvenido, ${this.currentUser.name.split(' ')[0]}`, 'success');
        } catch (error) {
            console.error('Error en loginSuccess:', error);
            this.showToast('Error al cargar el dashboard', 'error');
        }
    }

    updateUserInfo() {
        const userNameEl = document.getElementById('userName');
        const userRoleEl = document.getElementById('userRole');
        const avatarInitials = document.querySelector('.avatar-initials');

        if (userNameEl) userNameEl.textContent = this.currentUser.name;
        if (userRoleEl) {
            const roleText = this.currentUser.role === 'admin' ? 'Administrador' :
                this.currentUser.role === 'dirigente' ? 'Dirigente' : 'Delegado';
            userRoleEl.textContent = roleText;
        }
        if (avatarInitials) {
            avatarInitials.textContent = this.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        }

        if (this.currentUser.role === 'admin') {
            document.querySelector('.admin-only')?.classList.remove('hidden');
        }

        this.updateProgress();
    }

    updateProgress() {
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const userCerts = certificates.filter(c => c.userId === this.currentUser.id);
        const totalCourses = this.getCourses().length;
        const progress = totalCourses > 0 ? Math.round((userCerts.length / totalCourses) * 100) : 0;

        const progressEl = document.getElementById('sidebarProgress');
        const progressFillEl = document.getElementById('sidebarProgressFill');

        if (progressEl) progressEl.textContent = `${progress}%`;
        if (progressFillEl) progressFillEl.style.width = `${progress}%`;
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        this.sidebarCollapsed = !this.sidebarCollapsed;

        if (sidebar) sidebar.classList.toggle('collapsed', this.sidebarCollapsed);
        if (mainContent) mainContent.classList.toggle('expanded', this.sidebarCollapsed);
    }

    toggleUserDropdown() {
        document.getElementById('userDropdown')?.classList.toggle('active');
    }

    async navigateTo(page) {
        try {
            this.currentPage = page;

            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.page === page);
            });

            if (window.innerWidth < 1024) {
                document.getElementById('sidebar')?.classList.add('hidden');
            }

            const content = document.getElementById('pageContent');
            if (content) {
                content.innerHTML = '<div class="skeleton" style="height: 400px;"></div>';
            }

            await this.loadPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error al navegar:', error);
            this.showToast('Error al cargar la página', 'error');
        }
    }

    async loadPage(page) {
        const content = document.getElementById('pageContent');
        if (!content) return;

        try {
            switch (page) {
                case 'dashboard':
                    await this.renderDashboard(content);
                    break;
                case 'cursos':
                    await this.renderCursos(content);
                    break;
                case 'videos':
                    if (typeof videos !== 'undefined') await videos.render(content);
                    break;
                case 'evaluaciones':
                    if (typeof evaluaciones !== 'undefined') await evaluaciones.render(content);
                    break;
                case 'certificados':
                    if (typeof certificados !== 'undefined') await certificados.render(content);
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
                    if (typeof chat !== 'undefined') chat.open();
                    break;
                case 'admin-dashboard':
                case 'admin-usuarios':
                case 'admin-cursos':
                case 'admin-estadisticas':
                    if (this.currentUser.role === 'admin' && typeof admin !== 'undefined') {
                        await admin.render(page, content);
                    }
                    break;
                default:
                    if (page.startsWith('actividad-')) {
                        const activity = page.replace('actividad-', '');
                        await this.renderActividad(content, activity);
                    }
            }
        } catch (error) {
            console.error(`Error al cargar página ${page}:`, error);
            content.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error al cargar</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }

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
                            <div class="stat-icon primary"><i class="fas fa-graduation-cap"></i></div>
                            <div class="stat-trend up"><i class="fas fa-arrow-up"></i><span>12%</span></div>
                        </div>
                        <div class="stat-value">${courses.length}</div>
                        <div class="stat-label">Cursos Disponibles</div>
                    </div>

                    <div class="stat-card accent scroll-reveal">
                        <div class="stat-header">
                            <div class="stat-icon accent"><i class="fas fa-play-circle"></i></div>
                        </div>
                        <div class="stat-value">${videos.length}</div>
                        <div class="stat-label">Videos en Biblioteca</div>
                    </div>

                    <div class="stat-card success scroll-reveal">
                        <div class="stat-header">
                            <div class="stat-icon success"><i class="fas fa-certificate"></i></div>
                        </div>
                        <div class="stat-value">${userCerts.length}</div>
                        <div class="stat-label">Certificados Obtenidos</div>
                    </div>

                    <div class="stat-card warning scroll-reveal">
                        <div class="stat-header">
                            <div class="stat-icon warning"><i class="fas fa-clock"></i></div>
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
            </div>
        `;
    }

    renderCourseCard(course) {
        return `
            <div class="course-card hover-lift scroll-reveal">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Curso'">
                    <span class="course-badge">${course.category}</span>
                </div>
                <div class="course-content">
                    <div class="course-category">${CONFIG.activities[course.activity]?.name || 'General'}</div>
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-signal"></i> ${course.level}</span>
                    </div>
                    <div class="course-instructor">
                        <div class="instructor-avatar">${course.instructor.split(' ').map(n => n[0]).join('')}</div>
                        <span class="instructor-name">${course.instructor}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Datos
    getUsers() { return JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]'); }
    getCourses() { return JSON.parse(localStorage.getItem(CONFIG.storageKeys.courses) || '[]'); }
    getVideos() { return JSON.parse(localStorage.getItem(CONFIG.storageKeys.videos) || '[]'); }
    getNews() { return JSON.parse(localStorage.getItem(CONFIG.storageKeys.news) || '[]'); }

    // Utilidades UI
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

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
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    showProfile() { this.showToast('Perfil de usuario', 'info'); }
    showSettings() { this.showToast('Configuración', 'info'); }

    logout() {
        if (confirm('¿Está seguro que desea cerrar sesión?')) {
            localStorage.removeItem(CONFIG.storageKeys.session);
            location.reload();
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
        document.getElementById('modalOverlay')?.classList.remove('active');
    }

    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    }

    handleResize() {
        if (window.innerWidth < 1024) {
            document.getElementById('sidebar')?.classList.add('hidden');
        } else {
            document.getElementById('sidebar')?.classList.remove('hidden');
        }
    }

    async renderCursos(container) {
        const courses = this.getCourses();
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Capacitaciones 🎓</h1>
                <p>Cursos disponibles organizados por actividad minera</p>
            </div>
            <div class="cards-grid">
                ${courses.map(course => this.renderCourseCard(course)).join('')}
            </div>
        `;
    }

    async renderEscalas(container) {
        const salary = CONFIG.salaryScales;
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Escalas Salariales 💰</h1>
                <p>Tablas salariales vigentes - Actualizadas Julio 2026</p>
            </div>
            ${Object.entries(salary).map(([key, data]) => `
                <div class="section scroll-reveal">
                    <h2 class="section-title" style="margin-bottom: 1rem;">${CONFIG.activities[key]?.name || key}</h2>
                    <div class="table-container">
                        <table class="table">
                            <thead><tr><th>Categoría</th><th>Nivel</th><th>Haber Básico</th></tr></thead>
                            <tbody>
                                ${data.map(r => `<tr><td><b>${r.category}</b></td><td>${r.level}</td><td>${Utils.formatCurrency(r.salary)}</td></tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `).join('')}
        `;
    }

    async renderNoticias(container) {
        const news = this.getNews();
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Noticias Sindicales 📰</h1>
                <p>Últimas novedades del sector</p>
            </div>
            <div class="news-grid">
                ${news.map(n => `
                    <div class="news-item scroll-reveal">
                        <img src="${n.image}" alt="${n.title}" onerror="this.src='https://via.placeholder.com/400x200?text=Noticia'">
                        <div class="news-content">
                            <span class="news-category">${n.category}</span>
                            <h3>${n.title}</h3>
                            <p>${n.excerpt}</p>
                            <div class="news-meta">
                                <span><i class="far fa-user"></i> ${n.author}</span>
                                <span><i class="far fa-calendar"></i> ${Utils.formatDate(n.date)}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    async renderFAQ(container) {
        const faqs = CONFIG.faqs;
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Preguntas Frecuentes ❓</h1>
                <p>Resolvé tus dudas organizadas por temática</p>
            </div>
            ${Object.entries(faqs).map(([category, items]) => `
                <div class="section scroll-reveal">
                    <h2 class="section-title" style="margin-bottom: 1rem;">${CONFIG.activities[category]?.name || category}</h2>
                    <div class="faq-list">
                        ${items.map(faq => `
                            <div class="faq-item">
                                <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                                    <span>${faq.question}</span>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <div class="faq-answer">
                                    <div class="faq-answer-content">${faq.answer}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }

    async renderActividad(container, activity) {
        const act = CONFIG.activities[activity];
        if (!act) return;

        container.innerHTML = `
            <div class="activity-hero animate-fade-in">
                <img src="${act.image}" alt="${act.name}" onerror="this.style.display='none'">
                <div class="activity-hero-content">
                    <h1><i class="fas ${act.icon}"></i> ${act.name}</h1>
                    <p>${act.description}</p>
                </div>
            </div>
            <div class="info-card scroll-reveal">
                <h3>Información del Sector</h3>
                <p>Información detallada sobre la actividad ${act.name} en la Seccional San Juan.</p>
            </div>
        `;
    }
}

// Instancia global
const app = new AOMACampus();
