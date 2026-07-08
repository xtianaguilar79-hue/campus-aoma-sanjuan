// ============================================
// REGISTRO DE CAPACITACIONES - SISTEMA MODULAR
// Campus Virtual AOMA San Juan
// ============================================

const CAPACITACIONES_REGISTRO = {};

// Función para registrar una capacitación
function registrarCapacitacion(capacitacion) {
    if (!capacitacion.id) {
        console.error('❌ Capacitación sin ID:', capacitacion);
        return;
    }
    CAPACITACIONES_REGISTRO[capacitacion.id] = capacitacion;
    console.log(`✅ Capacitación registrada: ${capacitacion.titulo} (${capacitacion.id})`);
}

// Función para obtener todas las capacitaciones registradas
function obtenerCapacitaciones() {
    return Object.values(CAPACITACIONES_REGISTRO);
}

// Función para obtener una capacitación por ID
function obtenerCapacitacionPorId(id) {
    return CAPACITACIONES_REGISTRO[id] || null;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.CAPACITACIONES_REGISTRO = CAPACITACIONES_REGISTRO;
    window.registrarCapacitacion = registrarCapacitacion;
    window.obtenerCapacitaciones = obtenerCapacitaciones;
    window.obtenerCapacitacionPorId = obtenerCapacitacionPorId;
}

console.log('📚 Sistema de registro de capacitaciones cargado');