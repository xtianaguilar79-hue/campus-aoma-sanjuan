// ============================================
// CHAT IA - CONTEXTO ULTRACOMPACTO (3.500 tokens)
// Campus Virtual AOMA San Juan
// ============================================

const CHAT_CONFIG = {
    endpoint: '/api/chat',
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2,
    maxTokens: 500
};

let conversationHistory = [];

// ============================================
// CONTEXTO ULTRACOMPACTO (manualmente optimizado)
// ============================================
function construirContextoPlataforma() {
    if (typeof DATA === 'undefined') {
        return 'Información de la plataforma no disponible.';
    }

    const contexto = [];

    // ========================
    // 1. ACTIVIDADES Y EMPRESAS
    // ========================
    contexto.push('ACTIVIDADES:');
    if (DATA.actividades) {
        Object.values(DATA.actividades).forEach(a => {
            contexto.push(`- ${a.nombre}: ${a.descripcion} (CCT: ${a.ctt}) Empresas: ${a.empresas?.join(', ') || 'N/A'}`);
        });
    }

    // ========================
    // 2. CONVENIOS (SOLO NÚMERO Y RESUMEN)
    // ========================
    contexto.push('CONVENIOS COLECTIVOS:');
    if (DATA.convenios) {
        DATA.convenios.forEach(c => {
            const act = DATA.actividades[c.actividad]?.nombre || c.actividad;
            contexto.push(`- ${c.numero}: ${c.titulo} (${act}) - ${c.resumen}`);
            // Información clave extraída
            if (c.numero.includes('36') || c.numero.includes('38') || c.numero.includes('54')) {
                contexto.push('  Vacaciones: 14 días (hasta 5 años), 21 (5-10), 28 (10-20), 35 (+20 años)');
            }
        });
    }

    // ========================
    // 3. LEYES (SOLO NÚMERO Y RESUMEN)
    // ========================
    contexto.push('LEYES LABORALES:');
    const leyes = [];
    if (typeof LEY_LCT_20744 !== 'undefined') leyes.push(LEY_LCT_20744);
    if (typeof LEY_19587 !== 'undefined') leyes.push(LEY_19587);
    if (typeof LEY_23551 !== 'undefined') leyes.push(LEY_23551);
    if (typeof LEY_24557 !== 'undefined') leyes.push(LEY_24557);
    if (typeof LEY_24013 !== 'undefined') leyes.push(LEY_24013);
    leyes.forEach(l => {
        contexto.push(`- ${l.numero}: ${l.titulo} - ${l.resumen}`);
    });

    // ========================
    // 4. BENEFICIOS SOCIALES
    // ========================
    contexto.push('BENEFICIOS SOCIALES:');
    if (DATA.beneficios) {
        Object.values(DATA.beneficios).forEach(cat => {
            cat.items.forEach(item => {
                contexto.push(`- ${item.titulo}: ${item.descripcion} (${item.porcentaje || ''}) ${item.montoMax || ''}`);
            });
        });
    }

    // ========================
    // 5. PREGUNTAS FRECUENTES
    // ========================
    contexto.push('PREGUNTAS FRECUENTES:');
    if (DATA.faqs) {
        Object.values(DATA.faqs).forEach(cat => {
            cat.forEach(f => {
                contexto.push(`P: ${f.pregunta} -> R: ${f.respuesta}`);
            });
        });
    }

    // ========================
    // 6. ESCALAS SALARIALES (SOLO MINERÍA)
    // ========================
    contexto.push('ESCALAS SALARIALES (Minería Extractiva):');
    if (DATA.escalas && DATA.escalas['mineria-extractiva']) {
        DATA.escalas['mineria-extractiva'].forEach(e => {
            contexto.push(`- ${e.categoria} (${e.nivel}): ${DATA.formatCurrency ? DATA.formatCurrency(e.salario) : e.salario}`);
        });
    }

    // ========================
    // 7. AUTORIDADES (NACIONAL Y SAN JUAN)
    // ========================
    contexto.push('AUTORIDADES:');
    if (DATA.autoridades) {
        const n = DATA.autoridades.nacional;
        contexto.push(`Nacional (${n.periodo}):`);
        n.comisionDirectiva.forEach(m => {
            contexto.push(`  ${m.cargo}: ${m.nombre}`);
        });
        const p = DATA.autoridades.provincial;
        contexto.push(`San Juan (${p.periodo}):`);
        p.comisionDirectiva.forEach(m => {
            contexto.push(`  ${m.cargo}: ${m.nombre}`);
        });
        if (n.vocalesTitulares) contexto.push(`Vocales Nacionales: ${n.vocalesTitulares.join(', ')}`);
        if (p.vocalesTitulares) contexto.push(`Vocales San Juan: ${p.vocalesTitulares.join(', ')}`);
    }

    // ========================
    // 8. CAPACITACIONES (SOLO TÍTULOS)
    // ========================
    contexto.push('CAPACITACIONES DISPONIBLES:');
    const cursos = [];
    if (typeof window !== 'undefined' && window.CAPACITACIONES_REGISTRO) {
        Object.values(window.CAPACITACIONES_REGISTRO).forEach(c => cursos.push(c));
    }
    cursos.slice(0, 5).forEach(c => {
        contexto.push(`- ${c.titulo} (${c.nivel || 'General'}) - ${c.modulosData ? c.modulosData.length : 0} módulos`);
    });

    // ========================
    // 9. CONTACTO
    // ========================
    contexto.push('CONTACTO:');
    contexto.push('Dirección: Entre Ríos 468 (S), San Juan Capital');
    contexto.push('Teléfono: 0264-4220191');
    contexto.push('Email: accionsocialyturismo@aomaosamsanjuan.com.ar');

    return contexto.join('\n');
}

// ============================================
// SYSTEM PROMPT
// ============================================
function getSystemPrompt() {
    const contexto = construirContextoPlataforma();
    return `Eres el asistente del Campus Virtual AOMA San Juan. Respondé SOLO con la información del contexto. Si no sabés, decí: "Contactá a la Seccional al (0264) 422-0191".

=== CONTEXTO ===
${contexto}
`;
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
async function getBotResponseGroq(userMessage) {
    try {
        conversationHistory.push({ role: 'user', content: userMessage });

        const messages = [
            { role: 'system', content: getSystemPrompt() },
            ...conversationHistory
        ];

        const response = await fetch(CHAT_CONFIG.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en el servidor');
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        conversationHistory.push({ role: 'assistant', content: botResponse });
        if (conversationHistory.length > 8) conversationHistory = conversationHistory.slice(-8);

        return botResponse;
    } catch (error) {
        console.error('❌ Error:', error);
        return `⚠️ Error: ${error.message}. Intentá de nuevo.`;
    }
}

// ============================================
// INICIALIZACIÓN (sin cambios)
// ============================================
function initChatIA() {
    console.log('🤖 Chat IA: Iniciando con contexto ultracompacto...');
    
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
// FUNCIONES AUXILIARES (idénticas a antes)
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatIA);
} else {
    initChatIA();
}