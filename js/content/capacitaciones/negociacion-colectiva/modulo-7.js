// ============================================
// MÓDULO 7: DEBER DE BUENA FE Y DESARROLLO
// Fuente: MTEySS - Programa de Apoyo a la Formación Sindical
// ============================================

const MODULO_NEGOCIACION_7 = {
    id: 'negociacion-colectiva-modulo-7',
    titulo: 'Deber de Buena Fe y Desarrollo de la Negociación',
    duracion: '2 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <h2>El Deber de Negociar de Buena Fe</h2>
            
            <div class="modulo-intro">
                <p>Se negocia de buena fe cuando no se defrauda o abusa de la confianza del otro, cuando se guarda fidelidad a la palabra dada y cuando ambas partes son colaboradoras y solidarias. Esto asegura el desarrollo armonioso de las relaciones laborales.</p>
            </div>
            
            <h3>Obligaciones de las partes</h3>
            
            <div class="grid-obligaciones">
                <div class="obligacion-card">
                    <div class="obligacion-icon">🤝</div>
                    <h4>Concurrir a las reuniones</h4>
                    <p>Asistir a las reuniones acordadas o fijadas por la autoridad de aplicación.</p>
                </div>
                <div class="obligacion-card">
                    <div class="obligacion-icon">👤</div>
                    <h4>Designar negociadores con mandato suficiente</h4>
                    <p>Los negociadores deben tener la autoridad necesaria para tomar decisiones.</p>
                </div>
                <div class="obligacion-card">
                    <div class="obligacion-icon">📊</div>
                    <h4>Intercambiar información necesaria</h4>
                    <p>Incluyendo información sobre distribución de beneficios de la productividad y situación actual del empleo.</p>
                </div>
                <div class="obligacion-card">
                    <div class="obligacion-icon">🎯</div>
                    <h4>Realizar esfuerzos conducentes a lograr acuerdos</h4>
                    <p>Las partes deben buscar activamente alcanzar un acuerdo.</p>
                </div>
            </div>
            
            <h3>¿Qué constituye mala fe?</h3>
            
            <div class="cita-destacada">
                <p>Deben considerarse de mala fe aquellos actos que implican <strong>rehusarse a negociar colectivamente</strong> con la asociación sindical capacitada para hacerlo o <strong>provocar dilaciones</strong> que tiendan a obstruir el proceso de negociación.</p>
                <footer>— Artículo 53 inciso f de la Ley 23.551 (Prácticas desleales de los empleadores)</footer>
            </div>
            
            <h3>Condiciones para la OIT</h3>
            
            <p>Para la OIT es condición indispensable:</p>
            <ul>
                <li>Que ambas partes desplieguen <strong>esfuerzos auténticos y persistentes</strong> para alcanzar un acuerdo.</li>
                <li>Que las negociaciones sean <strong>constructivas</strong>.</li>
                <li>Que se <strong>eviten las demoras injustificadas</strong>.</li>
                <li>Que las condiciones del acuerdo se <strong>respeten y cumplan</strong>.</li>
            </ul>
            
            <h3>El desarrollo de las negociaciones</h3>
            
            <p>El deber de negociar impone una posición activa de las partes en el desarrollo de fórmulas eficaces en la búsqueda del acuerdo. La imperatividad de este postulado avanza en la necesidad de que el propio actor busque, una y otra vez, la manera de alcanzar el objetivo propuesto.</p>
            
            <div class="nota-modificacion">
                <strong>💡 Concepto clave</strong>
                <p>El deber de negociación en ningún caso implica la obligación de llegar a un acuerdo en primera instancia, sino que la conducta de las partes debe estar orientada a lograr un resultado positivo con miras a la formalización del acuerdo.</p>
            </div>
            
            <h3>Período de vigencia de las Convenciones Colectivas de Trabajo</h3>
            
            <p>Según el <strong>artículo 6 de la Ley 23.546</strong>, las convenciones colectivas regirán a partir de la fecha en que se dictó el acto administrativo que resuelve la homologación o el registro.</p>
            
            <div class="cita-destacada">
                <p><strong>Principio de ultraactividad:</strong> El CCT mantendrá la plena vigencia de todas sus cláusulas hasta que una nueva CCT lo sustituya, salvo que se haya convenido lo contrario.</p>
            </div>
        </div>
    `,
    
    recursos: [],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Qué implica negociar de buena fe?',
                opciones: [
                    'Imponer condiciones a la otra parte',
                    'No defraudar la confianza, guardar fidelidad a la palabra dada y ser colaborador',
                    'Evitar cualquier tipo de diálogo',
                    'Negociar solo cuando sea conveniente'
                ],
                correcta: 1
            },
            {
                id: 2,
                pregunta: '¿Qué establece el artículo 53 inciso f de la Ley 23.551?',
                opciones: [
                    'El derecho a la huelga',
                    'Que rehusarse a negociar colectivamente constituye una práctica desleal',
                    'La obligación de los trabajadores de aceptar cualquier oferta',
                    'La creación de las comisiones paritarias'
                ],
                correcta: 1
            },
            {
                id: 3,
                pregunta: '¿Cuáles son las condiciones que exige la OIT para la negociación colectiva?',
                opciones: [
                    'Esfuerzos auténticos y persistentes, negociaciones constructivas, evitar demoras injustificadas y cumplir los acuerdos',
                    'Solo la firma de un acuerdo',
                    'La intervención del Estado en todo momento',
                    'La aprobación del Congreso'
                ],
                correcta: 0
            },
            {
                id: 4,
                pregunta: '¿Qué es el principio de ultraactividad?',
                opciones: [
                    'Que el CCT pierde vigencia al vencimiento del plazo',
                    'Que el CCT mantiene plena vigencia hasta que una nueva CCT lo sustituya',
                    'Que el CCT solo es válido por 2 años',
                    'Que el CCT debe ser renovado cada año'
                ],
                correcta: 1
            },
            {
                id: 5,
                pregunta: '¿Qué implica el deber de negociación en cuanto a la búsqueda de acuerdos?',
                opciones: [
                    'Obligación de llegar a un acuerdo en la primera reunión',
                    'Orientación a lograr un resultado positivo sin obligación de acuerdo inmediato',
                    'No negociar si no hay certeza de acuerdo',
                    'Delegar la negociación en el Estado'
                ],
                correcta: 1
            }
        ]
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_7 = MODULO_NEGOCIACION_7;
}

console.log('✅ Módulo 7 cargado: Deber de Buena Fe y Desarrollo');