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
    // 2. EMPRESAS MINERAS (Convenios por empresa)
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
            empresa: 'Minas Argentinas S.A. (Yamana Gold)',
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
            empresa: 'Vicuña Corp (Pan American Silver)',
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
            variable: 'CTT_36_89',
            resumen: 'Convenio colectivo para trabajadores de cal, piedra y actividades afines',
            contenido: null
        },
        {
            numero: 'CCT 37/89',
            titulo: 'Convenio Colectivo de Trabajo N° 37/89',
            subtitulo: 'Molienda de Minerales',
            actividad: 'molienda',
            variable: 'CTT_37_89',
            resumen: 'Convenio colectivo para trabajadores de molienda de minerales',
            contenido: null
        },
        {
            numero: 'CCT 38/89',
            titulo: 'Convenio Colectivo de Trabajo N° 38/89',
            subtitulo: 'Minería Extractiva',
            actividad: 'mineria-extractiva',
            variable: 'CTT_38_89',
            resumen: 'Convenio colectivo para trabajadores de minería extractiva',
            contenido: null
        },
        {
            numero: 'CCT 53/89',
            titulo: 'Convenio Colectivo de Trabajo N° 53/89',
            subtitulo: 'Personal Administrativo del Cemento Portland',
            actividad: 'cemento',
            variable: 'CTT_53_89',
            resumen: 'Convenio para personal administrativo de la industria del cemento',
            contenido: null
        },
        {
            numero: 'CCT 54/89',
            titulo: 'Convenio Colectivo de Trabajo N° 54/89',
            subtitulo: 'Personal Obrero del Cemento Portland',
            actividad: 'cemento',
            variable: 'CTT_54_89',
            resumen: 'Convenio para personal obrero de la industria del cemento',
            contenido: null
        },
        {
            numero: 'CCT Veladero',
    titulo: 'Convenio Colectivo - Mina Veladero',
    subtitulo: 'Convenio por empresa - Mina Veladero',
    actividad: 'mineria-extractiva',
    empresa: 'veladero',
    variable: 'CCT_VELADERO',
    resumen: 'Convenio colectivo específico de la Mina Veladero (Barrick Gold / Shandong Gold)',
    contenido: null
        },
        {
            numero: 'CCT Gualcamayo',
            titulo: 'Convenio Colectivo - Mina Gualcamayo',
            subtitulo: 'Convenio por empresa - Mina Gualcamayo',
            actividad: 'mineria-extractiva',
            empresa: 'gualcamayo',
            variable: 'CTT_GUALCAMAYO',
            resumen: 'Convenio colectivo específico de la Mina Gualcamayo',
            contenido: null
        },
        {
             numero: 'CCT Vicuña',
    titulo: 'Convenio Colectivo - Mina Vicuña',
    subtitulo: 'Convenio por empresa - Mina Vicuña (Deprominsa)',
    actividad: 'mineria-extractiva',
    empresa: 'vicuna',
    variable: 'CCT_VICUNA',
    resumen: 'Convenio colectivo específico del Proyecto Josemaría/Vicuña (Deprominsa)',
    contenido: null
        }
    ],

    // ==========================================
    // 4. ESCALAS SALARIALES (solo dentro de actividades)
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
    // 5. CAPACITACIONES (ARRAY VACÍO - solo las que cargues)
    // ==========================================
    cursos: [],

    // ==========================================
    // 6. BENEFICIOS SOCIALES (Julio 2026)
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
                    montoMax: '$250.000',
                    descripcion: 'Ortopedia temporaria-definitiva y ortodoncia fija-removible-funcional.',
                    exclusiones: 'Quedan excluidos los productos estéticos.',
                    documentacion: 'Ticket o factura avalada por ARCA, copia receta médica, carnet de afiliado y último recibo de sueldo.'
                },
                {
                    titulo: 'Anteojos y Lentes de Contacto',
                    porcentaje: '40%',
                    montoMax: '$250.000',
                    descripcion: 'Anteojos y lentes de contacto recetados.',
                    exclusiones: 'Quedan excluidos los productos estéticos.',
                    documentacion: 'Ticket o factura avalada por ARCA, copia receta médica, carnet de afiliado y último recibo de sueldo.'
                },
                {
                    titulo: 'Hotel por Enfermedad o Fuerza Mayor',
                    porcentaje: '20%',
                    montoMax: null,
                    descripcion: 'Para afiliados que por motivos de enfermedad o fuerza mayor deban permanecer en San Juan Capital.',
                    exclusiones: null,
                    documentacion: 'Ticket o factura avalada por ARCA, documentación respaldatoria del motivo, carnet de afiliado y último recibo de sueldo.'
                },
                {
                    titulo: 'Pasajes de Colectivos de Larga Distancia',
                    porcentaje: '20%',
                    montoMax: null,
                    descripcion: 'Reintegro para pasajes fuera de la provincia de San Juan.',
                    exclusiones: null,
                    documentacion: 'Pasajes originales, carnet de afiliado y último recibo de sueldo.'
                },
                {
                    titulo: 'Salones de Eventos Familiares',
                    porcentaje: 'Monto Fijo',
                    montoMax: '$100.000',
                    descripcion: 'Beneficio exclusivo para el afiliado titular y su grupo familiar primario en Capital San Juan.',
                    exclusiones: null,
                    documentacion: 'Ticket o factura avalada por ARCA, documentación respaldatoria del evento, carnet de afiliado y último recibo de sueldo.'
                }
            ]
        },
        hoteles: {
            titulo: 'Estadías y Hoteles AOMA/OSAM',
            icono: 'fa-hotel',
            color: '#3b82f6',
            items: [
                {
                    titulo: 'Matrimonio / Unión Civil o Convivencial',
                    porcentaje: null,
                    montoMax: '7 días + 100 litros de nafta',
                    descripcion: '7 días de estadía y media pensión (desayuno y cena, sin bebidas) en hoteles AOMA: Villa Carlos Paz, Mar del Plata, Buenos Aires, Villa La Angostura, Salta, Merlo. Incluye valor de 100 litros de nafta súper a cancelar al regreso.',
                    exclusiones: 'No aplica para temporada alta ni fines de semana largo.',
                    documentacion: 'Copia libreta de matrimonio o certificación de turno, carnet de afiliado y último recibo de sueldo.'
                },
                {
                    titulo: '30 Años de Afiliado',
                    porcentaje: null,
                    montoMax: '7 días + 100 litros de nafta',
                    descripcion: '7 días de estadía y media pensión en hoteles AOMA. Incluye valor de 100 litros de nafta súper.',
                    exclusiones: 'No aplica para temporada alta ni fines de semana largo.',
                    documentacion: 'Documentación que acredite 30 años de afiliación, carnet de afiliado y último recibo de sueldo.'
                }
            ]
        },
        familia: {
            titulo: 'Familia',
            icono: 'fa-users',
            color: '#ec4899',
            items: [
                {
                    titulo: 'Nacimiento',
                    porcentaje: null,
                    montoMax: 'Leche por 12 meses + ajuar',
                    descripcion: 'Entrega de 2 unidades por 800grs de leche por 12 meses (1 año). Por única vez, 1 ajuar completo.',
                    exclusiones: null,
                    documentacion: 'Copia partida de nacimiento o DNI del bebé, carnet de afiliado y último recibo de sueldo.'
                },
                {
                    titulo: 'Kits Escolares',
                    porcentaje: null,
                    montoMax: null,
                    descripcion: 'Útiles escolares y guardapolvos para estudiantes primarios. Útiles escolares para estudiantes secundarios. Una vez al año.',
                    exclusiones: null,
                    documentacion: 'Documentación correspondiente según solicitud.'
                },
                {
                    titulo: 'Campings',
                    porcentaje: null,
                    montoMax: null,
                    descripcion: 'En temporada estival, uso de campings e instalaciones contratadas.',
                    exclusiones: null,
                    documentacion: 'Consultar en sedes de AOMA San Juan con documentación correspondiente.'
                },
                {
                    titulo: 'Becas Educativas',
                    porcentaje: null,
                    montoMax: null,
                    descripcion: 'Para estudiantes de niveles terciarios y universitarios avalados por el Ministerio de Educación.',
                    exclusiones: null,
                    documentacion: 'Documentación correspondiente según solicitud.'
                }
            ]
        },
        salones: {
            titulo: 'Salones de Eventos Familiares',
            icono: 'fa-glass-cheers',
            color: '#8b5cf6',
            items: [
                {
                    titulo: 'Salón Albardón',
                    porcentaje: null,
                    montoMax: null,
                    descripcion: 'Salón Sede AOMA ubicado en Calle La Laja s/n, Las Lomitas (Albardón).',
                    exclusiones: 'Beneficio exclusivo para afiliado titular y grupo familiar primario.',
                    documentacion: 'Reservas y condiciones: consultar en AOMA Albardón o AOMA Capital.'
                },
                {
                    titulo: 'Salón Los Berros',
                    porcentaje: null,
                    montoMax: null,
                    descripcion: 'Salón Sede AOMA ubicado en callejón Díaz s/n.',
                    exclusiones: 'Beneficio exclusivo para afiliado titular y grupo familiar primario.',
                    documentacion: 'Reservas y condiciones: consultar en AOMA Los Berros.'
                }
            ]
        },
        hoteles_tarifa: {
            titulo: 'Hoteles AOMA-OSAM (Tarifa Promocional)',
            icono: 'fa-bed',
            color: '#06b6d4',
            items: [
                {
                    titulo: 'Tarifa Promocional todo el año',
                    porcentaje: null,
                    montoMax: null,
                    descripcion: 'Durante todo el año, tarifa promocional para los hoteles ubicados en: Villa Carlos Paz, Mar del Plata, Buenos Aires, Villa La Angostura, Salta, Merlo, Villa Gesell, Tierra Mora.',
                    exclusiones: 'Aplica para titular y grupo familiar directo.',
                    documentacion: 'Reservas en sedes de AOMA Capital, Albardón, Jáchal.'
                }
            ]
        },
        subsidios: {
            titulo: 'Subsidios',
            icono: 'fa-hand-holding-heart',
            color: '#ef4444',
            items: [
                {
                    titulo: 'Fallecimiento - Afiliado AOMA San Juan',
                    porcentaje: null,
                    montoMax: '$100.000',
                    descripcion: 'Subsidio por fallecimiento del afiliado y grupo familiar primario.',
                    exclusiones: null,
                    documentacion: 'Documentación correspondiente según solicitud.'
                },
                {
                    titulo: 'Fallecimiento - Afiliado OSAM',
                    porcentaje: null,
                    montoMax: 'Consultar',
                    descripcion: 'Subsidio por fallecimiento para afiliado y grupo familiar primario.',
                    exclusiones: null,
                    documentacion: 'Consultar en oficinas habilitadas.'
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
            { pregunta: '¿Los cursos tienen certificación?', respuesta: 'Sí, al completar la capacitación y aprobar la evaluación, recibirás un certificado digital con validez gremial.' },
            { pregunta: '¿Cómo recupero mi contraseña?', respuesta: 'Contactá al administrador al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.' },
            { pregunta: '¿Qué beneficios tengo como afiliado?', respuesta: 'Como afiliado tenés acceso a: reintegros de medicamentos (30%), anteojos (40%), estadías en hoteles AOMA, kits escolares, becas educativas, subsidio por fallecimiento y mucho más. Consultá la sección "Beneficios".' },
            { pregunta: '¿Qué beneficios tengo como delegado?', respuesta: 'Como delegado tenés acceso a: capacitaciones gratuitas, escalas salariales actualizadas, asesoramiento legal, horas gremiales y representación ante la empresa.' }
        ],
        beneficios: [
            { pregunta: '¿Qué requisitos necesito para solicitar un reintegro?', respuesta: 'Generalmente necesitás: ticket o factura avalada por ARCA (ex AFIP), carnet de afiliado, último recibo de sueldo, y documentación específica del beneficio (receta médica, partida de nacimiento, etc.).' },
            { pregunta: '¿Qué es un ticket o factura avalada por ARCA?', respuesta: 'Es un comprobante digital o físico electrónico (factura A, B, C o tickets factura) autorizado con CAE/CAI. Se emite vía web (Comprobantes en Línea), el facturador para monotributistas, o controladores fiscales.' },
            { pregunta: '¿A qué hoteles de AOMA puedo acceder?', respuesta: 'AOMA tiene hoteles en: Villa Carlos Paz, Mar del Plata, Buenos Aires, Villa La Angostura, Salta, Merlo, Villa Gesell y Tierra Mora. Todos con tarifa promocional todo el año para afiliados.' },
            { pregunta: '¿El beneficio de hoteles aplica en temporada alta?', respuesta: 'Los beneficios de estadía por matrimonio y por 30 años de afiliado NO aplican para temporada alta ni fines de semana largo. Pero las tarifas promocionales están disponibles todo el año.' },
            { pregunta: '¿Dónde puedo solicitar los beneficios?', respuesta: 'Dirigite o llamá a AOMA Seccional San Juan de lunes a viernes de 08:00 a 17:00 hs. Dirección: Entre Ríos 468 (S) - San Juan. Tel: 0264-4220191. Email: accionsocialyturismo@aomaosamsanjuan.com.ar' }
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
            resumen: 'Se incorporaron nuevos cursos al campus virtual.',
            contenido: 'Contenido completo...',
            imagen: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
            autor: 'Secretaría de Formación',
            fecha: '2024-02-20',
            destacado: false
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
        }
    ],

    // ==========================================
    // 10. RESPUESTAS DEL CHAT
    // ==========================================
    chatResponses: {
        'hola|buenas|buenos días': '¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?',
        'gracias|thanks': '¡De nada! 😊 Estoy aquí para lo que necesites.',
        'adiós|chau|bye': '¡Hasta luego! 👋 Que tengas un excelente día.',
        'escala|salarial|sueldo': '💰 Podés consultar las escalas salariales en el menú → "Convenios CCT" → Elegí tu actividad. Están separadas por actividad: Minería Extractiva, Cemento, Cal y Piedra, y Molienda.',
        'convenio|ctt': '📋 Tenemos 8 convenios colectivos organizados por actividad y por empresa. Consultalos en "Convenios CCT".',
        'ley|legislación|legislacion': '⚖️ Tenemos 5 leyes laborales cargadas: LCT 20.744, Ley 19.587, Ley 24.557, Ley 24.013 y Ley 23.551. Consultalas en "Legislación".',
        'curso|capacitacion|capacitación': '🎓 Tenemos cursos disponibles. Ver en "Capacitaciones".',
        'beneficio|reintegro|medicamento|hotel|subsidio': '🎁 AOMA San Juan ofrece múltiples beneficios: reintegros de medicamentos (30%), anteojos (40%), estadías en hoteles, kits escolares, becas y subsidios. Consultalos en "Beneficios".',
        'hotel|hoteles|estadía|vacaciones': '🏨 AOMA tiene hoteles en: Villa Carlos Paz, Mar del Plata, Buenos Aires, Villa La Angostura, Salta, Merlo, Villa Gesell y Tierra Mora. Consultá los beneficios en la sección "Beneficios".',
        'contraseña|clave|password': '🔑 Para recuperar tu contraseña, contactá al administrador al email campus@aomasanjuan.org.ar indicando tu DNI y legajo.',
        'horario|atiende|dirección': '🕐 La Seccional San Juan atiende de lunes a viernes de 8:00 a 17:00 hs. Dirección: Entre Ríos 468 (S), San Juan Capital. Tel: (0264) 422-0191. Email: accionsocialyturismo@aomaosamsanjuan.com.ar',
        'veladero|gualcamayo|vicuña': '🏭 Estas son las empresas de minería extractiva en San Juan. Cada una tiene su convenio colectivo específico. Consultalos en "Convenios CCT" → "Convenios por Empresa".',
        'default': 'No encontré información específica sobre eso. Te recomiendo revisar las secciones del menú o contactar a la Seccional al (0264) 422-0191.'
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

if (typeof window !== 'undefined') {
    window.DATA = DATA;
}

console.log('✅ Base de datos AOMA cargada');
console.log('📋 ' + Object.keys(DATA.actividades).length + ' actividades');
console.log('🏢 ' + Object.keys(DATA.empresas).length + ' empresas');
console.log('📜 ' + DATA.convenios.length + ' convenios colectivos');
console.log('🎁 ' + Object.keys(DATA.beneficios).length + ' categorías de beneficios');
console.log('🎓 ' + DATA.cursos.length + ' cursos cargados');