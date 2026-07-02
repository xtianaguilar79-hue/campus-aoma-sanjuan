// ============================================
// BASE DE DATOS - AOMA SAN JUAN
// ============================================

const DATA = {
    // ==========================================
    // ACTIVIDADES DE AOMA (ESTRUCTURA REAL)
    // ==========================================
    actividades: {
        'cal-piedra': {
            id: 'cal-piedra',
            nombre: 'Cal y Piedra',
            icono: 'fa-mountain',
            color: '#78716c',
            imagen: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=1200&q=80',
            descripcion: 'Industria de la cal y canteras de piedra',
            ctt: 'CTT 36/89'
        },
        cemento: {
            id: 'cemento',
            nombre: 'Cemento',
            icono: 'fa-industry',
            color: '#64748b',
            imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
            descripcion: 'Industria del cemento',
            ctt: 'CTT 238/94'
        },
        molienda: {
            id: 'molienda',
            nombre: 'Molienda de Minerales',
            icono: 'fa-cogs',
            color: '#475569',
            imagen: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
            descripcion: 'Procesamiento y molienda de minerales',
            ctt: 'CTT 302/75'
        },
        'mineria-extractiva': {
            id: 'mineria-extractiva',
            nombre: 'Minería Extractiva',
            icono: 'fa-gem',
            color: '#f59e0b',
            imagen: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
            descripcion: 'Extracción de metales preciosos',
            empresas: ['Veladero', 'Gualcamayo', 'Vicuña'],
            ctt: 'CTT 302/75'
        }
    },

    // ==========================================
    // CONVENIOS COLECTIVOS DE TRABAJO
    // ==========================================
    convenios: [
        {
            id: 1,
            numero: 'CTT 302/75',
            titulo: 'Convenio Colectivo de Trabajo N° 302/75',
            categoria: 'Minería General',
            actividad: 'mineria-extractiva',
            fecha: '1975-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio marco para la actividad minera en Argentina. Aplica a Veladero, Gualcamayo y Vicuña.',
            contenido: `
                <h3>Capítulo I - Ámbito de aplicación</h3>
                <p>El presente convenio regula las relaciones laborales en la actividad minera, comprendiendo todas las empresas que exploten minas, canteras y establecimientos de beneficio de minerales.</p>
                
                <h3>Capítulo II - Jornada de trabajo</h3>
                <p>La jornada normal de trabajo será de 8 horas diarias o 48 semanales para trabajo diurno. Para trabajo subterráneo, la jornada será de 6 horas diarias o 36 semanales.</p>
                
                <h3>Capítulo III - Remuneraciones</h3>
                <p>Los trabajadores percibirán las remuneraciones establecidas en las escalas salariales vigentes, que se actualizarán semestralmente mediante negociación paritaria.</p>
                
                <h3>Capítulo IV - Licencias</h3>
                <p>Licencia anual ordinaria: 14 días corridos para antigüedad hasta 5 años, 21 días de 5 a 10 años, 28 días de 10 a 20 años, y 35 días más de 20 años.</p>
                
                <h3>Capítulo V - Adicionales</h3>
                <p>Adicional por zona (según ubicación geográfica), adicional por tarea insalubre, adicional por antigüedad (1% por año), adicional por título.</p>
            `,
            archivo: null
        },
        {
            id: 2,
            numero: 'CTT 36/89',
            titulo: 'Convenio Colectivo de Trabajo N° 36/89',
            categoria: 'Cal y Piedra',
            actividad: 'cal-piedra',
            fecha: '1989-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio para trabajadores de la industria de la cal y canteras de piedra.',
            contenido: `
                <h3>Ámbito de aplicación</h3>
                <p>Comprende a todos los trabajadores de la industria de la cal y canteras de piedra, incluyendo calizas, dolomitas y materiales para la construcción.</p>
                
                <h3>Categorías profesionales</h3>
                <ul>
                    <li><strong>Categoría A:</strong> Operario</li>
                    <li><strong>Categoría B:</strong> Operario calero/canterito</li>
                    <li><strong>Categoría C:</strong> Oficial</li>
                    <li><strong>Categoría D:</strong> Maestro calero/canterito</li>
                    <li><strong>Categoría E:</strong> Volador habilitado</li>
                </ul>
                
                <h3>Adicionales específicos</h3>
                <p>Adicional por zona según provincia, adicional por exposición a polvo, adicional por trabajo con explosivos.</p>
            `,
            archivo: null
        },
        {
            id: 3,
            numero: 'CTT 238/94',
            titulo: 'Convenio Colectivo de Trabajo N° 238/94',
            categoria: 'Cemento',
            actividad: 'cemento',
            fecha: '1994-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio específico para trabajadores de la industria del cemento.',
            contenido: `
                <h3>Ámbito de aplicación</h3>
                <p>Comprende a todos los trabajadores de la industria del cemento, incluyendo plantas de producción, canteras asociadas y centros de distribución.</p>
                
                <h3>Categorías profesionales</h3>
                <ul>
                    <li><strong>Categoría A:</strong> Operario de planta</li>
                    <li><strong>Categoría B:</strong> Operario especializado</li>
                    <li><strong>Categoría C:</strong> Oficial 1°</li>
                    <li><strong>Categoría D:</strong> Oficial maestro</li>
                    <li><strong>Categoría E:</strong> Técnico</li>
                    <li><strong>Categoría F:</strong> Delegado sindical</li>
                </ul>
                
                <h3>Adicionales específicos</h3>
                <p>Adicional por zona según provincia, adicional por exposición a polvo de cemento, adicional por trabajo en horno.</p>
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
            numero: 'LCT 20.744',
            titulo: 'Ley de Contrato de Trabajo',
            categoria: 'Laboral General',
            resumen: 'Ley 20.744 - Regula las relaciones individuales de trabajo en Argentina.',
            contenido: `
                <h3>Artículo 1° - Objeto</h3>
                <p>Esta ley es aplicable a toda relación de trabajo por la cual una persona física realice actos, ejecute obras o preste servicios...</p>
                
                <h3>Artículo 2° - Contrato de trabajo</h3>
                <p>Se considera contrato de trabajo cuando una persona se obligue a realizar actos, ejecutar obras o prestar servicios a otra, bajo su dependencia, mediante una remuneración.</p>
                
                <h3>Artículo 92° - Período de prueba</h3>
                <p>Los primeros 3 meses de relación laboral se consideran período de prueba...</p>
                
                <h3>Artículo 245° - Indemnización por antigüedad</h3>
                <p>Un mes de sueldo por cada año de servicio o fracción mayor a 3 meses...</p>
            `,
            archivo: null
        },
        {
            id: 2,
            numero: 'Ley 19.587',
            titulo: 'Ley de Higiene y Seguridad en el Trabajo',
            categoria: 'Seguridad',
            resumen: 'Establece las normas mínimas de higiene y seguridad en el trabajo.',
            contenido: `
                <h3>Objeto de la ley</h3>
                <p>Establecer las normas mínimas de higiene y seguridad en el trabajo en todo el territorio nacional...</p>
                
                <h3>Obligaciones del empleador</h3>
                <ul>
                    <li>Proveer elementos de protección personal</li>
                    <li>Capacitar a los trabajadores</li>
                    <li>Realizar controles médicos</li>
                </ul>
            `,
            archivo: null
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
            `,
            archivo: null
        },
        {
            id: 4,
            numero: 'Ley 23.551',
            titulo: 'Ley de Asociaciones Sindicales',
            categoria: 'Gremial',
            resumen: 'Regula los sindicatos y la actividad gremial.',
            contenido: `
                <h3>Personería gremial</h3>
                <p>Reconocimiento oficial de la asociación sindical más representativa...</p>
            `,
            archivo: null
        }
    ],

    // ==========================================
    // ESCALAS SALARIALES
    // ==========================================
    escalas: {
        'cal-piedra': [
            { categoria: 'Operario', nivel: 'A', salario: 820000 },
            { categoria: 'Operario Calero/Canterito', nivel: 'B', salario: 950000 },
            { categoria: 'Oficial', nivel: 'C', salario: 1100000 },
            { categoria: 'Maestro Calero/Canterito', nivel: 'D', salario: 1300000 },
            { categoria: 'Volador Habilitado', nivel: 'E', salario: 1400000 }
        ],
        cemento: [
            { categoria: 'Operario de Planta', nivel: 'A', salario: 850000 },
            { categoria: 'Operario Especializado', nivel: 'B', salario: 980000 },
            { categoria: 'Oficial 1°', nivel: 'C', salario: 1120000 },
            { categoria: 'Oficial Maestro', nivel: 'D', salario: 1350000 },
            { categoria: 'Técnico', nivel: 'E', salario: 1480000 },
            { categoria: 'Delegado', nivel: 'F', salario: 1620000 }
        ],
        molienda: [
            { categoria: 'Operario de Molienda', nivel: 'A', salario: 950000 },
            { categoria: 'Operario de Molino', nivel: 'B', salario: 1150000 },
            { categoria: 'Oficial de Planta', nivel: 'C', salario: 1380000 },
            { categoria: 'Supervisor de Turno', nivel: 'D', salario: 1700000 }
        ],
        'mineria-extractiva': [
            { categoria: 'Operario de Mina', nivel: 'A', salario: 1100000 },
            { categoria: 'Operario Especializado', nivel: 'B', salario: 1350000 },
            { categoria: 'Oficial Minero', nivel: 'C', salario: 1580000 },
            { categoria: 'Maestro Minero', nivel: 'D', salario: 1850000 },
            { categoria: 'Técnico Minero', nivel: 'E', salario: 2100000 }
        ]
    },

    // ==========================================
    // CURSOS / CAPACITACIONES
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
            contenido: '<h3>Contenido del curso...</h3>',
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
            id: 4,
            titulo: 'Operación de Caleras',
            categoria: 'Técnico',
            actividad: 'cal-piedra',
            instructor: 'Téc. Carlos Gómez',
            duracion: '8 horas',
            nivel: 'Básico',
            imagen: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=600&q=80',
            descripcion: 'Operación segura de hornos de cal.',
            modulos: 4,
            contenido: '<h3>Contenido del curso...</h3>',
            documentos: []
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
            contenido: '<h3>Contenido del curso...</h3>',
            documentos: []
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
            contenido: '<h3>Contenido del curso...</h3>',
            documentos: []
        }
    ],

    // ==========================================
    // VIDEOS DE YOUTUBE
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
    // PREGUNTAS FRECUENTES
    // ==========================================
    faqs: {
        general: [
            { pregunta: '¿Cómo me inscribo a una capacitación?', respuesta: 'Ingresá a la sección "Capacitaciones", seleccioná el curso deseado y hacé clic en "Inscribirme".' },
            { pregunta: '¿Los cursos tienen certificación?', respuesta: 'Sí, al completar la capacitación y aprobar la evaluación, recibirás un certificado digital con validez gremial.' },
            { pregunta: '¿Cómo recupero mi contraseña?', respuesta: 'Contactá al administrador al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.' },
            { pregunta: '¿Qué beneficios tengo como delegado?', respuesta: 'Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.' }
        ],
        'cal-piedra': [
            { pregunta: '¿Qué diferencia salarial hay entre cal y piedra?', respuesta: 'Ambas actividades comparten el CTT 36/89 con escalas similares. Ver tabla en Escalas.' },
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
    // NOTICIAS
    // ==========================================
    noticias: [
        {
            id: 1,
            titulo: 'Paritaria 2024: Acuerdo histórico para el sector minero',
            categoria: 'Paritarias',
            resumen: 'Se alcanzó un acuerdo que incluye aumentos salariales del 45% y mejoras en las condiciones laborales.',
            contenido: 'Contenido completo...',
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
        }
    ]
};

// ============================================
// FUNCIÓN DE BÚSQUEDA GLOBAL
// ============================================
DATA.buscar = function(query) {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return null;
    
    const resultados = {
        cursos: [],
        videos: [],
        convenios: [],
        leyes: [],
        faqs: [],
        noticias: []
    };

    this.cursos.forEach(c => {
        if (c.titulo.toLowerCase().includes(q) || c.descripcion.toLowerCase().includes(q)) {
            resultados.cursos.push(c);
        }
    });

    this.videos.forEach(v => {
        if (v.titulo.toLowerCase().includes(q) || v.descripcion.toLowerCase().includes(q)) {
            resultados.videos.push(v);
        }
    });

    this.convenios.forEach(c => {
        if (c.titulo.toLowerCase().includes(q) || c.resumen.toLowerCase().includes(q)) {
            resultados.convenios.push(c);
        }
    });

    this.leyes.forEach(l => {
        if (l.titulo.toLowerCase().includes(q) || l.resumen.toLowerCase().includes(q)) {
            resultados.leyes.push(l);
        }
    });

    Object.entries(this.faqs).forEach(([cat, items]) => {
        items.forEach(f => {
            if (f.pregunta.toLowerCase().includes(q) || f.respuesta.toLowerCase().includes(q)) {
                resultados.faqs.push({ ...f, categoria: cat });
            }
        });
    });

    this.noticias.forEach(n => {
        if (n.titulo.toLowerCase().includes(q) || n.resumen.toLowerCase().includes(q)) {
            resultados.noticias.push(n);
        }
    });

    return resultados;
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.DATA = DATA;
}

console.log('✅ Base de datos AOMA cargada');
console.log(`📋 ${Object.keys(DATA.actividades).length} actividades`);
console.log(`📚 ${DATA.convenios.length} convenios`);
console.log(`⚖️ ${DATA.leyes.length} leyes`);