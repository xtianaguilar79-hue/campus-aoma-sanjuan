// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
// VERSIÓN DEFINITIVA (TODAS LAS FUNCIONES)
// ============================================

if (typeof DATA === 'undefined') {
    console.error('❌ DATA no está definida.');
    alert('Error crítico: No se pudo cargar la base de datos. Recargá la página.');
    setTimeout(() => location.reload(), 2000);
    window.DATA = {
        actividades: {}, empresas: {}, convenios: [], escalas: {}, cursos: [], beneficios: {}, faqs: {}, noticias: [], usuarios: [],
        chatResponses: {}, autoridades: { nacional: {}, provincial: {} },
        formatCurrency: function(amount) { return '$' + amount.toLocaleString(); },
        formatDate: function(date) { return new Date(date).toLocaleDateString('es-AR'); }
    };
    DATA = window.DATA;
}

let currentUser = null;
let currentPage = 'inicio';
let searchHighlights = [];
let currentHighlightIndex = -1;
let modalBienvenidaMostrado = false;

// ============================================
// FUNCIONES DE LOCALSTORAGE
// ============================================
function obtenerUsuariosActivos() {
    try {
        return JSON.parse(localStorage.getItem('aoma_usuarios_activos') || '[]');
    } catch (e) { return []; }
}
function obtenerUsuariosPendientes() {
    try {
        return JSON.parse(localStorage.getItem('aoma_usuarios_pendientes') || '[]');
    } catch (e) { return []; }
}
function guardarUsuariosActivos(activos) {
    localStorage.setItem('aoma_usuarios_activos', JSON.stringify(activos));
}
function guardarUsuariosPendientes(pendientes) {
    localStorage.setItem('aoma_usuarios_pendientes', JSON.stringify(pendientes));
}

// ============================================
// HARD RESET Y FORZAR ADMIN
// ============================================
function resetearUsuarios() {
    if (!confirm('⚠️ Esto borrará TODOS los usuarios registrados. ¿Estás seguro?')) return;
    localStorage.removeItem('aoma_usuarios_activos');
    localStorage.removeItem('aoma_usuarios_pendientes');
    localStorage.removeItem('aoma_session');
    alert('✅ Datos de usuarios eliminados. La página se recargará.');
    location.reload();
}

function forzarAdmin() {
    if (!confirm('⚠️ Esto creará al administrador Cristian Aguilar y eliminará cualquier otro usuario. ¿Continuar?')) return;
    localStorage.removeItem('aoma_usuarios_activos');
    localStorage.removeItem('aoma_usuarios_pendientes');
    localStorage.removeItem('aoma_session');
    const admin = {
        id: Date.now(),
        username: 'cristian',
        email: 'aomasjhys@gmail.com',
        password: 'admin123',
        name: 'Cristian Aguilar',
        dni: '12345678',
        telefono: '264-1234567',
        dirigente: false,
        delegado: false,
        empresa: 'veladero',
        actividad: 'mineria-extractiva',
        convenio: '36/89',
        role: 'admin',
        active: true,
        preguntaSeguridad: '¿Cuál es tu color favorito?',
        respuestaSeguridad: 'azul',
        fechaRegistro: new Date().toISOString()
    };
    guardarUsuariosActivos([admin]);
    alert('✅ Administrador creado. Iniciá sesión con usuario "cristian" y contraseña "admin123".');
    location.reload();
}

// ============================================
// ASEGURAR QUE HAYA UN ADMINISTRADOR
// ============================================
function asegurarAdministrador() {
    let activos = obtenerUsuariosActivos();
    let pendientes = obtenerUsuariosPendientes();

    const existeAdmin = activos.some(u => u.role === 'admin');

    if (!existeAdmin) {
        if (activos.length > 0) {
            activos[0].role = 'admin';
            activos[0].active = true;
            guardarUsuariosActivos(activos);
            console.log('✅ Usuario promovido a administrador:', activos[0].name);
            return;
        }
        if (pendientes.length > 0) {
            const candidato = pendientes[0];
            candidato.role = 'admin';
            candidato.active = true;
            pendientes.splice(0, 1);
            guardarUsuariosPendientes(pendientes);
            activos.push(candidato);
            guardarUsuariosActivos(activos);
            console.log('✅ Usuario pendiente promovido a administrador:', candidato.name);
            return;
        }
        if (activos.length === 0 && pendientes.length === 0) {
            const admin = {
                id: Date.now(),
                username: 'cristian',
                email: 'aomasjhys@gmail.com',
                password: 'admin123',
                name: 'Cristian Aguilar',
                dni: '12345678',
                telefono: '264-1234567',
                dirigente: false,
                delegado: false,
                empresa: 'veladero',
                actividad: 'mineria-extractiva',
                convenio: '36/89',
                role: 'admin',
                active: true,
                preguntaSeguridad: '¿Cuál es tu color favorito?',
                respuestaSeguridad: 'azul',
                fechaRegistro: new Date().toISOString()
            };
            guardarUsuariosActivos([admin]);
            console.log('✅ Administrador creado automáticamente.');
        }
    }
}

// ============================================
// REGISTRO (CORREGIDO)
// ============================================
function handleRegistro(e) {
    e.preventDefault();
    console.log('📝 handleRegistro ejecutándose...');

    const nombre = document.getElementById('regNombre').value.trim();
    const dni = document.getElementById('regDni').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const telefono = document.getElementById('regTelefono').value.trim();
    const dirigente = document.getElementById('regDirigente').value;
    const delegado = document.getElementById('regDelegado').value;
    const empresa = document.getElementById('regEmpresa').value;
    const actividad = document.getElementById('regActividad').value;
    const convenio = document.getElementById('regConvenio').value;
    const usuario = document.getElementById('regUsuario').value.trim();
    const password = document.getElementById('regPassword').value;
    const pregunta = document.getElementById('regPregunta').value;
    const respuesta = document.getElementById('regRespuesta').value.trim();

    if (!nombre || !dni || !email || !usuario || !password || !pregunta || !respuesta || !empresa || !actividad || !convenio) {
        alert('Todos los campos marcados con * son obligatorios.');
        return;
    }
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    if (isNaN(dni) || dni.length < 7) {
        alert('Ingresá un DNI válido (solo números).');
        return;
    }

    let activos = obtenerUsuariosActivos();
    let pendientes = obtenerUsuariosPendientes();

    const existeUsuario = activos.some(u => u.username === usuario) || pendientes.some(u => u.username === usuario);
    const existeEmail = activos.some(u => u.email === email) || pendientes.some(u => u.email === email);

    if (existeUsuario) {
        alert('❌ Ese nombre de usuario ya está en uso. Elegí otro.');
        return;
    }
    if (existeEmail) {
        const pendiente = pendientes.find(u => u.email === email);
        if (pendiente) {
            pendiente.name = nombre;
            pendiente.dni = dni;
            pendiente.telefono = telefono;
            pendiente.empresa = empresa;
            pendiente.actividad = actividad;
            pendiente.convenio = convenio;
            pendiente.password = password;
            pendiente.preguntaSeguridad = pregunta;
            pendiente.respuestaSeguridad = respuesta;
            pendiente.active = true;
            if (!activos.some(u => u.role === 'admin')) {
                pendiente.role = 'admin';
            }
            const idx = pendientes.indexOf(pendiente);
            pendientes.splice(idx, 1);
            activos.push(pendiente);
            guardarUsuariosActivos(activos);
            guardarUsuariosPendientes(pendientes);
            alert('✅ Tu cuenta ha sido activada. Podés iniciar sesión.');
            cerrarModalRegistro();
            location.reload();
            return;
        } else {
            alert('❌ Ese email ya está registrado como usuario activo. Usá otro.');
            return;
        }
    }

    let role = 'afiliado';
    if (dirigente === 'si') role = 'dirigente';
    else if (delegado === 'si') role = 'delegado';

    const esPrimerUsuario = activos.length === 0 && pendientes.length === 0;
    if (esPrimerUsuario) {
        role = 'admin';
    }

    const nuevoUsuario = {
        id: Date.now(),
        username: usuario,
        email: email,
        password: password,
        name: nombre,
        dni: dni,
        telefono: telefono,
        dirigente: dirigente === 'si',
        delegado: delegado === 'si',
        empresa: empresa,
        actividad: actividad,
        convenio: convenio,
        role: role,
        active: esPrimerUsuario,
        preguntaSeguridad: pregunta,
        respuestaSeguridad: respuesta,
        fechaRegistro: new Date().toISOString()
    };

    if (esPrimerUsuario) {
        activos.push(nuevoUsuario);
        guardarUsuariosActivos(activos);
        alert('✅ ¡Usuario administrador creado exitosamente! Ahora podés iniciar sesión.');
        cerrarModalRegistro();
        location.reload();
    } else {
        pendientes.push(nuevoUsuario);
        guardarUsuariosPendientes(pendientes);
        alert('📩 Tu registro ha sido enviado. El administrador lo aprobará en breve.');
        cerrarModalRegistro();
        document.getElementById('formRegistro').reset();
    }
}

// ============================================
// RECUPERACIÓN DE CONTRASEÑA
// ============================================
function handleRecuperacion(e) {
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
}

// ============================================
// LOGIN / LOGOUT
// ============================================
function showLogin() {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) overlay.style.display = 'flex';
    document.querySelector('.header')?.style.setProperty('display', 'none');
    document.querySelector('.main-content')?.style.setProperty('display', 'none');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function showApp() {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) overlay.style.display = 'none';
    document.querySelector('.header')?.style.setProperty('display', 'flex');
    document.querySelector('.main-content')?.style.setProperty('display', 'block');

    if (!currentUser) { showLogin(); return; }

    document.getElementById('userName').textContent = currentUser.name;
    const roleText = currentUser.role === 'admin' ? 'Administrador' :
                     currentUser.role === 'dirigente' ? 'Dirigente' : 'Delegado';
    document.getElementById('userRole').textContent = roleText;
    document.getElementById('userAvatar').textContent = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    const adminLink = document.getElementById('adminPanelLink');
    if (adminLink) {
        adminLink.style.display = currentUser.role === 'admin' ? 'block' : 'none';
    }
    
    navigateTo('inicio');
    if (!modalBienvenidaMostrado) {
        mostrarModalBienvenida();
        modalBienvenidaMostrado = true;
    }
}

function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('aoma_session');
        currentUser = null;
        modalBienvenidaMostrado = false;
        showLogin();
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
// MODALES
// ============================================
function mostrarModalBienvenida() {
    const modal = document.getElementById('modalBienvenida');
    if (modal) modal.style.display = 'flex';
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
// PANEL DE ADMINISTRACIÓN
// ============================================
function mostrarPanelUsuarios() {
    if (currentUser.role !== 'admin') { alert('Solo el administrador puede acceder a este panel.'); return; }
    document.getElementById('modalPanelUsuarios').style.display = 'flex';
    actualizarListasUsuarios();
}
function cerrarPanelUsuarios() {
    document.getElementById('modalPanelUsuarios').style.display = 'none';
}
function actualizarListasUsuarios() {
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
                        <span style="font-size:0.8rem; color:var(--text-muted);">DNI: ${u.dni || 'N/A'} - ${u.empresa || ''} - ${u.actividad || ''}</span>
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
        if (activos.length === 0) {
            contAct.innerHTML = '<p style="color: var(--text-muted);">No hay usuarios activos.</p>';
        } else {
            contAct.innerHTML = activos.map(u => `
                <div class="usuario-item">
                    <div class="info">
                        <span class="nombre">${u.name} (${u.role})</span>
                        <span class="email">${u.email}</span>
                        <span style="font-size:0.8rem; color:var(--text-muted);">${u.empresa || ''} - ${u.actividad || ''}</span>
                    </div>
                    <div class="acciones">
                        <button class="btn-eliminar" onclick="eliminarUsuario(${u.id})"><i class="fas fa-trash"></i> Eliminar</button>
                    </div>
                </div>
            `).join('');
        }
    }
}
function aprobarUsuario(id) {
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
}
function rechazarUsuario(id) {
    if (!confirm('¿Estás seguro de rechazar este usuario?')) return;
    const pendientes = obtenerUsuariosPendientes();
    const index = pendientes.findIndex(u => u.id === id);
    if (index === -1) return;
    pendientes.splice(index, 1);
    guardarUsuariosPendientes(pendientes);
    actualizarListasUsuarios();
}
function eliminarUsuario(id) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    const activos = obtenerUsuariosActivos();
    const index = activos.findIndex(u => u.id === id);
    if (index === -1) return;
    activos.splice(index, 1);
    guardarUsuariosActivos(activos);
    actualizarListasUsuarios();
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
// FUNCIONES AUXILIARES
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

function setupEvents() {
    try {
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        if (menuBtn) menuBtn.addEventListener('click', () => { mobileMenu.classList.add('active'); mobileMenuOverlay.classList.add('active'); });
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
        document.getElementById('themeBtn').addEventListener('click', toggleTheme);
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('userDropdown').classList.toggle('active');
            });
        }
        document.addEventListener('click', () => {
            document.getElementById('userDropdown').classList.remove('active');
        });
        document.getElementById('chatBtn').addEventListener('click', () => {
            document.getElementById('chatWindow').classList.toggle('hidden');
        });
        document.getElementById('chatClose').addEventListener('click', () => {
            document.getElementById('chatWindow').classList.add('hidden');
        });
    } catch (e) { console.error('Error en setupEvents:', e); }
}
function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('active');
    document.getElementById('mobileMenuOverlay').classList.remove('active');
}

// ============================================
// BÚSQUEDA DE CONTENIDO
// ============================================
function setupContentSearch(contentSelector) {
    const searchInput = document.getElementById('contentSearchInput');
    if (!searchInput) return;
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query.length < 2) {
            clearContentHighlights();
            return;
        }
        performContentSearch(query, contentSelector);
    });
}
function performContentSearch(query, contentSelector) {
    clearContentHighlights();
    const contentEl = document.querySelector(contentSelector);
    if (!contentEl) return;
    const walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            if (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
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
}
function clearContentHighlights() {
    document.querySelectorAll('.search-highlight').forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================
// RENDERIZADOS - TODAS LAS FUNCIONES
// ============================================

function renderDashboard(container) {
    try {
        const convenios = getConvenios();
        const convCount = convenios.length;
        const cursos = getCapacitaciones();
        const cursoCount = cursos.length;
        const leyes = getLeyes();
        const leyCount = leyes.length;
        const benefCount = DATA && DATA.beneficios ? Object.keys(DATA.beneficios).length : 0;
        container.innerHTML = `
            <div class="page-header">
                <h1>¡Bienvenido, ${currentUser.name.split(' ')[0]}! 👋</h1>
                <p>Panel de control del Campus Virtual AOMA San Juan</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card accent" onclick="navigateTo('convenios')">
                    <div class="stat-icon-wrapper"><i class="fas fa-file-contract"></i></div>
                    <div class="stat-content">
                        <div class="stat-value">${convCount}</div>
                        <div class="stat-label">Convenios CCT</div>
                    </div>
                    <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="stat-card success" onclick="navigateTo('beneficios')">
                    <div class="stat-icon-wrapper"><i class="fas fa-gift"></i></div>
                    <div class="stat-content">
                        <div class="stat-value">${benefCount}</div>
                        <div class="stat-label">Categorías de Beneficios</div>
                    </div>
                    <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="stat-card warning" onclick="navigateTo('cursos')">
                    <div class="stat-icon-wrapper"><i class="fas fa-graduation-cap"></i></div>
                    <div class="stat-content">
                        <div class="stat-value">${cursoCount}</div>
                        <div class="stat-label">Cursos disponibles</div>
                    </div>
                    <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="stat-card" onclick="navigateTo('legislacion')">
                    <div class="stat-icon-wrapper" style="background: linear-gradient(135deg, #6b7280, #4b5563);">
                        <i class="fas fa-balance-scale"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">${leyCount}</div>
                        <div class="stat-label">Leyes laborales</div>
                    </div>
                    <div class="stat-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
            </div>
            <div class="section">
                <div class="section-header"><h2 class="section-title">Accesos Rápidos</h2></div>
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
            <div class="section">
                <div class="section-header"><h2 class="section-title">Estructura de AOMA San Juan</h2></div>
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
                                ${act.empresas && act.empresas.length > 0 ? `<p class="card-description"><strong>Empresas:</strong> ${act.empresas.join(', ')}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="section">
                <div class="section-header"><h2 class="section-title">Últimas Noticias</h2></div>
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
    } catch(e) { console.error(e); container.innerHTML = `<p style="color:red;">Error al cargar el dashboard: ${e.message}</p>`; }
}

function renderBeneficios(container) {
    const beneficios = DATA.beneficios;
    if (!beneficios) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-gift"></i><h3>Beneficios no disponibles</h3></div>';
        return;
    }
    let html = `
        <div class="page-header">
            <h1>Beneficios Sociales 🎁</h1>
            <p>Beneficios exclusivos para afiliados titulares y grupo familiar primario</p>
        </div>
    `;
    Object.entries(beneficios).forEach(([catId, categoria]) => {
        html += `
            <div class="section">
                <div class="section-header">
                    <h2 class="section-title">
                        <i class="fas ${categoria.icono}" style="color: ${categoria.color};"></i>
                        ${categoria.titulo}
                        <span style="font-size: 0.875rem; color: var(--text-muted); background: var(--bg-input); padding: 0.25rem 0.75rem; border-radius: var(--radius-full);">
                            ${categoria.items.length} beneficio${categoria.items.length !== 1 ? 's' : ''}
                        </span>
                    </h2>
                </div>
                <div class="beneficios-grid">
                    ${categoria.items.map(item => `
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
        `;
    });
    container.innerHTML = html;
}

function renderCursos(container) {
    const cursos = getCapacitaciones();
    if (cursos.length === 0) {
        container.innerHTML = `
            <div class="page-header"><h1>Capacitaciones 🎓</h1></div>
            <div class="empty-state"><i class="fas fa-graduation-cap"></i><h3>No hay capacitaciones disponibles</h3><p>Próximamente se cargarán nuevos cursos.</p></div>
        `;
        return;
    }
    let html = `
        <div class="page-header">
            <h1>Capacitaciones 🎓</h1>
            <p>Cursos disponibles organizados por actividad minera</p>
        </div>
        <div class="cards-grid">
    `;
    cursos.forEach(c => {
        const act = DATA.actividades[c.actividad];
        html += `
            <div class="card" onclick="showCursoDetalle('${c.id}')">
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
    });
    html += '</div>';
    container.innerHTML = html;
}

function showCursoDetalle(cursoId) {
    toast('info', 'Curso', 'Detalle del curso en construcción.');
}

function obtenerProgresoModulo(cursoId, moduloIndex) { return false; }
function guardarProgresoModulo(cursoId, moduloIndex) {}
function calcularProgresoCurso(cursoId) { return 0; }
function mostrarModulo(cursoId, moduloIndex) {}
function actualizarIndiceModulos(cursoId) {}
function completarCurso(cursoId) {}
function generarCertificado(nombreCurso, cursoId) {}
function iniciarEvaluacion(cursoId, moduloIndex) {}

function renderConveniosGeneral(container) {
    const convenios = getConvenios();
    const convAct = convenios.filter(c => !c.empresa);
    const convEmp = convenios.filter(c => c.empresa);
    const porActividad = {};
    convAct.forEach(c => {
        if (!porActividad[c.actividad]) porActividad[c.actividad] = [];
        porActividad[c.actividad].push(c);
    });
    let html = `
        <div class="page-header"><h1>Convenios Colectivos de Trabajo 📋</h1><p>Normativas vigentes organizadas por actividad y por empresa</p></div>
        <div class="stats-grid" style="margin-bottom: 2rem;">
            ${Object.keys(porActividad).map(actId => {
                const act = DATA.actividades[actId];
                return `<div class="stat-card" onclick="navigateTo('convenios-${actId === 'mineria-extractiva' ? 'mineria' : actId}')"><div class="stat-icon" style="color: ${act?.color || '#000'};">${act?.icono || '📄'}</div><div class="stat-value">${porActividad[actId].length}</div><div class="stat-label">${act?.nombre || actId}</div></div>`;
            }).join('')}
        </div>
    `;
    if (convEmp.length > 0) {
        html += `
            <div class="section">
                <div class="section-header"><h2 class="section-title"><i class="fas fa-building" style="color: #0891b2;"></i> Convenios por Empresa</h2></div>
                <div class="cards-grid">
                    ${convEmp.map(c => {
                        const emp = DATA.empresas[c.empresa];
                        return `<div class="card" onclick="navigateTo('empresa-${c.empresa}')" style="cursor: pointer;">
                            <div class="card-header" style="background: linear-gradient(135deg, ${emp?.color || '#333'}, ${emp?.color || '#333'}dd);"><i class="fas ${emp?.icono || 'fa-building'}"></i></div>
                            <div class="card-body"><div class="card-category">${c.empresa}</div><h3 class="card-title">${c.titulo}</h3><p class="card-description">${c.resumen}</p></div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function renderConveniosPorActividad(container, actividadId) {
    const act = DATA.actividades[actividadId];
    if (!act) { container.innerHTML = '<div class="empty-state"><h3>Actividad no encontrada</h3></div>'; return; }
    const convenios = getConvenios().filter(c => c.actividad === actividadId && !c.empresa);
    const escalas = DATA.escalas[actividadId] || [];
    let html = `
        <div class="page-header"><button class="btn btn-ghost" onclick="navigateTo('convenios')"><i class="fas fa-arrow-left"></i> Volver a Convenios</button></div>
        <div class="activity-hero"><div class="activity-hero-content" style="background: linear-gradient(135deg, ${act.color}, ${act.color}dd);"><h1><i class="fas ${act.icono}"></i> ${act.nombre}</h1><p>${act.descripcion}</p><p style="margin-top: 0.5rem;"><strong>Convenio principal:</strong> ${act.ctt}</p></div></div>
    `;
    if (convenios.length > 0) {
        html += `
            <div class="section"><div class="section-header"><h2 class="section-title">Convenios Colectivos</h2></div>
            <div class="cards-grid">
                ${convenios.map(c => `
                    <div class="card" onclick="showConvenioDetalle('${c.numero}')" style="cursor: pointer;">
                        <div class="card-header" style="background: linear-gradient(135deg, ${act.color}, ${act.color}dd);"><i class="fas fa-file-contract"></i><span class="card-badge">${c.numero}</span></div>
                        <div class="card-body"><h3 class="card-title">${c.subtitulo || c.titulo}</h3><p class="card-description">${c.resumen}</p></div>
                    </div>
                `).join('')}
            </div></div>
        `;
    }
    if (escalas.length > 0) {
        html += `
            <div class="section"><h2 class="section-title" style="margin-bottom: 1rem;">Escalas Salariales</h2>
            <div class="table-container"><table class="table"><thead><tr><th>Categoría</th><th>Nivel</th><th>Haber Básico</th></tr></thead><tbody>
                ${escalas.map(e => `<tr><td><b>${e.categoria}</b></td><td>${e.nivel}</td><td><strong>${DATA.formatCurrency(e.salario)}</strong></td></tr>`).join('')}
            </tbody></table></div></div>
        `;
    }
    container.innerHTML = html;
}

function renderEmpresa(container, empresaId) {
    const empresa = DATA.empresas[empresaId];
    if (!empresa) { container.innerHTML = '<div class="empty-state"><h3>Empresa no encontrada</h3></div>'; return; }
    const convenios = getConvenios().filter(c => c.empresa === empresaId);
    let html = `
        <div class="page-header"><button class="btn btn-ghost" onclick="navigateTo('convenios')"><i class="fas fa-arrow-left"></i> Volver a Convenios</button></div>
        <div class="activity-hero"><div class="activity-hero-content" style="background: linear-gradient(135deg, ${empresa.color}, ${empresa.color}dd);"><h1><i class="fas ${empresa.icono}"></i> ${empresa.nombre}</h1><p>${empresa.descripcion}</p><div style="margin-top: 0.75rem;"><span><i class="fas fa-building"></i> ${empresa.empresa}</span><span style="margin-left: 1rem;"><i class="fas fa-map-marker-alt"></i> ${empresa.ubicacion}</span></div></div></div>
        <div class="section"><div class="section-header"><h2 class="section-title">Convenio Colectivo</h2></div>
        ${convenios.length > 0 ? `
            <div class="cards-grid">${convenios.map(c => `
                <div class="card" onclick="showConvenioDetalle('${c.numero}')" style="cursor: pointer;">
                    <div class="card-header" style="background: linear-gradient(135deg, ${empresa.color}, ${empresa.color}dd);"><i class="fas fa-file-contract"></i><span class="card-badge">${c.numero}</span></div>
                    <div class="card-body"><h3 class="card-title">${c.subtitulo || c.titulo}</h3><p class="card-description">${c.resumen}</p></div>
                </div>
            `).join('')}</div>
        ` : `<div class="empty-state"><i class="fas fa-file-alt"></i><h3>Convenio en carga</h3></div>`}
        </div>
    `;
    container.innerHTML = html;
}

function showConvenioDetalle(numero) {
    const convenios = getConvenios();
    const conv = convenios.find(c => c.numero === numero);
    if (!conv) { toast('error', 'Error', 'Convenio no encontrado'); return; }
    const act = DATA.actividades[conv.actividad];
    const container = document.getElementById('pageContent');
    const contenido = conv.contenido || `<div class="empty-state"><i class="fas fa-file-alt"></i><h3>Contenido en carga</h3><p>${conv.resumen}</p></div>`;
    container.innerHTML = `
        <div class="page-header"><button class="btn btn-ghost" onclick="navigateTo('convenios')"><i class="fas fa-arrow-left"></i> Volver a convenios</button></div>
        <div class="activity-hero"><div class="activity-hero-content" style="background: linear-gradient(135deg, ${act ? act.color : '#1e3a8a'}, ${act ? act.color + 'dd' : '#3b82f6'});"><h1><i class="fas fa-file-contract"></i> ${conv.numero}</h1><p>${conv.subtitulo || conv.titulo}</p></div></div>
        <div class="section"><h2 class="section-title" style="margin-bottom: 1rem;">${conv.titulo}</h2><div id="convenioContent">${contenido}</div></div>
    `;
}

function renderLegislacion(container) {
    const leyes = getLeyes();
    if (leyes.length === 0) {
        container.innerHTML = `<div class="page-header"><h1>Legislación Laboral ⚖️</h1></div><div class="empty-state"><i class="fas fa-balance-scale"></i><h3>Leyes en carga</h3></div>`;
        return;
    }
    let html = `<div class="page-header"><h1>Legislación Laboral ⚖️</h1><p>Leyes y normativas laborales aplicables al sector minero</p></div><div class="cards-grid">`;
    leyes.forEach(l => {
        html += `
            <div class="card" onclick="showLeyDetalle('${l.numero}')">
                <div class="card-header" style="background: var(--gradient-primary);"><i class="fas fa-balance-scale"></i><span class="card-badge">${l.numero}</span></div>
                <div class="card-body"><div class="card-category">${l.categoria}</div><h3 class="card-title">${l.titulo}</h3><p class="card-description">${l.resumen}</p></div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function showLeyDetalle(numero) {
    const leyes = getLeyes();
    const ley = leyes.find(l => l.numero === numero);
    if (!ley) { toast('error', 'Error', 'Ley no encontrada'); return; }
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="page-header"><button class="btn btn-ghost" onclick="navigateTo('legislacion')"><i class="fas fa-arrow-left"></i> Volver a legislación</button></div>
        <div class="activity-hero"><div class="activity-hero-content" style="background: var(--gradient-primary);"><h1><i class="fas fa-balance-scale"></i> ${ley.numero}</h1><p>${ley.titulo}</p></div></div>
        <div class="section"><h2 class="section-title" style="margin-bottom: 0.5rem;">${ley.titulo}</h2><div id="leyContent">${ley.contenido}</div></div>
    `;
}

function renderOrganigrama(container) {
    const auth = DATA.autoridades;
    if (!auth) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><h3>No hay datos de autoridades</h3></div>';
        return;
    }
    const renderList = (arr) => arr.map((n, i) => `<li>${i+1}. ${n}</li>`).join('');
    const renderComision = (comision, funciones) => {
        return comision.map(m => {
            const funcDesc = funciones[m.cargo] || 'Sin descripción de funciones.';
            return `<li><strong>${m.cargo}:</strong> ${m.nombre}<button class="btn-funcion" onclick="this.nextElementSibling.classList.toggle('visible')"><i class="fas fa-info-circle"></i> Ver función</button><div class="funcion-detalle">${funcDesc}</div></li>`;
        }).join('');
    };
    container.innerHTML = `
        <div class="page-header"><h1>📋 Estructura Orgánica de AOMA</h1><p>Autoridades nacionales y de la Seccional San Juan</p></div>
        <div class="section organigrama-section"><h2 class="section-title" style="margin-bottom: 1.5rem;">🇦🇷 Consejo Directivo Nacional</h2>
            <div class="organigrama-card"><div class="organigrama-header" style="background: var(--gradient-primary);"><h3>${auth.nacional.nombre}</h3><p>${auth.nacional.agrupacion} - ${auth.nacional.periodo}</p></div>
            <div class="organigrama-body"><div class="organigrama-grid">
                <div class="organigrama-col"><h4>Comisión Directiva</h4><ul class="organigrama-lista">${renderComision(auth.nacional.comisionDirectiva, auth.nacional.funciones)}</ul></div>
                <div class="organigrama-col"><h4>Vocales Titulares</h4><ul class="organigrama-lista">${renderList(auth.nacional.vocalesTitulares)}</ul></div>
                <div class="organigrama-col"><h4>Vocales Suplentes</h4><ul class="organigrama-lista">${renderList(auth.nacional.vocalesSuplentes)}</ul></div>
                <div class="organigrama-col"><h4>Comisión Revisora de Cuentas</h4><p><strong>Titulares:</strong></p><ul class="organigrama-lista">${renderList(auth.nacional.comisionRevisora.titulares)}</ul><p><strong>Suplentes:</strong></p><ul class="organigrama-lista">${renderList(auth.nacional.comisionRevisora.suplentes)}</ul></div>
            </div></div></div>
        </div>
        <div class="section organigrama-section"><h2 class="section-title" style="margin-bottom: 1.5rem;">🏔️ Seccional San Juan</h2>
            <div class="organigrama-card"><div class="organigrama-header" style="background: var(--gradient-accent);"><h3>${auth.provincial.nombre}</h3><p>${auth.provincial.agrupacion} - ${auth.provincial.periodo}</p></div>
            <div class="organigrama-body"><div class="organigrama-grid">
                <div class="organigrama-col"><h4>Comisión Directiva</h4><ul class="organigrama-lista">${renderComision(auth.provincial.comisionDirectiva, auth.provincial.funciones)}</ul></div>
                <div class="organigrama-col"><h4>Vocales Titulares</h4><ul class="organigrama-lista">${renderList(auth.provincial.vocalesTitulares)}</ul></div>
                <div class="organigrama-col"><h4>Vocales Suplentes</h4><ul class="organigrama-lista">${renderList(auth.provincial.vocalesSuplentes)}</ul></div>
                <div class="organigrama-col"><h4>Delegados Congresales Titulares</h4><ul class="organigrama-lista">${renderList(auth.provincial.delegadosCongresalesTitulares)}</ul></div>
                <div class="organigrama-col"><h4>Delegados Congresales Suplentes</h4><ul class="organigrama-lista">${renderList(auth.provincial.delegadosCongresalesSuplentes)}</ul></div>
                <div class="organigrama-col"><h4>Comisión Revisora de Cuentas</h4><p><strong>Titulares:</strong></p><ul class="organigrama-lista">${renderList(auth.provincial.comisionRevisora.titulares)}</ul><p><strong>Suplentes:</strong></p><ul class="organigrama-lista">${renderList(auth.provincial.comisionRevisora.suplentes)}</ul></div>
            </div></div></div>
        </div>
    `;
}

// ============================================
// TOAST Y CHAT
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
        <div class="toast-content"><div class="toast-title">${title}</div><div class="toast-message">${message}</div></div>
        <button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 5000);
}

function addChatMessage(type, text) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    const div = document.createElement('div');
    div.className = 'chat-message ' + type;
    const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute:'2-digit' });
    const avatar = type === 'user'
        ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : `<img src="assets/chat-avatar.png" alt="AOMA" style="width:32px; height:32px; border-radius:50%; object-fit:cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-robot\\'></i>';">`;
    div.innerHTML = `
        <div class="chat-message-avatar">${avatar}</div>
        <div><div class="chat-message-content">${text.replace(/\n/g, '<br>')}</div><div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${time}</div></div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}