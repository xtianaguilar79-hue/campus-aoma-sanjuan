/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo 06: Asistente AI Gremial, Procesador Conversacional y UI del Chat Informativo
 */

window.ModuleChat = {
    knowledgeBase: {},

    // Inicializador del módulo (Inyectado por el Router en app.js)
    init(container) {
        this.loadChatKnowledgeBase();
        this.renderInterface(container);
        this.bindEvents(container);
        this.sendInitialGreeting();
    },

    // Base de conocimiento semántica para simular respuestas de la IA local
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

    // Renderizado completo de la interfaz de chat en la SPA
    renderInterface(container) {
        container.innerHTML = `
            <div style="margin-bottom: var(--space-4);">
                <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Asistente Técnico AI</h2>
                <p style="color: var(--text-muted); font-size: var(--font-sm);">Consultas instantáneas de convenios paritarios, normativas operativas y soporte normativo de AOMA.</p>
            </div>

            <div class="glassmorphism" style="max-width: 800px; height: 500px; border-radius: var(--radius-md); display: flex; flex-direction: column; overflow: hidden;">
                <div style="padding: var(--space-4); background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; gap: var(--space-3);">
                    <div style="width: 10px; height: 10px; background: var(--success); border-radius: var(--radius-round); box-shadow: 0 0 8px var(--success);"></div>
                    <div>
                        <strong style="font-size: var(--font-sm); color: var(--primary-dark); display: block;"><i class="fa-solid fa-robot"></i> Inteligencia Gremial Activa</strong>
                        <span style="font-size: 11px; color: var(--text-muted);">Sincronizado con legislación minera 2026</span>
                    </div>
                </div>

                <div id="chat-messages-box" style="flex-grow: 1; padding: var(--space-4); overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-3); background: rgba(0,0,0,0.05);">
                    </div>

                <form id="chat-input-form" style="padding: var(--space-3); background: var(--bg-surface); border-top: 1px solid var(--border-subtle); display: flex; gap: var(--space-2);">
                    <input type="text" id="chat-user-message" required placeholder="Escriba su consulta... (Ej: CCT 599/10, Horas Extras, EPP)" autocomplete="off" style="flex-grow: 1; padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); border: 1px solid var(--text-light); background: rgba(0,0,0,0.1); color: var(--text-main); font-size: var(--font-sm);" />
                    <button type="submit" class="btn btn-primary" style="display: flex; align-items: center; justify-content: center; width: 42px; height: 36px; padding: 0;">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        `;
    },

    // Vinculación de eventos al formulario de la caja de chat
    bindEvents(container) {
        const form = container.querySelector('#chat-input-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserSubmit();
        });
    },

    // Manejador del mensaje del afiliado
    handleUserSubmit() {
        const input = document.getElementById('chat-user-message');
        if (!input) return;

        const rawMessage = input.value.trim();
        if (!rawMessage) return;

        // 1. Renderizar burbuja del mensaje del usuario en el DOM
        this.appendMessageBubble(rawMessage, 'user');
        input.value = ''; // Limpiar entrada de texto
        input.focus();

        // 2. Inyectar indicador de escritura simulado
        this.showTypingIndicator();

        // 3. Procesamiento semántico diferido (retraso premium de 800ms)
        setTimeout(() => {
            this.removeTypingIndicator();
            const reply = this.processNaturalLanguage(rawMessage);
            this.appendMessageBubble(reply, 'bot');
        }, 800);
    },

    // Motor de emparejamiento de respuestas (NLP Simplificado en Memoria)
    processNaturalLanguage(text) {
        const cleanText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remover acentos
        
        let matchedReply = null;

        // Evaluar coincidencias por palabras clave clave en el diccionario
        for (const [key, value] of Object.entries(this.knowledgeBase)) {
            if (cleanText.includes(key)) {
                matchedReply = value;
                break;
            }
        }

        // Respuesta por defecto adaptada al entorno legal
        if (!matchedReply) {
            matchedReply = 'Disculpa, no logré asociar los términos exactos en el índice local. Puedes consultar sobre temas específicos como "CCT 599/10", "EPP", "Horas Extras" o bien dirigirte al menú de Preguntas Frecuentes (FAQ) de la seccional.';
        }

        return matchedReply;
    },

    // Inyección atómica de burbujas de diálogo estilizadas
    appendMessageBubble(text, sender) {
        const messagesBox = document.getElementById('chat-messages-box');
        if (!messagesBox) return;

        const bubble = document.createElement('div');
        bubble.style.maxWidth = '75%';
        bubble.style.padding = 'var(--space-2) var(--space-3)';
        bubble.style.borderRadius = 'var(--radius-md)';
        bubble.style.fontSize = 'var(--font-sm)';
        bubble.style.lineHeight = '1.4';
        bubble.className = 'animate-fade-in';

        if (sender === 'user') {
            bubble.style.alignSelf = 'flex-end';
            bubble.style.background = 'var(--primary-dark)';
            bubble.style.color = '#fff';
            bubble.style.borderBottomRightRadius = '0';
        } else {
            bubble.style.alignSelf = 'flex-start';
            bubble.style.background = 'var(--border-subtle)';
            bubble.style.color = 'var(--text-main)';
            bubble.style.borderTopLeftRadius = '0';
            bubble.style.border = '1px solid var(--border-glass)';
        }

        bubble.innerHTML = text;
        messagesBox.appendChild(bubble);
        
        // Auto-scroll del contenedor hacia abajo para mantener visibilidad del hilo
        messagesBox.scrollTop = messagesBox.scrollHeight;
    },

    // Generador del saludo automático al cargar el componente
    sendInitialGreeting() {
        setTimeout(() => {
            const initialGreeting = this.knowledgeBase['hola'];
            this.appendMessageBubble(initialGreeting, 'bot');
        }, 300);
    },

    // Inyectores gráficos del estado de carga de la IA (Efecto de tres puntos titilando)
    showTypingIndicator() {
        const messagesBox = document.getElementById('chat-messages-box');
        if (!messagesBox || document.getElementById('chat-typing-indicator')) return;

        const indicator = document.createElement('div');
        indicator.id = 'chat-typing-indicator';
        indicator.style.alignSelf = 'flex-start';
        indicator.style.background = 'var(--border-subtle)';
        indicator.style.padding = ' var(--space-2) var(--space-4)';
        indicator.style.borderRadius = 'var(--radius-md)';
        indicator.style.borderTopLeftRadius = '0';
        indicator.style.fontSize = '12px';
        indicator.style.color = 'var(--text-muted)';
        indicator.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Analizando normativas gremiales...`;

        messagesBox.appendChild(indicator);
        messagesBox.scrollTop = messagesBox.scrollHeight;
    },

    removeTypingIndicator() {
        document.getElementById('chat-typing-indicator')?.remove();
    }
};