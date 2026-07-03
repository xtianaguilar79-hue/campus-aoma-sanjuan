// ============================================
// BASE DE DATOS - CAMPUS VIRTUAL AOMA SAN JUAN
// ============================================

const DATA = {
    
    // ==========================================
    // 1. ACTIVIDADES DE AOMA
    // ==========================================
    actividades: {
        'mineria-extractiva': {
            id: 'mineria-extractiva',
            nombre: 'Minería Extractiva',
            icono: 'fa-gem',
            color: '#f59e0b',
            imagen: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
            descripcion: 'Extracción de metales preciosos y base',
            ctt: 'CCT 38/89',
            empresas: ['Veladero', 'Gualcamayo', 'Vicuña']
        },
        'cemento': {
            id: 'cemento',
            nombre: 'Cemento',
            icono: 'fa-industry',
            color: '#64748b',
            imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
            descripcion: 'Industria del cemento y derivados',
            ctt: 'CCT 53/89 y 54/89',
            empresas: []
        },
        'cal-piedra': {
            id: 'cal-piedra',
            nombre: 'Cal y Piedra',
            icono: 'fa-mountain',
            color: '#78716c',
            imagen: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=1200&q=80',
            descripcion: 'Industria de la cal y canteras de piedra',
            ctt: 'CCT 36/89',
            empresas: []
        },
        'molienda': {
            id: 'molienda',
            nombre: 'Molienda de Minerales',
            icono: 'fa-cogs',
            color: '#475569',
            imagen: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
            descripcion: 'Procesamiento y molienda de minerales',
            ctt: 'CCT 37/89',
            empresas: []
        }
    },

    // ==========================================
    // 2. CONVENIOS COLECTIVOS (NUEVA ESTRUCTURA)
    // ==========================================
    convenios: {
        'cal-piedra': {
            nombre: 'Cal y Piedra',
            descripcion: 'Convenio colectivo para trabajadores de cal, piedra y actividades afines',
            icono: 'fa-mountain',
            color: '#78716c',
            cct: [
                {
                    numero: 'CCT 36/89',
                    titulo: 'Convenio Colectivo de Trabajo N° 36/89',
                    subtitulo: 'Cal, Piedra y Afines',
                    variable: 'CTT_36_89'
                }
            ]
        },
        'molienda': {
            nombre: 'Molienda de Minerales',
            descripcion: 'Convenio colectivo para trabajadores de molienda de minerales',
            icono: 'fa-cogs',
            color: '#475569',
            cct: [
                {
                    numero: 'CCT 37/89',
                    titulo: 'Convenio Colectivo de Trabajo N° 37/89',
                    subtitulo: 'Molienda de Minerales',
                    variable: 'CTT_37_89'
                }
            ]
        },
        'cemento': {
            nombre: 'Cemento Portland',
            descripcion: 'Convenios colectivos para trabajadores de la industria del cemento',
            icono: 'fa-industry',
            color: '#64748b',
            cct: [
                {
                    numero: 'CCT 53/89',
                    titulo: 'Convenio Colectivo de Trabajo N° 53/89',
                    subtitulo: 'Personal Administrativo del Cemento Portland',
                    variable: 'CTT_53_89'
                },
                {
                    numero: 'CCT 54/89',
                    titulo: 'Convenio Colectivo de Trabajo N° 54/89',
                    subtitulo: 'Personal Obrero del Cemento Portland',
                    variable: 'CTT_54_89'
                }
            ]
        },
        'extractiva': {
            nombre: 'Minería Extractiva',
            descripcion: 'Convenios colectivos para trabajadores de minería extractiva',
            icono: 'fa-gem',
            color: '#f59e0b',
            cct: [
                {
                    numero: 'CCT 38/89',
                    titulo: 'Convenio Colectivo de Trabajo N° 38/89',
                    subtitulo: 'Minería Extractiva',
                    variable: 'CTT_38_89'
                },
                {
                    numero: 'CCT Veladero',
                    titulo: 'Convenio Colectivo - Mina Veladero',
                    subtitulo: 'Convenio por empresa - Mina Veladero',
                    variable: 'CTT_VELADERO'
                },
                {
                    numero: 'CCT Gualcamayo',
                    titulo: 'Convenio Colectivo - Mina Gualcamayo',
                    subtitulo: 'Convenio por empresa - Mina Gualcamayo',
                    variable: 'CTT_GUALCAMAYO'
                },
                {
                    numero: 'CCT Vicuña',
                    titulo: 'Convenio Colectivo - Mina Vicuña',
                    subtitulo: 'Convenio por empresa - Mina Vicuña',
                    variable: 'CTT_VICUNA'
                }
            ]
        }
    },

    // ==========================================
    // 3. ESCALAS SALARIALES
    // ==========================================
    escalas: {
        'mineria-extractiva': [
            { categoria: 'Operario de Mina', nivel: 'A', salario: 1100000 },
            { categoria: 'Operario Especializado', nivel: 'B', salario: 1350000 },
            { categoria: 'Oficial Minero', nivel: 'C', salario: 1580000 },
            { categoria: 'Maestro Minero', nivel: 'D', salario: 1850000 },
            { categoria: 'Técnico Minero', nivel: 'E', salario: 2100000 },
            { categoria: 'Delegado Sindical', nivel: 'F', salario: 2250000 }
        ],
        'cemento': [
            { categoria: 'Operario de Planta', nivel: 'A', salario: 850000 },
            { categoria: 'Operario Especializado', nivel: 'B', salario: 980000 },
            { categoria: 'Oficial 1°', nivel: 'C', salario: 1120000 },
            { categoria: 'Oficial Maestro', nivel: 'D', salario: 1350000 },
            { categoria: 'Técnico', nivel: 'E', salario: 1480000 },
            { categoria: 'Delegado', nivel: 'F', salario: 1620000 }
        ],
        'cal-piedra': [
            { categoria: 'Operario / Canterito', nivel: 'A', salario: 820000 },
            { categoria: 'Operario Calero', nivel: 'B', salario: 950000 },
            { categoria: 'Oficial', nivel: 'C', salario: 1100000 },
            { categoria: 'Maestro Calero/Canterito', nivel: 'D', salario: 1300000 },
            { categoria: 'Volador Habilitado', nivel: 'E', salario: 1400000 }
        ],
        'molienda': [
            { categoria: 'Operario de Molienda', nivel: 'A', salario: 950000 },
            { categoria: 'Operario de Molino', nivel: 'B', salario: 1150000 },
            { categoria: 'Oficial de Planta', nivel: 'C', salario: 1380000 },
            { categoria: 'Supervisor de Turno', nivel: 'D', salario: 1700000 }
        ]
    },

    // ==========================================
    // 4. CURSOS / CAPACITACIONES
    // ==========================================
    cursos: [
        {
            id: 1,
            titulo: 'Seguridad Minera Básica',
            categoria: 'Seguridad',
            actividad: 'mineria-extractiva',
            instructor: 'Ing. Roberto Sánchez',
            duracion: '8 horas',
            nivel: 'Básico',
            imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
            descripcion: 'Curso obligatorio sobre normas de seguridad en minería según Ley 19587.',
            modulos: 5,
            contenido: '<h3>Módulo 1: Introducción a la seguridad minera</h3><p>La seguridad en minería es fundamental para prevenir accidentes.</p><h3>Módulo 2: EPP obligatorio</h3><p>Elementos de Protección Personal: casco, botas, linterna, etc.</p>'
        },
        {
            id: 2,
            titulo: 'Liderazgo Sindical',
            categoria: 'Gremial',
            actividad: 'general',
            instructor: 'Lic. Ana Martínez',
            duracion: '12 horas',
            nivel: 'Intermedio',
            imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
            descripcion: 'Herramientas de negociación y representación gremial para delegados.',
            modulos: 6,
            contenido: '<h3>El rol del delegado</h3><p>Funciones, derechos y obligaciones del delegado sindical según la Ley 23.551.</p>'
        },
        {
            id: 3,
            titulo: 'Proceso de Producción de Cemento',
            categoria: 'Técnico',
            actividad: 'cemento',
            instructor: 'Ing. Luis Fernández',
            duracion: '10 horas',
            nivel: 'Intermedio',
            imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
            descripcion: 'Conocimiento del proceso productivo del cemento desde la cantera hasta el producto final.',
            modulos: 5,
            contenido: '<h3>Proceso completo</h3><p>Extracción, trituración, molienda de crudo, calcinación en horno rotativo, molienda de clínker y ensacado.</p>'
        },
        {
            id: 4,
            titulo: 'Operación de Caleras',
            categoria: 'Técnico',
            actividad: 'cal-piedra',
            instructor: 'Téc. Carlos Gómez',
            duracion: '8 horas',
            nivel: 'Básico',
            imagen: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=600&q=80',
            descripcion: 'Operación segura de hornos de cal y canteras.',
            modulos: 4,
            contenido: '<h3>Operación de hornos</h3><p>Técnicas de operación segura de hornos de cal.</p>'
        },
        {
            id: 5,
            titulo: 'Molienda de Minerales',
            categoria: 'Técnico',
            actividad: 'molienda',
            instructor: 'Ing. María López',
            duracion: '12 horas',
            nivel: 'Avanzado',
            imagen: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
            descripcion: 'Procesos de molienda SAG y de bolas.',
            modulos: 6,
            contenido: '<h3>Molinos SAG</h3><p>Operación y mantenimiento de molinos SAG y de bolas.</p>'
        },
        {
            id: 6,
            titulo: 'Legislación Laboral Minera',
            categoria: 'Legal',
            actividad: 'general',
            instructor: 'Dr. Pedro Rodríguez',
            duracion: '6 horas',
            nivel: 'Básico',
            imagen: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
            descripcion: 'Marco legal y convenios colectivos del sector minero.',
            modulos: 4,
            contenido: '<h3>Marco normativo</h3><p>Ley de Contrato de Trabajo, Convenios Colectivos, Ley de Riesgos del Trabajo.</p>'
        }
    ],

    // ==========================================
    // 5. VIDEOS DE YOUTUBE
    // ==========================================
    videos: [
        {
            id: 1,
            titulo: 'Seguridad en Minería Subterránea',
            categoria: 'mineria-extractiva',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '45:20',
            thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80',
            descripcion: 'Charla completa sobre seguridad en minería subterránea.',
            vistas: 1234,
            fecha: '2024-01-15'
        },
        {
            id: 2,
            titulo: 'Proceso de Producción de Cemento',
            categoria: 'cemento',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '28:40',
            thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
            descripcion: 'Recorrido por una planta cementera.',
            vistas: 412,
            fecha: '2024-03-25'
        },
        {
            id: 3,
            titulo: 'Operación de Hornos de Cal',
            categoria: 'cal-piedra',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '38:25',
            thumbnail: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=600&q=80',
            descripcion: 'Operación y mantenimiento de hornos de cal.',
            vistas: 267,
            fecha: '2024-05-02'
        },
        {
            id: 4,
            titulo: 'Molienda SAG',
            categoria: 'molienda',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '32:15',
            thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
            descripcion: 'Capacitación sobre operación de molinos SAG.',
            vistas: 543,
            fecha: '2024-03-10'
        }
    ],

    // ==========================================
    // 6. PREGUNTAS FRECUENTES
    // ==========================================
    faqs: {
        general: [
            { pregunta: '¿Cómo me inscribo a una capacitación?', respuesta: 'Ingresá a la sección "Capacitaciones", seleccioná el curso deseado y hacé clic en "Inscribirme".' },
            { pregunta: '¿Los cursos tienen certificación?', respuesta: 'Sí, al completar la capacitación y aprobar la evaluación, recibirás un certificado digital con validez gremial.' },
            { pregunta: '¿Cómo recupero mi contraseña?', respuesta: 'Contactá al administrador al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.' },
            { pregunta: '¿Qué beneficios tengo como delegado?', respuesta: 'Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.' }
        ],
        'cal-piedra': [
            { pregunta: '¿Qué diferencia salarial hay entre cal y piedra?', respuesta: 'Ambas actividades comparten el CCT 36/89 con escalas similares. Ver tabla en Escalas.' },
            { pregunta: '¿Qué permisos necesito para operar explosivos en canteras?', respuesta: 'Se requiere habilitación de la Policía de Minería, curso específico y renovación anual.' }
        ],
        cemento: [
            { pregunta: '¿Cuál es el adicional por zona en cemento?', respuesta: 'El adicional por zona varía según el establecimiento. Consultá la escala vigente en "Escalas salariales".' },
            { pregunta: '¿Cómo se computan las horas extras?', respuesta: 'Las horas extras se pagan con recargo del 50% días hábiles y 100% sábados, domingos y feriados.' }
        ],
        molienda: [
            { pregunta: '¿Cuáles son los riesgos de la molienda húmeda?', respuesta: 'Riesgo de atrapamiento, exposición a ruido y contacto con reactivos. Uso obligatorio de EPP específico.' }
        ],
        'mineria-extractiva': [
            { pregunta: '¿Cuál es el régimen de turnos en mina?', respuesta: 'Generalmente 4x4 (4 días de trabajo, 4 de descanso) en campamento, o 12x12 según el establecimiento.' },
            { pregunta: '¿Qué controles médicos son obligatorios?', respuesta: 'Examen preocupacional, audiometrías, espirometrías y controles anuales obligatorios por ley.' }
        ]
    },

    // ==========================================
    // 7. NOTICIAS
    // ==========================================
    noticias: [
        {
            id: 1,
            titulo: 'Paritaria 2024: Acuerdo histórico para el sector minero',
            categoria: 'Paritarias',
            resumen: 'Se alcanzó un acuerdo que incluye aumentos salariales del 45% y mejoras en las condiciones laborales.',
            contenido: 'Contenido completo de la noticia...',
            imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
            autor: 'Secretaría Gremial',
            fecha: '2024-01-15',
            destacado: true
        },
        {
            id: 2,
            titulo: 'Nuevas capacitaciones disponibles',
            categoria: 'Capacitaciones',
            resumen: 'Se incorporaron 6 nuevos cursos al campus virtual.',
            contenido: 'Contenido completo...',
            imagen: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
            autor: 'Secretaría de Formación',
            fecha: '2024-02-20',
            destacado: false
        },
        {
            id: 3,
            titulo: 'Actualización de escalas salariales Julio 2026',
            categoria: 'Salarios',
            resumen: 'Se actualizaron las tablas salariales para todas las actividades.',
            contenido: 'Contenido completo...',
            imagen: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
            autor: 'Administración',
            fecha: '2026-07-01',
            destacado: true
        }
    ],

    // ==========================================
    // 8. USUARIOS POR DEFECTO
    // ==========================================
    usuarios: [
        {
            id: 1,
            username: 'admin',
            password: 'admin',
            name: 'Administrador del Sistema',
            email: 'admin@aoma.org.ar',
            role: 'admin',
            active: true
        },
        {
            id: 2,
            username: 'delegado',
            password: '1234',
            name: 'Juan Carlos Delegado',
            email: 'delegado@aoma.org.ar',
            role: 'delegado',
            active: true,
            department: 'cemento'
        },
        {
            id: 3,
            username: 'dirigente',
            password: '1234',
            name: 'María Fernanda Dirigente',
            email: 'dirigente@aoma.org.ar',
            role: 'dirigente',
            active: true,
            department: 'mineria-extractiva'
        }
    ],

    // ==========================================
    // 9. RESPUESTAS DEL CHAT
    // ==========================================
    chatResponses: {
        'hola|buenas|buenos días': '¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?',
        'gracias|thanks': '¡De nada! 😊 Estoy aquí para lo que necesites.',
        'adiós|chau|bye': '¡Hasta luego! 👋 Que tengas un excelente día.',
        'escala|salarial|sueldo': '💰 Podés consultar las escalas salariales actualizadas en el menú lateral → "Escalas Salariales". Están separadas por actividad: Minería Extractiva, Cemento, Cal y Piedra, y Molienda.',
        'convenio|ctt': '📋 Tenemos convenios colectivos organizados por actividad:\n\n• Cal y Piedra: CCT 36/89\n• Molienda: CCT 37/89\n• Cemento: CCT 53/89 y 54/89\n• Extractiva: CCT 38/89 + convenios por empresa (Veladero, Gualcamayo, Vicuña)\n\nPodés consultarlos en "Convenios CCT".',
        'ley|legislación|legislacion': '⚖️ Tenemos 5 leyes laborales cargadas: LCT 20.744, Ley 19.587, Ley 24.557, Ley 24.013 y Ley 23.551. Podés consultarlas en "Legislación".',
        'curso|capacitacion|capacitación': '🎓 Tenemos 6 cursos disponibles. Podés verlos todos en "Capacitaciones".',
        'video|charla': '🎥 Tenemos 4 videos en la biblioteca. Podés verlos en la sección de videos.',
        'contraseña|clave|password': '🔑 Para recuperar tu contraseña, contactá al administrador al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.',
        'horario|atiende|dirección': '🕐 La Seccional San Juan atiende de lunes a viernes de 8:00 a 16:00 hs. Dirección: Rivadavia 345 Oeste, San Juan Capital. Tel: (0264) 422-XXXX',
        'beneficio|delegado': '👤 Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.',
        'certificado': '🎓 Al completar un curso y aprobar la evaluación, obtenés un certificado digital con validez gremial.',
        'veladero|gualcamayo|vicuña': '🏭 Estas son las empresas de minería extractiva en San Juan. Cada una tiene su convenio colectivo específico. Podés consultarlos en "Convenios CCT" → "Extractiva".',
        'default': 'No encontré información específica sobre eso. Te recomiendo revisar las secciones del menú lateral o contactar a la Seccional al (0264) 422-XXXX.'
    }
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================
DATA.formatCurrency = function(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(amount);
};

DATA.formatDate = function(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// ============================================
// EXPORTAR GLOBALMENTE
// ============================================
if (typeof window !== 'undefined') {
    window.DATA = DATA;
}

console.log('✅ Base de datos AOMA cargada');
console.log('📋 ' + Object.keys(DATA.actividades).length + ' actividades');
console.log('📜 ' + Object.keys(DATA.convenios).length + ' categorías de convenios');
console.log('🎓 ' + DATA.cursos.length + ' cursos');
console.log('🎥 ' + DATA.videos.length + ' videos');
console.log('📰 ' + DATA.noticias.length + ' noticias');