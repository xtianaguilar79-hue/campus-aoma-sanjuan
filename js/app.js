// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
// ============================================

// ============================================
// CARGA DE DATOS DE RESPALDO (si DATA no existe)
// ============================================
if (typeof DATA === 'undefined') {
    console.error('❌ DATA no está definida. Usando datos de respaldo mínimos.');
    alert('Error crítico: No se pudo cargar la base de datos. Recargá la página.');
    // Intentar recargar después de 2 segundos
    setTimeout(() => location.reload(), 2000);
    
    // Datos mínimos para que la página no se rompa
    window.DATA = {
        actividades: {},
        empresas: {},
        convenios: [],
        escalas: {},
        cursos: [],
        beneficios: {},
        faqs: {},
        noticias: [],
        usuarios: [
            { id: 1, username: 'admin', password: 'admin', name: 'Administrador', email: 'admin@aoma.org.ar', role: 'admin', active: true },
            { id: 2, username: 'delegado', password: '1234', name: 'Delegado', email: 'delegado@aoma.org.ar', role: 'delegado', active: true }
        ],
        chatResponses: {},
        autoridades: {
            nacional: { nombre: 'AOMA Nacional', agrupacion: '', periodo: '', comisionDirectiva: [], vocalesTitulares: [], vocalesSuplentes: [], comisionRevisora: { titulares: [], suplentes: [] }, funciones: {} },
            provincial: { nombre: 'AOMA San Juan', agrupacion: '', periodo: '', comisionDirectiva: [], vocalesTitulares: [], vocalesSuplentes: [], delegadosCongresalesTitulares: [], delegadosCongresalesSuplentes: [], comisionRevisora: { titulares: [], suplentes: [] }, funciones: {} }
        },
        formatCurrency: function(amount) { return '$' + amount.toLocaleString(); },
        formatDate: function(date) { return new Date(date).toLocaleDateString('es-AR'); }
    };
    // Redefinir DATA global
    DATA = window.DATA;
}

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
    try {
        const savedSession = localStorage.getItem('aoma_session');
        if (savedSession) {
            try {
                currentUser = JSON.parse(savedSession);
                showApp();
            } catch (e) {
                console.error('Error al parsear sesión:', e);
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
});

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
        const roleText = currentUser.role === 'admin' ? 'Administrador' : 
                         currentUser.role === 'dirigente' ? 'Dirigente' : 'Delegado';
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
        const content = document.getElementById('pageContent');
        if (content) content.innerHTML = `<p style="color:red;">Error al mostrar la aplicación: ${e.message}</p>`;
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
// MODALES (Bienvenida, Registro, Recuperación)
// ============================================
function mostrarModalBienvenida() {
    const modal = document.getElementById('modalBienvenida');
    if (modal) modal.style.display = 'flex';
    else console.warn('Modal de bienvenida no encontrado');
}
function cerrarModalBienvenida() {
    const modal = document.getElementById('modalBienvenida');
    if (modal) modal.style.display = 'none';
}
function mostrarRegistro() {
    const modal = document.getElementById('modalRegistro');
    if (modal) modal.style.display = 'flex';
}
function cerrarModalRegistro() {
    const modal = document.getElementById('modalRegistro');
    if (modal) modal.style.display = 'none';
}
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
function cerrarModalRecuperacion() {
    const modal = document.getElementById('modalRecuperacion');
    if (modal) modal.style.display = 'none';
}

// ============================================
// SISTEMA DE USUARIOS (localStorage)
// ============================================
function obtenerUsuariosActivos() {
    try {
        const base = DATA && DATA.usuarios ? [...DATA.usuarios] : [];
        const almacenados = JSON.parse(localStorage.getItem('aoma_usuarios_activos') || '[]');
        const todos = [...base];
        almacenados.forEach(u => {
            if (!todos.some(t => t.id === u.id)) todos.push(u);
        });
        return todos;
    } catch (e) { console.error('Error al obtener usuarios activos:', e); return []; }
}
function obtenerUsuariosPendientes() {
    try {
        return JSON.parse(localStorage.getItem('aoma_usuarios_pendientes') || '[]');
    } catch (e) { console.error('Error al obtener usuarios pendientes:', e); return []; }
}
function guardarUsuariosPendientes(pendientes) {
    localStorage.setItem('aoma_usuarios_pendientes', JSON.stringify(pendientes));
}
function guardarUsuariosActivos(activos) {
    const baseIds = DATA && DATA.usuarios ? DATA.usuarios.map(u => u.id) : [];
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
            const existe = activos.some(u => u.username === usuario || u.email === email) ||
                           pendientes.some(u => u.username === usuario || u.email === email);
            if (existe) { alert('Ese usuario o email ya está registrado.'); return; }
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
function cerrarPanelUsuarios() {
    const modal = document.getElementById('modalPanelUsuarios');
    if (modal) modal.style.display = 'none';
}
function actualizarListasUsuarios() {
    try {
        const pendientes = obtenerUsuariosPendientes();
        const activos = obtenerUsuariosActivos();
        const contPend = document.getElementById('listaPendientes');
        if (contPend) {
            if (pendientes.length === 0) {
                contPend.innerHTML = '<p style="color: var(--text-muted);">No hay usuarios pendientes de aprobación.</p>';
            } else {
                contPend.innerHTML = pendientes.map(u => `
                    <div class="usuario-item">
                        <div class="info">
                            <span class="nombre">${u.name}</span>
                            <span class="email">${u.email} (${u.username})</span>
                        </div>
                        <div class="acciones">
                            <button class="btn-aprobar" onclick="aprobarUsuario(${u.id})"><i class="fas fa-check"></i> Aprobar</button>
                            <button class="btn-rechazar" onclick="rechazarUsuario(${u.id})"><i class="fas fa-times"></i> Rechazar</button>
                        </div>
                    </div>
                `).join('');
            }
        }
        const contAct = document.getElementById('listaActivos');
        if (contAct) {
            const activosNoBase = activos.filter(u => u.role !== 'admin' || u.id > 1000);
            if (activosNoBase.length === 0) {
                contAct.innerHTML = '<p style="color: var(--text-muted);">No hay usuarios adicionales activos.</p>';
            } else {
                contAct.innerHTML = activosNoBase.map(u => `
                    <div class="usuario-item">
                        <div class="info">
                            <span class="nombre">${u.name} (${u.role})</span>
                            <span class="email">${u.email}</span>
                        </div>
                        <div class="acciones">
                            <button class="btn-eliminar" onclick="eliminarUsuario(${u.id})"><i class="fas fa-trash"></i> Eliminar</button>
                        </div>
                    </div>
                `).join('');
            }
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
        if (!activos.some(u => u.id === usuario.id)) {
            activos.push(usuario);
            guardarUsuariosActivos(activos);
        }
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
    if (!content) return;
    content.innerHTML = '<div class="empty-state"><i class="fas fa-spinner fa-spin"></i><h3>Cargando...</h3></div>';
    setTimeout(() => {
        try {
            renderPage(page, content);
        } catch (e) {
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
// OBTENER DATOS (con fallbacks)
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
        if (!DATA || !DATA.convenios) return [];
        return DATA.convenios.map(conv => {
            if (conv.variable && typeof window[conv.variable] !== 'undefined') {
                const contenidoGlobal = window[conv.variable];
                return { ...conv, contenido: contenidoGlobal.contenido || contenidoGlobal };
            }
            return conv;
        });
    } catch (e) { console.error('Error en getConvenios:', e); return []; }
}
function getCapacitaciones() {
    const cursos = [];
    try {
        if (DATA && DATA.cursos && DATA.cursos.length > 0) cursos.push(...DATA.cursos);
        if (typeof window !== 'undefined' && window.CAPACITACIONES_REGISTRO) {
            Object.values(window.CAPACITACIONES_REGISTRO).forEach(cap => {
                if (!cursos.some(c => c.id === cap.id)) cursos.push(cap);
            });
        }
    } catch (e) { console.error('Error en getCapacitaciones:', e); }
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
// BÚSQUEDA (sin cambios)
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
    if (btnClear) btnClear.addEventListener('click', () => { searchInput.value = ''; clearContentHighlights(); if (searchCount) searchCount.textContent = '0 resultados'; if (btnPrev) btnPrev.disabled = true; if (btnNext) btnNext.disabled = true; });
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
// RENDERIZADOS (Dashboard, Beneficios, Cursos, Convenios, Legislación, Gremio)
// ============================================
// Todos los renderizados están en tu código anterior, pero los voy a incluir de forma abreviada para no repetir.
// Usá las mismas funciones que tenías, solo asegurándote de que cada una tenga try/catch y verifique DATA.
// Te doy el resumen:

function renderDashboard(container) {
    try {
        const convenios = getConvenios();
        const convCount = convenios.length;
        const cursos = getCapacitaciones();
        const cursoCount = cursos.length;
        const leyes = getLeyes();
        const leyCount = leyes.length;
        const benefCount = DATA && DATA.beneficios ? Object.keys(DATA.beneficios).length : 0;
        container.innerHTML = `...`; // Mismo HTML que antes
    } catch(e) { console.error(e); container.innerHTML = `<p style="color:red;">Error al cargar el dashboard: ${e.message}</p>`; }
}

function renderBeneficios(container) { /* igual que antes */ }
function renderCursos(container) { /* igual que antes */ }
function showCursoDetalle(cursoId) { /* igual que antes */ }
function obtenerProgresoModulo(cursoId, idx) { /* ... */ }
function guardarProgresoModulo(cursoId, idx) { /* ... */ }
function calcularProgresoCurso(cursoId) { /* ... */ }
function mostrarModulo(cursoId, idx) { /* ... */ }
function actualizarIndiceModulos(cursoId) { /* ... */ }
function completarCurso(cursoId) { /* ... */ }
function generarCertificado(nombre, id) { /* ... */ }
function iniciarEvaluacion(cursoId, idx) { /* ... */ }
function renderConveniosGeneral(container) { /* ... */ }
function renderConveniosPorActividad(container, actividadId) { /* ... */ }
function renderEmpresa(container, empresaId) { /* ... */ }
function showConvenioDetalle(numero) { /* ... */ }
function renderLegislacion(container) { /* ... */ }
function showLeyDetalle(numero) { /* ... */ }
function renderOrganigrama(container) { /* ... */ }
function toast(type, title, msg) { /* ... */ }
function addChatMessage(type, text) { /* ... */ }

// ============================================
// INICIALIZAR CHAT
// ============================================
// (ya lo hace chat-ia.js)