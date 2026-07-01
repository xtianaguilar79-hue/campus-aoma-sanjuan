// Sistema de Login
const login = {
    form: null,
    usernameInput: null,
    passwordInput: null,
    rememberCheckbox: null,
    loginBtn: null,
    
    init() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.rememberCheckbox = document.getElementById('rememberMe');
        this.loginBtn = document.getElementById('loginBtn');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Toggle password visibility
        document.querySelector('.toggle-password')?.addEventListener('click', () => {
            this.togglePassword();
        });
        
        // Check for saved username
        const savedUser = localStorage.getItem('aoma_saved_user');
        if (savedUser) {
            this.usernameInput.value = savedUser;
            this.rememberCheckbox.checked = true;
        }
    },
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const username = this.usernameInput.value.trim().toLowerCase();
        const password = this.passwordInput.value;
        
        // Validación
        if (!username || !password) {
            this.showError('Por favor complete todos los campos');
            return;
        }
        
        // Mostrar loading
        this.setLoading(true);
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Buscar usuario
        const users = JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (!user) {
            this.showError('Usuario o contraseña incorrectos');
            this.setLoading(false);
            return;
        }
        
        if (!user.active) {
            this.showError('Su cuenta está bloqueada. Contacte al administrador');
            this.setLoading(false);
            return;
        }
        
        // Guardar sesión
        if (this.rememberCheckbox.checked) {
            localStorage.setItem('aoma_saved_user', username);
        } else {
            localStorage.removeItem('aoma_saved_user');
        }
        
        // Guardar sesión actual
        const sessionData = {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem(CONFIG.storageKeys.session, JSON.stringify(sessionData));
        
        // Login exitoso
        app.currentUser = sessionData;
        await app.loginSuccess();
    },
    
    togglePassword() {
        const type = this.passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        this.passwordInput.setAttribute('type', type);
        
        const icon = document.querySelector('.toggle-password i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    },
    
    showError(message) {
        const alert = document.getElementById('loginAlert');
        const alertText = document.getElementById('loginAlertText');
        
        alertText.textContent = message;
        alert.classList.remove('hidden');
        
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 5000);
    },
    
    setLoading(loading) {
        const btnText = this.loginBtn.querySelector('.btn-text');
        const btnLoader = this.loginBtn.querySelector('.btn-loader');
        
        if (loading) {
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            this.loginBtn.disabled = true;
        } else {
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            this.loginBtn.disabled = false;
        }
    }
};

// Inicializar login
document.addEventListener('DOMContentLoaded', () => {
    login.init();
});