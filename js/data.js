// ============================================
// BASE DE DATOS DE CONTENIDO - AOMA SAN JUAN
// ============================================
// Aquí cargás TODA la información de la plataforma
// ============================================

const DATA = {
    // ==========================================
    // CURSOS / CAPACITACIONES
    // ==========================================
    cursos: [
        {
            id: 1,
            titulo: 'Seguridad Minera Básica',
            categoria: 'Seguridad',
            actividad: 'general',
            instructor: 'Ing. Roberto Sánchez',
            duracion: '8 horas',
            nivel: 'Básico',
            imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
            descripcion: 'Curso obligatorio sobre normas de seguridad en minería según Ley 19587.',
            modulos: 5,
            contenido: `
                <h3>Módulo 1: Introducción a la seguridad minera</h3>
                <p>La seguridad en minería es fundamental para prevenir accidentes...</p>
                <h3>Módulo 2: EPP obligatorio</h3>
                <p>Elementos de Protección Personal: casco, botas, linterna, etc.</p>
            `,
            documentos: []
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
            descripcion: 'Herramientas de negociación y representación gremial.',
            modulos: 6,
            contenido: '<h3>Contenido del curso...</h3>',
            documentos: []
        },
        {
            id: 3,
            titulo: 'Operación de Camiones CAEX',
            categoria: 'Operativa',
            actividad: 'metalifera',
            instructor: 'Téc. Carlos Gómez',
            duracion: '16 horas',
            nivel: 'Avanzado',
            imagen: 'https://images.unsplash.com/photo-1605218427306-022ba6c5545f?w=600&q=80',
            descripcion: 'Certificación para operación de camiones de extracción.',
            modulos: 8,
            contenido: '<h3>Contenido del curso...</h3>',
            documentos: []
        },
        {
            id: 4,
            titulo: 'Proceso de Producción de Cemento',
            categoria: 'Técnico',
            actividad: 'cemento',
            instructor: 'Ing. Luis Fernández',
            duracion: '10 horas',
            nivel: 'Intermedio',
            imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
            descripcion: 'Conocimiento del proceso productivo del cemento.',
            modulos: 5,
            contenido: '<h3>Contenido del curso...</h3>',
            documentos: []
        },
        {
            id: 5,
            titulo: 'Legislación Laboral Minera',
            categoria: 'Legal',
            actividad: 'general',
            instructor: 'Dr. Pedro Rodríguez',
            duracion: '6 horas',
            nivel: 'Básico',
            imagen: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
            descripcion: 'Marco legal y convenios colectivos del sector minero.',
            modulos: 4,
            contenido: '<h3>Contenido del curso...</h3>',
            documentos: []
        },
        {
            id: 6,
            titulo: 'Primeros Auxilios en Mina',
            categoria: 'Seguridad',
            actividad: 'general',
            instructor: 'Dra. Laura Pérez',
            duracion: '8 horas',
            nivel: 'Básico',
            imagen: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
            descripcion: 'Atención de emergencias y primeros auxilios.',
            modulos: 5,
            contenido: '<h3>Contenido del curso...</h3>',
            documentos: []
        }
    ],

    // ==========================================
    // VIDEOS DE YOUTUBE
    // ==========================================
    // Para linkear videos de YouTube:
    // 1. Andá al video en YouTube
    // 2. Copiá el ID del video (lo que está después de v= en la URL)
    //    Ejemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ
    //    El ID es: dQw4w9WgXcQ
    // 3. Pegalo en youtubeId
    // ==========================================
    videos: [
        {
            id: 1,
            titulo: 'Seguridad en Minería Subterránea',
            categoria: 'metalifera',
            youtubeId: 'dQw4w9WgXcQ', // ← Reemplazá con el ID real
            duracion: '45:20',
            thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80',
            descripcion: 'Charla completa sobre seguridad en minería subterránea.',
            vistas: 1234,
            fecha: '2024-01-15'
        },
        {
            id: 2,
            titulo: 'Charla: Convenio Colectivo Minero 2024',
            categoria: 'general',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '1:12:30',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
            descripcion: 'Análisis del nuevo convenio colectivo.',
            vistas: 856,
            fecha: '2024-02-20'
        },
        {
            id: 3,
            titulo: 'Operación de Molino SAG',
            categoria: 'molienda',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '32:15',
            thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
            descripcion: 'Capacitación sobre operación de molinos.',
            vistas: 543,
            fecha: '2024-03-10'
        },
        {
            id: 4,
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
            id: 5,
            titulo: 'Liderazgo para delegados',
            categoria: 'general',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '55:10',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
            descripcion: 'Herramientas de liderazgo sindical.',
            vistas: 678,
            fecha: '2024-04-05'
        }
    ],

    // ==========================================
    // CONVENIOS COLECTIVOS DE TRABAJO
    // ==========================================
    // Aquí cargás el contenido de los convenios
    // El chat va a usar esta info para responder
    // ==========================================
    convenios: [
        {
            id: 1,
            titulo: 'Convenio Colectivo de Trabajo N° 302/75 - Actividad Minera',
            categoria: 'Minería General',
            fecha: '1975-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio marco para la actividad minera en Argentina.',
            contenido: `
                <h3>Capítulo I - Ámbito de aplicación</h3>
                <p>El presente convenio regula las relaciones laborales en la actividad minera...</p>
                
                <h3>Capítulo II - Jornada de trabajo</h3>
                <p>La jornada normal de trabajo será de 8 horas diarias o 48 semanales...</p>
                
                <h3>Capítulo III - Remuneraciones</h3>
                <p>Los trabajadores percibirán las remuneraciones establecidas en las escalas salariales vigentes...</p>
                
                <h3>Capítulo IV - Licencias</h3>
                <p>Licencia anual ordinaria: 14 días corridos para antigüedad hasta 5 años...</p>
            `,
            archivo: null // Podés poner URL de PDF cuando lo tengas
        },
        {
            id: 2,
            titulo: 'Convenio Colectivo de Trabajo N° 238/94 - Cemento',
            categoria: 'Cemento',
            fecha: '1994-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio específico para trabajadores de la industria del cemento.',
            contenido: `
                <h3>Ámbito de aplicación</h3>
                <p>Comprende a todos los trabajadores de la industria del cemento...</p>
                
                <h3>Categorías profesionales</h3>
                <p>Operario de planta, operario especializado, oficial 1°, oficial maestro, técnico...</p>
                
                <h3>Adicionales</h3>
                <p>Adicional por zona, por tarea, por antigüedad...</p>
            `,
            archivo: null
        },
        {
            id: 3,
            titulo: 'Convenio Colectivo de Trabajo N° 167/93 - Cal',
            categoria: 'Cal',
            fecha: '1993-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio para trabajadores de la industria de la cal.',
            contenido: `
                <h3>Contenido del convenio...</h3>
                <p>Información detallada sobre condiciones laborales en la industria de la cal.</p>
            `,
            archivo: null
        },
        {
            id: 4,
            titulo: 'Convenio Colectivo de Trabajo N° 270/95 - Canteras',
            categoria: 'Piedra',
            fecha: '1995-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio para trabajadores de canteras y áridos.',
            contenido: `
                <h3>Contenido del convenio...</h3>
                <p>Información detallada sobre condiciones laborales en canteras.</p>
            `,
            archivo: null
        }
    ],

    // ==========================================
    // LEYES LABORALES
    // ==========================================
    leyes: [
        {
            id: 1,
            numero: 'Ley 19.587',
            titulo: 'Ley de Higiene y Seguridad en el Trabajo',
            categoria: 'Seguridad',
            resumen: 'Marco legal sobre higiene y seguridad laboral en Argentina.',
            contenido: `
                <h3>Objeto de la ley</h3>
                <p>Establecer las normas mínimas de higiene y seguridad en el trabajo...</p>
                
                <h3>Obligaciones del empleador</h3>
                <p>Proveer elementos de protección personal, capacitación, controles médicos...</p>
                
                <h3>Obligaciones del trabajador</h3>
                <p>Usar los EPP, cumplir con las normas de seguridad, reportar condiciones inseguras...</p>
            `
        },
        {
            id: 2,
            numero: 'Ley 20.744',
            titulo: 'Ley de Contrato de Trabajo',
            categoria: 'Laboral',
            resumen: 'Regula las relaciones individuales de trabajo.',
            contenido: `
                <h3>Contrato de trabajo</h3>
                <p>Se considera contrato de trabajo cuando una persona se obligue a realizar actos...</p>
                
                <h3>Período de prueba</h3>
                <p>Los primeros 3 meses de relación laboral...</p>
                
                <h3>Indemnización por despido</h3>
                <p>Un mes de sueldo por cada año de servicio o fracción mayor a 3 meses...</p>
            `
        },
        {
            id: 3,
            numero: 'Ley 24.557',
            titulo: 'Ley de Riesgos del Trabajo',
            categoria: 'Seguridad',
            resumen: 'Sistema de riesgos del trabajo y ART.',
            contenido: `
                <h3>Accidentes de trabajo</h3>
                <p>Se considera accidente de trabajo a todo acontecimiento súbito y violento...</p>
                
                <h3>Enfermedades profesionales</h3>
                <p>Listado de enfermedades profesionales reconocidas...</p>
            `
        },
        {
            id: 4,
            numero: 'Ley 25.675',
            titulo: 'Ley General del Ambiente',
            categoria: 'Ambiental',
            resumen: 'Principios de la política ambiental nacional.',
            contenido: `
                <h3>Principios</h3>
                <p>Principio de congruencia, prevención, precautorio...</p>
            `
        }
    ],

    // ==========================================
    // ESCALAS SALARIALES
    // ==========================================
    escalas: {
        cemento: [
            { categoria: 'Operario de Planta', nivel: 'A', salario: 850000 },
            { categoria: 'Operario Especializado', nivel: 'B', salario: 980000 },
            { categoria: 'Oficial 1°', nivel: 'C', salario: 1120000 },
            { categoria: 'Oficial Maestro', nivel: 'D', salario: 1350000 },
            { categoria: 'Técnico', nivel: 'E', salario: 1480000 },
            { categoria: 'Delegado', nivel: 'F', salario: 1620000 }
        ],
        cal: [
            { categoria: 'Operario', nivel: 'A', salario: 820000 },
            { categoria: 'Operario Calero', nivel: 'B', salario: 950000 },
            { categoria: 'Oficial', nivel: 'C', salario: 1100000 },
            { categoria: 'Maestro Calero', nivel: 'D', salario: 1300000 }
        ],
        piedra: [
            { categoria: 'Canterito', nivel: 'A', salario: 780000 },
            { categoria: 'Operario de Cantera', nivel: 'B', salario: 920000 },
            { categoria: 'Maestro Canterito', nivel: 'C', salario: 1150000 },
            { categoria: 'Volador Habilitado', nivel: 'D', salario: 1400000 }
        ],
        metalifera: [
            { categoria: 'Operario de Mina', nivel: 'A', salario: 1100000 },
            { categoria: 'Operario Especializado', nivel: 'B', salario: 1350000 },
            { categoria: 'Oficial Minero', nivel: 'C', salario: 1580000 },
            { categoria: 'Maestro Minero', nivel: 'D', salario: 1850000 },
            { categoria: 'Técnico Minero', nivel: 'E', salario: 2100000 }
        ],
        molienda: [
            { categoria: 'Operario de Molienda', nivel: 'A', salario: 950000 },
            { categoria: 'Operario de Molino', nivel: 'B', salario: 1150000 },
            { categoria: 'Oficial de Planta', nivel: 'C', salario: 1380000 },
            { categoria: 'Supervisor de Turno', nivel: 'D', salario: 1700000 }
        ]
    },

    // ==========================================
    // PREGUNTAS FRECUENTES
    // ==========================================
    faqs: {
        general: [
            {
                pregunta: '¿Cómo me inscribo a una capacitación?',
                respuesta: 'Ingresá a la sección "Capacitaciones", seleccioná el curso deseado y hacé clic en "Inscribirme". Recibirás un email de confirmación.'
            },
            {
                pregunta: '¿Los cursos tienen certificación?',
                respuesta: 'Sí, al completar la capacitación y aprobar la evaluación correspondiente, recibirás un certificado digital con validez gremial.'
            },
            {
                pregunta: '¿Cómo recupero mi contraseña?',
                respuesta: 'Contactá al administrador del campus al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.'
            },
            {
                pregunta: '¿Puedo hacer cursos desde mi celular?',
                respuesta: 'Sí, el campus es 100% responsive y funciona en cualquier dispositivo.'
            },
            {
                pregunta: '¿Qué beneficios tengo como delegado?',
                respuesta: 'Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.'
            },
            {
                pregunta: '¿Cuáles son los horarios de la seccional?',
                respuesta: 'La Seccional San Juan atiende de lunes a viernes de 8:00 a 16:00 hs. Dirección: Rivadavia 345 Oeste, San Juan Capital. Tel: (0264) 422-XXXX'
            }
        ],
        cemento: [
            {
                pregunta: '¿Cuál es el adicional por zona en cemento?',
                respuesta: 'El adicional por zona varía según el establecimiento. Consultá la escala vigente en la sección "Escalas salariales".'
            },
            {
                pregunta: '¿Cómo se computan las horas extras?',
                respuesta: 'Las horas extras se pagan con recargo del 50% días hábiles y 100% sábados, domingos y feriados.'
            }
        ],
        cal: [
            {
                pregunta: '¿Qué diferencia salarial hay entre cal y cemento?',
                respuesta: 'Las escalas son similares pero con ajustes por convenio específico. Ver tabla comparativa en Escalas.'
            }
        ],
        piedra: [
            {
                pregunta: '¿Qué permisos necesito para operar explosivos?',
                respuesta: 'Se requiere habilitación de la Policía de Minera, curso específico y renovación anual. AOMA ofrece el curso.'
            }
        ],
        metalifera: [
            {
                pregunta: '¿Cuál es el régimen de turnos en mina?',
                respuesta: 'Generalmente 4x4 (4 días de trabajo, 4 de descanso) en campamento, o 12x12 según el establecimiento.'
            },
            {
                pregunta: '¿Qué controles médicos son obligatorios?',
                respuesta: 'Examen preocupacional, audiometrías, espirometrías y controles anuales obligatorios por ley.'
            }
        ],
        molienda: [
            {
                pregunta: '¿Cuáles son los riesgos de la molienda húmeda?',
                respuesta: 'Riesgo de atrapamiento, exposición a ruido y contacto con reactivos. Uso obligatorio de EPP específico.'
            }
        ]
    },

    // ==========================================
    // NOTICIAS
    // ==========================================
    noticias: [
        {
            id: 1,
            titulo: 'Paritaria 2024: Acuerdo histórico para el sector minero',
            categoria: 'Paritarias',
            resumen: 'Se alcanzó un acuerdo que incluye aumentos salariales y mejoras en las condiciones laborales.',
            contenido: 'Lorem ipsum dolor sit amet...',
            imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
            autor: 'Secretaría Gremial',
            fecha: '2024-01-15',
            destacado: true
        },
        {
            id: 2,
            titulo: 'Nuevas capacitaciones disponibles para delegados',
            categoria: 'Capacitaciones',
            resumen: 'Se incorporaron 6 nuevos cursos al campus virtual.',
            contenido: 'Lorem ipsum...',
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
            contenido: 'Lorem ipsum...',
            imagen: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
            autor: 'Administración',
            fecha: '2026-07-01',
            destacado: true
        }
    ]
};

// ============================================
// FUNCIÓN DE BÚSQUEDA GLOBAL EN DATA
// ============================================
// Esta función busca en TODO el contenido
// ============================================
DATA.buscar = function(query) {
    const q = query.toLowerCase();
    const resultados = {
        cursos: [],
        videos: [],
        convenios: [],
        leyes: [],
        faqs: [],
        noticias: []
    };

    // Buscar en cursos
    this.cursos.forEach(c => {
        if (c.titulo.toLowerCase().includes(q) || 
            c.descripcion.toLowerCase().includes(q) ||
            c.categoria.toLowerCase().includes(q)) {
            resultados.cursos.push(c);
        }
    });

    // Buscar en videos
    this.videos.forEach(v => {
        if (v.titulo.toLowerCase().includes(q) || 
            v.descripcion.toLowerCase().includes(q)) {
            resultados.videos.push(v);
        }
    });

    // Buscar en convenios
    this.convenios.forEach(c => {
        if (c.titulo.toLowerCase().includes(q) || 
            c.resumen.toLowerCase().includes(q) ||
            c.contenido.toLowerCase().includes(q)) {
            resultados.convenios.push(c);
        }
    });

    // Buscar en leyes
    this.leyes.forEach(l => {
        if (l.titulo.toLowerCase().includes(q) || 
            l.resumen.toLowerCase().includes(q) ||
            l.contenido.toLowerCase().includes(q)) {
            resultados.leyes.push(l);
        }
    });

    // Buscar en FAQs
    Object.entries(this.faqs).forEach(([cat, items]) => {
        items.forEach(f => {
            if (f.pregunta.toLowerCase().includes(q) || 
                f.respuesta.toLowerCase().includes(q)) {
                resultados.faqs.push({ ...f, categoria: cat });
            }
        });
    });

    // Buscar en noticias
    this.noticias.forEach(n => {
        if (n.titulo.toLowerCase().includes(q) || 
            n.resumen.toLowerCase().includes(q)) {
            resultados.noticias.push(n);
        }
    });

    return resultados;
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.DATA = DATA;
}

console.log('✅ Base de datos de contenido cargada');
