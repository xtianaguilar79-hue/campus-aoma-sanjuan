// ============================================
// CAPACITACIÓN: NEGOCIACIÓN COLECTIVA PARA DELEGADOS MINEROS
// ============================================

const CAPACITACION_NEGOCIACION_COLECTIVA = {
    id: 7,
    titulo: 'Negociación Colectiva para Delegados Mineros',
    categoria: 'Gremial',
    actividad: 'general',
    instructor: 'Programa de Apoyo a la Formación Sindical - MTEySS',
    duracion: '16 horas',
    nivel: 'Intermedio',
    imagen: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
    descripcion: 'Curso completo sobre negociación colectiva para delegados gremiales del sector minero.',
    modulos: 8,
    contenido: `
        <div class="curso-completo-container">
            <style>
                .curso-completo-container * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                .curso-completo-container {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .curso-header-completo {
                    background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
                    color: white;
                    padding: 40px 30px;
                    text-align: center;
                    border-radius: 15px 15px 0 0;
                    margin-bottom: 0;
                }
                .curso-header-completo h1 {
                    font-size: 2.2em;
                    margin-bottom: 10px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }
                .curso-progress-bar {
                    background: #ecf0f1;
                    height: 10px;
                    position: relative;
                    border-radius: 5px;
                    overflow: hidden;
                    margin: 0;
                }
                .curso-progress-fill {
                    background: linear-gradient(90deg, #27ae60, #2ecc71);
                    height: 100%;
                    width: 0%;
                    transition: width 0.5s;
                }
                .curso-nav-completo {
                    background: #2c3e50;
                    padding: 15px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    justify-content: center;
                    border-radius: 0;
                }
                .curso-nav-completo button {
                    background: #34495e;
                    color: white;
                    border: none;
                    padding: 10px 18px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.95em;
                    transition: all 0.3s;
                }
                .curso-nav-completo button:hover {
                    background: #e67e22;
                    transform: translateY(-2px);
                }
                .curso-nav-completo button.active {
                    background: #d35400;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                }
                .curso-content-area {
                    padding: 40px;
                    min-height: 600px;
                    background: white;
                }
                .curso-modulo-content {
                    display: none;
                    animation: fadeIn 0.6s;
                }
                .curso-modulo-content.active {
                    display: block;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .curso-content-area h2 {
                    color: #d35400;
                    border-bottom: 3px solid #e67e22;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    font-size: 1.8em;
                }
                .curso-content-area h3 {
                    color: #2c3e50;
                    margin: 25px 0 15px;
                    font-size: 1.4em;
                }
                .curso-content-area h4 {
                    color: #16a085;
                    margin: 20px 0 10px;
                    font-size: 1.15em;
                }
                .curso-content-area p {
                    line-height: 1.8;
                    margin-bottom: 15px;
                    text-align: justify;
                    font-size: 1.05em;
                }
                .curso-highlight {
                    background: #fff3cd;
                    border-left: 5px solid #ffc107;
                    padding: 15px 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                }
                .curso-warning {
                    background: #f8d7da;
                    border-left: 5px solid #dc3545;
                    padding: 15px 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                }
                .curso-success {
                    background: #d4edda;
                    border-left: 5px solid #28a745;
                    padding: 15px 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                }
                .curso-info {
                    background: #d1ecf1;
                    border-left: 5px solid #17a2b8;
                    padding: 15px 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                }
                .curso-quote {
                    background: #f8f9fa;
                    border-left: 5px solid #6c757d;
                    padding: 15px 20px;
                    margin: 20px 0;
                    font-style: italic;
                    border-radius: 8px;
                }
                .curso-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    background: white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .curso-table th {
                    background: #d35400;
                    color: white;
                    padding: 12px;
                    text-align: left;
                }
                .curso-table td {
                    padding: 12px;
                    border-bottom: 1px solid #ecf0f1;
                }
                .curso-table tr:hover {
                    background: #f8f9fa;
                }
                .curso-code-box {
                    background: #2c3e50;
                    color: #ecf0f1;
                    padding: 15px;
                    border-radius: 8px;
                    font-family: 'Courier New', monospace;
                    margin: 15px 0;
                    overflow-x: auto;
                }
                .curso-pyramid {
                    text-align: center;
                    margin: 20px 0;
                }
                .curso-pyramid-level {
                    background: linear-gradient(90deg, #e67e22, #d35400);
                    color: white;
                    padding: 12px;
                    margin: 5px auto;
                    border-radius: 8px;
                    font-weight: bold;
                }
                .curso-quiz {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    border: 2px solid #3498db;
                }
                .curso-quiz h4 {
                    color: #3498db;
                }
                .curso-quiz-option {
                    display: block;
                    background: white;
                    padding: 12px 15px;
                    margin: 8px 0;
                    border-radius: 8px;
                    cursor: pointer;
                    border: 2px solid #bdc3c7;
                    transition: all 0.3s;
                }
                .curso-quiz-option:hover {
                    border-color: #3498db;
                    background: #ecf0f1;
                }
                .curso-quiz-option.correct {
                    background: #d4edda;
                    border-color: #28a745;
                }
                .curso-quiz-option.incorrect {
                    background: #f8d7da;
                    border-color: #dc3545;
                }
                .curso-quiz-feedback {
                    margin-top: 15px;
                    padding: 12px;
                    border-radius: 8px;
                    display: none;
                }
                .curso-btn {
                    background: linear-gradient(135deg, #d35400, #e67e22);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1em;
                    font-weight: bold;
                    transition: all 0.3s;
                    margin: 10px 5px;
                }
                .curso-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(211,84,0,0.4);
                }
                .curso-btn-secondary {
                    background: linear-gradient(135deg, #34495e, #2c3e50);
                }
                .curso-btn-success {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                }
                .curso-case-study {
                    background: linear-gradient(135deg, #fff5e6, #ffe8cc);
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    border-left: 5px solid #d35400;
                }
                .curso-case-study h4 {
                    color: #d35400;
                }
                .curso-accordion {
                    background: #ecf0f1;
                    margin: 10px 0;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .curso-accordion-header {
                    background: #34495e;
                    color: white;
                    padding: 15px;
                    cursor: pointer;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .curso-accordion-header:hover {
                    background: #2c3e50;
                }
                .curso-accordion-content {
                    padding: 0;
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.4s;
                    background: white;
                }
                .curso-accordion-content.open {
                    padding: 20px;
                    max-height: 2000px;
                }
                .curso-grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin: 20px 0;
                }
                .curso-card {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    border-top: 4px solid #d35400;
                }
                .curso-card h4 {
                    margin-top: 0;
                }
                .curso-module-intro {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    padding: 25px;
                    border-radius: 10px;
                    margin-bottom: 25px;
                }
                .curso-module-intro h2 {
                    color: white;
                    border-bottom: 3px solid white;
                }
                .curso-module-intro p {
                    color: white;
                }
                .curso-badge {
                    display: inline-block;
                    background: #e67e22;
                    color: white;
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-size: 0.85em;
                    margin-right: 5px;
                }
                .curso-glossary-item {
                    background: #f8f9fa;
                    padding: 12px;
                    margin: 8px 0;
                    border-radius: 8px;
                    border-left: 4px solid #16a085;
                }
                .curso-glossary-item strong {
                    color: #16a085;
                }
                .curso-final-score {
                    text-align: center;
                    padding: 30px;
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                    color: white;
                    border-radius: 15px;
                    margin: 20px 0;
                }
                .curso-final-score h2 {
                    color: white;
                    border: none;
                    font-size: 2.5em;
                }
                .curso-navigation-buttons {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 40px;
                    background: #ecf0f1;
                    border-radius: 0 0 15px 15px;
                }
                .curso-footer {
                    background: #2c3e50;
                    color: white;
                    text-align: center;
                    padding: 20px;
                    border-radius: 0 0 15px 15px;
                    margin-top: 20px;
                }
                ul, ol {
                    margin: 15px 0 15px 30px;
                    line-height: 1.8;
                }
                li {
                    margin-bottom: 8px;
                }
                @media (max-width: 768px) {
                    .curso-grid-2 {
                        grid-template-columns: 1fr;
                    }
                    .curso-header-completo h1 {
                        font-size: 1.5em;
                    }
                    .curso-content-area {
                        padding: 20px;
                    }
                    .curso-nav-completo button {
                        padding: 8px 12px;
                        font-size: 0.85em;
                    }
                }
            </style>

            <div class="curso-header-completo">
                <h1>⛏️ NEGOCIACIÓN COLECTIVA PARA DELEGADOS MINEROS</h1>
                <p>"De la Mina al Convenio: Herramientas para Defender Derechos"</p>
                <p style="margin-top:10px; font-size:0.95em;">Programa de Formación Sindical | 16 horas cátedra</p>
            </div>

            <div class="curso-progress-bar">
                <div class="curso-progress-fill" id="cursoProgressFill"></div>
            </div>

            <nav class="curso-nav-completo">
                <button onclick="cursoShowModule(0)" class="active" id="cursoNav0">🏠 Inicio</button>
                <button onclick="cursoShowModule(1)" id="cursoNav1">📘 Módulo 1</button>
                <button onclick="cursoShowModule(2)" id="cursoNav2">🗺️ Módulo 2</button>
                <button onclick="cursoShowModule(3)" id="cursoNav3">🛤️ Módulo 3</button>
                <button onclick="cursoShowModule(4)" id="cursoNav4">🔧 Módulo 4</button>
                <button onclick="cursoShowModule(5)" id="cursoNav5">💼 Módulo 5</button>
                <button onclick="cursoShowModule(6)" id="cursoNav6">📝 Evaluación</button>
                <button onclick="cursoShowModule(7)" id="cursoNav7">📚 Glosario</button>
            </nav>

            <div class="curso-content-area">
                <!-- MÓDULO 0: INICIO -->
                <div class="curso-modulo-content active" id="cursoModule0">
                    <div class="curso-module-intro">
                        <h2>🎯 Bienvenida al Curso</h2>
                        <p>Estimado delegado/a: este curso ha sido diseñado especialmente para vos, que representás a los trabajadores mineros en tu empresa o yacimiento. Aquí vas a encontrar todo lo que necesitás saber para participar activamente en una negociación colectiva.</p>
                    </div>

                    <h3>📋 ¿Qué vas a aprender?</h3>
                    <div class="curso-grid-2">
                        <div class="curso-card">
                            <h4>📘 Módulo 1: Los Cimientos</h4>
                            <p>Qué es negociar, por qué lo hacemos y los supuestos fundamentales. Entenderás el conflicto como herramienta, no como enemigo.</p>
                        </div>
                        <div class="curso-card">
                            <h4>🗺️ Módulo 2: El Mapa</h4>
                            <p>Marco normativo, actores del sistema, tipos de acuerdos. Conocerás la pirámide legal y quién hace qué en la mesa.</p>
                        </div>
                        <div class="curso-card">
                            <h4>🛤️ Módulo 3: El Camino</h4>
                            <p>Las 8 etapas paso a paso de la negociación. Desde la convocatoria hasta la homologación, sin perderte.</p>
                        </div>
                        <div class="curso-card">
                            <h4>🔧 Módulo 4: La Práctica</h4>
                            <p>Técnicas, habilidades, estrategia. Cómo prepararte, cómo negociar, cómo evitar errores fatales.</p>
                        </div>
                        <div class="curso-card">
                            <h4>💼 Módulo 5: Casos Mineros</h4>
                            <p>Tres casos reales del sector minero para aplicar todo lo aprendido. Role-playing incluido.</p>
                        </div>
                        <div class="curso-card">
                            <h4>📝 Evaluación Final</h4>
                            <p>20 preguntas + trabajo práctico. Al aprobar obtenés tu certificado de capacitación.</p>
                        </div>
                    </div>

                    <div class="curso-success">
                        <h4>✅ Antes de comenzar</h4>
                        <p>Tené a mano: un cuaderno para tomar notas, tu convenio colectivo vigente (si lo tenés), y muchas ganas de aprender. ¡Vamos!</p>
                    </div>

                    <div style="text-align:center; margin-top:30px;">
                        <button class="curso-btn curso-btn-success" onclick="cursoShowModule(1)">🚀 COMENZAR EL CURSO</button>
                    </div>
                </div>

                <!-- MÓDULO 1 -->
                <div class="curso-modulo-content" id="cursoModule1">
                    <div class="curso-module-intro">
                        <h2>📘 MÓDULO 1: LOS CIMIENTOS</h2>
                        <p>Antes de sentarnos en una mesa de negociación, tenemos que entender qué es negociar, por qué lo hacemos y qué supuestos hacen posible que dos partes con intereses distintos lleguen a un acuerdo.</p>
                    </div>

                    <h3>1.1 ¿Qué es la Negociación Colectiva?</h3>
                    <p>La <strong>Organización Internacional del Trabajo (OIT)</strong>, en su Convenio 154 de 1981, define la negociación colectiva así:</p>
                    <div class="curso-quote">
                        <p>"Comprende todas las negociaciones que tienen lugar entre un empleador, un grupo de empleadores, una organización o varias organizaciones de empleadores, por una parte, y una organización o varias organizaciones de trabajadores por otra, con el fin de fijar condiciones de trabajo y empleo; o regular las relaciones entre empleadores y trabajadores."</p>
                    </div>

                    <h4>🔨 Traducción al lenguaje minero</h4>
                    <p>Imaginate que la negociación colectiva es como <strong>planificar la explotación de un yacimiento</strong>. No se hace de cualquier manera:</p>
                    <ul>
                        <li>Hay que saber <strong>dónde</strong> están los minerales → los problemas de los trabajadores.</li>
                        <li>Hay que tener <strong>herramientas</strong> → las leyes y el convenio.</li>
                        <li>Hay que trabajar en <strong>equipo</strong> → la comisión negociadora.</li>
                        <li>Hay que llegar a un <strong>plan acordado</strong> → el convenio firmado.</li>
                    </ul>

                    <div class="curso-code-box">
                        FÓRMULA CLAVE:<br>
                        NEGOCIACIÓN COLECTIVA = DIÁLOGO + CONFLICTO + ACUERDO ESCRITO
                    </div>

                    <h3>1.2 Los 4 Supuestos de la Negociación Colectiva</h3>
                    <p>Toda negociación se sostiene sobre <strong>cuatro pilares</strong>. Si falta uno, la mesa se cae:</p>

                    <div class="curso-grid-2">
                        <div class="curso-card">
                            <h4>🤝 1. Reconocimiento</h4>
                            <p>Ambas partes se reconocen como <strong>legítimas</strong> para sentarse a negociar.</p>
                        </div>
                        <div class="curso-card">
                            <h4>🔗 2. Interdependencia</h4>
                            <p>Ninguna parte puede resolver los problemas <strong>sola</strong>.</p>
                        </div>
                        <div class="curso-card">
                            <h4>⚔️ 3. Conflicto de intereses</h4>
                            <p>Las partes quieren <strong>cosas distintas</strong>. Ese conflicto es natural y necesario.</p>
                        </div>
                        <div class="curso-card">
                            <h4>🎯 4. Expectativa de acuerdo</h4>
                            <p>Ambas partes creen que es <strong>posible</strong> llegar a un pacto.</p>
                        </div>
                    </div>

                    <div class="curso-warning">
                        <h4>⚠️ Atención, delegado</h4>
                        <p>Si en tu empresa la patronal <strong>no reconoce</strong> al sindicato, o si las bases <strong>no creen</strong> que se pueda llegar a un acuerdo, tenés que trabajar primero en fortalecer esos supuestos antes de sentarte a la mesa.</p>
                    </div>

                    <h3>1.3 Conflicto ≠ Enemistad</h3>
                    <div class="curso-highlight">
                        <h4>💡 Concepto clave</h4>
                        <p>El conflicto es <strong>natural</strong> y <strong>necesario</strong>. No es pelearse, es reconocer que hay intereses distintos.</p>
                        <p style="margin-top:10px;"><strong>Analogía minera:</strong> "El conflicto es como la roca que hay que perforar. No es tu enemigo: es el material con el que trabajás. Si no hay roca, no hay mina. Si no hay conflicto, no hay negociación."</p>
                    </div>

                    <div style="text-align:center; margin-top:30px;">
                        <button class="curso-btn" onclick="cursoShowModule(2)">Siguiente: Módulo 2 →</button>
                    </div>
                </div>

                <!-- MÓDULO 2 -->
                <div class="curso-modulo-content" id="cursoModule2">
                    <div class="curso-module-intro">
                        <h2>🗺️ MÓDULO 2: EL MAPA NORMATIVO</h2>
                        <p>Antes de sentarte a negociar, necesitás conocer el terreno: las leyes que te respaldan, los actores que están en la mesa y los tipos de acuerdos que podés firmar.</p>
                    </div>

                    <h3>2.1 La pirámide normativa</h3>
                    <p>Todo acuerdo se construye sobre una base legal. Imaginá una <strong>pirámide de 5 pisos</strong>:</p>

                    <div class="curso-pyramid">
                        <div class="curso-pyramid-level" style="width:40%;">CONSTITUCIÓN NACIONAL (Art. 14 bis)</div>
                        <div class="curso-pyramid-level" style="width:55%;">TRATADOS INTERNACIONALES (OIT)</div>
                        <div class="curso-pyramid-level" style="width:70%;">LEYES NACIONALES</div>
                        <div class="curso-pyramid-level" style="width:85%;">CONVENIO COLECTIVO</div>
                        <div class="curso-pyramid-level" style="width:100%;">CONTRATO INDIVIDUAL</div>
                    </div>

                    <div class="curso-highlight">
                        <h4>🏆 Regla de oro: Principio de la norma más favorable</h4>
                        <p>Siempre gana lo <strong>más favorable para el trabajador</strong>.</p>
                    </div>

                    <h3>2.2 La Constitución Nacional: Art. 14 bis</h3>
                    <div class="curso-quote">
                        <p>"Queda garantizado a los gremios: <strong>concertar convenios colectivos de trabajo</strong>; recurrir a la <strong>conciliación y al arbitraje</strong>; el <strong>derecho de huelga</strong>."</p>
                    </div>

                    <h3>2.3 Los actores del sistema</h3>
                    <table class="curso-table">
                        <tr><th>Actor</th><th>Quién es</th><th>Su rol</th></tr>
                        <tr><td><strong>Sindicato</strong></td><td>Tu gremio (AOMA)</td><td>Representa a todos los trabajadores</td></tr>
                        <tr><td><strong>Empresa</strong></td><td>Empleador</td><td>Representa al empleador</td></tr>
                        <tr><td><strong>Asesores técnicos</strong></td><td>Abogados, contadores</td><td>Tienen voz pero NO voto</td></tr>
                        <tr><td><strong>Ministerio de Trabajo</strong></td><td>Estado</td><td>Homologa y controla</td></tr>
                    </table>

                    <div style="text-align:center; margin-top:30px;">
                        <button class="curso-btn curso-btn-secondary" onclick="cursoShowModule(1)">← Anterior</button>
                        <button class="curso-btn" onclick="cursoShowModule(3)">Siguiente: Módulo 3 →</button>
                    </div>
                </div>

                <!-- MÓDULO 3 -->
                <div class="curso-modulo-content" id="cursoModule3">
                    <div class="curso-module-intro">
                        <h2>🛤️ MÓDULO 3: EL CAMINO - PASO A PASO</h2>
                        <p>Ahora que conocés el terreno, vamos a recorrer el camino completo: las 8 etapas que van desde la convocatoria hasta la homologación del acuerdo.</p>
                    </div>

                    <h3>3.1 Las 8 etapas de la negociación</h3>
                    <div class="curso-code-box">
                        INICIO → REQUISITOS → COMISIÓN → ÁMBITO → MATERIAS → BUENA FE → DESARROLLO → CIERRE
                    </div>

                    <h3>3.2 ETAPA 1: El inicio</h3>
                    <p>La convocatoria debe ser <strong>escrita</strong> y notificada a la otra parte con copia al Ministerio de Trabajo.</p>
                    <div class="curso-highlight">
                        <h4>⏰ Plazo clave</h4>
                        <p>La otra parte tiene <strong>15 días</strong> desde la recepción para responder.</p>
                    </div>

                    <h3>3.3 ETAPA 2-3: Requisitos y Comisión</h3>
                    <ul>
                        <li>La comisión debe tener <strong>número igual</strong> de representantes de ambos lados.</li>
                        <li>Desde la Ley 25.674: <strong>cupo femenino del 30%</strong>.</li>
                    </ul>

                    <h3>3.4 ETAPA 6: Deber de negociar de buena fe</h3>
                    <p>Las partes están obligadas a:</p>
                    <ol>
                        <li><strong>Concurrir</strong> a las reuniones.</li>
                        <li><strong>Designar negociadores</strong> con mandato suficiente.</li>
                        <li><strong>Intercambiar información</strong> necesaria.</li>
                        <li><strong>Realizar esfuerzos</strong> conducentes a lograr acuerdos.</li>
                    </ol>

                    <div class="curso-warning">
                        <h4>🚨 Mala fe = Práctica desleal</h4>
                        <ul>
                            <li>Negarse a negociar.</li>
                            <li>Dilatar sin motivo.</li>
                            <li>No dar información.</li>
                        </ul>
                    </div>

                    <div style="text-align:center; margin-top:30px;">
                        <button class="curso-btn curso-btn-secondary" onclick="cursoShowModule(2)">← Anterior</button>
                        <button class="curso-btn" onclick="cursoShowModule(4)">Siguiente: Módulo 4 →</button>
                    </div>
                </div>

                <!-- MÓDULO 4 -->
                <div class="curso-modulo-content" id="cursoModule4">
                    <div class="curso-module-intro">
                        <h2>🔧 MÓDULO 4: LA PRÁCTICA</h2>
                        <p>Ya conocés la teoría. Ahora vamos a la práctica: cómo prepararte, qué habilidades desarrollar, qué técnicas usar y qué errores evitar.</p>
                    </div>

                    <h3>4.1 Las 5 habilidades del negociador minero</h3>
                    <table class="curso-table">
                        <tr><th>Habilidad</th><th>Descripción</th></tr>
                        <tr><td><strong>👂 Escucha activa</strong></td><td>Oír lo que el otro dice y lo que calla</td></tr>
                        <tr><td><strong>🗣️ Oratoria clara</strong></td><td>Hablar con precisión y firmeza</td></tr>
                        <tr><td><strong>🎯 Negociación por intereses</strong></td><td>No pelear por posiciones, sino por necesidades</td></tr>
                        <tr><td><strong>⚡ Manejo del conflicto</strong></td><td>No evitarlo, transformarlo</td></tr>
                        <tr><td><strong>💡 Creatividad</strong></td><td>Encontrar soluciones no obvias</td></tr>
                    </table>

                    <h3>4.2 La técnica de Harvard</h3>
                    <div class="curso-grid-2">
                        <div class="curso-card">
                            <h4>1️⃣ Separar personas del problema</h4>
                            <p>No atacar al gerente, atacar la política.</p>
                        </div>
                        <div class="curso-card">
                            <h4>2️⃣ Intereses, no posiciones</h4>
                            <p>"No pedimos más plata, pedimos compensar el aislamiento"</p>
                        </div>
                        <div class="curso-card">
                            <h4>3️⃣ Opciones de mutuo beneficio</h4>
                            <p>Ampliar el menú antes de decidir.</p>
                        </div>
                        <div class="curso-card">
                            <h4>4️⃣ Criterios objetivos</h4>
                            <p>Canasta familiar, IPC, salarios comparables.</p>
                        </div>
                    </div>

                    <div style="text-align:center; margin-top:30px;">
                        <button class="curso-btn curso-btn-secondary" onclick="cursoShowModule(3)">← Anterior</button>
                        <button class="curso-btn" onclick="cursoShowModule(5)">Siguiente: Módulo 5 →</button>
                    </div>
                </div>

                <!-- MÓDULO 5 -->
                <div class="curso-modulo-content" id="cursoModule5">
                    <div class="curso-module-intro">
                        <h2>💼 MÓDULO 5: CASOS PRÁCTICOS</h2>
                        <p>Es hora de aplicar todo lo aprendido. Vamos a analizar casos reales del sector minero.</p>
                    </div>

                    <h3>📖 Caso 1: "La guardia eterna"</h3>
                    <div class="curso-case-study">
                        <h4>🏔️ Situación</h4>
                        <p>En una mina a cielo abierto, los operarios hacen guardias de <strong>14x7</strong>. La empresa quiere pasar a <strong>21x7</strong> sin aumento.</p>
                    </div>

                    <h4>💡 Solución negociada propuesta:</h4>
                    <ul>
                        <li>Aceptar 21x7 <strong>solo con un plus del 30%</strong>.</li>
                        <li><strong>Examen médico psicológico</strong> previo.</li>
                        <li><strong>Cláusula de desconexión digital</strong> durante los 7 días.</li>
                    </ul>

                    <h3>📖 Caso 2: "El accidente que no fue"</h3>
                    <div class="curso-case-study">
                        <h4>⚠️ Situación</h4>
                        <p>Un trabajador sufre un accidente. La empresa ofrece <strong>pago en negro</strong> para que no haga el reclamo.</p>
                    </div>

                    <div class="curso-warning">
                        <h4>🚨 Acción correcta del delegado:</h4>
                        <ol>
                            <li><strong>Denuncia ante la ART</strong>.</li>
                            <li><strong>Notificación al Ministerio</strong>.</li>
                            <li><strong>Inclusión en la negociación</strong> como "cláusula de seguridad".</li>
                        </ol>
                    </div>

                    <div style="text-align:center; margin-top:30px;">
                        <button class="curso-btn curso-btn-secondary" onclick="cursoShowModule(4)">← Anterior</button>
                        <button class="curso-btn" onclick="cursoShowModule(6)">Siguiente: Evaluación →</button>
                    </div>
                </div>

                <!-- MÓDULO 6: EVALUACIÓN -->
                <div class="curso-modulo-content" id="cursoModule6">
                    <div class="curso-module-intro">
                        <h2>📝 EVALUACIÓN FINAL</h2>
                        <p>Respondé las 20 preguntas y aprobá con el 70% para obtener tu certificado.</p>
                    </div>

                    <div id="cursoQuizContainer">
                        <div class="curso-quiz">
                            <h4>Pregunta 1: ¿Cuál NO es un supuesto de la negociación colectiva?</h4>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb1')">a) Reconocimiento mutuo</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb1')">b) Interdependencia</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, true, 'cursoFb1')">c) Ausencia total de conflicto</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb1')">d) Expectativa de acuerdo</div>
                            <div class="curso-quiz-feedback" id="cursoFb1"></div>
                        </div>

                        <div class="curso-quiz">
                            <h4>Pregunta 2: ¿Qué artículo de la CN garantiza concertar convenios?</h4>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb2')">a) Artículo 14</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, true, 'cursoFb2')">b) Artículo 14 bis</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb2')">c) Artículo 75</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb2')">d) Artículo 99</div>
                            <div class="curso-quiz-feedback" id="cursoFb2"></div>
                        </div>

                        <div class="curso-quiz">
                            <h4>Pregunta 3: ¿Cuántos días tiene la otra parte para responder?</h4>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb3')">a) 10 días</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, true, 'cursoFb3')">b) 15 días</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb3')">c) 30 días</div>
                            <div class="curso-quiz-option" onclick="cursoCheckAnswer(this, false, 'cursoFb3')">d) 5 días</div>
                            <div class="curso-quiz-feedback" id="cursoFb3"></div>
                        </div>
                    </div>

                    <div style="text-align:center; margin-top:30px;">
                        <button class="curso-btn curso-btn-secondary" onclick="cursoShowModule(5)">← Anterior</button>
                        <button class="curso-btn curso-btn-success" onclick="cursoCalcularResultado()">📊 VER RESULTADO</button>
                    </div>

                    <div id="cursoResultadoFinal" style="display:none;"></div>
                </div>

                <!-- MÓDULO 7: GLOSARIO -->
                <div class="curso-modulo-content" id="cursoModule7">
                    <div class="curso-module-intro">
                        <h2>📚 GLOSARIO</h2>
                        <p>Todos los términos clave que debés conocer.</p>
                    </div>

                    <div class="curso-glossary-item">
                        <strong>Personería gremial:</strong> Reconocimiento estatal del sindicato como representante más idóneo.
                    </div>

                    <div class="curso-glossary-item">
                        <strong>Homologación:</strong> Aprobación del Ministerio de Trabajo al acuerdo alcanzado.
                    </div>

                    <div class="curso-glossary-item">
                        <strong>Comisión paritaria:</strong> Órgano integrado por igual número de representantes de trabajadores y empleadores.
                    </div>

                    <div class="curso-glossary-item">
                        <strong>Ultraactividad:</strong> Principio por el cual el CCT sigue vigente tras su vencimiento.
                    </div>

                    <div class="curso-glossary-item">
                        <strong>Práctica desleal:</strong> Conducta que obstruye o dilata la negociación.
                    </div>

                    <div class="curso-success" style="margin-top:30px;">
                        <h4>🎓 ¡Felicitaciones!</h4>
                        <p>Completaste el curso de Negociación Colectiva. Ahora tenés las herramientas para defender los derechos de los trabajadores mineros.</p>
                    </div>

                    <div style="text-align:center; margin-top:30px;">
                        <button class="curso-btn curso-btn-secondary" onclick="cursoShowModule(6)">← Anterior</button>
                        <button class="curso-btn" onclick="cursoShowModule(0)">🏠 Volver al Inicio</button>
                    </div>
                </div>
            </div>

            <div class="curso-navigation-buttons">
                <button class="curso-btn curso-btn-secondary" onclick="cursoPrevModule()">← Anterior</button>
                <button class="curso-btn" onclick="cursoNextModule()">Siguiente →</button>
            </div>

            <div class="curso-footer">
                <p>Programa de Apoyo a la Formación Sindical | Ministerio de Trabajo</p>
                <p style="margin-top:10px; font-size:0.9em;">Curso diseñado para delegados gremiales del sector minero</p>
            </div>

            <script>
                let cursoCurrentModule = 0;
                const cursoTotalModules = 8;
                let cursoRespuestas = {};

                function cursoShowModule(n) {
                    // Ocultar todos los módulos
                    document.querySelectorAll('.curso-modulo-content').forEach(m => {
                        m.classList.remove('active');
                    });
                    
                    // Desactivar todos los botones
                    document.querySelectorAll('.curso-nav-completo button').forEach(b => {
                        b.classList.remove('active');
                    });
                    
                    // Mostrar módulo actual
                    const moduleEl = document.getElementById('cursoModule' + n);
                    const navEl = document.getElementById('cursoNav' + n);
                    
                    if (moduleEl) {
                        moduleEl.classList.add('active');
                    }
                    if (navEl) {
                        navEl.classList.add('active');
                    }
                    
                    cursoCurrentModule = n;
                    cursoUpdateProgress();
                    
                    // Scroll al inicio
                    const container = document.querySelector('.curso-completo-container');
                    if (container) {
                        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }

                function cursoNextModule() {
                    if (cursoCurrentModule < cursoTotalModules - 1) {
                        cursoShowModule(cursoCurrentModule + 1);
                    }
                }

                function cursoPrevModule() {
                    if (cursoCurrentModule > 0) {
                        cursoShowModule(cursoCurrentModule - 1);
                    }
                }

                function cursoUpdateProgress() {
                    const progress = (cursoCurrentModule / (cursoTotalModules - 1)) * 100;
                    const progressEl = document.getElementById('cursoProgressFill');
                    if (progressEl) {
                        progressEl.style.width = progress + '%';
                    }
                }

                function cursoCheckAnswer(element, isCorrect, feedbackId) {
                    const parent = element.parentElement;
                    const options = parent.querySelectorAll('.curso-quiz-option');
                    
                    // Deshabilitar todas las opciones
                    options.forEach(opt => {
                        opt.style.pointerEvents = 'none';
                    });
                    
                    const feedbackEl = document.getElementById(feedbackId);
                    
                    if (isCorrect) {
                        element.classList.add('correct');
                        if (feedbackEl) {
                            feedbackEl.innerHTML = '<div class="curso-success">✅ ¡Correcto! Excelente respuesta.</div>';
                            feedbackEl.style.display = 'block';
                        }
                    } else {
                        element.classList.add('incorrect');
                        // Marcar la correcta
                        options.forEach(opt => {
                            if (opt.onclick && opt.onclick.toString().includes('true')) {
                                opt.classList.add('correct');
                            }
                        });
                        if (feedbackEl) {
                            feedbackEl.innerHTML = '<div class="curso-warning">❌ Incorrecto. Revisá el contenido.</div>';
                            feedbackEl.style.display = 'block';
                        }
                    }
                }

                function cursoCalcularResultado() {
                    const correctas = document.querySelectorAll('.curso-quiz-option.correct').length;
                    const total = 3; // Número de preguntas de ejemplo
                    
                    const resultadoEl = document.getElementById('cursoResultadoFinal');
                    if (resultadoEl) {
                        const porcentaje = Math.round((correctas / total) * 100);
                        
                        if (porcentaje >= 70) {
                            resultadoEl.innerHTML = \`
                                <div class="curso-final-score">
                                    <h2>🎉 ¡APROBASTE!</h2>
                                    <p style="font-size:1.5em;">Obtuviste \${correctas}/\${total} (\${porcentaje}%)</p>
                                    <p style="margin-top:20px;">¡Felicitaciones! Completaste el curso.</p>
                                </div>
                            \`;
                        } else {
                            resultadoEl.innerHTML = \`
                                <div class="curso-warning" style="text-align:center; padding:30px;">
                                    <h2>📚 Seguimos estudiando</h2>
                                    <p style="font-size:1.3em;">Obtuviste \${correctas}/\${total} (\${porcentaje}%)</p>
                                    <p>Necesitás 70% para aprobar. ¡Seguí intentando!</p>
                                </div>
                            \`;
                        }
                        resultadoEl.style.display = 'block';
                        resultadoEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }

                // Inicializar al cargar
                document.addEventListener('DOMContentLoaded', function() {
                    cursoUpdateProgress();
                });
            <\/script>
        </div>
    `
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.CAPACITACION_NEGOCIACION_COLECTIVA = CAPACITACION_NEGOCIACION_COLECTIVA;
}

console.log('✅ Capacitación: Negociación Colectiva cargada correctamente');