// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
// ============================================

let currentUser = null;
let currentPage = 'inicio';
let currentSubPage = null;
let isDarkMode = false;
let searchHighlights = [];
let currentHighlightIndex = -1;

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AOMA Campus: Iniciando...');
    
    setTimeout(() => {
        const loading = document.getElementById('loadingScreen');
        if (loading) loading.classList.add('hidden');
    }, 800);
    
    const savedSession = localStorage.getItem('aoma_session');
    if (savedSession) {
        try {
            currentUser = JSON.parse(savedSession);
            showApp();
        } catch (e) {
            localStorage.removeItem('aoma_session');
            showLogin();
        }
    } else {
        showLogin();
    }
    
    setupEvents();
    
    const savedTheme = localStorage.getItem('aoma_theme');
    if (savedTheme === 'dark') {
        toggleTheme();
    }
});

// ============================================
// LOGIN / LOGOUT
// ============================================
function showLogin() {
    const loginScreen = document.getElementById('loginScreen');
    const app = document.getElementById('app');
    if (loginScreen) loginScreen.classList.remove('hidden');
    if (app) app.classList.add('hidden');
}

function showApp() {
    const loginScreen = document.getElementById('loginScreen');
    const app = document.getElementById('app');
    if (loginScreen) loginScreen.classList.add('hidden');
    if (app) app.classList.remove('hidden');
    
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    const userAvatar = document.getElementById('userAvatar');
    
    if (userName) userName.textContent = currentUser.name;
    if (userRole) {
        const roleText = currentUser.role === 'admin' ? 'Administrador' : 
                         currentUser.role === 'dirigente' ? 'Dirigente' : 'Delegado';
        userRole.textContent = roleText;
    }
    if (userAvatar) {
        userAvatar.textContent = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    
    navigateTo('inicio');
}

function handleLogin(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('loginAlert');
    const errorText = document.getElementById('loginAlertText');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    if (btnText) btnText.classList.add('hidden');
    if (btnLoader) btnLoader.classList.remove('hidden');
    
    setTimeout(() => {
        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        
        const user = DATA.usuarios.find(u => u.username === username && u.password === password);
        
        if (!user) {
            if (errorText) errorText.textContent = 'Usuario o contraseña incorrectos';
            if (errorDiv) errorDiv.classList.remove('hidden');
            if (btnText) btnText.classList.remove('hidden');
            if (btnLoader) btnLoader.classList.add('hidden');
            return;
        }
        
        if (!user.active) {
            if (errorText) errorText.textContent = 'Tu cuenta está bloqueada. Contactá al administrador.';
            if (errorDiv) errorDiv.classList.remove('hidden');
            if (btnText) btnText.classList.remove('hidden');
            if (btnLoader) btnLoader.classList.add('hidden');
            return;
        }
        
        currentUser = user;
        localStorage.setItem('aoma_session', JSON.stringify(user));
        if (errorDiv) errorDiv.classList.add('hidden');
        showApp();
        
        showToast('Bienvenido, ' + currentUser.name.split(' ')[0] + '!', 'success');
    }, 600);
}

function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('aoma_session');
        location.reload();
    }
}

function togglePassword() {
    const input = document.getElementById('password');
    const icon = document.querySelector('.toggle-password i');
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        if (icon) icon.className = 'fas fa-eye';
    }
}

// ============================================
// NAVEGACIÓN
// ============================================
function navigateTo(page, subPage = null) {
    currentPage = page;
    currentSubPage = subPage;
    
    // Update desktop nav
    document.querySelectorAll('.desktop-nav .nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page && !subPage);
    });
    
    // Update sidebar nav
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page && !subPage);
    });
    
    // Close mobile sidebar
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
    
    const content = document.getElementById('pageContent');
    if (content) {
        content.innerHTML = '<div class="empty-state"><div class="loading-spinner"></div><p>Cargando...</p></div>';
    }
    
    setTimeout(() => {
        renderPage(page, content, subPage);
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage(page, container, subPage = null) {
    if (!container) return;
    
    if (page === 'convenios' && subPage) {
        renderConveniosSubpage(container, subPage);
        return;
    }
    
    switch (page) {
        case 'inicio':
            renderDashboard(container);
            break;
        case 'cursos':
            renderCursos(container);
            break;
        case 'convenios':
            renderConvenios(container);
            break;
        case 'escalas':
            renderEscalas(container);
            break;
        case 'legislacion':
            renderLegislacion(container);
            break;
        case 'faq':
            renderFAQ(container);
            break;
        default:
            container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Página no encontrada</h3></div>';
    }
}

function renderConveniosSubpage(container, subPage) {
    const data = DATA.convenios[subPage];
    if (!data) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Convenio no encontrado</h3></div>';
        return;
    }
    
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('convenios')">
                <i class="fas fa-arrow-left"></i> Volver a Convenios
            </button>
        </div>
        <div class="section">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <i class="fas ${data.icono}" style="font-size: 2.5rem; color: ${data.color};"></i>
                <div>
                    <h1 class="section-title" style="margin-bottom: 0.25rem;">${data.nombre}</h1>
                    <p style="color: var(--text-secondary); margin: 0;">${data.descripcion}</p>
                </div>
            </div>
            
            <div class="convenios-list">
                ${data.cct.map(cct => `
                    <div class="convenio-item" onclick="showConvenioDetalle('${subPage}', '${cct.numero}')">
                        <div class="convenio-icon">
                            <i class="fas fa-file-contract"></i>
                        </div>
                        <div class="convenio-info">
                            <h3>${cct.numero}</h3>
                            <p class="convenio-subtitle">${cct.subtitulo}</p>
                            <p class="convenio-title">${cct.titulo}</p>
                        </div>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showConvenioDetalle(categoriaKey, cctNumero) {
    const categoria = DATA.convenios[categoriaKey];
    const cct = categoria.cct.find(c => c.numero === cctNumero);
    
    if (!cct) {
        showToast('Convenio no encontrado', 'error');
        return;
    }
    
    // Get content from global variable
    const cctContent = window[cct.variable];
    const contenido = cctContent ? cctContent.contenido : '<p>Contenido no disponible. El archivo del convenio no fue cargado correctamente.</p>';
    
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('convenios', '${categoriaKey}')">
                <i class="fas fa-arrow-left"></i> Volver
            </button>
        </div>
        <div class="section" id="convenioContentSection">
            <div class="convenio-header">
                <div class="convenio-badge">${cct.numero}</div>
                <h2 class="section-title" style="margin-bottom: 0.5rem;">${cct.titulo}</h2>
                <p class="convenio-subtitle-large">${cct.subtitulo}</p>
                <p class="convenio-categoria">${categoria.nombre}</p>
            </div>
            <div class="ley-content" id="convenioLeyContent">
                ${contenido}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        createSearchBar('convenioContentSection', '#convenioLeyContent');
    }, 100);
}

// ============================================
// BARRA DE BÚSQUEDA INTERNA
// ============================================
function createSearchBar(containerId, contentSelector) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar-container';
    searchBar.innerHTML = `
        <i class="fas fa-search search-icon"></i>
        <input type="text" id="internalSearchInput" placeholder="Buscar en este documento... (ej: vacaciones, despido, salario)">
        <span class="search-count" id="searchCount">0 resultados</span>
        <button class="btn-search-nav" id="btnPrevResult" title="Anterior" disabled>
            <i class="fas fa-chevron-up"></i>
        </button>
        <button class="btn-search-nav" id="btnNextResult" title="Siguiente" disabled>
            <i class="fas fa-chevron-down"></i>
        </button>
        <button class="btn-search-nav" id="btnClearSearch" title="Limpiar búsqueda">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.insertBefore(searchBar, container.firstChild);
    
    const input = document.getElementById('internalSearchInput');
    const countEl = document.getElementById('searchCount');
    const btnPrev = document.getElementById('btnPrevResult');
    const btnNext = document.getElementById('btnNextResult');
    const btnClear = document.getElementById('btnClearSearch');
    
    input.addEventListener('input', () => {
        const query = input.value.trim();
        if (query.length < 2) {
            clearHighlights();
            if (countEl) countEl.textContent = '0 resultados';
            if (btnPrev) btnPrev.disabled = true;
            if (btnNext) btnNext.disabled = true;
            return;
        }
        performInternalSearch(query, contentSelector, countEl, btnPrev, btnNext);
    });
    
    if (btnPrev) btnPrev.addEventListener('click', () => navigateHighlight(-1));
    if (btnNext) btnNext.addEventListener('click', () => navigateHighlight(1));
    if (btnClear) btnClear.addEventListener('click', () => {
        input.value = '';
        clearHighlights();
        if (countEl) countEl.textContent = '0 resultados';
        if (btnPrev) btnPrev.disabled = true;
        if (btnNext) btnNext.disabled = true;
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            navigateHighlight(1);
        }
        if (e.key === 'Escape') {
            input.value = '';
            clearHighlights();
            if (countEl) countEl.textContent = '0 resultados';
            if (btnPrev) btnPrev.disabled = true;
            if (btnNext) btnNext.disabled = true;
        }
    });
}

function performInternalSearch(query, contentSelector, countEl, btnPrev, btnNext) {
    clearHighlights();
    
    const contentEl = document.querySelector(contentSelector);
    if (!contentEl) return;
    
    const walker = document.createTreeWalker(
        contentEl,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                if (node.parentElement.tagName === 'SCRIPT' || 
                    node.parentElement.tagName === 'STYLE' ||
                    node.parentElement.classList.contains('search-highlight')) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_REJECT;
            }
        }
    );
    
    const textNodes = [];
    let currentNode;
    while (currentNode = walker.nextNode()) {
        textNodes.push(currentNode);
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        const span = document.createElement('span');
        span.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
        textNode.parentNode.replaceChild(span, textNode);
    });
    
    searchHighlights = Array.from(document.querySelectorAll('.search-highlight'));
    currentHighlightIndex = -1;
    
    if (countEl) countEl.textContent = `${searchHighlights.length} resultado${searchHighlights.length !== 1 ? 's' : ''}`;
    if (btnPrev) btnPrev.disabled = searchHighlights.length === 0;
    if (btnNext) btnNext.disabled = searchHighlights.length === 0;
    
    if (searchHighlights.length > 0) {
        navigateHighlight(1);
    }
}

function navigateHighlight(direction) {
    if (searchHighlights.length === 0) return;
    
    if (currentHighlightIndex >= 0 && currentHighlightIndex < searchHighlights.length) {
        searchHighlights[currentHighlightIndex].classList.remove('active');
    }
    
    currentHighlightIndex += direction;
    if (currentHighlightIndex >= searchHighlights.length) currentHighlightIndex = 0;
    if (currentHighlightIndex < 0) currentHighlightIndex = searchHighlights.length - 1;
    
    const highlight = searchHighlights[currentHighlightIndex];
    highlight.classList.add('active');
    highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearHighlights() {
    document.querySelectorAll('.search-highlight').forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
    searchHighlights = [];
    currentHighlightIndex = -1;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================
// RENDERIZADO DE PÁGINAS
// ============================================

function renderDashboard(container) {
    const actCount = Object.keys(DATA.actividades).length;
    const convCount = Object.keys(DATA.convenios).length;
    const cursoCount = DATA.cursos.length;
    const leyCount = 5;
    
    container.innerHTML = `
        <div class="page-header">
            <h1>¡Bienvenido, ${currentUser.name.split(' ')[0]}! 👋</h1>
            <p>Aquí está tu resumen de actividad del Campus Virtual AOMA</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card" style="cursor: pointer;" onclick="navigateTo('convenios')">
                <div class="stat-icon">📋</div>
                <div class="stat-value">${convCount}</div>
                <div class="stat-label">Categorías de Convenios</div>
            </div>
            <div class="stat-card accent" style="cursor: pointer;" onclick="navigateTo('actividad-mineria-extractiva')">
                <div class="stat-icon">🏭</div>
                <div class="stat-value">${actCount}</div>
                <div class="stat-label">Actividades</div>
            </div>
            <div class="stat-card success" style="cursor: pointer;" onclick="navigateTo('cursos')">
                <div class="stat-icon">🎓</div>
                <div class="stat-value">${cursoCount}</div>
                <div class="stat-label">Cursos disponibles</div>
            </div>
            <div class="stat-card warning" style="cursor: pointer;" onclick="navigateTo('legislacion')">
                <div class="stat-icon">⚖️</div>
                <div class="stat-value">${leyCount}</div>
                <div class="stat-label">Leyes laborales</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Estructura de AOMA San Juan</h2>
            </div>
            <div class="cards-grid">
                ${Object.values(DATA.actividades).map(act => `
                    <div class="card" style="cursor: pointer;" onclick="navigateTo('actividad-${act.id}')">
                        <div class="card-header" style="background: linear-gradient(135deg, ${act.color}, ${act.color}dd);">
                            <i class="fas ${act.icono}"></i>
                            <span class="card-badge">${act.ctt}</span>
                        </div>
                        <div class="card-body">
                            <div class="card-category">${act.nombre}</div>
                            <h3 class="card-title">${act.descripcion}</h3>
                            ${act.empresas && act.empresas.length > 0 ? `
                                <p class="card-description"><strong>Empresas:</strong> ${act.empresas.join(', ')}</p>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Últimas Noticias</h2>
            </div>
            <div class="cards-grid">
                ${DATA.noticias.slice(0, 3).map(n => `
                    <div class="card">
                        <div class="card-header" style="background-image: url('${n.imagen}'); background-size: cover; background-position: center;">
                            <span class="card-badge">${n.categoria}</span>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${n.titulo}</h3>
                            <p class="card-description">${n.resumen}</p>
                            <div class="card-meta">
                                <span><i class="far fa-user"></i> ${n.autor}</span>
                                <span><i class="far fa-calendar"></i> ${DATA.formatDate(n.fecha)}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderCursos(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1>Capacitaciones 🎓</h1>
            <p>Cursos disponibles organizados por actividad minera</p>
        </div>
        <div class="cards-grid">
            ${DATA.cursos.map(c => {
                const act = DATA.actividades[c.actividad];
                return `
                    <div class="card" onclick="showCursoDetalle(${c.id})">
                        <div class="card-header" style="background-image: url('${c.imagen}'); background-size: cover; background-position: center;">
                            <span class="card-badge">${c.categoria}</span>
                        </div>
                        <div class="card-body">
                            <div class="card-category">${act ? act.nombre : 'General'}</div>
                            <h3 class="card-title">${c.titulo}</h3>
                            <p class="card-description">${c.descripcion}</p>
                            <div class="card-meta">
                                <span><i class="far fa-clock"></i> ${c.duracion}</span>
                                <span><i class="fas fa-signal"></i> ${c.nivel}</span>
                                <span><i class="fas fa-book"></i> ${c.modulos} módulos</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function showCursoDetalle(cursoId) {
    const curso = DATA.cursos.find(c => c.id === cursoId);
    if (!curso) return;
    
    const act = DATA.actividades[curso.actividad];
    const container = document.getElementById('pageContent');
    
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('cursos')">
                <i class="fas fa-arrow-left"></i> Volver a cursos
            </button>
        </div>
        <div class="activity-hero">
            <img src="${curso.imagen}" alt="${curso.titulo}" onerror="this.style.display='none'">
            <div class="activity-hero-content">
                <h1><i class="fas ${act ? act.icono : 'fa-graduation-cap'}"></i> ${curso.titulo}</h1>
                <p>${curso.descripcion}</p>
            </div>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">👨‍🏫</div>
                <div class="stat-label">Instructor</div>
                <div style="font-weight: 600; margin-top: 0.5rem;">${curso.instructor}</div>
            </div>
            <div class="stat-card accent">
                <div class="stat-icon">⏱️</div>
                <div class="stat-label">Duración</div>
                <div style="font-weight: 600; margin-top: 0.5rem;">${curso.duracion}</div>
            </div>
            <div class="stat-card success">
                <div class="stat-icon">📊</div>
                <div class="stat-label">Nivel</div>
                <div style="font-weight: 600; margin-top: 0.5rem;">${curso.nivel}</div>
            </div>
            <div class="stat-card warning">
                <div class="stat-icon">📚</div>
                <div class="stat-label">Módulos</div>
                <div style="font-weight: 600; margin-top: 0.5rem;">${curso.modulos}</div>
            </div>
        </div>
        <div class="section">
            <h2 class="section-title">Contenido del curso</h2>
            <div style="line-height: 1.8; color: var(--text-secondary); margin-top: 1rem;">
                ${curso.contenido}
            </div>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="inscribirse(${curso.id})">
                <i class="fas fa-user-plus"></i> Inscribirme al curso
            </button>
        </div>
    `;
}

function inscribirse(cursoId) {
    const curso = DATA.cursos.find(c => c.id === cursoId);
    showToast('✅ Inscripción enviada al curso: ' + curso.titulo, 'success');
}

function renderConvenios(container) {
    const convenios = DATA.convenios;
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Convenios Colectivos de Trabajo 📋</h1>
            <p>Convenios organizados por actividad</p>
        </div>
        
        <div class="convenios-categories">
            ${Object.entries(convenios).map(([key, categoria]) => `
                <div class="convenio-category">
                    <div class="category-header" onclick="toggleCategory('${key}')">
                        <div class="category-info">
                            <i class="fas ${categoria.icono}" style="color: ${categoria.color};"></i>
                            <div>
                                <h2>${categoria.nombre}</h2>
                                <p>${categoria.descripcion}</p>
                            </div>
                        </div>
                        <i class="fas fa-chevron-down category-arrow" id="arrow-${key}"></i>
                    </div>
                    
                    <div class="category-content hidden" id="content-${key}">
                        <div class="convenios-list">
                            ${categoria.cct.map(cct => `
                                <div class="convenio-item" onclick="showConvenioDetalle('${key}', '${cct.numero}')">
                                    <div class="convenio-icon">
                                        <i class="fas fa-file-contract"></i>
                                    </div>
                                    <div class="convenio-info">
                                        <h3>${cct.numero}</h3>
                                        <p class="convenio-subtitle">${cct.subtitulo}</p>
                                        <p class="convenio-title">${cct.titulo}</p>
                                    </div>
                                    <i class="fas fa-arrow-right"></i>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function toggleCategory(key) {
    const content = document.getElementById(`content-${key}`);
    const arrow = document.getElementById(`arrow-${key}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
}

function renderEscalas(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1>Escalas Salariales 💰</h1>
            <p>Tablas salariales vigentes - Actualizadas Julio 2026</p>
        </div>
        ${Object.entries(DATA.escalas).map(([actId, escalas]) => {
            const act = DATA.actividades[actId];
            return `
                <div class="section">
                    <h2 class="section-title" style="margin-bottom: 1rem;">
                        <i class="fas ${act ? act.icono : 'fa-money-bill-wave'}" style="color: ${act ? act.color : 'var(--primary)'};"></i>
                        ${act ? act.nombre : actId}
                        <span style="font-size: 0.875rem; color: var(--text-muted); font-weight: 400; margin-left: 0.5rem;">
                            (${act ? act.ctt : ''})
                        </span>
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
                                ${escalas.map(e => `
                                    <tr>
                                        <td><b>${e.categoria}</b></td>
                                        <td>${e.nivel}</td>
                                        <td><strong>${DATA.formatCurrency(e.salario)}</strong></td>
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

function renderLegislacion(container) {
    const leyes = [
        { numero: 'Ley 20.744', titulo: 'Ley de Contrato de Trabajo', categoria: 'Laboral General', resumen: 'Régimen legal del contrato de trabajo', variable: 'LEY_LCT_20744' },
        { numero: 'Ley 19.587', titulo: 'Ley de Higiene y Seguridad en el Trabajo', categoria: 'Seguridad', resumen: 'Normas mínimas de higiene y seguridad', variable: 'LEY_19587' },
        { numero: 'Ley 24.557', titulo: 'Ley de Riesgos del Trabajo', categoria: 'Seguridad', resumen: 'Sistema de riesgos del trabajo y ART', variable: 'LEY_24557' },
        { numero: 'Ley 24.013', titulo: 'Ley Nacional de Empleo', categoria: 'Empleo', resumen: 'Política de empleo y prestaciones por desempleo', variable: 'LEY_24013' },
        { numero: 'Ley 23.551', titulo: 'Ley de Asociaciones Sindicales', categoria: 'Gremial', resumen: 'Sindicatos y actividad gremial', variable: 'LEY_23551' }
    ];
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Legislación Laboral ⚖️</h1>
            <p>Leyes y normativas laborales aplicables al sector minero</p>
        </div>
        <div class="cards-grid">
            ${leyes.map(l => {
                const leyData = window[l.variable];
                return `
                    <div class="card" onclick="showLeyDetalle('${l.variable}')">
                        <div class="card-header" style="background: linear-gradient(135deg, #475569, #334155);">
                            <i class="fas fa-balance-scale"></i>
                            <span class="card-badge">${l.numero}</span>
                        </div>
                        <div class="card-body">
                            <div class="card-category">${l.categoria}</div>
                            <h3 class="card-title">${l.titulo}</h3>
                            <p class="card-description">${leyData ? leyData.resumen : l.resumen}</p>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function showLeyDetalle(variable) {
    const ley = window[variable];
    if (!ley) {
        showToast('Ley no encontrada', 'error');
        return;
    }
    
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('legislacion')">
                <i class="fas fa-arrow-left"></i> Volver a legislación
            </button>
        </div>
        <div class="section" id="leyContentSection">
            <div class="convenio-header">
                <div class="convenio-badge">${ley.numero}</div>
                <h2 class="section-title" style="margin-bottom: 0.5rem;">${ley.titulo}</h2>
                <p class="convenio-categoria">${ley.categoria}</p>
            </div>
            <div class="ley-content" id="leyLeyContent">
                ${ley.contenido}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        createSearchBar('leyContentSection', '#leyLeyContent');
    }, 100);
}

function renderFAQ(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1>Preguntas Frecuentes ❓</h1>
            <p>Resolvé tus dudas organizadas por temática</p>
        </div>
        ${Object.entries(DATA.faqs).map(([catId, items]) => {
            const act = DATA.actividades[catId];
            const catName = act ? act.nombre : 'General';
            return `
                <div class="section">
                    <h2 class="section-title" style="margin-bottom: 1rem;">${catName}</h2>
                    <div class="faq-list">
                        ${items.map((faq, idx) => `
                            <div class="faq-item" id="faq-${catId}-${idx}">
                                <div class="faq-question" onclick="toggleFaq('faq-${catId}-${idx}')">
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

function toggleFaq(id) {
    const item = document.getElementById(id);
    if (item) {
        item.classList.toggle('open');
    }
}

function renderActividad(container, activityId) {
    const act = DATA.actividades[activityId];
    if (!act) {
        container.innerHTML = '<div class="empty-state"><h3>Actividad no encontrada</h3></div>';
        return;
    }
    
    const cursosAct = DATA.cursos.filter(c => c.actividad === activityId);
    const videosAct = DATA.videos.filter(v => v.categoria === activityId);
    const faqsAct = DATA.faqs[activityId] || [];
    const escalasAct = DATA.escalas[activityId] || [];
    
    container.innerHTML = `
        <div class="activity-hero">
            <img src="${act.imagen}" alt="${act.nombre}" onerror="this.style.display='none'">
            <div class="activity-hero-content">
                <h1><i class="fas ${act.icono}"></i> ${act.nombre}</h1>
                <p>${act.descripcion}</p>
                ${act.empresas && act.empresas.length > 0 ? `
                    <p style="margin-top: 0.5rem;"><strong>Empresas:</strong> ${act.empresas.join(', ')}</p>
                ` : ''}
                <p style="margin-top: 0.5rem;"><strong>Convenio:</strong> ${act.ctt}</p>
            </div>
        </div>
        
        ${escalasAct.length > 0 ? `
            <div class="section">
                <h2 class="section-title" style="margin-bottom: 1rem;">Escalas Salariales</h2>
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
                            ${escalasAct.map(e => `
                                <tr>
                                    <td><b>${e.categoria}</b></td>
                                    <td>${e.nivel}</td>
                                    <td><strong>${DATA.formatCurrency(e.salario)}</strong></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        ` : ''}
        
        ${cursosAct.length > 0 ? `
            <div class="section">
                <div class="section-header">
                    <h2 class="section-title">Cursos de ${act.nombre}</h2>
                </div>
                <div class="cards-grid">
                    ${cursosAct.map(c => `
                        <div class="card" onclick="showCursoDetalle(${c.id})">
                            <div class="card-header" style="background-image: url('${c.imagen}'); background-size: cover; background-position: center;">
                                <span class="card-badge">${c.categoria}</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">${c.titulo}</h3>
                                <p class="card-description">${c.descripcion}</p>
                                <div class="card-meta">
                                    <span><i class="far fa-clock"></i> ${c.duracion}</span>
                                    <span><i class="fas fa-signal"></i> ${c.nivel}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        ${videosAct.length > 0 ? `
            <div class="section">
                <h2 class="section-title" style="margin-bottom: 1rem;">Videos relacionados</h2>
                <div class="cards-grid">
                    ${videosAct.map(v => `
                        <div class="card">
                            <div class="card-header" style="background-image: url('${v.thumbnail}'); background-size: cover; background-position: center;">
                                <i class="fas fa-play-circle" style="font-size: 3rem;"></i>
                                <span class="card-badge">${v.duracion}</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">${v.titulo}</h3>
                                <p class="card-description">${v.descripcion}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        ${faqsAct.length > 0 ? `
            <div class="section">
                <h2 class="section-title" style="margin-bottom: 1rem;">Preguntas frecuentes</h2>
                <div class="faq-list">
                    ${faqsAct.map((faq, idx) => `
                        <div class="faq-item" id="faq-act-${idx}">
                            <div class="faq-question" onclick="toggleFaq('faq-act-${idx}')">
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
    `;
}

// ============================================
// CHAT
// ============================================
function openChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) chatWindow.classList.remove('hidden');
    initChatMessages();
}

function closeChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) chatWindow.classList.add('hidden');
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;
    
    if (chatWindow.classList.contains('hidden')) {
        openChat();
    } else {
        closeChat();
    }
}

function initChatMessages() {
    const messages = document.getElementById('chatMessages');
    const quickReplies = document.getElementById('chatQuickReplies');
    
    if (messages && messages.children.length === 0) {
        addChatMessage('bot', `¡Hola ${currentUser.name.split(' ')[0]}! 👋 Soy el asistente virtual de AOMA San Juan. Puedo ayudarte con:\n\n• 📋 Convenios colectivos\n• ⚖️ Leyes laborales\n• 💰 Escalas salariales\n• 🎓 Cursos y capacitaciones\n\n¿En qué puedo ayudarte?`);
    }
    
    if (quickReplies && quickReplies.children.length === 0) {
        const replies = ['💰 Escalas salariales', '📋 Convenios CCT', '⚖️ Leyes laborales', '🎓 Cursos', '🔑 Contraseña'];
        replies.forEach(text => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply';
            btn.textContent = text;
            btn.onclick = () => sendChatMessage(text);
            quickReplies.appendChild(btn);
        });
    }
}

function sendChatMessage(text) {
    addChatMessage('user', text);
    
    const messages = document.getElementById('chatMessages');
    const typing = document.createElement('div');
    typing.className = 'chat-message bot';
    typing.id = 'typingIndicator';
    typing.innerHTML = `
        <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
        <div class="chat-message-content" style="display: flex; gap: 4px;">
            <span style="width: 8px; height: 8px; background: var(--text-muted); border-radius: 50%; animation: bounce 1s infinite;"></span>
            <span style="width: 8px; height: 8px; background: var(--text-muted); border-radius: 50%; animation: bounce 1s infinite 0.2s;"></span>
            <span style="width: 8px; height: 8px; background: var(--text-muted); border-radius: 50%; animation: bounce 1s infinite 0.4s;"></span>
        </div>
    `;
    if (messages) messages.appendChild(typing);
    if (messages) messages.scrollTop = messages.scrollHeight;
    
    setTimeout(() => {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
        const response = getBotResponse(text);
        addChatMessage('bot', response);
    }, 800 + Math.random() * 500);
}

function addChatMessage(type, text) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    
    const div = document.createElement('div');
    div.className = 'chat-message ' + type;
    
    const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const avatar = type === 'user' 
        ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : '<i class="fas fa-robot"></i>';
    
    div.innerHTML = `
        <div class="chat-message-avatar">${avatar}</div>
        <div>
            <div class="chat-message-content">${text}</div>
            <div class="chat-message-time" style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${time}</div>
        </div>
    `;
    
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(userMessage) {
    const q = userMessage.toLowerCase().trim();
    
    if (/^(hola|buenas|buenos días|buenas tardes)/.test(q)) {
        return `¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?`;
    }
    if (q.includes('gracias')) {
        return '¡De nada! 😊 Estoy aquí para lo que necesites.';
    }
    
    for (const [patterns, response] of Object.entries(DATA.chatResponses)) {
        if (patterns === 'default') continue;
        const patternList = patterns.split('|');
        if (patternList.some(p => q.includes(p))) {
            return response;
        }
    }
    
    for (const [cat, faqs] of Object.entries(DATA.faqs)) {
        for (const faq of faqs) {
            if (faq.pregunta.toLowerCase().includes(q) || faq.respuesta.toLowerCase().includes(q)) {
                return `📋 <strong>${faq.pregunta}</strong><br><br>${faq.respuesta}`;
            }
        }
    }
    
    return DATA.chatResponses.default;
}

// ============================================
// MODO OSCURO
// ============================================
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
    localStorage.setItem('aoma_theme', isDarkMode ? 'dark' : 'light');
    
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const titles = {
        success: 'Éxito',
        error: 'Error',
        warning: 'Atención',
        info: 'Información'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${titles[type]}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// MODALES
// ============================================
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');
    if (modal) modal.classList.add('hidden');
    if (overlay) overlay.classList.add('hidden');
    
    if (modalId === 'videoModal') {
        const frame = document.getElementById('videoFrame');
        if (frame) frame.src = '';
    }
}

function downloadCertificate() {
    const canvas = document.getElementById('certificateCanvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'certificado-aoma.png';
        link.href = canvas.toDataURL();
        link.click();
        showToast('✅ Certificado descargado', 'success');
    }
}

// ============================================
// SIDEBAR SUBMENU (MOBILE)
// ============================================
function toggleSidebarSubmenu(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const navItem = e.currentTarget.parentElement;
    const submenu = navItem.querySelector('.submenu');
    
    if (submenu) {
        submenu.classList.toggle('active');
    }
}

// ============================================
// EVENTOS
// ============================================
function setupEvents() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Desktop navigation
    document.querySelectorAll('.desktop-nav .nav-item').forEach(item => {
        const link = item.querySelector('.nav-link');
        const submenu = item.querySelector('.submenu');
        
        if (link && !submenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page) navigateTo(page);
            });
        } else if (submenu) {
            submenu.querySelectorAll('a').forEach(subLink => {
                subLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = item.dataset.page;
                    const subPage = subLink.dataset.subpage;
                    if (page && subPage) navigateTo(page, subPage);
                });
            });
        }
    });
    
    // Sidebar navigation
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
        const link = item.querySelector('.nav-link');
        const submenu = item.querySelector('.submenu');
        
        if (link && !submenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page) navigateTo(page);
            });
        } else if (submenu) {
            submenu.querySelectorAll('a').forEach(subLink => {
                subLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = item.dataset.page;
                    const subPage = subLink.dataset.subpage;
                    if (page && subPage) navigateTo(page, subPage);
                });
            });
        }
    });
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Chat toggle
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatInputForm');
    
    if (chatToggle) chatToggle.addEventListener('click', toggleChat);
    if (chatClose) chatClose.addEventListener('click', closeChat);
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (text) {
                sendChatMessage(text);
                input.value = '';
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeChat();
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        }
    });
}