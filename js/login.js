/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Core 02: Controlador de Autenticación, Guard de Seguridad y Persistencia de Sesión
 */

window.AuthModule = {
    // Inicializador del módulo de acceso
    init() {
        this.bindAuthEvents();
        this.evaluateSecurityGuard();
    },

    // Vinculación de eventos al formulario de Login corporativo
    bindAuthEvents() {
        const loginForm = document.getElementById('login-form');
        if (!loginForm) return;

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLoginAttempt(loginForm);
        });

        // Trigger para el cierre de sesión (Logout)
        const logoutBtn = document.getElementById('logout-trigger');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    },

    // Procesador táctil y de teclado para intentos de Login
    handleLoginAttempt(form) {
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !passwordInput || !submitBtn) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // 1. Validación de campos requeridos
        if (!email || !password) {
            this.triggerNotification('Por favor, complete todos los campos requeridos.', 'warning');
            return;
        }

        // 2. Interfaz visual reactiva: Estado de carga (Spinner animado)
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; gap:8px;">
            <div class="spinner"></div>
            <span>Verificando Identidad...</span>
        </div>`;

        // Simulamos un retraso asíncrono premium de red local (450ms)
        setTimeout(() => {
            // 3. Consulta al repositorio de usuarios sembrados en LocalStorage
            const usuariosRegistrados = JSON.parse(localStorage.getItem('aoma_usuarios')) || [];
            
            const usuarioValido = usuariosRegistrados.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            if (usuarioValido) {
                // 4. Login Exitoso: Se sanitizan datos sensibles antes de escribir la sesión pública
                const sesionPublica = {
                    id: usuarioValido.id,
                    nombre: usuarioValido.nombre,
                    apellido: usuarioValido.apellido,
                    email: usuarioValido.email,
                    rol: usuarioValido.rol,
                    puesto: usuarioValido.puesto,
                    avatar: usuarioValido.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                };

                localStorage.setItem('aoma_session', JSON.stringify(sesionPublica));
                
                this.triggerNotification(`¡Bienvenido, ${sesionPublica.nombre}! Autenticación correcta.`, 'success');

                // 5. Transición fluida a la estructura principal de la SPA
                setTimeout(() => {
                    const authLayout = document.getElementById('auth-layout-wrapper');
                    const mainLayout = document.getElementById('main-platform-layout');

                    if (authLayout && mainLayout) {
                        authLayout.classList.add('hidden');
                        mainLayout.classList.remove('hidden');
                        
                        // Inicializa la instancia estructural del App Engine
                        if (window.AppInstance) {
                            window.AppInstance.init();
                        }
                    }
                }, 500);

            } else {
                // 6. Login Fallido: Error de credenciales
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                this.triggerNotification('Credenciales inválidas. Revise su e-mail o clave de acceso.', 'danger');
                passwordInput.value = '';
                passwordInput.focus();
            }
        }, 450);
    },

    // Manejador del Cierre de Sesión Seguro (Destructor de Estados)
    handleLogout() {
        localStorage.removeItem('aoma_session');
        this.triggerNotification('Sesión finalizada correctamente.', 'info');

        setTimeout(() => {
            // Forzar recarga limpia hacia la raíz estructural del login
            window.location.hash = '#dashboard';
            window.location.reload();
        }, 400);
    },

    // Guardián de Seguridad (AuthGuard) perimetral en tiempo de renderizado
    evaluateSecurityGuard() {
        const sessionActive = localStorage.getItem('aoma_session');
        const authLayout = document.getElementById('auth-layout-wrapper');
        const mainLayout = document.getElementById('main-platform-layout');

        if (!authLayout || !mainLayout) return;

        if (sessionActive) {
            // El usuario ya cuenta con token de sesión activo
            authLayout.classList.add('hidden');
            mainLayout.classList.remove('hidden');
        } else {
            // El usuario no está autenticado, forzar pantalla de login limpia
            authLayout.classList.remove('hidden');
            mainLayout.classList.add('hidden');
        }
    },

    // Enrutador interno para alertas rápidas acopladas al App Engine o nativas
    triggerNotification(msg, type) {
        if (window.AppInstance && typeof window.AppInstance.showToast === 'function') {
            window.AppInstance.showToast(msg, type);
        } else {
            // Fallback en caso de que no se haya instanciado el toast wrapper global aún
            alert(`[AOMA - ${type.toUpperCase()}]: ${msg}`);
        }
    }
};

// Ejecución perimetral automática al compilar el script
document.addEventListener('DOMContentLoaded', () => {
    window.AuthModule.init();
});