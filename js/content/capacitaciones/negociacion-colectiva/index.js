// ============================================
// CAPACITACIÓN: NEGOCIACIÓN COLECTIVA
// Fuente: Ministerio de Trabajo, Empleo y Seguridad Social
// Versión: Abril 2023
// ============================================

const CAPACITACION_NEGOCIACION_COLECTIVA = {
    id: 'negociacion-colectiva',
    titulo: 'Introducción a la Negociación Colectiva',
    subtitulo: 'Programa de Apoyo a la Formación Sindical',
    categoria: 'Formación Sindical',
    nivel: 'Intermedio',
    duracion: '16 horas (8 módulos)',
    modulos: 8,
    instructor: 'Equipo de Formación AOMA San Juan',
    actividad: 'general',
    imagen: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    descripcion: 'La negociación colectiva constituye una pieza clave del sistema social. Su vigencia y las prácticas que suscita concretan modalidades relativamente estables de institucionalización de los conflictos laborales, posibilitan un marco consensuado de gestión de lo social y generan normas contractuales capaces de articular maduramente intereses sectoriales en pugna.',
    objetivos: [
        'Comprender el concepto y la importancia de la negociación colectiva',
        'Conocer el marco normativo que regula la negociación colectiva en Argentina',
        'Identificar los elementos condicionantes y los componentes del sistema',
        'Aprender el paso a paso del proceso de negociación',
        'Desarrollar habilidades y estrategias para la negociación sindical'
    ],
    fuente: 'Ministerio de Trabajo, Empleo y Seguridad Social - Abril 2023',
    
    // Módulos de la capacitación
    modulosData: [
        {
            id: 1,
            titulo: '¿Qué es la Negociación Colectiva?',
            duracion: '2 horas',
            videoUrl: null,
            variable: 'MODULO_NEGOCIACION_1',
            evaluacion: 'Cuestionario de 5 preguntas'
        },
        {
            id: 2,
            titulo: 'Supuestos y Elementos Condicionantes',
            duracion: '2 horas',
            videoUrl: null,
            variable: 'MODULO_NEGOCIACION_2',
            evaluacion: 'Cuestionario de 5 preguntas'
        },
        {
            id: 3,
            titulo: 'Componentes del Sistema y Formas de Negociación',
            duracion: '2 horas',
            videoUrl: null,
            variable: 'MODULO_NEGOCIACION_3',
            evaluacion: 'Cuestionario de 5 preguntas'
        },
        {
            id: 4,
            titulo: 'Marco Normativo de la Negociación Colectiva',
            duracion: '2 horas',
            videoUrl: null,
            variable: 'MODULO_NEGOCIACION_4',
            evaluacion: 'Cuestionario de 5 preguntas'
        },
        {
            id: 5,
            titulo: 'El Convenio Colectivo de Trabajo (CCT)',
            duracion: '2 horas',
            videoUrl: null,
            variable: 'MODULO_NEGOCIACION_5',
            evaluacion: 'Cuestionario de 5 preguntas'
        },
        {
            id: 6,
            titulo: 'Paso a Paso de la Negociación',
            duracion: '2 horas',
            videoUrl: null,
            variable: 'MODULO_NEGOCIACION_6',
            evaluacion: 'Cuestionario de 5 preguntas'
        },
        {
            id: 7,
            titulo: 'Deber de Buena Fe y Desarrollo de la Negociación',
            duracion: '2 horas',
            videoUrl: null,
            variable: 'MODULO_NEGOCIACION_7',
            evaluacion: 'Cuestionario de 5 preguntas'
        },
        {
            id: 8,
            titulo: 'Rol del Sindicato y Conclusiones',
            duracion: '2 horas',
            videoUrl: null,
            variable: 'MODULO_NEGOCIACION_8',
            evaluacion: 'Evaluación integradora'
        }
    ]
};

// Registrar la capacitación
if (typeof registrarCapacitacion !== 'undefined') {
    registrarCapacitacion(CAPACITACION_NEGOCIACION_COLECTIVA);
} else {
    // Fallback: guardar en variable global
    if (typeof window !== 'undefined') {
        window._CAPACITACIONES_PENDIENTES = window._CAPACITACIONES_PENDIENTES || [];
        window._CAPACITACIONES_PENDIENTES.push(CAPACITACION_NEGOCIACION_COLECTIVA);
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.CAPACITACION_NEGOCIACION_COLECTIVA = CAPACITACION_NEGOCIACION_COLECTIVA;
}

console.log('✅ Capacitación cargada: Introducción a la Negociación Colectiva (8 módulos)');