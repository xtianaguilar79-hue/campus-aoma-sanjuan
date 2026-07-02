// ============================================
// CHAT VIRTUAL INTELIGENTE - USA DATA
// ============================================

const chat = {
    window: null,
    messages: null,
    input: null,
    form: null,
    quickReplies: null,
    isOpen: false,

    init() {
        this.window = document.getElementById('chatWindow');
        this.messages = document.getElementById('chatMessages');
        this.input = document.getElementById('chatInput');
        this.form = document.getElementById('chatInputForm');
        this.quickReplies = document.getElementById('chatQuickReplies');

        const quickRepliesData = [
            { text: '💰 Escalas salariales', query: 'escalas salariales' },
            { text: '📋 Convenios', query: 'convenios colectivos' },
            { text: '⚖️ Leyes laborales', query: 'leyes laborales' },
            { text: '🎓 Cursos', query: 'capacitaciones' },
            { text: '🔑 Contraseña', query: 'recuperar contraseña' }
        ];

        if (this.quickReplies) {
            this.quickReplies.innerHTML = quickRepliesData.map(qr => `
                <button type="button" class="quick-reply" onclick="chat.sendQuickReply('${qr.query}')">
                    ${qr.text}
                </button>
            `).join('');
        }

        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
    },

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    },

    open() {
        if (this.window) {
            this.window.classList.remove('hidden');
            this.isOpen = true;
            this.scrollToBottom();
            
            if (this.messages && this.messages.children.length === 0) {
                const nombre = app.currentUser?.name?.split(' ')[0] || 'Usuario';
                this.addBotMessage(`¡Hola ${nombre}! 👋 Soy el asistente virtual de AOMA San Juan. Puedo ayudarte con:\n\n• 💰 Escalas salariales\n• 📋 Convenios colectivos\n• ⚖️ Leyes laborales\n• 🎓 Cursos y capacitaciones\n• 🎥 Videos\n• ❓ Preguntas frecuentes\n\n¿En qué te puedo ayudar?`);
            }
        }
    },

    close() {
        if (this.window) {
            this.window.classList.add('hidden');
            this.isOpen = false;
        }
    },

    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addUserMessage(text);
        this.input.value = '';
        this.showTyping();

        setTimeout(() => {
            this.removeTyping();
            const response = this.getBotResponse(text);
            this.addBotMessage(response);
        }, 800 + Math.random() * 700);
    },

    sendQuickReply(query) {
        this.addUserMessage(query);
        this.showTyping();

        setTimeout(() => {
            this.removeTyping();
            const response = this.getBotResponse(query);
            this.addBotMessage(response);
        }, 600);
    },

    addUserMessage(text) {
        if (!this.messages) return;
        const div = document.createElement('div');
        div.className = 'chat-message user';
        const initials = app.currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
        div.innerHTML = `
            <div class="chat-message-avatar">${initials}</div>
            <div>
                <div class="chat-message-content">${Utils.escapeHtml(text)}</div>
                <div class="chat-message-time">${new Date().toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        this.messages.appendChild(div);
        this.scrollToBottom();
    },

    addBotMessage(text) {
        if (!this.messages) return;
        const div = document.createElement('div');
        div.className = 'chat-message bot';
        div.innerHTML = `
            <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
            <div>
                <div class="chat-message-content">${text.replace(/\n/g, '<br>')}</div>
                <div class="chat-message-time">${new Date().toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        this.messages.appendChild(div);
        this.scrollToBottom();
    },

    showTyping() {
        if (!this.messages) return;
        const div = document.createElement('div');
        div.className = 'chat-message bot typing-indicator';
        div.id = 'typingIndicator';
        div.innerHTML = `
            <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
            <div class="chat-message-content">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        this.messages.appendChild(div);
        this.scrollToBottom();
    },

    removeTyping() {
        document.getElementById('typingIndicator')?.remove();
    },

    // ============================================
    // CEREBRO DEL CHAT - Busca en DATA
    // ============================================
    getBotResponse(userMessage) {
        const q = userMessage.toLowerCase().trim();
        
        // Saludos
        if (/^(hola|buenas|buenos días|buenas tardes|buenas noches)/.test(q)) {
            return `¡Hola! 👋 ¿En qué puedo ayudarte hoy?`;
        }
        if (q.includes('gracias') || q.includes('thanks')) {
            return '¡De nada! 😊 Estoy aquí para lo que necesites.';
        }
        if (q.includes('adiós') || q.includes('chau') || q.includes('bye')) {
            return '¡Hasta luego! 👋 Que tengas un excelente día.';
        }

        // Buscar en toda la base de datos
        const resultados = DATA.buscar(userMessage);
        
        // Prioridad de respuesta
        if (resultados.faqs.length > 0) {
            const faq = resultados.faqs[0];
            return `📋 <strong>${faq.pregunta}</strong><br><br>${faq.respuesta}`;
        }

        if (q.includes('convenio')) {
            if (resultados.convenios.length > 0) {
                const conv = resultados.convenios[0];
                return `📋 Encontré el convenio: <strong>${conv.titulo}</strong><br><br>${conv.resumen}<br><br>Podés consultarlo completo en la sección "Convenios Colectivos" del menú.`;
            }
            return `📋 Tenemos ${DATA.convenios.length} convenios colectivos cargados. Podés consultarlos en la sección "Convenios Colectivos" del menú lateral.`;
        }

        if (q.includes('ley') || q.includes('legislación') || q.includes('legislacion')) {
            if (resultados.leyes.length > 0) {
                const ley = resultados.leyes[0];
                return `⚖️ <strong>${ley.numero} - ${ley.titulo}</strong><br><br>${ley.resumen}<br><br>Consultá el texto completo en "Legislación Laboral".`;
            }
            return `⚖️ Tenemos ${DATA.leyes.length} leyes laborales cargadas. Podés consultarlas en la sección "Legislación Laboral".`;
        }

        if (q.includes('escala') || q.includes('salario') || q.includes('sueldo')) {
            return `💰 Podés consultar las escalas salariales actualizadas en el menú lateral → "Escalas Salariales". Están separadas por actividad: cemento, cal, piedra, metalífera y molienda.`;
        }

        if (q.includes('curso') || q.includes('capacitacion') || q.includes('capacitación')) {
            if (resultados.cursos.length > 0) {
                const curso = resultados.cursos[0];
                return `🎓 Encontré el curso: <strong>${curso.titulo}</strong><br><br>${curso.descripcion}<br><br>Duración: ${curso.duracion} | Nivel: ${curso.nivel}<br>Instructor: ${curso.instructor}`;
            }
            return `🎓 Tenemos ${DATA.cursos.length} cursos disponibles. Podés verlos todos en "Capacitaciones".`;
        }

        if (q.includes('video') || q.includes('charla')) {
            if (resultados.videos.length > 0) {
                const video = resultados.videos[0];
                return `🎥 Encontré el video: <strong>${video.titulo}</strong><br><br>${video.descripcion}<br><br>Duración: ${video.duracion}`;
            }
            return `🎥 Tenemos ${DATA.videos.length} videos en la biblioteca. Podés verlos en "Biblioteca de Videos".`;
        }

        if (q.includes('contraseña') || q.includes('clave') || q.includes('password')) {
            return '🔑 Para recuperar tu contraseña, contactá al administrador al email <strong>campus@aomasanjuan.org.ar</strong> indicando tu DNI y legajo.';
        }

        if (q.includes('horario') || q.includes('atiende') || q.includes('dirección')) {
            return '🕐 La Seccional San Juan atiende de <strong>lunes a viernes de 8:00 a 16:00 hs</strong>.<br><br>📍 Dirección: Rivadavia 345 Oeste, San Juan Capital<br>📞 Tel: (0264) 422-XXXX';
        }

        if (q.includes('beneficio') || q.includes('delegado')) {
            return '👤 Como delegado tenés acceso a:<br><br>• Capacitaciones gratuitas<br>• Escalas salariales actualizadas<br>• Asesoramiento legal<br>• Horas gremiales<br>• Representación ante la empresa';
        }

        if (q.includes('certificado')) {
            return '🎓 Al completar un curso y aprobar la evaluación, obtenés un certificado digital con validez gremial. Podés ver tus certificados en "Mis Certificados".';
        }

        if (q.includes('evaluacion') || q.includes('examen') || q.includes('evaluación')) {
            return `📝 Tenemos evaluaciones para cada curso. Necesitás 70% o más para aprobar. Podés verlas en "Evaluaciones".`;
        }

        if (q.includes('noticia')) {
            return `📰 Tenemos ${DATA.noticias.length} noticias cargadas. Podés verlas en "Noticias Sindicales".`;
        }

        // Respuesta por defecto
        return `No encontré información específica sobre eso. Te recomiendo:<br><br>1️⃣ Revisar las secciones del menú lateral<br>2️⃣ Usar el buscador del header (Ctrl+K)<br>3️⃣ Contactar a la Seccional al (0264) 422-XXXX<br>4️⃣ Escribir a campus@aomasanjuan.org.ar<br><br>¿Hay algo más en lo que pueda ayudarte?`;
    },

    scrollToBottom() {
        if (this.messages) {
            this.messages.scrollTop = this.messages.scrollHeight;
        }
    }
};

if (typeof window !== 'undefined') {
    window.chat = chat;
}
