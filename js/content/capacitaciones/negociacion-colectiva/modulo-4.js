// ============================================
// MÓDULO 4: MARCO NORMATIVO AVANZADO
// ============================================

const MODULO_NEGOCIACION_4 = {
    id: 'negociacion-colectiva-modulo-4',
    titulo: 'Marco Normativo Avanzado de la Negociación Colectiva',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <header class="modulo-header-academico">
                <div class="modulo-badge">Módulo 4</div>
                <h1>Marco Normativo Avanzado</h1>
                <p class="modulo-subtitulo">Las reglas que ordenan el diálogo social</p>
                <div class="modulo-meta-academico">
                    <span><i class="fas fa-balance-scale"></i> Constitución, Tratados, Leyes</span>
                    <span><i class="fas fa-database"></i> Jerarquía normativa</span>
                    <span><i class="fas fa-search"></i> Análisis de Ley 23.546 y 23.551</span>
                </div>
            </header>

            <section class="modulo-intro-academico">
                <h2>Introducción</h2>
                <p>El marco normativo es el andamiaje jurídico que regula la negociación colectiva. En Argentina, este marco está integrado por normas de diversa jerarquía, desde la Constitución Nacional hasta los convenios colectivos. Dominar este entramado es esencial para cualquier dirigente sindical, ya que define los límites y las posibilidades de la acción negociadora.</p>
            </section>

            <section class="modulo-objetivos">
                <h2>Objetivos de Aprendizaje</h2>
                <ul>
                    <li><i class="fas fa-check-circle"></i> Comprender la jerarquía normativa en el derecho del trabajo argentino.</li>
                    <li><i class="fas fa-check-circle"></i> Analizar el artículo 14 bis de la Constitución Nacional y su alcance.</li>
                    <li><i class="fas fa-check-circle"></i> Estudiar en profundidad la Ley 23.546 (Procedimiento de Negociación Colectiva).</li>
                    <li><i class="fas fa-check-circle"></i> Conocer los aspectos clave de la Ley 23.551 (Asociaciones Sindicales).</li>
                    <li><i class="fas fa-check-circle"></i> Identificar la relación entre las leyes y los convenios colectivos.</li>
                </ul>
            </section>

            <section class="modulo-desarrollo">
                <h2>1. Jerarquía Normativa</h2>
                <p>El derecho del trabajo argentino se organiza en una pirámide normativa que respeta el principio de jerarquía:</p>
                <div class="jerarquia-normas">
                    <div class="nivel-norma">1. Constitución Nacional</div>
                    <div class="nivel-norma">2. Tratados Internacionales (OIT, derechos humanos)</div>
                    <div class="nivel-norma">3. Leyes Nacionales (LCT, Ley de Asociaciones Sindicales, etc.)</div>
                    <div class="nivel-norma">4. Decretos Reglamentarios</div>
                    <div class="nivel-norma">5. Convenios Colectivos de Trabajo</div>
                    <div class="nivel-norma">6. Contratos Individuales de Trabajo</div>
                </div>
                <p>Las normas de nivel superior prevalecen sobre las inferiores. Sin embargo, el principio de <strong>norma más favorable</strong> puede desplazar esta jerarquía en beneficio del trabajador (art. 9, LCT).</p>

                <h2>2. Constitución Nacional: Artículo 14 bis</h2>
                <p>El artículo 14 bis es el pilar constitucional de los derechos laborales. Establece:</p>
                <ul>
                    <li><strong>Derechos del trabajador:</strong> condiciones dignas, jornada limitada, descanso, salario justo, estabilidad.</li>
                    <li><strong>Derechos gremiales:</strong> organización sindical libre, <strong>concertar convenios colectivos</strong>, recurrir a conciliación y arbitraje, derecho de huelga.</li>
                    <li><strong>Garantías a los representantes:</strong> estabilidad y protección para el cumplimiento de su gestión.</li>
                </ul>
                <p>Este artículo es de aplicación directa y ha sido desarrollado por la legislación infraconstitucional y la jurisprudencia.</p>

                <h2>3. Tratados Internacionales</h2>
                <p>Argentina ha ratificado los principales convenios de la OIT, que tienen jerarquía constitucional (art. 75 inc. 22):</p>
                <ul>
                    <li><strong>Convenio 87:</strong> Libertad sindical.</li>
                    <li><strong>Convenio 98:</strong> Derecho de sindicación y negociación colectiva.</li>
                    <li><strong>Convenio 154:</strong> Fomento de la negociación colectiva.</li>
                    <li><strong>Convenio 151:</strong> Relaciones de trabajo en la administración pública.</li>
                </ul>
                <p>Estos convenios son vinculantes y han sido invocados por la Corte Suprema en diversos fallos.</p>

                <h2>4. Ley 23.546: Procedimiento de Negociación Colectiva</h2>
                <p>Esta ley regula el procedimiento para la celebración de convenios colectivos. Sus aspectos clave son:</p>
                <ul>
                    <li><strong>Iniciativa:</strong> Cualquiera de las partes puede iniciar el procedimiento (art. 2).</li>
                    <li><strong>Comisión Negociadora:</strong> Integrada por igual número de representantes de sindicatos y empleadores.</li>
                    <li><strong>Ámbito de negociación:</strong> Las partes determinan el alcance personal y territorial.</li>
                    <li><strong>Materias a negociar:</strong> Empleo, salarios, capacitación, organización del trabajo, salud y ambiente laboral.</li>
                    <li><strong>Deber de buena fe:</strong> Las partes deben negociar de buena fe (art. 4).</li>
                    <li><strong>Homologación:</strong> El Ministerio de Trabajo debe homologar el convenio dentro de los 30 días (art. 5).</li>
                </ul>
                <div class="cita-destacada">
                    <p>"La Ley 23.546 garantiza el derecho a la negociación colectiva al establecer un procedimiento claro y ágil, que obliga a las partes a dialogar y a buscar acuerdos."</p>
                    <footer>— Dr. Ricardo Foglia, Derecho Colectivo del Trabajo</footer>
                </div>

                <h2>5. Ley 23.551: Asociaciones Sindicales</h2>
                <p>Esta ley regula la organización sindical y es fundamental para la negociación colectiva, ya que define quién tiene personería gremial y, por lo tanto, la capacidad para negociar.</p>
                <p>Aspectos clave:</p>
                <ul>
                    <li><strong>Libertad sindical:</strong> Los trabajadores tienen derecho a constituir sindicatos sin autorización previa (art. 1).</li>
                    <li><strong>Personería gremial:</strong> Se otorga al sindicato más representativo en su ámbito (art. 25).</li>
                    <li><strong>Representación en la empresa:</strong> Delegados y comisiones internas (art. 40 y ss.).</li>
                    <li><strong>Estabilidad gremial:</strong> Protección contra el despido de dirigentes y candidatos (arts. 48 y 50).</li>
                    <li><strong>Prácticas desleales:</strong> Sanciones por conductas antisindicales (art. 53).</li>
                </ul>

                <h2>6. Relación con el Sector Minero</h2>
                <p>En la minería, la aplicación de estas normas se concreta en convenios como el <strong>CCT 673/04</strong> (Barrick-Veladero) y el <strong>CCT Vicuña</strong>. Estos convenios han sido homologados y registrados conforme a la Ley 23.546, y establecen condiciones de trabajo adaptadas a las particularidades de la actividad.</p>

                <h2>7. Reflexión Crítica: ¿Es necesario actualizar el marco normativo?</h2>
                <p>La Ley 23.546 data de 1988 y la Ley 23.551 de 1988. Desde entonces, el mundo del trabajo ha cambiado radicalmente: globalización, digitalización, nuevas formas de empleo. Existe un debate sobre la necesidad de actualizar estas normas para adaptarlas a los nuevos desafíos.</p>
                <div class="nota-modificacion">
                    <strong>💡 Debate:</strong>
                    <p>¿Qué aspectos del marco normativo deberían reformarse para fortalecer la negociación colectiva en el siglo XXI? ¿Cómo afectaría esto a la minería?</p>
                </div>

                <h2>Glosario</h2>
                <div class="glosario">
                    <div class="termino"><strong>Jerarquía Normativa:</strong> Orden de prelación de las normas jurídicas.</div>
                    <div class="termino"><strong>Norma Más Favorable:</strong> Principio por el cual se aplica la norma que beneficia más al trabajador.</div>
                    <div class="termino"><strong>Homologación:</strong> Control de legalidad y oportunidad por el Estado.</div>
                    <div class="termino"><strong>Ultraactividad:</strong> Mantenimiento de la vigencia del convenio hasta su reemplazo.</div>
                </div>

                <h2>Recursos Complementarios</h2>
                <ul>
                    <li><a href="https://www.argentina.gob.ar/normativa/nacional/ley-23546-9188" target="_blank">Ley 23.546 (texto completo)</a></li>
                    <li><a href="https://www.argentina.gob.ar/normativa/nacional/ley-23551-138" target="_blank">Ley 23.551 (texto completo)</a></li>
                    <li><a href="https://www.argentina.gob.ar/normativa/nacional/constituci%C3%B3n" target="_blank">Constitución Nacional</a></li>
                </ul>
            </section>

            <section class="modulo-evaluacion-academica">
                <h2>Autoevaluación</h2>
                <div class="pregunta">
                    <p><strong>1. ¿Cuál es el orden de jerarquía normativa en Argentina?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Constitución, Tratados Internacionales, Leyes, Decretos, Convenios Colectivos, Contratos Individuales.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>2. ¿Qué garantiza el artículo 14 bis de la Constitución Nacional?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Los derechos laborales fundamentales, incluido el derecho a concertar convenios colectivos.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>3. ¿Qué ley regula el procedimiento de negociación colectiva?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>La Ley 23.546.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>4. ¿Qué es la personería gremial?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>El reconocimiento estatal a un sindicato para representar a los trabajadores en su ámbito.</p>
                    </details>
                </div>
            </section>
        </div>
    `,
    
    recursos: [
        { titulo: 'Texto completo de la Ley 23.546', url: 'https://www.argentina.gob.ar/normativa/nacional/ley-23546-9188' },
        { titulo: 'Texto completo de la Ley 23.551', url: 'https://www.argentina.gob.ar/normativa/nacional/ley-23551-138' }
    ],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Qué artículo de la Constitución Nacional establece los derechos laborales y gremiales?',
                opciones: ['Art. 14', 'Art. 14 bis', 'Art. 75', 'Art. 31'],
                correcta: 1,
                retroalimentacion: 'El artículo 14 bis es el pilar de los derechos laborales en Argentina.'
            },
            {
                id: 2,
                pregunta: '¿Qué ley regula el procedimiento de negociación colectiva?',
                opciones: ['Ley 14.250', 'Ley 23.546', 'Ley 23.551', 'Ley 20.744'],
                correcta: 1,
                retroalimentacion: 'La Ley 23.546 establece el procedimiento para la negociación colectiva.'
            },
            {
                id: 3,
                pregunta: '¿Qué es la "ultraactividad" de un convenio colectivo?',
                opciones: [
                    'Que pierde vigencia al vencimiento del plazo',
                    'Que mantiene vigencia hasta ser reemplazado',
                    'Que solo se aplica a los afiliados al sindicato',
                    'Que debe ser renovado cada año'
                ],
                correcta: 1,
                retroalimentacion: 'La ultraactividad garantiza la estabilidad de las condiciones laborales.'
            },
            {
                id: 4,
                pregunta: '¿Qué establece la Ley 23.551 en materia de libertad sindical?',
                opciones: [
                    'Limita el derecho a afiliarse',
                    'Garantiza la organización sindical libre y democrática',
                    'Prohíbe la creación de nuevos sindicatos',
                    'Reduce los derechos de los delegados'
                ],
                correcta: 1,
                retroalimentacion: 'La Ley 23.551 garantiza la libertad sindical como derecho fundamental.'
            },
            {
                id: 5,
                pregunta: '¿Cuál es la jerarquía de los convenios colectivos en el sistema normativo argentino?',
                opciones: [
                    'Están por encima de la Constitución',
                    'Están por debajo de las leyes pero por encima de los contratos individuales',
                    'Tienen la misma jerarquía que las leyes',
                    'Son inferiores a los contratos individuales'
                ],
                correcta: 1,
                retroalimentacion: 'Los convenios colectivos están subordinados a las leyes y a la Constitución, pero prevalecen sobre los contratos individuales.'
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_4 = MODULO_NEGOCIACION_4;
}

console.log('✅ Módulo 4 (Académico) cargado: Marco Normativo Avanzado');