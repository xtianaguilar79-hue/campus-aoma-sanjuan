/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: evaluaciones.js (UI Premium Edition)
 */

window.ModuleEvaluaciones = {
    examsDatabase: [],
    activeExam: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    timerInterval: null,
    timeLeft: 0,

    init(container) {
        this.loadExamsDatabase();
        this.renderExamList(container);
    },

    loadExamsDatabase() {
        this.examsDatabase = [
            {
                id: 'exam_higiene',
                title: 'Examen Oficial: Higiene y Seguridad en Minería',
                duration: 600,
                minScore: 70,
                questions: [
                    { id: 'q1', text: 'Ante un desprendimiento de roca inminente en galería subterránea, ¿cuál es la primera acción requerida por protocolo?', options: { a: 'Avisar al supervisor por radio al finalizar el turno.', b: 'Evacuar el área de inmediato hacia zona segura y dar alerta de emergencia.', c: 'Continuar operando la maquinaria con precaución avanzada.', d: 'Proceder a apuntalar la zona sin autorización técnica.' }, correct: 'b' },
                    { id: 'q2', text: '¿Qué normativa nacional regula específicamente los Riesgos del Trabajo en el territorio de la República Argentina?', options: { a: 'Ley de Contrato de Trabajo 20.744.', b: 'Ley Nacional de Minería 1.919.', c: 'Ley de Riesgos del Trabajo 24.557.', d: 'Decreto Reglamentario de Hidrocarburos.' }, correct: 'c' },
                    { id: 'q3', text: '¿Con qué frecuencia mínima debe ser inspeccionado el arnés de seguridad anticaídas por el operario?', options: { a: 'Mensualmente durante las auditorías de planta.', b: 'Antes de cada uso operativo (Inspección Pre-Uso).', c: 'Únicamente después de haber sufrido una caída.', d: 'Cada vez que lo determine el delegado gremial.' }, correct: 'b' }
                ]
            },
            {
                id: 'exam_voladura',
                title: 'Validación Técnica: Operación de Voladura y Explosivos',
                duration: 900,
                minScore: 80,
                questions: [
                    { id: 'qv1', text: '¿Cuántas señales sonoras con sirena deben emitirse obligatoriamente antes de proceder a la detonación?', options: { a: 'Una sola señal continua de 5 minutos.', b: 'Tres señales acústicas diferenciadas espaciadas según protocolo de resguardo.', c: 'Ninguna si el perímetro visual está despejado.', d: 'Dos señales rápidas al momento exacto de la ignición.' }, correct: 'b' }
                ]
            }
        ];
    },

    renderExamList(container) {
        container.innerHTML = `
            <div class="container-premium animate-fade-in">
                <div style="margin-bottom: var(--space-6);">
                    <h2 class="page-title">Evaluaciones Técnicas</h2>
                    <p class="page-subtitle">Valide sus competencias para obtener certificaciones gremiales con validez nacional.</p>
                </div>

                <div id="exams-list-target" style="display: flex; flex-direction: column; gap: var(--space-4); max-width: 800px;">
                    ${this.examsDatabase.map(exam => `
                        <div class="card-premium" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
                            <div>
                                <h4 style="color: var(--text-main); font-weight: var(--weight-semibold); margin-bottom: var(--space-2);">${exam.title}</h4>
                                <div style="display: flex; gap: var(--space-3); font-size: 12px; color: var(--text-muted);">
                                    <span><i class="fa-solid fa-clock"></i> ${exam.duration / 60} min</span>
                                    <span><i class="fa-solid fa-circle-question"></i> ${exam.questions.length} preguntas</span>
                                    <span><i class="fa-solid fa-graduation-cap"></i> Mínimo ${exam.minScore}%</span>
                                </div>
                            </div>
                            <button class="btn btn-primary start-exam-btn" data-id="${exam.id}">Rendir Examen</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.querySelectorAll('.start-exam-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.startExamEngine(btn.getAttribute('data-id'), container);
            });
        });
    },

    startExamEngine(examId, container) {
        this.activeExam = this.examsDatabase.find(e => e.id === examId);
        if (!this.activeExam) return;

        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.timeLeft = this.activeExam.duration;

        this.renderExamInterface(container);
        this.startTimer(container);
    },

    renderExamInterface(container) {
        const question = this.activeExam.questions[this.currentQuestionIndex];
        const isLastQuestion = this.currentQuestionIndex === this.activeExam.questions.length - 1;
        const progressPercentage = ((this.currentQuestionIndex + 1) / this.activeExam.questions.length) * 100;

        container.innerHTML = `
            <div class="container-premium animate-fade-in">
                <div class="card-premium" style="max-width: 800px; padding: var(--space-6);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-3);">
                        <h3 style="font-size: var(--font-base); font-weight: var(--weight-semibold); max-width: 70%;">${this.activeExam.title}</h3>
                        <div id="exam-timer-display" class="badge badge-warning" style="font-family: monospace; font-size: var(--font-sm); padding: var(--space-1) var(--space-3);">--:--</div>
                    </div>

                    <div style="width: 100%; height: 4px; background: var(--border-subtle); border-radius: var(--radius-round); margin-bottom: var(--space-5); overflow: hidden;">
                        <div style="width: ${progressPercentage}%; height: 100%; background: var(--primary); transition: width 0.3s ease;"></div>
                    </div>

                    <div style="margin-bottom: var(--space-6);">
                        <p style="font-size: var(--font-base); font-weight: var(--weight-medium); color: var(--text-main); margin-bottom: var(--space-4);">${question.text}</p>
                        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                            ${Object.entries(question.options).map(([key, value]) => {
                                const isSelected = this.userAnswers[question.id] === key;
                                return `
                                    <label class="card-premium" style="display: flex; gap: var(--space-3); padding: var(--space-3) var(--space-4); cursor: pointer; background: ${isSelected ? 'rgba(59,146,255,0.06)' : 'var(--bg-surface)'}; border-color: ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'};">
                                        <input type="radio" name="question_option" value="${key}" ${isSelected ? 'checked' : ''} style="accent-color: var(--primary); margin-top:4px;" />
                                        <span style="font-size: var(--font-sm); color: var(--text-main);"><strong>${key.toUpperCase()}.</strong> ${value}</span>
                                    </label>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
                        <button class="btn btn-secondary btn-sm" id="prev-question-btn" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}><i class="fa-solid fa-arrow-left"></i> Anterior</button>
                        ${isLastQuestion 
                            ? `<button class="btn btn-primary btn-sm" id="submit-exam-btn" style="background:var(--success);"><i class="fa-solid fa-check-double"></i> Terminar Examen</button>`
                            : `<button class="btn btn-primary btn-sm" id="next-question-btn">Siguiente <i class="fa-solid fa-arrow-right"></i></button>`
                        }
                    </div>
                </div>
            </div>
        `;

        this.bindExamInterfaceEvents(container);
    },

    bindExamInterfaceEvents(container) {
        const question = this.activeExam.questions[this.currentQuestionIndex];

        container.querySelectorAll('input[name="question_option"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.userAnswers[question.id] = e.target.value;
                this.renderExamInterface(container);
            });
        });

        container.querySelector('#prev-question-btn')?.addEventListener('click', () => {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.renderExamInterface(container);
            }
        });

        container.querySelector('#next-question-btn')?.addEventListener('click', () => {
            if (!this.userAnswers[question.id]) {
                if (window.AppInstance) window.AppInstance.showToast('Seleccione una respuesta.', 'warning');
                return;
            }
            this.currentQuestionIndex++;
            this.renderExamInterface(container);
        });

        container.querySelector('#submit-exam-btn')?.addEventListener('click', () => {
            if (!this.userAnswers[question.id]) return;
            this.evaluateExamResults(container);
        });
    },

    startTimer(container) {
        clearInterval(this.timerInterval);
        const timerDisplay = document.getElementById('exam-timer-display');
        
        const updateTimerUI = () => {
            if (!timerDisplay) return;
            const min = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
            const sec = (this.timeLeft % 60).toString().padStart(2, '0');
            timerDisplay.innerText = `${min}:${sec}`;
            if (this.timeLeft <= 60) timerDisplay.className = 'badge badge-danger';
        };

        updateTimerUI();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            updateTimerUI();
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.evaluateExamResults(container);
            }
        }, 1000);
    },

    evaluateExamResults(container) {
        clearInterval(this.timerInterval);
        let correctCount = 0;
        this.activeExam.questions.forEach(q => {
            if (this.userAnswers[q.id] === q.correct) correctCount++;
        });

        const score = Math.round((correctCount / this.activeExam.questions.length) * 100);
        const isApproved = score >= this.activeExam.minScore;

        if (isApproved) {
            const approvedCertificates = JSON.parse(localStorage.getItem('aoma_certificates_unlocked')) || [];
            if (!approvedCertificates.includes(this.activeExam.id)) {
                approvedCertificates.push(this.activeExam.id);
                localStorage.setItem('aoma_certificates_unlocked', JSON.stringify(approvedCertificates));
            }
        }

        container.innerHTML = `
            <div class="container-premium animate-fade-in" style="display:flex; justify-content:center;">
                <div class="card-premium" style="max-width: 500px; text-align: center; width:100%;">
                    <div style="margin-bottom: var(--space-4);">
                        <i class="fa-solid ${isApproved ? 'fa-circle-check' : 'fa-circle-xmark'}" style="font-size: 3.5rem; color: ${isApproved ? 'var(--success)' : 'var(--danger)'};"></i>
                    </div>
                    <h3 class="page-title" style="font-size:var(--font-2xl);">${isApproved ? '¡Evaluación Aprobada!' : 'Examen No Aprobado'}</h3>
                    <p class="page-subtitle" style="margin-bottom: var(--space-5);">${this.activeExam.title}</p>

                    <div style="display: flex; background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); margin-bottom: var(--space-5); justify-content: space-around;">
                        <div>
                            <span style="font-size:12px; color:var(--text-muted); display:block;">Puntaje</span>
                            <strong style="font-size: var(--font-xl); color: ${isApproved ? 'var(--success)' : 'var(--danger)'}">${score}%</strong>
                        </div>
                        <div>
                            <span style="font-size:12px; color:var(--text-muted); display:block;">Correctas</span>
                            <strong style="font-size: var(--font-xl);">${correctCount} / ${this.activeExam.questions.length}</strong>
                        </div>
                    </div>

                    <div style="display:flex; gap: var(--space-2); justify-content:center;">
                        <button class="btn btn-secondary btn-sm" id="back-list-btn">Volver al Listado</button>
                        ${isApproved 
                            ? `<a href="#certificados" class="btn btn-primary btn-sm nav-trigger">Ver Certificado</a>`
                            : `<button class="btn btn-primary btn-sm" id="retry-btn">Reintentar</button>`
                        }
                    </div>
                </div>
            </div>
        `;

        container.querySelector('#back-list-btn')?.addEventListener('click', () => this.renderExamList(container));
        container.querySelector('#retry-btn')?.addEventListener('click', () => this.startExamEngine(this.activeExam.id, container));
    }
};