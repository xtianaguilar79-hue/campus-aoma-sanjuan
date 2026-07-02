// ============================================
// BASE DE DATOS - CAMPUS VIRTUAL AOMA SAN JUAN
// Datos estructurados (sin leyes ni convenios)
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
            ctt: 'CTT 302/75',
            empresas: ['Veladero', 'Gualcamayo', 'Vicuña'],
            resumen: 'Actividad minera de extracción de oro, plata y otros metales en la provincia de San Juan'
        },
        'cemento': {
            id: 'cemento',
            nombre: 'Cemento',
            icono: 'fa-industry',
            color: '#64748b',
            imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
            descripcion: 'Industria del cemento y derivados',
            ctt: 'CTT 238/94',
            empresas: [],
            resumen: 'Producción de cemento Portland y otros materiales de construcción'
        },
        'cal-piedra': {
            id: 'cal-piedra',
            nombre: 'Cal y Piedra',
            icono: 'fa-mountain',
            color: '#78716c',
            imagen: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=1200&q=80',
            descripcion: 'Industria de la cal y canteras de piedra',
            ctt: 'CTT 36/89',
            empresas: [],
            resumen: 'Producción de cal viva, cal hidratada y extracción de piedra para construcción'
        },
        'molienda': {
            id: 'molienda',
            nombre: 'Molienda de Minerales',
            icono: 'fa-cogs',
            color: '#475569',
            imagen: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
            descripcion: 'Procesamiento y molienda de minerales',
            ctt: 'CTT 302/75',
            empresas: [],
            resumen: 'Plantas de procesamiento y molienda de minerales para liberación de especies valiosas'
        }
    },

    // ==========================================
    // 2. ESCALAS SALARIALES
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
    // 3. CURSOS / CAPACITACIONES
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
        },
        {
            id: 7,
            titulo: 'Operación de Camiones CAEX',
            categoria: 'Operativa',
            actividad: 'mineria-extractiva',
            instructor: 'Téc. Juan Pérez',
            duracion: '16 horas',
            nivel: 'Avanzado',
            imagen: 'https://images.unsplash.com/photo-1605218427306-022ba6c5545f?w=600&q=80',
            descripcion: 'Certificación para operación de camiones de extracción de gran porte.',
            modulos: 8,
            contenido: '<h3>Operación segura</h3><p>Inspección pre-operacional, técnicas de carga, mantenimiento básico y normas de seguridad.</p>'
        },
        {
            id: 8,
            titulo: 'Higiene y Seguridad en Planta Cementera',
            categoria: 'Seguridad',
            actividad: 'cemento',
            instructor: 'Ing. Laura Gómez',
            duracion: '10 horas',
            nivel: 'Intermedio',
            imagen: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
            descripcion: 'Normas específicas de seguridad en plantas de cemento.',
            modulos: 5,
            contenido: '<h3>Riesgos específicos</h3><p>Exposición a polvo de cemento, trabajo en hornos, manejo de maquinaria pesada.</p>'
        },
        {
            id: 9,
            titulo: 'Voladura Controlada en Canteras',
            categoria: 'Seguridad',
            actividad: 'cal-piedra',
            instructor: 'Ing. Miguel Torres',
            duracion: '12 horas',
            nivel: 'Avanzado',
            imagen: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
            descripcion: 'Técnicas de voladura segura en canteras de piedra.',
            modulos: 6,
            contenido: '<h3>Voladura segura</h3><p>Normativas, procedimientos, señales de seguridad y manejo de explosivos.</p>'
        },
        {
            id: 10,
            titulo: 'Primeros Auxilios en Mina',
            categoria: 'Seguridad',
            actividad: 'mineria-extractiva',
            instructor: 'Dra. Carolina Ruiz',
            duracion: '8 horas',
            nivel: 'Básico',
            imagen: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
            descripcion: 'Atención de emergencias y primeros auxilios en ambiente minero.',
            modulos: 5,
            contenido: '<h3>Emergencias</h3><p>RCP, traumatismos, hemorragias, quemaduras, rescate y evacuación de heridos.</p>'
        }
    ],

    // ==========================================
    // 4. VIDEOS DE YOUTUBE
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
        },
        {
            id: 5,
            titulo: 'Operación de Camiones CAEX',
            categoria: 'mineria-extractiva',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '1:05:30',
            thumbnail: 'https://images.unsplash.com/photo-1605218427306-022ba6c5545f?w=600&q=80',
            descripcion: 'Curso completo de operación de camiones de gran porte.',
            vistas: 1520,
            fecha: '2024-05-15'
        },
        {
            id: 6,
            titulo: 'Voladura Controlada en Canteras',
            categoria: 'cal-piedra',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '41:00',
            thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
            descripcion: 'Técnicas de voladura segura en canteras de piedra.',
            vistas: 389,
            fecha: '2024-04-18'
        },
        {
            id: 7,
            titulo: 'Derechos del Delegado Sindical',
            categoria: 'general',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '55:10',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
            descripcion: 'Charla sobre derechos y obligaciones del delegado según Ley 23.551.',
            vistas: 678,
            fecha: '2024-04-05'
        },
        {
            id: 8,
            titulo: 'Primeros Auxilios en Mina',
            categoria: 'mineria-extractiva',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '50:00',
            thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
            descripcion: 'Capacitación en primeros auxilios para ambiente minero.',
            vistas: 892,
            fecha: '2024-06-12'
        }
    ],

    // ==========================================
    // 5. PREGUNTAS FRECUENTES
    // ==========================================
    faqs: {
        general: [
            { pregunta: '¿Cómo me inscribo a una capacitación?', respuesta: 'Ingresá a la sección "Capacitaciones", seleccioná el curso deseado y hacé clic en "Inscribirme".' },
            { pregunta: '¿Los cursos tienen certificación?', respuesta: 'Sí, al completar la capacitación y aprobar la evaluación, recibirás un certificado digital con validez gremial.' },
            { pregunta: '¿Cómo recupero mi contraseña?', respuesta: 'Contactá al administrador al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.' },
            { pregunta: '¿Qué beneficios tengo como delegado?', respuesta: 'Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.' },
            { pregunta: '¿Cuáles son los horarios de la seccional?', respuesta: 'La Seccional San Juan atiende de lunes a viernes de 8:00 a 16:00 hs. Dirección: Rivadavia 345 Oeste, San Juan Capital. Tel: (0264) 422-XXXX' }
        ],
        'cal-piedra': [
            { pregunta: '¿Qué diferencia salarial hay entre cal y piedra?', respuesta: 'Ambas actividades comparten el CTT 36/89 con escalas similares. Ver tabla en Escalas.' },
            { pregunta: '¿Qué permisos necesito para operar explosivos en canteras?', respuesta: 'Se requiere habilitación de la Policía de Minería, curso específico y renovación anual.' },
            { pregunta: '¿Cuál es la jornada laboral en canteras?', respuesta: 'La jornada normal es de 8 horas diarias o 48 semanales, según el CTT 36/89.' }
        ],
        cemento: [
            { pregunta: '¿Cuál es el adicional por zona en cemento?', respuesta: 'El adicional por zona varía según el establecimiento. Consultá la escala vigente en "Escalas salariales".' },
            { pregunta: '¿Cómo se computan las horas extras?', respuesta: 'Las horas extras se pagan con recargo del 50% días hábiles y 100% sábados, domingos y feriados.' },
            { pregunta: '¿Qué EPP es obligatorio en planta cementera?', respuesta: 'Casco, lentes de seguridad, protección auditiva, calzado de seguridad, respirador contra polvo de cemento y ropa de trabajo.' }
        ],
        molienda: [
            { pregunta: '¿Cuáles son los riesgos de la molienda húmeda?', respuesta: 'Riesgo de atrapamiento, exposición a ruido y contacto con reactivos. Uso obligatorio de EPP específico.' },
            { pregunta: '¿Qué controles médicos son obligatorios en molienda?', respuesta: 'Audiometrías, espirometrías, controles dermatológicos y exámenes generales anuales.' }
        ],
        'mineria-extractiva': [
            { pregunta: '¿Cuál es el régimen de turnos en mina?', respuesta: 'Generalmente 4x4 (4 días de trabajo, 4 de descanso) en campamento, o 12x12 según el establecimiento.' },
            { pregunta: '¿Qué controles médicos son obligatorios?', respuesta: 'Examen preocupacional, audiometrías, espirometrías y controles anuales obligatorios por ley.' },
            { pregunta: '¿Cuántas horas gremiales tiene un delegado?', respuesta: 'Según el CTT 302/75, los delegados tienen derecho a 10 horas mensuales retribuidas para el ejercicio de sus funciones.' }
        ]
    },

    // ==========================================
    // 6. NOTICIAS
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
        },
        {
            id: 4,
            titulo: 'Curso de Operación de Camiones CAEX',
            categoria: 'Capacitaciones',
            resumen: 'Nuevo curso avanzado para operadores de camiones de gran porte.',
            contenido: 'Contenido completo...',
            imagen: 'https://images.unsplash.com/photo-1605218427306-022ba6c5545f?w=800&q=80',
            autor: 'Secretaría de Formación',
            fecha: '2024-06-10',
            destacado: false
        },
        {
            id: 5,
            titulo: 'Reunión de delegados de minería extractiva',
            categoria: 'Gremial',
            resumen: 'Se realizó la reunión mensual de delegados de Veladero, Gualcamayo y Vicuña.',
            contenido: 'Contenido completo...',
            imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
            autor: 'Secretaría Gremial',
            fecha: '2024-06-25',
            destacado: false
        }
    ],

    // ==========================================
    // 7. USUARIOS POR DEFECTO
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
    // 8. RESPUESTAS DEL CHAT
    // ==========================================
    chatResponses: {
        'hola|buenas|buenos días': '¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?',
        'gracias|thanks': '¡De nada! 😊 Estoy aquí para lo que necesites.',
        'adiós|chau|bye': '¡Hasta luego! 👋 Que tengas un excelente día.',
        'escala|salarial|sueldo': '💰 Podés consultar las escalas salariales actualizadas en el menú lateral → "Escalas Salariales". Están separadas por actividad: Minería Extractiva, Cemento, Cal y Piedra, y Molienda.',
        'convenio|ctt': '📋 Tenemos 3 convenios colectivos cargados: CTT 302/75 (Minería), CTT 36/89 (Cal y Piedra) y CTT 238/94 (Cemento). Podés consultarlos en "Convenios CCT".',
        'ley|legislación|legislacion': '⚖️ Tenemos 5 leyes laborales cargadas: LCT 20.744, Ley 19.587, Ley 24.557, Ley 23.551 y Ley 24.013. Podés consultarlas en "Legislación".',
        'curso|capacitacion|capacitación': '🎓 Tenemos 10 cursos disponibles. Podés verlos todos en "Capacitaciones".',
        'video|charla': '🎥 Tenemos 8 videos en la biblioteca. Podés verlos en la sección de videos.',
        'contraseña|clave|password': '🔑 Para recuperar tu contraseña, contactá al administrador al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.',
        'horario|atiende|dirección': '🕐 La Seccional San Juan atiende de lunes a viernes de 8:00 a 16:00 hs. Dirección: Rivadavia 345 Oeste, San Juan Capital. Tel: (0264) 422-XXXX',
        'beneficio|delegado': '👤 Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.',
        'certificado': '🎓 Al completar un curso y aprobar la evaluación, obtenés un certificado digital con validez gremial.',
        'veladero|gualcamayo|vicuña': '🏭 Estas son las empresas de minería extractiva en San Juan. Están reguladas por el CTT 302/75. Podés consultar información específica en la sección "Minería Extractiva".',
        'default': 'No encontré información específica sobre eso. Te recomiendo revisar las secciones del menú lateral o contactar a la Seccional al (0264) 422-XXXX.'
    },

    // ==========================================
    // 9. INFORMACIÓN DE CONTACTO
    // ==========================================
    contacto: {
        seccional: 'AOMA Seccional San Juan',
        direccion: 'Rivadavia 345 Oeste, San Juan Capital',
        telefono: '(0264) 422-XXXX',
        email: 'campus@aomasanjuan.org.ar',
        horario: 'Lunes a Viernes de 8:00 a 16:00 hs'
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
console.log('🎓 ' + DATA.cursos.length + ' cursos');
console.log('🎥 ' + DATA.videos.length + ' videos');
console.log('📰 ' + DATA.noticias.length + ' noticias');