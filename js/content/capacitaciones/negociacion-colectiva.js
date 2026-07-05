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
    descripcion: 'Curso completo sobre negociación colectiva para delegados gremiales del sector minero. Incluye 5 módulos teóricos, casos prácticos, evaluación final y certificado.',
    modulos: 8,
    contenido: `
        <div id="curso-negociacion">
            <style>
                #curso-negociacion { 
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                    max-width: 100%;
                }
                .modulo-curso { 
                    display: none; 
                    padding: 20px; 
                    animation: fadeIn 0.5s;
                    background: white;
                    border-radius: 10px;
                }
                .modulo-curso.activo { 
                    display: block; 
                }
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translateY(20px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .titulo-modulo { 
                    color: #16a085; 
                    border-bottom: 3px solid #e67e22; 
                    padding-bottom: 10px; 
                    margin: 20px 0;
                    font-size: 1.8em;
                }
                .contenido-texto { 
                    line-height: 1.8; 
                    text-align: justify; 
                    margin: 15px 0;
                    font-size: 1.05em;
                }
                .highlight { 
                    background: #fff3cd; 
                    border-left: 5px solid #ffc107; 
                    padding: 15px; 
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .warning { 
                    background: #f8d7da; 
                    border-left: 5px solid #dc3545; 
                    padding: 15px; 
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .success { 
                    background: #d4edda; 
                    border-left: 5px solid #28a745; 
                    padding: 15px; 
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .info { 
                    background: #d1ecf1; 
                    border-left: 5px solid #17a2b8; 
                    padding: 15px; 
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .tabla-curso { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 20px 0;
                    background: white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .tabla-curso th { 
                    background: #d35400; 
                    color: white; 
                    padding: 12px; 
                    text-align: left;
                    font-weight: 600;
                }
                .tabla-curso td { 
                    padding: 12px; 
                    border-bottom: 1px solid #ecf0f1;
                }
                .tabla-curso tr:hover {
                    background: #f8f9fa;
                }
                .grid-2 { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 20px; 
                    margin: 20px 0;
                }
                .card-curso { 
                    background: white; 
                    padding: 20px; 
                    border-radius: 10px; 
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
                    border-top: 4px solid #d35400;
                }
                .card-curso h4 {
                    margin-top: 0;
                    color: #2c3e50;
                }
                .quiz-opcion { 
                    display: block; 
                    background: white; 
                    padding: 12px 15px; 
                    margin: 8px 0; 
                    border: 2px solid #bdc3c7; 
                    border-radius: 8px; 
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .quiz-opcion:hover { 
                    border-color: #3498db; 
                    background: #ecf0f1; 
                }
                .quiz-opcion.correct { 
                    background: #d4edda; 
                    border-color: #28a745; 
                }
                .quiz-opcion.incorrect { 
                    background: #f8d7da; 
                    border-color: #dc3545; 
                }
                .quiz-feedback {
                    margin-top: 15px;
                    padding: 12px;
                    border-radius: 8px;
                    display: none;
                }
                .btn-curso {
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
                .btn-curso:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(211,84,0,0.4);
                }
                .btn-curso-secondary {
                    background: linear-gradient(135deg, #34495e, #2c3e50);
                }
                .navegacion-modulos {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 30px;
                    padding: 20px;
                    background: #ecf0f1;
                    border-radius: 10px;
                }
                @media (max-width: 768px) { 
                    .grid-2 { 
                        grid-template-columns: 1fr; 
                    }
                    .navegacion-modulos {
                        flex-direction: column;
                        gap: 10px;
                    }
                    .navegacion-modulos button {
                        width: 100%;
                    }
                }
            </style>

            <!-- MÓDULO 0: INTRODUCCIÓN -->
            <div id="modulo-0" class="modulo-curso activo">
                <h2 class="titulo-modulo">🎯 Bienvenida al Curso</h2>
                <div class="info">
                    <p>Estimado delegado/a: este curso ha sido diseñado especialmente para vos, que representás a los trabajadores mineros. Aquí vas a encontrar todo lo que necesitás saber para participar activamente en una negociación colectiva.</p>
                </div>

                <h3>📋 ¿Qué vas a aprender?</h3>
                <div class="grid-2">
                    <div class="card-curso">
                        <h4>📘 Módulo 1: Los Cimientos</h4>
                        <p>Qué es negociar, por qué lo hacemos y los supuestos fundamentales.</p>
                    </div>
                    <div class="card-curso">
                        <h4>🗺️ Módulo 2: El Mapa</h4>
                        <p>Marco normativo, actores del sistema, tipos de acuerdos.</p>
                    </div>
                    <div class="card-curso">
                        <h4>🛤️ Módulo 3: El Camino</h4>
                        <p>Las 8 etapas paso a paso de la negociación.</p>
                    </div>
                    <div class="card-curso">
                        <h4>🔧 Módulo 4: La Práctica</h4>
                        <p>Técnicas, habilidades, estrategia.</p>
                    </div>
                    <div class="card-curso">
                        <h4>💼 Módulo 5: Casos Mineros</h4>
                        <p>Tres casos reales del sector minero.</p>
                    </div>
                </div>

                <div style="text-align:center; margin-top:30px;">
                    <button class="btn-curso" onclick="cursoShowModule(1)">🚀 Comenzar Curso</button>
                </div>
            </div>

            <!-- MÓDULO 1: LOS CIMIENTOS -->
            <div id="modulo-1" class="modulo-curso">
                <h2 class="titulo-modulo">📘 MÓDULO 1: LOS CIMIENTOS</h2>
                
                <h3>1.1 ¿Qué es la Negociación Colectiva?</h3>
                <div class="contenido-texto">
                    <p>La <strong>Organización Internacional del Trabajo (OIT)</strong>, en su Convenio 154 de 1981, define la negociación colectiva:</p>
                    <div class="info">
                        <p>"Comprende todas las negociaciones que tienen lugar entre un empleador, un grupo de empleadores, una organización o varias organizaciones de empleadores, por una parte, y una organización o varias organizaciones de trabajadores por otra, con el fin de fijar condiciones de trabajo y empleo."</p>
                    </div>
                </div>

                <h3>1.2 Funciones de la Negociación Colectiva</h3>
                <table class="tabla-curso">
                    <tr><th>Función</th><th>Descripción</th><th>Ejemplo minero</th></tr>
                    <tr><td>📏 Normativa</td><td>Crea reglas que regulan la relación laboral</td><td>Fija categorías y salarios</td></tr>
                    <tr><td>⚖️ Protectora</td><td>Equilibra la relación desigual</td><td>Limita horas extras</td></tr>
                    <tr><td>🕊️ Pacificadora</td><td>Institucionaliza el conflicto</td><td>Resuelve reclamos sin paro</td></tr>
                    <tr><td>💰 Económica</td><td>Regula aspectos salariales</td><td>Ajustes por precio del mineral</td></tr>
                </table>

                <h3>1.3 Los 4 Supuestos de la Negociación</h3>
                <div class="grid-2">
                    <div class="card-curso">
                        <h4>🤝 1. Reconocimiento</h4>
                        <p>Ambas partes se reconocen como legítimas para negociar.</p>
                    </div>
                    <div class="card-curso">
                        <h4>🔗 2. Interdependencia</h4>
                        <p>Ninguna parte puede resolver los problemas sola.</p>
                    </div>
                    <div class="card-curso">
                        <h4>⚔️ 3. Conflicto de intereses</h4>
                        <p>Las partes quieren cosas distintas. Es natural.</p>
                    </div>
                    <div class="card-curso">
                        <h4>🎯 4. Expectativa de acuerdo</h4>
                        <p>Ambas creen que es posible llegar a un pacto.</p>
                    </div>
                </div>

                <div class="warning">
                    <h4>⚠️ Concepto clave</h4>
                    <p><strong>El conflicto ≠ Enemistad</strong>. El conflicto es natural y necesario. No es pelearse, es reconocer que hay intereses distintos.</p>
                </div>

                <div class="highlight">
                    <p><strong>FÓRMULA DEL NEGOCIADOR:</strong><br>
                    CONFLICTO + RACIONALIDAD = ACUERDO<br>
                    CONFLICTO + EMOCIÓN = RUPTURA</p>
                </div>

                <h3>Mini-evaluación Módulo 1</h3>
                <div class="quiz-curso">
                    <p><strong>Pregunta:</strong> ¿Cuál NO es un supuesto de la negociación colectiva?</p>
                    <div class="quiz-opcion" onclick="cursoCheckAnswer(this, false, 'cursoFb1')">a) Reconocimiento mutuo</div>
                    <div class="quiz-opcion" onclick="cursoCheckAnswer(this, false, 'cursoFb1')">b) Interdependencia</div>
                    <div class="quiz-opcion" onclick="cursoCheckAnswer(this, true, 'cursoFb1')">c) Ausencia total de conflicto</div>
                    <div class="quiz-opcion" onclick="cursoCheckAnswer(this, false, 'cursoFb1')">d) Expectativa de acuerdo</div>
                    <div class="quiz-feedback" id="cursoFb1"></div>
                </div>

                <div class="navegacion-modulos">
                    <button class="btn-curso btn-curso-secondary" onclick="cursoShowModule(0)">← Anterior</button>
                    <button class="btn-curso" onclick="cursoShowModule(2)">Siguiente →</button>
                </div>
            </div>

            <!-- MÓDULO 2: EL MAPA -->
            <div id="modulo-2" class="modulo-curso">
                <h2 class="titulo-modulo">🗺️ MÓDULO 2: EL MAPA NORMATIVO</h2>

                <h3>2.1 La Pirámide Normativa</h3>
                <div class="info">
                    <p>Todo acuerdo se construye sobre una base legal. Imaginá una pirámide de 5 pisos:</p>
                </div>
                
                <div style="text-align:center; margin:20px 0;">
                    <div style="background:#d35400; color:white; padding:10px; margin:5px auto; width:40%; border-radius:5px;">CONSTITUCIÓN NACIONAL (Art. 14 bis)</div>
                    <div style="background:#e67e22; color:white; padding:10px; margin:5px auto; width:55%; border-radius:5px;">TRATADOS INTERNACIONALES (OIT)</div>
                    <div style="background:#f39c12; color:white; padding:10px; margin:5px auto; width:70%; border-radius:5px;">LEYES NACIONALES</div>
                    <div style="background:#f1c40f; color:black; padding:10px; margin:5px auto; width:85%; border-radius:5px;">CONVENIO COLECTIVO</div>
                    <div style="background:#f8f9fa; color:black; padding:10px; margin:5px auto; width:100%; border-radius:5px;">CONTRATO INDIVIDUAL</div>
                </div>

                <div class="highlight">
                    <h4>🏆 Regla de oro: Principio de la norma más favorable</h4>
                    <p>Siempre gana lo más favorable para el trabajador.</p>
                </div>

                <h3>2.2 Constitución Nacional - Art. 14 bis</h3>
                <div class="contenido-texto">
                    <p>Este artículo es <strong>la biblia del delegado sindical</strong>:</p>
                    <div class="info">
                        <p>"Queda garantizado a los gremios: <strong>concertar convenios colectivos de trabajo</strong>; recurrir a la <strong>conciliación y al arbitraje</strong>; el <strong>derecho de huelga</strong>."</p>
                    </div>
                </div>

                <h3>2.3 Tratados Internacionales (OIT)</h3>
                <table class="tabla-curso">
                    <tr><th>Convenio</th><th>Tema</th><th>Importancia</th></tr>
                    <tr><td><strong>C87</strong></td><td>Libertad Sindical</td><td>Protege el derecho a organizarse</td></tr>
                    <tr><td><strong>C98</strong></td><td>Derecho de sindicación</td><td>Base de la negociación colectiva</td></tr>
                    <tr><td><strong>C154</strong></td><td>Fomento negociación</td><td>Define qué es negociar</td></tr>
                </table>

                <div class="navegacion-modulos">
                    <button class="btn-curso btn-curso-secondary" onclick="cursoShowModule(1)">← Anterior</button>
                    <button class="btn-curso" onclick="cursoShowModule(3)">Siguiente →</button>
                </div>
            </div>

            <!-- MÓDULO 3: EL CAMINO -->
            <div id="modulo-3" class="modulo-curso">
                <h2 class="titulo-modulo">🛤️ MÓDULO 3: EL CAMINO - PASO A PASO</h2>

                <h3>3.1 Las 8 Etapas de la Negociación</h3>
                <div class="highlight">
                    <p><strong>INICIO → REQUISITOS → COMISIÓN → ÁMBITO → MATERIAS → BUENA FE → DESARROLLO → CIERRE</strong></p>
                </div>

                <h3>3.2 ETAPA 1: El Inicio</h3>
                <div class="contenido-texto">
                    <p>¿Quién puede arrancar? <strong>Cualquiera de las dos partes</strong>: el sindicato o la empresa.</p>
                    <p><strong>¿Cómo se hace?</strong> Con una convocatoria escrita que debe:</p>
                    <ul>
                        <li>Notificar a la otra parte</li>
                        <li>Enviar copia al Ministerio de Trabajo</li>
                        <li>Detallar qué se quiere negociar</li>
                    </ul>
                </div>

                <div class="info">
                    <h4>⏰ Plazo clave</h4>
                    <p>La otra parte tiene <strong>15 días</strong> desde la recepción para responder.</p>
                </div>

                <h3>3.3 ETAPA 2: Los Requisitos</h3>
                <p>La notificación debe decir claramente:</p>
                <ol>
                    <li><strong>Representación que inviste</strong></li>
                    <li><strong>Alcance personal y territorial</strong></li>
                    <li><strong>Materia a negociar</strong></li>
                </ol>

                <h3>3.4 ETAPA 3: Comisión Negociadora</h3>
                <div class="warning">
                    <h4>🏆 Reglas de oro:</h4>
                    <ul>
                        <li><strong>Número igual</strong> de representantes de ambos lados</li>
                        <li>Desde la Ley 25.674: <strong>cupo femenino del 30%</strong></li>
                        <li>El sindicato designa por asamblea o congreso</li>
                    </ul>
                </div>

                <div class="navegacion-modulos">
                    <button class="btn-curso btn-curso-secondary" onclick="cursoShowModule(2)">← Anterior</button>
                    <button class="btn-curso" onclick="cursoShowModule(4)">Siguiente →</button>
                </div>
            </div>

            <!-- MÓDULO 4: LA PRÁCTICA -->
            <div id="modulo-4" class="modulo-curso">
                <h2 class="titulo-modulo">🔧 MÓDULO 4: LA PRÁCTICA</h2>

                <h3>4.1 Las 5 Habilidades del Negociador</h3>
                <table class="tabla-curso">
                    <tr><th>Habilidad</th><th>Descripción</th><th>Aplicación</th></tr>
                    <tr><td>👂 Escucha activa</td><td>Oír lo que dice y lo que calla</td><td>Detectar qué teme la empresa</td></tr>
                    <tr><td>🗣️ Oratoria clara</td><td>Hablar con precisión</td><td>Exponer sin ambigüedades</td></tr>
                    <tr><td>🎯 Por intereses</td><td>No por posiciones</td><td>"No pedimos plata, pedimos compensar el aislamiento"</td></tr>
                    <tr><td>⚡ Manejo conflicto</td><td>Transformarlo</td><td>Usar el enojo como motor</td></tr>
                    <tr><td>💡 Creatividad</td><td>Soluciones no obvias</td><td>Canje de viáticos por más descanso</td></tr>
                </table>

                <h3>4.2 Técnica de Harvard</h3>
                <div class="grid-2">
                    <div class="card-curso">
                        <h4>1️⃣ Separar personas del problema</h4>
                        <p>No atacar al gerente, atacar la política.</p>
                    </div>
                    <div class="card-curso">
                        <h4>2️⃣ Intereses, no posiciones</h4>
                        <p><strong>Posición:</strong> "Queremos $500.000"<br>
                        <strong>Interés:</strong> "Que el salario alcance"</p>
                    </div>
                    <div class="card-curso">
                        <h4>3️⃣ Opciones de mutuo beneficio</h4>
                        <p>Ampliar el menú antes de decidir.</p>
                    </div>
                    <div class="card-curso">
                        <h4>4️⃣ Criterios objetivos</h4>
                        <p>Canasta familiar, IPC, salarios comparables.</p>
                    </div>
                </div>

                <h3>4.3 Semáforo de Concesiones</h3>
                <div class="grid-2">
                    <div class="card-curso" style="border-top-color:#dc3545;">
                        <h4>🔴 ROJO (Irrenunciable)</h4>
                        <ul>
                            <li>Salario mínimo vital</li>
                            <li>Higiene y seguridad</li>
                            <li>Estabilidad</li>
                        </ul>
                    </div>
                    <div class="card-curso" style="border-top-color:#ffc107;">
                        <h4>🟡 AMARILLO (Negociable)</h4>
                        <ul>
                            <li>Monto del aumento</li>
                            <li>Forma de pago</li>
                            <li>Plazos</li>
                        </ul>
                    </div>
                </div>
                <div class="card-curso" style="border-top-color:#28a745; max-width:500px; margin:20px auto;">
                    <h4>🟢 VERDE (Concesionable)</h4>
                    <ul>
                        <li>Fecha exacta de pago</li>
                        <li>Modalidades de capacitación</li>
                    </ul>
                </div>

                <div class="navegacion-modulos">
                    <button class="btn-curso btn-curso-secondary" onclick="cursoShowModule(3)">← Anterior</button>
                    <button class="btn-curso" onclick="cursoShowModule(5)">Siguiente →</button>
                </div>
            </div>

            <!-- MÓDULO 5: CASOS PRÁCTICOS -->
            <div id="modulo-5" class="modulo-curso">
                <h2 class="titulo-modulo">💼 MÓDULO 5: CASOS PRÁCTICOS MINEROS</h2>

                <h3>Caso 1: "La Guardia Eterna"</h3>
                <div class="warning">
                    <h4>🏔️ Situación</h4>
                    <p>En una mina a cielo abierto, los operarios hacen guardias de <strong>14x7</strong> (14 días trabajando, 7 de descanso). La empresa quiere pasar a <strong>21x7</strong> sin aumento, argumentando que reduce costos.</p>
                    <p>Los trabajadores se niegan: 21 días aislados afectan su salud mental.</p>
                </div>

                <h4>💡 Solución negociada:</h4>
                <ul>
                    <li>Aceptar 21x7 <strong>solo con un plus del 30%</strong></li>
                    <li><strong>Examen médico psicológico</strong> previo a cada ciclo</li>
                    <li><strong>Derecho a reversión</strong> a 14x7 después de 5 años</li>
                    <li><strong>Cláusula de desconexión digital</strong> durante los 7 días</li>
                    <li><strong>Pase libre</strong> para familiares una vez por ciclo</li>
                </ul>

                <h3>Caso 2: "El Accidente que no Fue"</h3>
                <div class="warning">
                    <h4>⚠️ Situación</h4>
                    <p>Un trabajador sufre un accidente por falta de EPP. La empresa le ofrece una <strong>suma en negro</strong> para que no haga el reclamo.</p>
                </div>

                <h4>💡 Acción correcta:</h4>
                <ol>
                    <li><strong>Denuncia ante la ART</strong> (aunque el trabajador no quiera)</li>
                    <li><strong>Notificación al Ministerio</strong> por práctica desleal</li>
                    <li><strong>Inclusión en la negociación</strong> como "cláusula de seguridad"</li>
                    <li><strong>Capacitación obligatoria</strong> para supervisores</li>
                </ol>

                <div class="success">
                    <h4>🚨 Regla inquebrantable</h4>
                    <p><strong>La seguridad y la salud NO se negocian.</strong> Están en el semáforo ROJO: irrenunciables.</p>
                </div>

                <h3>Caso 3: "La Automatización que Viene"</h3>
                <div class="warning">
                    <h4>🤖 Situación</h4>
                    <p>La empresa anuncia <strong>camiones autónomos</strong>. 40 choferes pueden perder el empleo en 2 años.</p>
                </div>

                <h4>💡 Cláusulas a exigir:</h4>
                <div class="grid-2">
                    <div class="card-curso">
                        <h4>🛡️ Cláusula de empleo</h4>
                        <p>No despidos por automatización durante la vigencia del convenio.</p>
                    </div>
                    <div class="card-curso">
                        <h4>🎓 Reconversión</h4>
                        <p>Capacitación paga para aprender a operar nuevos equipos.</p>
                    </div>
                    <div class="card-curso">
                        <h4>🔄 Movilidad interna</h4>
                        <p>Prioridad para reubicar en otras áreas.</p>
                    </div>
                    <div class="card-curso">
                        <h4>👴 Jubilación anticipada</h4>
                        <p>Para mayores de 55 años con 30 años de aporte.</p>
                    </div>
                </div>

                <div class="navegacion-modulos">
                    <button class="btn-curso btn-curso-secondary" onclick="cursoShowModule(4)">← Anterior</button>
                    <button class="btn-curso" onclick="cursoShowModule(6)">Ir a Evaluación →</button>
                </div>
            </div>

            <!-- MÓDULO 6: EVALUACIÓN -->
            <div id="modulo-6" class="modulo-curso">
                <h2 class="titulo-modulo">📝 EVALUACIÓN FINAL</h2>
                <div class="info">
                    <p>Respondé las 20 preguntas. Necesitás el 70% de respuestas correctas para aprobar y obtener tu certificado.</p>
                </div>

                <div id="evaluacion-container"></div>

                <div style="text-align:center; margin:30px 0;">
                    <button class="btn-curso" onclick="cursoCalcularEvaluacion()">📊 Ver Resultado</button>
                </div>

                <div id="resultado-evaluacion" style="display:none;"></div>

                <div class="navegacion-modulos">
                    <button class="btn-curso btn-curso-secondary" onclick="cursoShowModule(5)">← Volver al Módulo 5</button>
                </div>
            </div>

            <!-- MÓDULO 7: CERTIFICADO -->
            <div id="modulo-7" class="modulo-curso">
                <h2 class="titulo-modulo">🎓 CERTIFICADO DE APROBACIÓN</h2>
                <div class="success" style="text-align:center; padding:40px;">
                    <h2 style="color:#27ae60; font-size:2.5em;">✓ APROBADO</h2>
                    <p style="font-size:1.3em;">Se otorga el presente certificado a:</p>
                    <p style="font-size:1.8em; margin:20px 0; border-bottom:2px solid #27ae60; display:inline-block; padding:0 40px;">________________________</p>
                    <p>Por haber aprobado el curso</p>
                    <p style="font-size:1.3em;"><strong>"Negociación Colectiva para Delegados Mineros"</strong></p>
                    <p>16 horas cátedra de formación</p>
                    <p style="margin-top:30px;">Fecha: __/__/20__</p>
                </div>
                <div class="navegacion-modulos">
                    <button class="btn-curso btn-curso-secondary" onclick="cursoShowModule(0)">← Volver al Inicio</button>
                </div>
            </div>
        </div>

        <script>
            // Variables globales del curso
            let cursoModuloActual = 0;
            let cursoRespuestasEvaluacion = {};
            const cursoTotalPreguntas = 20;

            // Función para mostrar módulo
            function cursoShowModule(n) {
                // Ocultar todos los módulos
                document.querySelectorAll('.modulo-curso').forEach(m => m.classList.remove('activo'));
                // Mostrar el módulo seleccionado
                document.getElementById('modulo-' + n).classList.add('activo');
                cursoModuloActual = n;
                window.scrollTo(0, 0);
                
                // Si es el módulo de evaluación, generar las preguntas
                if (n === 6) {
                    cursoGenerarEvaluacion();
                }
            }

            // Función para verificar respuesta en mini-evaluaciones
            function cursoCheckAnswer(elemento, esCorrecta, feedbackId) {
                const padre = elemento.parentElement;
                const opciones = padre.querySelectorAll('.quiz-opcion');
                opciones.forEach(opt => opt.style.pointerEvents = 'none');
                
                const feedback = document.getElementById(feedbackId);
                if (esCorrecta) {
                    elemento.classList.add('correct');
                    feedback.innerHTML = '<div class="success">✅ ¡Correcto! Excelente respuesta.</div>';
                } else {
                    elemento.classList.add('incorrect');
                    feedback.innerHTML = '<div class="warning">❌ Incorrecto. Revisá el contenido.</div>';
                }
                feedback.style.display = 'block';
            }

            // Función para generar evaluación final
            function cursoGenerarEvaluacion() {
                const preguntas = [
                    { p: "1. ¿Qué ley regula la negociación colectiva?", o: ["a) Ley 20.744", "b) Ley 14.250", "c) Ley 23.551"], c: 1 },
                    { p: "2. El Art. 14 bis garantiza:", o: ["a) Concertar convenios", "b) Solo huelga", "c) Solo salarios"], c: 0 },
                    { p: "3. El cupo femenino es:", o: ["a) 20%", "b) 25%", "c) 30%"], c: 2 },
                    { p: "4. La ultraactividad significa:", o: ["a) Se aplica solo a activos", "b) Sigue vigente tras vencimiento", "c) Se aplica a jubilados"], c: 1 },
                    { p: "5. Homologación tácita es a los:", o: ["a) 15 días", "b) 30 días", "c) 60 días"], c: 1 },
                    { p: "6. Plazo para responder convocatoria:", o: ["a) 10 días", "b) 15 días", "c) 30 días"], c: 1 },
                    { p: "7. Asesores técnicos tienen:", o: ["a) Voz y voto", "b) Voz pero no voto", "c) Solo voto"], c: 1 },
                    { p: "8. NO es un supuesto:", o: ["a) Reconocimiento", "b) Interdependencia", "c) Ausencia de conflicto"], c: 2 },
                    { p: "9. Según Harvard hay que separar:", o: ["a) Salarios de horas extras", "b) Personas del problema", "c) Sindicato de empresa"], c: 1 },
                    { p: "10. La preparación representa:", o: ["a) 30%", "b) 50%", "c) 70%"], c: 2 },
                    { p: "11. En semáforo rojo está:", o: ["a) Fecha de pago", "b) Monto del aumento", "c) Higiene y seguridad"], c: 2 },
                    { p: "12. Fórmula del negociador:", o: ["a) Conflicto+Emoción", "b) Conflicto+Racionalidad", "c) Conflicto+Fuerza"], c: 1 },
                    { p: "13. Función cuando evita huelga:", o: ["a) Económica", "b) Pacificadora", "c) Normativa"], c: 1 },
                    { p: "14. Ante accidente en negro:", o: ["a) Esperar", "b) Denunciar", "c) No intervenir"], c: 1 },
                    { p: "15. Ante automatización:", o: ["a) Reducir salarios", "b) Cláusula reconversión", "c) Aumentar jornada"], c: 1 },
                    { p: "16. Convenio OIT que define:", o: ["a) C87", "b) C98", "c) C154"], c: 2 },
                    { p: "17. Mala fe es:", o: ["a) Estrategia", "b) Práctica desleal", "c) Derecho"], c: 1 },
                    { p: "18. CCT debe ser:", o: ["a) Oral", "b) Escrito", "c) Email"], c: 1 },
                    { p: "19. Controles del Ministerio:", o: ["a) Económico", "b) Legalidad, formalidad, oportunidad", "c) Salario"], c: 1 },
                    { p: "20. Negociación es:", o: ["a) Unilateral", "b) Bilateral", "c) Trilateral"], c: 1 }
                ];

                const container = document.getElementById('evaluacion-container');
                container.innerHTML = '';
                
                preguntas.forEach((preg, idx) => {
                    let html = '<div class="card-curso" style="margin:20px 0;">';
                    html += '<h4>' + preg.p + '</h4>';
                    preg.o.forEach((op, opIdx) => {
                        html += '<div class="quiz-opcion" onclick="cursoSeleccionarRespuesta(' + idx + ', ' + opIdx + ', this)">' + op + '</div>';
                    });
                    html += '<div class="quiz-feedback" id="cursoFbEval-' + idx + '" style="display:none;"></div>';
                    html += '</div>';
                    container.innerHTML += html;
                });
            }

            // Función para seleccionar respuesta en evaluación
            function cursoSeleccionarRespuesta(pregIdx, opIdx, elemento) {
                if (cursoRespuestasEvaluacion[pregIdx] !== undefined) return;
                cursoRespuestasEvaluacion[pregIdx] = opIdx;
                
                const padre = elemento.parentElement;
                const opciones = padre.querySelectorAll('.quiz-opcion');
                opciones.forEach(opt => opt.style.pointerEvents = 'none');
                
                const preguntas = [
                    { c: 1 }, { c: 0 }, { c: 2 }, { c: 1 }, { c: 1 },
                    { c: 1 }, { c: 1 }, { c: 2 }, { c: 1 }, { c: 2 },
                    { c: 2 }, { c: 1 }, { c: 1 }, { c: 1 }, { c: 1 },
                    { c: 2 }, { c: 1 }, { c: 1 }, { c: 1 }, { c: 1 }
                ];
                
                if (opIdx === preguntas[pregIdx].c) {
                    elemento.classList.add('correct');
                    document.getElementById('cursoFbEval-' + pregIdx).innerHTML = '<div class="success">✅ Correcto</div>';
                } else {
                    elemento.classList.add('incorrect');
                    opciones[preguntas[pregIdx].c].classList.add('correct');
                    document.getElementById('cursoFbEval-' + pregIdx).innerHTML = '<div class="warning">❌ Incorrecto</div>';
                }
                document.getElementById('cursoFbEval-' + pregIdx).style.display = 'block';
            }

            // Función para calcular evaluación
            function cursoCalcularEvaluacion() {
                let correctas = 0;
                
                for (let i = 0; i < 20; i++) {
                    const preguntas = [
                        { c: 1 }, { c: 0 }, { c: 2 }, { c: 1 }, { c: 1 },
                        { c: 1 }, { c: 1 }, { c: 2 }, { c: 1 }, { c: 2 },
                        { c: 2 }, { c: 1 }, { c: 1 }, { c: 1 }, { c: 1 },
                        { c: 2 }, { c: 1 }, { c: 1 }, { c: 1 }, { c: 1 }
                    ];
                    if (cursoRespuestasEvaluacion[i] === preguntas[i].c) correctas++;
                }
                
                const porcentaje = Math.round((correctas / 20) * 100);
                const resultado = document.getElementById('resultado-evaluacion');
                resultado.style.display = 'block';
                
                if (porcentaje >= 70) {
                    resultado.innerHTML = '<div class="success" style="text-align:center; padding:30px;"><h2>🎉 ¡APROBADO!</h2><p style="font-size:1.5em;">Obtuviste <strong>' + correctas + '/20</strong> (' + porcentaje + '%)</p><button class="btn-curso" onclick="cursoShowModule(7)" style="margin-top:20px;">📜 Ver Certificado</button></div>';
                } else {
                    resultado.innerHTML = '<div class="warning" style="text-align:center; padding:30px;"><h2>📚 Seguimos estudiando</h2><p>Obtuviste <strong>' + correctas + '/20</strong> (' + porcentaje + '%)</p><p>Necesitás 70% para aprobar.</p><button class="btn-curso btn-curso-secondary" onclick="cursoRespuestasEvaluacion={}; cursoGenerarEvaluacion(); document.getElementById(\'resultado-evaluacion\').style.display=\'none\';" style="margin-top:20px;">🔄 Reintentar</button></div>';
                }
                resultado.scrollIntoView({behavior:'smooth'});
            }

            // Inicializar
            console.log('✅ Curso de Negociación Colectiva cargado correctamente');
        </script>
    `
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.CAPACITACION_NEGOCIACION_COLECTIVA = CAPACITACION_NEGOCIACION_COLECTIVA;
    // Hacer las funciones accesibles globalmente
    window.cursoShowModule = function(n) {
        if (typeof CAPACITACION_NEGOCIACION_COLECTIVA !== 'undefined') {
            // Ejecutar el script dentro del contenido
            const script = document.createElement('script');
            script.textContent = `
                let cursoModuloActual = 0;
                let cursoRespuestasEvaluacion = {};
                
                function cursoShowModule(n) {
                    document.querySelectorAll('.modulo-curso').forEach(m => m.classList.remove('activo'));
                    document.getElementById('modulo-' + n).classList.add('activo');
                    cursoModuloActual = n;
                    window.scrollTo(0, 0);
                    if (n === 6) cursoGenerarEvaluacion();
                }
                
                function cursoCheckAnswer(elemento, esCorrecta, feedbackId) {
                    const padre = elemento.parentElement;
                    const opciones = padre.querySelectorAll('.quiz-opcion');
                    opciones.forEach(opt => opt.style.pointerEvents = 'none');
                    const feedback = document.getElementById(feedbackId);
                    if (esCorrecta) {
                        elemento.classList.add('correct');
                        feedback.innerHTML = '<div class="success">✅ ¡Correcto!</div>';
                    } else {
                        elemento.classList.add('incorrect');
                        feedback.innerHTML = '<div class="warning">❌ Incorrecto</div>';
                    }
                    feedback.style.display = 'block';
                }
            `;
            document.body.appendChild(script);
        }
    };
}

console.log('✅ Capacitación: Negociación Colectiva cargada');