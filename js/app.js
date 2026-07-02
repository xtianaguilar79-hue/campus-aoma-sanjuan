/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Core 01: Enrutador SPA, Control del Shell de Navegación y Render de Vistas Dinámicas
 */

// Objeto de Estado Global de la Aplicación
window.AppInstance = {
    currentRoute: '#dashboard',
    
    // Inicializador del Shell
    init() {
        this.bindShellEvents();
        this.checkInitialRoute();
        this.updateUserSessionUI();
        this.renderGlobalToasts();
    },

    // Vinculación de Eventos de Interfaz (Header, Sidebar, Modals)
    bindShellEvents() {
        // Toggle Sidebar Escritorio
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const layoutContainer = document.getElementById('main-platform-layout');
        if (sidebarToggle && layoutContainer) {
            sidebarToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                // En escritorio colapsa, en móvil actúa como hamburguesa
                if (window.innerWidth <= 768) {
                    layoutContainer.classList.toggle('mobile-sidebar-active');
                } else {
                    layoutContainer.classList.toggle('sidebar-collapsed');
                }
            });
        }

        // Cerrar menús móviles al hacer clic fuera del Sidebar
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && layoutContainer?.classList.contains('mobile-sidebar-active')) {
                const sidebar = document.getElementById('app-sidebar');
                if (sidebar && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    layoutContainer.classList.remove('mobile-sidebar-active');
                }
            }
        });

        // Trigger Menú Perfil
        const profileTrigger = document.getElementById('profile-menu-trigger');
        const profileDropdown = document.getElementById('profile-dropdown-menu');
        if (profileTrigger && profileDropdown) {
            profileTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('hidden');
            });
            document.addEventListener('click', () => profileDropdown.classList.add('hidden'));
        }

        // Centro de Notificaciones
        const notificationBtn = document.getElementById('notification-btn');
        const notificationPanel = document.getElementById('notification-panel');
        if (notificationBtn && notificationPanel) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationPanel.classList.toggle('hidden');
            });
            document.addEventListener('click', () => notificationPanel.classList.add('hidden'));
        }

        // Intercepción del Enrutador por Clics (Enlaces .nav-trigger)
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.nav-trigger');
            if (trigger) {
                e.preventDefault();
                const route = trigger.getAttribute('href');
                if (route) this.navigateTo(route);
            }
        });

        // Soporte del botón "Atrás/Adelante" del Navegador
        window.addEventListener('popstate', () => {
            this.checkInitialRoute();
        });
    },

    // Verificación de Ruta en Carga Inicial u Homologación
    checkInitialRoute() {
        // Si no hay sesión activa, el AuthGuard (login.js) forzará la vista
        if (!localStorage.getItem('aoma_session')) return;
        
        const hash = window.location.hash || '#dashboard';
        this.navigateTo(hash, false);
    },

    // Enrutador Central de Vistas Dinámicas
    navigateTo(route, updateHistory = true) {
        this.currentRoute = route;
        if (updateHistory) {
            window.history.pushState(null, '', route);
        }

        // Actualizar Estado Activo en el Sidebar Visualmente
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === route) {
                link.classList.add('active');
            }
        });

        // Ocultar menú móvil tras navegar
        document.getElementById('main-platform-layout')?.classList.remove('mobile-sidebar-active');

        // Disparar Renderizador de la Vista Específica
        this.renderView(route);
    },

    // Sincronización de Datos del Usuario en el Encabezado
    updateUserSessionUI() {
        const session = JSON.parse(localStorage.getItem('aoma_session'));
        if (!session) return;

        const nameDisplay = document.getElementById('user-name-display');
        const roleDisplay = document.getElementById('user-role-display');
        const badgeDisplay = document.getElementById('sidebar-role-badge');
        const avatarDisplay = document.getElementById('user-avatar-display');

        if (nameDisplay) nameDisplay.textContent = `${session.nombre} ${session.apellido}`;
        if (roleDisplay) roleDisplay.textContent = session.puesto || 'Afiliado Gremial';
        if (badgeDisplay) badgeDisplay.textContent = session.rol.toUpperCase();
        if (avatarDisplay && session.avatar) avatarDisplay.src = session.avatar;

        // Mostrar elementos de administración si corresponde
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            if (session.rol === 'admin') {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
    },

    // Orquestador Core de Vistas (SPA Injection Engine)
    renderView(route) {
        const container = document.getElementById('app-content-target');
        if (!container) return;

        // Animación de salida e inyección limpia
        container.innerHTML = `<div class="skeleton-view-holder" style="padding: 20px 0;">
            <div class="skeleton" style="width: 40%; height: 35px; margin-bottom: 24px;"></div>
            <div class="skeleton" style="width: 100%; height: 160px; margin-bottom: 20px;"></div>
            <div class="skeleton" style="width: 100%; height: 300px;"></div>
        </div>`;

        setTimeout(() => {
            switch(route) {
                case '#dashboard':
                    this.viewDashboard(container);
                    break;
                case '#capacitaciones':
                    window.ModuleCapacitaciones ? window.ModuleCapacitaciones.init(container) : this.viewFallback(container, 'Capacitaciones');
                    break;
                case '#videos':
                    window.ModuleVideos ? window.ModuleVideos.init(container) : this.viewFallback(container, 'Videoteca Gremial');
                    break;
                case '#evaluaciones':
                    window.ModuleEvaluaciones ? window.ModuleEvaluaciones.init(container) : this.viewFallback(container, 'Evaluaciones');
                    break;
                case '#certificados':
                    window.ModuleCertificados ? window.ModuleCertificados.init(container) : this.viewFallback(container, 'Certificados');
                    break;
                case '#escalas':
                    window.ModuleAdmin && window.ModuleAdmin.renderEscalas ? window.ModuleAdmin.renderEscalas(container) : this.viewFallback(container, 'Escalas Salariales');
                    break;
                case '#convenios':
                    this.viewConvenios(container);
                    break;
                case '#actividades':
                    this.viewActividades(container);
                    break;
                case '#noticias':
                    window.ModuleNoticias ? window.ModuleNoticias.init(container) : this.viewFallback(container, 'Noticias y Comunicados');
                    break;
                case '#faq':
                    this.viewFAQ(container);
                    break;
                case '#chat':
                    window.ModuleChat ? window.ModuleChat.init(container) : this.viewFallback(container, 'Asistente AI');
                    break;
                case '#admin':
                    window.ModuleAdmin ? window.ModuleAdmin.init(container) : this.viewFallback(container, 'Panel de Control');
                    break;
                default:
                    this.viewDashboard(container);
            }
        }, 200); // Pequeño delay de 200ms para simular procesamiento asíncrono premium
    },

    // ========================================== //
    // VISTA: DASHBOARD PRINCIPAL PREMIUM         //
    // ========================================== //
    viewDashboard(target) {
        target.innerHTML = `
            <div class="dashboard-header-block" style="margin-bottom: var(--space-6);">
                <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Panel de Control Gremial</h2>
                <p style="color: var(--text-muted); font-size: var(--font-sm);">Resumen analítico de capacitaciones, legislación activa y herramientas para delegados.</p>
            </div>

            <!-- Métrica Cards Grid (Estilo Fluent Design) -->
            <div class="grid-dashboard" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-5); margin-bottom: var(--space-8);">
                <div class="glassmorphism card-hover-effect" style="padding: var(--space-5); border-radius: var(--radius-md); position: relative; overflow: hidden;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                        <span style="font-size: var(--font-sm); font-weight: var(--weight-semibold); color: var(--text-muted);">Cursos Activos</span>
                        <i class="fa-solid fa-graduation-cap" style="color: var(--primary); font-size: var(--font-xl);"></i>
                    </div>
                    <h3 style="font-size: var(--font-4xl); color: var(--primary-dark);">6</h3>
                    <div style="font-size: var(--font-xs); color: var(--success); margin-top: var(--space-2);"><i class="fa-solid fa-circle-check"></i> 2 Completados</div>
                </div>

                <div class="glassmorphism card-hover-effect" style="padding: var(--space-5); border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                        <span style="font-size: var(--font-sm); font-weight: var(--weight-semibold); color: var(--text-muted);">Horas Académicas</span>
                        <i class="fa-solid fa-clock" style="color: var(--branch-molienda); font-size: var(--font-xl);"></i>
                    </div>
                    <h3 style="font-size: var(--font-4xl); color: var(--primary-dark);">32 <span style="font-size: var(--font-base); font-weight:var(--weight-regular);">hs</span></h3>
                    <div style="font-size: var(--font-xs); color: var(--primary-light); margin-top: var(--space-2);">Sincronizadas en Legajo</div>
                </div>

                <div class="glassmorphism card-hover-effect" style="padding: var(--space-5); border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                        <span style="font-size: var(--font-sm); font-weight: var(--weight-semibold); color: var(--text-muted);">Evaluaciones</span>
                        <i class="fa-solid fa-file-shield" style="color: var(--success); font-size: var(--font-xl);"></i>
                    </div>
                    <h3 style="font-size: var(--font-4xl); color: var(--primary-dark);">100<span style="font-size: var(--font-base); font-weight:var(--weight-regular);">%</span></h3>
                    <div style="font-size: var(--font-xs); color: var(--success); margin-top: var(--space-2);">Tasa de Aprobación Activa</div>
                </div>

                <div class="glassmorphism card-hover-effect" style="padding: var(--space-5); border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                        <span style="font-size: var(--font-sm); font-weight: var(--weight-semibold); color: var(--text-muted);">Videos Vistos</span>
                        <i class="fa-solid fa-circle-play" style="color: var(--danger); font-size: var(--font-xl);"></i>
                    </div>
                    <h3 style="font-size: var(--font-4xl); color: var(--primary-dark);">14</h3>
                    <div style="font-size: var(--font-xs); color: var(--text-muted); margin-top: var(--space-2);">De videoteca instructiva</div>
                </div>
            </div>

            <!-- Sección de Reporte Gráfico y Muro de Actividad Reciente -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); grid-auto-flow: row;" class="grid-dashboard">
                <!-- Gráfico Hecho con CSS/HTML Puro -->
                <div class="glassmorphism" style="padding: var(--space-6); border-radius: var(--radius-md);">
                    <h4 style="margin-bottom: var(--space-4); font-size: var(--font-lg);"><i class="fa-solid fa-chart-simple"></i> Progreso Mensual de Formación (2026)</h4>
                    <div class="chart-container" style="display: flex; align-items: flex-end; justify-content: space-between; height: 200px; padding-top: var(--space-6); border-bottom: 2px solid var(--text-light); position: relative;">
                        <div style="display: flex; flex-direction: column; align-items: center; width: 15%;">
                            <div style="height: 40px; width: 100%; background: var(--gradient-tech); border-radius: var(--radius-sm) var(--radius-sm) 0 0; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px;">4h</div>
                            <span style="font-size: var(--font-xs); margin-top: var(--space-2); color: var(--text-muted);">Marzo</span>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; width: 15%;">
                            <div style="height: 110px; width: 100%; background: var(--gradient-tech); border-radius: var(--radius-sm) var(--radius-sm) 0 0; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px;">12h</div>
                            <span style="font-size: var(--font-xs); margin-top: var(--space-2); color: var(--text-muted);">Abril</span>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; width: 15%;">
                            <div style="height: 160px; width: 100%; background: var(--gradient-tech); border-radius: var(--radius-sm) var(--radius-sm) 0 0; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px;">16h</div>
                            <span style="font-size: var(--font-xs); margin-top: var(--space-2); color: var(--text-muted);">Mayo</span>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; width: 15%;">
                            <div style="height: 80px; width: 100%; background: var(--gradient-tech); border-radius: var(--radius-sm) var(--radius-sm) 0 0; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px;">8h</div>
                            <span style="font-size: var(--font-xs); margin-top: var(--space-2); color: var(--text-muted);">Junio</span>
                        </div>
                    </div>
                </div>

                <!-- Actividad / Novedades Breves Gremiales -->
                <div class="glassmorphism" style="padding: var(--space-6); border-radius: var(--radius-md);">
                    <h4 style="margin-bottom: var(--space-4); font-size: var(--font-lg);"><i class="fa-solid fa-bullhorn"></i> Comunicados Rápidos</h4>
                    <ul style="display: flex; flex-direction: column; gap: var(--space-4);">
                        <li style="border-left: 3px solid var(--accent); padding-left: var(--space-3);">
                            <p style="font-size: var(--font-sm); font-weight: var(--weight-semibold);">Nueva Escala Salarial Homologada</p>
                            <span style="font-size: var(--font-xs); color: var(--text-muted);">Rama Metalífera - Julio 2026</span>
                        </li>
                        <li style="border-left: 3px solid var(--primary-light); padding-left: var(--space-3);">
                            <p style="font-size: var(--font-sm); font-weight: var(--weight-semibold);">Examen de Higiene y Seguridad</p>
                            <span style="font-size: var(--font-xs); color: var(--text-muted);">Habilitado hasta el 15/07</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    },

    // ========================================== //
    // VISTA: RAMAS DE ACTIVIDAD CON SECCIONES    //
    // ========================================== //
    viewActividades(target) {
        target.innerHTML = `
            <div style="margin-bottom: var(--space-6);">
                <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Ramas Gremiales de la Actividad</h2>
                <p style="color: var(--text-muted); font-size: var(--font-sm);">Identidad visual y encuadres aplicados a cada sector industrial regulado por AOMA.</p>
            </div>

            <div class="grid-dashboard" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-5);">
                <div class="glassmorphism card-hover-effect" style="border-radius: var(--radius-md); overflow: hidden;">
                    <div style="height: 140px; background: linear-gradient(rgba(0,119,145,0.7), rgba(0,119,145,0.9)), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80') center/cover; display:flex; align-items:center; justify-content:center; color:#fff;">
                        <h3 style="color:#fff; font-family:var(--font-header);"><i class="fa-solid fa-mountain"></i> Minería Metalífera</h3>
                    </div>
                    <div style="padding: var(--space-4); font-size:var(--font-sm);">
                        <p style="color:var(--text-muted); margin-bottom:var(--space-3);">Abarca la explotación de oro, plata, cobre y minerales metalíferos en proyectos de gran envergadura provinciales.</p>
                        <span style="background: rgba(0,119,145,0.1); color: var(--branch-metalifera); padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); font-size: var(--font-xs); font-weight: var(--weight-bold);">CCT 599/10</span>
                    </div>
                </div>

                <div class="glassmorphism card-hover-effect" style="border-radius: var(--radius-md); overflow: hidden;">
                    <div style="height: 140px; background: linear-gradient(rgba(107,114,128,0.7), rgba(107,114,128,0.9)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80') center/cover; display:flex; align-items:center; justify-content:center; color:#fff;">
                        <h3 style="color:#fff; font-family:var(--font-header);"><i class="fa-solid fa-trowel-bricks"></i> Fabricación de Cemento</h3>
                    </div>
                    <div style="padding: var(--space-4); font-size:var(--font-sm);">
                        <p style="color:var(--text-muted); margin-bottom:var(--space-3);">Plantas industriales de molienda y procesamiento de clínker y cemento portland en la región.</p>
                        <span style="background: rgba(107,114,128,0.1); color: var(--branch-cemento); padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); font-size: var(--font-xs); font-weight: var(--weight-bold);">CCT 53/89</span>
                    </div>
                </div>

                <div class="glassmorphism card-hover-effect" style="border-radius: var(--radius-md); overflow: hidden;">
                    <div style="height: 140px; background: linear-gradient(rgba(79,209,197,0.7), rgba(79,209,197,0.9)), url('https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=400&q=80') center/cover; display:flex; align-items:center; justify-content:center; color:#fff;">
                        <h3 style="color:#fff; font-family:var(--font-header);"><i class="fa-solid fa-industry-windows"></i> Industria de la Cal</h3>
                    </div>
                    <div style="padding: var(--space-4); font-size:var(--font-sm);">
                        <p style="color:var(--text-muted); margin-bottom:var(--space-3);">Producción calera tradicional e industrial, sector clave en los valles productivos de San Juan.</p>
                        <span style="background: rgba(79,209,197,0.1); color: #2C7A7B; padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); font-size: var(--font-xs); font-weight: var(--weight-bold);">CCT 444/06</span>
                    </div>
                </div>
            </div>
        `;
    },

    // ========================================== //
    // VISTA: CONVENIOS COLECTIVOS Y LEGISLACIÓN   //
    // ========================================== //
    viewConvenios(target) {
        target.innerHTML = `
            <div style="margin-bottom: var(--space-6);">
                <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Marco Legal y Convenios Colectivos</h2>
                <p style="color: var(--text-muted); font-size: var(--font-sm);">Biblioteca de consulta legislativa y convenios colectivos de trabajo aplicables.</p>
            </div>

            <div class="glassmorphism" style="padding: var(--space-5); border-radius: var(--radius-md); margin-bottom: var(--space-4);">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom: var(--space-4);">
                    <h4 style="font-size:var(--font-lg);"><i class="fa-solid fa-gavel"></i> Normativas Homologadas de la Actividad</h4>
                </div>
                
                <div class="table-responsive-container">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: var(--font-sm);">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--text-light); color: var(--primary-dark);">
                                <th style="padding: var(--space-3);">Norma / CCT</th>
                                <th style="padding: var(--space-3);">Ámbito de Aplicación</th>
                                <th style="padding: var(--space-3);">Estado</th>
                                <th style="padding: var(--space-3);">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid var(--border-subtle);">
                                <td style="padding: var(--space-3); font-weight:var(--weight-semibold);">Ley 24.557</td>
                                <td style="padding: var(--space-3);">Riesgos del Trabajo e Higiene Industrial</td>
                                <td style="padding: var(--space-3);"><span style="background:var(--success-bg); color:var(--success); padding:2px 8px; border-radius:4px; font-size:12px;">Vigente</span></td>
                                <td style="padding: var(--space-3);"><button class="btn-text-link" onclick="AppInstance.showToast('Descargando Ley 24557...', 'success')"><i class="fa-solid fa-file-pdf"></i> Ver PDF</button></td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-subtle);">
                                <td style="padding: var(--space-3); font-weight:var(--weight-semibold);">CCT 599/10</td>
                                <td style="padding: var(--space-3);">Rama Minería Metalífera Nacional</td>
                                <td style="padding: var(--space-3);"><span style="background:var(--success-bg); color:var(--success); padding:2px 8px; border-radius:4px; font-size:12px;">Vigente</span></td>
                                <td style="padding: var(--space-3);"><button class="btn-text-link" onclick="AppInstance.showToast('Descargando CCT 599/10...', 'success')"><i class="fa-solid fa-file-pdf"></i> Ver PDF</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // ========================================== //
    // VISTA: FAQ (ACORDEÓN ACCESIBLE)            //
    // ========================================== //
    viewFAQ(target) {
        target.innerHTML = `
            <div style="margin-bottom: var(--space-6);">
                <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Preguntas Frecuentes Gremiales</h2>
                <p style="color: var(--text-muted); font-size: var(--font-sm);">Respuestas inmediatas a las consultas laborales y operativas más recurrentes de los delegados.</p>
            </div>

            <div style="display:flex; flex-direction:column; gap: var(--space-3); max-width:800px;">
                <div class="glassmorphism" style="border-radius:var(--radius-md); padding:var(--space-4);">
                    <button style="width:100%; display:flex; justify-content:space-between; align-items:center; font-weight:var(--weight-bold); text-align:left; color:var(--primary-dark);" onclick="this.nextElementSibling.classList.toggle('hidden')">
                        <span>¿Cómo se calculan las horas extraordinarias en los yacimientos mineros?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                    <div class="hidden" style="margin-top:var(--space-3); color:var(--text-muted); font-size:var(--font-sm); border-top:1px solid var(--border-subtle); padding-top:var(--space-2);">
                        Según el CCT vigente de la rama metalífera, las horas trabajadas en exceso de la jornada legal diaria o semanal se liquidarán con un recargo del 50% si se realizan en días laborables, y al 100% en días de descanso obligatorio, sábados después de las 13:00 hs y feriados nacionales.
                    </div>
                </div>

                <div class="glassmorphism" style="border-radius:var(--radius-md); padding:var(--space-4);">
                    <button style="width:100%; display:flex; justify-content:space-between; align-items:center; font-weight:var(--weight-bold); text-align:left; color:var(--primary-dark);" onclick="this.nextElementSibling.classList.toggle('hidden')">
                        <span>¿Cuál es el procedimiento ante un incumplimiento de EPP en obra?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                    <div class="hidden" style="margin-top:var(--space-3); color:var(--text-muted); font-size:var(--font-sm); border-top:1px solid var(--border-subtle); padding-top:var(--space-2);">
                        El delegado debe asentar la novedad en el libro de actas gremial, notificar de inmediato al supervisor técnico o de seguridad de la empresa, y de persistir la falta, elevar la denuncia correspondiente a la Seccional San Juan para la intervención del Ministerio de Trabajo.
                    </div>
                </div>
            </div>
        `;
    },

    // View Fallback en caso de que un módulo no esté inyectado aún
    viewFallback(container, moduleName) {
        container.innerHTML = `
            <div style="text-align:center; padding: var(--space-12) 0;">
                <i class="fa-solid fa-toolbox" style="font-size: 4rem; color: var(--text-light); margin-bottom: var(--space-4);"></i>
                <h3 style="color: var(--primary-dark);">Módulo en Despliegue Técnico</h3>
                <p style="color: var(--text-muted); font-size: var(--font-sm); margin-top: var(--space-2);">El archivo o script modular para <strong>${moduleName}</strong> está listo en la arquitectura y será acoplado en la siguiente etapa.</p>
            </div>
        `;
    },

    // ========================================== //
    // SISTEMA GLOBAL DE COMPONENTES TOAST       //
    // ========================================== //
    renderGlobalToasts() {
        if (!document.getElementById('toast-container')) {
            const wrapper = document.createElement('div');
            wrapper.id = 'toast-container';
            wrapper.className = 'toast-wrapper';
            document.body.appendChild(wrapper);
        }
    },

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type} animate-fade-in`;
        
        let icon = 'fa-circle-check';
        if (type === 'danger') icon = 'fa-circle-exclamation';
        if (type === 'warning') icon = 'fa-triangle-exclamation';

        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span style="font-size: var(--font-sm); font-weight: var(--weight-medium);">${message}</span>
        `;

        container.appendChild(toast);

        // Autoeliminación con desvanecimiento sutil
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
};

// Autoejecución inmediata al procesar el archivo
document.addEventListener('DOMContentLoaded', () => {
    // Si ya existe sesión, inicializa las vistas base
    if (localStorage.getItem('aoma_session')) {
        window.AppInstance.init();
    }
});