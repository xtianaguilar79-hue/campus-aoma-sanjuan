// ============================================
// CAPACITACIÓN: INTRODUCCIÓN A LA NEGOCIACIÓN COLECTIVA
// Programa de Apoyo a la Formación Sindical
// Ministerio de Trabajo, Empleo y Seguridad Social
// Abril 2023
// ============================================

const CAPACITACION_NEGOCIACION_COLECTIVA = {
    id: 7,
    titulo: 'Introducción a la Negociación Colectiva',
    categoria: 'Gremial',
    actividad: 'general',
    instructor: 'Programa de Apoyo a la Formación Sindical - MTEySS',
    duracion: '8 horas',
    nivel: 'Intermedio',
    imagen: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
    descripcion: 'Curso completo sobre negociación colectiva, sus fundamentos, marco normativo, actores sociales y proceso de negociación. Material elaborado por el Ministerio de Trabajo, Empleo y Seguridad Social.',
    modulos: 10,
    contenido: `
        <div class="capacitacion-content">
            <div class="modulo-intro">
                <h2>📚 Introducción</h2>
                <p>En las sociedades democráticas la negociación colectiva constituye una pieza clave del sistema social. Su vigencia y las prácticas que suscita concretan modalidades relativamente estables de institucionalización de los conflictos laborales, posibilitan un marco consensuado de gestión de lo social y generan normas contractuales capaces de articular maduramente intereses sectoriales en pugna, con el objetivo de mantener y desarrollar la Paz Social.</p>
                <p>Esperamos que el ideario que intentamos transmitir aquí, por medio de la ponderación de procesos que logran conjugar unidad de concepción, unidad de organización y unidad de acción, resulte un aporte para el desarrollo de los cuadros y dirigentes del movimiento de los trabajadores en el camino de la construcción colectiva.</p>
            </div>

            <div class="modulo">
                <h2>Módulo 1: ¿Qué es la Negociación Colectiva?</h2>
                <h3>Definición de la OIT</h3>
                <p>"...comprende todas las negociaciones que tienen lugar entre un Empleador, un grupo de Empleadores, una Organización o varias organizaciones de Empleadores, por una parte, y una Organización o varias Organizaciones de trabajadores por otra, con el fin de fijar condiciones de trabajo y empleo; o regular las relaciones entre Empleadores o sus Organizaciones y una Organización o varias organizaciones de trabajadores, o lograr todos esos fines a la vez" (Convenio 154 sobre el fomento de la Negociación Colectiva, 1981).</p>
                
                <h3>Fundamento Constitucional</h3>
                <p>Este derecho a negociar convenios colectivos de trabajo es un derecho que la Constitución Nacional reconoce a los "gremios". El artículo 14 bis CN expresamente establece:</p>
                <blockquote>"El trabajo en sus diversas formas gozará de la protección de las leyes, las que asegurarán al trabajador: condiciones dignas y equitativas de labor, jornada limitada; descanso y vacaciones pagados; retribución justa; salario mínimo vital móvil; igual remuneración por igual tarea; participación en las ganancias de las empresas, con control de la producción y colaboración en la dirección; protección contra el despido arbitrario; estabilidad del empleado público; organización sindical libre y democrática, reconocida por la simple inscripción en un registro especial. Queda garantizado a los gremios: concertar convenios colectivos de trabajo; recurrir a la conciliación y al arbitraje; el derecho de huelga."</blockquote>
                
                <h3>Marco Histórico</h3>
                <p>La sanción de la Ley 14.250 en Argentina en el año 1953 constituyó un hito en el proceso de las negociaciones colectivas. En nuestro país la negociación colectiva ha sido generalmente abordada como un fenómeno económico y social que tiene incidencia en la vida concreta de las relaciones laborales en general y en el conjunto de los trabajadores y las trabajadoras en particular.</p>
            </div>

            <div class="modulo">
                <h2>Módulo 2: Supuestos de la Negociación Colectiva</h2>
                <p>La negociación colectiva es una instancia de diálogo para producir decisiones compartidas, una alternativa de racionalidad social, de crecimiento y de transformación. Toda negociación supone:</p>
                <ul>
                    <li><strong>El reconocimiento de la legitimidad de las partes</strong> para llevar adelante el acto de negociar.</li>
                    <li><strong>La aceptación de que ninguna de las partes puede por sí sola resolver los problemas</strong> que se plantean (concepto de interdependencia).</li>
                    <li><strong>Asumir el conflicto de intereses</strong> como un elemento subyacente a todo proceso de negociación.</li>
                    <li><strong>La expectativa latente de alcanzar un acuerdo.</strong> Esto es condición inseparable del proceso de negociación colectiva.</li>
                </ul>
                
                <h3>Factores que condicionan el proceso</h3>
                <ul>
                    <li>Factores sociodemográficos</li>
                    <li>Factores económicos</li>
                    <li>Factores políticos</li>
                    <li>Factores culturales</li>
                    <li>Factores tecnológicos</li>
                </ul>
            </div>

            <div class="modulo">
                <h2>Módulo 3: Elementos Condicionantes</h2>
                <p>Toda negociación colectiva tiene elementos condicionantes para su desarrollo. Solo a modo de ejemplo, y de forma no taxativa, podemos citar algunos de ellos:</p>
                <ul>
                    <li>La fuerza y la unidad del Movimiento Obrero.</li>
                    <li>La posible articulación de los Niveles Sindicales.</li>
                    <li>La relación con las Bases (trabajadores y trabajadoras).</li>
                    <li>El contexto social, económico, tecnológico y político en que se desarrolla y define los resultados de la Negociación Colectiva.</li>
                </ul>
            </div>

            <div class="modulo">
                <h2>Módulo 4: Los Componentes del Sistema</h2>
                <p>Las relaciones laborales constituyen un sistema conformado básicamente por cuatro dimensiones principales:</p>
                
                <h3>a) Los actores sindicales</h3>
                <p>Los trabajadores y sus organizaciones representativas; los empleadores y sus organizaciones, y el Estado. Es decir, las asociaciones sindicales con personería gremial otorgada por el MTEySS.</p>
                
                <h3>b) Los actores empresarios</h3>
                <p>Puede ser una empresa, grupos de empresas o cámaras empresarias. Deberán acreditar su personería jurídica otorgada por la IGJ y su estatuto y/o documento constitutivo.</p>
                
                <h3>c) Asesores técnicos</h3>
                <p>Las partes pueden concurrir a las negociaciones asistidas de asesores técnicos con voz, pero sin voto.</p>
                
                <h3>d) El ambiente externo</h3>
                <p>El desarrollo de las relaciones laborales, en general, y de la negociación colectiva en particular, se ve condicionado por múltiples factores de orden externo, tales como el mercado de trabajo, el Estado con sus políticas económicas y sociales, los avances científicos y tecnológicos que impactan en el proceso de trabajo.</p>
                
                <h3>e) Los instrumentos de regulación</h3>
                <p>Las leyes. En nuestro país podemos mencionar en primer lugar la Constitución Nacional y los tratados internacionales. La Ley 14.250 de Negociación Colectiva, la Ley 23.546 de Procedimiento para la Negociación Colectiva, la Ley 14.786 de Conciliación Obligatoria, la Ley 23.551 de Asociaciones Sindicales y la Ley 20.744 de Contrato de Trabajo.</p>
            </div>

            <div class="modulo">
                <h2>Módulo 5: Relevancia para los Sindicatos</h2>
                <p>El fortalecimiento de la negociación como herramienta para el cambio y el avance sostenido y permanente de las conquistas laborales comporta para el actor sindical las siguientes acciones:</p>
                <ul>
                    <li>Asumir su propia identidad frente a las nuevas formas de expresión del conflicto.</li>
                    <li>Aceptar que el conflicto y la negociación no son términos antagónicos, sino que se interrelacionan, se realimentan y exigen propuestas superadoras.</li>
                    <li>Diseñar estrategias que asuman la existencia de intereses discordantes y comunes.</li>
                    <li>Generar una estructura propia y eficiente, abierta a la participación interna, a la formación permanente de dirigentes, delegados y trabajadores.</li>
                </ul>
                
                <h3>Necesidades actuales</h3>
                <p>El contexto social, económico, político y cultural nos exige impulsar y controlar el proceso de negociación colectiva. Necesitamos:</p>
                <ul>
                    <li>Brindar respuestas a viejas y nuevas problemáticas.</li>
                    <li>Atender a la crisis del mercado de trabajo que continúa amenazando con barrer las certidumbres.</li>
                    <li>Recuperar nuestra propia y rica experiencia en la resolución de los problemas.</li>
                </ul>
            </div>

            <div class="modulo">
                <h2>Módulo 6: Formas de la Negociación Colectiva</h2>
                <table class="tabla-modulos">
                    <thead>
                        <tr>
                            <th>Aspecto considerado</th>
                            <th>Períodos en que se desarrolla</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Según forma en que se materializa en el tiempo</td>
                            <td>Específica o puntual / Sucesiva o permanente</td>
                        </tr>
                        <tr>
                            <td>Según el nivel en que se efectúa</td>
                            <td>Interconfederal / Por actividad o rama / Por profesión o especialidad / A nivel de empresa / A nivel de establecimiento</td>
                        </tr>
                        <tr>
                            <td>Según el carácter del diálogo</td>
                            <td>La óptica de la lucha / La óptica del concurso</td>
                        </tr>
                        <tr>
                            <td>Según el carácter orgánico</td>
                            <td>Por la Confederación / Por la Federación / Por el Sindicato / Por la seccional o filial / Por los Delegados</td>
                        </tr>
                        <tr>
                            <td>Según su contenido</td>
                            <td>Según actúe sobre las causas / Según actúe sobre los efectos</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="modulo">
                <h2>Módulo 7: Características Básicas del Modelo</h2>
                <p>Un modelo de Negociación Colectiva se sostiene en una serie de conceptos claves:</p>
                <ul>
                    <li><strong>Colectiva:</strong> involucra a diversos actores del mundo laboral.</li>
                    <li><strong>Progresividad:</strong> procurando siempre la ampliación de derechos laborales, su mejora y perfeccionamiento permanente.</li>
                    <li><strong>Bilateral:</strong> reconocimiento pleno y mutuo por parte de los actores sociales.</li>
                    <li><strong>Inclusiva:</strong> tratamiento y regulación de todas las temáticas posibles atendiendo al desarrollo de la dinámica social, económica, política y cultural de nuestro país.</li>
                    <li><strong>Responsable:</strong> equilibrios entre los actores sociales (trabajadores y empleadores).</li>
                    <li><strong>Articulada:</strong> prever la pluralidad de ámbitos funcionales, geográficos y personales.</li>
                    <li><strong>Contractualizante:</strong> lograr la mayor "legitimidad" posible en los acuerdos a alcanzar.</li>
                </ul>
            </div>

            <div class="modulo">
                <h2>Módulo 8: Marco Normativo</h2>
                <h3>Constitución Nacional</h3>
                <ul>
                    <li><strong>Artículo 14 bis:</strong> El trabajo en sus diversas formas gozará de la protección de las leyes...</li>
                    <li><strong>Artículo 31:</strong> Esta Constitución, las leyes de la Nación que en su consecuencia se dicten por el Congreso y los tratados con las potencias extranjeras son la ley suprema de la Nación.</li>
                    <li><strong>Artículo 75, inciso 22:</strong> Aprobar o desechar tratados concluidos con las demás naciones y con las organizaciones internacionales.</li>
                </ul>
                
                <h3>Tratados Internacionales</h3>
                <ul>
                    <li>Convenio 98 sobre el derecho de sindicación y de negociación colectiva.</li>
                    <li>Convenio 151 sobre las relaciones de trabajo en la administración pública.</li>
                    <li>Convenio 154 sobre la negociación colectiva.</li>
                    <li>Recomendación 91 sobre los contratos colectivos.</li>
                </ul>
            </div>

            <div class="modulo">
                <h2>Módulo 9: Paso a Paso de la Negociación</h2>
                
                <h3>1. Inicio de la negociación</h3>
                <p>La iniciativa para impulsar la negociación o dar inicio al procedimiento puede provenir tanto de los representantes de los trabajadores como de los empleadores. Cualquiera de las partes interesadas podrá disponer la iniciación de las negociaciones tendientes a la concertación de una nueva convención.</p>
                <p><strong>Convocatoria:</strong> Notificará por escrito a la otra parte, con copia a la autoridad administrativa del trabajo. Obligados a responderla y a designar sus representantes en la comisión que se integre al efecto. En el plazo de QUINCE (15) días a contar desde la recepción de la notificación, se constituirá la comisión negociadora con representantes sindicales.</p>
                
                <h3>2. Requisitos</h3>
                <p>El artículo 2 de la Ley 23.546 establece que la representación de los empleadores o de los trabajadores que promueva la negociación se notificará por escrito a la otra parte, con copia a la autoridad administrativa del trabajo, indicando:</p>
                <ul>
                    <li>Representación que inviste.</li>
                    <li>Alcance personal y territorial de la convención colectiva pretendida.</li>
                    <li>Materia a negociar.</li>
                </ul>
                
                <h3>3. Designación de la Comisión Negociadora</h3>
                <p>Las Comisiones Negociadoras son aquellas que tienen por objeto discutir y acordar el convenio colectivo: se constituyen para pactar y lograr la firma del convenio. Están integradas por un número igual de representantes del sindicato con personería gremial y de los empleadores.</p>
                <p>A partir de la sanción de la Ley 25.674, la representación sindical se deberá conformar con el correspondiente "cup o femenino" (30%).</p>
                
                <h3>4. Determinación del ámbito territorial y personal</h3>
                <p>La representación del sindicato está dada por el ámbito personal y territorial reconocido en la resolución que le otorga la personería gremial. El ámbito de negociación es aquel que determinan las partes libremente y de común acuerdo.</p>
                
                <h3>5. Determinación de las materias a negociar</h3>
                <p>La comunicación deberá contener, además, las materias objeto de negociación con especial individualización de las cláusulas relativas a empleo, ajustes salariales, capacitación, organización del trabajo y nuevas tecnologías, régimen de información y consulta a la representación sindical, salud y ambiente laboral, productividad y mecanismos de prevención o solución de conflictos laborales.</p>
                
                <h3>6. Deber de negociar de buena fe</h3>
                <p>Se negocia de buena fe cuando no se defrauda o abusa de la confianza del otro, cuando se guarda fidelidad a la palabra dada y cuando ambas partes son colaboradoras y solidarias. Para ello, las partes están obligadas a:</p>
                <ul>
                    <li>I. Concurrir a las reuniones acordadas o fijadas por la autoridad de aplicación.</li>
                    <li>II. Designar negociadores con mandato suficiente.</li>
                    <li>III. Intercambiar la información necesaria a los fines del examen de las cuestiones en debate.</li>
                    <li>IV. Realizar esfuerzos conducentes a lograr acuerdos.</li>
                </ul>
                
                <h3>7. Desarrollo de las negociaciones</h3>
                <p>Las partes deben realizar los esfuerzos conducentes a lograr acuerdos. Las partes no deben iniciar el procedimiento únicamente con miras a cumplir con el procedimiento normado, sino que deben tener la certeza de que el procedimiento es el medio para arribar a un acuerdo.</p>
                
                <h3>8. Servicio de mediación, conciliación y arbitraje</h3>
                <p>Los acuerdos se adoptarán con el consentimiento de los sectores representados. Cuando en el seno de la representación de una de las partes no hubiere unanimidad, prevalecerá la posición de la mayoría de sus integrantes.</p>
                <p>De lo ocurrido en el transcurso de las negociaciones se labrará un acta resumida y las convenciones colectivas de trabajo deberán ser homologadas por el Ministerio de Trabajo, Empleo y Seguridad Social, en su carácter de autoridad de aplicación. Dicha homologación deberá producirse dentro de un plazo no mayor de treinta (30) días de recibida la solicitud.</p>
            </div>

            <div class="modulo">
                <h2>Módulo 10: El Resultado Esperado y Vigencia</h2>
                
                <h3>El objetivo de la Negociación Colectiva</h3>
                <p>El objetivo de la Negociación Colectiva es la conclusión de un acuerdo colectivo, la resolución de un conflicto o bien un convenio colectivo superador.</p>
                
                <h3>Período de vigencia de las Convenciones Colectivas de Trabajo</h3>
                <p>Según el art. 6 de la Ley 23.546: "...las convenciones colectivas regirán a partir de la fecha en que se dictó el acto administrativo que resuelve la homologación o el registro, según el caso."</p>
                <p>Al vencimiento del plazo, que corre desde el acto administrativo de homologación, por usos y costumbres se considera su período de 2 años como "media", pero es importante destacar que por el principio de ultraactividad del CCT mantendrá la plena vigencia de todas sus cláusulas hasta que una nueva CCT lo sustituya, salvo que se haya convenido lo contrario.</p>
                
                <h3>Rol del Sindicato en la Negociación</h3>
                <p>La negociación colectiva enfrenta el desafío de adaptarse a nuevos contextos que se presentan en el nivel global (difusión de contratos precarios, reconfiguración de actividades, cambios en los perfiles de los trabajadores, trabajo a tiempo parcial y ocasional, nuevas tecnologías, subcontratación) y que podrían implicar una individualización de las relaciones laborales si estos cambios no van acompañados por asociaciones sindicales que profundicen sus alcances de la negociación colectiva.</p>
            </div>

            <div class="modulo-bibliografia">
                <h2>📖 Bibliografía</h2>
                <ul>
                    <li>Aldao Zapiola, Carlos M. <em>La negociación. Un enfoque transdisciplinario con específicas referencias a la negociación laboral.</em> 4ª ed. revisada. Montevideo, OIT/Cinterfor, 2009.</li>
                    <li>Moreno, Omar (compilador). <em>Desafíos para el sindicalismo en la Argentina.</em> Editorial Legasa, 1993.</li>
                    <li>Tomada, Carlos y Rigat-Pflaum, María. <em>Negociación Colectiva ante el Siglo XXI. Aportes para la acción sindical.</em> Fundación Friedrich Ebert, 1998.</li>
                </ul>
            </div>
        </div>
    `
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.CAPACITACION_NEGOCIACION_COLECTIVA = CAPACITACION_NEGOCIACION_COLECTIVA;
}

console.log('✅ Capacitación: Introducción a la Negociación Colectiva cargada');