// Sistema de Evaluaciones
const evaluaciones = {
    currentEvaluation: null,
    currentQuestion: 0,
    answers: {},
    timer: null,
    timeRemaining: 0,
    
    init() {
        // Inicialización
    },
    
    async render(container) {
        const evaluations = JSON.parse(localStorage.getItem(CONFIG.storageKeys.evaluations) || '[]');
        const completed = JSON.parse(localStorage.getItem('aoma_evaluations_completed') || '{}');
        
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Evaluaciones 📝</h1>
                <p>Completá las evaluaciones para certificar tus conocimientos</p>
            </div>
            
            <div class="evaluations-list">
                ${evaluations.map(eval => {
                    const isCompleted = completed[`${app.currentUser.id}_${eval.id}`];
                    return this.renderEvaluationCard(eval, isCompleted);
                }).join('')}
            </div>
        `;
    },
    
    renderEvaluationCard(evaluation, completed) {
        const course = app.getCourses().find(c => c.id === evaluation.courseId);
        
        return `
            <div class="eval-card scroll-reveal">
                <div class="eval-header">
                    <div>
                        <h3>${evaluation.title}</h3>
                        <p>${course?.title || 'Curso asociado'} • ${evaluation.questions.length} preguntas • ${evaluation.timeLimit} minutos</p>
                    </div>
                    ${completed ? 
                        `<span class="badge success"><i class="fas fa-check"></i> Completada</span>` :
                        `<button class="btn btn-primary" onclick="evaluaciones.start(${evaluation.id})">Comenzar</button>`
                    }
                </div>
                ${completed ? `
                    <div class="eval-result">
                        <div class="result-score">
                            <span class="score-value">${completed.score}%</span>
                            <span class="score-label">Puntaje obtenido</span>
                        </div>
                        <div class="result-date">
                            Completada el ${Utils.formatDate(completed.date)}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },
    
    start(evaluationId) {
        const evaluation = JSON.parse(localStorage.getItem(CONFIG.storageKeys.evaluations) || '[]')
            .find(e => e.id === evaluationId);
        
        if (!evaluation) return;
        
        this.currentEvaluation = evaluation;
        this.currentQuestion = 0;
        this.answers = {};
        this.timeRemaining = evaluation.timeLimit * 60;
        
        this.showEvaluationScreen();
        this.startTimer();
    },
    
    showEvaluationScreen() {
        const container = document.getElementById('pageContent');
        const question = this.currentEvaluation.questions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / this.currentEvaluation.questions.length) * 100;
        
        container.innerHTML = `
            <div class="evaluation-screen animate-fade-in">
                <div class="eval-header-bar">
                    <div class="eval-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <span>Pregunta ${this.currentQuestion + 1} de ${this.currentEvaluation.questions.length}</span>
                    </div>
                    <div class="eval-timer ${this.timeRemaining < 60 ? 'warning' : ''}">
                        <i class="far fa-clock"></i>
                        <span id="evalTimer">${this.formatTime(this.timeRemaining)}</span>
                    </div>
                </div>
                
                <div class="eval-question-container">
                    <h2 class="eval-question-text">${question.text}</h2>
                    
                    <div class="eval-options">
                        ${question.options.map((option, index) => `
                            <label class="eval-option ${this.answers[this.currentQuestion] === index ? 'selected' : ''}">
                                <input type="radio" name="question" value="${index}" 
                                       ${this.answers[this.currentQuestion] === index ? 'checked' : ''}
                                       onchange="evaluaciones.selectAnswer(${index})">
                                <span class="option-text">${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="eval-footer">
                    <button class="btn btn-secondary" onclick="evaluaciones.cancel()" ${this.currentQuestion === 0 ? 'disabled' : ''}>
                        Anterior
                    </button>
                    ${this.currentQuestion === this.currentEvaluation.questions.length - 1 ?
                        `<button class="btn btn-primary" onclick="evaluaciones.submit()">Finalizar</button>` :
                        `<button class="btn btn-primary" onclick="evaluaciones.nextQuestion()">Siguiente</button>`
                    }
                </div>
            </div>
        `;
    },
    
    selectAnswer(index) {
        this.answers[this.currentQuestion] = index;
        document.querySelectorAll('.eval-option').forEach((opt, i) => {
            opt.classList.toggle('selected', i === index);
        });
    },
    
    nextQuestion() {
        if (this.answers[this.currentQuestion] === undefined) {
            app.showToast('Por favor seleccioná una respuesta', 'warning');
            return;
        }
        
        this.currentQuestion++;
        this.showEvaluationScreen();
    },
    
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showEvaluationScreen();
        }
    },
    
    submit() {
        if (this.answers[this.currentQuestion] === undefined) {
            app.showToast('Por favor seleccioná una respuesta', 'warning');
            return;
        }
        
        clearInterval(this.timer);
        
        // Calcular resultado
        let correct = 0;
        this.currentEvaluation.questions.forEach((q, index) => {
            if (this.answers[index] === q.correct) {
                correct++;
            }
        });
        
        const score = Math.round((correct / this.currentEvaluation.questions.length) * 100);
        const passed = score >= this.currentEvaluation.passingScore;
        
        // Guardar resultado
        let completed = JSON.parse(localStorage.getItem('aoma_evaluations_completed') || '{}');
        completed[`${app.currentUser.id}_${this.currentEvaluation.id}`] = {
            score,
            date: new Date().toISOString(),
            passed,
            answers: this.answers
        };
        localStorage.setItem('aoma_evaluations_completed', JSON.stringify(completed));
        
        // Generar certificado si aprobó
        if (passed) {
            certificados.generate(this.currentEvaluation.courseId, this.currentEvaluation.title, score);
        }
        
        this.showResults(score, passed);
    },
    
    showResults(score, passed) {
        const container = document.getElementById('pageContent');
        
        container.innerHTML = `
            <div class="results-screen animate-scale-in">
                <div class="results-icon ${passed ? 'success' : 'error'}">
                    <i class="fas ${passed ? 'fa-check' : 'fa-times'}"></i>
                </div>
                <h2>${passed ? '¡Felicitaciones!' : 'No aprobado'}</h2>
                <p class="results-message">
                    ${passed ? 'Has completado la evaluación exitosamente' : 'Necesitas 70% o más para aprobar'}
                </p>
                <div class="results-score-large">
                    <span class="score-number">${score}%</span>
                </div>
                <div class="results-actions">
                    <button class="btn btn-primary" onclick="app.navigateTo('evaluaciones')">
                        Volver a Evaluaciones
                    </button>
                    ${passed ? `
                        <button class="btn btn-secondary" onclick="certificados.showLast()">
                            <i class="fas fa-certificate"></i> Ver Certificado
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    },
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeRemaining--;
            
            const timerEl = document.getElementById('evalTimer');
            if (timerEl) {
                timerEl.textContent = this.formatTime(this.timeRemaining);
            }
            
            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
                this.submit();
            }
        }, 1000);
    },
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    cancel() {
        if (confirm('¿Estás seguro que deseas cancelar la evaluación?')) {
            clearInterval(this.timer);
            app.navigateTo('evaluaciones');
        }
    }
};