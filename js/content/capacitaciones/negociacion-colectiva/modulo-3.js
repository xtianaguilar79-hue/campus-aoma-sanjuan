// ============================================
// MÓDULO 3: COMPONENTES DEL SISTEMA Y FORMAS DE NEGOCIACIÓN
// Fuente: MTEySS - Programa de Apoyo a la Formación Sindical
// ============================================

const MODULO_NEGOCIACION_3 = {
    id: 'negociacion-colectiva-modulo-3',
    titulo: 'Componentes del Sistema y Formas de Negociación',
    duracion: '2 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <h2>Componentes del Sistema de Relaciones Laborales</h2>
            
            <p>Las relaciones laborales constituyen un sistema conformado básicamente por cuatro dimensiones principales:</p>
            
            <div class="grid-componentes">
                <div class="componente-card">
                    <div class="componente-icon">👥</div>
                    <h4>Actores Sindicales</h4>
                    <ul>
                        <li>Trabajadores y sus organizaciones representativas</li>
                        <li>Asociaciones sindicales con personería gremial otorgada por el MTEySS</li>
                    </ul>
                </div>
                <div class="componente-card">
                    <div class="componente-icon">🏢</div>
                    <h4>Actores Empresarios</h4>
                    <ul>
                        <li>Una empresa, grupos de empresas o cámaras empresarias</li>
                        <li>Deben acreditar personería jurídica otorgada por la IGJ</li>
                    </ul>
                </div>
                <div class="componente-card">
                    <div class="componente-icon">⚖️</div>
                    <h4>Instrumentos de Regulación</h4>
                    <ul>
                        <li>Constitución Nacional y Tratados Internacionales</li>
                        <li>Ley 14.250, Ley 23.546, Ley 23.551, Ley 20.744</li>
                    </ul>
                </div>
                <div class="componente-card">
                    <div class="componente-icon">🌐</div>
                    <h4>Ambiente Externo</h4>
                    <ul>
                        <li>Mercado de trabajo, políticas económicas y sociales</li>
                        <li>Avances científicos y tecnológicos</li>
                        <li>Factores internacionales (globalización, integración económica)</li>
                    </ul>
                </div>
            </div>
            
            <h3>Mecanismos Normativos</h3>
            
            <div class="grid-mecanismos">
                <div class="mecanismo-card heteronomo">
                    <h4>Sistema Heterónomo</h4>
                    <p>El Estado impone las normas de juego a través de leyes, decretos, resoluciones, dictámenes.</p>
                </div>
                <div class="mecanismo-card autonomo">
                    <h4>Sistema Autónomo</h4>
                    <p>Las reglas y/o normas de funcionamiento son acordadas y aplicadas por los propios interlocutores sociales directos (sindicatos y empresarios).</p>
                </div>
            </div>
            
            <h3>Formas que puede asumir la negociación colectiva</h3>
            
            <table class="tabla-formas">
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
                        <td>Interconfederal / Por actividad o rama / Por profesión o especialidad / A nivel de empresa / A nivel de establecimiento, taller o sección</td>
                    </tr>
                    <tr>
                        <td>Según el carácter del diálogo en el seno de la empresa</td>
                        <td>La óptica de la lucha / La óptica del concurso: participación</td>
                    </tr>
                    <tr>
                        <td>Según el carácter orgánico de la representación</td>
                        <td>Por la Confederación / Por la Federación / Por el Sindicato / Por la seccional o filial / Por los Delegados o Comisiones Internas / Por grupos de trabajadores</td>
                    </tr>
                    <tr>
                        <td>Según su contenido</td>
                        <td>Según actúe sobre las causas / Según actúe sobre los efectos</td>
                    </tr>
                    <tr>
                        <td>Según se refieran a</td>
                        <td>Solución de un conflicto / Cuestiones salariales / Condiciones y Medio Ambiente de Trabajo / Derechos sindicales / Participación y expresión de los trabajadores</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Características básicas para un Modelo de Negociación Colectiva</h3>
            
            <ul>
                <li><strong>Colectiva:</strong> involucra a diversos actores del mundo laboral.</li>
                <li><strong>Progresividad:</strong> procurando siempre la ampliación de derechos laborales, su mejora y perfeccionamiento permanente.</li>
                <li><strong>Bilateral:</strong> reconocimiento pleno y mutuo por parte de los actores sociales.</li>
                <li><strong>Inclusiva:</strong> tratamiento y regulación de todas las temáticas posibles (igualdad de género, igualdad de oportunidades, no violencia, adicciones, aspectos psicosociales, aplicaciones tecnológicas, discapacidad, teletrabajo).</li>
                <li><strong>Responsable:</strong> equilibrios entre los actores sociales. Lógica: Costo / Beneficio.</li>
                <li><strong>Articulada:</strong> prever la pluralidad de ámbitos funcionales, geográficos y personales de acuerdo a la normativa vigente.</li>
                <li><strong>Contractualizante:</strong> lograr la mayor "legitimidad" posible en los acuerdos a alcanzar.</li>
            </ul>
            
            <div class="nota-modificacion">
                <strong>💡 Reflexión</strong>
                <p>¿Cómo se articulan los diferentes niveles de negociación en el sector minero? ¿Qué características debe tener un modelo de negociación para el sector?</p>
            </div>
        </div>
    `,
    
    recursos: [],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Cuáles son los actores principales del sistema de relaciones laborales?',
                opciones: [
                    'Solo el Estado',
                    'Solo los trabajadores',
                    'Trabajadores, empleadores y el Estado',
                    'Solo los empresarios'
                ],
                correcta: 2
            },
            {
                id: 2,
                pregunta: '¿Qué diferencia al sistema normativo autónomo del heterónomo?',
                opciones: [
                    'El autónomo es impuesto por el Estado, el heterónomo es acordado por las partes',
                    'El heterónomo es impuesto por el Estado, el autónomo es acordado por las partes',
                    'Ambos son impuestos por el Estado',
                    'Ambos son acordados por las partes'
                ],
                correcta: 1
            },
            {
                id: 3,
                pregunta: '¿Qué característica implica que la negociación sea "inclusiva"?',
                opciones: [
                    'Que solo incluya temas salariales',
                    'Que incluya el tratamiento de todas las temáticas posibles',
                    'Que excluya a ciertos trabajadores',
                    'Que solo incluya a los empresarios'
                ],
                correcta: 1
            },
            {
                id: 4,
                pregunta: '¿Según el nivel en que se efectúa, cómo puede clasificarse la negociación?',
                opciones: [
                    'Solo a nivel de empresa',
                    'Interconfederal, por actividad, por profesión, a nivel de empresa o establecimiento',
                    'Solo a nivel nacional',
                    'Exclusivamente a nivel provincial'
                ],
                correcta: 1
            },
            {
                id: 5,
                pregunta: '¿Qué implica la "progresividad" en un modelo de negociación colectiva?',
                opciones: [
                    'Mantener las mismas condiciones siempre',
                    'Ampliar y mejorar permanentemente los derechos laborales',
                    'Reducir los derechos conquistados',
                    'Mantener el statu quo'
                ],
                correcta: 1
            }
        ]
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_3 = MODULO_NEGOCIACION_3;
}

console.log('✅ Módulo 3 cargado: Componentes del Sistema y Formas de Negociación');