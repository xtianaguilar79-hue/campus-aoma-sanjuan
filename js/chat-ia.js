// ============================================
// CHAT IA - INTEGRACIÓN CON GROQ
// Campus Virtual AOMA San Juan
// ============================================

// Configuración de la API de Groq
const GROQ_CONFIG = {
    apiKey: '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', // ⚠️ REEMPLAZA CON TU CLAVE REAL
    model: 'llama-3.3-70b-versatile',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    temperature: 0.7,
    maxTokens: 1000
};

// Historial de conversación (para contexto)
let conversationHistory = [];

// System Prompt (instrucciones para la IA)
const SYSTEM_PROMPT = `Eres el asistente virtual del Campus Virtual AOMA San Juan (Asociación Obrera Minera Argentina).

Tu rol es ayudar a delegados, dirigentes y trabajadores del sector minero con:
- Consultas sobre convenios colectivos de trabajo (CCT)
- Escalas salariales
- Legislación laboral
- Cursos y capacitaciones disponibles
- Información general sobre actividades mineras

Reglas importantes:
1. Responde de manera clara, profesional y amigable
2. Si no sabes algo específico, recomiendales consultar las secciones del menú o contactar a la Seccional
3. Usa emojis moderadamente para hacer la conversación más amigable
4. Mantén las respuestas concisas (máximo 3-4 párrafos)
5. Si te preguntan sobre temas fuera del ámbito laboral/minero, redirige amablemente al tema`;

// ============================================
// FUNCIÓN PRINCIPAL: Reemplaza getBotResponse de app.js
// ============================================
async function getBotResponse(userMessage) {
    // Mostrar indicador de "escribiendo..."
    addChatMessage('bot', '<div class="typing-indicator"><span></span><span></span><span></span></div>');
    
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
            throw new Error(`Error de API: ${response.status}`);
        }
        
        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        
        // Agregar respuesta al historial
        conversationHistory.push({
            role: 'assistant',
            content: botResponse
        });
        
        // Limitar el historial a las últimas 10 conversaciones (para no gastar muchos tokens)
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
        
        // Remover el indicador de "escribiendo" y mostrar la respuesta real
        removeTypingIndicator();
        return botResponse;
        
    } catch (error) {
        console.error('Error al llamar a Groq:', error);
        removeTypingIndicator();
        return '⚠️ Hubo un error al procesar tu consulta. Por favor, intentá de nuevo en unos segundos.';
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function removeTypingIndicator() {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    
    const typingIndicator = messages.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.parentElement.remove();
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 Chat IA: Iniciado con Groq');
    
    // Modificar el evento submit del formulario del chat para usar la nueva función
    const chatForm = document.getElementById('chatForm');
    if (chatForm) {
        // Remover el listener anterior
        const newChatForm = chatForm.cloneNode(true);
        chatForm.parentNode.replaceChild(newChatForm, chatForm);
        
        // Agregar el nuevo listener
        newChatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            
            if (text) {
                addChatMessage('user', text);
                input.value = '';
                
                // Llamar a la IA (ahora es asíncrono)
                const response = await getBotResponse(text);
                addChatMessage('bot', response);
            }
        });
    }
});

// ============================================
// ESTILOS PARA EL INDICADOR DE "ESCRIBIENDO"
// ============================================
const style = document.createElement('style');
style.textContent = `
    .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 0.5rem 0;
    }
    
    .typing-indicator span {
        width: 8px;
        height: 8px;
        background: var(--text-muted);
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
        }
        30% {
            transform: translateY(-10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);