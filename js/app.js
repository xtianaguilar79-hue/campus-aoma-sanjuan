// ============================================
// APLICACIÓN PRINCIPAL - CAMPUS VIRTUAL AOMA
// VERSIÓN DEFINITIVA CON ADMIN AUTOMÁTICO
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
// HARD RESET - BORRA TODO Y CREA ADMIN
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

    // Borrar todo
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
// PROMOVER A ADMIN (si no hay ninguno)
// ============================================
function asegurarAdministrador() {
    const activos = obtenerUsuariosActivos();
    const pendientes = obtenerUsuariosPendientes();

    // Buscar si ya hay un admin
    const existeAdmin = activos.some(u => u.role === 'admin');

    if (!existeAdmin) {
        // Si hay activos, promover el primero a admin
        if (activos.length > 0) {
            activos[0].role = 'admin';
            activos[0].active = true;
            guardarUsuariosActivos(activos);
            console.log('✅ Usuario promovido a administrador:', activos[0].name);
            return;
        }
        // Si no hay activos pero hay pendientes, promover el primero
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
        // Si no hay ningún usuario, crear admin por defecto
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
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AOMA Campus: Iniciando...');

    // ✅ Asegurar que haya un administrador
    asegurarAdministrador();

    // ✅ EVENTO DE REGISTRO
    const formReg = document.getElementById('formRegistro');
    if (formReg) {
        formReg.addEventListener('submit', handleRegistro);
        console.log('✅ Evento de registro asignado.');
    } else {
        console.warn('⚠️ Formulario de registro no encontrado.');
    }

    // ✅ EVENTO DE LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
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
                showApp();
            } else {
                alert('❌ Usuario o contraseña incorrectos, o tu cuenta no ha sido aprobada aún.');
            }
        });
    }

    // Recuperar sesión
    const savedSession = localStorage.getItem('aoma_session');
    if (savedSession) {
        try {
            currentUser = JSON.parse(savedSession);
            const activos = obtenerUsuariosActivos();
            if (!activos.some(u => u.id === currentUser.id && u.active === true)) {
                localStorage.removeItem('aoma_session');
                currentUser = null;
                showLogin();
            } else {
                showApp();
            }
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

    const formRec = document.getElementById('formRecuperacion');
    if (formRec) {
        formRec.addEventListener('submit', handleRecuperacion);
    }
});

// ============================================
// REGISTRO (mejorado)
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

    // Verificar existencia
    const existeUsuario = activos.some(u => u.username === usuario) || pendientes.some(u => u.username === usuario);
    const existeEmail = activos.some(u => u.email === email) || pendientes.some(u => u.email === email);

    if (existeUsuario) {
        alert('❌ Ese nombre de usuario ya está en uso. Elegí otro.');
        return;
    }
    if (existeEmail) {
        // Si el email existe en pendientes, lo movemos a activos y lo promovemos a admin si no hay admin
        const pendiente = pendientes.find(u => u.email === email);
        if (pendiente) {
            // Actualizar datos del pendiente
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
            // Si no hay admin, lo promovemos
            if (!activos.some(u => u.role === 'admin')) {
                pendiente.role = 'admin';
            }
            // Mover de pendientes a activos
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

    // Determinar rol
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
    
    // Mostrar enlace de administración solo si es admin
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
// NAVEGACIÓN Y RENDERIZADO (TODAS LAS FUNCIONES)
// ============================================
// ... (aquí van todas las funciones de renderizado: renderDashboard, renderBeneficios, etc.)
// Como ya las tienes en tu archivo actual, no las repito para no alargar.
// Asegúrate de que estén definidas.
// ============================================

// ============================================
// TOAST Y CHAT (sin cambios)
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