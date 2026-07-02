// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
// Con búsqueda interna y chat inteligente
// ============================================

let currentUser = null;
let currentPage = 'dashboard';
let isDarkMode = false;
let searchHighlights = [];
let currentHighlightIndex = -1;

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AOMA Campus: Iniciando...');
    
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
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
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
}

function showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    
    document.getElementById('userName').textContent = currentUser.name;
    const roleText = currentUser.role === 'admin' ? 'Administrador' : 
                     currentUser.role === 'dirigente' ? 'Dirigente' : 'Delegado';
    document.getElementById('userRole').textContent = roleText;
    document.getElementById('userAvatar').textContent = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    navigateTo('dashboard');
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    const errorText = document.getElementById('loginErrorText');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    
    setTimeout(() => {
        const user = DATA.usuarios.find(u => u.username === username && u.password === password);
        
        if (!user) {
            errorText.textContent = 'Usuario o contraseña incorrectos';
            errorDiv.classList.remove('hidden');
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            return;
        }
        
        if (!user.active) {
            errorText.textContent = 'Tu cuenta está bloqueada. Contactá al administrador.';
            errorDiv.classList.remove('hidden');
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            return;
        }
        
        currentUser = user;
        localStorage.setItem('aoma_session', JSON.stringify(user));
        errorDiv.classList.add('hidden');
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
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ============================================
// NAVEGACIÓN
// ============================================
function navigateTo(page) {
    currentPage = page;
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
    
    if (window.innerWidth < 1024) {
        document.getElementById('sidebar').classList.add('hidden');
    }
    
    const content = document.getElementById('pageContent');
    content.innerHTML = '<div class="empty-state"><div class="loading-spinner"></div><p>Cargando...</p></div>';
    
    setTimeout(() => {
        renderPage(page, content);
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage(page, container) {
    switch (page) {
        case 'dashboard':
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
        case 'chat':
            openChat();
            renderChatPage(container);
            break;
        default:
            if (page.startsWith('actividad-')) {
                const activityId = page.replace('actividad-', '');
                renderActividad(container, activityId);
            } else {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Página no encontrada</h3></div>';
            }
    }
}

// ============================================
// OBTENER LEYES Y CONVENIOS DE ARCHIVOS SEPARADOS
// ============================================
function getLeyes() {
    const leyes = [];
    if (typeof LEY_LCT_20744 !== 'undefined') leyes.push(LEY_LCT_20744);
    if (typeof LEY_19587 !== 'undefined') leyes.push(LEY_19587);
    if (typeof LEY_24557 !== 'undefined') leyes.push(LEY_24557);
    if (typeof LEY_23551 !== 'undefined') leyes.push(LEY_23551);
    return leyes;
}

function getConvenios() {
    const convenios = [];
    if (typeof CTT_302_75 !== 'undefined') convenios.push(CTT_302_75);
    if (typeof CTT_36_89 !== 'undefined') convenios.push(CTT_36_89);
    if (typeof CTT_238_94 !== 'undefined') convenios.push(CTT_238_94);
    return convenios;
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
            countEl.textContent = '0 resultados';
            btnPrev.disabled = true;
            btnNext.disabled = true;
            return;
        }
        performInternalSearch(query, contentSelector, countEl, btnPrev, btnNext);
    });
    
    btnPrev.addEventListener('click', () => navigateHighlight(-1));
    btnNext.addEventListener('click', () => navigateHighlight(1));
    btnClear.addEventListener('click', () => {
        input.value = '';
        clearHighlights();
        countEl.textContent = '0 resultados';
        btnPrev.disabled = true;
        btnNext.disabled = true;
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            navigateHighlight(1);
        }
        if (e.key === 'Escape') {
            input.value = '';
            clearHighlights();
            countEl.textContent = '0 resultados';
            btnPrev.disabled = true;
            btnNext.disabled = true;
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
    
    countEl.textContent = `${searchHighlights.length} resultado${searchHighlights.length !== 1 ? 's' : ''}`;
    btnPrev.disabled = searchHighlights.length === 0;
    btnNext.disabled = searchHighlights.length === 0;
    
    if (searchHighlights.length > 0) {
        navigateHighlight(1);
    }
}

function navigateHighlight(direction) {
    if (searchHighlights.length === 0) return;
    
    // Quitar active del actual
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
    const convCount = getConvenios().length;
    const cursoCount = DATA.cursos.length;
    const leyCount = getLeyes().length;
    
    container.innerHTML = `
        <div class="page-header">
            <h1>¡Bienvenido, ${currentUser.name.split(' ')[0]}! 👋</h1>
            <p>Aquí está tu resumen de actividad del Campus Virtual AOMA</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">📋</div>
                <div class="stat-value">${convCount}</div>
                <div class="stat-label">Convenios CCT</div>
            </div>
            <div class="stat-card accent">
                <div class="stat-icon">🏭</div>
                <div class="stat-value">${actCount}</div>
                <div class="stat-label">Actividades</div>
            </div>
            <div class="stat-card success">
                <div class="stat-icon">🎓</div>
                <div class="stat-value">${cursoCount}</div>
                <div class="stat-label">Cursos disponibles</div>
            </div>
            <div class="stat-card warning">
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
                    <div class="card" onclick="navigateTo('actividad-${act.id}')">
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
                <div class="stat-icon">‍🏫</div>
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
                <div class="stat-icon"></div>
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
    const convenios = getConvenios();
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Convenios Colectivos de Trabajo </h1>
            <p>Normativas vigentes por actividad</p>
        </div>
        <div class="cards-grid">
            ${convenios.map(c => {
                const act = DATA.actividades[c.actividad];
                return `
                    <div class="card" onclick="showConvenioDetalle('${c.numero}')">
                        <div class="card-header" style="background: var(--gradient-primary);">
                            <i class="fas fa-file-contract"></i>
                            <span class="card-badge">${c.numero}</span>
                        </div>
                        <div class="card-body">
                            <div class="card-category">${act ? act.nombre : c.categoria}</div>
                            <h3 class="card-title">${c.titulo}</h3>
                            <p class="card-description">${c.resumen}</p>
                            <div class="card-meta">
                                <span><i class="far fa-calendar"></i> Actualizado: ${DATA.formatDate(c.actualizado)}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function showConvenioDetalle(numero) {
    const convenios = getConvenios();
    const conv = convenios.find(c => c.numero === numero);
    if (!conv) return;
    
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('convenios')">
                <i class="fas fa-arrow-left"></i> Volver a convenios
            </button>
        </div>
        <div class="section" id="convenioContentSection">
            <div class="card-category" style="margin-bottom: 0.5rem;">${conv.numero}</div>
            <h2 class="section-title" style="margin-bottom: 1rem;">${conv.titulo}</h2>
            <div class="card-meta" style="margin-bottom: 1.5rem;">
                <span><i class="fas fa-tag"></i> ${conv.categoria}</span>
                <span><i class="far fa-calendar"></i> Actualizado: ${DATA.formatDate(conv.actualizado)}</span>
            </div>
            <div class="ley-content" id="convenioLeyContent">
                ${conv.contenido}
            </div>
        </div>
    `;
    
    // Agregar barra de búsqueda después de renderizar
    setTimeout(() => {
        createSearchBar('convenioContentSection', '#convenioLeyContent');
    }, 100);
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
    const leyes = getLeyes();
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Legislación Laboral ⚖️</h1>
            <p>Leyes y normativas laborales aplicables al sector minero</p>
        </div>
        <div class="cards-grid">
            ${leyes.map(l => `
                <div class="card" onclick="showLeyDetalle('${l.numero}')">
                    <div class="card-header" style="background: linear-gradient(135deg, #0b3d91, #1e5fd1);">
                        <i class="fas fa-balance-scale"></i>
                        <span class="card-badge">${l.numero}</span>
                    </div>
                    <div class="card-body">
                        <div class="card-category">${l.categoria}</div>
                        <h3 class="card-title">${l.titulo}</h3>
                        <p class="card-description">${l.resumen}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showLeyDetalle(numero) {
    const leyes = getLeyes();
    const ley = leyes.find(l => l.numero === numero);
    if (!ley) return;
    
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('legislacion')">
                <i class="fas fa-arrow-left"></i> Volver a legislación
            </button>
        </div>
        <div class="section" id="leyContentSection">
            <div class="card-category" style="margin-bottom: 0.5rem;">${ley.numero}</div>
            <h2 class="section-title" style="margin-bottom: 0.5rem;">${ley.titulo}</h2>
            <div class="card-meta" style="margin-bottom: 1.5rem;">
                <span><i class="fas fa-tag"></i> ${ley.categoria}</span>
            </div>
            <div class="ley-content" id="leyLeyContent">
                ${ley.contenido}
            </div>
        </div>
    `;
    
    // Agregar barra de búsqueda después de renderizar
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
    const conveniosAct = getConvenios().filter(c => c.actividad === activityId);
    
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
        
        ${conveniosAct.length > 0 ? `
            <div class="section">
                <div class="section-header">
                    <h2 class="section-title">Convenio Colectivo</h2>
                </div>
                ${conveniosAct.map(c => `
                    <div class="card" onclick="showConvenioDetalle('${c.numero}')" style="cursor: pointer;">
                        <div class="card-body">
                            <div class="card-category">${c.numero}</div>
                            <h3 class="card-title">${c.titulo}</h3>
                            <p class="card-description">${c.resumen}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
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
// CHAT INTELIGENTE MEJORADO
// ============================================
function openChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.remove('hidden');
    initChatMessages();
}

function closeChat() {
    document.getElementById('chatWindow').classList.add('hidden');
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow.classList.contains('hidden')) {
        openChat();
    } else {
        closeChat();
    }
}

function initChatMessages() {
    const messages = document.getElementById('chatMessages');
    const quickReplies = document.getElementById('chatQuickReplies');
    
    if (messages.children.length === 0) {
        addChatMessage('bot', `¡Hola ${currentUser.name.split(' ')[0]}!  Soy el asistente virtual de AOMA San Juan. Puedo ayudarte con:\n\n•  Convenios colectivos (CTT 302/75, 36/89, 238/94)\n• ⚖️ Leyes laborales (LCT 20.744, Ley 19.587, etc.)\n• 💰 Escalas salariales\n• 🎓 Cursos y capacitaciones\n\n¿En qué puedo ayudarte?`);
    }
    
    if (quickReplies.children.length === 0) {
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
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
    
    setTimeout(() => {
        document.getElementById('typingIndicator')?.remove();
        const response = getBotResponse(text);
        addChatMessage('bot', response);
    }, 800 + Math.random() * 500);
}

function addChatMessage(type, text) {
    const messages = document.getElementById('chatMessages');
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

// ============================================
// CHAT INTELIGENTE - BÚSQUEDA EN CONTENIDO COMPLETO
// ============================================
function getBotResponse(userMessage) {
    const q = userMessage.toLowerCase().trim();
    
    // Saludos
    if (/^(hola|buenas|buenos días|buenas tardes)/.test(q)) {
        return `¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?`;
    }
    if (q.includes('gracias')) {
        return '¡De nada! 😊 Estoy aquí para lo que necesites.';
    }
    
    // Buscar en respuestas predefinidas del chat
    for (const [patterns, response] of Object.entries(DATA.chatResponses)) {
        if (patterns === 'default') continue;
        const patternList = patterns.split('|');
        if (patternList.some(p => q.includes(p))) {
            return response;
        }
    }
    
    // Buscar en FAQs
    for (const [cat, faqs] of Object.entries(DATA.faqs)) {
        for (const faq of faqs) {
            if (faq.pregunta.toLowerCase().includes(q) || faq.respuesta.toLowerCase().includes(q)) {
                return ` <strong>${faq.pregunta}</strong><br><br>${faq.respuesta}`;
            }
        }
    }
    
    // Buscar en contenido COMPLETO de convenios (no solo título/resumen)
    const convenios = getConvenios();
    for (const conv of convenios) {
        const contenidoLimpio = conv.contenido.replace(/<[^>]*>/g, ' ').toLowerCase();
        if (contenidoLimpio.includes(q)) {
            // Encontrar el artículo/sección donde aparece
            const match = findRelevantSection(conv.contenido, q);
            return ` <strong>${conv.numero} - ${conv.titulo}</strong><br><br>${match}<br><br>Podés consultar el convenio completo en "Convenios CCT" y usar la barra de búsqueda para encontrar más detalles.`;
        }
        if (conv.titulo.toLowerCase().includes(q) || conv.resumen.toLowerCase().includes(q)) {
            return `📋 Encontré: <strong>${conv.titulo}</strong><br><br>${conv.resumen}<br><br>Podés consultarlo completo en "Convenios CCT".`;
        }
    }
    
    // Buscar en contenido COMPLETO de leyes
    const leyes = getLeyes();
    for (const ley of leyes) {
        const contenidoLimpio = ley.contenido.replace(/<[^>]*>/g, ' ').toLowerCase();
        if (contenidoLimpio.includes(q)) {
            const match = findRelevantSection(ley.contenido, q);
            return `⚖️ <strong>${ley.numero} - ${ley.titulo}</strong><br><br>${match}<br><br>Podés consultar la ley completa en "Legislación" y usar la barra de búsqueda para encontrar más detalles.`;
        }
        if (ley.titulo.toLowerCase().includes(q) || ley.resumen.toLowerCase().includes(q)) {
            return `⚖️ <strong>${ley.numero} - ${ley.titulo}</strong><br><br>${ley.resumen}`;
        }
    }
    
    // Buscar en cursos
    for (const curso of DATA.cursos) {
        if (curso.titulo.toLowerCase().includes(q) || curso.descripcion.toLowerCase().includes(q)) {
            return `🎓 Encontré el curso: <strong>${curso.titulo}</strong><br><br>${curso.descripcion}<br><br>Duración: ${curso.duracion} | Nivel: ${curso.nivel}`;
        }
    }
    
    // Respuesta por defecto
    return `No encontré información específica sobre "${userMessage}". Te recomiendo:<br><br>1️⃣ Revisar las secciones del menú lateral<br>2️⃣ Usar la barra de búsqueda dentro de cada ley o convenio<br>3️⃣ Contactar a la Seccional al (0264) 422-XXXX<br><br>¿Hay algo más en lo que pueda ayudarte?`;
}

// Función auxiliar para encontrar la sección relevante del contenido
function findRelevantSection(contenidoHTML, query) {
    // Buscar el artículo o sección que contiene la palabra clave
    const regex = new RegExp(`(<h[34][^>]*>.*?${escapeRegExp(query)}.*?</h[34]>)(.*?)(?=<h[34]|$)`, 'is');
    const match = contenidoHTML.match(regex);
    
    if (match) {
        // Devolver el título y un fragmento del contenido
        const titulo = match[1].replace(/<[^>]*>/g, '');
        const contenido = match[2].replace(/<[^>]*>/g, '').trim().substring(0, 300);
        return `<strong>${titulo}</strong><br><br>${contenido}${contenido.length >= 300 ? '...' : ''}`;
    }
    
    // Si no encuentra sección específica, devolver un fragmento genérico
    const textoLimpio = contenidoHTML.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const idx = textoLimpio.toLowerCase().indexOf(query);
    if (idx !== -1) {
        const inicio = Math.max(0, idx - 100);
        const fin = Math.min(textoLimpio.length, idx + query.length + 200);
        const fragmento = textoLimpio.substring(inicio, fin);
        return `...${fragmento}...`;
    }
    
    return 'Información disponible en el documento.';
}

function renderChatPage(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1>Consultas Virtuales 💬</h1>
            <p>Hacé tus consultas al asistente virtual de AOMA</p>
        </div>
        <div class="section" style="padding: 0; overflow: hidden;">
            <div style="height: 500px; display: flex; flex-direction: column;">
                <div id="chatPageMessages" style="flex: 1; overflow-y: auto; padding: 1.5rem; background: var(--bg-input);">
                    <div class="chat-welcome" style="text-align: center; padding: 2rem;">
                        <div style="width: 80px; height: 80px; background: var(--gradient-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem;">
                            <i class="fas fa-robot"></i>
                        </div>
                        <h2 style="color: var(--text-primary); margin-bottom: 0.5rem;">¡Hola ${currentUser.name.split(' ')[0]}! 👋</h2>
                        <p style="color: var(--text-secondary);">Soy el asistente virtual de AOMA San Juan.</p>
                    </div>
                </div>
                <form onsubmit="handleChatPageSubmit(event)" style="padding: 1rem; border-top: 1px solid var(--border); display: flex; gap: 0.5rem;">
                    <input type="text" id="chatPageInput" placeholder="Escribí tu consulta..." style="flex: 1; padding: 0.75rem 1rem; border: 1px solid var(--border); border-radius: var(--radius-full); font-family: inherit;" autocomplete="off">
                    <button type="submit" style="width: 44px; height: 44px; background: var(--gradient-primary); border: none; border-radius: 50%; color: white; cursor: pointer;">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    `;
}

function handleChatPageSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chatPageInput');
    const text = input.value.trim();
    if (!text) return;
    
    const container = document.getElementById('chatPageMessages');
    const welcome = container.querySelector('.chat-welcome');
    if (welcome) welcome.remove();
    
    addChatPageMessage('user', text);
    input.value = '';
    
    setTimeout(() => {
        const response = getBotResponse(text);
        addChatPageMessage('bot', response);
    }, 800);
}

function addChatPageMessage(type, text) {
    const container = document.getElementById('chatPageMessages');
    const div = document.createElement('div');
    div.className = 'chat-message ' + type;
    div.style.marginBottom = '1rem';
    
    const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const avatar = type === 'user' 
        ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : '<i class="fas fa-robot"></i>';
    
    div.innerHTML = `
        <div class="chat-message-avatar">${avatar}</div>
        <div>
            <div class="chat-message-content">${text}</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${time}</div>
        </div>
    `;
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// ============================================
// MODO OSCURO
// ============================================
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
    localStorage.setItem('aoma_theme', isDarkMode ? 'dark' : 'light');
    
    const icon = document.querySelector('#themeBtn i');
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
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
// EVENTOS
// ============================================
function setupEvents() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('hidden');
        });
    }
    
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const menuBtn = document.getElementById('menuBtn');
        
        if (window.innerWidth < 1024 && sidebar && menuBtn) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.add('hidden');
            }
        }
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const page = item.dataset.page;
            if (page) {
                navigateTo(page);
            }
        });
    });
    
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    const chatBtn = document.getElementById('chatBtn');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    
    if (chatBtn) chatBtn.addEventListener('click', toggleChat);
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
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            document.getElementById('sidebar').classList.remove('hidden');
        }
    });
}