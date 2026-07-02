// ============================================
// UTILIDADES GENERALES - AOMA CAMPUS
// ============================================

const Utils = {
    // Generar ID único
    generateId: () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Formatear fecha
    formatDate: (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Formatear moneda
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    // Debounce para búsqueda
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Escapar HTML para seguridad
    escapeHtml: (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Copiar al portapapeles
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            if (typeof app !== 'undefined' && app.showToast) {
                app.showToast('Copiado al portapapeles', 'success');
            }
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    },
    
    // Descargar archivo
    downloadFile: (content, filename, type) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },
    
    // Validar email
    isValidEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Obtener iniciales
    getInitials: (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}

console.log('✅ Utilidades cargadas');