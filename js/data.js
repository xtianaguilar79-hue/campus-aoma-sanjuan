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
    // 2. EMPRESAS MINERAS
    // ==========================================
    empresas: {
        'veladero': {
            id: 'veladero',
            nombre: 'Mina Veladero',
            empresa: 'Barrick Gold / Shandong Gold',
            icono: 'fa-building',
            color: '#0891b2',
            imagen: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
            ubicacion: 'Iglesia, San Juan',
            descripcion: 'Mina de oro y plata a cielo abierto ubicada en alta cordillera',
            actividad: 'mineria-extractiva',
            ctt: 'Convenio específico Veladero'
        },
        'gualcamayo': {
            id: 'gualcamayo',
            nombre: 'Mina Gualcamayo',
            empresa: 'Minas Argentinas S.A. (Grupo AISA)',
            icono: 'fa-building',
            color: '#0891b2',
            imagen: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
            ubicacion: 'Jáchal, San Juan',
            descripcion: 'Mina de oro a cielo abierto',
            actividad: 'mineria-extractiva',
            ctt: 'Convenio específico Gualcamayo'
        },
        'vicuna': {
            id: 'vicuna',
            nombre: 'Mina Vicuña',
            empresa: 'Vicuña Corp (Lundin-BHP)',
            icono: 'fa-building',
            color: '#0891b2',
            imagen: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
            ubicacion: 'Iglesia, San Juan',
            descripcion: 'Proyecto de cobre, oro y plata en alta cordillera',
            actividad: 'mineria-extractiva',
            ctt: 'Convenio específico Vicuña'
        }
    },

    // ==========================================
    // 3. CONVENIOS COLECTIVOS
    // ==========================================
    convenios: [
        {
            numero: 'CCT 36/89',
            titulo: 'Convenio Colectivo de Trabajo N° 36/89',
            subtitulo: 'Cal, Piedra y Afines',
            actividad: 'cal-piedra',
            variable: 'CCT_36_89',
            resumen: 'Convenio colectivo para trabajadores de cal, piedra y actividades afines',
            contenido: null
        },
        {
            numero: 'CCT 37/89',
            titulo: 'Convenio Colectivo de Trabajo N° 37/89',
            subtitulo: 'Molienda de Minerales',
            actividad: 'molienda',
            variable: null,
            resumen: 'Convenio colectivo para trabajadores de molienda de minerales',
            contenido: null
        },
        {
            numero: 'CCT 38/89',
            titulo: 'Convenio Colectivo de Trabajo N° 38/89',
            subtitulo: 'Minería Extractiva',
            actividad: 'mineria-extractiva',
            variable: 'CCT_38_89',
            resumen: 'Convenio colectivo para trabajadores de minería extractiva',
            contenido: null
        },
        {
            numero: 'CCT 53/89',
            titulo: 'Convenio Colectivo de Trabajo N° 53/89',
            subtitulo: 'Personal Administrativo del Cemento Portland',
            actividad: 'cemento',
            variable: null,
            resumen: 'Convenio para personal administrativo de la industria del cemento',
            contenido: null
        },
        {
            numero: 'CCT 54/89',
            titulo: 'Convenio Colectivo de Trabajo N° 54/89',
            subtitulo: 'Personal Obrero del Cemento Portland',
            actividad: 'cemento',
            variable: 'CCT_54_89',
            resumen: 'Convenio para personal obrero de la industria del cemento portland',
            contenido: null
        },
        {
            numero: 'CCT 673/04',
            titulo: 'Convenio Colectivo de Trabajo N° 673/04',
            subtitulo: 'Barrick - AOMA',
            actividad: 'mineria-extractiva',
            empresa: 'veladero',
            variable: 'CCT_VELADERO',
            resumen: 'Convenio colectivo específico de la Mina Veladero',
            contenido: null
        },
        {
            numero: 'CCT Gualcamayo',
            titulo: 'Convenio Colectivo - Mina Gualcamayo',
            subtitulo: 'Convenio por empresa - Minas Argentinas S.A.',
            actividad: 'mineria-extractiva',
            empresa: 'gualcamayo',
            variable: 'CCT_GUALCAMAYO',
            resumen: 'Convenio colectivo específico de la Mina Gualcamayo',
            contenido: null
        },
        {
            numero: 'CCT Vicuña',
            titulo: 'Convenio Colectivo - AOMA - DEPROMINSA',
            subtitulo: 'Proyecto Josemaría/Vicuña',
            actividad: 'mineria-extractiva',
            empresa: 'vicuna',
            variable: 'CCT_VICUNA',
            resumen: 'Convenio colectivo específico del Proyecto Josemaría/Vicuña',
            contenido: null
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
    // 5. CAPACITACIONES (se cargan desde módulos)
    // ==========================================
    cursos: [],

    // ==========================================
    // 6. BENEFICIOS SOCIALES
    // ==========================================
    beneficios: {
        reintegros: {
            titulo: 'Reintegros',
            icono: 'fa-receipt',
            color: '#10b981',
            items: [
                {
                    titulo: 'Medicamentos',
                    porcentaje: '30%',
                    montoMax: null,
                    descripcion: 'Reintegro del 30% del valor total indicado en comprobante.',
                    exclusiones: 'Quedan excluidos medicamentos de venta libre, preparados magistrales, perfumería, etc.',
                    documentacion: 'Ticket o factura avalada por ARCA, copia receta médica, carnet de afiliado y último recibo de sueldo.'
                },
                {
                    titulo: 'Ortopedia y Ortodoncia',
                    porcentaje: '30%',
                    montoMax: 'Tope máximo: $75.000 (30% de $250.000)',
                    descripcion: 'Reintegro del 30% del valor de la factura, con tope máximo de $75.000.',
                    exclusiones: 'Quedan excluidos los productos estéticos.',
                    documentacion: 'Ticket o factura avalada por ARCA, copia receta médica, carnet de afiliado y último recibo de sueldo.'
                },
                {
                    titulo: 'Anteojos y Lentes de Contacto',
                    porcentaje: '40%',
                    montoMax: 'Tope máximo: $100.000 (40% de $250.000)',
                    descripcion: 'Reintegro del 40% del valor de la factura, con tope máximo de $100.000.',
                    exclusiones: 'Quedan excluidos los productos estéticos.',
                    documentacion: 'Ticket o factura avalada por ARCA, copia receta médica, carnet de afiliado y último recibo de sueldo.'
                }
            ]
        }
    },

    // ==========================================
    // 7. PREGUNTAS FRECUENTES
    // ==========================================
    faqs: {
        general: [
            { pregunta: '¿Cómo me inscribo a una capacitación?', respuesta: 'Ingresá a la sección "Capacitaciones", seleccioná el curso deseado y hacé clic en "Inscribirme".' },
            { pregunta: '¿Los cursos tienen certificación?', respuesta: 'Sí, al completar la capacitación y aprobar la evaluación, recibirás un certificado digital con validez gremial.' }
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
        }
    ],

    // ==========================================
    // 9. AUTORIDADES DEL SINDICATO
    // ==========================================
    autoridades: {
        nacional: {
            nombre: 'ASOCIACIÓN OBRERA MINERA ARGENTINA',
            agrupacion: 'Agrupación de Trabajadores Mineros "17 de Octubre" - Lista Blanca',
            periodo: '2026-2030',
            comisionDirectiva: [
                { cargo: 'Secretario General', nombre: 'Héctor Oscar Laplace' },
                { cargo: 'Secretario Adjunto', nombre: 'Iván Marcelo Malla' },
                { cargo: 'Secretario Administrativo', nombre: 'Gustavo Gabriel Molina' },
                { cargo: 'Tesorero', nombre: 'Héctor Horacio Savid' },
                { cargo: 'Secretario Gremial e Interior', nombre: 'Alejandro José Santillán' },
                { cargo: 'Secretario Social y Turismo', nombre: 'Emanuel Gauna' },
                { cargo: 'Secretario Prensa y Cultura', nombre: 'Javier Omar Castro' },
                { cargo: 'Secretario de Higiene, Seguridad y Medicina del Trabajo', nombre: 'Emanuel Maximiliano Castro' }
            ],
            vocalesTitulares: [
                'Daniel Cristian Montenegro',
                'Juan Carlos del Valle Herrera',
                'Matías Ezequiel Bogacki Sosa',
                'Luis Tinte',
                'Nicolás Jorge A. Castillo',
                'Leandro Pérez López',
                'Alejandro Valenzuela'
            ],
            vocalesSuplentes: [
                'Emmanuel Pedro Enrique',
                'Leonela Domínguez',
                'Walter Marcelo Marcovich',
                'Pablo Nicolás Loto',
                'Martín Isasmendi',
                'Fabián Alberto Vargas',
                'Mariela Beatriz García'
            ],
            comisionRevisora: {
                titulares: ['Cristian Eugenio Aguilar', 'Enrique Verdenelli', 'César Carlos Costello'],
                suplentes: ['Marcelo David Cervantes', 'María Silvana Aurbone', 'Lucas Muñiz']
            },
            funciones: {
                'Secretario General': 'Representar a la organización. Firmar actas, cheques, presidir reuniones.',
                'Secretario Adjunto': 'Colaborar con el Secretario General. Reemplazarlo en caso de ausencia.',
                'Secretario Administrativo': 'Confección de actas, archivos, redacción de memoria, control de personal.',
                'Tesorero': 'Controlar ingresos y egresos, contabilidad, balances, depósitos bancarios.',
                'Secretario Gremial e Interior': 'Coordinar acción entre Consejo Directivo y Seccionales, afiliaciones, estadísticas.',
                'Secretario Social y Turismo': 'Organizar obras de asistencia social, turismo, representación ante organismos.',
                'Secretario de Higiene, Seguridad y Medicina del Trabajo': 'Relevamiento, asesoramiento, cursos, representación en seguridad laboral.'
            }
        },
        provincial: {
            nombre: 'ASOCIACIÓN OBRERA MINERA ARGENTINA - Seccional San Juan',
            agrupacion: 'Lista Blanca',
            periodo: '2026-2030',
            comisionDirectiva: [
                { cargo: 'Secretario General', nombre: 'Iván Marcelo Malla' },
                { cargo: 'Secretario Adjunto', nombre: 'Raúl Edgardo Malla' },
                { cargo: 'Secretario Administrativo', nombre: 'Rubén Eloy Ortiz' },
                { cargo: 'Tesorero', nombre: 'Juan Norberto Frías' },
                { cargo: 'Secretario Gremial e Interior', nombre: 'Cristian Daniel Soria' },
                { cargo: 'Secretario Social y Turismo', nombre: 'Rubén Martín Arenas' },
                { cargo: 'Secretario de Higiene, Seguridad y Medicina del Trabajo', nombre: 'Cristian Aguilar' }
            ],
            vocalesTitulares: [
                'Gustavo Rolando Rodríguez',
                'Omar Segundo Malla',
                'Sergio Osvaldo Quiroga',
                'Carlos Alberto Gómez',
                'José Antonio Arbo'
            ],
            vocalesSuplentes: [
                'Daniel Silvio Colombo',
                'Ángel Ramón Funes',
                'Víctor Segovia',
                'Eduardo J. Benemerito',
                'Ramón Ricardo Herrera'
            ],
            delegadosCongresalesTitulares: [
                'Walter Flores',
                'Gustavo Naranjo',
                'María Silvana Aubone',
                'José Luis Ávila',
                'Martín Rolando Peñaloza',
                'Juan Carlos Reina',
                'Amira Loreta Esquivel'
            ],
            delegadosCongresalesSuplentes: [
                'Miguel Maldonado Gonzalez',
                'Juan Víctor Manzano',
                'Matías Nicolás Valencia',
                'María Estrella Alaniz',
                'Víctor Javier Elizondo',
                'Darío Alejandro Castillo',
                'Adrián Mauricio Rodríguez'
            ],
            comisionRevisora: {
                titulares: ['Alfredo Daniel Morales', 'Joaquín Alejandro Muñoz', 'Diego Orlando Varela'],
                suplentes: ['Andrés Raúl Alcayaga', 'Jorge Fabián Agudo', 'Francisco Fabián Ibaceta']
            },
            funciones: {
                'Secretario General': 'Representar a la organización a nivel provincial. Coordinar con el Consejo Directivo Nacional.',
                'Secretario Adjunto': 'Colaborar con el Secretario General provincial. Reemplazarlo en caso de ausencia.',
                'Secretario Administrativo': 'Gestionar la administración de la seccional, archivos, actas, personal y correspondencia.',
                'Tesorero': 'Controlar los fondos de la seccional, contabilidad, balances y depósitos bancarios.',
                'Secretario Gremial e Interior': 'Coordinar la acción gremial entre la seccional y las bases, afiliaciones, estadísticas.',
                'Secretario Social y Turismo': 'Organizar y gestionar los beneficios sociales, turismo y asistencia social para los afiliados de la provincia.',
                'Secretario de Higiene, Seguridad y Medicina del Trabajo': 'Velar por la higiene, seguridad y salud de los trabajadores en el ámbito provincial.'
            }
        }
    },

    // ==========================================
    // 10. USUARIOS (VACÍO - sin precargados)
    // ==========================================
    usuarios: [],

    // ==========================================
    // 11. RESPUESTAS DEL CHAT (fallback)
    // ==========================================
    chatResponses: {
        'hola|buenas|buenos días': '¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?',
        'default': 'No encontré información específica sobre eso. Te recomiendo revisar las secciones del menú o contactar a la Seccional al (0264) 422-0191.'
    }
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================
DATA.formatCurrency = function(amount) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(amount);
};

DATA.formatDate = function(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
};

if (typeof window !== 'undefined') {
    window.DATA = DATA;
}

console.log('✅ Base de datos AOMA cargada (sin usuarios precargados)');