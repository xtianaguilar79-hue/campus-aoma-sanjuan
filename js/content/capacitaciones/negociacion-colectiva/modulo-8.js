// ============================================
// MÓDULO 8: ROL DEL SINDICATO Y CONCLUSIONES
// Fuente: MTEySS - Programa de Apoyo a la Formación Sindical
// ============================================

const MODULO_NEGOCIACION_8 = {
    id: 'negociacion-colectiva-modulo-8',
    titulo: 'Rol del Sindicato y Conclusiones',
    duracion: '2 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <h2>Rol del Sindicato en la Negociación Colectiva</h2>
            
            <div class="modulo-intro">
                <p>La negociación colectiva enfrenta el desafío de adaptarse a nuevos contextos que se presentan en el nivel global: difusión de contratos precarios, reconfiguración de actividades, cambios en los perfiles de los trabajadores, trabajo a tiempo parcial y ocasional, nuevas tecnologías, subcontratación.</p>
            </div>
            
            <h3>Desafíos actuales</h3>
            
            <div class="grid-desafios">
                <div class="desafio-card">
                    <div class="desafio-icon">📉</div>
                    <h4>Contratos precarios</h4>
                    <p>Difusión de contratos precarios que debilitan la protección de los trabajadores.</p>
                </div>
                <div class="desafio-card">
                    <div class="desafio-icon">🔄</div>
                    <h4>Reconfiguración de actividades</h4>
                    <p>Cambios en los perfiles de los trabajadores y en las formas de organización del trabajo.</p>
                </div>
                <div class="desafio-card">
                    <div class="desafio-icon">💻</div>
                    <h4>Nuevas tecnologías</h4>
                    <p>Impacto de la tecnología en los procesos productivos y en la gestión de la fuerza de trabajo.</p>
                </div>
                <div class="desafio-card">
                    <div class="desafio-icon">📄</div>
                    <h4>Subcontratación</h4>
                    <p>Aumento de la subcontratación y tercerización de servicios.</p>
                </div>
            </div>
            
            <h3>Rol fundamental del Sindicato</h3>
            
            <p>Estos cambios podrían implicar una individualización de las relaciones laborales si no van acompañados por asociaciones sindicales que profundicen sus alcances de la negociación colectiva.</p>
            
            <h3>Técnicas y habilidades para la negociación</h3>
            
            <ul>
                <li><strong>Definir términos y condiciones</strong> para negociar.</li>
                <li><strong>Consensuar temas</strong> y necesidades en torno a requerir asesoramiento sobre una materia a negociar.</li>
                <li><strong>Definir las estrategias y metodologías</strong> adecuadas para cada proceso de negociación.</li>
            </ul>
            
            <h3>Acciones del fortalecimiento sindical</h3>
            
            <div class="grid-acciones">
                <div class="accion-card">
                    <div class="accion-icon">🎯</div>
                    <h4>Asumir la identidad</h4>
                    <p>Frente a las nuevas formas de expresión del conflicto.</p>
                </div>
                <div class="accion-card">
                    <div class="accion-icon">🔄</div>
                    <h4>Aceptar la interrelación</h4>
                    <p>Conflicto y negociación no son antagónicos, se interrelacionan y exigen propuestas superadoras.</p>
                </div>
                <div class="accion-card">
                    <div class="accion-icon">📋</div>
                    <h4>Diseñar estrategias</h4>
                    <p>Que asuman la existencia de intereses discordantes y comunes.</p>
                </div>
                <div class="accion-card">
                    <div class="accion-icon">🏗️</div>
                    <h4>Generar estructura propia</h4>
                    <p>Abierta a la participación interna, a la formación permanente de dirigentes, delegados y trabajadores.</p>
                </div>
            </div>
            
            <h3>Conclusión</h3>
            
            <div class="conclusion-destacada">
                <p>El contexto social, económico, político y cultural nos exige impulsar y controlar el proceso de negociación colectiva. Necesitamos:</p>
                <ul>
                    <li>Brindar respuestas a viejas y nuevas problemáticas.</li>
                    <li>Atender a la crisis del mercado de trabajo que continúa amenazando con barrer las certidumbres.</li>
                    <li>Recuperar nuestra propia y rica experiencia en la resolución de los problemas.</li>
                </ul>
            </div>
            
            <h3>Llamado a la acción</h3>
            
            <p>Estas necesidades nos tienen que motivar a dar inicio a acciones permanentes que contribuyan a la fecunda construcción de espacios que incentiven:</p>
            
            <ul>
                <li><strong>El fomento de la negociación</strong> como elemento esencial de la acción sindical.</li>
                <li><strong>El desarrollo de la negociación colectiva</strong> a nivel de actividad o rama, vinculada con la realidad de las empresas.</li>
                <li><strong>El diseño y la preparación de la negociación</strong> como un proceso continuo.</li>
                <li><strong>La realización de estudios técnicos</strong> pertinentes que respalden el conjunto de las reivindicaciones laborales.</li>
            </ul>
            
            <div class="nota-modificacion">
                <strong>💡 Reflexión final</strong>
                <p>¿Cómo podemos fortalecer la negociación colectiva en el sector minero de San Juan? ¿Qué estrategias específicas puede implementar AOMA para mejorar las condiciones de trabajo y empleo de sus afiliados?</p>
            </div>
        </div>
    `,
    
    recursos: [
        {
            titulo: 'Bibliografía recomendada',
            url: 'assets/pdf/bibliografia-negociacion.pdf'
        }
    ],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Cuáles son los desafíos actuales que enfrenta la negociación colectiva?',
                opciones: [
                    'Solo el aumento de salarios',
                    'Contratos precarios, reconfiguración de actividades, nuevas tecnologías y subcontratación',
                    'Solo la falta de leyes laborales',
                    'La disminución de la población trabajadora'
                ],
                correcta: 1
            },
            {
                id: 2,
                pregunta: '¿Qué riesgo implica la falta de acción sindical frente a los cambios actuales?',
                opciones: [
                    'El fortalecimiento de la negociación colectiva',
                    'La individualización de las relaciones laborales',
                    'El aumento de los salarios',
                    'La mejora de las condiciones de trabajo'
                ],
                correcta: 1
            },
            {
                id: 3,
                pregunta: '¿Qué aspectos debe incluir una estrategia de fortalecimiento sindical?',
                opciones: [
                    'Solo la recaudación de cuotas',
                    'Asumir la identidad, aceptar la interrelación, diseñar estrategias y generar estructura propia',
                    'Solo la organización de eventos sociales',
                    'La oposición a cualquier cambio'
                ],
                correcta: 1
            },
            {
                id: 4,
                pregunta: '¿Qué debe motivar a los sindicatos a impulsar acciones permanentes?',
                opciones: [
                    'La necesidad de responder a viejas y nuevas problemáticas y la crisis del mercado de trabajo',
                    'La obligación legal de hacerlo',
                    'La presión de los empleadores',
                    'La disminución de los afiliados'
                ],
                correcta: 0
            },
            {
                id: 5,
                pregunta: '¿Qué significa "profundizar los alcances de la negociación colectiva"?',
                opciones: [
                    'Mantener las mismas prácticas de negociación',
                    'Ampliar el ámbito de temas que se negocian y mejorar la calidad del proceso',
                    'Reducir la cantidad de negociaciones',
                    'Excluir a ciertos trabajadores de la negociación'
                ],
                correcta: 1
            }
        ]
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_8 = MODULO_NEGOCIACION_8;
}

console.log('✅ Módulo 8 cargado: Rol del Sindicato y Conclusiones');
console.log('🎓 Capacitación completa: Introducción a la Negociación Colectiva');