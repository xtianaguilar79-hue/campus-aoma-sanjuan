// ============================================
// MÓDULO 5: EL CONVENIO COLECTIVO DE TRABAJO (CCT)
// Fuente: MTEySS - Programa de Apoyo a la Formación Sindical
// ============================================

const MODULO_NEGOCIACION_5 = {
    id: 'negociacion-colectiva-modulo-5',
    titulo: 'El Convenio Colectivo de Trabajo (CCT)',
    duracion: '2 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <h2>El Convenio Colectivo de Trabajo (CCT)</h2>
            
            <div class="modulo-intro">
                <p>El CCT es una fuente autónoma del derecho del trabajo, que además establece una de las particularidades de esta rama del derecho: la posibilidad de que las partes creen sus propias normas.</p>
            </div>
            
            <h3>¿Qué es el Convenio Colectivo de Trabajo?</h3>
            
            <p>El CCT surge a partir de un acuerdo tendiente a establecer condiciones laborales entre una asociación sindical de trabajadores (con personería gremial) y un empleador, un grupo de empleadores o una organización representativa de los empleadores de una misma actividad (cámaras o federaciones).</p>
            
            <h3>Tipos de acuerdos</h3>
            
            <table class="tabla-tipos">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Acuerdos Colectivos</strong></td>
                        <td>Se remiten exclusivamente a la determinación de cláusulas salariales y eventualmente sindicales (generalmente relacionadas con cuestiones particulares de las empresas).</td>
                    </tr>
                    <tr>
                        <td><strong>Convenios Colectivos</strong></td>
                        <td>Tratan sobre temas más amplios, como la jornada de trabajo y los descansos, el establecimiento de nuevas categorías en una actividad o sobre problemáticas.</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Contenido obligatorio del CCT (Ley 14.250)</h3>
            
            <p>La Ley 14.250 establece que las convenciones colectivas de trabajo obligatoriamente se deben celebrar por escrito y deben consignar:</p>
            
            <ul>
                <li><strong>a)</strong> Lugar y fecha de su celebración.</li>
                <li><strong>b)</strong> El nombre de los intervinientes y acreditación de sus personerías.</li>
                <li><strong>c)</strong> Las actividades y las categorías de trabajadores a que se refieren.</li>
                <li><strong>d)</strong> La zona de aplicación.</li>
                <li><strong>e)</strong> El período de vigencia.</li>
                <li><strong>f)</strong> Las materias objeto de la negociación.</li>
            </ul>
            
            <h3>Proceso de homologación</h3>
            
            <div class="proceso-homologacion">
                <div class="paso">
                    <div class="paso-numero">1</div>
                    <div class="paso-contenido">
                        <h4>Celebración del acuerdo</h4>
                        <p>Las partes llegan a un acuerdo y firman el convenio.</p>
                    </div>
                </div>
                <div class="paso">
                    <div class="paso-numero">2</div>
                    <div class="paso-contenido">
                        <h4>Presentación al MTEySS</h4>
                        <p>El convenio es presentado ante el Ministerio de Trabajo para su homologación.</p>
                    </div>
                </div>
                <div class="paso">
                    <div class="paso-numero">3</div>
                    <div class="paso-contenido">
                        <h4>Controles</h4>
                        <p>El MTEySS realiza tres controles: Legalidad, Formalidad y Oportunidad.</p>
                    </div>
                </div>
                <div class="paso">
                    <div class="paso-numero">4</div>
                    <div class="paso-contenido">
                        <h4>Homologación</h4>
                        <p>El Ministerio homologa el convenio mediante acto administrativo.</p>
                    </div>
                </div>
                <div class="paso">
                    <div class="paso-numero">5</div>
                    <div class="paso-contenido">
                        <h4>Publicación</h4>
                        <p>El convenio es publicado en el Boletín Oficial.</p>
                    </div>
                </div>
            </div>
            
            <h3>Obligatoriedad del acuerdo</h3>
            
            <p>Una vez homologado, el CCT es de cumplimiento obligatorio para las partes y para todos los trabajadores y empleadores comprendidos en su ámbito de aplicación.</p>
            
            <div class="nota-modificacion">
                <strong>💡 Importante</strong>
                <p>El CCT es una norma autónoma creada por los propios actores sociales, pero que una vez homologada adquiere fuerza de ley para el sector o actividad que regula.</p>
            </div>
            
            <h3>Ámbitos del Convenio Colectivo</h3>
            
            <ul>
                <li><strong>Convenio nacional, regional o de otro ámbito territorial.</strong></li>
                <li><strong>Convenio intersectorial o marco.</strong></li>
                <li><strong>Convenio de actividad.</strong></li>
                <li><strong>Convenio de profesión, oficio o categoría.</strong></li>
                <li><strong>Convenio de empresa o grupo de empresas.</strong></li>
            </ul>
        </div>
    `,
    
    recursos: [
        {
            titulo: 'Modelo de Convenio Colectivo de Trabajo',
            url: 'assets/pdf/modelo-cct.pdf'
        }
    ],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Qué es un Convenio Colectivo de Trabajo (CCT)?',
                opciones: [
                    'Un acuerdo unilateral del empleador',
                    'Un acuerdo entre una asociación sindical y un empleador para establecer condiciones laborales',
                    'Una ley dictada por el Congreso',
                    'Un decreto del Poder Ejecutivo'
                ],
                correcta: 1
            },
            {
                id: 2,
                pregunta: '¿Qué diferencia a un "Acuerdo Colectivo" de un "Convenio Colectivo"?',
                opciones: [
                    'No hay diferencia, son lo mismo',
                    'El Acuerdo es solo salarial, el Convenio abarca temas más amplios',
                    'El Convenio es solo salarial, el Acuerdo abarca temas más amplios',
                    'El Acuerdo es más importante que el Convenio'
                ],
                correcta: 1
            },
            {
                id: 3,
                pregunta: '¿Quién realiza la homologación del CCT?',
                opciones: [
                    'El Poder Judicial',
                    'El Ministerio de Trabajo, Empleo y Seguridad Social',
                    'El Congreso de la Nación',
                    'La Corte Suprema'
                ],
                correcta: 1
            },
            {
                id: 4,
                pregunta: '¿Cuáles son los controles que realiza el MTEySS antes de homologar un CCT?',
                opciones: [
                    'Solo control de legalidad',
                    'Legalidad, Formalidad y Oportunidad',
                    'Solo control de oportunidad',
                    'Control de constitucionalidad'
                ],
                correcta: 1
            },
            {
                id: 5,
                pregunta: '¿Qué ocurre una vez que un CCT es homologado?',
                opciones: [
                    'Pierde vigencia inmediatamente',
                    'Es de cumplimiento obligatorio para las partes y se publica en el Boletín Oficial',
                    'Solo es obligatorio para los trabajadores',
                    'Debe ser aprobado por el Congreso'
                ],
                correcta: 1
            }
        ]
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_5 = MODULO_NEGOCIACION_5;
}

console.log('✅ Módulo 5 cargado: El Convenio Colectivo de Trabajo (CCT)');