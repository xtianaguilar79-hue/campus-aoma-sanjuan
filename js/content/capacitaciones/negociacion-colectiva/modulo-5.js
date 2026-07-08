// ============================================
// MÓDULO 5: EL CONVENIO COLECTIVO DE TRABAJO (CCT)
// ============================================

const MODULO_NEGOCIACION_5 = {
    id: 'negociacion-colectiva-modulo-5',
    titulo: 'El Convenio Colectivo de Trabajo (CCT) en Profundidad',
    duracion: '3 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <header class="modulo-header-academico">
                <div class="modulo-badge">Módulo 5</div>
                <h1>El Convenio Colectivo de Trabajo (CCT) en Profundidad</h1>
                <p class="modulo-subtitulo">La norma creada por el diálogo social</p>
                <div class="modulo-meta-academico">
                    <span><i class="fas fa-file-signature"></i> Estructura y contenido</span>
                    <span><i class="fas fa-check-double"></i> Homologación y registro</span>
                    <span><i class="fas fa-building"></i> Casos: Veladero y Vicuña</span>
                </div>
            </header>

            <section class="modulo-intro-academico">
                <h2>Introducción</h2>
                <p>El Convenio Colectivo de Trabajo (CCT) es la manifestación más acabada de la negociación colectiva. Es un acuerdo normativo que, una vez homologado, adquiere fuerza de ley para las partes y para todos los trabajadores y empleadores comprendidos en su ámbito de aplicación. Su estudio es esencial para comprender cómo se regulan las condiciones de trabajo en el sector minero y en el resto de la economía.</p>
            </section>

            <section class="modulo-objetivos">
                <h2>Objetivos de Aprendizaje</h2>
                <ul>
                    <li><i class="fas fa-check-circle"></i> Definir qué es un CCT y cuáles son sus elementos esenciales.</li>
                    <li><i class="fas fa-check-circle"></i> Conocer la estructura típica de un CCT (partes, cláusulas, anexos).</li>
                    <li><i class="fas fa-check-circle"></i> Comprender el proceso de homologación y registro.</li>
                    <li><i class="fas fa-check-circle"></i> Analizar casos concretos: CCT 673/04 (Veladero) y CCT Vicuña (Deprominsa).</li>
                </ul>
            </section>

            <section class="modulo-desarrollo">
                <h2>1. Definición y Naturaleza Jurídica</h2>
                <p>El CCT es un <strong>contrato normativo</strong> (también llamado "norma autónoma") que establece condiciones de trabajo para una actividad, categoría o empresa. Tiene las siguientes características:</p>
                <ul>
                    <li><strong>Es bilateral:</strong> Acordado entre sindicatos y empleadores.</li>
                    <li><strong>Es de cumplimiento obligatorio:</strong> Para las partes y para los terceros comprendidos en su ámbito.</li>
                    <li><strong>Es de naturaleza normativa:</strong> Crea reglas de conducta con fuerza vinculante.</li>
                    <li><strong>Es un contrato colectivo:</strong> No es un contrato individual, sino un acuerdo de alcance colectivo.</li>
                </ul>

                <h2>2. Estructura del CCT</h2>
                <p>Un CCT típico incluye las siguientes partes:</p>
                <ul>
                    <li><strong>Partes intervinientes:</strong> Identificación del sindicato y del empleador o cámara empresaria.</li>
                    <li><strong>Ámbito de aplicación:</strong> Personal (categorías de trabajadores) y territorial (zonas geográficas).</li>
                    <li><strong>Cláusulas generales:</strong> Objeto, vigencia, condiciones de trabajo, remuneraciones.</li>
                    <li><strong>Cláusulas específicas:</strong> Jornada, descansos, horas extras, vacaciones, licencias.</li>
                    <li><strong>Cláusulas de seguridad social:</strong> Aportes, contribuciones, cobertura de salud.</li>
                    <li><strong>Cláusulas sindicales:</strong> Crédito de horas, comisiones paritarias, estabilidad gremial.</li>
                    <li><strong>Disposiciones finales:</strong> Duración, forma de renovación, procedimiento de denuncia.</li>
                    <li><strong>Anexos:</strong> Escalas salariales, tablas de categorías, beneficios adicionales.</li>
                </ul>

                <h2>3. El Proceso de Homologación</h2>
                <p>La homologación es el acto administrativo mediante el cual el Ministerio de Trabajo, Empleo y Seguridad Social otorga validez al CCT. El proceso es el siguiente:</p>
                <ol>
                    <li><strong>Negociación:</strong> Las partes alcanzan un acuerdo y redactan el texto del convenio.</li>
                    <li><strong>Presentación:</strong> El convenio es presentado ante el MTEySS para su homologación.</li>
                    <li><strong>Control:</strong> El Ministerio realiza tres controles: legalidad, formalidad y oportunidad.</li>
                    <li><strong>Homologación:</strong> Si todo es correcto, el Ministerio homologa el convenio mediante resolución.</li>
                    <li><strong>Registro:</strong> El convenio se inscribe en el Registro de Convenios Colectivos de Trabajo.</li>
                    <li><strong>Publicación:</strong> El convenio se publica en el Boletín Oficial.</li>
                </ol>
                <p>La homologación da al CCT la fuerza de ley y lo hace oponible a terceros.</p>

                <h2>4. Caso Práctico: CCT 673/04 (Barrick-Veladero)</h2>
                <p>El CCT 673/04 es un ejemplo de convenio de empresa que ha sido pionero en la minería argentina. Sus características principales son:</p>
                <ul>
                    <li><strong>Categorías profesionales:</strong> Clasificación detallada por áreas (Operaciones, Mantenimiento, Procesos, Servicios Técnicos, Almacenes, Medio Ambiente).</li>
                    <li><strong>Remuneraciones:</strong> Básico por categoría, adicional presentismo (15%), asignación por zona (20%), bonos de producción (8%).</li>
                    <li><strong>Jornada:</strong> Régimen 14x14 (14 días de trabajo y 14 de descanso).</li>
                    <li><strong>Beneficios sociales:</strong> Ayuda escolar, viáticos, becas, servicio de transporte gratuito.</li>
                    <li><strong>Comisiones paritarias:</strong> Para interpretar y actualizar el convenio.</li>
                </ul>
                <p>Este convenio ha sido referente para el sector y ha servido de base para otras negociaciones en la provincia de San Juan.</p>

                <h2>5. Caso Práctico: CCT Vicuña (Deprominsa)</h2>
                <p>El convenio de Vicuña, negociado con Deprominsa, comparte muchas similitudes con el de Veladero, pero también tiene particularidades:</p>
                <ul>
                    <li><strong>Ámbito:</strong> Proyecto Josemaría/Vicuña, en la misma zona cordillerana.</li>
                    <li><strong>Categorías:</strong> A, 1, 2 y 3 con niveles Inicial, Medio y Avanzado.</li>
                    <li><strong>Escalas salariales:</strong> Detalladas desde marzo 2025, con incrementos del 3% y 5%.</li>
                    <li><strong>Adicionales:</strong> Presentismo (17%), zona desfavorable (15%), compensación especial (15%).</li>
                    <li><strong>Jornada:</strong> También 14x14, con descansos compensatorios.</li>
                </ul>
                <p>Ambos convenios demuestran la capacidad de los sindicatos mineros para negociar condiciones de alto nivel.</p>

                <h2>6. Reflexión Crítica: ¿Cómo mejorar los convenios mineros?</h2>
                <p>A pesar de los avances, los convenios mineros enfrentan desafíos: adaptación a las nuevas tecnologías, inclusión de cláusulas de género, protección frente a la automatización, y mejora de las condiciones de seguridad y salud laboral.</p>
                <div class="nota-modificacion">
                    <strong>💡 Propuesta de debate:</strong>
                    <p>¿Qué cláusulas innovadoras podrían incluirse en un futuro convenio para la minería 4.0 (automatización, inteligencia artificial, teletrabajo)?</p>
                </div>

                <h2>Glosario</h2>
                <div class="glosario">
                    <div class="termino"><strong>Homologación:</strong> Control estatal sobre el CCT.</div>
                    <div class="termino"><strong>Ultraactividad:</strong> Vigencia hasta nuevo reemplazo.</div>
                    <div class="termino"><strong>Bono de Producción:</strong> Incentivo económico por cumplimiento de metas.</div>
                    <div class="termino"><strong>Comisiones Paritarias:</strong> Órganos de interpretación y control del CCT.</div>
                </div>

                <h2>Recursos Complementarios</h2>
                <ul>
                    <li><a href="assets/pdf/cct-673-04-veladero.pdf" target="_blank">Texto completo del CCT 673/04</a></li>
                    <li><a href="assets/pdf/cct-vicuna-deprominsa.pdf" target="_blank">Texto completo del CCT Vicuña</a></li>
                    <li><a href="https://www.boletinoficial.gob.ar/" target="_blank">Boletín Oficial (publicación de convenios)</a></li>
                </ul>
            </section>

            <section class="modulo-evaluacion-academica">
                <h2>Autoevaluación</h2>
                <div class="pregunta">
                    <p><strong>1. ¿Qué es un Convenio Colectivo de Trabajo?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Es un acuerdo normativo entre sindicatos y empleadores que establece condiciones de trabajo.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>2. ¿Cuáles son las partes de un CCT?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Partes intervinientes, ámbito de aplicación, cláusulas generales y específicas, cláusulas de seguridad social, cláusulas sindicales, disposiciones finales y anexos.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>3. ¿Qué es la homologación de un CCT?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Es el acto administrativo del Ministerio de Trabajo que otorga validez al convenio.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>4. ¿Qué régimen de turnos establece el CCT 673/04?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>El régimen 14x14 (14 días de trabajo y 14 de descanso).</p>
                    </details>
                </div>
            </section>
        </div>
    `,
    
    recursos: [
        { titulo: 'Texto completo del CCT 673/04', url: 'assets/pdf/cct-673-04-veladero.pdf' }
    ],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Qué es un Convenio Colectivo de Trabajo?',
                opciones: [
                    'Un acuerdo individual entre trabajador y empleador',
                    'Un contrato normativo de alcance colectivo',
                    'Una ley del Congreso de la Nación',
                    'Un decreto del Poder Ejecutivo'
                ],
                correcta: 1,
                retroalimentacion: 'El CCT es una norma autónoma de alcance colectivo.'
            },
            {
                id: 2,
                pregunta: '¿Qué ministerio homológa los CCT en Argentina?',
                opciones: ['Ministerio de Economía', 'Ministerio de Trabajo', 'Ministerio de Justicia', 'Ministerio de Salud'],
                correcta: 1,
                retroalimentacion: 'El Ministerio de Trabajo, Empleo y Seguridad Social es el encargado de la homologación.'
            },
            {
                id: 3,
                pregunta: '¿Qué es el régimen 14x14 en la minería?',
                opciones: [
                    '14 horas de trabajo y 14 de descanso al día',
                    '14 días de trabajo y 14 de descanso',
                    '14 meses de trabajo y 14 de vacaciones',
                    '14 años de antigüedad'
                ],
                correcta: 1,
                retroalimentacion: 'Es un sistema de turnos de 14 días de trabajo y 14 de descanso.'
            },
            {
                id: 4,
                pregunta: '¿Qué establece el CCT 673/04 sobre los bonos de producción?',
                opciones: [
                    'No existen bonos',
                    'Pagos mensuales y anuales por cumplimiento de metas',
                    'Solo bonos anuales',
                    'Bonos exclusivos para ingenieros'
                ],
                correcta: 1,
                retroalimentacion: 'El CCT establece bonos mensuales (8% del básico) y anuales por producción.'
            },
            {
                id: 5,
                pregunta: '¿Qué función cumplen las comisiones paritarias?',
                opciones: [
                    'Reemplazar a los sindicatos',
                    'Interpretar y controlar el cumplimiento del CCT',
                    'Fijar los salarios por decreto',
                    'Administrar las empresas mineras'
                ],
                correcta: 1,
                retroalimentacion: 'Las comisiones paritarias son órganos de interpretación y seguimiento del convenio.'
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_5 = MODULO_NEGOCIACION_5;
}

console.log('✅ Módulo 5 (Académico) cargado: El CCT en Profundidad');