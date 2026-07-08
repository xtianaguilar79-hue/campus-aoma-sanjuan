// ============================================
// MÓDULO 1: ¿QUÉ ES LA NEGOCIACIÓN COLECTIVA?
// Fuente: MTEySS - Programa de Apoyo a la Formación Sindical
// ============================================

const MODULO_NEGOCIACION_1 = {
    id: 'negociacion-colectiva-modulo-1',
    titulo: '¿Qué es la Negociación Colectiva?',
    duracion: '2 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <h2>¿Qué es la Negociación Colectiva?</h2>
            
            <div class="modulo-intro">
                <p>En las sociedades democráticas la negociación colectiva constituye una pieza clave del sistema social. Su vigencia y las prácticas que suscita concretan modalidades relativamente estables de institucionalización de los conflictos laborales, posibilitan un marco consensuado de gestión de lo social y generan normas contractuales capaces de articular maduramente intereses sectoriales en pugna, con el objetivo de mantener y desarrollar la Paz Social.</p>
            </div>
            
            <h3>Definición de la OIT</h3>
            <div class="cita-destacada">
                <p>"La negociación colectiva comprende todas las negociaciones que tienen lugar entre un Empleador, un grupo de Empleadores, una Organización o varias organizaciones de Empleadores, por una parte, y una Organización o varias Organizaciones de trabajadores por otra, con el fin de fijar condiciones de trabajo y empleo; o regular las relaciones entre Empleadores o sus Organizaciones y una Organización o varias organizaciones de trabajadores, o lograr todos esos fines a la vez."</p>
                <footer>— Convenio 154 de la OIT sobre el fomento de la Negociación Colectiva, 1981</footer>
            </div>
            
            <h3>Derecho reconocido por la Constitución Nacional</h3>
            <p>El derecho a negociar convenios colectivos de trabajo es un derecho que la Constitución Nacional reconoce a los "gremios". El <strong>artículo 14 bis</strong> de la Constitución Nacional establece expresamente:</p>
            
            <div class="cita-destacada constitucion">
                <p><strong>Artículo 14 bis</strong> — El trabajo en sus diversas formas gozará de la protección de las leyes, las que asegurarán al trabajador: condiciones dignas y equitativas de labor, jornada limitada; descanso y vacaciones pagados; retribución justa; salario mínimo vital móvil; igual remuneración por igual tarea; participación en las ganancias de las empresas, con control de la producción y colaboración en la dirección; protección contra el despido arbitrario; estabilidad del empleado público; organización sindical libre y democrática, reconocida por la simple inscripción en un registro especial. <strong>Queda garantizado a los gremios: concertar convenios colectivos de trabajo; recurrir a la conciliación y al arbitraje; el derecho de huelga.</strong></p>
            </div>
            
            <h3>Instrumentos Internacionales ratificados por Argentina</h3>
            <p>Argentina ha ratificado los principales convenios de la OIT en materia de libertad sindical y negociación colectiva, que tienen a nivel local jerarquía superior a las leyes:</p>
            <ul>
                <li><strong>Convenio 98</strong> — Sobre el derecho de sindicación y de negociación colectiva</li>
                <li><strong>Convenio 151</strong> — Sobre las relaciones de trabajo en la administración pública</li>
                <li><strong>Convenio 154</strong> — Sobre el fomento de la negociación colectiva</li>
                <li><strong>Recomendación 91</strong> — Sobre los contratos colectivos</li>
            </ul>
            
            <h3>Hito histórico: Ley 14.250</h3>
            <p>La sanción de la <strong>Ley 14.250</strong> en Argentina en el año 1953 constituyó un hito en el proceso de las negociaciones colectivas, estableciendo el marco legal para la celebración de convenios colectivos de trabajo.</p>
            
            <h3>Concepto amplio de Negociación Colectiva</h3>
            <ul>
                <li><strong>Como método:</strong> Reglamentación de conflictos y sus resultados inmediatos.</li>
                <li><strong>Como proceso:</strong> Diálogo, acercamiento e intercambio, con la finalidad de arribar a un acuerdo.</li>
                <li><strong>Como mecanismo:</strong> Consulta y examen bipartito y/o tripartito sobre tendencias y evolución de la economía.</li>
            </ul>
            
            <h3>En sentido amplio</h3>
            <p>Podemos concebirla como un mecanismo de consulta y examen bipartito y/o tripartito sobre tendencias y evolución de la economía.</p>
            
            <h3>En sentido más restringido</h3>
            <p>Se pone atención en la negociación colectiva como una actividad específica. En este sentido, interesa analizar el propio proceso de la negociación, entendiendo que influye en la conformación y conducta de los actores en cuestión.</p>
            
            <div class="nota-modificacion">
                <strong>💡 Reflexión</strong>
                <p>¿Cómo impacta la negociación colectiva en la vida concreta de los trabajadores y las trabajadoras? ¿De qué manera influye en las condiciones de empleo y de trabajo en el sector minero?</p>
            </div>
        </div>
    `,
    
    recursos: [
        {
            titulo: 'PDF: Guía de Negociación Colectiva',
            url: 'assets/pdf/guia-negociacion-colectiva.pdf'
        },
        {
            titulo: 'Convenio 154 OIT (texto completo)',
            url: 'https://www.ilo.org/dyn/normlex/es/f?p=NORMLEXPUB:12100:0::NO::P12100_ILO_CODE:C154'
        }
    ],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Cuál es la definición de negociación colectiva según la OIT?',
                opciones: [
                    'Un proceso unilateral donde el empleador impone condiciones',
                    'Un proceso de diálogo entre trabajadores y empleadores para fijar condiciones de trabajo y empleo',
                    'Un acto administrativo del Ministerio de Trabajo',
                    'Un derecho exclusivo de los empresarios'
                ],
                correcta: 1
            },
            {
                id: 2,
                pregunta: '¿Qué artículo de la Constitución Nacional garantiza el derecho a concertar convenios colectivos de trabajo?',
                opciones: [
                    'Artículo 14',
                    'Artículo 14 bis',
                    'Artículo 75',
                    'Artículo 31'
                ],
                correcta: 1
            },
            {
                id: 3,
                pregunta: '¿Qué ley constituyó un hito en el proceso de negociaciones colectivas en Argentina?',
                opciones: [
                    'Ley 20.744 (LCT)',
                    'Ley 23.551 (Asociaciones Sindicales)',
                    'Ley 14.250',
                    'Ley 24.557 (LRT)'
                ],
                correcta: 2
            },
            {
                id: 4,
                pregunta: '¿Cuáles son los convenios de la OIT ratificados por Argentina en materia de negociación colectiva?',
                opciones: [
                    'Convenio 87 y 98',
                    'Convenio 98, 151 y 154',
                    'Convenio 154 solamente',
                    'Convenio 87, 98, 151 y 154'
                ],
                correcta: 3
            },
            {
                id: 5,
                pregunta: '¿Qué función cumple la negociación colectiva en las sociedades democráticas?',
                opciones: [
                    'Generar conflicto entre las partes',
                    'Institucionalizar los conflictos laborales y generar normas contractuales',
                    'Eliminar la participación de los trabajadores',
                    'Reducir los salarios'
                ],
                correcta: 1
            }
        ]
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_1 = MODULO_NEGOCIACION_1;
}

console.log('✅ Módulo 1 cargado: ¿Qué es la Negociación Colectiva?');