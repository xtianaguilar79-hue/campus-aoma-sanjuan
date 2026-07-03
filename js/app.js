// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
// Menú estilo UG Noticias Mineras
// ============================================

let currentUser = null;
let currentPage = 'inicio';
let searchHighlights = [];
let currentHighlightIndex = -1;

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AOMA Campus: Iniciando...');
    
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

function showLogin() {
    const html = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">
            <div style="background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 20px 25px rgba(0,0,0,0.15); width: 100%; max-width: 420px;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #dc2626, #ef4444); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; margin: 0 auto 1rem;">
                        <i class="fas fa-mountain"></i>
                    </div>
                    <h1 style="font-size: 1.5rem; color: #1e3a8a; margin-bottom: 0.5rem;">Campus Virtual AOMA</h1>
                    <p style="color: #6b7280; font-size: 0.875rem;">Asociación Obrera Minera Argentina<br>Seccional San Juan</p>
                </div>
                <form id="loginForm">
                    <div style="margin-bottom: 1.25rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #1a2238;">
                            <i class="fas fa-user" style="color: #dc2626;"></i> Usuario
                        </label>
                        <input type="text" id="username" style="width: 100%; padding: 0.75rem 1rem; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;" placeholder="admin o delegado" required>
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #1a2238;">
                            <i class="fas fa-lock" style="color: #dc2626;"></i> Contraseña
                        </label>
                        <input type="password" id="password" style="width: 100%; padding: 0.75rem 1rem; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;" placeholder="admin o 1234" required>
                    </div>
                    <button type="submit" style="width: 100%; padding: 0.875rem; background: linear-gradient(135deg, #dc2626, #ef4444); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Ingresar al Campus</button>
                </form>
                <div style="text-align: center; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; font-size: 0.75rem; color: #6b7280; line-height: 1.8;">
                    <p><strong>Demo:</strong> usuario: <code style="background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 4px; color: #dc2626;">admin</code> | pass: <code style="background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 4px; color: #dc2626;">admin</code></p>
                    <p><strong>Delegado:</strong> usuario: <code style="background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 4px; color: #dc2626;">delegado</code> | pass: <code style="background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 4px; color: #dc2626;">1234</code></p>
                </div>
            </div>
        </div>
    `;
    document.body.innerHTML = html;
    
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        
        const user = DATA.usuarios.find(u => u.username === username && u.password === password);
        
        if (user && user.active) {
            currentUser = user;
            localStorage.setItem('aoma_session', JSON.stringify(user));
            location.reload();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
}

function showApp() {
    document.getElementById('userName').textContent = currentUser.name;
    const roleText = currentUser.role === 'admin' ? 'Administrador' : 
                     currentUser.role === 'dirigente' ? 'Dirigente' : 'Delegado';
    document.getElementById('userRole').textContent = roleText;
    document.getElementById('userAvatar').textContent = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    navigateTo('inicio');
}

function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('aoma_session');
        location.reload();
    }
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
    localStorage.setItem('aoma_theme', isDark ? 'light' : 'dark');
    
    const icon = document.querySelector('#themeBtn i');
    if (icon) {
        icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ============================================
// NAVEGACIÓN
// ============================================
function navigateTo(page) {
    currentPage = page;
    
    document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.page === page);
    });
    
    document.querySelectorAll('.mobile-nav-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.page === page);
    });
    
    closeMobileMenu();
    
    const content = document.getElementById('pageContent');
    content.innerHTML = '<div class="empty-state"><i class="fas fa-spinner fa-spin"></i><h3>Cargando...</h3></div>';
    
    setTimeout(() => {
        renderPage(page, content);
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage(page, container) {
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
            if (page.startsWith('actividad-')) {
                const activityId = page.replace('actividad-', '');
                renderActividad(container, activityId);
            } else {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Página no encontrada</h3></div>';
            }
    }
}

function getLeyes() {
    const leyes = [];
    if (typeof LEY_LCT_20744 !== 'undefined') leyes.push(LEY_LCT_20744);
    if (typeof LEY_19587 !== 'undefined') leyes.push(LEY_19587);
    if (typeof LEY_23551 !== 'undefined') leyes.push(LEY_23551);
    if (typeof LEY_24557 !== 'undefined') leyes.push(LEY_24557);
    if (typeof LEY_24013 !== 'undefined') leyes.push(LEY_24013);
    return leyes;
}

function getConvenios() {
    const convenios = [];
    if (typeof CTT_302_75 !== 'undefined') convenios.push(CTT_302_75);
    if (typeof CTT_36_89 !== 'undefined') convenios.push(CTT_36_89);
    if (typeof CTT_238_94 !== 'undefined') convenios.push(CTT_238_94);
    if (convenios.length === 0 && DATA.convenios) return DATA.convenios;
    return convenios;
}

// ============================================
// EVENTOS
// ============================================
function setupEvents() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            navigateTo(pill.dataset.page);
        });
    });
    
    document.querySelectorAll('.mobile-nav-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            navigateTo(pill.dataset.page);
        });
    });
    
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('userDropdown').classList.toggle('active');
        });
    }
    
    document.addEventListener('click', () => {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('active');
    });
    
    const chatBtn = document.getElementById('chatBtn');
    const chatClose = document.getElementById('chatClose');
    const chatWindow = document.getElementById('chatWindow');
    const chatForm = document.getElementById('chatForm');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }
    
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (text) {
                addChatMessage('user', text);
                input.value = '';
                setTimeout(() => {
                    addChatMessage('bot', getBotResponse(text));
                }, 800);
            }
        });
    }
}

function closeMobileMenu() {
    document.getElementById('mobileMenu')?.classList.remove('active');
    document.getElementById('mobileMenuOverlay')?.classList.remove('active');
}

// ============================================
// BÚSQUEDA DENTRO DEL CONTENIDO
// ============================================
function setupContentSearch(contentSelector) {
    const searchInput = document.getElementById('contentSearchInput');
    const searchCount = document.getElementById('contentSearchCount');
    const btnPrev = document.getElementById('contentSearchPrev');
    const btnNext = document.getElementById('contentSearchNext');
    const btnClear = document.getElementById('contentSearchClear');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query.length < 2) {
            clearContentHighlights();
            if (searchCount) searchCount.textContent = '0 resultados';
            if (btnPrev) btnPrev.disabled = true;
            if (btnNext) btnNext.disabled = true;
            return;
        }
        performContentSearch(query, contentSelector, searchCount, btnPrev, btnNext);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            navigateHighlight(1);
        }
        if (e.key === 'Escape') {
            searchInput.value = '';
            clearContentHighlights();
            if (searchCount) searchCount.textContent = '0 resultados';
            if (btnPrev) btnPrev.disabled = true;
            if (btnNext) btnNext.disabled = true;
        }
    });
    
    if (btnPrev) {
        btnPrev.addEventListener('click', () => navigateHighlight(-1));
    }
    
    if (btnNext) {
        btnNext.addEventListener('click', () => navigateHighlight(1));
    }
    
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            searchInput.value = '';
            clearContentHighlights();
            if (searchCount) searchCount.textContent = '0 resultados';
            if (btnPrev) btnPrev.disabled = true;
            if (btnNext) btnNext.disabled = true;
        });
    }
}

function performContentSearch(query, contentSelector, countEl, btnPrev, btnNext) {
    clearContentHighlights();
    
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
    
    if (countEl) {
        countEl.textContent = `${searchHighlights.length} resultado${searchHighlights.length !== 1 ? 's' : ''}`;
    }
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

function clearContentHighlights() {
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
// RENDERIZADO
// ============================================
function renderDashboard(container) {
    const actCount = Object.keys(DATA.actividades).length;
    const convenios = getConvenios();
    const convCount = convenios.length;
    const cursoCount = DATA.cursos.length;
    const leyes = getLeyes();
    const leyCount = leyes.length;
    
    container.innerHTML = `
        <div class="page-header">
            <h1>¡Bienvenido, ${currentUser.name.split(' ')[0]}! 👋</h1>
            <p>Aquí está tu resumen de actividad del Campus Virtual AOMA</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card" onclick="navigateTo('convenios')">
                <div class="stat-icon">📋</div>
                <div class="stat-value">${convCount}</div>
                <div class="stat-label">Convenios CCT</div>
            </div>
            <div class="stat-card accent" onclick="navigateTo('actividad-mineria-extractiva')">
                <div class="stat-icon">🏭</div>
                <div class="stat-value">${actCount}</div>
                <div class="stat-label">Actividades</div>
            </div>
            <div class="stat-card success" onclick="navigateTo('cursos')">
                <div class="stat-icon">🎓</div>
                <div class="stat-value">${cursoCount}</div>
                <div class="stat-label">Cursos disponibles</div>
            </div>
            <div class="stat-card warning" onclick="navigateTo('legislacion')">
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
        <div class="section">
            <h2 class="section-title">Contenido del curso</h2>
            <div style="line-height: 1.8; color: var(--text-secondary); margin-top: 1rem;">
                ${curso.contenido}
            </div>
        </div>
    `;
}

function renderConvenios(container) {
    const convenios = getConvenios();
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Convenios Colectivos de Trabajo 📋</h1>
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
        
        <!-- BARRA DE BÚSQUEDA FIJA -->
        <div class="content-search-bar">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="contentSearchInput" placeholder="Buscar en este documento... (ej: vacaciones, despido, salario)">
            <span class="search-count" id="contentSearchCount">0 resultados</span>
            <button class="btn-search-nav" id="contentSearchPrev" title="Anterior" disabled>
                <i class="fas fa-chevron-up"></i>
            </button>
            <button class="btn-search-nav" id="contentSearchNext" title="Siguiente" disabled>
                <i class="fas fa-chevron-down"></i>
            </button>
            <button class="btn-search-nav" id="contentSearchClear" title="Limpiar búsqueda">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="section">
            <div class="card-category" style="margin-bottom: 0.5rem;">${conv.numero}</div>
            <h2 class="section-title" style="margin-bottom: 1rem;">${conv.titulo}</h2>
            <div class="ley-content" id="convenioContent">
                ${conv.contenido}
            </div>
        </div>
    `;
    
    // Inicializar búsqueda después de renderizar
    setTimeout(() => {
        setupContentSearch('#convenioContent');
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
                        <i class="fas ${act ? act.icono : 'fa-money-bill-wave'}"></i>
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
                    <div class="card-header" style="background: var(--gradient-primary);">
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
        
        <!-- BARRA DE BÚSQUEDA FIJA -->
        <div class="content-search-bar">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="contentSearchInput" placeholder="Buscar en esta ley... (ej: vacaciones, despido, salario)">
            <span class="search-count" id="contentSearchCount">0 resultados</span>
            <button class="btn-search-nav" id="contentSearchPrev" title="Anterior" disabled>
                <i class="fas fa-chevron-up"></i>
            </button>
            <button class="btn-search-nav" id="contentSearchNext" title="Siguiente" disabled>
                <i class="fas fa-chevron-down"></i>
            </button>
            <button class="btn-search-nav" id="contentSearchClear" title="Limpiar búsqueda">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="section">
            <div class="card-category" style="margin-bottom: 0.5rem;">${ley.numero}</div>
            <h2 class="section-title" style="margin-bottom: 0.5rem;">${ley.titulo}</h2>
            <div class="ley-content" id="leyContent">
                ${ley.contenido}
            </div>
        </div>
    `;
    
    // Inicializar búsqueda después de renderizar
    setTimeout(() => {
        setupContentSearch('#leyContent');
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
    if (item) item.classList.toggle('open');
}

function renderActividad(container, activityId) {
    const act = DATA.actividades[activityId];
    if (!act) {
        container.innerHTML = '<div class="empty-state"><h3>Actividad no encontrada</h3></div>';
        return;
    }
    
    const cursosAct = DATA.cursos.filter(c => c.actividad === activityId);
    const conveniosAct = getConvenios().filter(c => c.actividad === activityId);
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
    `;
}

// ============================================
// CHAT
// ============================================
function addChatMessage(type, text) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    
    const div = document.createElement('div');
    div.className = 'chat-message ' + type;
    
    const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute:'2-digit' });
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
    
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(userMessage) {
    const q = userMessage.toLowerCase().trim();
    
    if (/^(hola|buenas|buenos días)/.test(q)) {
        return `¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte?`;
    }
    if (q.includes('gracias')) return '¡De nada! 😊';
    
    if (q.includes('escala') || q.includes('salarial') || q.includes('sueldo')) {
        return '💰 Podés consultar las escalas salariales en el menú → "Escalas Salariales".';
    }
    if (q.includes('convenio') || q.includes('ctt')) {
        return '📋 Tenemos convenios cargados: CTT 302/75, CTT 36/89 y CTT 238/94. Consultalos en "Convenios CCT".';
    }
    if (q.includes('ley') || q.includes('legislación')) {
        return '⚖️ Tenemos leyes laborales cargadas. Consultalas en "Legislación".';
    }
    if (q.includes('curso') || q.includes('capacitacion')) {
        return `🎓 Tenemos ${DATA.cursos.length} cursos disponibles. Ver en "Capacitaciones".`;
    }
    
    return 'No encontré información específica. Te recomiendo revisar las secciones del menú o contactar a la Seccional al (0264) 422-XXXX.';
}
