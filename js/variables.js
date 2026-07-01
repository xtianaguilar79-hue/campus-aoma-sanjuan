// Configuración global de la aplicación
const CONFIG = {
    appName: 'Campus Virtual AOMA',
    version: '2.0.0',
    storageKeys: {
        users: 'aoma_users',
        session: 'aoma_session',
        theme: 'aoma_theme',
        courses: 'aoma_courses',
        videos: 'aoma_videos',
        evaluations: 'aoma_evaluations',
        certificates: 'aoma_certificates',
        news: 'aoma_news',
        chatHistory: 'aoma_chat_history'
    },
    defaultUsers: [
        {
            id: 1,
            username: 'admin',
            password: 'admin',
            name: 'Administrador',
            email: 'admin@aoma.org.ar',
            role: 'admin',
            avatar: null,
            active: true,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            username: 'delegado',
            password: '1234',
            name: 'Juan Carlos Delegado',
            email: 'delegado@aoma.org.ar',
            role: 'delegado',
            avatar: null,
            active: true,
            department: 'Cemento',
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            username: 'dirigente',
            password: '1234',
            name: 'María Fernanda Dirigente',
            email: 'dirigente@aoma.org.ar',
            role: 'dirigente',
            avatar: null,
            active: true,
            department: 'Metalífera',
            createdAt: new Date().toISOString()
        }
    ],
    activities: {
        metalifera: {
            id: 'metalifera',
            name: 'Minería Metalífera',
            icon: 'fa-gem',
            color: '#f59e0b',
            image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
            description: 'Extracción de metales preciosos y base'
        },
        cemento: {
            id: 'cemento',
            name: 'Cemento',
            icon: 'fa-industry',
            color: '#64748b',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
            description: 'Producción de cemento y derivados'
        },
        cal: {
            id: 'cal',
            name: 'Cal',
            icon: 'fa-circle',
            color: '#e5e7eb',
            image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=800&q=80',
            description: 'Producción de cal y derivados'
        },
        piedra: {
            id: 'piedra',
            name: 'Piedra',
            icon: 'fa-cube',
            color: '#78716c',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
            description: 'Explotación de canteras y áridos'
        },
        molienda: {
            id: 'molienda',
            name: 'Molienda',
            icon: 'fa-cogs',
            color: '#475569',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
            description: 'Procesamiento y molienda de minerales'
        }
    },
    courses: [
        {
            id: 1,
            title: 'Seguridad Minera Básica',
            category: 'Seguridad',
            activity: 'general',
            instructor: 'Ing. Roberto Sánchez',
            duration: '8 horas',
            level: 'Básico',
            image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
            description: 'Curso obligatorio sobre normas de seguridad en minería',
            modules: 5,
            enrolled: 156,
            rating: 4.8
        },
        {
            id: 2,
            title: 'Liderazgo Sindical',
            category: 'Gremial',
            activity: 'general',
            instructor: 'Lic. Ana Martínez',
            duration: '12 horas',
            level: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
            description: 'Herramientas de negociación y representación gremial',
            modules: 6,
            enrolled: 89,
            rating: 4.9
        },
        {
            id: 3,
            title: 'Operación de Camiones CAEX',
            category: 'Operativa',
            activity: 'metalifera',
            instructor: 'Téc. Carlos Gómez',
            duration: '16 horas',
            level: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1605218427306-022ba6c5545f?w=600&q=80',
            description: 'Certificación para operación de camiones de extracción',
            modules: 8,
            enrolled: 45,
            rating: 4.7
        },
        {
            id: 4,
            title: 'Proceso de Producción de Cemento',
            category: 'Técnico',
            activity: 'cemento',
            instructor: 'Ing. Luis Fernández',
            duration: '10 horas',
            level: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c9858?w=600&q=80',
            description: 'Conocimiento del proceso productivo del cemento',
            modules: 5,
            enrolled: 67,
            rating: 4.6
        },
        {
            id: 5,
            title: 'Legislación Laboral Minera',
            category: 'Legal',
            activity: 'general',
            instructor: 'Dr. Pedro Rodríguez',
            duration: '6 horas',
            level: 'Básico',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
            description: 'Marco legal y convenios colectivos del sector minero',
            modules: 4,
            enrolled: 134,
            rating: 4.5
        },
        {
            id: 6,
            title: 'Primeros Auxilios en Mina',
            category: 'Seguridad',
            activity: 'general',
            instructor: 'Dra. Laura Pérez',
            duration: '8 horas',
            level: 'Básico',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
            description: 'Atención de emergencias y primeros auxilios',
            modules: 5,
            enrolled: 198,
            rating: 4.9
        }
    ],
    videos: [
        {
            id: 1,
            title: 'Seguridad en Minería Subterránea',
            category: 'metalifera',
            youtubeId: 'dQw4w9WgXcQ',
            duration: '45:20',
            thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80',
            views: 1234,
            uploadedAt: '2024-01-15'
        },
        {
            id: 2,
            title: 'Charla: Convenio Colectivo Minero 2024',
            category: 'general',
            youtubeId: 'dQw4w9WgXcQ',
            duration: '1:12:30',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
            views: 856,
            uploadedAt: '2024-02-20'
        },
        {
            id: 3,
            title: 'Operación de Molino SAG',
            category: 'molienda',
            youtubeId: 'dQw4w9WgXcQ',
            duration: '32:15',
            thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
            views: 543,
            uploadedAt: '2024-03-10'
        }
    ],
    evaluations: [
        {
            id: 1,
            courseId: 1,
            title: 'Evaluación Seguridad Minera',
            timeLimit: 30,
            passingScore: 70,
            questions: [
                {
                    id: 1,
                    text: '¿Cuál es el EPP básico obligatorio en mina?',
                    type: 'multiple',
                    options: [
                        'Solo casco',
                        'Casco, linterna y botas de seguridad',
                        'Zapatos comunes',
                        'Guantes y lentes'
                    ],
                    correct: 1
                },
                {
                    id: 2,
                    text: '¿Qué hacer ante una emergencia en mina?',
                    type: 'multiple',
                    options: [
                        'Salir corriendo',
                        'Seguir el plan de evacuación',
                        'Esperar instrucciones',
                        'Llamar a un familiar'
                    ],
                    correct: 1
                }
            ]
        }
    ],
    salaryScales: {
        cemento: [
            { category: 'Operario de Planta', level: 'A', salary: 850000 },
            { category: 'Operario Especializado', level: 'B', salary: 980000 },
            { category: 'Oficial 1°', level: 'C', salary: 1120000 },
            { category: 'Oficial Maestro', level: 'D', salary: 1350000 },
            { category: 'Técnico', level: 'E', salary: 1480000 },
            { category: 'Delegado', level: 'F', salary: 1620000 }
        ],
        metalifera: [
            { category: 'Operario de Mina', level: 'A', salary: 1100000 },
            { category: 'Operario Especializado', level: 'B', salary: 1350000 },
            { category: 'Oficial Minero', level: 'C', salary: 1580000 },
            { category: 'Maestro Minero', level: 'D', salary: 1850000 },
            { category: 'Técnico Minero', level: 'E', salary: 2100000 }
        ]
    },
    faqs: {
        general: [
            {
                question: '¿Cómo me inscribo a una capacitación?',
                answer: 'Ingresá a la sección "Capacitaciones", seleccioná el curso deseado y hacé clic en "Inscribirme". Recibirás un email de confirmación.'
            },
            {
                question: '¿Los cursos tienen certificación?',
                answer: 'Sí, al completar la capacitación y aprobar la evaluación correspondiente, recibirás un certificado digital con validez gremial.'
            }
        ],
        cemento: [
            {
                question: '¿Cuál es el adicional por zona en cemento?',
                answer: 'El adicional por zona varía según el establecimiento. Consultá la escala vigente en la sección "Escalas salariales".'
            }
        ]
    },
    news: [
        {
            id: 1,
            title: 'Paritaria 2024: Acuerdo histórico para el sector minero',
            category: 'Paritarias',
            excerpt: 'Se alcanzó un acuerdo que incluye aumentos salariales y mejoras en las condiciones laborales.',
            content: 'Lorem ipsum dolor sit amet...',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
            author: 'Secretaría Gremial',
            date: '2024-01-15',
            featured: true
        }
    ],
    chatResponses: {
        'hola|buenas|buenos dias': '¡Hola! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?',
        'escala|salarial|sueldo': 'Podés consultar las escalas salariales actualizadas en el menú lateral → "💰 Escalas Salariales". Están separadas por actividad.',
        'capacitacion|curso': 'Para inscribirte, ingresá a "🎓 Capacitaciones" y hacé clic en "Inscribirme". También podés ver cursos por actividad.',
        'contraseña|clave': 'Para recuperar tu contraseña, contactá al administrador al email campus@aomasanjuan.org.ar',
        'gracias': '¡De nada! 😊 Si tenés más consultas, no dudes en escribirme.',
        'default': 'No tengo una respuesta específica para eso. Te recomiendo contactar a la Seccional al (0264) 422-XXXX o escribir a campus@aomasanjuan.org.ar'
    }
};

// Utilidades globales
const Utils = {
    generateId: () => '_' + Math.random().toString(36).substr(2, 9),
    
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    escapeHtml: (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    downloadFile: (content, filename, type) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },
    
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            app.showToast('Copiado al portapapeles', 'success');
        });
    }
};