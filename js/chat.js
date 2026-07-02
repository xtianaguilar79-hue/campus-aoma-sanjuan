/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: chat.js (UI Premium Edition)
 */

window.ModuleChat = {
    knowledgeBase: {},

    init(container) {
        this.loadChatKnowledgeBase();
        this.renderInterface(container);
        this.bindEvents(container);
        this.sendInitialGreeting();
    },

    loadChatKnowledgeBase() {
        this.knowledgeBase = {
            'hola': '¡Hola! Soy tu Asistente Técnico IA de AOMA San Juan. ¿En qué puedo asesorarte hoy con respecto a convenios, seguridad industrial o liquidaciones?',
            'buenos dias': '¡Buenos días! Estoy a tu disposición para resolver dudas laborales o de los módulos de capacitación.',
            'cct 599/10': 'El CCT 599/10 regula la actividad de la Rama de Minería Metalífera a nivel nacional. Contempla adicionales por zona desfavorable, turnos rotativos, desarraigo y los regímenes de francos acumulados (ej. 14x14 o 7x7).',
            'horas extras': 'Según los marcos homologados de la Seccional San Juan, las horas en demasía de la jornada habitual se liquidan al 50% en días laborables y al 100% si se efectúan en días de descanso obligatorio, feriados o sábados después de las 13:00 hs.',
            'epp': 'El Uso de Equipos de Protección Personal es obligatorio bajo la Ley 24.557. En yacimientos de alta montaña, la empresa debe proveer indumentaria térmica con protección UV, calzado con puntera de acero, casco de alta resistencia, protección auditiva y respiradores para material particulado de cal o roca.',
            'licencia': 'Las licencias ordinarias y especiales están fijadas en el CCT aplicable a tu rama. Para exámenes de capacitación oficial aprobados en este campus, dispones de justificación laboral presentando el certificado digital con código QR emitido por nuestra seccional.',
            'gracias': '¡De nada! Es un orgullo para AOMA San Juan capacitar y acompañar a los trabajadores en cada rincón minero de la provincia. Si tienes otra consulta, aquí estaré.',
            'chau': '¡Hasta luego! Recuerda operar siempre bajo estrictos estándares de seguridad.'
        };
    },

    renderInterface(container) {
        container.innerHTML = `
            <div class="container-premium animate-fade-in">
                <div style="margin-bottom: var(--space-4);">
                    <h2 class="page-title">Asistente Técnico AI</h2>
                    <p class="page-subtitle">Soporte legal, paritario y operativo instantáneo en lenguaje natural.</p>
                </div>

                <div class="card-premium" style="max-width: 800px; height: 500px; padding: 0; display: flex; flex-direction: column; background: var(--bg-surface);">
                    <div style="padding: var(--space-4); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; gap: var(--space-3);">
                        <div style="width: 8px; height: 8px; background: var(--success); border-radius: 50%; box-shadow: 0 0 8px var(--success);"></div>
                        <div>
                            <strong style="font-size: var(--font-sm); color: var(--text-main); display: block;"><i class="fa-solid fa-robot"></i> Núcleo Informativo Gremial</strong>
                            <span style="font-size: 11px; color: var(--text-muted);">Legislación Minera e Industrial Homologada</span>
                        </div>
                    </div>

                    <div id="chat-messages-box" style="flex-grow: 1; padding: var(--space-4); overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-3); background: rgba(0,0,0,0.02);"></div>

                    <form id="chat-input-form" style="padding: var(--space-3); border-top: 1px solid var(--border-subtle); display: flex; gap: var(--space-2); background: var(--bg-surface);">
                        <input type="text" id="chat-user-message" class="form-input" required placeholder="Consulte sobre: CCT 599/10, Horas Extras, EPP..." autocomplete="off" />
                        <button type="submit" class="btn btn-primary" style="padding: var(--space-2) var(--space-4);"><i class="fa-solid fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        `;
    },

    bindEvents(container) {
        container.querySelector('#chat-input-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserSubmit();
        });
    },

    handleUserSubmit() {
        const input = document.getElementById('chat-user-message');
        if (!input) return;

        const msg = input.value.trim();
        if (!msg) return;

        this.appendMessageBubble(msg, 'user');
        input.value = '';
        this.showTypingIndicator();

        setTimeout(() => {
            this.removeTypingIndicator();
            this.appendMessageBubble(this.processNaturalLanguage(msg), 'bot');
        }, 800);
    },

    processNaturalLanguage(text) {
        const cleanText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        for (const [key, value] of Object.entries(this.knowledgeBase)) {
            if (cleanText.includes(key)) return value;
        }
        return 'No logré identificar la consulta en el índice paritario. Pruebe consultando palabras clave como "CCT 599/10", "Horas Extras" o "EPP".';
    },

    appendMessageBubble(text, sender) {
        const box = document.getElementById('chat-messages-box');
        if (!box) return;

        const bubble = document.createElement('div');
        bubble.className = 'animate-fade-in';
        bubble.style = `max-width: 75%; padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); font-size: var(--font-sm); line-height: 1.5; margin-bottom: 2px;`;

        if (sender === 'user') {
            bubble.style.alignSelf = 'flex-end';
            bubble.style.background = 'var(--primary-dark)';
            bubble.style.color = '#ffffff';
            bubble.style.borderBottomRightRadius = '0';
        } else {
            bubble.style.alignSelf = 'flex-start';
            bubble.style.background = 'var(--bg-app)';
            bubble.style.border = '1px solid var(--border-subtle)';
            bubble.style.color = 'var(--text-main)';
            bubble.style.borderTopLeftRadius = '0';
        }

        bubble.innerHTML = text;
        box.appendChild(bubble);
        box.scrollTop = box.scrollHeight;
    },

    showTypingIndicator() {
        const box = document.getElementById('chat-messages-box');
        if (!box || document.getElementById('chat-typing-indicator')) return;

        const ind = document.createElement('div');
        ind.id = 'chat-typing-indicator';
        ind.style = 'align-self: flex-start; background: var(--bg-app); border: 1px solid var(--border-subtle); padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); border-top-left-radius: 0; font-size:12px; color:var(--text-muted);';
        ind.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Procesando marco regulatorio...`;
        
        box.appendChild(ind);
        box.scrollTop = box.scrollHeight;
    },

    removeTypingIndicator() {
        document.getElementById('chat-typing-indicator')?.remove();
    },

    sendInitialGreeting() {
        setTimeout(() => {
            this.appendMessageBubble(this.knowledgeBase['all'] || this.knowledgeBase['hola'], 'bot');
        }, 300);
    }
};