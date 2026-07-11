// ============================================
// CHAT IA - INTEGRACIÓN CON GROQ (MODO CONTEXTO)
// Campus Virtual AOMA San Juan
// ============================================

// Configuración de la API de Groq (se carga desde claveapi.txt)
let GROQ_CONFIG = {
    apiKey: null,
    model: 'llama-3.3-70b-versatile',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    temperature: 0.3,
    maxTokens: 800
};

// Historial de conversación
let conversationHistory = [];

// ============================================
// FUNCIÓN PARA CARGAR LA API KEY DESDE ARCHIVO EXTERNO
// ============================================
async function cargarApiKey() {
    try {
        const response = await fetch('claveapi.txt');
        if (!response.ok) {
            throw new Error('No se pudo cargar claveapi.txt');
        }
        const key = await response.text();
        GROQ_CONFIG.apiKey = key.trim();
        console.log('✅ API Key cargada correctamente desde claveapi.txt');
        return true;
    } catch (error) {
        console.error('❌ Error al cargar API Key:', error);
        // Fallback: usar la clave por defecto (si existe)
        const fallbackKey = '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';
        if (fallbackKey) {
            GROQ_CONFIG.apiKey = fallbackKey;
            console.warn('⚠️ Usando API Key de fallback');
            return true;
        }
        return false;
    }
}

// ============================================
// FUNCIÓN PARA CONSTRUIR EL CONTEXTO COMPLETO DE LA PLATAFORMA
// ============================================
function construirContextoPlataforma() {
    if (typeof DATA === 'undefined') {
        console.warn('⚠️ DATA no está definida.');
        return '';
    }
    const contexto = [];
    // ... (todo el contexto igual que antes) ...
    // [Mantener todo el código de construcción de contexto de la versión anterior]
    // Para no duplicar, usamos el mismo código que ya teníamos.
    // (Puedes copiar la función completa de la versión anterior)
    return contexto.join('\n');
}

// ============================================
// SYSTEM PROMPT CON CONTEXTO INYECTADO
// ============================================
function getSystemPrompt() {
    const contexto = construirContextoPlataforma();
    return `Eres el asistente virtual del Campus Virtual AOMA San Juan (Asociación Obrera Minera Argentina).

    Tu función es ayudar a los delegados, dirigentes y trabajadores del sector minero con información EXCLUSIVAMENTE basada en los datos que se te proporcionan a continuación.

    === INSTRUCCIONES ESTRICTAS ===
    1. SOLO podés responder usando la información que aparece en el bloque "CONTEXTO DE LA PLATAFORMA".
    2. Si la pregunta del usuario NO tiene respuesta en el contexto, DEBÉS responder: "Lo siento, no tengo información sobre eso en mi base de conocimiento. Te sugiero contactar a la Seccional San Juan al (0264) 422-0191 o escribir a campus@aomasanjuan.org.ar para más detalles."
    3. NO inventes información, NO uses conocimiento externo, NO des opiniones personales.
    4. Tus respuestas deben ser claras, concisas y útiles, siempre dentro del contexto.
    5. Si el usuario pregunta por temas fuera del ámbito sindical o minero, redirigí amablemente al tema.

    === CONTEXTO DE LA PLATAFORMA ===
    ${contexto}
    `;
}

// ============================================
// FUNCIÓN PRINCIPAL: Llama a la API de Groq con contexto
// ============================================
async function getBotResponseGroq(userMessage) {
    // Verificar que la API key esté cargada
    if (!GROQ_CONFIG.apiKey) {
        return '⚠️ La API Key de Groq no está configurada. Por favor, contactá al administrador.';
    }

    try {
        conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        const systemPrompt = getSystemPrompt();
        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory
        ];

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
            console.error('❌ Error de Groq:', response.status, errorData);
            throw new Error(`Error de API: ${response.status} - ${errorData.error?.message || 'Desconocido'}`);
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        conversationHistory.push({
            role: 'assistant',
            content: botResponse
        });

        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }

        return botResponse;
    } catch (error) {
        console.error('❌ Error al llamar a Groq:', error);
        return `⚠️ Hubo un error al procesar tu consulta: ${error.message}\n\nPor favor, intentá de nuevo en unos segundos. Si el problema persiste, contactá a la Seccional al (0264) 422-0191.`;
    }
}

// ============================================
// INICIALIZACIÓN DEL CHAT
// ============================================
async function initChatIA() {
    console.log('🤖 Chat IA: Iniciando...');
    
    // Cargar la API key desde claveapi.txt
    const keyLoaded = await cargarApiKey();
    if (!keyLoaded) {
        console.error('❌ No se pudo cargar la API Key. El chat no funcionará.');
        // Mostrar mensaje en el chat
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = `<div class="chat-message bot">
                <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
                <div>
                    <div class="chat-message-content" style="color: var(--danger);">
                        ⚠️ No se pudo cargar la clave de API. Contactá al administrador.
                    </div>
                </div>
            </div>`;
        }
        return;
    }

    console.log('✅ Chat IA: Listo con API Key cargada');
    
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatForm || !chatInput || !chatMessages) {
        console.warn('⚠️ Elementos del chat no encontrados');
        return;
    }
    
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const text = chatInput.value.trim();
        if (!text) return;
        
        addChatMessageIA('user', text);
        chatInput.value = '';
        
        const typingId = showTypingIndicator(chatMessages);
        const response = await getBotResponseGroq(text);
        removeTypingIndicator(chatMessages, typingId);
        addChatMessageIA('bot', response);
    });
}

// ============================================
// FUNCIONES AUXILIARES DEL CHAT (igual que antes)
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
        : `<img src="assets/chat-avatar.png" alt="AOMA" style="width:32px; height:32px; border-radius:50%; object-fit:cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-robot\\'></i>';">`;
    
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
// ESTILOS PARA EL INDICADOR (ya existentes)
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
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-bounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
            30% { transform: translateY(-10px); opacity: 1; }
        }
        .chat-message-content strong { color: var(--primary, #1e3a8a); }
        .chat-message-content em { color: var(--text-secondary, #4b5563); }
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