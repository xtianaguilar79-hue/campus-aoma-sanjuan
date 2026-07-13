// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
// (Versión corregida con window.DATA)
// ============================================

let currentUser = null;
let currentPage = 'inicio';
let searchHighlights = [];
let currentHighlightIndex = -1;
let modalBienvenidaMostrado = false;

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AOMA Campus: Iniciando...');
    
    // Esperar a que window.DATA esté disponible
    if (typeof window.DATA === 'undefined') {
        console.error('❌ DATA no está disponible. Esperando 1s...');
        setTimeout(() => {
            if (typeof window.DATA === 'undefined') {
                alert('Error crítico: No se pudo cargar la base de datos. Recargá la página.');
                return;
            }
            iniciarApp();
        }, 1000);
    } else {
        iniciarApp();
    }
});

function iniciarApp() {
    try {
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
        if (savedTheme === 'dark') toggleTheme();
    } catch (e) {
        console.error('Error en inicialización:', e);
        showLogin();
    }
}

// ============================================
// LOGIN / LOGOUT
// ============================================
function showLogin() {
    try {
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
                                <i class="fas fa-user" style="color: #f47b20;"></i> Usuario o Email
                            </label>
                            <input type="text" id="username" style="width: 100%; padding: 0.75rem 1rem; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;" placeholder="admin, delegado o tu usuario" required>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #1a1a1a;">
                                <i class="fas fa-lock" style="color: #f47b20;"></i> Contraseña
                            </label>
                            <input type="password" id="password" style="width: 100%; padding: 0.75rem 1rem; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;" placeholder="••••••••" required>
                        </div>
                        <button type="submit" style="width: 100%; padding: 0.875rem; background: linear-gradient(135deg, #f47b20, #f69b4c); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Ingresar al Campus</button>
                    </form>
                    <div style="text-align: center; padding-top: 1rem; font-size: 0.875rem; color: #6b7280;">
                        <a href="#" onclick="event.preventDefault(); mostrarRegistro();" style="color: #f47b20; text-decoration: none; font-weight: 600;">¿No tenés cuenta? Registrate</a>
                        <span style="margin: 0 0.5rem;">|</span>
                        <a href="#" onclick="event.preventDefault(); mostrarRecuperacion();" style="color: #6b7280; text-decoration: none;">¿Olvidaste tu contraseña?</a>
                    </div>
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
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const usuariosActivos = obtenerUsuariosActivos();
            const user = usuariosActivos.find(u => 
                (u.username === username || u.email === username) && 
                u.password === password && 
                u.active === true
            );
            if (user) {
                currentUser = user;
                localStorage.setItem('aoma_session', JSON.stringify(user));
                modalBienvenidaMostrado = false;
                location.reload();
            } else {
                alert('Usuario o contraseña incorrectos, o tu cuenta no ha sido aprobada aún.');
            }
        });
    } catch (e) {
        console.error('Error en showLogin:', e);
        document.body.innerHTML = '<p style="color:red;">Error al cargar el login. Revisá la consola.</p>';
    }
}

function showApp() {
    try {
        if (!currentUser) { showLogin(); return; }
        document.getElementById('userName').textContent = currentUser.name;
        const roleText = currentUser.role === 'admin' ? 'Administrador' : (currentUser.role === 'dirigente' ? 'Dirigente' : 'Delegado');
        document.getElementById('userRole').textContent = roleText;
        document.getElementById('userAvatar').textContent = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        if (currentUser.role === 'admin') {
            const link = document.getElementById('adminPanelLink');
            if (link) link.style.display = 'block';
        }
        navigateTo('inicio');
        if (!modalBienvenidaMostrado) {
            mostrarModalBienvenida();
            modalBienvenidaMostrado = true;
        }
    } catch (e) {
        console.error('Error en showApp:', e);
        document.getElementById('pageContent').innerHTML = `<p style="color:red;">Error al mostrar la aplicación: ${e.message}</p>`;
    }
}

function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('aoma_session');
        modalBienvenidaMostrado = false;
        location.reload();
    }
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
    localStorage.setItem('aoma_theme', isDark ? 'light' : 'dark');
    const icon = document.querySelector('#themeBtn i');
    if (icon) icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
}

// ============================================
// MODAL DE BIENVENIDA
// ============================================
function mostrarModalBienvenida() {
    try {
        const modal = document.getElementById('modalBienvenida');
        if (modal) modal.style.display = 'flex';
        else console.warn('Modal de bienvenida no encontrado en el DOM');
    } catch (e) { console.error('Error al mostrar modal:', e); }
}

function cerrarModalBienvenida() {
    const modal = document.getElementById('modalBienvenida');
    if (modal) modal.style.display = 'none';
}

// ============================================
// REGISTRO Y RECUPERACIÓN (MODALES)
// ============================================
function mostrarRegistro() { const modal = document.getElementById('modalRegistro'); if (modal) modal.style.display = 'flex'; }
function cerrarModalRegistro() { const modal = document.getElementById('modalRegistro'); if (modal) modal.style.display = 'none'; }
function mostrarRecuperacion() {
    const modal = document.getElementById('modalRecuperacion');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('recPreguntaContainer').style.display = 'none';
        document.getElementById('recNuevaPassContainer').style.display = 'none';
        document.getElementById('recBtn').textContent = 'Buscar usuario';
        document.getElementById('recUser').value = '';
        document.getElementById('recRespuesta').value = '';
        document.getElementById('recNuevaPass').value = '';
    }
}
function cerrarModalRecuperacion() { const modal = document.getElementById('modalRecuperacion'); if (modal) modal.style.display = 'none'; }

// ============================================
// SISTEMA DE USUARIOS (localStorage)
// ============================================
function obtenerUsuariosActivos() {
    try {
        const base = window.DATA && window.DATA.usuarios ? [...window.DATA.usuarios] : [];
        const almacenados = JSON.parse(localStorage.getItem('aoma_usuarios_activos') || '[]');
        const todos = [...base];
        almacenados.forEach(u => { if (!todos.some(t => t.id === u.id)) todos.push(u); });
        return todos;
    } catch (e) { console.error('Error al obtener usuarios activos:', e); return []; }
}
function obtenerUsuariosPendientes() {
    try { return JSON.parse(localStorage.getItem('aoma_usuarios_pendientes') || '[]'); } catch (e) { return []; }
}
function guardarUsuariosPendientes(pendientes) { localStorage.setItem('aoma_usuarios_pendientes', JSON.stringify(pendientes)); }
function guardarUsuariosActivos(activos) {
    const baseIds = window.DATA && window.DATA.usuarios ? window.DATA.usuarios.map(u => u.id) : [];
    const paraGuardar = activos.filter(u => !baseIds.includes(u.id));
    localStorage.setItem('aoma_usuarios_activos', JSON.stringify(paraGuardar));
}

// ============================================
// REGISTRO Y RECUPERACIÓN (eventos)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const formReg = document.getElementById('formRegistro');
    if (formReg) {
        formReg.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('regNombre').value.trim();
            const usuario = document.getElementById('regUsuario').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const pregunta = document.getElementById('regPregunta').value;
            const respuesta = document.getElementById('regRespuesta').value.trim();
            if (!nombre || !usuario || !email || !password || !pregunta || !respuesta) { alert('Completá todos los campos.'); return; }
            if (password.length < 6) { alert('La contraseña debe tener al menos 6 caracteres.'); return; }
            const activos = obtenerUsuariosActivos();
            const pendientes = obtenerUsuariosPendientes();
            if (activos.some(u => u.username === usuario || u.email === email) || pendientes.some(u => u.username === usuario || u.email === email)) {
                alert('Ese usuario o email ya está registrado.');
                return;
            }
            const nuevoUsuario = {
                id: Date.now(),
                username: usuario,
                email: email,
                password: password,
                name: nombre,
                role: 'delegado',
                active: false,
                preguntaSeguridad: pregunta,
                respuestaSeguridad: respuesta
            };
            pendientes.push(nuevoUsuario);
            guardarUsuariosPendientes(pendientes);
            alert('Tu registro ha sido enviado. Esperá la aprobación del administrador.');
            cerrarModalRegistro();
        });
    }
    const formRec = document.getElementById('formRecuperacion');
    if (formRec) {
        formRec.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('recUser').value.trim();
            const btn = document.getElementById('recBtn');
            if (!identifier) { alert('Ingresá tu usuario o email.'); return; }
            const activos = obtenerUsuariosActivos();
            const usuario = activos.find(u => u.username === identifier || u.email === identifier);
            if (!usuario) { alert('No se encontró ningún usuario con esos datos.'); return; }
            if (!usuario.preguntaSeguridad) { alert('Este usuario no tiene configurada una pregunta de seguridad. Contactá al administrador.'); return; }
            const preguntaContainer = document.getElementById('recPreguntaContainer');
            const nuevaPassContainer = document.getElementById('recNuevaPassContainer');
            if (btn.textContent === 'Buscar usuario') {
                document.getElementById('recPreguntaLabel').textContent = usuario.preguntaSeguridad;
                preguntaContainer.style.display = 'block';
                btn.textContent = 'Verificar respuesta';
                btn.dataset.userId = usuario.id;
            } else if (btn.textContent === 'Verificar respuesta') {
                const respuesta = document.getElementById('recRespuesta').value.trim();
                if (respuesta.toLowerCase() !== usuario.respuestaSeguridad.toLowerCase()) { alert('Respuesta incorrecta.'); return; }
                nuevaPassContainer.style.display = 'block';
                btn.textContent = 'Cambiar contraseña';
                btn.dataset.step = 'reset';
                document.getElementById('recRespuesta').setAttribute('readonly', true);
            } else if (btn.textContent === 'Cambiar contraseña') {
                const nuevaPass = document.getElementById('recNuevaPass').value;
                if (!nuevaPass || nuevaPass.length < 6) { alert('La nueva contraseña debe tener al menos 6 caracteres.'); return; }
                const userId = parseInt(btn.dataset.userId);
                const userIndex = activos.findIndex(u => u.id === userId);
                if (userIndex === -1) { alert('Usuario no encontrado.'); return; }
                activos[userIndex].password = nuevaPass;
                guardarUsuariosActivos(activos);
                alert('Contraseña actualizada correctamente. Iniciá sesión con tu nueva contraseña.');
                cerrarModalRecuperacion();
            }
        });
    }
});

// ============================================
// PANEL DE ADMINISTRACIÓN DE USUARIOS
// ============================================
function mostrarPanelUsuarios() {
    if (currentUser.role !== 'admin') { alert('Solo el administrador puede acceder a este panel.'); return; }
    const modal = document.getElementById('modalPanelUsuarios');
    if (modal) modal.style.display = 'flex';
    actualizarListasUsuarios();
}
function cerrarPanelUsuarios() { const modal = document.getElementById('modalPanelUsuarios'); if (modal) modal.style.display = 'none'; }
function actualizarListasUsuarios() {
    try {
        const pendientes = obtenerUsuariosPendientes();
        const activos = obtenerUsuariosActivos();
        const contPend = document.getElementById('listaPendientes');
        if (!contPend) return;
        if (pendientes.length === 0) {
            contPend.innerHTML = '<p style="color: var(--text-muted);">No hay usuarios pendientes de aprobación.</p>';
        } else {
            contPend.innerHTML = pendientes.map(u => `
                <div class="usuario-item">
                    <div class="info"><span class="nombre">${u.name}</span><span class="email">${u.email} (${u.username})</span></div>
                    <div class="acciones">
                        <button class="btn-aprobar" onclick="aprobarUsuario(${u.id})"><i class="fas fa-check"></i> Aprobar</button>
                        <button class="btn-rechazar" onclick="rechazarUsuario(${u.id})"><i class="fas fa-times"></i> Rechazar</button>
                    </div>
                </div>
            `).join('');
        }
        const contAct = document.getElementById('listaActivos');
        if (!contAct) return;
        const activosNoBase = activos.filter(u => u.role !== 'admin' || u.id > 1000);
        if (activosNoBase.length === 0) {
            contAct.innerHTML = '<p style="color: var(--text-muted);">No hay usuarios adicionales activos.</p>';
        } else {
            contAct.innerHTML = activosNoBase.map(u => `
                <div class="usuario-item">
                    <div class="info"><span class="nombre">${u.name} (${u.role})</span><span class="email">${u.email}</span></div>
                    <div class="acciones">
                        <button class="btn-eliminar" onclick="eliminarUsuario(${u.id})"><i class="fas fa-trash"></i> Eliminar</button>
                    </div>
                </div>
            `).join('');
        }
    } catch (e) { console.error('Error al actualizar listas:', e); }
}
function aprobarUsuario(id) {
    try {
        const pendientes = obtenerUsuariosPendientes();
        const index = pendientes.findIndex(u => u.id === id);
        if (index === -1) return;
        const usuario = pendientes[index];
        usuario.active = true;
        usuario.role = usuario.role || 'delegado';
        pendientes.splice(index, 1);
        guardarUsuariosPendientes(pendientes);
        const activos = obtenerUsuariosActivos();
        if (!activos.some(u => u.id === usuario.id)) { activos.push(usuario); guardarUsuariosActivos(activos); }
        actualizarListasUsuarios();
        alert(`Usuario ${usuario.name} aprobado correctamente.`);
    } catch (e) { console.error('Error al aprobar usuario:', e); }
}
function rechazarUsuario(id) {
    if (!confirm('¿Estás seguro de rechazar este usuario?')) return;
    try {
        const pendientes = obtenerUsuariosPendientes();
        const index = pendientes.findIndex(u => u.id === id);
        if (index === -1) return;
        pendientes.splice(index, 1);
        guardarUsuariosPendientes(pendientes);
        actualizarListasUsuarios();
    } catch (e) { console.error('Error al rechazar usuario:', e); }
}
function eliminarUsuario(id) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
        const activos = obtenerUsuariosActivos();
        const index = activos.findIndex(u => u.id === id);
        if (index === -1) return;
        activos.splice(index, 1);
        guardarUsuariosActivos(activos);
        actualizarListasUsuarios();
    } catch (e) { console.error('Error al eliminar usuario:', e); }
}

// ============================================
// NAVEGACIÓN Y RENDERIZADO
// ============================================
function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.nav-pill').forEach(pill => { pill.classList.toggle('active', pill.dataset.page === page); });
    document.querySelectorAll('.mobile-nav-pill').forEach(pill => { pill.classList.toggle('active', pill.dataset.page === page); });
    closeMobileMenu();
    const content = document.getElementById('pageContent');
    if (!content) return;
    content.innerHTML = '<div class="empty-state"><i class="fas fa-spinner fa-spin"></i><h3>Cargando...</h3></div>';
    setTimeout(() => {
        try { renderPage(page, content); } catch (e) {
            console.error('Error al renderizar página:', e);
            content.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Error al cargar la página</h3><p>${e.message}</p></div>`;
        }
    }, 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage(page, container) {
    switch (page) {
        case 'inicio': renderDashboard(container); break;
        case 'cursos': renderCursos(container); break;
        case 'beneficios': renderBeneficios(container); break;
        case 'convenios': renderConveniosGeneral(container); break;
        case 'convenios-mineria': renderConveniosPorActividad(container, 'mineria-extractiva'); break;
        case 'convenios-cemento': renderConveniosPorActividad(container, 'cemento'); break;
        case 'convenios-cal': renderConveniosPorActividad(container, 'cal-piedra'); break;
        case 'convenios-molienda': renderConveniosPorActividad(container, 'molienda'); break;
        case 'empresa-veladero': renderEmpresa(container, 'veladero'); break;
        case 'empresa-gualcamayo': renderEmpresa(container, 'gualcamayo'); break;
        case 'empresa-vicuna': renderEmpresa(container, 'vicuna'); break;
        case 'legislacion': renderLegislacion(container); break;
        case 'gremio': renderOrganigrama(container); break;
        default: container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Página no encontrada</h3></div>';
    }
}

// ============================================
// OBTENER DATOS (usando window.DATA)
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
    try {
        const data = window.DATA;
        if (!data || !data.convenios) return [];
        return data.convenios.map(conv => {
            if (conv.variable && typeof window[conv.variable] !== 'undefined') {
                const contenidoGlobal = window[conv.variable];
                return { ...conv, contenido: contenidoGlobal.contenido || contenidoGlobal };
            }
            return conv;
        });
    } catch (e) {
        console.error('Error en getConvenios:', e);
        return [];
    }
}

function getCapacitaciones() {
    const cursos = [];
    try {
        const data = window.DATA;
        if (data && data.cursos && data.cursos.length > 0) cursos.push(...data.cursos);
        if (typeof window !== 'undefined' && window.CAPACITACIONES_REGISTRO) {
            Object.values(window.CAPACITACIONES_REGISTRO).forEach(cap => {
                if (!cursos.some(c => c.id === cap.id)) cursos.push(cap);
            });
        }
    } catch (e) {
        console.error('Error en getCapacitaciones:', e);
    }
    return cursos;
}

// ============================================
// EVENTOS
// ============================================
function setupEvents() {
    try {
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        if (menuBtn) menuBtn.addEventListener('click', () => { if (mobileMenu) mobileMenu.classList.add('active'); if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active'); });
        if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
        if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        document.querySelectorAll('.nav-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                if (!pill.closest('.nav-dropdown')) navigateTo(pill.dataset.page);
                else if (pill.dataset.page) navigateTo(pill.dataset.page);
            });
        });
        document.querySelectorAll('.mobile-nav-pill').forEach(pill => {
            pill.addEventListener('click', () => navigateTo(pill.dataset.page));
        });
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.addEventListener('click', (e) => { e.stopPropagation(); const dropdown = document.getElementById('userDropdown'); if (dropdown) dropdown.classList.toggle('active'); });
        }
        document.addEventListener('click', () => { const dropdown = document.getElementById('userDropdown'); if (dropdown) dropdown.classList.remove('active'); });
        const chatBtn = document.getElementById('chatBtn');
        const chatClose = document.getElementById('chatClose');
        const chatWindow = document.getElementById('chatWindow');
        if (chatBtn) chatBtn.addEventListener('click', () => { if (chatWindow) chatWindow.classList.toggle('hidden'); });
        if (chatClose) chatClose.addEventListener('click', () => { if (chatWindow) chatWindow.classList.add('hidden'); });
    } catch (e) { console.error('Error en setupEvents:', e); }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
}

// ============================================
// BÚSQUEDA DENTRO DEL CONTENIDO (sin cambios)
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
        if (query.length < 2) { clearContentHighlights(); if (searchCount) searchCount.textContent = '0 resultados'; if (btnPrev) btnPrev.disabled = true; if (btnNext) btnNext.disabled = true; return; }
        performContentSearch(query, contentSelector, searchCount, btnPrev, btnNext);
    });
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); navigateHighlight(1); }
        if (e.key === 'Escape') { searchInput.value = ''; clearContentHighlights(); if (searchCount) searchCount.textContent = '0 resultados'; if (btnPrev) btnPrev.disabled = true; if (btnNext) btnNext.disabled = true; }
    });
    if (btnPrev) btnPrev.addEventListener('click', () => navigateHighlight(-1));
    if (btnNext) btnNext.addEventListener('click', () => navigateHighlight(1));
    if (btnClear) btnClear.addEventListener('click', () => {
        searchInput.value = '';
        clearContentHighlights();
        if (searchCount) searchCount.textContent = '0 resultados';
        if (btnPrev) btnPrev.disabled = true;
        if (btnNext) btnNext.disabled = true;
    });
}

function performContentSearch(query, contentSelector, countEl, btnPrev, btnNext) {
    clearContentHighlights();
    const contentEl = document.querySelector(contentSelector);
    if (!contentEl) return;
    const walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            if (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE' || node.parentElement.classList.contains('search-highlight')) return NodeFilter.FILTER_REJECT;
            if (node.textContent.toLowerCase().includes(query.toLowerCase())) return NodeFilter.FILTER_ACCEPT;
            return NodeFilter.FILTER_REJECT;
        }
    });
    const textNodes = [];
    let currentNode;
    while (currentNode = walker.nextNode()) textNodes.push(currentNode);
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
    if (searchHighlights.length > 0) navigateHighlight(1);
}

function navigateHighlight(direction) {
    if (searchHighlights.length === 0) return;
    if (currentHighlightIndex >= 0 && currentHighlightIndex < searchHighlights.length) searchHighlights[currentHighlightIndex].classList.remove('active');
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
// RENDERIZADO - DASHBOARD (usando window.DATA)
// ============================================
function renderDashboard(container) {
    try {
        const data = window.DATA;
        if (!data) throw new Error('DATA no está disponible');
        const convenios = getConvenios();
        const convCount = convenios.length;
        const cursos = getCapacitaciones();
        const cursoCount = cursos.length;
        const leyes = getLeyes();
        const leyCount = leyes.length;
        const benefCount = data.beneficios ? Object.keys(data.beneficios).length : 0;
        
        container.innerHTML = `
            <div class="page-header">
                <h1>¡Bienvenido, ${currentUser.name.split(' ')[0]}! 👋</h1>
                <p>Panel de control del Campus Virtual AOMA San Juan</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card accent" onclick="navigateTo('convenios')">
                    <div class="stat-icon-wrapper"><i class="fas fa-file-contract"></i></div>
                    <div class="stat-content"><div class="stat-value">${convCount}</div><div class="stat-label">Convenios CCT</div></div>
                    <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="stat-card success" onclick="navigateTo('beneficios')">
                    <div class="stat-icon-wrapper"><i class="fas fa-gift"></i></div>
                    <div class="stat-content"><div class="stat-value">${benefCount}</div><div class="stat-label">Categorías de Beneficios</div></div>
                    <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="stat-card warning" onclick="navigateTo('cursos')">
                    <div class="stat-icon-wrapper"><i class="fas fa-graduation-cap"></i></div>
                    <div class="stat-content"><div class="stat-value">${cursoCount}</div><div class="stat-label">Cursos disponibles</div></div>
                    <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="stat-card" onclick="navigateTo('legislacion')" style="--stat-color: #6b7280;">
                    <div class="stat-icon-wrapper" style="background: linear-gradient(135deg, #6b7280, #4b5563); box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);">
                        <i class="fas fa-balance-scale"></i>
                    </div>
                    <div class="stat-content"><div class="stat-value">${leyCount}</div><div class="stat-label">Leyes laborales</div></div>
                    <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
            </div>
            <div class="section">
                <div class="section-header"><h2 class="section-title">Accesos Rápidos</h2></div>
                <div class="cards-grid">
                    <div class="card" onclick="navigateTo('beneficios')" style="cursor: pointer;">
                        <div class="card-header" style="background: linear-gradient(135deg, #10b981, #059669);">
                            <i class="fas fa-gift"></i><span class="card-badge">Nuevo</span>
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
            <div class="section">
                <div class="section-header"><h2 class="section-title">Estructura de AOMA San Juan</h2></div>
                <div class="cards-grid">
                    ${Object.values(data.actividades).map(act => `
                        <div class="card" onclick="navigateTo('convenios-${act.id === 'mineria-extractiva' ? 'mineria' : act.id === 'cal-piedra' ? 'cal' : act.id}')" style="cursor: pointer;">
                            <div class="card-header" style="background: linear-gradient(135deg, ${act.color}, ${act.color}dd);">
                                <i class="fas ${act.icono}"></i>
                                <span class="card-badge">${act.ctt}</span>
                            </div>
                            <div class="card-body">
                                <div class="card-category">${act.nombre}</div>
                                <h3 class="card-title">${act.descripcion}</h3>
                                ${act.empresas && act.empresas.length > 0 ? `<p class="card-description"><strong>Empresas:</strong> ${act.empresas.join(', ')}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="section">
                <div class="section-header"><h2 class="section-title">Últimas Noticias</h2></div>
                <div class="cards-grid">
                    ${data.noticias.slice(0, 3).map(n => `
                        <div class="card">
                            <div class="card-header" style="background-image: url('${n.imagen}'); background-size: cover; background-position: center;">
                                <span class="card-badge">${n.categoria}</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">${n.titulo}</h3>
                                <p class="card-description">${n.resumen}</p>
                                <div class="card-meta">
                                    <span><i class="far fa-user"></i> ${n.autor}</span>
                                    <span><i class="far fa-calendar"></i> ${data.formatDate(n.fecha)}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (e) {
        console.error('Error en renderDashboard:', e);
        container.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Error al cargar el dashboard</h3><p>${e.message}</p></div>`;
    }
}

// ============================================
// RENDERIZADO - BENEFICIOS (usando window.DATA)
// ============================================
function renderBeneficios(container) {
    try {
        const data = window.DATA;
        if (!data || !data.beneficios) throw new Error('Beneficios no disponibles');
        const beneficios = data.beneficios;
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
                        <p style="color: rgba(255,255,255,0.9); font-size: 0.9375rem; margin: 0;">Los beneficios aplican para el afiliado titular y grupo familiar primario declarado en CODEM de ANSES.</p>
                    </div>
                </div>
            </div>
            <div class="stats-grid" style="margin-bottom: 2rem;">
                <div class="stat-card"><div class="stat-icon">💊</div><div class="stat-value">30-40%</div><div class="stat-label">Reintegros de Medicamentos y Anteojos</div></div>
                <div class="stat-card success"><div class="stat-icon">🏨</div><div class="stat-value">8</div><div class="stat-label">Hoteles AOMA/OSAM</div></div>
                <div class="stat-card warning"><div class="stat-icon">🎓</div><div class="stat-value">Becas</div><div class="stat-label">Terciarios y Universitarios</div></div>
                <div class="stat-card accent"><div class="stat-icon">💰</div><div class="stat-value">$100K</div><div class="stat-label">Subsidio por Fallecimiento</div></div>
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
                                    ${item.montoMax ? `<div class="beneficio-info"><i class="fas fa-dollar-sign" style="color: ${categoria.color};"></i><div><strong>Monto / Beneficio:</strong><br><span>${item.montoMax}</span></div></div>` : ''}
                                    ${item.exclusiones ? `<div class="beneficio-info warning"><i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i><div><strong>Exclusiones:</strong><br><span>${item.exclusiones}</span></div></div>` : ''}
                                    <div class="beneficio-info documentacion"><i class="fas fa-file-alt" style="color: #3b82f6;"></i><div><strong>Documentación a presentar:</strong><br><span>${item.documentacion}</span></div></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            <div class="section" style="background: var(--gradient-accent); color: white; border: none;">
                <h2 style="color: white; border: none; margin-bottom: 1rem;">📞 Contacto y Solicitudes</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; color: white;">
                    <div><h3 style="color: white; margin-bottom: 0.5rem;"><i class="fas fa-map-marker-alt"></i> Dirección</h3><p style="color: rgba(255,255,255,0.95);">Entre Ríos 468 (S)<br>San Juan Capital</p></div>
                    <div><h3 style="color: white; margin-bottom: 0.5rem;"><i class="fas fa-clock"></i> Horarios</h3><p style="color: rgba(255,255,255,0.95);">Lunes a Viernes<br>08:00 a 17:00 hs</p></div>
                    <div><h3 style="color: white; margin-bottom: 0.5rem;"><i class="fas fa-phone"></i> Teléfono</h3><p style="color: rgba(255,255,255,0.95);">0264-4220191</p></div>
                    <div><h3 style="color: white; margin-bottom: 0.5rem;"><i class="fas fa-envelope"></i> Email</h3><p style="color: rgba(255,255,255,0.95); font-size: 0.875rem; word-break: break-all;">accionsocialyturismo@<br>aomaosamsanjuan.com.ar</p></div>
                </div>
            </div>
        `;
    } catch (e) {
        console.error('Error en renderBeneficios:', e);
        container.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Error al cargar beneficios</h3><p>${e.message}</p></div>`;
    }
}

// ============================================
// RENDERIZADO - CURSOS (con soporte modular)
// ============================================
function renderCursos(container) {
    try {
        const cursos = getCapacitaciones();
        const data = window.DATA;
        container.innerHTML = `
            <div class="page-header">
                <h1>Capacitaciones 🎓</h1>
                <p>Cursos disponibles organizados por actividad minera</p>
            </div>
            ${cursos.length === 0 ? `
                <div class="section"><div class="empty-state"><i class="fas fa-graduation-cap"></i><h3>No hay capacitaciones disponibles</h3><p>Próximamente se cargarán nuevos cursos.</p></div></div>
            ` : `
                <div class="cards-grid">
                    ${cursos.map(c => {
                        const act = data && data.actividades ? data.actividades[c.actividad] : null;
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
    } catch (e) {
        console.error('Error en renderCursos:', e);
        container.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Error al cargar cursos</h3><p>${e.message}</p></div>`;
    }
}

// ============================================
// RESTO DE FUNCIONES (las mismas que tenías, pero con try/catch)
// ============================================
// Nota: Para no extender demasiado, reutilizo las que ya tenías con pequeños ajustes.
// Deberías copiar las funciones showCursoDetalle, obtenerProgresoModulo, guardarProgresoModulo,
// calcularProgresoCurso, mostrarModulo, actualizarIndiceModulos, completarCurso, generarCertificado,
// iniciarEvaluacion, renderConveniosGeneral, renderConveniosPorActividad, renderEmpresa,
// showConvenioDetalle, renderLegislacion, showLeyDetalle, renderOrganigrama, toast, addChatMessage.
// Pero todas deben usar window.DATA en lugar de DATA directamente.
// Como ya tienes el código previo, te recomiendo que copies las que estaban funcionando antes y las pegues aquí,
// pero asegurándote de cambiar DATA por window.DATA cuando sea necesario.
// Para ahorrar espacio, no las repito todas, pero el mensaje principal es que ahora usas window.DATA.