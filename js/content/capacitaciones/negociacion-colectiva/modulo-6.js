// ============================================
// MÓDULO 6: PROCESO DE NEGOCIACIÓN: ESTRATEGIAS Y TÉCNICAS
// ============================================

const MODULO_NEGOCIACION_6 = {
    id: 'negociacion-colectiva-modulo-6',
    titulo: 'Proceso de Negociación: Estrategias y Técnicas',
    duracion: '3 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <header class="modulo-header-academico">
                <div class="modulo-badge">Módulo 6</div>
                <h1>Proceso de Negociación: Estrategias y Técnicas</h1>
                <p class="modulo-subtitulo">Cómo planificar, ejecutar y cerrar una negociación exitosa</p>
                <div class="modulo-meta-academico">
                    <span><i class="fas fa-chess-queen"></i> Estrategias: BATNA, ZOPA, anclaje</span>
                    <span><i class="fas fa-route"></i> Fases del proceso</span>
                    <span><i class="fas fa-handshake"></i> Cierre y seguimiento</span>
                </div>
            </header>

            <section class="modulo-intro-academico">
                <h2>Introducción</h2>
                <p>La negociación colectiva es un proceso complejo que requiere una preparación meticulosa y una ejecución hábil. Dominar las técnicas y estrategias de negociación es esencial para obtener resultados favorables. En este módulo, profundizaremos en el paso a paso de la negociación, desde la preparación hasta el cierre del acuerdo.</p>
            </section>

            <section class="modulo-objetivos">
                <h2>Objetivos de Aprendizaje</h2>
                <ul>
                    <li><i class="fas fa-check-circle"></i> Identificar las fases del proceso de negociación.</li>
                    <li><i class="fas fa-check-circle"></i> Conocer las estrategias de negociación más efectivas (BATNA, ZOPA, anclaje).</li>
                    <li><i class="fas fa-check-circle"></i> Desarrollar habilidades para la gestión de conflictos y la mediación.</li>
                    <li><i class="fas fa-check-circle"></i> Aprender a cerrar un acuerdo y darle seguimiento.</li>
                </ul>
            </section>

            <section class="modulo-desarrollo">
                <h2>1. Fases de la Negociación</h2>
                <p>El proceso de negociación puede dividirse en siete fases principales:</p>
                <div class="linea-tiempo">
                    <div class="evento">
                        <div class="evento-fecha">1. Preparación</div>
                        <div class="evento-contenido">
                            <h4>Investigación y Planificación</h4>
                            <p>Recopilar información sobre la empresa, el sector, las condiciones del mercado, las necesidades de los trabajadores. Definir objetivos claros y realistas.</p>
                        </div>
                    </div>
                    <div class="evento">
                        <div class="evento-fecha">2. Apertura</div>
                        <div class="evento-contenido">
                            <h4>Presentación de Demandas</h4>
                            <p>Formalizar el inicio de la negociación, presentar el pliego de reclamos y escuchar la posición de la contraparte.</p>
                        </div>
                    </div>
                    <div class="evento">
                        <div class="evento-fecha">3. Exploración</div>
                        <div class="evento-contenido">
                            <h4>Intercambio de Información</h4>
                            <p>Profundizar en los intereses de ambas partes, identificar puntos de convergencia y divergencia.</p>
                        </div>
                    </div>
                    <div class="evento">
                        <div class="evento-fecha">4. Intercambio de Propuestas</div>
                        <div class="evento-contenido">
                            <h4>Negociación de Concesiones</h4>
                            <p>Presentar ofertas y contraofertas, buscar soluciones creativas que satisfagan a ambas partes.</p>
                        </div>
                    </div>
                    <div class="evento">
                        <div class="evento-fecha">5. Cierre</div>
                        <div class="evento-contenido">
                            <h4>Acuerdo Final</h4>
                            <p>Llegar a un acuerdo definitivo, redactar el texto del convenio y someterlo a homologación.</p>
                        </div>
                    </div>
                    <div class="evento">
                        <div class="evento-fecha">6. Implementación</div>
                        <div class="evento-contenido">
                            <h4>Puesta en Marcha</h4>
                            <p>Difundir el acuerdo entre los trabajadores, capacitar a supervisores, ajustar los sistemas de gestión.</p>
                        </div>
                    </div>
                    <div class="evento">
                        <div class="evento-fecha">7. Seguimiento</div>
                        <div class="evento-contenido">
                            <h4>Evaluación y Control</h4>
                            <p>Monitorear el cumplimiento del convenio, resolver dudas, ajustar lo necesario.</p>
                        </div>
                    </div>
                </div>

                <h2>2. Estrategias de Negociación</h2>
                <p>Existen diversas estrategias que los negociadores pueden adoptar según el contexto:</p>
                <div class="grid-estrategias">
                    <div class="estrategia-card">
                        <div class="estrategia-icon">🎯</div>
                        <h4>BATNA</h4>
                        <p><strong>Best Alternative To a Negotiated Agreement</strong> (Mejor Alternativa a un Acuerdo Negociado). Es el plan B. Conocer nuestra BATNA nos da poder y nos permite no aceptar malos acuerdos.</p>
                    </div>
                    <div class="estrategia-card">
                        <div class="estrategia-icon">🤝</div>
                        <h4>ZOPA</h4>
                        <p><strong>Zone Of Possible Agreement</strong> (Zona de Posible Acuerdo). Es el espacio donde las ofertas de ambas partes se superponen. La clave es encontrar la ZOPA y moverse dentro de ella.</p>
                    </div>
                    <div class="estrategia-card">
                        <div class="estrategia-icon">⚓</div>
                        <h4>Anclaje</h4>
                        <p>Es la primera oferta que se hace, que establece un "ancla" mental. Es importante hacer una oferta inicial ambiciosa pero realista para orientar la negociación a nuestro favor.</p>
                    </div>
                </div>

                <h2>3. Gestión de Conflictos y Mediación</h2>
                <p>Cuando las posiciones se endurecen y no se logra avanzar, es necesario recurrir a mecanismos de resolución de conflictos:</p>
                <ul>
                    <li><strong>Conciliación:</strong> Intervención de un tercero neutral que ayuda a las partes a encontrar una solución (Ley 14.786).</li>
                    <li><strong>Arbitraje:</strong> Un tercero (árbitro) tiene la facultad de dictar una decisión vinculante.</li>
                    <li><strong>Mediación:</strong> Similar a la conciliación, pero el mediador propone soluciones sin imponerlas.</li>
                </ul>

                <h2>4. Técnicas de Comunicación y Persuasión</h2>
                <ul>
                    <li><strong>Escucha activa:</strong> Demostrar que se entiende la posición del otro.</li>
                    <li><strong>Empatía:</strong> Ponerse en el lugar del otro.</li>
                    <li><strong>Lenguaje asertivo:</strong> Expresar las propias necesidades sin agresividad.</li>
                    <li><strong>Preguntas abiertas:</strong> Estimular el diálogo y la exploración de intereses.</li>
                </ul>

                <h2>5. Reflexión Crítica: ¿Cómo aplicar estas técnicas en la minería sanjuanina?</h2>
                <p>La negociación en la minería requiere un enfoque particular debido a las características del sector: alta conflictividad, condiciones climáticas extremas, y la presencia de grandes corporaciones con fuerte poder de negociación. Los sindicatos deben prepararse con información precisa, fortalecer su unidad, y utilizar estrategias como el anclaje y la búsqueda de la ZOPA.</p>
                <div class="nota-modificacion">
                    <strong>💡 Propuesta de taller:</strong>
                    <p>Realizar un simulacro de negociación entre delegados de AOMA y representantes de una empresa minera, aplicando las técnicas aprendidas (BATNA, ZOPA, anclaje).</p>
                </div>

                <h2>Glosario</h2>
                <div class="glosario">
                    <div class="termino"><strong>BATNA:</strong> Mejor alternativa posible en caso de no llegar a un acuerdo.</div>
                    <div class="termino"><strong>ZOPA:</strong> Zona donde las ofertas de ambas partes se superponen.</div>
                    <div class="termino"><strong>Anclaje:</strong> Primera oferta que condiciona la negociación.</div>
                    <div class="termino"><strong>Conciliación Obligatoria:</strong> Procedimiento legal para resolver conflictos laborales.</div>
                </div>

                <h2>Recursos Complementarios</h2>
                <ul>
                    <li><a href="https://www.argentina.gob.ar/normativa/nacional/ley-14786-19410" target="_blank">Ley 14.786 de Conciliación Obligatoria</a></li>
                    <li><a href="assets/pdf/guia-tecnicas-negociacion.pdf" target="_blank">PDF: Guía de Técnicas de Negociación</a></li>
                </ul>
            </section>

            <section class="modulo-evaluacion-academica">
                <h2>Autoevaluación</h2>
                <div class="pregunta">
                    <p><strong>1. ¿Qué es la BATNA en la negociación?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Es la mejor alternativa a un acuerdo negociado, el plan B.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>2. ¿Qué significa ZOPA?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Zona de Posible Acuerdo, donde se superponen las ofertas de las partes.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>3. ¿Qué es el anclaje en la negociación?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Es la primera oferta que condiciona el desarrollo de la negociación.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>4. ¿Cuál es la diferencia entre conciliación y arbitraje?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>En la conciliación, el tercero ayuda a las partes; en el arbitraje, el tercero impone una decisión.</p>
                    </details>
                </div>
            </section>
        </div>
    `,
    
    recursos: [
        { titulo: 'Guía de Técnicas de Negociación', url: 'assets/pdf/guia-tecnicas-negociacion.pdf' }
    ],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Qué es la BATNA en una negociación?',
                opciones: [
                    'La mejor oferta que se puede hacer',
                    'La mejor alternativa en caso de no llegar a un acuerdo',
                    'La oferta final',
                    'La Zona de Posible Acuerdo'
                ],
                correcta: 1,
                retroalimentacion: 'La BATNA es el plan B, la alternativa a la que se recurre si no se logra un acuerdo.'
            },
            {
                id: 2,
                pregunta: '¿Qué es la ZOPA?',
                opciones: [
                    'La zona de conflicto',
                    'La zona donde las ofertas se superponen',
                    'La oferta inicial',
                    'La oferta final'
                ],
                correcta: 1,
                retroalimentacion: 'La ZOPA es el espacio donde es posible llegar a un acuerdo.'
            },
            {
                id: 3,
                pregunta: '¿Qué técnica consiste en hacer la primera oferta para condicionar la negociación?',
                opciones: ['BATNA', 'ZOPA', 'Anclaje', 'Empatía'],
                correcta: 2,
                retroalimentacion: 'El anclaje establece un punto de referencia que influye en la negociación.'
            },
            {
                id: 4,
                pregunta: '¿Qué ley regula la conciliación obligatoria en Argentina?',
                opciones: ['Ley 14.250', 'Ley 14.786', 'Ley 23.546', 'Ley 23.551'],
                correcta: 1,
                retroalimentacion: 'La Ley 14.786 establece el procedimiento de conciliación obligatoria.'
            },
            {
                id: 5,
                pregunta: '¿Cuál es la primera fase del proceso de negociación?',
                opciones: ['Apertura', 'Preparación', 'Cierre', 'Intercambio de propuestas'],
                correcta: 1,
                retroalimentacion: 'La preparación es la fase inicial y más importante, donde se definen los objetivos y se recopila información.'
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_6 = MODULO_NEGOCIACION_6;
}

console.log('✅ Módulo 6 (Académico) cargado: Proceso y Estrategias');