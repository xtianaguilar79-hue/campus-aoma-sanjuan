// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
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

// ============================================
// LOGIN / LOGOUT
// ============================================
function showLogin() {
    const html = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);">
            <div style="background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 20px 25px rgba(0,0,0,0.15); width: 100%; max-width: 420px;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #f47b20, #f69b4c); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; margin: 0 auto 1rem;">
                        <i class="fas fa-mountain"></i>
                    </div>
                    <h1 style="font-size: 1.5rem; color: #1a1a1a; margin-bottom: 0.5rem;">Campus Virtual AOMA</h1>
                    <p style="color: #6b7280; font-size: 0.875rem;">Asociación Obrera Minera Argentina<br>Seccional San Juan</p>
                </div>
                <form id="loginForm">
                    <div style="margin-bottom: 1.25rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #1a1a1a;">
                            <i class="fas fa-user" style="color: #f47b20;"></i> Usuario
                        </label>
                        <input type="text" id="username" style="width: 100%; padding: 0.75rem 1rem; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;" placeholder="admin o delegado" required>
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #1a1a1a;">
                            <i class="fas fa-lock" style="color: #f47b20;"></i> Contraseña
                        </label>
                        <input type="password" id="password" style="width: 100%; padding: 0.75rem 1rem; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;" placeholder="admin o 1234" required>
                    </div>
                    <button type="submit" style="width: 100%; padding: 0.875rem; background: linear-gradient(135deg, #f47b20, #f69b4c); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Ingresar al Campus</button>
                </form>
                <div style="text-align: center; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; font-size: 0.75rem; color: #6b7280; line-height: 1.8;">
                    <p><strong>Demo:</strong> usuario: <code style="background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 4px; color: #f47b20;">admin</code> | pass: <code style="background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 4px; color: #f47b20;">admin</code></p>
                    <p><strong>Delegado:</strong> usuario: <code style="background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 4px; color: #f47b20;">delegado</code> | pass: <code style="background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 4px; color: #f47b20;">1234</code></p>
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
        case 'beneficios':
            renderBeneficios(container);
            break;
        case 'convenios':
            renderConveniosGeneral(container);
            break;
        case 'convenios-mineria':
            renderConveniosPorActividad(container, 'mineria-extractiva');
            break;
        case 'convenios-cemento':
            renderConveniosPorActividad(container, 'cemento');
            break;
        case 'convenios-cal':
            renderConveniosPorActividad(container, 'cal-piedra');
            break;
        case 'convenios-molienda':
            renderConveniosPorActividad(container, 'molienda');
            break;
        case 'empresa-veladero':
            renderEmpresa(container, 'veladero');
            break;
        case 'empresa-gualcamayo':
            renderEmpresa(container, 'gualcamayo');
            break;
        case 'empresa-vicuna':
            renderEmpresa(container, 'vicuna');
            break;
        case 'legislacion':
            renderLegislacion(container);
            break;
        case 'faq':
            renderFAQ(container);
            break;
        case 'gremio':
            renderOrganigrama(container);
            break;
        default:
            container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Página no encontrada</h3></div>';
    }
}

// ============================================
// RENDERIZADO - ORGANIGRAMA (El Gremio) CON FUNCIONES
// ============================================
function renderOrganigrama(container) {
    const auth = DATA.autoridades;
    if (!auth) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><h3>No hay datos de autoridades</h3></div>';
        return;
    }
    
    // Función para renderizar lista de nombres
    const renderList = (arr) => arr.map((n, i) => `<li>${i+1}. ${n}</li>`).join('');
    
    // Función para renderizar comisión directiva con funciones desplegables
    const renderComision = (comision, funciones) => {
        return comision.map(m => {
            const funcDesc = funciones[m.cargo] || 'Sin descripción de funciones.';
            return `
                <li>
                    <strong>${m.cargo}:</strong> ${m.nombre}
                    <button class="btn-funcion" onclick="this.nextElementSibling.classList.toggle('visible')">
                        <i class="fas fa-info-circle"></i> Ver función
                    </button>
                    <div class="funcion-detalle" style="display:none; padding: 0.5rem; margin-top: 0.25rem; background: var(--bg-input); border-radius: var(--radius); font-size: 0.85rem; color: var(--text-secondary);">
                        ${funcDesc}
                    </div>
                </li>
            `;
        }).join('');
    };
    
    container.innerHTML = `
        <div class="page-header">
            <h1>📋 Estructura Orgánica de AOMA</h1>
            <p>Autoridades nacionales y de la Seccional San Juan</p>
        </div>
        
        <!-- ORGANIGRAMA NACIONAL -->
        <div class="section organigrama-section">
            <h2 class="section-title" style="margin-bottom: 1.5rem;">🇦🇷 Consejo Directivo Nacional</h2>
            <div class="organigrama-card">
                <div class="organigrama-header" style="background: var(--gradient-primary);">
                    <h3>${auth.nacional.nombre}</h3>
                    <p>${auth.nacional.agrupacion} - ${auth.nacional.periodo}</p>
                </div>
                <div class="organigrama-body">
                    <div class="organigrama-grid">
                        <div class="organigrama-col">
                            <h4>Comisión Directiva</h4>
                            <ul class="organigrama-lista">
                                ${renderComision(auth.nacional.comisionDirectiva, auth.nacional.funciones)}
                            </ul>
                        </div>
                        <div class="organigrama-col">
                            <h4>Vocales Titulares</h4>
                            <ul class="organigrama-lista">${renderList(auth.nacional.vocalesTitulares)}</ul>
                        </div>
                        <div class="organigrama-col">
                            <h4>Vocales Suplentes</h4>
                            <ul class="organigrama-lista">${renderList(auth.nacional.vocalesSuplentes)}</ul>
                        </div>
                        <div class="organigrama-col">
                            <h4>Comisión Revisora de Cuentas</h4>
                            <p><strong>Titulares:</strong></p>
                            <ul class="organigrama-lista">${renderList(auth.nacional.comisionRevisora.titulares)}</ul>
                            <p><strong>Suplentes:</strong></p>
                            <ul class="organigrama-lista">${renderList(auth.nacional.comisionRevisora.suplentes)}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ORGANIGRAMA PROVINCIAL -->
        <div class="section organigrama-section">
            <h2 class="section-title" style="margin-bottom: 1.5rem;">🏔️ Seccional San Juan</h2>
            <div class="organigrama-card">
                <div class="organigrama-header" style="background: var(--gradient-accent);">
                    <h3>${auth.provincial.nombre}</h3>
                    <p>${auth.provincial.agrupacion} - ${auth.provincial.periodo}</p>
                </div>
                <div class="organigrama-body">
                    <div class="organigrama-grid">
                        <div class="organigrama-col">
                            <h4>Comisión Directiva</h4>
                            <ul class="organigrama-lista">
                                ${renderComision(auth.provincial.comisionDirectiva, auth.provincial.funciones)}
                            </ul>
                        </div>
                        <div class="organigrama-col">
                            <h4>Vocales Titulares</h4>
                            <ul class="organigrama-lista">${renderList(auth.provincial.vocalesTitulares)}</ul>
                        </div>
                        <div class="organigrama-col">
                            <h4>Vocales Suplentes</h4>
                            <ul class="organigrama-lista">${renderList(auth.provincial.vocalesSuplentes)}</ul>
                        </div>
                        <div class="organigrama-col">
                            <h4>Delegados Congresales Titulares</h4>
                            <ul class="organigrama-lista">${renderList(auth.provincial.delegadosCongresalesTitulares)}</ul>
                        </div>
                        <div class="organigrama-col">
                            <h4>Delegados Congresales Suplentes</h4>
                            <ul class="organigrama-lista">${renderList(auth.provincial.delegadosCongresalesSuplentes)}</ul>
                        </div>
                        <div class="organigrama-col">
                            <h4>Comisión Revisora de Cuentas</h4>
                            <p><strong>Titulares:</strong></p>
                            <ul class="organigrama-lista">${renderList(auth.provincial.comisionRevisora.titulares)}</ul>
                            <p><strong>Suplentes:</strong></p>
                            <ul class="organigrama-lista">${renderList(auth.provincial.comisionRevisora.suplentes)}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// OBTENER DATOS
// ============================================
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
    return DATA.convenios.map(conv => {
        if (conv.variable && typeof window[conv.variable] !== 'undefined') {
            const contenidoGlobal = window[conv.variable];
            return {
                ...conv,
                contenido: contenidoGlobal.contenido || contenidoGlobal
            };
        }
        return conv;
    });
}

function getCapacitaciones() {
    const cursos = [];
    
    if (DATA.cursos && DATA.cursos.length > 0) {
        cursos.push(...DATA.cursos);
    }
    
    if (typeof window !== 'undefined' && window.CAPACITACIONES_REGISTRO) {
        Object.values(window.CAPACITACIONES_REGISTRO).forEach(cap => {
            const existe = cursos.some(c => c.id === cap.id);
            if (!existe) {
                cursos.push(cap);
            }
        });
    }
    
    if (typeof window !== 'undefined') {
        for (const key in window) {
            if (key.startsWith('CAPACITACION_') && key !== 'CAPACITACIONES_REGISTRO') {
                const cap = window[key];
                if (cap && cap.id && cap.titulo && cap.modulosData) {
                    const existe = cursos.some(c => c.id === cap.id);
                    if (!existe) {
                        cursos.push(cap);
                    }
                }
            }
        }
    }
    
    return cursos;
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
            if (mobileMenu) mobileMenu.classList.add('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            if (!pill.closest('.nav-dropdown')) {
                navigateTo(pill.dataset.page);
            } else if (pill.dataset.page) {
                navigateTo(pill.dataset.page);
            }
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
            const dropdown = document.getElementById('userDropdown');
            if (dropdown) dropdown.classList.toggle('active');
        });
    }
    
    document.addEventListener('click', () => {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('active');
    });
    
    const chatBtn = document.getElementById('chatBtn');
    const chatClose = document.getElementById('chatClose');
    const chatWindow = document.getElementById('chatWindow');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            if (chatWindow) chatWindow.classList.toggle('hidden');
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            if (chatWindow) chatWindow.classList.add('hidden');
        });
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
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
    
    if (btnPrev) btnPrev.addEventListener('click', () => navigateHighlight(-1));
    if (btnNext) btnNext.addEventListener('click', () => navigateHighlight(1));
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
    
    const walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT, {
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
    });
    
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
// RENDERIZADO - DASHBOARD (MEJORADO)
// ============================================
function renderDashboard(container) {
    const convenios = getConvenios();
    const convCount = convenios.length;
    const cursos = getCapacitaciones();
    const cursoCount = cursos.length;
    const leyes = getLeyes();
    const leyCount = leyes.length;
    const benefCount = Object.keys(DATA.beneficios).length;
    
    container.innerHTML = `
        <div class="page-header">
            <h1>¡Bienvenido, ${currentUser.name.split(' ')[0]}! 👋</h1>
            <p>Panel de control del Campus Virtual AOMA San Juan</p>
        </div>
        
        <!-- TARJETAS DE ESTADÍSTICAS PROFESIONALES -->
        <div class="stats-grid">
            <div class="stat-card accent" onclick="navigateTo('convenios')">
                <div class="stat-icon-wrapper">
                    <i class="fas fa-file-contract"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${convCount}</div>
                    <div class="stat-label">Convenios CCT</div>
                </div>
                <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
            </div>
            
            <div class="stat-card success" onclick="navigateTo('beneficios')">
                <div class="stat-icon-wrapper">
                    <i class="fas fa-gift"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${benefCount}</div>
                    <div class="stat-label">Categorías de Beneficios</div>
                </div>
                <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
            </div>
            
            <div class="stat-card warning" onclick="navigateTo('cursos')">
                <div class="stat-icon-wrapper">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${cursoCount}</div>
                    <div class="stat-label">Cursos disponibles</div>
                </div>
                <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
            </div>
            
            <div class="stat-card" onclick="navigateTo('legislacion')" style="--stat-color: #6b7280;">
                <div class="stat-icon-wrapper" style="background: linear-gradient(135deg, #6b7280, #4b5563); box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);">
                    <i class="fas fa-balance-scale"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${leyCount}</div>
                    <div class="stat-label">Leyes laborales</div>
                </div>
                <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
        
        <!-- SECCIÓN ACCESOS RÁPIDOS -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Accesos Rápidos</h2>
            </div>
            <div class="cards-grid">
                <div class="card" onclick="navigateTo('beneficios')" style="cursor: pointer;">
                    <div class="card-header" style="background: linear-gradient(135deg, #10b981, #059669);">
                        <i class="fas fa-gift"></i>
                        <span class="card-badge">Nuevo</span>
                    </div>
                    <div class="card-body">
                        <div class="card-category">Beneficios</div>
                        <h3 class="card-title">Beneficios Sociales</h3>
                        <p class="card-description">Reintegros de medicamentos, estadías en hoteles, kits escolares, becas y más.</p>
                    </div>
                </div>
                <div class="card" onclick="navigateTo('convenios')" style="cursor: pointer;">
                    <div class="card-header" style="background: var(--gradient-primary);">
                        <i class="fas fa-file-contract"></i>
                    </div>
                    <div class="card-body">
                        <div class="card-category">Convenios</div>
                        <h3 class="card-title">Convenios CCT</h3>
                        <p class="card-description">Por actividad y por empresa. Consultá tu convenio colectivo.</p>
                    </div>
                </div>
                <div class="card" onclick="navigateTo('legislacion')" style="cursor: pointer;">
                    <div class="card-header" style="background: var(--gradient-accent);">
                        <i class="fas fa-balance-scale"></i>
                    </div>
                    <div class="card-body">
                        <div class="card-category">Legal</div>
                        <h3 class="card-title">Legislación Laboral</h3>
                        <p class="card-description">LCT, Ley de Higiene, Asociaciones Sindicales y más.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ESTRUCTURA DE AOMA -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Estructura de AOMA San Juan</h2>
            </div>
            <div class="cards-grid">
                ${Object.values(DATA.actividades).map(act => `
                    <div class="card" onclick="navigateTo('convenios-${act.id === 'mineria-extractiva' ? 'mineria' : act.id === 'cal-piedra' ? 'cal' : act.id}')" style="cursor: pointer;">
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
        
        <!-- ÚLTIMAS NOTICIAS -->
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

// ============================================
// RENDERIZADO - BENEFICIOS
// ============================================
function renderBeneficios(container) {
    const beneficios = DATA.beneficios;
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Beneficios Sociales 🎁</h1>
            <p>Beneficios exclusivos para afiliados titulares y grupo familiar primario (Revisión Julio 2026)</p>
        </div>
        
        <div class="section" style="background: var(--gradient-primary); color: white; border: none;">
            <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                <i class="fas fa-info-circle" style="font-size: 2rem;"></i>
                <div>
                    <h3 style="color: white; margin-bottom: 0.25rem; font-size: 1.125rem;">Importante</h3>
                    <p style="color: rgba(255,255,255,0.9); font-size: 0.9375rem; margin: 0;">
                        Los beneficios aplican para el afiliado titular y grupo familiar primario declarado en CODEM de ANSES.
                    </p>
                </div>
            </div>
        </div>
        
        <div class="stats-grid" style="margin-bottom: 2rem;">
            <div class="stat-card">
                <div class="stat-icon">💊</div>
                <div class="stat-value">30-40%</div>
                <div class="stat-label">Reintegros de Medicamentos y Anteojos</div>
            </div>
            <div class="stat-card success">
                <div class="stat-icon">🏨</div>
                <div class="stat-value">8</div>
                <div class="stat-label">Hoteles AOMA/OSAM</div>
            </div>
            <div class="stat-card warning">
                <div class="stat-icon">🎓</div>
                <div class="stat-value">Becas</div>
                <div class="stat-label">Terciarios y Universitarios</div>
            </div>
            <div class="stat-card accent">
                <div class="stat-icon">💰</div>
                <div class="stat-value">$100K</div>
                <div class="stat-label">Subsidio por Fallecimiento</div>
            </div>
        </div>
        
        ${Object.entries(beneficios).map(([catId, categoria]) => `
            <div class="section">
                <div class="section-header">
                    <h2 class="section-title" style="display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas ${categoria.icono}" style="color: ${categoria.color};"></i>
                        ${categoria.titulo}
                        <span style="font-size: 0.875rem; color: var(--text-muted); font-weight: 400; background: var(--bg-input); padding: 0.25rem 0.75rem; border-radius: var(--radius-full);">
                            ${categoria.items.length} beneficio${categoria.items.length !== 1 ? 's' : ''}
                        </span>
                    </h2>
                </div>
                <div class="beneficios-grid">
                    ${categoria.items.map((item, idx) => `
                        <div class="beneficio-card">
                            <div class="beneficio-header" style="background: ${categoria.color};">
                                <div class="beneficio-titulo">${item.titulo}</div>
                                ${item.porcentaje ? `<div class="beneficio-badge">${item.porcentaje}</div>` : ''}
                            </div>
                            <div class="beneficio-body">
                                <p class="beneficio-descripcion">${item.descripcion}</p>
                                
                                ${item.montoMax ? `
                                    <div class="beneficio-info">
                                        <i class="fas fa-dollar-sign" style="color: ${categoria.color};"></i>
                                        <div>
                                            <strong>Monto / Beneficio:</strong><br>
                                            <span>${item.montoMax}</span>
                                        </div>
                                    </div>
                                ` : ''}
                                
                                ${item.exclusiones ? `
                                    <div class="beneficio-info warning">
                                        <i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>
                                        <div>
                                            <strong>Exclusiones:</strong><br>
                                            <span>${item.exclusiones}</span>
                                        </div>
                                    </div>
                                ` : ''}
                                
                                <div class="beneficio-info documentacion">
                                    <i class="fas fa-file-alt" style="color: #3b82f6;"></i>
                                    <div>
                                        <strong>Documentación a presentar:</strong><br>
                                        <span>${item.documentacion}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
        
        <div class="section" style="background: var(--gradient-accent); color: white; border: none;">
            <h2 style="color: white; border: none; margin-bottom: 1rem;">📞 Contacto y Solicitudes</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; color: white;">
                <div>
                    <h3 style="color: white; margin-bottom: 0.5rem;"><i class="fas fa-map-marker-alt"></i> Dirección</h3>
                    <p style="color: rgba(255,255,255,0.95);">Entre Ríos 468 (S)<br>San Juan Capital</p>
                </div>
                <div>
                    <h3 style="color: white; margin-bottom: 0.5rem;"><i class="fas fa-clock"></i> Horarios</h3>
                    <p style="color: rgba(255,255,255,0.95);">Lunes a Viernes<br>08:00 a 17:00 hs</p>
                </div>
                <div>
                    <h3 style="color: white; margin-bottom: 0.5rem;"><i class="fas fa-phone"></i> Teléfono</h3>
                    <p style="color: rgba(255,255,255,0.95);">0264-4220191</p>
                </div>
                <div>
                    <h3 style="color: white; margin-bottom: 0.5rem;"><i class="fas fa-envelope"></i> Email</h3>
                    <p style="color: rgba(255,255,255,0.95); font-size: 0.875rem; word-break: break-all;">accionsocialyturismo@<br>aomaosamsanjuan.com.ar</p>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// RENDERIZADO - CURSOS (CON SOPORTE MODULAR)
// ============================================
function renderCursos(container) {
    const cursos = getCapacitaciones();
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Capacitaciones 🎓</h1>
            <p>Cursos disponibles organizados por actividad minera</p>
        </div>
        
        ${cursos.length === 0 ? `
            <div class="section">
                <div class="empty-state">
                    <i class="fas fa-graduation-cap"></i>
                    <h3>No hay capacitaciones disponibles</h3>
                    <p>Próximamente se cargarán nuevos cursos.</p>
                </div>
            </div>
        ` : `
            <div class="cards-grid">
                ${cursos.map(c => {
                    const act = DATA.actividades[c.actividad];
                    return `
                        <div class="card" onclick="showCursoDetalle(${typeof c.id === 'string' ? `'${c.id}'` : c.id})">
                            <div class="card-header" style="background-image: url('${c.imagen || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'}'); background-size: cover; background-position: center;">
                                <span class="card-badge">${c.categoria || 'General'}</span>
                            </div>
                            <div class="card-body">
                                <div class="card-category">${act ? act.nombre : 'General'}</div>
                                <h3 class="card-title">${c.titulo}</h3>
                                <p class="card-description">${c.descripcion || c.subtitulo || ''}</p>
                                <div class="card-meta">
                                    <span><i class="far fa-clock"></i> ${c.duracion || 'Varía'}</span>
                                    <span><i class="fas fa-signal"></i> ${c.nivel || 'General'}</span>
                                    ${c.modulosData ? `<span><i class="fas fa-book"></i> ${c.modulosData.length} módulos</span>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `}
    `;
}

function showCursoDetalle(cursoId) {
    const cursos = getCapacitaciones();
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) {
        toast('error', 'Error', 'Curso no encontrado');
        return;
    }
    
    const container = document.getElementById('pageContent');
    const esModular = curso.modulosData && curso.modulosData.length > 0;
    
    let contenidoHTML = '';
    
    if (esModular) {
        contenidoHTML = `
            <div class="modulo-indice">
                <h3>📚 Módulos del curso (${curso.modulosData.length})</h3>
                <div class="modulos-list">
                    ${curso.modulosData.map((mod, idx) => {
                        const progreso = obtenerProgresoModulo(curso.id, idx);
                        return `
                            <div class="modulo-item" onclick="mostrarModulo('${curso.id}', ${idx})">
                                <div class="modulo-numero">${idx + 1}</div>
                                <div class="modulo-info">
                                    <div class="modulo-titulo">${mod.titulo}</div>
                                    <div class="modulo-duracion">⏱️ ${mod.duracion}</div>
                                </div>
                                <div class="modulo-estado">
                                    ${progreso ? '<i class="fas fa-check-circle" style="color: #10b981;"></i>' : '<i class="fas fa-circle" style="color: #d1d5db;"></i>'}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="progreso-total">
                    <span>Progreso: <strong id="progresoPorcentaje">${calcularProgresoCurso(curso.id)}%</strong></span>
                    <div class="progress-bar-total">
                        <div class="progress-fill-total" style="width: ${calcularProgresoCurso(curso.id)}%;"></div>
                    </div>
                </div>
            </div>
            <div id="modulo-contenido-container">
                <div class="empty-state">
                    <i class="fas fa-hand-pointer"></i>
                    <h3>Seleccioná un módulo para comenzar</h3>
                    <p>Hacé clic en cualquiera de los módulos de arriba para ver su contenido.</p>
                </div>
            </div>
        `;
    } else {
        contenidoHTML = curso.contenido || `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>Contenido en carga</h3>
                <p>El contenido de este curso se cargará próximamente.</p>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('cursos')">
                <i class="fas fa-arrow-left"></i> Volver a cursos
            </button>
        </div>
        
        <div class="activity-hero">
            <img src="${curso.imagen || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'}" alt="${curso.titulo}" onerror="this.style.display='none'">
            <div class="activity-hero-content">
                <h1><i class="fas fa-graduation-cap"></i> ${curso.titulo}</h1>
                <p>${curso.descripcion || curso.subtitulo || ''}</p>
                <div style="margin-top: 1rem; display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 0.875rem;">
                    <span><i class="fas fa-user"></i> ${curso.instructor || 'Equipo AOMA'}</span>
                    <span><i class="fas fa-clock"></i> ${curso.duracion || 'Varía según módulo'}</span>
                    <span><i class="fas fa-signal"></i> ${curso.nivel || 'General'}</span>
                    ${esModular ? `<span><i class="fas fa-book"></i> ${curso.modulosData.length} módulos</span>` : ''}
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Contenido del curso</h2>
            <div id="cursoContent" style="line-height: 1.8; color: var(--text-secondary); margin-top: 1rem;">
                ${contenidoHTML}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        setupContentSearch('#cursoContent');
    }, 100);
}

// ============================================
// FUNCIONES PARA PROGRESO DE MÓDULOS
// ============================================
function obtenerProgresoModulo(cursoId, moduloIndex) {
    const key = `aoma_progreso_${cursoId}`;
    const progreso = JSON.parse(localStorage.getItem(key) || '{}');
    return !!progreso[moduloIndex];
}

function guardarProgresoModulo(cursoId, moduloIndex) {
    const key = `aoma_progreso_${cursoId}`;
    const progreso = JSON.parse(localStorage.getItem(key) || '{}');
    progreso[moduloIndex] = true;
    localStorage.setItem(key, JSON.stringify(progreso));
}

function calcularProgresoCurso(cursoId) {
    const cursos = getCapacitaciones();
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso || !curso.modulosData) return 0;
    const key = `aoma_progreso_${cursoId}`;
    const progreso = JSON.parse(localStorage.getItem(key) || '{}');
    const completados = Object.keys(progreso).filter(k => progreso[k]).length;
    return Math.round((completados / curso.modulosData.length) * 100);
}

// ============================================
// MOSTRAR MÓDULO
// ============================================
function mostrarModulo(cursoId, moduloIndex) {
    const cursos = getCapacitaciones();
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso || !curso.modulosData) return;
    
    const modulo = curso.modulosData[moduloIndex];
    if (!modulo) return;
    
    const container = document.getElementById('modulo-contenido-container');
    if (!container) return;
    
    let contenidoDetallado = modulo.contenido || '';
    if (modulo.variable && typeof window[modulo.variable] !== 'undefined') {
        const moduloData = window[modulo.variable];
        if (moduloData && moduloData.contenido) {
            contenidoDetallado = moduloData.contenido;
        }
    }
    
    guardarProgresoModulo(curso.id, moduloIndex);
    
    container.innerHTML = `
        <div class="modulo-contenido-wrapper">
            <div class="modulo-header">
                <h3>Módulo ${moduloIndex + 1}: ${modulo.titulo}</h3>
                <div class="modulo-meta">
                    <span><i class="fas fa-clock"></i> ${modulo.duracion}</span>
                    ${modulo.videoUrl ? `<span><i class="fas fa-video"></i> Video incluido</span>` : ''}
                    ${modulo.evaluacion ? `<span><i class="fas fa-check-circle"></i> ${modulo.evaluacion}</span>` : ''}
                </div>
            </div>
            
            ${modulo.videoUrl ? `
                <div class="modulo-video">
                    <div class="video-container">
                        <iframe src="${modulo.videoUrl}" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            ` : ''}
            
            <div class="modulo-contenido-texto">
                ${contenidoDetallado || '<p>Contenido del módulo en carga.</p>'}
            </div>
            
            ${modulo.evaluacion ? `
                <div class="modulo-evaluacion">
                    <h4>📝 Evaluación del módulo</h4>
                    <p>${modulo.evaluacion}</p>
                    <button class="btn btn-primary" onclick="iniciarEvaluacion('${curso.id}', ${moduloIndex})">
                        <i class="fas fa-play"></i> Iniciar Evaluación
                    </button>
                </div>
            ` : ''}
            
            <div class="modulo-navegacion">
                ${moduloIndex > 0 ? `
                    <button class="btn btn-secondary" onclick="mostrarModulo('${curso.id}', ${moduloIndex - 1})">
                        <i class="fas fa-arrow-left"></i> Anterior
                    </button>
                ` : ''}
                ${moduloIndex < (curso.modulosData.length - 1) ? `
                    <button class="btn btn-primary" onclick="mostrarModulo('${curso.id}', ${moduloIndex + 1})">
                        Siguiente <i class="fas fa-arrow-right"></i>
                    </button>
                ` : `
                    <button class="btn btn-success" onclick="completarCurso('${curso.id}')">
                        <i class="fas fa-trophy"></i> Completar Curso
                    </button>
                `}
            </div>
        </div>
    `;
    
    actualizarIndiceModulos(curso.id);
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function actualizarIndiceModulos(cursoId) {
    const items = document.querySelectorAll('.modulo-item');
    const progreso = JSON.parse(localStorage.getItem(`aoma_progreso_${cursoId}`) || '{}');
    items.forEach((item, idx) => {
        const estado = item.querySelector('.modulo-estado i');
        if (estado) {
            if (progreso[idx]) {
                estado.className = 'fas fa-check-circle';
                estado.style.color = '#10b981';
            } else {
                estado.className = 'fas fa-circle';
                estado.style.color = '#d1d5db';
            }
        }
    });
    const porcentaje = calcularProgresoCurso(cursoId);
    const span = document.getElementById('progresoPorcentaje');
    if (span) span.textContent = porcentaje + '%';
    const barra = document.querySelector('.progress-fill-total');
    if (barra) barra.style.width = porcentaje + '%';
}

// ============================================
// COMPLETAR CURSO (GENERAR CERTIFICADO)
// ============================================
function completarCurso(cursoId) {
    const cursos = getCapacitaciones();
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) return;
    
    const key = `aoma_progreso_${cursoId}`;
    const progreso = JSON.parse(localStorage.getItem(key) || '{}');
    const totalModulos = curso.modulosData ? curso.modulosData.length : 0;
    const completados = Object.keys(progreso).filter(k => progreso[k]).length;
    
    if (completados < totalModulos) {
        toast('warning', 'Curso incompleto', 
            `Completaste ${completados} de ${totalModulos} módulos. Finalizá todos para obtener tu certificado.`);
        return;
    }
    
    generarCertificado(curso.titulo, curso.id);
}

function generarCertificado(nombreCurso, cursoId) {
    toast('success', '🎓 ¡Curso completado!', 
        `Felicidades, completaste "${nombreCurso}". Tu certificado se generará próximamente.`);
}

// ============================================
// EVALUACIÓN (placeholder)
// ============================================
function iniciarEvaluacion(cursoId, moduloIndex) {
    toast('info', '📝 Evaluación', 'La evaluación del módulo se abrirá en breve.');
}

// ============================================
// RENDERIZADO - CONVENIOS GENERAL
// ============================================
function renderConveniosGeneral(container) {
    const convenios = getConvenios();
    const conveniosActividad = convenios.filter(c => !c.empresa);
    const conveniosEmpresa = convenios.filter(c => c.empresa);
    
    const conveniosPorActividad = {};
    conveniosActividad.forEach(conv => {
        if (!conveniosPorActividad[conv.actividad]) {
            conveniosPorActividad[conv.actividad] = [];
        }
        conveniosPorActividad[conv.actividad].push(conv);
    });
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Convenios Colectivos de Trabajo 📋</h1>
            <p>Normativas vigentes organizadas por actividad y por empresa</p>
        </div>
        
        <div class="stats-grid" style="margin-bottom: 2rem;">
            <div class="stat-card" onclick="navigateTo('convenios-mineria')">
                <div class="stat-icon" style="color: #f59e0b;">⛏️</div>
                <div class="stat-value">${(conveniosPorActividad['mineria-extractiva'] || []).length}</div>
                <div class="stat-label">Minería Extractiva</div>
            </div>
            <div class="stat-card" onclick="navigateTo('convenios-cemento')">
                <div class="stat-icon" style="color: #64748b;">🏭</div>
                <div class="stat-value">${(conveniosPorActividad['cemento'] || []).length}</div>
                <div class="stat-label">Cemento</div>
            </div>
            <div class="stat-card" onclick="navigateTo('convenios-cal')">
                <div class="stat-icon" style="color: #78716c;">⛰️</div>
                <div class="stat-value">${(conveniosPorActividad['cal-piedra'] || []).length}</div>
                <div class="stat-label">Cal y Piedra</div>
            </div>
            <div class="stat-card" onclick="navigateTo('convenios-molienda')">
                <div class="stat-icon" style="color: #475569;">⚙️</div>
                <div class="stat-value">${(conveniosPorActividad['molienda'] || []).length}</div>
                <div class="stat-label">Molienda</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-building" style="color: #0891b2;"></i>
                    Convenios por Empresa
                </h2>
            </div>
            <div class="cards-grid">
                ${Object.values(DATA.empresas).map(emp => `
                    <div class="card" onclick="navigateTo('empresa-${emp.id}')" style="cursor: pointer;">
                        <div class="card-header" style="background: linear-gradient(135deg, ${emp.color}, ${emp.color}dd);">
                            <i class="fas ${emp.icono}"></i>
                        </div>
                        <div class="card-body">
                            <div class="card-category">${emp.empresa}</div>
                            <h3 class="card-title">${emp.nombre}</h3>
                            <p class="card-description">${emp.descripcion}</p>
                            <div class="card-meta">
                                <span><i class="fas fa-map-marker-alt"></i> ${emp.ubicacion}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================
// RENDERIZADO - CONVENIOS POR ACTIVIDAD
// ============================================
function renderConveniosPorActividad(container, actividadId) {
    const act = DATA.actividades[actividadId];
    if (!act) {
        container.innerHTML = '<div class="empty-state"><h3>Actividad no encontrada</h3></div>';
        return;
    }
    
    const convenios = getConvenios();
    const conveniosAct = convenios.filter(c => c.actividad === actividadId && !c.empresa);
    const escalasAct = DATA.escalas[actividadId] || [];
    
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('convenios')">
                <i class="fas fa-arrow-left"></i> Volver a Convenios
            </button>
        </div>
        
        <div class="activity-hero">
            <img src="${act.imagen}" alt="${act.nombre}" onerror="this.style.display='none'">
            <div class="activity-hero-content">
                <h1><i class="fas ${act.icono}"></i> ${act.nombre}</h1>
                <p>${act.descripcion}</p>
                <p style="margin-top: 0.5rem;"><strong>Convenio principal:</strong> ${act.ctt}</p>
            </div>
        </div>
        
        ${conveniosAct.length > 0 ? `
            <div class="section">
                <div class="section-header">
                    <h2 class="section-title">Convenios Colectivos</h2>
                </div>
                <div class="cards-grid">
                    ${conveniosAct.map(c => `
                        <div class="card" onclick="showConvenioDetalle('${c.numero}')" style="cursor: pointer;">
                            <div class="card-header" style="background: linear-gradient(135deg, ${act.color}, ${act.color}dd);">
                                <i class="fas fa-file-contract"></i>
                                <span class="card-badge">${c.numero}</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">${c.subtitulo || c.titulo}</h3>
                                <p class="card-description">${c.resumen}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : `
            <div class="section">
                <div class="empty-state">
                    <i class="fas fa-file-contract"></i>
                    <h3>Convenios en carga</h3>
                    <p>Los convenios colectivos de esta actividad se cargarán próximamente.</p>
                </div>
            </div>
        `}
        
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
    `;
}

// ============================================
// RENDERIZADO - EMPRESA ESPECÍFICA
// ============================================
function renderEmpresa(container, empresaId) {
    const empresa = DATA.empresas[empresaId];
    if (!empresa) {
        container.innerHTML = '<div class="empty-state"><h3>Empresa no encontrada</h3></div>';
        return;
    }
    
    const convenios = getConvenios();
    const convEmp = convenios.find(c => c.empresa === empresaId);
    
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('convenios')">
                <i class="fas fa-arrow-left"></i> Volver a Convenios
            </button>
        </div>
        
        <div class="activity-hero">
            <img src="${empresa.imagen}" alt="${empresa.nombre}" onerror="this.style.display='none'">
            <div class="activity-hero-content">
                <h1><i class="fas ${empresa.icono}"></i> ${empresa.nombre}</h1>
                <p>${empresa.descripcion}</p>
                <div style="margin-top: 0.75rem; display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 0.875rem;">
                    <span><i class="fas fa-building"></i> ${empresa.empresa}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${empresa.ubicacion}</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Convenio Colectivo</h2>
            </div>
            ${convEmp ? `
                <div class="cards-grid">
                    <div class="card" onclick="showConvenioDetalle('${convEmp.numero}')" style="cursor: pointer;">
                        <div class="card-header" style="background: linear-gradient(135deg, ${empresa.color}, ${empresa.color}dd);">
                            <i class="fas fa-file-contract"></i>
                            <span class="card-badge">${convEmp.numero}</span>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${convEmp.subtitulo || convEmp.titulo}</h3>
                            <p class="card-description">${convEmp.resumen}</p>
                        </div>
                    </div>
                </div>
            ` : `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <h3>Convenio en carga</h3>
                    <p>El convenio colectivo específico de ${empresa.nombre} se cargará próximamente.</p>
                </div>
            `}
        </div>
        
        <div class="section" style="background: var(--bg-input);">
            <h2 class="section-title">Información de la Empresa</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
                <div>
                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;"><i class="fas fa-building"></i> Operador</h4>
                    <p style="color: var(--text-secondary);">${empresa.empresa}</p>
                </div>
                <div>
                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;"><i class="fas fa-map-marker-alt"></i> Ubicación</h4>
                    <p style="color: var(--text-secondary);">${empresa.ubicacion}</p>
                </div>
                <div>
                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;"><i class="fas fa-gem"></i> Actividad</h4>
                    <p style="color: var(--text-secondary);">${DATA.actividades[empresa.actividad]?.nombre || empresa.actividad}</p>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// RENDERIZADO - CONVENIO DETALLE
// ============================================
function showConvenioDetalle(numero) {
    const convenios = getConvenios();
    const conv = convenios.find(c => c.numero === numero);
    if (!conv) return;
    
    const act = DATA.actividades[conv.actividad];
    const container = document.getElementById('pageContent');
    
    const contenidoHTML = conv.contenido || `
        <div class="empty-state">
            <i class="fas fa-file-alt"></i>
            <h3>Contenido en carga</h3>
            <p>El contenido completo del ${conv.numero} se cargará próximamente desde el archivo separado.</p>
            <p style="margin-top: 1rem; font-size: 0.875rem;"><strong>Resumen:</strong> ${conv.resumen}</p>
        </div>
    `;
    
    container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-ghost" onclick="navigateTo('convenios')">
                <i class="fas fa-arrow-left"></i> Volver a convenios
            </button>
        </div>
        
        <div class="activity-hero">
            <div class="activity-hero-content" style="background: linear-gradient(135deg, ${act ? act.color : '#1e3a8a'}, ${act ? act.color + 'dd' : '#3b82f6'});">
                <h1><i class="fas fa-file-contract"></i> ${conv.numero}</h1>
                <p>${conv.subtitulo || conv.titulo}</p>
                ${act ? `<p style="margin-top: 0.5rem; font-size: 0.875rem;"><strong>Actividad:</strong> ${act.nombre}</p>` : ''}
            </div>
        </div>
        
        <div class="content-search-bar">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="contentSearchInput" placeholder="Buscar en este convenio...">
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
            <h2 class="section-title" style="margin-bottom: 1rem;">${conv.titulo}</h2>
            <div class="ley-content" id="convenioContent">
                ${contenidoHTML}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        setupContentSearch('#convenioContent');
    }, 100);
}

// ============================================
// RENDERIZADO - LEGISLACIÓN
// ============================================
function renderLegislacion(container) {
    const leyes = getLeyes();
    
    container.innerHTML = `
        <div class="page-header">
            <h1>Legislación Laboral ⚖️</h1>
            <p>Leyes y normativas laborales aplicables al sector minero</p>
        </div>
        
        ${leyes.length === 0 ? `
            <div class="section">
                <div class="empty-state">
                    <i class="fas fa-balance-scale"></i>
                    <h3>Leyes en carga</h3>
                    <p>Las leyes laborales se cargarán próximamente desde archivos separados.</p>
                </div>
            </div>
        ` : `
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
        `}
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
        
        <div class="activity-hero">
            <div class="activity-hero-content" style="background: var(--gradient-primary);">
                <h1><i class="fas fa-balance-scale"></i> ${ley.numero}</h1>
                <p>${ley.titulo}</p>
            </div>
        </div>
        
        <div class="content-search-bar">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="contentSearchInput" placeholder="Buscar en esta ley...">
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
            <h2 class="section-title" style="margin-bottom: 0.5rem;">${ley.titulo}</h2>
            <div class="ley-content" id="leyContent">
                ${ley.contenido}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        setupContentSearch('#leyContent');
    }, 100);
}

// ============================================
// RENDERIZADO - FAQ
// ============================================
function renderFAQ(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1>Preguntas Frecuentes ❓</h1>
            <p>Resolvé tus dudas organizadas por temática</p>
        </div>
        ${Object.entries(DATA.faqs).map(([catId, items]) => {
            const act = DATA.actividades[catId];
            const catName = act ? act.nombre : (catId === 'general' ? 'General' : catId === 'beneficios' ? 'Beneficios Sociales' : catId);
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

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function toast(type, title, message) {
    const container = document.querySelector('.toast-container') || (() => {
        const div = document.createElement('div');
        div.className = 'toast-container';
        document.body.appendChild(div);
        return div;
    })();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// ============================================
// CHAT - Funciones auxiliares (con imagen personalizada en el mensaje)
// ============================================
function addChatMessage(type, text) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    
    const div = document.createElement('div');
    div.className = 'chat-message ' + type;
    
    const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute:'2-digit' });
    // Para el avatar usamos imagen personalizada en el bot, y las iniciales para el usuario
    const avatar = type === 'user' 
        ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : '<img src="assets/chat-avatar.png" alt="AOMA" style="width:32px; height:32px; border-radius:50%; object-fit:cover;">';
    
    div.innerHTML = `
        <div class="chat-message-avatar">${avatar}</div>
        <div>
            <div class="chat-message-content">${text.replace(/\n/g, '<br>')}</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${time}</div>
        </div>
    `;
    
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}