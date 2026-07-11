// ============================================
// CHAT IA - INTEGRACIÓN CON GROQ (VÍA PROXY)
// Campus Virtual AOMA San Juan
// ============================================

// Configuración del proxy interno
const CHAT_CONFIG = {
    endpoint: '/api/chat', // Nuestro propio servidor en Vercel
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
    maxTokens: 800
};

// Historial de conversación
let conversationHistory = [];

// ============================================
// FUNCIÓN PARA CONSTRUIR EL CONTEXTO COMPLETO DE LA PLATAFORMA
// ============================================
function construirContextoPlataforma() {
    if (typeof DATA === 'undefined') {
        console.warn('⚠️ DATA no está definida.');
        return '';
    }
    const contexto = [];

    // 1. Actividades y empresas
    contexto.push('=== ESTRUCTURA DE AOMA SAN JUAN ===');
    if (DATA.actividades) {
        Object.values(DATA.actividades).forEach(act => {
            contexto.push(`- Actividad: ${act.nombre} (${act.descripcion}) - Convenio: ${act.ctt}`);
            if (act.empresas && act.empresas.length) {
                contexto.push(`  Empresas: ${act.empresas.join(', ')}`);
            }
        });
    }
    if (DATA.empresas) {
        Object.values(DATA.empresas).forEach(emp => {
            contexto.push(`- Empresa: ${emp.nombre} (${emp.empresa}) - Ubicación: ${emp.ubicacion}`);
        });
    }

    // 2. Convenios colectivos
    contexto.push('=== CONVENIOS COLECTIVOS ===');
    if (DATA.convenios) {
        DATA.convenios.forEach(conv => {
            const act = DATA.actividades[conv.actividad]?.nombre || conv.actividad;
            contexto.push(`- ${conv.numero}: ${conv.titulo} - ${conv.subtitulo} - Actividad: ${act}`);
            contexto.push(`  Resumen: ${conv.resumen}`);
        });
    }

    // 3. Beneficios sociales
    contexto.push('=== BENEFICIOS SOCIALES ===');
    if (DATA.beneficios) {
        Object.values(DATA.beneficios).forEach(cat => {
            contexto.push(`Categoría: ${cat.titulo}`);
            cat.items.forEach(item => {
                contexto.push(`  - ${item.titulo}: ${item.descripcion} (${item.porcentaje || ''}) ${item.montoMax ? 'Tope: '+item.montoMax : ''}`);
                if (item.exclusiones) contexto.push(`    Exclusiones: ${item.exclusiones}`);
                if (item.documentacion) contexto.push(`    Documentación: ${item.documentacion}`);
            });
        });
    }

    // 4. Preguntas frecuentes
    contexto.push('=== PREGUNTAS FRECUENTES ===');
    if (DATA.faqs) {
        Object.entries(DATA.faqs).forEach(([cat, items]) => {
            contexto.push(`Categoría: ${cat}`);
            items.forEach(faq => {
                contexto.push(`  P: ${faq.pregunta}`);
                contexto.push(`  R: ${faq.respuesta}`);
            });
        });
    }

    // 5. Escalas salariales
    contexto.push('=== ESCALAS SALARIALES ===');
    if (DATA.escalas) {
        Object.entries(DATA.escalas).forEach(([act, escalas]) => {
            contexto.push(`Actividad: ${act}`);
            escalas.forEach(e => {
                contexto.push(`  ${e.categoria} (${e.nivel}): ${DATA.formatCurrency ? DATA.formatCurrency(e.salario) : e.salario}`);
            });
        });
    }

    // 6. Leyes laborales
    contexto.push('=== LEYES LABORALES ===');
    const leyes = [];
    if (typeof LEY_LCT_20744 !== 'undefined') leyes.push(LEY_LCT_20744);
    if (typeof LEY_19587 !== 'undefined') leyes.push(LEY_19587);
    if (typeof LEY_23551 !== 'undefined') leyes.push(LEY_23551);
    if (typeof LEY_24557 !== 'undefined') leyes.push(LEY_24557);
    if (typeof LEY_24013 !== 'undefined') leyes.push(LEY_24013);
    leyes.forEach(ley => {
        contexto.push(`- ${ley.numero}: ${ley.titulo} - ${ley.resumen}`);
    });

    // 7. Capacitaciones
    contexto.push('=== CAPACITACIONES ===');
    const cursos = [];
    if (typeof window !== 'undefined' && window.CAPACITACIONES_REGISTRO) {
        Object.values(window.CAPACITACIONES_REGISTRO).forEach(cap => cursos.push(cap));
    }
    cursos.forEach(curso => {
        contexto.push(`- ${curso.titulo}: ${curso.descripcion || curso.subtitulo || ''} - Nivel: ${curso.nivel || 'General'} - Módulos: ${curso.modulosData ? curso.modulosData.length : 0}`);
    });

    // 8. Autoridades
    contexto.push('=== AUTORIDADES ===');
    if (DATA.autoridades) {
        const nacional = DATA.autoridades.nacional;
        contexto.push(`Nacional: ${nacional.nombre} - ${nacional.agrupacion} (${nacional.periodo})`);
        nacional.comisionDirectiva.forEach(m => {
            contexto.push(`  ${m.cargo}: ${m.nombre}`);
        });
        const provincial = DATA.autoridades.provincial;
        contexto.push(`Seccional San Juan: ${provincial.nombre} - ${provincial.agrupacion} (${provincial.periodo})`);
        provincial.comisionDirectiva.forEach(m => {
            contexto.push(`  ${m.cargo}: ${m.nombre}`);
        });
    }

    // 9. Contacto
    contexto.push('=== CONTACTO ===');
    contexto.push('Dirección: Entre Ríos 468 (S), San Juan Capital');
    contexto.push('Horarios: Lunes a Viernes 08:00 a 17:00 hs');
    contexto.push('Teléfono: 0264-4220191');
    contexto.push('Email: accionsocialyturismo@aomaosamsanjuan.com.ar');
    contexto.push('Email campus: campus@aomasanjuan.org.ar');

    return contexto.join('\n');
}

// ============================================
// SYSTEM PROMPT CON CONTEXTO INYECTADO
// ============================================
function getSystemPrompt() {
    const contexto = construirContextoPlataforma();
    return `Eres el asistente virtual del Campus Virtual AOMA San Juan.

    === INSTRUCCIONES ===
    1. SOLO respondé usando la información del contexto.
    2. Si no tenés respuesta, decí: "No tengo información sobre eso. Contactá a la Seccional al (0264) 422-0191."
    3. NO inventes información ni uses conocimiento externo.

    === CONTEXTO ===
    ${contexto}
    `;
}

// ============================================
// FUNCIÓN PRINCIPAL: Llama al proxy de Vercel
// ============================================
async function getBotResponseGroq(userMessage) {
    try {
        conversationHistory.push({ role: 'user', content: userMessage });

        const messages = [
            { role: 'system', content: getSystemPrompt() },
            ...conversationHistory
        ];

        // Llamamos a nuestro propio servidor (proxy), no a Groq directamente
        const response = await fetch(CHAT_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Error en el proxy:', errorData);
            throw new Error(errorData.error || 'Error en el servidor');
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        conversationHistory.push({ role: 'assistant', content: botResponse });
        if (conversationHistory.length > 20) conversationHistory = conversationHistory.slice(-20);

        return botResponse;
    } catch (error) {
        console.error('❌ Error:', error);
        return `⚠️ Error: ${error.message}. Intentá de nuevo o contactá a la Seccional.`;
    }
}

// ============================================
// INICIALIZACIÓN DEL CHAT
// ============================================
function initChatIA() {
    console.log('🤖 Chat IA: Iniciando con proxy seguro...');
    
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatForm || !chatInput || !chatMessages) {
        console.warn('⚠️ Elementos del chat no encontrados');
        return;
    }
    
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        
        addChatMessageIA('user', text);
        chatInput.value = '';
        
        const typingId = showTypingIndicator(chatMessages);
        const response = await getBotResponseGroq(text);
        removeTypingIndicator(chatMessages, typingId);
        addChatMessageIA('bot', response);
    });

    console.log('✅ Chat IA: Listo');
}

// ============================================
// FUNCIONES AUXILIARES (sin cambios)
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
// ESTILOS (sin cambios)
// ============================================
if (!document.getElementById('chat-ia-styles')) {
    const style = document.createElement('style');
    style.id = 'chat-ia-styles';
    style.textContent = `
        .typing-indicator { display: flex; gap: 4px; padding: 0.5rem 0; align-items: center; }
        .typing-indicator span { width: 8px; height: 8px; background: var(--text-muted, #6b7280); border-radius: 50%; animation: typing-bounce 1.4s infinite; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.7; } 30% { transform: translateY(-10px); opacity: 1; } }
        .chat-message-content strong { color: var(--primary, #1e3a8a); }
        .chat-message-content em { color: var(--text-secondary, #4b5563); }
    `;
    document.head.appendChild(style);
}

// ============================================
// INICIAR
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatIA);
} else {
    initChatIA();
}