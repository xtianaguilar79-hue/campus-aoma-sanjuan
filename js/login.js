/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: login.js (UI Premium & Security Guard Engine)
 */

window.AuthModule = {
    init() {
        this.provisionMockUsersDatabase();
        this.bindAuthEvents();
        this.evaluateSecurityGuard();
    },

    // Aprovisionamiento Automático de Cuentas de Prueba con Metadatos Premium Extendidos
    provisionMockUsersDatabase() {
        if (!localStorage.getItem('aoma_usuarios')) {
            const mockUsers = [
                {
                    id: 'usr_01',
                    email: 'veladero@aoma.org',
                    password: '123',
                    nombre: 'Juan Carlos',
                    apellido: 'Miner',
                    rol: 'user',
                    puesto: 'Operador de Perforadora',
                    seccional: 'San Juan',
                    rama: 'MINERÍA EXTRACTIVA',
                    empresa: 'Veladero',
                    convenio: 'CCT 599/10 Metalífera',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                },
                {
                    id: 'usr_02',
                    email: 'cemento@aoma.org',
                    password: '123',
                    nombre: 'Ricardo',
                    apellido: 'Gómez',
                    rol: 'user',
                    puesto: 'Técnico de Molienda',
                    seccional: 'San Juan',
                    rama: 'CEMENTO',
                    empresa: 'Loma Negra',
                    convenio: 'CCT 53/89',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
                },
                {
                    id: 'usr_admin',
                    email: 'admin@aoma.org',
                    password: 'admin',
                    nombre: 'Administrador',
                    apellido: 'Seccional',
                    rol: 'admin',
                    puesto: 'Secretario Gremial',
                    seccional: 'San Juan',
                    rama: 'MINERÍA EXTRACTIVA',
                    empresa: 'Veladero',
                    convenio: 'Global',
                    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80'
                }
            ];
            localStorage.setItem('aoma_usuarios', JSON.stringify(mockUsers));
        }
    },

    bindAuthEvents() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLoginAttempt(loginForm);
            });
        }

        const logoutBtn = document.getElementById('logout-trigger');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    },

    handleLoginAttempt(form) {
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !passwordInput || !submitBtn) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            this.triggerNotification('Complete los campos obligatorios.', 'warning');
            return;
        }

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<div class="spinner-premium"></div> <span>Autenticando en Servidor...</span>`;

        setTimeout(() => {
            const usuarios = JSON.parse(localStorage.getItem('aoma_usuarios')) || [];
            const usuarioValido = usuarios.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            if (usuarioValido) {
                // Sincronización Estricta del Perfil Premium Completo Requerido para Filtros
                const sesionPublica = {
                    id: usuarioValido.id,
                    nombre: usuarioValido.nombre,
                    apellido: usuarioValido.apellido,
                    email: usuarioValido.email,
                    rol: usuarioValido.rol,
                    puesto: usuarioValido.puesto,
                    seccional: usuarioValido.seccional,
                    rama: usuarioValido.rama,
                    empresa: usuarioValido.empresa,
                    convenio: usuarioValido.convenio,
                    avatar: usuarioValido.avatar
                };

                localStorage.setItem('aoma_session', JSON.stringify(sesionPublica));
                this.triggerNotification(`Identidad Verificada. Bienvenido/a.`, 'success');

                setTimeout(() => {
                    const authLayout = document.getElementById('auth-layout-wrapper');
                    const mainLayout = document.getElementById('main-platform-layout');

                    if (authLayout && mainLayout) {
                        authLayout.classList.add('hidden');
                        mainLayout.classList.remove('hidden');
                        if (window.AppInstance) window.AppInstance.init();
                    }
                }, 500);

            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                this.triggerNotification('Credenciales incorrectas.', 'danger');
                passwordInput.value = '';
                passwordInput.focus();
            }
        }, 450);
    },

    handleLogout() {
        localStorage.removeItem('aoma_session');
        this.triggerNotification('Sesión finalizada con éxito.', 'warning');
        setTimeout(() => {
            window.location.hash = '';
            window.location.reload();
        }, 400);
    },

    evaluateSecurityGuard() {
        const sessionActive = localStorage.getItem('aoma_session');
        const authLayout = document.getElementById('auth-layout-wrapper');
        const mainLayout = document.getElementById('main-platform-layout');

        if (!authLayout || !mainLayout) return;

        if (sessionActive) {
            authLayout.classList.add('hidden');
            mainLayout.classList.remove('hidden');
        } else {
            authLayout.classList.remove('hidden');
            mainLayout.classList.add('hidden');
        }
    },

    triggerNotification(msg, type) {
        if (window.AppInstance && typeof window.AppInstance.showToast === 'function') {
            window.AppInstance.showToast(msg, type);
        } else {
            alert(`[AOMA]: ${msg}`);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.AuthModule.init();
});