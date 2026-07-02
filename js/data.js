// ============================================
// BASE DE DATOS - CAMPUS VIRTUAL AOMA SAN JUAN
// ============================================
// Este archivo contiene TODO el contenido:
// - Actividades
// - Convenios CCT
// - Leyes laborales
// - Escalas salariales
// - Cursos
// - Videos
// - FAQs
// - Noticias
// ============================================

const DATA = {
    
    // ==========================================
    // 1. ACTIVIDADES DE AOMA (ESTRUCTURA REAL)
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
            empresas: ['Veladero', 'Gualcamayo', 'Vicuña']
        },
        'cemento': {
            id: 'cemento',
            nombre: 'Cemento',
            icono: 'fa-industry',
            color: '#64748b',
            imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
            descripcion: 'Industria del cemento y derivados',
            ctt: 'CTT 238/94',
            empresas: []
        },
        'cal-piedra': {
            id: 'cal-piedra',
            nombre: 'Cal y Piedra',
            icono: 'fa-mountain',
            color: '#78716c',
            imagen: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=1200&q=80',
            descripcion: 'Industria de la cal y canteras de piedra',
            ctt: 'CTT 36/89',
            empresas: []
        },
        'molienda': {
            id: 'molienda',
            nombre: 'Molienda de Minerales',
            icono: 'fa-cogs',
            color: '#475569',
            imagen: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
            descripcion: 'Procesamiento y molienda de minerales',
            ctt: 'CTT 302/75',
            empresas: []
        }
    },

    // ==========================================
    // 2. CONVENIOS COLECTIVOS DE TRABAJO
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
            resumen: 'Convenio marco para la actividad minera en Argentina. Aplica a empresas como Veladero, Gualcamayo y Vicuña.',
            contenido: `
                <h3>Capítulo I - Ámbito de aplicación</h3>
                <p>El presente convenio regula las relaciones laborales en la actividad minera, comprendiendo todas las empresas que exploten minas, canteras y establecimientos de beneficio de minerales en todo el territorio nacional.</p>
                
                <h3>Capítulo II - Jornada de trabajo</h3>
                <p>La jornada normal de trabajo será de 8 horas diarias o 48 semanales para trabajo diurno. Para trabajo subterráneo, la jornada será de 6 horas diarias o 36 semanales.</p>
                
                <h3>Capítulo III - Remuneraciones</h3>
                <p>Los trabajadores percibirán las remuneraciones establecidas en las escalas salariales vigentes, que se actualizarán semestralmente mediante negociación paritaria entre la AOMA y las empresas.</p>
                
                <h3>Capítulo IV - Licencias</h3>
                <p>Licencia anual ordinaria: 14 días corridos para antigüedad hasta 5 años, 21 días de 5 a 10 años, 28 días de 10 a 20 años, y 35 días más de 20 años de antigüedad.</p>
                
                <h3>Capítulo V - Adicionales</h3>
                <p>Adicional por zona (según ubicación geográfica del establecimiento), adicional por tarea insalubre, adicional por antigüedad (1% por año), adicional por título profesional.</p>
                
                <h3>Capítulo VI - Delegados Sindicales</h3>
                <p>Los delegados sindicales gozarán de fuero sindical conforme a la Ley 23.551. Tendrán derecho a horas gremiales para el ejercicio de sus funciones de representación.</p>
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
                <p>Comprende a todos los trabajadores de la industria de la cal y canteras de piedra, incluyendo calizas, dolomitas, mármoles, granitos y materiales para la construcción.</p>
                
                <h3>Categorías profesionales</h3>
                <ul>
                    <li><strong>Categoría A:</strong> Operario / Canterito</li>
                    <li><strong>Categoría B:</strong> Operario calero / Operario de cantera</li>
                    <li><strong>Categoría C:</strong> Oficial</li>
                    <li><strong>Categoría D:</strong> Maestro calero / Maestro canterito</li>
                    <li><strong>Categoría E:</strong> Volador habilitado</li>
                </ul>
                
                <h3>Adicionales específicos</h3>
                <p>Adicional por zona según provincia, adicional por exposición a polvo de cal/piedra, adicional por trabajo con explosivos (voladores), adicional por antigüedad.</p>
                
                <h3>Seguridad e higiene</h3>
                <p>Uso obligatorio de EPP: casco, lentes de seguridad, protección auditiva, calzado de seguridad, mascarilla contra polvo. Controles médicos periódicos incluyendo espirometrías.</p>
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
                <p>Comprende a todos los trabajadores de la industria del cemento, incluyendo plantas de producción, canteras asociadas, centros de distribución y laboratorios de control de calidad.</p>
                
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
                <p>Adicional por zona según provincia, adicional por exposición a polvo de cemento, adicional por trabajo en horno rotativo, adicional por antigüedad.</p>
                
                <h3>Condiciones especiales</h3>
                <p>Reconocimiento de la insalubridad del trabajo en planta. Controles médicos específicos: espirometrías anuales, audiometrías, exámenes dermatológicos.</p>
            `,
            archivo: null
        }
    ],

    // ==========================================
    // 3. LEYES LABORALES
    // ==========================================
    leyes: [
        {
            id: 1,
            numero: 'LCT 20.744',
            titulo: 'Ley de Contrato de Trabajo',
            categoria: 'Laboral General',
            resumen: 'Regula las relaciones individuales de trabajo en Argentina.',
            contenido: `
                <h3>Artículo 1° - Objeto</h3>
                <p>Esta ley es aplicable a toda relación de trabajo por la cual una persona física realice actos, ejecute obras o preste servicios, mediante remuneración, para otra persona.</p>
                
                <h3>Artículo 2° - Contrato de trabajo</h3>
                <p>Se considera contrato de trabajo cuando una persona se obligue a realizar actos, ejecutar obras o prestar servicios a otra, bajo su dependencia, mediante una remuneración.</p>
                
                <h3>Artículo 92° - Período de prueba</h3>
                <p>Los primeros 3 meses de relación laboral se consideran período de prueba. Durante este período, cualquiera de las partes puede extinguir la relación sin expresión de causa.</p>
                
                <h3>Artículo 245° - Indemnización por antigüedad</h3>
                <p>Un mes de sueldo por cada año de servicio o fracción mayor a 3 meses, tomando como base la mejor remuneración mensual, normal y habitual devengada en el último año.</p>
                
                <h3>Artículo 247° - Preaviso</h3>
                <p>El empleador que decida extinguir el contrato de trabajo deberá notificar al trabajador con un preaviso de 15 días si no hubiere transcurrido el período de prueba, o de 2 meses si el trabajador tuviera más de 5 años de antigüedad.</p>
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
                <p>Establecer las normas mínimas de higiene y seguridad en el trabajo en todo el territorio nacional, aplicable a todas las actividades laborales.</p>
                
                <h3>Obligaciones del empleador</h3>
                <ul>
                    <li>Proveer elementos de protección personal adecuados</li>
                    <li>Capacitar a los trabajadores en materia de seguridad</li>
                    <li>Realizar controles médicos preocupacionales y periódicos</li>
                    <li>Mantener los lugares de trabajo en condiciones seguras</li>
                    <li>Implementar servicios de higiene y seguridad</li>
                </ul>
                
                <h3>Obligaciones del trabajador</h3>
                <ul>
                    <li>Usar correctamente los EPP provistos</li>
                    <li>Cumplir con las normas de seguridad establecidas</li>
                    <li>Reportar condiciones inseguras o actos inseguros</li>
                    <li>Someterse a los exámenes médicos obligatorios</li>
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
                <p>Se considera accidente de trabajo a todo acontecimiento súbito y violento ocurrido por el hecho o en ocasión del trabajo, que produzca en el trabajador una lesión funcional o corporal, permanente o transitoria.</p>
                
                <h3>Enfermedades profesionales</h3>
                <p>Listado de enfermedades profesionales reconocidas, incluyendo silicosis, hipoacusia por ruido, enfermedades osteoarticulares, entre otras específicas del sector minero.</p>
                
                <h3>Prestaciones</h3>
                <p>Asistencia médica y farmacéutica, prestaciones en dinero (incapacidad temporaria, invalidez, muerte), rehabilitación profesional.</p>
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
                <p>Reconocimiento oficial de la asociación sindical más representativa. La AOMA cuenta con personería gremial para representar a los trabajadores mineros.</p>
                
                <h3>Delegados sindicales</h3>
                <p>Elección, funciones y fuero de los delegados sindicales. Los delegados gozan de estabilidad en el empleo y no pueden ser despedidos sin causa justificada.</p>
                
                <h3>Tutela sindical</h3>
                <p>Protección contra el despido de dirigentes y candidatos a dirigentes sindicales. Fuero sindical durante el mandato y 1 año posterior.</p>
            `,
            archivo: null
        }
    ],

    // ==========================================
    // 4. ESCALAS SALARIALES
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
    // 5. CURSOS / CAPACITACIONES
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
    // 6. VIDEOS DE YOUTUBE
    // ==========================================
    // Para agregar videos reales:
    // 1. Abrí el video en YouTube
    // 2. Copiá el ID (lo que viene después de v=)
    //    Ejemplo: https://www.youtube.com/watch?v=ABC123XYZ
    //    El ID es: ABC123XYZ
    // 3. Reemplazá 'dQw4w9WgXcQ' por el ID real
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
    // 7. PREGUNTAS FRECUENTES
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
    // 8. NOTICIAS
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
    // 9. USUARIOS POR DEFECTO
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
    // 10. RESPUESTAS DEL CHAT
    // ==========================================
    chatResponses: {
        'hola|buenas|buenos días': '¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?',
        'gracias|thanks': '¡De nada! 😊 Estoy aquí para lo que necesites.',
        'adiós|chau|bye': '¡Hasta luego!  Que tengas un excelente día.',
        'escala|salarial|sueldo': ' Podés consultar las escalas salariales actualizadas en el menú lateral → "Escalas Salariales". Están separadas por actividad: Minería Extractiva, Cemento, Cal y Piedra, y Molienda.',
        'convenio|ctt': '📋 Tenemos 3 convenios colectivos cargados: CTT 302/75 (Minería), CTT 36/89 (Cal y Piedra) y CTT 238/94 (Cemento). Podés consultarlos en "Convenios CCT".',
        'ley|legislación|legislacion': '⚖️ Tenemos 4 leyes laborales cargadas: LCT 20.744, Ley 19.587, Ley 24.557 y Ley 23.551. Podés consultarlas en "Legislación".',
        'curso|capacitacion|capacitación': ' Tenemos 6 cursos disponibles. Podés verlos todos en "Capacitaciones".',
        'video|charla': '🎥 Tenemos 4 videos en la biblioteca. Podés verlos en la sección de videos.',
        'contraseña|clave|password': '🔑 Para recuperar tu contraseña, contactá al administrador al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.',
        'horario|atiende|dirección': '🕐 La Seccional San Juan atiende de lunes a viernes de 8:00 a 16:00 hs. Dirección: Rivadavia 345 Oeste, San Juan Capital. Tel: (0264) 422-XXXX',
        'beneficio|delegado': ' Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.',
        'certificado': '🎓 Al completar un curso y aprobar la evaluación, obtenés un certificado digital con validez gremial.',
        'default': 'No encontré información específica sobre eso. Te recomiendo revisar las secciones del menú lateral o contactar a la Seccional al (0264) 422-XXXX.'
    }
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

// ============================================
// FUNCIÓN DE FORMATEO DE MONEDA
// ============================================
DATA.formatCurrency = function(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(amount);
};

// ============================================
// FUNCIÓN DE FORMATEO DE FECHA
// ============================================
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
console.log(' ' + DATA.convenios.length + ' convenios');
console.log('⚖️ ' + DATA.leyes.length + ' leyes');
console.log('🎓 ' + DATA.cursos.length + ' cursos');
console.log('🎥 ' + DATA.videos.length + ' videos');