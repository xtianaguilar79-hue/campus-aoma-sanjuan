// Sistema de Gestión de Usuarios
const usuarios = {
    init() {
        console.log('Módulo de usuarios inicializado');
    },

    getAll() {
        return JSON.parse(localStorage.getItem(CONFIG.storageKeys.users) || '[]');
    },

    getById(userId) {
        const users = this.getAll();
        return users.find(u => u.id === userId);
    },

    create(userData) {
        const users = this.getAll();
        const newUser = {
            id: Date.now(),
            ...userData,
            active: true,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem(CONFIG.storageKeys.users, JSON.stringify(users));
        return newUser;
    },

    update(userId, userData) {
        const users = this.getAll();
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
            localStorage.setItem(CONFIG.storageKeys.users, JSON.stringify(users));
            return users[index];
        }
        return null;
    },

    delete(userId) {
        const users = this.getAll();
        const filteredUsers = users.filter(u => u.id !== userId);
        localStorage.setItem(CONFIG.storageKeys.users, JSON.stringify(filteredUsers));
        return true;
    },

    toggleStatus(userId) {
        const user = this.getById(userId);
        if (user) {
            user.active = !user.active;
            this.update(userId, user);
            return user;
        }
        return null;
    },

    getByRole(role) {
        const users = this.getAll();
        return users.filter(u => u.role === role);
    },

    search(query) {
        const users = this.getAll();
        const lowerQuery = query.toLowerCase();
        return users.filter(u => 
            u.username.toLowerCase().includes(lowerQuery) ||
            u.name.toLowerCase().includes(lowerQuery) ||
            u.email.toLowerCase().includes(lowerQuery)
        );
    },

    count() {
        return this.getAll().length;
    },

    getActiveCount() {
        return this.getAll().filter(u => u.active).length;
    },

    exportToJSON() {
        const users = this.getAll();
        const dataStr = JSON.stringify(users, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `usuarios-aoma-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.usuarios = usuarios;
}
