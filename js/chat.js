// Sistema de Chat Virtual
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
        
        // Quick replies
        const quickRepliesData = [
            { text: 'Escalas salariales', query: '¿Dónde veo las escalas salariales?' },
            { text: 'Inscripción cursos', query: '¿Cómo me inscribo a una capacitación?' },
            { text: 'Recuperar contraseña', query: '¿Cómo recupero mi contraseña?' },
            { text: 'Beneficios delegado', query: '¿Qué beneficios tengo como delegado?' }
        ];
        
        this.quickReplies.innerHTML = quickRepliesData.map(qr => `
            <button class="quick-reply" onclick="chat.sendQuickReply('${qr.query}')">
                ${qr.text}
            </button>
        `).join('');
        
        // Form submit
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });
        
        // Cargar historial
        this.loadHistory();
    },
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },
    
    open() {
        this.window.classList.remove('hidden');
        this.isOpen = true;
        this.scrollToBottom();
        
        // Si no hay mensajes, mostrar bienvenida
        if (this.messages.children.length === 0) {
            this.addBotMessage(`¡Hola ${app.currentUser.name.split(' ')[0]}! 👋 Soy el asistente virtual de AOMA San Juan. ¿En qué puedo ayudarte hoy?`);
        }
    },
    
    close() {
        this.window.classList.add('hidden');
        this.isOpen = false;
    },
    
    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;
        
        this.addUserMessage(text);
        this.input.value = '';
        this.saveHistory('user', text);
        
        // Mostrar "escribiendo..."
        this.showTyping();
        
        // Respuesta del bot
        setTimeout(() => {
            this.removeTyping();
            const response = this.getBotResponse(text);
            this.addBotMessage(response);
            this.saveHistory('bot', response);
        }, 1000 + Math.random() * 1000);
    },
    
    sendQuickReply(query) {
        this.addUserMessage(query);
        this.saveHistory('user', query);
        
        this.showTyping();
        
        setTimeout(() => {
            this.removeTyping();
            const response = this.getBotResponse(query);
            this.addBotMessage(response);
            this.saveHistory('bot', response);
        }, 800);
    },
    
    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user';
        messageDiv.innerHTML = `
            <div class="chat-message-avatar">
                ${app.currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <div class="chat-message-content">${Utils.escapeHtml(text)}</div>
                <div class="chat-message-time">${new Date().toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    },
    
    addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot';
        messageDiv.innerHTML = `
            <div class="chat-message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div>
                <div class="chat-message-content">${text}</div>
                <div class="chat-message-time">${new Date().toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    },
    
    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="chat-message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="chat-message-content">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        this.messages.appendChild(typingDiv);
        this.scrollToBottom();
    },
    
    removeTyping() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    },
    
    getBotResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        
        for (const [patterns, response] of Object.entries(CONFIG.chatResponses)) {
            const patternList = patterns.split('|');
            if (patternList.some(pattern => lowerMsg.includes(pattern))) {
                return response;
            }
        }
        
        return CONFIG.chatResponses.default;
    },
    
    saveHistory(sender, text) {
        let history = JSON.parse(localStorage.getItem(CONFIG.storageKeys.chatHistory) || '[]');
        history.push({
            sender,
            text,
            timestamp: new Date().toISOString(),
            userId: app.currentUser.id
        });
        
        // Mantener solo últimos 50 mensajes
        if (history.length > 50) {
            history = history.slice(-50);
        }
        
        localStorage.setItem(CONFIG.storageKeys.chatHistory, JSON.stringify(history));
    },
    
    loadHistory() {
        const history = JSON.parse(localStorage.getItem(CONFIG.storageKeys.chatHistory) || '[]');
        const userHistory = history.filter(h => h.userId === app.currentUser.id).slice(-10);
        
        userHistory.forEach(msg => {
            if (msg.sender === 'user') {
                this.addUserMessage(msg.text);
            } else {
                this.addBotMessage(msg.text);
            }
        });
    },
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
};