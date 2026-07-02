// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
// ============================================

class AOMACampus {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.init();
    }

    async init() {
        try {
            setTimeout(() => this.hideLoading(), 500);
            this.initializeData();

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

            document.getElementById('loginScreen')?.classList.remove('hidden');
            document.getElementById('app')?.classList.add('hidden');

            if (typeof login !== 'undefined' && login.init) login.init();
        } catch (error) {
            console.error('Error en init:', error);
            this.hideLoading();
            document.getElementById('loginScreen')?.classList.remove('hidden');
        }

        this.initModules();
        this.setupEventListeners();
    }

    initModules() {
        const modules = ['theme', 'search', 'chat', 'videos', 'evaluaciones', 'certificados', 'usuarios', 'admin'];
        modules.forEach(name => {
            const mod = window[name];
            if (mod && typeof mod.init === 'function') {
                try {
                    mod.init();
                    console.log(`✅ Módulo ${name} inicializado`);
                } catch (e) {
                    console.warn(`⚠️ Error en ${name}:`, e.message);
                }
            }
        });
    }

    initializeData() {
        const defaults = {
            [CONFIG.storageKeys.users]: CONFIG.defaultUsers,
            [CONFIG.storageKeys.certificates]: [],
        };
        Object.entries(defaults).forEach(([key, value]) => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        });
    }

    setupEventListeners() {
        // Sidebar toggle (hamburguesa)
        document.getElementById('sidebarToggle')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSidebar();
        });

        // Click fuera del sidebar en móvil
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.getElementById('sidebarToggle');
            
            if (window.innerWidth < 1024 && sidebar && !sidebar.classList.contains('hidden')) {
                if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                    sidebar.classList.add('hidden');
                }
            }

            if (!e.target.closest('.user-menu')) {
                document.getElementById('userDropdown')?.classList.remove('active');
            }
        });

        // User dropdown
        document.getElementById('userAvatar')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleUserDropdown();
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            if (typeof theme !== 'undefined' && theme.toggle) theme.toggle();
        });

        // Chat
        document.getElementById('chatToggle')?.addEventListener('click', () => {
            if (typeof chat !== 'undefined') chat.toggle();
        });
        document.getElementById('chatClose')?.addEventListener('click', () => {
            if (typeof chat !== 'undefined') chat.close();
        });

        // Navegación del sidebar
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const page = item.dataset.page;
                if (page) {
                    this.navigateTo(page);
                    if (window.innerWidth < 1024) {
                        setTimeout(() => {
                            document.getElementById('sidebar')?.classList.add('hidden');
                        }, 200);
                    }
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

        // Resize
        window.addEventListener('resize', Utils.debounce(() => this.handleResize(), 250));
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
            
            // Mostrar sidebar en desktop
            if (window.innerWidth >= 1024) {
                document.getElementById('sidebar')?.classList.remove('hidden');
            }

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
        const totalCourses = DATA.cursos.length;
        const progress = totalCourses > 0 ? Math.round((userCerts.length / totalCourses) * 100) : 0;

        const progressEl = document.getElementById('sidebarProgress');
        const progressFillEl = document.getElementById('sidebarProgressFill');
        if (progressEl) progressEl.textContent = `${progress}%`;
        if (progressFillEl) progressFillEl.style.width = `${progress}%`;
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (window.innerWidth < 1024) {
            // Móvil: mostrar/ocultar
            sidebar?.classList.toggle('hidden');
            sidebar?.classList.remove('collapsed');
        } else {
            // Desktop: colapsar/expandir
            this.sidebarCollapsed = !this.sidebarCollapsed;
            sidebar?.classList.toggle('collapsed', this.sidebarCollapsed);
            mainContent?.classList.toggle('expanded', this.sidebarCollapsed);
        }
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
                case 'dashboard': await this.renderDashboard(content); break;
                case 'cursos': await this.renderCursos(content); break;
                case 'videos': if (typeof videos !== 'undefined') await videos.render(content); break;
                case 'evaluaciones': if (typeof evaluaciones !== 'undefined') await evaluaciones.render(content); break;
                case 'certificados': if (typeof certificados !== 'undefined') await certificados.render(content); break;
                case 'escalas': await this.renderEscalas(content); break;
                case 'convenios': await this.renderConvenios(content); break;
                case 'legislacion': await this.renderLegislacion(content); break;
                case 'noticias': await this.renderNoticias(content); break;
                case 'faq': await this.renderFAQ(content); break;
                case 'chat': if (typeof chat !== 'undefined') chat.open(); break;
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
            console.error(`Error al cargar ${page}:`, error);
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

    // ============================================
    // DASHBOARD
    // ============================================
    async renderDashboard(container) {
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const userCerts = certificates.filter(c => c.userId === this.currentUser.id);
        const noticias = DATA.noticias.slice(0, 3);

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
                        <div class="stat-value">${DATA.cursos.length}</div>
                        <div class="stat-label">Cursos Disponibles</div>
                    </div>

                    <div class="stat-card accent scroll-reveal">
                        <div class="stat-header">
                            <div class="stat-icon accent"><i class="fas fa-play-circle"></i></div>
                        </div>
                        <div class="stat-value">${DATA.videos.length}</div>
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
                        ${DATA.cursos.slice(0, 3).map(c => this.renderCourseCard(c)).join('')}
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
                        ${noticias.map(n => this.renderNewsItem(n)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderCourseCard(course) {
        const actName = DATA.actividades[course.actividad]?.nombre || 'General';
        return `
            <div class="course-card hover-lift scroll-reveal" onclick="app.showCursoDetalle(${course.id})" style="cursor: pointer;">
                <div class="course-image">
                    <img src="${course.imagen}" alt="${course.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Curso'">
                    <span class="course-badge">${course.categoria}</span>
                </div>
                <div class="course-content">
                    <div class="course-category">${actName}</div>
                    <h3 class="course-title">${course.titulo}</h3>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duracion}</span>
                        <span><i class="fas fa-signal"></i> ${course.nivel}</span>
                    </div>
                    <div class="course-instructor">
                        <div class="instructor-avatar">${course.instructor.split(' ').map(n => n[0]).join('')}</div>
                        <span class="instructor-name">${course.instructor}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderNewsItem(news) {
        return `
            <div class="news-item scroll-reveal">
                <img src="${news.imagen}" alt="${news.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Noticia'">
                <div class="news-content">
                    <span class="news-category">${news.categoria}</span>
                    <h3>${news.titulo}</h3>
                    <p>${news.resumen}</p>
                    <div class="news-meta">
                        <span><i class="far fa-user"></i> ${news.autor}</span>
                        <span><i class="far fa-calendar"></i> ${Utils.formatDate(news.fecha)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================
    // DETALLE DE CURSO (al hacer click)
    // ============================================
    async showCursoDetalle(cursoId) {
        const curso = DATA.cursos.find(c => c.id === cursoId);
        if (!curso) {
            this.showToast('Curso no encontrado', 'error');
            return;
        }

        const container = document.getElementById('pageContent');
        const actName = DATA.actividades[curso.actividad]?.nombre || 'General';

        container.innerHTML = `
            <div class="animate-fade-in">
                <button class="btn btn-ghost mb-3" onclick="app.navigateTo('cursos')">
                    <i class="fas fa-arrow-left"></i> Volver a cursos
                </button>
                
                <div class="activity-hero" style="height: 250px;">
                    <img src="${curso.imagen}" alt="${curso.titulo}" onerror="this.style.display='none'">
                    <div class="activity-hero-content">
                        <span class="badge" style="background: var(--accent); color: var(--primary-dark); margin-bottom: 0.5rem; display: inline-block; width: fit-content;">${curso.categoria}</span>
                        <h1>${curso.titulo}</h1>
                        <p>${curso.descripcion}</p>
                    </div>
                </div>

                <div class="stats-grid" style="margin: 2rem 0;">
                    <div class="stat-card">
                        <div class="stat-icon primary"><i class="fas fa-user"></i></div>
                        <div class="stat-label">Instructor</div>
                        <div style="font-weight: 600; margin-top: 0.5rem;">${curso.instructor}</div>
                    </div>
                    <div class="stat-card accent">
                        <div class="stat-icon accent"><i class="fas fa-clock"></i></div>
                        <div class="stat-label">Duración</div>
                        <div style="font-weight: 600; margin-top: 0.5rem;">${curso.duracion}</div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon success"><i class="fas fa-signal"></i></div>
                        <div class="stat-label">Nivel</div>
                        <div style="font-weight: 600; margin-top: 0.5rem;">${curso.nivel}</div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon warning"><i class="fas fa-book"></i></div>
                        <div class="stat-label">Módulos</div>
                        <div style="font-weight: 600; margin-top: 0.5rem;">${curso.modulos}</div>
                    </div>
                </div>

                <div class="section">
                    <h2 class="section-title" style="margin-bottom: 1rem;">Contenido del curso</h2>
                    <div style="line-height: 1.8; color: var(--text-secondary);">
                        ${curso.contenido}
                    </div>
                </div>

                <div class="section">
                    <h2 class="section-title" style="margin-bottom: 1rem;">Actividad</h2>
                    <p><strong>${actName}</strong></p>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
                    <button class="btn btn-primary btn-lg" onclick="app.inscribirse(${curso.id})">
                        <i class="fas fa-user-plus"></i> Inscribirme al curso
                    </button>
                    <button class="btn btn-secondary btn-lg" onclick="app.showToast('Material descargable en desarrollo', 'info')">
                        <i class="fas fa-download"></i> Descargar material
                    </button>
                </div>
            </div>
        `;
    }

    inscribirse(cursoId) {
        const curso = DATA.cursos.find(c => c.id === cursoId);
        if (curso) {
            this.showToast(`✅ Inscripción enviada al curso: ${curso.titulo}`, 'success');
        }
    }

    // ============================================
    // CURSOS (listado)
    // ============================================
    async renderCursos(container) {
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Capacitaciones 🎓</h1>
                <p>Cursos disponibles organizados por actividad minera</p>
            </div>
            <div class="cards-grid">
                ${DATA.cursos.map(c => this.renderCourseCard(c)).join('')}
            </div>
        `;
    }

    // ============================================
    // ESCALAS SALARIALES
    // ============================================
    async renderEscalas(container) {
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Escalas Salariales 💰</h1>
                <p>Tablas salariales vigentes - Actualizadas Julio 2026</p>
            </div>
            ${Object.entries(DATA.escalas).map(([key, data]) => {
                const act = DATA.actividades[key];
                return `
                    <div class="section scroll-reveal">
                        <h2 class="section-title" style="margin-bottom: 1rem;">
                            <i class="fas ${act?.icono || 'fa-money-bill-wave'}"></i> 
                            ${act?.nombre || key}
                        </h2>
                        <div class="table-container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Categoría</th>
                                        <th>Nivel</th>
                                        <th>Haber Básico</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data.map(r => `
                                        <tr>
                                            <td><b>${r.categoria}</b></td>
                                            <td>${r.nivel}</td>
                                            <td>${Utils.formatCurrency(r.salario)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
    }

    // ============================================
    // CONVENIOS COLECTIVOS
    // ============================================
    async renderConvenios(container) {
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Convenios Colectivos 📋</h1>
                <p>Convenios colectivos de trabajo del sector minero</p>
            </div>
            <div class="cards-grid">
                ${DATA.convenios.map(c => `
                    <div class="course-card hover-lift scroll-reveal" onclick="app.showConvenioDetalle(${c.id})" style="cursor: pointer;">
                        <div class="course-image" style="height: 120px; background: var(--gradient-primary);">
                            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                                <i class="fas fa-file-contract"></i>
                            </div>
                        </div>
                        <div class="course-content">
                            <div class="course-category">${c.categoria}</div>
                            <h3 class="course-title">${c.titulo}</h3>
                            <div class="course-meta">
                                <span><i class="far fa-calendar"></i> Actualizado: ${Utils.formatDate(c.actualizado)}</span>
                            </div>
                            <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: 0.5rem;">${c.resumen}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    async showConvenioDetalle(id) {
        const conv = DATA.convenios.find(c => c.id === id);
        if (!conv) return;

        const container = document.getElementById('pageContent');
        container.innerHTML = `
            <div class="animate-fade-in">
                <button class="btn btn-ghost mb-3" onclick="app.navigateTo('convenios')">
                    <i class="fas fa-arrow-left"></i> Volver a convenios
                </button>
                <div class="section">
                    <h2 class="section-title" style="margin-bottom: 1rem;">${conv.titulo}</h2>
                    <div class="course-meta" style="margin-bottom: 1.5rem;">
                        <span><i class="fas fa-tag"></i> ${conv.categoria}</span>
                        <span><i class="far fa-calendar"></i> Actualizado: ${Utils.formatDate(conv.actualizado)}</span>
                    </div>
                    <div style="line-height: 1.8; color: var(--text-secondary);">
                        ${conv.contenido}
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================
    // LEGISLACIÓN LABORAL
    // ============================================
    async renderLegislacion(container) {
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Legislación Laboral ⚖️</h1>
                <p>Leyes y normativas laborales aplicables al sector minero</p>
            </div>
            <div class="cards-grid">
                ${DATA.leyes.map(l => `
                    <div class="course-card hover-lift scroll-reveal" onclick="app.showLeyDetalle(${l.id})" style="cursor: pointer;">
                        <div class="course-image" style="height: 120px; background: linear-gradient(135deg, #0b3d91, #1e5fd1);">
                            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                                <i class="fas fa-balance-scale"></i>
                            </div>
                        </div>
                        <div class="course-content">
                            <div class="course-category">${l.categoria}</div>
                            <h3 class="course-title">${l.numero}</h3>
                            <p style="font-weight: 600; margin-bottom: 0.5rem;">${l.titulo}</p>
                            <p style="font-size: var(--text-sm); color: var(--text-secondary);">${l.resumen}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    async showLeyDetalle(id) {
        const ley = DATA.leyes.find(l => l.id === id);
        if (!ley) return;

        const container = document.getElementById('pageContent');
        container.innerHTML = `
            <div class="animate-fade-in">
                <button class="btn btn-ghost mb-3" onclick="app.navigateTo('legislacion')">
                    <i class="fas fa-arrow-left"></i> Volver a legislación
                </button>
                <div class="section">
                    <h2 class="section-title" style="margin-bottom: 0.5rem;">${ley.numero}</h2>
                    <h3 style="color: var(--text-secondary); margin-bottom: 1rem; font-weight: 500;">${ley.titulo}</h3>
                    <div class="course-meta" style="margin-bottom: 1.5rem;">
                        <span><i class="fas fa-tag"></i> ${ley.categoria}</span>
                    </div>
                    <div style="line-height: 1.8; color: var(--text-secondary);">
                        ${ley.contenido}
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================
    // NOTICIAS
    // ============================================
    async renderNoticias(container) {
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Noticias Sindicales 📰</h1>
                <p>Últimas novedades del sector</p>
            </div>
            <div class="news-grid">
                ${DATA.noticias.map(n => this.renderNewsItem(n)).join('')}
            </div>
        `;
    }

    // ============================================
    // FAQ
    // ============================================
    async renderFAQ(container) {
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Preguntas Frecuentes ❓</h1>
                <p>Resolvé tus dudas organizadas por temática</p>
            </div>
            ${Object.entries(DATA.faqs).map(([category, items]) => {
                const catName = DATA.actividades[category]?.nombre || 'General';
                return `
                    <div class="section scroll-reveal">
                        <h2 class="section-title" style="margin-bottom: 1rem;">${catName}</h2>
                        <div class="faq-list">
                            ${items.map(faq => `
                                <div class="faq-item">
                                    <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                                        <span>${faq.pregunta}</span>
                                        <i class="fas fa-chevron-down"></i>
                                    </div>
                                    <div class="faq-answer">
                                        <div class="faq-answer-content">${faq.respuesta}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        `;
    }

    // ============================================
    // ACTIVIDAD (portada)
    // ============================================
    async renderActividad(container, activityId) {
        const act = DATA.actividades[activityId];
        if (!act) {
            container.innerHTML = '<div class="empty-state"><h3>Actividad no encontrada</h3></div>';
            return;
        }

        const cursosActividad = DATA.cursos.filter(c => c.actividad === activityId);
        const videosActividad = DATA.videos.filter(v => v.categoria === activityId);
        const faqsActividad = DATA.faqs[activityId] || [];

        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="activity-hero">
                    <img src="${act.imagen}" alt="${act.nombre}" onerror="this.style.display='none'">
                    <div class="activity-hero-content">
                        <h1><i class="fas ${act.icono}"></i> ${act.nombre}</h1>
                        <p>${act.descripcion}</p>
                    </div>
                </div>

                ${cursosActividad.length > 0 ? `
                    <div class="section scroll-reveal">
                        <div class="section-header">
                            <h2 class="section-title">Cursos de ${act.nombre}</h2>
                        </div>
                        <div class="cards-grid">
                            ${cursosActividad.map(c => this.renderCourseCard(c)).join('')}
                        </div>
                    </div>
                ` : ''}

                ${videosActividad.length > 0 ? `
                    <div class="section scroll-reveal">
                        <div class="section-header">
                            <h2 class="section-title">Videos relacionados</h2>
                        </div>
                        <div class="video-grid">
                            ${videosActividad.map(v => `
                                <div class="video-card hover-lift" onclick="videos.openModal(${v.id})" style="cursor: pointer;">
                                    <div class="video-thumbnail">
                                        <img src="${v.thumbnail}" alt="${v.titulo}" onerror="this.src='https://via.placeholder.com/400x200?text=Video'">
                                        <div class="video-play-btn"><i class="fas fa-play"></i></div>
                                        <span class="video-duration">${v.duracion}</span>
                                    </div>
                                    <div class="video-info">
                                        <h3 class="video-title">${v.titulo}</h3>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${faqsActividad.length > 0 ? `
                    <div class="section scroll-reveal">
                        <div class="section-header">
                            <h2 class="section-title">Preguntas frecuentes</h2>
                        </div>
                        <div class="faq-list">
                            ${faqsActividad.map(faq => `
                                <div class="faq-item">
                                    <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                                        <span>${faq.pregunta}</span>
                                        <i class="fas fa-chevron-down"></i>
                                    </div>
                                    <div class="faq-answer">
                                        <div class="faq-answer-content">${faq.respuesta}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // ============================================
    // DATOS
    // ============================================
    getUsers() { return JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]'); }
    getCourses() { return DATA.cursos; }
    getVideos() { return DATA.videos; }
    getNews() { return DATA.noticias; }

    // ============================================
    // UTILIDADES UI
    // ============================================
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
    showForgotPassword() { 
        this.showToast('Contactá al administrador al email campus@aomasanjuan.org.ar', 'info'); 
    }

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
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth < 1024) {
            sidebar?.classList.add('hidden');
        } else {
            sidebar?.classList.remove('hidden');
        }
    }
}

// Instancia global
const app = new AOMACampus();
