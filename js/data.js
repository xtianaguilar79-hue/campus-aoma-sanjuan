// ============================================
// BASE DE DATOS DE CONTENIDO - AOMA SAN JUAN
// Archivo central con toda la información
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
                <p>La seguridad en minería es fundamental para prevenir accidentes. Se analizan los riesgos inherentes a la actividad y las medidas preventivas.</p>
                
                <h3>Módulo 2: EPP obligatorio</h3>
                <p>Elementos de Protección Personal: casco con barbiquejo, botas de seguridad con puntera de acero, linterna minera, lentes de seguridad, protección auditiva.</p>
                
                <h3>Módulo 3: Plan de evacuación</h3>
                <p>Protocolos de emergencia, rutas de escape, puntos de encuentro y procedimientos ante incendios, derrumbes o inundaciones.</p>
                
                <h3>Módulo 4: Señalización minera</h3>
                <p>Significado de carteles, colores y símbolos utilizados en minería para advertir peligros.</p>
                
                <h3>Módulo 5: Primeros auxilios</h3>
                <p>Atención básica de traumatismos, hemorragias, quemaduras y RCP en ambiente minero.</p>
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
            descripcion: 'Herramientas de negociación y representación gremial para delegados.',
            modulos: 6,
            contenido: `
                <h3>Módulo 1: El rol del delegado</h3>
                <p>Funciones, derechos y obligaciones del delegado sindical según la Ley 23.551.</p>
                
                <h3>Módulo 2: Técnicas de comunicación</h3>
                <p>Cómo comunicarse efectivamente con los compañeros y la empresa.</p>
                
                <h3>Módulo 3: Negociación colectiva</h3>
                <p>Proceso de negociación paritaria, estrategias y tácticas.</p>
                
                <h3>Módulo 4: Resolución de conflictos</h3>
                <p>Mediación, arbitraje y procedimientos ante conflictos individuales y colectivos.</p>
                
                <h3>Módulo 5: Organización de asambleas</h3>
                <p>Tipos de asambleas, quórum, mociones y actas.</p>
                
                <h3>Módulo 6: Derechos gremiales</h3>
                <p>Tutela sindical, horas gremiales y fuero de actividad.</p>
            `,
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
            descripcion: 'Certificación para operación de camiones de extracción de gran porte.',
            modulos: 8,
            contenido: '<h3>Curso avanzado de operación de camiones CAEX (Camión de Alto Exceso).</h3><p>Incluye inspección pre-operacional, técnicas de carga, mantenimiento básico y normas de seguridad.</p>',
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
            descripcion: 'Conocimiento del proceso productivo del cemento desde la cantera hasta el producto final.',
            modulos: 5,
            contenido: '<h3>Proceso completo de fabricación de cemento.</h3><p>Extracción, trituración, molienda de crudo, calcinación en horno rotativo, molienda de clínker y ensacado.</p>',
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
            descripcion: 'Marco legal y convenios colectivos del sector minero argentino.',
            modulos: 4,
            contenido: '<h3>Marco normativo del trabajo minero.</h3><p>Ley de Contrato de Trabajo, Convenios Colectivos, Ley de Riesgos del Trabajo, normativa específica minera.</p>',
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
            descripcion: 'Atención de emergencias y primeros auxilios en ambiente minero.',
            modulos: 5,
            contenido: '<h3>Atención de emergencias en mina.</h3><p>RCP, traumatismos, hemorragias, quemaduras, intoxicaciones, rescate y evacuación de heridos.</p>',
            documentos: []
        }
    ],

    // ==========================================
    // VIDEOS DE YOUTUBE
    // ==========================================
    // INSTRUCCIONES PARA AGREGAR VIDEOS:
    // 1. Abrí el video en YouTube
    // 2. Copiá el ID (lo que viene después de v=)
    //    Ejemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ
    //    El ID es: dQw4w9WgXcQ
    // 3. Pegalo en youtubeId
    // 4. Para videos privados: subí el video a YouTube
    //    como "Oculto" (Unlisted) y copiá el ID
    // ==========================================
    videos: [
        {
            id: 1,
            titulo: 'Seguridad en Minería Subterránea',
            categoria: 'metalifera',
            youtubeId: 'dQw4w9WgXcQ',
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
            descripcion: 'Análisis del nuevo convenio colectivo del sector minero.',
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
            descripcion: 'Capacitación sobre operación de molinos SAG.',
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
        },
        {
            id: 6,
            titulo: 'Voladura controlada en canteras',
            categoria: 'piedra',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '41:00',
            thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
            descripcion: 'Técnicas de voladura segura en canteras de piedra.',
            vistas: 389,
            fecha: '2024-04-18'
        },
        {
            id: 7,
            titulo: 'Hornos de cal - Operación segura',
            categoria: 'cal',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '38:25',
            thumbnail: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=600&q=80',
            descripcion: 'Operación y mantenimiento de hornos de cal.',
            vistas: 267,
            fecha: '2024-05-02'
        },
        {
            id: 8,
            titulo: 'Camiones CAEX - Operación',
            categoria: 'metalifera',
            youtubeId: 'dQw4w9WgXcQ',
            duracion: '1:05:30',
            thumbnail: 'https://images.unsplash.com/photo-1605218427306-022ba6c5545f?w=600&q=80',
            descripcion: 'Curso completo de operación de camiones de gran porte.',
            vistas: 1520,
            fecha: '2024-05-15'
        }
    ],

    // ==========================================
    // CONVENIOS COLECTIVOS DE TRABAJO
    // ==========================================
    convenios: [
        {
            id: 1,
            titulo: 'Convenio Colectivo N° 302/75 - Actividad Minera',
            categoria: 'Minería General',
            fecha: '1975-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio marco para la actividad minera en Argentina.',
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
            titulo: 'Convenio Colectivo N° 238/94 - Industria del Cemento',
            categoria: 'Cemento',
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
        },
        {
            id: 3,
            titulo: 'Convenio Colectivo N° 167/93 - Industria de la Cal',
            categoria: 'Cal',
            fecha: '1993-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio para trabajadores de la industria de la cal.',
            contenido: `
                <h3>Contenido del convenio</h3>
                <p>Regula las relaciones laborales en la industria de la cal, incluyendo calizas, dolomitas y derivados.</p>
                
                <h3>Categorías</h3>
                <p>Operario, operario calero, oficial, maestro calero.</p>
            `,
            archivo: null
        },
        {
            id: 4,
            titulo: 'Convenio Colectivo N° 270/95 - Canteras de Piedra',
            categoria: 'Piedra',
            fecha: '1995-01-01',
            actualizado: '2024-06-01',
            resumen: 'Convenio para trabajadores de canteras y áridos.',
            contenido: `
                <h3>Ámbito</h3>
                <p>Comprende a trabajadores de canteras de piedra, áridos y materiales para la construcción.</p>
                
                <h3>Habilitaciones especiales</h3>
                <p>Para voladores se requiere habilitación de la Policía de Minería y curso específico anual.</p>
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
                <p>Establecer las normas mínimas de higiene y seguridad en el trabajo en todo el territorio nacional.</p>
                
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
            `
        },
        {
            id: 2,
            numero: 'Ley 20.744',
            titulo: 'Ley de Contrato de Trabajo (LCT)',
            categoria: 'Laboral',
            resumen: 'Regula las relaciones individuales de trabajo en Argentina.',
            contenido: `
                <h3>Contrato de trabajo</h3>
                <p>Se considera contrato de trabajo cuando una persona se obliga a realizar actos, ejecutar obras o prestar servicios a otra, bajo su dependencia, mediante una remuneración.</p>
                
                <h3>Período de prueba</h3>
                <p>Los primeros 3 meses de relación laboral se consideran período de prueba, con indemnización reducida en caso de despido.</p>
                
                <h3>Indemnización por despido</h3>
                <p>Un mes de sueldo por cada año de servicio o fracción mayor a 3 meses, tomando como base la mejor remuneración mensual, normal y habitual devengada en el último año.</p>
                
                <h3>Licencias</h3>
                <p>Enfermedad inculpable, matrimonio (10 días), nacimiento de hijo (2 días), fallecimiento de familiar (3 días), examen (10 días por año).</p>
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
                <p>Se considera accidente de trabajo a todo acontecimiento súbito y violento ocurrido por el hecho o en ocasión del trabajo.</p>
                
                <h3>Enfermedades profesionales</h3>
                <p>Listado de enfermedades profesionales reconocidas, incluyendo silicosis, hipoacusia, enfermedades osteoarticulares, entre otras.</p>
                
                <h3>Prestaciones</h3>
                <p>Asistencia médica y farmacéutica, prestaciones en dinero (incapacidad temporaria, invalidez, muerte).</p>
            `
        },
        {
            id: 4,
            numero: 'Ley 23.551',
            titulo: 'Ley de Asociaciones Sindicales',
            categoria: 'Gremial',
            resumen: 'Regula los sindicatos y la actividad gremial.',
            contenido: `
                <h3>Personería gremial</h3>
                <p>Reconocimiento oficial de la asociación sindical más representativa.</p>
                
                <h3>Delegados</h3>
                <p>Elección, funciones y fuero de los delegados sindicales.</p>
                
                <h3>Tutela sindical</h3>
                <p>Protección contra el despido de dirigentes y candidatos a dirigentes sindicales.</p>
            `
        },
        {
            id: 5,
            numero: 'Ley 25.675',
            titulo: 'Ley General del Ambiente',
            categoria: 'Ambiental',
            resumen: 'Principios de la política ambiental nacional.',
            contenido: `
                <h3>Principios</h3>
                <p>Principio de congruencia, prevención, precautorio, desarrollo sustentable, responsabilidad.</p>
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
            { pregunta: '¿Cómo me inscribo a una capacitación?', respuesta: 'Ingresá a la sección "Capacitaciones", seleccioná el curso deseado y hacé clic en "Inscribirme". Recibirás un email de confirmación.' },
            { pregunta: '¿Los cursos tienen certificación?', respuesta: 'Sí, al completar la capacitación y aprobar la evaluación correspondiente, recibirás un certificado digital con validez gremial.' },
            { pregunta: '¿Cómo recupero mi contraseña?', respuesta: 'Contactá al administrador del campus al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.' },
            { pregunta: '¿Puedo hacer cursos desde mi celular?', respuesta: 'Sí, el campus es 100% responsive y funciona en cualquier dispositivo.' },
            { pregunta: '¿Qué beneficios tengo como delegado?', respuesta: 'Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.' },
            { pregunta: '¿Cuáles son los horarios de la seccional?', respuesta: 'La Seccional San Juan atiende de lunes a viernes de 8:00 a 16:00 hs. Dirección: Rivadavia 345 Oeste, San Juan Capital. Tel: (0264) 422-XXXX' }
        ],
        cemento: [
            { pregunta: '¿Cuál es el adicional por zona en cemento?', respuesta: 'El adicional por zona varía según el establecimiento. Consultá la escala vigente en la sección "Escalas salariales".' },
            { pregunta: '¿Cómo se computan las horas extras?', respuesta: 'Las horas extras se pagan con recargo del 50% días hábiles y 100% sábados, domingos y feriados.' }
        ],
        cal: [
            { pregunta: '¿Qué diferencia salarial hay entre cal y cemento?', respuesta: 'Las escalas son similares pero con ajustes por convenio específico. Ver tabla comparativa en Escalas.' }
        ],
        piedra: [
            { pregunta: '¿Qué permisos necesito para operar explosivos?', respuesta: 'Se requiere habilitación de la Policía de Minería, curso específico y renovación anual. AOMA ofrece el curso.' }
        ],
        metalifera: [
            { pregunta: '¿Cuál es el régimen de turnos en mina?', respuesta: 'Generalmente 4x4 (4 días de trabajo, 4 de descanso) en campamento, o 12x12 según el establecimiento.' },
            { pregunta: '¿Qué controles médicos son obligatorios?', respuesta: 'Examen preocupacional, audiometrías, espirometrías y controles anuales obligatorios por ley.' }
        ],
        molienda: [
            { pregunta: '¿Cuáles son los riesgos de la molienda húmeda?', respuesta: 'Riesgo de atrapamiento, exposición a ruido y contacto con reactivos. Uso obligatorio de EPP específico.' }
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
            contenido: 'Contenido completo de la noticia...',
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
    // ACTIVIDADES (portadas)
    // ==========================================
    actividades: {
        metalifera: {
            id: 'metalifera',
            nombre: 'Minería Metalífera',
            icono: 'fa-gem',
            color: '#f59e0b',
            imagen: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
            descripcion: 'Extracción de metales preciosos y base - oro, cobre, plata'
        },
        cemento: {
            id: 'cemento',
            nombre: 'Cemento',
            icono: 'fa-industry',
            color: '#64748b',
            imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
            descripcion: 'Producción de cemento y derivados'
        },
        cal: {
            id: 'cal',
            nombre: 'Cal',
            icono: 'fa-circle',
            color: '#e5e7eb',
            imagen: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=1200&q=80',
            descripcion: 'Producción de cal y derivados'
        },
        piedra: {
            id: 'piedra',
            nombre: 'Piedra',
            icono: 'fa-cube',
            color: '#78716c',
            imagen: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80',
            descripcion: 'Explotación de canteras y áridos'
        },
        molienda: {
            id: 'molienda',
            nombre: 'Molienda',
            icono: 'fa-cogs',
            color: '#475569',
            imagen: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
            descripcion: 'Procesamiento y molienda de minerales'
        }
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
        if (c.titulo.toLowerCase().includes(q) || 
            c.descripcion.toLowerCase().includes(q) ||
            c.categoria.toLowerCase().includes(q)) {
            resultados.cursos.push(c);
        }
    });

    this.videos.forEach(v => {
        if (v.titulo.toLowerCase().includes(q) || 
            v.descripcion.toLowerCase().includes(q)) {
            resultados.videos.push(v);
        }
    });

    this.convenios.forEach(c => {
        if (c.titulo.toLowerCase().includes(q) || 
            c.resumen.toLowerCase().includes(q) ||
            c.categoria.toLowerCase().includes(q)) {
            resultados.convenios.push(c);
        }
    });

    this.leyes.forEach(l => {
        if (l.numero.toLowerCase().includes(q) ||
            l.titulo.toLowerCase().includes(q) || 
            l.resumen.toLowerCase().includes(q)) {
            resultados.leyes.push(l);
        }
    });

    Object.entries(this.faqs).forEach(([cat, items]) => {
        items.forEach(f => {
            if (f.pregunta.toLowerCase().includes(q) || 
                f.respuesta.toLowerCase().includes(q)) {
                resultados.faqs.push({ ...f, categoria: cat });
            }
        });
    });

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
console.log(`📚 ${DATA.cursos.length} cursos`);
console.log(`🎥 ${DATA.videos.length} videos`);
console.log(`📋 ${DATA.convenios.length} convenios`);
console.log(`⚖️ ${DATA.leyes.length} leyes`);
