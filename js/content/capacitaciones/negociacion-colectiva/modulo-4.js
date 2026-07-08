// ============================================
// MÓDULO 4: MARCO NORMATIVO
// Fuente: MTEySS - Programa de Apoyo a la Formación Sindical
// ============================================

const MODULO_NEGOCIACION_4 = {
    id: 'negociacion-colectiva-modulo-4',
    titulo: 'Marco Normativo de la Negociación Colectiva',
    duracion: '2 horas',
    videoUrl: null,
    
    contenido: `
        <div class="modulo-contenido">
            <h2>Marco Normativo de la Negociación Colectiva</h2>
            
            <h3>Constitución Nacional</h3>
            
            <div class="cita-destacada constitucion">
                <p><strong>Artículo 14 bis</strong> — El trabajo en sus diversas formas gozará de la protección de las leyes, las que asegurarán al trabajador: condiciones dignas y equitativas de labor, jornada limitada; descanso y vacaciones pagados; retribución justa; salario mínimo vital móvil; igual remuneración por igual tarea; organización sindical libre y democrática, reconocida por la simple inscripción en un registro especial.</p>
            </div>
            
            <div class="cita-destacada constitucion">
                <p><strong>Artículo 31</strong> — Esta Constitución, las leyes de la Nación que en su consecuencia se dicten por el Congreso y los tratados con las potencias extranjeras son la ley suprema de la Nación; y las autoridades de cada provincia están obligadas a conformarse a ella.</p>
            </div>
            
            <div class="cita-destacada constitucion">
                <p><strong>Artículo 75, inciso 22</strong> — Corresponde al Congreso: Aprobar o desechar tratados concluidos con las demás naciones y con las organizaciones internacionales y los concordatos con la Santa Sede. Los tratados y concordatos tienen jerarquía superior a las leyes.</p>
            </div>
            
            <h3>Tratados Internacionales</h3>
            
            <p>Los Convenios de la OIT son un conjunto de normas internacionales de trabajo que imponen obligaciones a los Estados y cuya finalidad es mejorar las condiciones de empleo en todo el mundo. Los Convenios deben ser ratificados por los Miembros de la OIT.</p>
            
            <ul>
                <li><strong>Convenio 98</strong> — Sobre el derecho de sindicación y de negociación colectiva</li>
                <li><strong>Convenio 151</strong> — Sobre las relaciones de trabajo en la administración pública</li>
                <li><strong>Convenio 154</strong> — Sobre el fomento de la negociación colectiva</li>
                <li><strong>Recomendación 91</strong> — Sobre los contratos colectivos</li>
            </ul>
            
            <h3>Legislación Nacional</h3>
            
            <table class="tabla-leyes">
                <thead>
                    <tr>
                        <th>Ley</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Ley 14.250</strong></td>
                        <td>Negociación Colectiva. Establece el marco legal para la celebración de convenios colectivos de trabajo.</td>
                    </tr>
                    <tr>
                        <td><strong>Ley 23.546</strong></td>
                        <td>Procedimiento para la Negociación Colectiva. Regula el proceso de negociación y homologación.</td>
                    </tr>
                    <tr>
                        <td><strong>Ley 14.786</strong></td>
                        <td>Conciliación Obligatoria. Regula la intervención del Estado en conflictos laborales.</td>
                    </tr>
                    <tr>
                        <td><strong>Ley 23.551</strong></td>
                        <td>Asociaciones Sindicales. Regula la organización y acción de los sindicatos.</td>
                    </tr>
                    <tr>
                        <td><strong>Ley 20.744</strong></td>
                        <td>Ley de Contrato de Trabajo. Establece el marco general de las relaciones laborales.</td>
                    </tr>
                    <tr>
                        <td><strong>Ley 24.185</strong></td>
                        <td>Convenios colectivos para los trabajadores del Estado Nacional.</td>
                    </tr>
                    <tr>
                        <td><strong>Ley 25.877</strong></td>
                        <td>Ordenamiento del régimen laboral.</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Jerarquía de las normas</h3>
            
            <div class="jerarquia-normas">
                <div class="nivel-norma">1. Constitución Nacional</div>
                <div class="nivel-norma">2. Tratados Internacionales</div>
                <div class="nivel-norma">3. Leyes Nacionales</div>
                <div class="nivel-norma">4. Convenios Colectivos de Trabajo</div>
                <div class="nivel-norma">5. Contratos Individuales de Trabajo</div>
            </div>
            
            <div class="nota-modificacion">
                <strong>💡 Importante</strong>
                <p>Los convenios de la OIT ratificados por Argentina tienen jerarquía superior a las leyes, según lo establecido en el Artículo 75, inciso 22 de la Constitución Nacional.</p>
            </div>
            
            <h3>Actas de negociación</h3>
            <p>De lo que sucedió en el transcurso de las negociaciones se labrará un acta resumida incluyendo manifestaciones que los representantes de las partes consideran relevantes. Para el caso de que la negociación se desarrolle en forma privada, dispone que las actas serán elevadas al MTEySS dentro del 5to. día de confeccionada.</p>
        </div>
    `,
    
    recursos: [
        {
            titulo: 'Texto completo de la Ley 14.250',
            url: 'https://www.argentina.gob.ar/normativa/nacional/ley-14250-25010'
        },
        {
            titulo: 'Texto completo de la Ley 23.546',
            url: 'https://www.argentina.gob.ar/normativa/nacional/ley-23546-9188'
        }
    ],
    
    evaluacion: {
        preguntas: [
            {
                id: 1,
                pregunta: '¿Qué establece el Artículo 14 bis de la Constitución Nacional?',
                opciones: [
                    'La división de poderes',
                    'Los derechos del trabajador y la garantía de concertar convenios colectivos',
                    'La organización del Poder Judicial',
                    'Las atribuciones del Presidente'
                ],
                correcta: 1
            },
            {
                id: 2,
                pregunta: '¿Qué ley regula el procedimiento para la negociación colectiva?',
                opciones: [
                    'Ley 14.250',
                    'Ley 23.546',
                    'Ley 14.786',
                    'Ley 20.744'
                ],
                correcta: 1
            },
            {
                id: 3,
                pregunta: '¿Qué jerarquía tienen los convenios de la OIT ratificados por Argentina?',
                opciones: [
                    'Son inferiores a las leyes',
                    'Tienen jerarquía superior a las leyes',
                    'Son iguales a las leyes provinciales',
                    'No tienen aplicación en Argentina'
                ],
                correcta: 1
            },
            {
                id: 4,
                pregunta: '¿Qué ley regula las Asociaciones Sindicales?',
                opciones: [
                    'Ley 14.250',
                    'Ley 23.551',
                    'Ley 20.744',
                    'Ley 24.557'
                ],
                correcta: 1
            },
            {
                id: 5,
                pregunta: '¿Cuál es el orden de jerarquía de las normas?',
                opciones: [
                    'Leyes, Constitución, Tratados, Convenios Colectivos',
                    'Constitución, Tratados, Leyes, Convenios Colectivos',
                    'Tratados, Constitución, Leyes, Convenios Colectivos',
                    'Convenios Colectivos, Leyes, Constitución, Tratados'
                ],
                correcta: 1
            }
        ]
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MODULO_NEGOCIACION_4 = MODULO_NEGOCIACION_4;
}

console.log('✅ Módulo 4 cargado: Marco Normativo');