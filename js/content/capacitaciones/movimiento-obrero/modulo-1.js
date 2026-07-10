// ============================================
// MÓDULO 1: ORÍGENES DEL MOVIMIENTO OBRERO (1850-1915)
// VERSIÓN EXTENDIDA - DESARROLLO ACADÉMICO PROFUNDO
// ============================================

const MODULO_OBRERO_1 = {
    id: 'movimiento-obrero-modulo-1',
    titulo: 'Los Orígenes del Movimiento Obrero (1850-1915)',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <header class="modulo-header-academico">
                <div class="modulo-badge">Módulo 1</div>
                <h1>Los Orígenes del Movimiento Obrero Argentino</h1>
                <p class="modulo-subtitulo">De las mutuales a las primeras centrales sindicales (1850-1915)</p>
                <div class="modulo-meta-academico">
                    <span><i class="fas fa-clock"></i> Duración: 3 horas</span>
                    <span><i class="fas fa-flag"></i> Período: 1850-1915</span>
                    <span><i class="fas fa-users"></i> Protagonistas: Artesanos, inmigrantes, anarquistas, socialistas</span>
                </div>
            </header>

            <section class="modulo-intro-academico">
                <h2>Introducción</h2>
                <p>El movimiento obrero argentino no nació de la nada. Sus raíces se hunden en el siglo XIX, cuando un país agroexportador comenzaba a recibir oleadas de inmigrantes europeos que traían consigo no solo sus herramientas de trabajo, sino también las ideas del socialismo, el anarquismo y el cooperativismo. Este módulo recorre los primeros 65 años de organización de la clase trabajadora, desde las tímidas mutuales hasta la conformación de las primeras centrales sindicales que sentaron las bases de la lucha por los derechos laborales.</p>
                <p>Comprender este período es esencial para cualquier dirigente sindical, porque en él se forjaron las primeras herramientas de resistencia: la huelga, el boicot, la organización por rama de actividad, y la solidaridad internacionalista.</p>
            </section>

            <section class="modulo-objetivos">
                <h2>Objetivos de Aprendizaje</h2>
                <ul>
                    <li><i class="fas fa-check-circle"></i> Identificar las primeras formas organizativas: mutuales, cofradías y sociedades de socorros mutuos.</li>
                    <li><i class="fas fa-check-circle"></i> Analizar el impacto de la inmigración masiva en la difusión de las doctrinas del proletariado.</li>
                    <li><i class="fas fa-check-circle"></i> Describir las primeras huelgas y sus características (ferroviarios, bancarios, etc.).</li>
                    <li><i class="fas fa-check-circle"></i> Examinar el rol represivo del Estado a través de las Leyes de Residencia y Defensa Social.</li>
                    <li><i class="fas fa-check-circle"></i> Diferenciar las corrientes ideológicas: anarquismo, socialismo, sindicalismo revolucionario.</li>
                    <li><i class="fas fa-check-circle"></i> Reconocer la importancia de la FOA, FORA, UGT y CORA en la organización obrera.</li>
                </ul>
            </section>

            <section class="modulo-desarrollo">
                <h2>1. El Contexto Económico y Social (1850-1890)</h2>
                <p>La Argentina de la segunda mitad del siglo XIX era un país en formación. La economía se basaba en la exportación de materias primas (lana, cueros, luego cereales y carnes) y la importación de manufacturas. El modelo agroexportador generaba una creciente demanda de mano de obra, que se cubría con la inmigración europea.</p>
                <p>En las ciudades, comenzaban a surgir los primeros talleres artesanales y, más tarde, las incipientes fábricas. Los trabajadores, en su mayoría inmigrantes, vivían en condiciones de hacinamiento y extrema pobreza. La jornada laboral solía superar las 12 horas diarias, sin descanso semanal garantizado.</p>
                <p>Ante esta situación, los trabajadores comenzaron a organizarse, inicialmente en <strong>Asociaciones Mutuales</strong>, <strong>Cofradías Religiosas</strong> y <strong>Sociedades de Socorros Mutuos</strong>. Estas organizaciones tenían como objetivo principal la ayuda mutua: sostener a los enfermos, sepultar a los muertos y brindar auxilio en casos de desgracia. No se trataba aún de organizaciones reivindicativas, sino de autodefensa frente a la precariedad.</p>
                <div class="cita-destacada">
                    <p>"En sentido estricto no hay aún acciones reivindicativas de manera explícita. Se dan acciones de autodefensa."</p>
                    <footer>— MTEySS, Introducción al Movimiento Obrero</footer>
                </div>

                <h2>2. La Crisis de 1890 y el Despertar de la Protesta</h2>
                <p>La crisis económica de 1890, con su correlato de desempleo y aumento de la conflictividad social, marcó un punto de inflexión. Por primera vez, los trabajadores comenzaron a recurrir a la <strong>huelga</strong> como herramienta de presión.</p>
                <p>Entre 1880 y 1889, aunque no hay registros de doctrinas proletarias explícitas, hacia 1889 se contabilizan aproximadamente <strong>40 huelgas</strong> en diversos sectores: ferroviarios, bancarios, telefónicos, faroleros, barrenderos, entre otros. Estas primeras huelgas fueron, en su mayoría, espontáneas y mal organizadas, pero sentaron un precedente.</p>
                <p>La crisis de 1890 también aceleró la difusión de las <strong>doctrinas del proletariado</strong>: el anarquismo, el socialismo, el comunismo y el sindicalismo. Los inmigrantes europeos, muchos de ellos exiliados políticos, trajeron los escritos de Bakunin, Marx, Proudhon y Malatesta, que comenzaron a circular en español en los círculos obreros.</p>

                <h2>3. La Inmigración y la Difusión de las Ideas</h2>
                <p>La inmigración masiva (entre 1880 y 1914 ingresaron más de 3 millones de personas) fue el factor clave para la formación de la clase obrera argentina. Los inmigrantes no solo aportaron su fuerza de trabajo, sino también su experiencia organizativa y su ideario.</p>
                <ul>
                    <li><strong>Anarquismo:</strong> Influenciado por Bakunin y Malatesta, propugnaba la abolición del Estado y la propiedad privada, y la organización de la sociedad en federaciones de trabajadores autogestionadas. Tuvo una fuerte influencia en los primeros sindicatos argentinos.</li>
                    <li><strong>Socialismo:</strong> Inspirado en Marx y Engels, buscaba la conquista del poder político por parte de la clase obrera para transformar la sociedad. Fundó el Partido Socialista en 1896, con figuras como Juan B. Justo.</li>
                    <li><strong>Sindicalismo Revolucionario:</strong> Surgido en Francia, combinaba la acción sindical directa con una orientación revolucionaria, rechazando la política electoral y enfocándose en la organización de los trabajadores por rama de producción.</li>
                </ul>
                <p>Estas corrientes no siempre fueron antagónicas; a menudo coexistieron y se influyeron mutuamente. Pero también generaron profundas divisiones que llevaron a la fragmentación del movimiento obrero en varias centrales.</p>

                <h2>4. La Represión Estatal: Leyes de Residencia y Defensa Social</h2>
                <p>El Estado argentino, gobernado por la oligarquía conservadora, respondió a las protestas obreras con una fuerte represión. En 1902, bajo la presidencia de Julio Argentino Roca, se sancionó la <strong>Ley de Residencia</strong>, que permitía la expulsión de extranjeros "peligrosos para el orden social". Esta ley fue utilizada masivamente contra activistas anarquistas y socialistas.</p>
                <p>En 1910, durante el gobierno de José Figueroa Alcorta, se sancionó la <strong>Ley de Defensa Social</strong>, que endurecía las penas contra quienes promovieran la huelga, el boicot o la propaganda revolucionaria. Esta ley establecía penas de prisión de hasta 10 años y facultaba al Poder Ejecutivo a clausurar locales sindicales.</p>
                <div class="cita-destacada">
                    <p>"El Estado adopta fuertes prácticas represivas, como por ejemplo la sanción de las Leyes de Residencia y de Defensa Social."</p>
                    <footer>— MTEySS</footer>
                </div>

                <h2>5. Las Primeras Centrales Sindicales</h2>
                <p>En este contexto de represión y crecimiento, el movimiento obrero comenzó a articularse en centrales sindicales de alcance nacional:</p>
                <ul>
                    <li><strong>FOA (Federación Obrera Argentina), 1901:</strong> Fundada por socialistas y anarquistas, fue la primera central nacional. Tuvo una vida corta pero sentó las bases de la organización gremial.</li>
                    <li><strong>UGT (Unión General de Trabajadores), 1903:</strong> De orientación exclusivamente socialista, surgió como escisión de la FOA. Fue más moderada y buscó la negociación con el Estado.</li>
                    <li><strong>FORA (Federación Obrera Regional Argentina), 1901:</strong> Fundada en el mismo año que la FOA, pero de orientación anarquista. Adoptó el comunismo anárquico como doctrina oficial y se opuso a la participación política.</li>
                    <li><strong>CORA (Congreso Obrero Regional Argentino), 1914:</strong> Agrupó a anarquistas, socialistas y sindicalistas en un intento de unidad, pero pronto se disolvió por las diferencias ideológicas.</li>
                </ul>
                <p>En el seno de la UGT, además, nacería el <strong>Sindicalismo Revolucionario</strong> que, bajo la influencia de figuras como el francés Georges Sorel, buscaba una síntesis entre la acción directa y la organización sindical.</p>

                <h2>6. Reflexión para el Delegado Minero</h2>
                <p>Este período fundacional nos enseña varias lecciones que siguen vigentes para el sindicalismo minero del siglo XXI:</p>
                <ul>
                    <li><strong>La unidad es fundamental:</strong> La fragmentación ideológica (anarquistas vs. socialistas) debilitó al movimiento obrero y facilitó la represión estatal.</li>
                    <li><strong>La organización por rama de actividad:</strong> Las primeras centrales demostraron que la organización sectorial (ferroviarios, mineros, etc.) es más efectiva que la organización por oficio.</li>
                    <li><strong>El internacionalismo:</strong> La solidaridad entre trabajadores de distintos países sigue siendo clave en un mundo globalizado.</li>
                </ul>
                <p>Para los trabajadores mineros de San Juan, estos orígenes son un recordatorio de que la lucha por los derechos laborales no es nueva, sino que tiene más de un siglo de historia.</p>
            </section>

            <section class="modulo-evaluacion-academica">
                <h2>Autoevaluación</h2>
                <div class="pregunta">
                    <p><strong>1. ¿Cuáles fueron las primeras formas organizativas de los trabajadores en Argentina?</strong></p>
                    <details><summary>Ver respuesta</summary><p>Asociaciones Mutuales, Cofradías Religiosas y Sociedades de Socorros Mutuos.</p></details>
                </div>
                <div class="pregunta">
                    <p><strong>2. ¿Qué hecho de 1890 impulsó el crecimiento de la protesta obrera?</strong></p>
                    <details><summary>Ver respuesta</summary><p>La crisis económica, que generó desempleo y malestar social.</p></details>
                </div>
                <div class="pregunta">
                    <p><strong>3. ¿Qué doctrinas ideológicas comenzaron a difundirse entre los trabajadores?</strong></p>
                    <details><summary>Ver respuesta</summary><p>Anarquismo, socialismo, comunismo y sindicalismo revolucionario.</p></details>
                </div>
                <div class="pregunta">
                    <p><strong>4. ¿Qué ley permitía la expulsión de extranjeros "peligrosos"?</strong></p>
                    <details><summary>Ver respuesta</summary><p>Ley de Residencia de 1902.</p></details>
                </div>
                <div class="pregunta">
                    <p><strong>5. ¿Cuál fue la primera central sindical de alcance nacional en Argentina?</strong></p>
                    <details><summary>Ver respuesta</summary><p>La FOA (Federación Obrera Argentina), fundada en 1901.</p></details>
                </div>
                <div class="pregunta">
                    <p><strong>6. ¿Qué corriente ideológica predominaba en la UGT?</strong></p>
                    <details><summary>Ver respuesta</summary><p>El socialismo.</p></details>
                </div>
                <div class="pregunta">
                    <p><strong>7. ¿Qué hecho internacional influyó en la difusión de ideas obreras?</strong></p>
                    <details><summary>Ver respuesta</summary><p>La inmigración masiva de europeos, que trajo las doctrinas del proletariado.</p></details>
                </div>
                <div class="pregunta">
                    <p><strong>8. ¿Cuál fue el principal objetivo de la Ley de Defensa Social de 1910?</strong></p>
                    <details><summary>Ver respuesta</summary><p>Endurecer las penas contra la huelga y el boicot, y clausurar locales sindicales.</p></details>
                </div>
            </section>

            <section class="modulo-evaluacion-academica">
                <h2>Recursos Complementarios</h2>
                <ul>
                    <li><a href="https://www.argentina.gob.ar/normativa/nacional/ley-4144-4144" target="_blank">Texto de la Ley de Residencia (1902)</a></li>
                    <li><a href="https://www.argentina.gob.ar/normativa/nacional/ley-7028-7028" target="_blank">Texto de la Ley de Defensa Social (1910)</a></li>
                    <li><a href="https://www.ilo.org/global/topics/labour-movement/lang--es/index.htm" target="_blank">Historia del movimiento obrero internacional (OIT)</a></li>
                </ul>
            </section>
        </div>
    `,
    recursos: [
        { titulo: 'Ley de Residencia (1902)', url: 'https://www.argentina.gob.ar/normativa/nacional/ley-4144-4144' },
        { titulo: 'Ley de Defensa Social (1910)', url: 'https://www.argentina.gob.ar/normativa/nacional/ley-7028-7028' }
    ],
    evaluacion: {
        preguntas: [
            { id: 1, pregunta: '¿Qué tipo de organizaciones predominaron entre 1850 y 1870?', opciones: ['Sindicatos de oficio', 'Asociaciones Mutuales y Cofradías', 'Partidos políticos', 'Cooperativas de producción'], correcta: 1, retroalimentacion: 'Correcto. Eran formas de autodefensa y ayuda mutua.' },
            { id: 2, pregunta: '¿Qué fenómeno externo influyó fuertemente en las ideas de los trabajadores?', opciones: ['La Revolución Francesa', 'La inmigración europea', 'La independencia de EE.UU.', 'La Guerra de Malvinas'], correcta: 1, retroalimentacion: 'Correcto. Los inmigrantes trajeron las doctrinas del proletariado.' },
            { id: 3, pregunta: '¿Qué sector NO fue protagonista de las primeras huelgas en 1889?', opciones: ['Ferroviarios', 'Bancarios', 'Mineros', 'Telefónicos'], correcta: 2, retroalimentacion: 'Correcto. Aunque existían mineros, no se mencionan en las 40 huelgas de 1889.' },
            { id: 4, pregunta: '¿Cuál fue el objetivo principal de la Ley de Residencia?', opciones: ['Proteger a los trabajadores', 'Expulsar a activistas extranjeros', 'Regular el trabajo infantil', 'Crear tribunales laborales'], correcta: 1, retroalimentacion: 'Correcto. Era una herramienta represiva contra el activismo inmigrante.' },
            { id: 5, pregunta: '¿Qué central sindical era de orientación exclusivamente socialista?', opciones: ['FOA', 'UGT', 'FORA', 'CORA'], correcta: 1, retroalimentacion: 'Correcto. La UGT era la central socialista.' },
            { id: 6, pregunta: '¿Qué corriente ideológica propugnaba la abolición del Estado?', opciones: ['Socialismo', 'Anarquismo', 'Sindicalismo revolucionario', 'Comunismo'], correcta: 1, retroalimentacion: 'Correcto. El anarquismo buscaba la abolición del Estado.' },
            { id: 7, pregunta: '¿Qué ley de 1910 endureció las penas contra la huelga?', opciones: ['Ley de Residencia', 'Ley de Defensa Social', 'Ley de Contrato de Trabajo', 'Ley de Asociaciones Sindicales'], correcta: 1, retroalimentacion: 'Correcto. La Ley de Defensa Social de 1910.' },
            { id: 8, pregunta: '¿Qué corriente influyó en la UGT para dar origen al Sindicalismo Revolucionario?', opciones: ['Anarquismo', 'Marxismo', 'Sorelismo', 'Feminismo'], correcta: 2, retroalimentacion: 'Correcto. El Sindicalismo Revolucionario se inspiró en Georges Sorel.' }
        ]
    }
};

if (typeof window !== 'undefined') { window.MODULO_OBRERO_1 = MODULO_OBRERO_1; }
console.log('✅ Módulo 1 (Extendido) cargado: Orígenes del Movimiento Obrero');