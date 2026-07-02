// ============================================
// CONFIGURACIÓN GLOBAL - AOMA CAMPUS
// ============================================

const CONFIG = {
    appName: 'Campus Virtual AOMA',
    version: '1.0.0',
    
    // Claves para localStorage
    storageKeys: {
        users: 'aoma_users',
        session: 'aoma_session',
        theme: 'aoma_theme',
        certificates: 'aoma_certificates',
        evaluations: 'aoma_evaluations',
        chatHistory: 'aoma_chat_history'
    },
    
    // Usuarios por defecto
    defaultUsers: [
        {
            id: 1,
            username: 'admin',
            password: 'admin',
            name: 'Administrador del Sistema',
            email: 'admin@aoma.org.ar',
            role: 'admin',
            active: true,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            username: 'delegado',
            password: '1234',
            name: 'Juan Carlos Delegado',
            email: 'delegado@aoma.org.ar',
            role: 'delegado',
            active: true,
            department: 'cemento',
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            username: 'dirigente',
            password: '1234',
            name: 'María Fernanda Dirigente',
            email: 'dirigente@aoma.org.ar',
            role: 'dirigente',
            active: true,
            department: 'mineria-extractiva',
            createdAt: new Date().toISOString()
        }
    ]
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

console.log('✅ Configuración cargada');