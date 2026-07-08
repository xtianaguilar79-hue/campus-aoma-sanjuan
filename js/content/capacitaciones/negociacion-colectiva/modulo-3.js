// ============================================
// MÓDULO 3: ACTORES, INSTRUMENTOS Y FORMAS DE NEGOCIACIÓN
// ============================================

const MODULO_NEGOCIACION_3 = {
    id: 'negociacion-colectiva-modulo-3',
    titulo: 'Actores, Instrumentos y Formas de Negociación',
    duracion: '3 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <header class="modulo-header-academico">
                <div class="modulo-badge">Módulo 3</div>
                <h1>Actores, Instrumentos y Formas de Negociación</h1>
                <p class="modulo-subtitulo">El ecosistema de la negociación colectiva</p>
                <div class="modulo-meta-academico">
                    <span><i class="fas fa-users"></i> Actores: sindicatos, empresarios, Estado</span>
                    <span><i class="fas fa-gavel"></i> Instrumentos: leyes y convenios</span>
                    <span><i class="fas fa-bullseye"></i> Formas: distributiva, integrativa, mixta</span>
                </div>
            </header>

            <section class="modulo-intro-academico">
                <h2>Introducción</h2>
                <p>La negociación colectiva es un ecosistema complejo donde interactúan diversos actores, se utilizan distintos instrumentos y se adoptan diferentes formas de negociación. Comprender este ecosistema es esencial para diseñar estrategias efectivas y alcanzar acuerdos sostenibles.</p>
            </section>

            <section class="modulo-objetivos">
                <h2>Objetivos de Aprendizaje</h2>
                <ul>
                    <li><i class="fas fa-check-circle"></i> Identificar los actores clave (sindicatos, empleadores, Estado) y sus roles.</li>
                    <li><i class="fas fa-check-circle"></i> Conocer los instrumentos normativos (leyes, decretos, convenios).</li>
                    <li><i class="fas fa-check-circle"></i> Diferenciar las formas de negociación: distributiva, integrativa y mixta.</li>
                    <li><i class="fas fa-check-circle"></i> Analizar la negociación por niveles (nacional, sectorial, empresarial).</li>
                </ul>
            </section>

            <section class="modulo-desarrollo">
                <h2>1. Los Actores Sociales</h2>
                <div class="grid-actores">
                    <div class="actor-card">
                        <div class="actor-icon">👥</div>
                        <h4>Sindicatos</h4>
                        <ul>
                            <li>Representan a los trabajadores.</li>
                            <li>Obtienen la personería gremial del Ministerio de Trabajo.</li>
                            <li>Tienen la exclusividad para negociar convenios colectivos en su ámbito de representación.</li>
                        </ul>
                    </div>
                    <div class="actor-card">
                        <div class="actor-icon">🏢</div>
                        <h4>Empleadores</h4>
                        <ul>
                            <li>Representan a las empresas.</li>
                            <li>Pueden actuar individualmente o a través de cámaras empresarias.</li>
                            <li>Deben negociar de buena fe (art. 53, Ley 23.551).</li>
                        </ul>
                    </div>
                    <div class="actor-card">
                        <div class="actor-icon">⚖️</div>
                        <h4>Estado</h4>
                        <ul>
                            <li>Regula el marco normativo.</li>
                            <li>Homologa los convenios colectivos.</li>
                            <li>Interviene en la conciliación y arbitraje de conflictos.</li>
                        </ul>
                    </div>
                </div>

                <h2>2. Instrumentos Normativos</h2>
                <p>Los instrumentos son las herramientas que utilizan los actores para regular las relaciones laborales. Se dividen en:</p>
                <div class="grid-instrumentos">
                    <div class="instrumento-card">
                        <div class="instrumento-icon">📜</div>
                        <h4>Normas Heterónomas</h4>
                        <p>Dictadas por el Estado: Constitución, leyes, decretos, resoluciones. Son de aplicación general.</p>
                        <p><strong>Ejemplos:</strong> Ley 14.250, Ley 23.551, Ley 20.744.</p>
                    </div>
                    <div class="instrumento-card">
                        <div class="instrumento-icon">🤝</div>
                        <h4>Normas Autónomas</h4>
                        <p>Acordadas por los actores sociales: Convenios Colectivos de Trabajo, actas acuerdo, laudos arbitrales.</p>
                        <p><strong>Ejemplos:</strong> CCT 673/04 (Veladero), CCT Vicuña.</p>
                    </div>
                </div>

                <h2>3. Formas de Negociación</h2>
                <p>Las partes pueden adoptar diferentes enfoques en la negociación, según sus objetivos y estrategias:</p>
                <div class="grid-formas">
                    <div class="forma-card distributiva">
                        <div class="forma-icon">🔴</div>
                        <h4>Negociación Distributiva</h4>
                        <p>También llamada "de suma cero". Las partes compiten por una cantidad fija de recursos. Lo que gana una, lo pierde la otra.</p>
                        <p><strong>Ejemplo:</strong> Discusión salarial cuando el presupuesto es limitado.</p>
                    </div>
                    <div class="forma-card integrativa">
                        <div class="forma-icon">🟢</div>
                        <h4>Negociación Integrativa</h4>
                        <p>Busca soluciones que beneficien a ambas partes ("ganar-ganar"). Se centra en intereses comunes y en la creación de valor.</p>
                        <p><strong>Ejemplo:</strong> Acuerdo de productividad que aumenta salarios y reduce costos para la empresa.</p>
                    </div>
                    <div class="forma-card mixta">
                        <div class="forma-icon">🟡</div>
                        <h4>Negociación Mixta</h4>
                        <p>Combina elementos distributivos e integrativos. Es la más común en la práctica.</p>
                        <p><strong>Ejemplo:</strong> Un convenio que fija aumentos salariales (distributivo) y crea comisiones paritarias para mejorar las condiciones laborales (integrativo).</p>
                    </div>
                </div>

                <h2>4. Niveles de Negociación</h2>
                <p>La negociación colectiva puede desarrollarse en distintos niveles, cada uno con sus propias características y alcances:</p>
                <ul>
                    <li><strong>Nivel Nacional:</strong> Negociación entre confederaciones sindicales y cámaras empresarias de alcance nacional (ej. CGT vs. UIA).</li>
                    <li><strong>Nivel Sectorial (Rama de Actividad):</strong> Negociación por actividad económica (ej. minería, metalurgia).</li>
                    <li><strong>Nivel de Empresa:</strong> Negociación específica en una empresa o grupo de empresas (ej. Barrick-Veladero).</li>
                    <li><strong>Nivel de Establecimiento:</strong> Negociación en una planta o unidad productiva.</li>
                </ul>
                <p>En Argentina, la negociación sectorial ha sido tradicionalmente la más importante, pero en los últimos años ha crecido la negociación por empresa, especialmente en sectores como la minería y la industria automotriz.</p>

                <h2>5. Reflexión Crítica: ¿Qué nivel es más adecuado para el sector minero?</h2>
                <p>La minería en San Juan ha optado por la negociación por empresa, lo que permite adaptar las condiciones a la realidad de cada mina. Sin embargo, también existen convenios sectoriales (CCT 38/89) que fijan un piso común de derechos. La articulación entre ambos niveles es clave para garantizar la homogeneidad y la equidad.</p>
                <div class="nota-modificacion">
                    <strong>💡 Pregunta para debate:</strong>
                    <p>¿Qué ventajas y desventajas tiene la negociación por empresa frente a la negociación sectorial en la minería? ¿Cómo se podrían complementar?</p>
                </div>

                <h2>Glosario</h2>
                <div class="glosario">
                    <div class="termino"><strong>Personería Gremial:</strong> Reconocimiento estatal a un sindicato para representar a los trabajadores.</div>
                    <div class="termino"><strong>Homologación:</strong> Acto administrativo por el cual el Ministerio de Trabajo da validez a un convenio colectivo.</div>
                    <div class="termino"><strong>Negociación Distributiva:</strong> Enfoque competitivo donde las partes luchan por una porción del pastel.</div>
                    <div class="termino"><strong>Negociación Integrativa:</strong> Enfoque colaborativo donde las partes buscan expandir el pastel.</div>
                </div>

                <h2>Recursos Complementarios</h2>
                <ul>
                    <li><a href="https://www.argentina.gob.ar/justicia/igj" target="_blank">Inscripción de asociaciones empresarias (IGJ)</a></li>
                    <li><a href="https://www.argentina.gob.ar/trabajo" target="_blank">Ministerio de Trabajo, Empleo y Seguridad Social</a></li>
                </ul>
            </section>

            <section class="modulo-evaluacion-academica">
                <h2>Autoevaluación</h2>
                <div class="pregunta">
                    <p><strong>1. ¿Qué actor tiene la exclusividad para negociar convenios colectivos?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Los sindicatos con personería gremial.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>2. ¿Cuál es la diferencia entre normas heterónomas y autónomas?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Las heterónomas son dictadas por el Estado; las autónomas son acordadas por los actores sociales.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>3. ¿Qué caracteriza a la negociación integrativa?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>Busca soluciones ganar-ganar, creando valor para ambas partes.</p>
                    </details>
                </div>
                <div class="pregunta">
                    <p><strong>4. ¿Qué nivel de negociación es más común en la minería sanjuanina?</strong></p>
                    <details>
                        <summary>Ver respuesta</summary>
                        <p>La negociación por empresa, con convenios específicos como el de Veladero y Vicuña.</p>
                    </details>
                </div>
            </section>
        </div>
    `,
    
    recursos: [],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Quién otorga la personería gremial a los sindicatos?',
                opciones: ['El Poder Judicial', 'El Ministerio de Trabajo', 'La CGT', 'Los empleadores'],
                correcta: 1,
                retroalimentacion: 'El Ministerio de Trabajo, Empleo y Seguridad Social es el encargado de otorgar la personería gremial.'
            },
            {
                id: 2,
                pregunta: '¿Qué es una norma autónoma?',
                opciones: [
                    'Una ley dictada por el Congreso',
                    'Un convenio colectivo acordado entre sindicatos y empleadores',
                    'Un decreto del Poder Ejecutivo',
                    'Una resolución ministerial'
                ],
                correcta: 1,
                retroalimentacion: 'Las normas autónomas son creadas por los propios actores sociales, como los convenios colectivos.'
            },
            {
                id: 3,
                pregunta: '¿Qué enfoque busca el "ganar-ganar" en una negociación?',
                opciones: ['Distributivo', 'Integrativo', 'Mixto', 'Competitivo'],
                correcta: 1,
                retroalimentacion: 'El enfoque integrativo busca expandir el valor total para beneficio de ambas partes.'
            },
            {
                id: 4,
                pregunta: '¿Qué nivel de negociación se da entre una confederación sindical y una cámara empresaria nacional?',
                opciones: ['Empresarial', 'Sectorial', 'Nacional', 'Establecimiento'],
                correcta: 2,
                retroalimentacion: 'El nivel nacional involucra a las grandes organizaciones de alcance nacional.'
            },
            {
                id: 5,
                pregunta: '¿Qué rol cumple el Estado en la negociación colectiva?',
                opciones: ['Ninguno', 'Regula el marco normativo y homologa los convenios', 'Reemplaza a los sindicatos', 'Impone condiciones unilateralmente'],
                correcta: 1,
                retroalimentacion: 'El Estado establece las reglas y controla la legalidad de los convenios.'
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_3 = MODULO_NEGOCIACION_3;
}

console.log('✅ Módulo 3 (Académico) cargado: Actores, Instrumentos y Formas');