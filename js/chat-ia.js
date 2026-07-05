// ============================================
// CHAT IA - INTEGRACIÓN CON GROQ
// Campus Virtual AOMA San Juan
// ============================================

// Configuración de la API de Groq
const GROQ_CONFIG = {
    apiKey: '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',
    model: 'llama-3.3-70b-versatile',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    temperature: 0.7,
    maxTokens: 1000
};

// Historial de conversación
let conversationHistory = [];

// System Prompt
const SYSTEM_PROMPT = `Eres el asistente virtual del Campus Virtual AOMA San Juan (Asociación Obrera Minera Argentina).

Tu rol es ayudar a delegados, dirigentes y trabajadores del sector minero con:
- Consultas sobre convenios colectivos de trabajo (CCT)
- Escalas salariales
- Legislación laboral (LCT 20.744, Ley 19.587, Ley 23.551, Ley 24.557, Ley 24.013)
- Cursos y capacitaciones disponibles
- Información general sobre actividades mineras (Minería Extractiva, Cemento, Cal y Piedra, Molienda)

Reglas importantes:
1. Responde de manera clara, profesional y amigable
2. Si no sabés algo específico, recomendá consultar las secciones del menú o contactar a la Seccional al (0264) 422-XXXX
3. Usá emojis moderadamente para hacer la conversación más amigable
4. Mantené las respuestas concisas (máximo 3-4 párrafos)
5. Si te preguntan sobre temas fuera del ámbito laboral/minero, redirigí amablemente al tema
6. Si te preguntan sobre leyes específicas, citá el artículo correspondiente cuando sea posible`;

// ============================================
// FUNCIÓN PRINCIPAL: Llama a la API de Groq
// ============================================
async function getBotResponseGroq(userMessage) {
    try {
        // Agregar mensaje del usuario al historial
        conversationHistory.push({
            role: 'user',
            content: userMessage
        });
        
        // Preparar los mensajes para la API
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory
        ];
        
        // Llamar a la API de Groq
        const response = await fetch(GROQ_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: GROQ_CONFIG.model,
                messages: messages,
                temperature: GROQ_CONFIG.temperature,
                max_tokens: GROQ_CONFIG.maxTokens
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Error de Groq:', response.status, errorData);
            throw new Error(`Error de API: ${response.status} - ${errorData.error?.message || 'Desconocido'}`);
        }
        
        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        
        // Agregar respuesta al historial
        conversationHistory.push({
            role: 'assistant',
            content: botResponse
        });
        
        // Limitar el historial a las últimas 20 conversaciones
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
        
        return botResponse;
        
    } catch (error) {
        console.error('❌ Error al llamar a Groq:', error);
        return `⚠️ Hubo un error al procesar tu consulta: ${error.message}\n\nPor favor, intentá de nuevo en unos segundos. Si el problema persiste, contactá a la Seccional al (0264) 422-XXXX.`;
    }
}

// ============================================
// INICIALIZACIÓN DEL CHAT
// ============================================
function initChatIA() {
    console.log('🤖 Chat IA: Iniciando con Groq');
    
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatForm || !chatInput || !chatMessages) {
        console.warn('⚠️ Elementos del chat no encontrados');
        return;
    }
    
    // Agregar event listener al formulario
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const text = chatInput.value.trim();
        if (!text) return;
        
        // Mostrar mensaje del usuario
        addChatMessageIA('user', text);
        chatInput.value = '';
        
        // Mostrar indicador de "escribiendo"
        const typingId = showTypingIndicator(chatMessages);
        
        // Llamar a la IA
        const response = await getBotResponseGroq(text);
        
        // Remover indicador y mostrar respuesta
        removeTypingIndicator(chatMessages, typingId);
        addChatMessageIA('bot', response);
    });
    
    console.log('✅ Chat IA: Listo');
}

// ============================================
// FUNCIONES AUXILIARES DEL CHAT
// ============================================
function addChatMessageIA(type, text) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const div = document.createElement('div');
    div.className = 'chat-message ' + type;
    
    const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const avatar = type === 'user' 
        ? (typeof currentUser !== 'undefined' && currentUser 
            ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
            : 'U')
        : '<i class="fas fa-robot"></i>';
    
    // Convertir saltos de línea a <br> para formato markdown básico
    const formattedText = text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    div.innerHTML = `
        <div class="chat-message-avatar">${avatar}</div>
        <div>
            <div class="chat-message-content">${formattedText}</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${time}</div>
        </div>
    `;
    
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator(container) {
    const typingId = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.className = 'chat-message bot';
    div.id = typingId;
    div.innerHTML = `
        <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
        <div>
            <div class="chat-message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return typingId;
}

function removeTypingIndicator(container, typingId) {
    const typing = document.getElementById(typingId);
    if (typing) typing.remove();
}

// ============================================
// ESTILOS PARA EL INDICADOR
// ============================================
if (!document.getElementById('chat-ia-styles')) {
    const style = document.createElement('style');
    style.id = 'chat-ia-styles';
    style.textContent = `
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 0.5rem 0;
            align-items: center;
        }
        
        .typing-indicator span {
            width: 8px;
            height: 8px;
            background: var(--text-muted, #6b7280);
            border-radius: 50%;
            animation: typing-bounce 1.4s infinite;
        }
        
        .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing-bounce {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.7;
            }
            30% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }
        
        .chat-message-content strong {
            color: var(--primary, #1e3a8a);
        }
        
        .chat-message-content em {
            color: var(--text-secondary, #4b5563);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INICIAR CUANDO EL DOM ESTÉ LISTO
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatIA);
} else {
    initChatIA();
}