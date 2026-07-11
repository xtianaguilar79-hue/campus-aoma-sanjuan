// ============================================
// CHAT IA - INTEGRACIÓN CON GROQ (VÍA PROXY)
// Campus Virtual AOMA San Juan
// ============================================

const CHAT_CONFIG = {
    endpoint: '/api/chat',
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
    maxTokens: 800
};

let conversationHistory = [];

// ============================================
// FUNCIÓN PARA EXTRAER TEXTO DE HTML (SIN ETIQUETAS)
// ============================================
function limpiarHTML(html) {
    if (!html) return '';
    // Eliminar etiquetas <style>, <script>, <table> (contenido pesado)
    let texto = html.replace(/<style[^>]*>.*?<\/style>/gs, '');
    texto = texto.replace(/<script[^>]*>.*?<\/script>/gs, '');
    texto = texto.replace(/<table[^>]*>.*?<\/table>/gs, '[Tabla omitida]');
    // Quitar etiquetas restantes
    texto = texto.replace(/<[^>]+>/g, ' ');
    // Normalizar espacios
    texto = texto.replace(/\s+/g, ' ').trim();
    return texto;
}

// ============================================
// FUNCIÓN PARA EXTRAER ARTÍCULOS RELEVANTES DE UN CONVENIO
// ============================================
function extraerArticulosRelevantes(contenidoHTML) {
    if (!contenidoHTML) return '';
    const texto = limpiarHTML(contenidoHTML);
    // Dividir en párrafos o artículos
    const lineas = texto.split(/\n|\.\s+/).filter(s => s.trim().length > 10);
    const relevantes = [];
    const palabrasClave = ['vacacion', 'licencia', 'jornada', 'salario', 'categoría', 'antigüedad', 'descanso', 'feriado', 'presentismo', 'zona', 'turno', 'horas extra', 'suspensión', 'enfermedad', 'accidente', 'seguro', 'vivienda', 'transporte', 'comedor', 'representación', 'delegado', 'paritaria', 'comisión'];
    
    for (const linea of lineas) {
        const lower = linea.toLowerCase();
        // Si la línea contiene alguna palabra clave, la guardamos
        if (palabrasClave.some(pal => lower.includes(pal))) {
            relevantes.push(linea.trim());
        }
    }
    // Si no encontramos nada, devolvemos un resumen breve
    if (relevantes.length === 0) {
        const primeros = lineas.slice(0, 20).join('. ');
        return `Contenido del convenio (resumen): ${primeros}`;
    }
    return relevantes.join('. ');
}

// ============================================
// FUNCIÓN PARA EXTRAER ARTÍCULOS DE LEYES
// ============================================
function extraerArticulosLeyes(contenidoHTML) {
    if (!contenidoHTML) return '';
    const texto = limpiarHTML(contenidoHTML);
    // Buscar artículos (Art. o Artículo)
    const matches = texto.match(/Art(ículo)?\s*[\d]+\s*[^.]*\./gi);
    if (!matches || matches.length === 0) return texto.substring(0, 500);
    // Tomar los primeros 15 artículos (para no saturar)
    return matches.slice(0, 15).join('. ');
}

// ============================================
// CONSTRUIR CONTEXTO COMPLETO DE LA PLATAFORMA
// ============================================
function construirContextoPlataforma() {
    if (typeof DATA === 'undefined') {
        console.warn('⚠️ DATA no está definida.');
        return 'Información de la plataforma no disponible.';
    }
    const contexto = [];

    // ========================================
    // 1. ACTIVIDADES Y EMPRESAS
    // ========================================
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
            contexto.push(`- Empresa: ${emp.nombre} (${emp.empresa}) - Ubicación: ${emp.ubicacion} - Actividad: ${DATA.actividades[emp.actividad]?.nombre || emp.actividad}`);
        });
    }

    // ========================================
    // 2. CONVENIOS COLECTIVOS (CONTENIDO COMPLETO)
    // ========================================
    contexto.push('=== CONVENIOS COLECTIVOS (DETALLE) ===');
    if (DATA.convenios) {
        DATA.convenios.forEach(conv => {
            contexto.push(`\n--- ${conv.numero} ---`);
            contexto.push(`Título: ${conv.titulo}`);
            contexto.push(`Subtítulo: ${conv.subtitulo}`);
            contexto.push(`Actividad: ${DATA.actividades[conv.actividad]?.nombre || conv.actividad}`);
            if (conv.empresa) contexto.push(`Empresa: ${conv.empresa}`);
            contexto.push(`Resumen: ${conv.resumen}`);
            
            // Extraer contenido detallado del convenio
            let contenidoCompleto = '';
            if (conv.contenido) {
                // Si el convenio ya tiene contenido (los que cargamos con archivos JS)
                contenidoCompleto = extraerArticulosRelevantes(conv.contenido);
            } else if (conv.variable && typeof window[conv.variable] !== 'undefined') {
                // Si está en una variable global (ej: CCT_VELADERO)
                const global = window[conv.variable];
                if (global && global.contenido) {
                    contenidoCompleto = extraerArticulosRelevantes(global.contenido);
                }
            }
            if (contenidoCompleto) {
                contexto.push(`Artículos relevantes: ${contenidoCompleto}`);
            } else {
                contexto.push('(Contenido detallado no disponible en este momento)');
            }
        });
    }

    // ========================================
    // 3. LEYES LABORALES (CONTENIDO COMPLETO)
    // ========================================
    contexto.push('=== LEYES LABORALES ===');
    const leyes = [];
    if (typeof LEY_LCT_20744 !== 'undefined') leyes.push({ ...LEY_LCT_20744, key: 'LCT_20744' });
    if (typeof LEY_19587 !== 'undefined') leyes.push({ ...LEY_19587, key: 'LEY_19587' });
    if (typeof LEY_23551 !== 'undefined') leyes.push({ ...LEY_23551, key: 'LEY_23551' });
    if (typeof LEY_24557 !== 'undefined') leyes.push({ ...LEY_24557, key: 'LEY_24557' });
    if (typeof LEY_24013 !== 'undefined') leyes.push({ ...LEY_24013, key: 'LEY_24013' });
    
    leyes.forEach(ley => {
        contexto.push(`\n--- ${ley.numero}: ${ley.titulo} ---`);
        contexto.push(`Resumen: ${ley.resumen}`);
        if (ley.contenido) {
            const articulos = extraerArticulosLeyes(ley.contenido);
            contexto.push(`Artículos relevantes: ${articulos}`);
        } else {
            contexto.push('(Contenido detallado no disponible en este momento)');
        }
    });

    // ========================================
    // 4. BENEFICIOS SOCIALES
    // ========================================
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

    // ========================================
    // 5. PREGUNTAS FRECUENTES
    // ========================================
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

    // ========================================
    // 6. ESCALAS SALARIALES
    // ========================================
    contexto.push('=== ESCALAS SALARIALES ===');
    if (DATA.escalas) {
        Object.entries(DATA.escalas).forEach(([act, escalas]) => {
            contexto.push(`Actividad: ${act}`);
            escalas.forEach(e => {
                contexto.push(`  ${e.categoria} (${e.nivel}): ${DATA.formatCurrency ? DATA.formatCurrency(e.salario) : e.salario}`);
            });
        });
    }

    // ========================================
    // 7. CAPACITACIONES (TODAS)
    // ========================================
    contexto.push('=== CAPACITACIONES ===');
    const cursos = [];
    if (typeof window !== 'undefined' && window.CAPACITACIONES_REGISTRO) {
        Object.values(window.CAPACITACIONES_REGISTRO).forEach(cap => cursos.push(cap));
    }
    if (DATA.cursos && DATA.cursos.length) {
        DATA.cursos.forEach(c => {
            if (!cursos.some(cap => cap.id === c.id)) cursos.push(c);
        });
    }
    cursos.forEach(curso => {
        contexto.push(`\n--- ${curso.titulo} ---`);
        contexto.push(`Descripción: ${curso.descripcion || curso.subtitulo || ''}`);
        contexto.push(`Nivel: ${curso.nivel || 'General'}`);
        contexto.push(`Categoría: ${curso.categoria || 'General'}`);
        if (curso.modulosData && curso.modulosData.length) {
            contexto.push(`Módulos (${curso.modulosData.length}):`);
            curso.modulosData.forEach((mod, idx) => {
                contexto.push(`  ${idx+1}. ${mod.titulo} - ${mod.duracion || ''}`);
                if (mod.evaluacion) contexto.push(`    Evaluación: ${mod.evaluacion}`);
            });
        }
        if (curso.objetivos && curso.objetivos.length) {
            contexto.push(`Objetivos: ${curso.objetivos.join('. ')}`);
        }
    });

    // ========================================
    // 8. AUTORIDADES (ORGANIGRAMA COMPLETO)
    // ========================================
    contexto.push('=== AUTORIDADES (ORGANIGRAMA) ===');
    if (DATA.autoridades) {
        const nacional = DATA.autoridades.nacional;
        contexto.push(`\n--- NACIONAL ---`);
        contexto.push(`${nacional.nombre} - ${nacional.agrupacion} (${nacional.periodo})`);
        contexto.push('Comisión Directiva:');
        nacional.comisionDirectiva.forEach(m => {
            const func = nacional.funciones ? nacional.funciones[m.cargo] || '' : '';
            contexto.push(`  - ${m.cargo}: ${m.nombre}${func ? ' (Función: '+func+')' : ''}`);
        });
        if (nacional.vocalesTitulares && nacional.vocalesTitulares.length) {
            contexto.push(`Vocales Titulares: ${nacional.vocalesTitulares.join(', ')}`);
        }
        if (nacional.vocalesSuplentes && nacional.vocalesSuplentes.length) {
            contexto.push(`Vocales Suplentes: ${nacional.vocalesSuplentes.join(', ')}`);
        }
        if (nacional.comisionRevisora) {
            contexto.push(`Comisión Revisora de Cuentas - Titulares: ${nacional.comisionRevisora.titulares?.join(', ') || ''}`);
            contexto.push(`Comisión Revisora de Cuentas - Suplentes: ${nacional.comisionRevisora.suplentes?.join(', ') || ''}`);
        }

        const provincial = DATA.autoridades.provincial;
        contexto.push(`\n--- PROVINCIAL (San Juan) ---`);
        contexto.push(`${provincial.nombre} - ${provincial.agrupacion} (${provincial.periodo})`);
        contexto.push('Comisión Directiva:');
        provincial.comisionDirectiva.forEach(m => {
            const func = provincial.funciones ? provincial.funciones[m.cargo] || '' : '';
            contexto.push(`  - ${m.cargo}: ${m.nombre}${func ? ' (Función: '+func+')' : ''}`);
        });
        if (provincial.vocalesTitulares && provincial.vocalesTitulares.length) {
            contexto.push(`Vocales Titulares: ${provincial.vocalesTitulares.join(', ')}`);
        }
        if (provincial.vocalesSuplentes && provincial.vocalesSuplentes.length) {
            contexto.push(`Vocales Suplentes: ${provincial.vocalesSuplentes.join(', ')}`);
        }
        if (provincial.delegadosCongresalesTitulares && provincial.delegadosCongresalesTitulares.length) {
            contexto.push(`Delegados Congresales Titulares: ${provincial.delegadosCongresalesTitulares.join(', ')}`);
        }
        if (provincial.delegadosCongresalesSuplentes && provincial.delegadosCongresalesSuplentes.length) {
            contexto.push(`Delegados Congresales Suplentes: ${provincial.delegadosCongresalesSuplentes.join(', ')}`);
        }
        if (provincial.comisionRevisora) {
            contexto.push(`Comisión Revisora de Cuentas - Titulares: ${provincial.comisionRevisora.titulares?.join(', ') || ''}`);
            contexto.push(`Comisión Revisora de Cuentas - Suplentes: ${provincial.comisionRevisora.suplentes?.join(', ') || ''}`);
        }
    }

    // ========================================
    // 9. CONTACTO Y DATOS DE LA SECCIONAL
    // ========================================
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
    1. SOLO respondé usando la información del contexto que se te proporciona a continuación.
    2. Si la pregunta del usuario NO tiene respuesta en el contexto, DEBÉS responder: "Lo siento, no tengo información sobre eso en mi base de conocimiento. Te sugiero contactar a la Seccional San Juan al (0264) 422-0191 o escribir a campus@aomasanjuan.org.ar para más detalles."
    3. NO inventes información, NO uses conocimiento externo, NO des opiniones personales.
    4. Si te preguntan por un tema fuera del ámbito sindical o minero, redirigí amablemente al tema.
    5. Tus respuestas deben ser claras, concisas y útiles.

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

        const response = await fetch(CHAT_CONFIG.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
    console.log('🤖 Chat IA: Iniciando con proxy seguro y contexto completo...');
    
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
// ESTILOS
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