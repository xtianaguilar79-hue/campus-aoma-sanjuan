/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo 03: Motor de Evaluaciones e Interfaz de Validación de Competencias
 */

window.ModuleEvaluaciones = {
    examsDatabase: [],
    activeExam: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    timerInterval: null,
    timeLeft: 0,

    // Inicializador del módulo (Inyectado por el Router en app.js)
    init(container) {
        this.loadExamsDatabase();
        this.renderExamList(container);
    },

    // Repositorio semilla de exámenes técnicos homologados
    loadExamsDatabase() {
        this.examsDatabase = [
            {
                id: 'exam_higiene',
                title: 'Examen Oficial: Higiene y Seguridad en Minería',
                duration: 600, // 10 minutos en segundos
                minScore: 70,  // Porcentaje mínimo de aprobación
                questions: [
                    { id: 'q1', text: 'Ante un desprendimiento de roca inminente en galería subterránea, ¿cuál es la primera acción requerida por protocolo?', options: { a: 'Avisar al supervisor por radio al finalizar el turno.', b: 'Evacuar el área de inmediato hacia zona segura y dar alerta de emergencia.', c: 'Continuar operando la maquinaria con precaución avanzada.', d: 'Proceder a apuntalar la zona sin autorización técnica.' }, correct: 'b' },
                    { id: 'q2', text: '¿Qué normativa nacional regula específicamente los Riesgos del Trabajo en el territorio de la República Argentina?', options: { a: 'Ley de Contrato de Trabajo 20.744.', b: 'Ley Nacional de Minería 1.919.', c: 'Ley de Riesgos del Trabajo 24.557.', d: 'Decreto Reglamentario de Hidrocarburos.' }, correct: 'c' },
                    { id: 'q3', text: '¿Con qué frecuencia mínima debe ser inspeccionado el arnés de seguridad anticaídas por el operario?', options: { a: 'Mensualmente durante las auditorías de planta.', b: 'Antes de cada uso operativo (Inspección Pre-Uso).', c: 'Únicamente después de haber sufrido una caída.', d: 'Cada vez que lo determine el delegado gremial.' }, correct: 'b' }
                ]
            },
            {
                id: 'exam_voladura',
                title: 'Validación Técnica: Operación de Voladura y Explosivos',
                duration: 900, // 15 minutos
                minScore: 80,
                questions: [
                    { id: 'qv1', text: '¿Cuántas señales sonoras con sirena deben emitirse obligatoriamente antes de proceder a la detonación?', options: { a: 'Una sola señal continua de 5 minutos.', b: 'Tres señales acústicas diferenciadas espaciadas según protocolo de resguardo.', c: 'Ninguna si el perímetro visual está despejado.', d: 'Dos señales rápidas al momento exacto de la ignición.' }, correct: 'b' }
                ]
            }
        ];
    },

    // Renderiza el catálogo de exámenes disponibles
    renderExamList(container) {
        container.innerHTML = `
            <div style="margin-bottom: var(--space-6);">
                <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Evaluaciones y Certificaciones Técnicas</h2>
                <p style="color: var(--text-muted); font-size: var(--font-sm);">Valide sus competencias teóricas para la obtención de avales oficiales de capacitación gremial.</p>
            </div>

            <div id="exams-list-target" style="display: flex; flex-direction: column; gap: var(--space-4); max-width: 800px;">
                ${this.examsDatabase.map(exam => `
                    <div class="glassmorphism" style="padding: var(--space-5); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
                        <div>
                            <h4 style="color: var(--primary-dark); font-size: var(--font-base); margin-bottom: var(--space-1);">${exam.title}</h4>
                            <p style="font-size: 12px; color: var(--text-muted);">
                                <i class="fa-solid fa-clock" style="margin-right: 4px;"></i> Duración: ${exam.duration / 60} min | 
                                <i class="fa-solid fa-clipboard-question" style="margin-right: 4px;"></i> ${exam.questions.length} Preguntas | 
                                <i class="fa-solid fa-graduation-cap" style="margin-right: 4px;"></i> Requiere ${exam.minScore}% para aprobar
                            </p>
                        </div>
                        <button class="btn btn-primary start-exam-btn" data-id="${exam.id}">
                            <i class="fa-solid fa-user-pen"></i> Rendir Examen
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

        // Enlace de clics para iniciar el examen elegido
        container.querySelectorAll('.start-exam-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const examId = btn.getAttribute('data-id');
                this.startExamEngine(examId, container);
            });
        });
    },

    // Controlador del entorno dinámico del Examen Activo
    startExamEngine(examId, container) {
        this.activeExam = this.examsDatabase.find(e => e.id === examId);
        if (!this.activeExam) return;

        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.timeLeft = this.activeExam.duration;

        this.renderExamInterface(container);
        this.startTimer(container);
    },

    // Render de la interfaz de la hoja de examen
    renderExamInterface(container) {
        const question = this.activeExam.questions[this.currentQuestionIndex];
        const isLastQuestion = this.currentQuestionIndex === this.activeExam.questions.length - 1;

        container.innerHTML = `
            <div class="glassmorphism" style="max-width: 800px; padding: var(--space-6); border-radius: var(--radius-md); position: relative;">
                <!-- Header del Examen -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-3); margin-bottom: var(--space-5);">
                    <h3 style="font-size: var(--font-base); color: var(--primary-dark); max-width: 75%;">${this.activeExam.title}</h3>
                    <div id="exam-timer-display" style="background: var(--warning-bg); color: var(--warning); padding: var(--space-1) var(--space-3); border-radius: var(--radius-sm); font-variant-numeric: tabular-nums; font-weight: var(--weight-bold); font-size: var(--font-sm);">
                        <i class="fa-solid fa-stopwatch"></i> --:--
                    </div>
                </div>

                <!-- Barra de Progreso Interna -->
                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: var(--space-2); display: flex; justify-content: space-between;">
                    <span>Pregunta ${this.currentQuestionIndex + 1} de ${this.activeExam.questions.length}</span>
                    <span>${Math.round(((this.currentQuestionIndex) / this.activeExam.questions.length) * 100)}% Completado</span>
                </div>
                <div style="width: 100%; height: 6px; background: var(--border-subtle); border-radius: var(--radius-round); margin-bottom: var(--space-6); overflow: hidden;">
                    <div style="width: ${((this.currentQuestionIndex + 1) / this.activeExam.questions.length) * 100}%; height: 100%; background: var(--gradient-tech); transition: width 0.3s ease;"></div>
                </div>

                <!-- Bloque de Pregunta y Opciones -->
                <div style="margin-bottom: var(--space-6);">
                    <p style="font-weight: var(--weight-semibold); color: var(--text-main); font-size: var(--font-base); margin-bottom: var(--space-4); line-height: 1.5;">${question.text}</p>
                    <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                        ${Object.entries(question.options).map(([key, value]) => {
                            const isSelected = this.userAnswers[question.id] === key;
                            return `
                                <label style="display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-3) var(--space-4); background: ${isSelected ? 'rgba(59,146,255,0.08)' : 'rgba(255,255,255,0.01)'}; border: 1px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--primary-light)'" onmouseout="this.style.borderColor='${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}'">
                                    <input type="radio" name="question_option" value="${key}" ${isSelected ? 'checked' : ''} style="margin-top: 3px; accent-color: var(--primary);" />
                                    <span style="font-size: var(--font-sm); color: ${isSelected ? 'var(--primary-dark)' : 'var(--text-muted)'}; line-height: 1.4;"><strong>${key.toUpperCase()}.</strong> ${value}</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Botonera de Navegación del Examen -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
                    <button class="btn btn-secondary btn-sm" id="prev-question-btn" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                        <i class="fa-solid fa-arrow-left"></i> Anterior
                    </button>
                    ${isLastQuestion 
                        ? `<button class="btn btn-primary btn-sm" id="submit-exam-btn" style="background: var(--success); border-color: var(--success);"><i class="fa-solid fa-file-shield"></i> Finalizar y Calificar</button>`
                        : `<button class="btn btn-primary btn-sm" id="next-question-btn">Siguiente <i class="fa-solid fa-arrow-right"></i></button>`
                    }
                </div>
            </div>
        `;

        this.bindExamInterfaceEvents(container);
    },

    // Vincula eventos internos de la ejecución de la prueba
    bindExamInterfaceEvents(container) {
        const question = this.activeExam.questions[this.currentQuestionIndex];

        // Guardar respuesta seleccionada
        container.querySelectorAll('input[name="question_option"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.userAnswers[question.id] = e.target.value;
                this.renderExamInterface(container); // Re-render rápido para aplicar estilos de selección
            });
        });

        // Navegación: Pregunta Anterior
        container.querySelector('#prev-question-btn')?.addEventListener('click', () => {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.renderExamInterface(container);
            }
        });

        // Navegación: Siguiente Pregunta
        container.querySelector('#next-question-btn')?.addEventListener('click', () => {
            if (!this.userAnswers[question.id]) {
                if (window.AppInstance) window.AppInstance.showToast('Por favor, seleccione una opción antes de continuar.', 'warning');
                return;
            }
            if (this.currentQuestionIndex < this.activeExam.questions.length - 1) {
                this.currentQuestionIndex++;
                this.renderExamInterface(container);
            }
        });

        // Finalización Forzada por el Usuario
        container.querySelector('#submit-exam-btn')?.addEventListener('click', () => {
            if (!this.userAnswers[question.id]) {
                if (window.AppInstance) window.AppInstance.showToast('Por favor, responda la última pregunta.', 'warning');
                return;
            }
            this.evaluateExamResults(container);
        });
    },

    // Motor de Gestión del Tiempo (Temporizador regresivo)
    startTimer(container) {
        clearInterval(this.timerInterval);
        const timerDisplay = document.getElementById('exam-timer-display');
        
        const updateTimerUI = () => {
            if (!timerDisplay) return;
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timerDisplay.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.timeLeft <= 60) {
                timerDisplay.style.background = 'var(--danger-bg)';
                timerDisplay.style.color = 'var(--danger)';
            }
        };

        updateTimerUI();

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            updateTimerUI();

            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                if (window.AppInstance) window.AppInstance.showToast('Tiempo límite agotado. Procesando examen automáticamente.', 'danger');
                this.evaluateExamResults(container);
            }
        }, 1000);
    },

    // Motor Calificador: Cálculo del score y guardado de hitos en LocalStorage
    evaluateExamResults(container) {
        clearInterval(this.timerInterval);
        
        let correctCount = 0;
        const totalQuestions = this.activeExam.questions.length;

        this.activeExam.questions.forEach(q => {
            if (this.userAnswers[q.id] === q.correct) {
                correctCount++;
            }
        });

        const finalScorePercentage = Math.round((correctCount / totalQuestions) * 100);
        const isApproved = finalScorePercentage >= this.activeExam.minScore;

        // Registrar aprobación en LocalStorage para habilitar módulos dependientes (Certificados)
        if (isApproved) {
            const approvedCertificates = JSON.parse(localStorage.getItem('aoma_certificates_unlocked')) || [];
            if (!approvedCertificates.includes(this.activeExam.id)) {
                approvedCertificates.push(this.activeExam.id);
                localStorage.setItem('aoma_certificates_unlocked', JSON.stringify(approvedCertificates));
            }
        }

        // Renderizado del Dashboard de Resultados
        container.innerHTML = `
            <div class="glassmorphism animate-fade-in" style="max-width: 600px; padding: var(--space-6); border-radius: var(--radius-md); text-align: center;">
                <div style="margin-bottom: var(--space-4);">
                    ${isApproved 
                        ? `<i class="fa-solid fa-circle-check" style="font-size: 4rem; color: var(--success);"></i>`
                        : `<i class="fa-solid fa-circle-xmark" style="font-size: 4rem; color: var(--danger);"></i>`
                    }
                </div>
                
                <h3 style="color: var(--primary-dark); margin-bottom: var(--space-1);">${isApproved ? '¡Examen Aprobado con Éxito!' : 'Examen No Aprobado'}</h3>
                <p style="color: var(--text-muted); font-size: var(--font-sm); margin-bottom: var(--space-5);">${this.activeExam.title}</p>

                <div style="display: flex; justify-content: center; gap: var(--space-6); margin-bottom: var(--space-6); background: rgba(0,0,0,0.1); padding: var(--space-4); border-radius: var(--radius-md);">
                    <div>
                        <span style="font-size: 12px; color: var(--text-muted); display: block;">Calificación</span>
                        <strong style="font-size: var(--font-2xl); color: ${isApproved ? 'var(--success)' : 'var(--danger)'};">${finalScorePercentage}%</strong>
                    </div>
                    <div style="border-left: 1px solid var(--border-subtle);"></div>
                    <div>
                        <span style="font-size: 12px; color: var(--text-muted); display: block;">Correctas</span>
                        <strong style="font-size: var(--font-2xl); color: var(--primary-dark);">${correctCount} / ${totalQuestions}</strong>
                    </div>
                </div>

                <p style="font-size: var(--font-sm); color: var(--text-muted); line-height: 1.5; margin-bottom: var(--space-5);">
                    ${isApproved 
                        ? 'Las credenciales de aprobación han sido inyectadas en su legajo digital. Ya puede descargar su correspondiente certificado oficial en la pestaña lateral.'
                        : 'No se alcanzó el puntaje de corte requerido para la certificación. Le recomendamos repasar los videos formativos técnicos e intentar nuevamente.'
                    }
                </p>

                <div style="display: flex; gap: var(--space-3); justify-content: center;">
                    <button class="btn btn-secondary btn-sm" id="back-to-exams-list-btn">Volver al Listado</button>
                    ${isApproved 
                        ? `<a href="#certificados" class="btn btn-primary btn-sm nav-trigger" style="text-decoration:none; display:inline-flex; align-items:center;"><i class="fa-solid fa-award" style="margin-right:6px;"></i> Ver Certificados</a>`
                        : `<button class="btn btn-primary btn-sm" id="retry-exam-btn"><i class="fa-solid fa-rotate-right"></i> Reintentar Examen</button>`
                    }
                </div>
            </div>
        `;

        // Acciones post-examen
        container.querySelector('#back-to-exams-list-btn')?.addEventListener('click', () => this.renderExamList(container));
        container.querySelector('#retry-exam-btn')?.addEventListener('click', () => this.startExamEngine(this.activeExam.id, container));
    }
};