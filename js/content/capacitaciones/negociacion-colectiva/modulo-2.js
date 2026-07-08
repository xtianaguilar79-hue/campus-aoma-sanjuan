// ============================================
// MÓDULO 2: SUPUESTOS Y ELEMENTOS CONDICIONANTES
// Fuente: MTEySS - Programa de Apoyo a la Formación Sindical
// ============================================

const MODULO_NEGOCIACION_2 = {
    id: 'negociacion-colectiva-modulo-2',
    titulo: 'Supuestos y Elementos Condicionantes de la Negociación Colectiva',
    duracion: '2 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <h2>Supuestos de la Negociación Colectiva</h2>
            
            <p>La negociación colectiva es una instancia de diálogo para producir decisiones compartidas, una alternativa de racionalidad social, de crecimiento y de transformación.</p>
            
            <h3>Supuestos fundamentales</h3>
            
            <div class="grid-supuestos">
                <div class="supuesto-card">
                    <div class="supuesto-icon">🤝</div>
                    <h4>Reconocimiento de la legitimidad</h4>
                    <p>Reconocimiento de la legitimidad de las partes para llevar adelante el acto de negociar.</p>
                </div>
                <div class="supuesto-card">
                    <div class="supuesto-icon">🔗</div>
                    <h4>Interdependencia</h4>
                    <p>Aceptación de que ninguna de las partes puede por sí sola resolver los problemas que se plantean.</p>
                </div>
                <div class="supuesto-card">
                    <div class="supuesto-icon">⚡</div>
                    <h4>Conflicto de intereses</h4>
                    <p>Asumir el conflicto de intereses como un elemento subyacente a todo proceso de negociación.</p>
                </div>
                <div class="supuesto-card">
                    <div class="supuesto-icon">🎯</div>
                    <h4>Expectativa de acuerdo</h4>
                    <p>La expectativa latente de alcanzar un acuerdo. Esto es condición inseparable del proceso de negociación colectiva.</p>
                </div>
            </div>
            
            <div class="nota-modificacion">
                <strong>💡 Concepto clave</strong>
                <p>Más allá de que los trabajadores y los empresarios deben cooperar para llevar adelante el proceso productivo, también suelen ingresar en un proceso conflictivo, dado que unos y otros persiguen objetivos diferentes. En toda relación de trabajo subordinado existen un <strong>núcleo convergente</strong> y un <strong>núcleo divergente</strong>.</p>
            </div>
            
            <h3>Elementos condicionantes de la negociación colectiva</h3>
            
            <p>Toda negociación colectiva tiene elementos condicionantes para su desarrollo. Solo a modo de ejemplo, y de forma no taxativa, podemos citar algunos de ellos:</p>
            
            <ul>
                <li><strong>La fuerza y la unidad del Movimiento Obrero.</strong></li>
                <li><strong>La posible articulación de los Niveles Sindicales.</strong></li>
                <li><strong>La relación con las Bases</strong> (trabajadores y trabajadoras).</li>
                <li><strong>El contexto social, económico, tecnológico y político</strong> en que se desarrolla y define los resultados de la Negociación Colectiva.</li>
            </ul>
            
            <h3>La negociación en un mundo en transformación</h3>
            
            <p>Actualmente los sindicatos enfrentan situaciones nuevas y complejas que exigen respuestas adecuadas a una realidad en cambio constante. Las transformaciones continuas de los factores que inciden en las relaciones laborales dificultan estrategias de mediano y largo plazo y convierten en transitorias las situaciones adquiridas.</p>
            
            <p>La acción de los sindicatos como representantes del colectivo de los trabajadores debe necesariamente adecuarse en formas y contenidos, preservando a la vez la defensa de los derechos e intereses de los/as trabajadores/as que representan.</p>
            
            <div class="nota-modificacion">
                <strong>💡 Reflexión</strong>
                <p>¿Qué desafíos enfrenta la negociación colectiva en el contexto actual de transformaciones tecnológicas y cambios en los procesos productivos?</p>
            </div>
            
            <h3>La negociación como proceso</h3>
            
            <p>Entender la negociación como proceso implica un desplazamiento del centro de atención desde los resultados al desarrollo del proceso en sí mismo. El proceso se convierte en una directriz para la consecución de los objetivos propuestos por la organización sindical.</p>
            
            <p>Desde este punto de vista, la negociación demanda del actor sindical algo más que competencias específicas en la mesa de negociación: se debe internalizar la noción de <strong>"formación permanente"</strong>.</p>
        </div>
    `,
    
    recursos: [
        {
            titulo: 'PDF: Guía de Estrategias de Negociación',
            url: 'assets/pdf/guia-estrategias-negociacion.pdf'
        }
    ],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Cuál de los siguientes NO es un supuesto de la negociación colectiva?',
                opciones: [
                    'Reconocimiento de la legitimidad de las partes',
                    'Interdependencia entre las partes',
                    'Imposición unilateral de condiciones',
                    'Expectativa de alcanzar un acuerdo'
                ],
                correcta: 2
            },
            {
                id: 2,
                pregunta: '¿Qué implica el concepto de "interdependencia" en la negociación colectiva?',
                opciones: [
                    'Que una parte puede resolver sola los problemas',
                    'Que ninguna parte puede resolver sola los problemas',
                    'Que el Estado debe resolver todos los conflictos',
                    'Que los trabajadores dependen exclusivamente de los empresarios'
                ],
                correcta: 1
            },
            {
                id: 3,
                pregunta: '¿Qué elementos condicionan el desarrollo de la negociación colectiva?',
                opciones: [
                    'Solo el contexto económico',
                    'La fuerza del movimiento obrero, la articulación sindical y el contexto social',
                    'Exclusivamente las leyes laborales',
                    'Únicamente la voluntad del empleador'
                ],
                correcta: 1
            },
            {
                id: 4,
                pregunta: '¿Qué implica entender la negociación como un "proceso"?',
                opciones: [
                    'Centrarse solo en los resultados finales',
                    'Desplazar el centro de atención al desarrollo del proceso en sí mismo',
                    'Negociar una sola vez sin seguimiento',
                    'Ignorar la formación de los negociadores'
                ],
                correcta: 1
            },
            {
                id: 5,
                pregunta: '¿Cuál es la relación entre trabajadores y empresarios en la negociación colectiva?',
                opciones: [
                    'Siempre hay cooperación sin conflictos',
                    'Siempre hay conflicto sin cooperación',
                    'Existen un núcleo convergente y uno divergente',
                    'No existe relación entre ambas partes'
                ],
                correcta: 2
            }
        ]
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_2 = MODULO_NEGOCIACION_2;
}

console.log('✅ Módulo 2 cargado: Supuestos y Elementos Condicionantes');