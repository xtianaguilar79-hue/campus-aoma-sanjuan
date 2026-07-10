// ============================================
// CAPACITACIÓN: HISTORIA DEL MOVIMIENTO OBRERO ARGENTINO (VERSIÓN EXTENDIDA)
// Fuente: MTEySS - Marzo 2023
// ============================================

const CAPACITACION_MOVIMIENTO_OBRERO = {
    id: 'movimiento-obrero',
    titulo: 'Historia del Movimiento Obrero Argentino',
    subtitulo: 'De las mutuales al sindicalismo del siglo XXI',
    categoria: 'Historia Sindical',
    nivel: 'Avanzado',
    modulos: 6,
    instructor: 'Equipo de Formación AOMA San Juan',
    actividad: 'general',
    imagen: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    descripcion: 'Un recorrido exhaustivo por la historia de la clase trabajadora argentina. Desde las primeras organizaciones mutualistas hasta los desafíos del sindicalismo en el siglo XXI, analizando las luchas, conquistas, derrotas y la construcción de la identidad obrera.',
    objetivos: [
        'Comprender el proceso histórico de formación de la clase obrera argentina.',
        'Analizar el rol del Estado, los empleadores y los sindicatos en cada período.',
        'Identificar las corrientes ideológicas que moldearon el movimiento obrero.',
        'Conocer las grandes luchas y sus protagonistas.',
        'Relacionar la historia nacional con la historia del sindicalismo minero.',
        'Extraer lecciones estratégicas para la acción sindical actual.'
    ],
    fuente: 'Ministerio de Trabajo, Empleo y Seguridad Social - Marzo 2023',
    
    modulosData: [
        { id: 1, titulo: 'Los Orígenes del Movimiento Obrero (1850-1915)', variable: 'MODULO_OBRERO_1', evaluacion: 'Cuestionario de 8 preguntas' },
        { id: 2, titulo: 'Conflictos Sociales y la Fundación de la CGT (1915-1930)', variable: 'MODULO_OBRERO_2', evaluacion: 'Cuestionario de 8 preguntas' },
        { id: 3, titulo: 'La Década Infame y el Nacimiento del Peronismo (1930-1955)', variable: 'MODULO_OBRERO_3', evaluacion: 'Cuestionario de 8 preguntas' },
        { id: 4, titulo: 'Resistencia, Proscripción y el Cordobazo (1955-1973)', variable: 'MODULO_OBRERO_4', evaluacion: 'Cuestionario de 8 preguntas' },
        { id: 5, titulo: 'Terrorismo de Estado y Resistencia Sindical (1973-1983)', variable: 'MODULO_OBRERO_5', evaluacion: 'Cuestionario de 8 preguntas' },
        { id: 6, titulo: 'Democracia, Neoliberalismo y el Sindicalismo del Siglo XXI (1983-2010)', variable: 'MODULO_OBRERO_6', evaluacion: 'Evaluación integradora' }
    ]
};

// Registrar
if (typeof registrarCapacitacion !== 'undefined') {
    registrarCapacitacion(CAPACITACION_MOVIMIENTO_OBRERO);
} else {
    if (typeof window !== 'undefined') {
        window._CAPACITACIONES_PENDIENTES = window._CAPACITACIONES_PENDIENTES || [];
        window._CAPACITACIONES_PENDIENTES.push(CAPACITACION_MOVIMIENTO_OBRERO);
    }
}

if (typeof window !== 'undefined') {
    window.CAPACITACION_MOVIMIENTO_OBRERO = CAPACITACION_MOVIMIENTO_OBRERO;
}

console.log('✅ Capacitación cargada: Historia del Movimiento Obrero (6 módulos extendidos)');