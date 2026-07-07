// ============================================
// FUNCIONES GLOBALES - CURSO NEGOCIACIÓN COLECTIVA
// Campus Virtual AOMA San Juan
// ============================================

// === CONFIGURACIÓN DEL CURSO ===
const CONFIG_CURSO = {
    id: 'negociacion-colectiva',
    totalModulos: 8,
    moduloAprobacion: 6,
    porcentajeAprobacion: 70,
    totalPreguntas: 20
};

// === VARIABLES GLOBALES ===
let moduloActual = 0;
let respuestasEvaluacion = {};
let modulosCompletados = [];

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    inicializarCurso();
});

function inicializarCurso() {
    cargarProgreso();
    detectarModuloActual();
    actualizarProgresoGlobal();
    console.log('✅ Curso de Negociación Colectiva inicializado');
}

// ============================================
// SISTEMA DE PROGRESO
// ============================================

function cargarProgreso() {
    const progresoGuardado = localStorage.getItem('progreso_' + CONFIG_CURSO.id);
    if (progresoGuardado) {
        modulosCompletados = JSON.parse(progresoGuardado);
    } else {
        modulosCompletados = [];
    }
}

function guardarProgreso() {
    localStorage.setItem('progreso_' + CONFIG_CURSO.id, JSON.stringify(modulosCompletados));
}

function marcarModuloCompleto(numeroModulo) {
    if (!modulosCompletados.includes(numeroModulo)) {
        modulosCompletados.push(numeroModulo);
        guardarProgreso();
        actualizarProgresoGlobal();
    }
}

function detectarModuloActual() {
    const path = window.location.pathname;
    
    // Si estamos en el index principal, no hacer nada
    if (path.endsWith('/index.html') && !path.match(/\d{2}_/)) {
        return;
    }
    
    const carpetas = path.split('/').filter(Boolean);
    const carpetaActual = carpetas[carpetas.length - 2] || '';
    
    const match = carpetaActual.match(/^(\d{2})_/);
    if (match) {
        moduloActual = parseInt(match[1]);
        marcarModuloCompleto(moduloActual);
    }
}

function actualizarProgresoGlobal() {
    const barra = document.getElementById('progresoFill');
    const texto = document.getElementById('progresoTexto');
    
    if (barra && texto) {
        const porcentaje = Math.round((modulosCompletados.length / CONFIG_CURSO.totalModulos) * 100);
        barra.style.width = porcentaje + '%';
        barra.textContent = porcentaje + '%';
        
        if (porcentaje === 100) {
            texto.textContent = '🎉 ¡Felicitaciones! Has completado todo el curso';
        } else if (modulosCompletados.length > 0) {
            texto.textContent = `Has completado ${modulosCompletados.length} de ${CONFIG_CURSO.totalModulos} módulos`;
        } else {
            texto.textContent = 'Comenzá el curso para registrar tu avance';
        }
    }
}

function obtenerProgreso() {
    return {
        completados: modulosCompletados,
        porcentaje: Math.round((modulosCompletados.length / CONFIG_CURSO.totalModulos) * 100),
        moduloActual: moduloActual
    };
}

// ============================================
// NAVEGACIÓN ENTRE MÓDULOS
// ============================================

function navegarAModulo(numeroModulo) {
    const carpetas = [
        '00_introduccion',
        '01_los_cimientos',
        '02_el_mapa_normativo',
        '03_el_camino_paso_a_paso',
        '04_la_practica',
        '05_casos_practicos',
        '06_evaluacion',
        '07_certificado'
    ];
    
    if (numeroModulo >= 0 && numeroModulo < carpetas.length) {
        marcarModuloCompleto(moduloActual);
        window.location.href = '../' + carpetas[numeroModulo] + '/index.html';
    }
}

function moduloAnterior() {
    if (moduloActual > 0) {
        navegarAModulo(moduloActual - 1);
    }
}

function moduloSiguiente() {
    if (moduloActual < CONFIG_CURSO.totalModulos - 1) {
        navegarAModulo(moduloActual + 1);
    }
}

function volverAlInicio() {
    window.location.href = '../index.html';
}

// ============================================
// SISTEMA DE QUIZZES (Mini-evaluaciones)
// ============================================

function verificarRespuesta(elemento, esCorrecta, feedbackId) {
    const padre = elemento.parentElement;
    const opciones = padre.querySelectorAll('.quiz-opcion');
    
    opciones.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    const feedback = document.getElementById(feedbackId);
    
    if (esCorrecta) {
        elemento.classList.add('correct');
        if (feedback) {
            feedback.innerHTML = '<div class="caja-success"><h4>✅ ¡Correcto!</h4><p>Excelente respuesta. Has comprendido el concepto.</p></div>';
            feedback.style.display = 'block';
        }
    } else {
        elemento.classList.add('incorrect');
        if (feedback) {
            feedback.innerHTML = '<div class="caja-warning"><h4>❌ Incorrecto</h4><p>Revisá el contenido del módulo y volvé a intentarlo.</p></div>';
            feedback.style.display = 'block';
        }
    }
}

// ============================================
// EVALUACIÓN FINAL
// ============================================

const PREGUNTAS_EVALUACION = [
    {
        pregunta: "1. ¿Qué ley regula específicamente la negociación colectiva en Argentina?",
        opciones: ["a) Ley 20.744 (LCT)", "b) Ley 14.250", "c) Ley 23.551"],
        correcta: 1
    },
    {
        pregunta: "2. El Art. 14 bis de la Constitución Nacional garantiza a los gremios:",
        opciones: ["a) Concertar convenios colectivos de trabajo", "b) Solo el derecho de huelga", "c) Solo salarios mínimos"],
        correcta: 0
    },
    {
        pregunta: "3. El cupo femenino en la comisión negociadora es del:",
        opciones: ["a) 20%", "b) 25%", "c) 30%"],
        correcta: 2
    },
    {
        pregunta: "4. La ultraactividad del CCT significa que:",
        opciones: ["a) Se aplica solo a trabajadores activos", "b) Sigue vigente tras su vencimiento hasta que se firme uno nuevo", "c) Se aplica a jubilados"],
        correcta: 1
    },
    {
        pregunta: "5. La homologación tácita se produce a los:",
        opciones: ["a) 15 días", "b) 30 días", "c) 60 días"],
        correcta: 1
    },
    {
        pregunta: "6. El plazo para responder una convocatoria a negociar es de:",
        opciones: ["a) 10 días", "b) 15 días", "c) 30 días"],
        correcta: 1
    },
    {
        pregunta: "7. Los asesores técnicos en la comisión negociadora tienen:",
        opciones: ["a) Voz y voto", "b) Voz pero no voto", "c) Solo voto consultivo"],
        correcta: 1
    },
    {
        pregunta: "8. ¿Cuál NO es un supuesto de la negociación colectiva?",
        opciones: ["a) Reconocimiento mutuo", "b) Interdependencia", "c) Ausencia total de conflicto"],
        correcta: 2
    },
    {
        pregunta: "9. Según la técnica de Harvard hay que separar:",
        opciones: ["a) Salarios de horas extras", "b) Personas del problema", "c) Sindicato de empresa"],
        correcta: 1
    },
    {
        pregunta: "10. La preparación representa aproximadamente del éxito en una negociación:",
        opciones: ["a) 30%", "b) 50%", "c) 70%"],
        correcta: 2
    },
    {
        pregunta: "11. En el semáforo de concesiones, en zona ROJO está:",
        opciones: ["a) Fecha exacta de pago", "b) Monto del aumento", "c) Higiene y seguridad"],
        correcta: 2
    },
    {
        pregunta: "12. La fórmula del negociador eficaz es:",
        opciones: ["a) Conflicto + Emoción = Ruptura", "b) Conflicto + Racionalidad = Acuerdo", "c) Conflicto + Fuerza = Victoria"],
        correcta: 1
    },
    {
        pregunta: "13. La función de la negociación que evita la huelga es:",
        opciones: ["a) Económica", "b) Pacificadora", "c) Normativa"],
        correcta: 1
    },
    {
        pregunta: "14. Ante un accidente no denunciado con oferta en negro, el delegado debe:",
        opciones: ["a) Esperar que el trabajador decida", "b) Denunciar ante la ART", "c) No intervenir"],
        correcta: 1
    },
    {
        pregunta: "15. Ante la automatización con camiones autónomos, se debe exigir:",
        opciones: ["a) Reducción de salarios", "b) Cláusula de reconversión laboral", "c) Aumento de jornada"],
        correcta: 1
    },
    {
        pregunta: "16. El Convenio OIT que define la negociación colectiva es:",
        opciones: ["a) C87", "b) C98", "c) C154"],
        correcta: 2
    },
    {
        pregunta: "17. La mala fe en la negociación se considera:",
        opciones: ["a) Una estrategia válida", "b) Una práctica desleal", "c) Un derecho del empleador"],
        correcta: 1
    },
    {
        pregunta: "18. El CCT debe celebrarse:",
        opciones: ["a) Oralmente", "b) Por escrito", "c) Por email"],
        correcta: 1
    },
    {
        pregunta: "19. Los controles del Ministerio para homologar son:",
        opciones: ["a) Solo económico", "b) Legalidad, formalidad y oportunidad", "c) Solo salarial"],
        correcta: 1
    },
    {
        pregunta: "20. La negociación colectiva es un proceso:",
        opciones: ["a) Unilateral", "b) Bilateral", "c) Trilateral"],
        correcta: 1
    }
];

function generarEvaluacion() {
    const container = document.getElementById('evaluacion-container');
    if (!container) return;
    
    container.innerHTML = '';
    respuestasEvaluacion = {};
    
    PREGUNTAS_EVALUACION.forEach((preg, idx) => {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.className = 'pregunta-evaluacion';
        
        let html = `<h4>${preg.pregunta}</h4>`;
        
        preg.opciones.forEach((op, opIdx) => {
            html += `<div class="quiz-opcion" onclick="seleccionarRespuestaEvaluacion(${idx}, ${opIdx}, this)">${op}</div>`;
        });
        
        html += `<div class="quiz-feedback" id="fb-eval-${idx}"></div>`;
        
        preguntaDiv.innerHTML = html;
        container.appendChild(preguntaDiv);
    });
    
    console.log('✅ Evaluación generada con ' + PREGUNTAS_EVALUACION.length + ' preguntas');
}

function seleccionarRespuestaEvaluacion(pregIdx, opIdx, elemento) {
    if (respuestasEvaluacion[pregIdx] !== undefined) return;
    
    respuestasEvaluacion[pregIdx] = opIdx;
    
    const padre = elemento.parentElement;
    const opciones = padre.querySelectorAll('.quiz-opcion');
    const feedback = document.getElementById('fb-eval-' + pregIdx);
    
    opciones.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    const correcta = PREGUNTAS_EVALUACION[pregIdx].correcta;
    
    if (opIdx === correcta) {
        elemento.classList.add('correct');
        if (feedback) {
            feedback.innerHTML = '<div class="caja-success">✅ Correcto</div>';
            feedback.style.display = 'block';
        }
    } else {
        elemento.classList.add('incorrect');
        opciones[correcta].classList.add('correct');
        if (feedback) {
            feedback.innerHTML = '<div class="caja-warning">❌ Incorrecto. La respuesta correcta está marcada en verde.</div>';
            feedback.style.display = 'block';
        }
    }
}

function calcularEvaluacion() {
    let correctas = 0;
    const total = PREGUNTAS_EVALUACION.length;
    
    const respondidas = Object.keys(respuestasEvaluacion).length;
    if (respondidas < total) {
        alert(`⚠️ Has respondido ${respondidas} de ${total} preguntas. Por favor respondé todas antes de enviar.`);
        return false;
    }
    
    PREGUNTAS_EVALUACION.forEach((preg, idx) => {
        if (respuestasEvaluacion[idx] === preg.correcta) {
            correctas++;
        }
    });
    
    const porcentaje = Math.round((correctas / total) * 100);
    const aprobado = porcentaje >= CONFIG_CURSO.porcentajeAprobacion;
    
    const resultadoDiv = document.getElementById('resultado-evaluacion');
    if (resultadoDiv) {
        resultadoDiv.style.display = 'block';
        
        if (aprobado) {
            resultadoDiv.innerHTML = `
                <div class="resultado-evaluacion resultado-aprobado">
                    <h2>🎉 ¡APROBADO!</h2>
                    <div class="puntaje" style="color: var(--color-success);">${correctas}/${total}</div>
                    <p style="font-size: 1.3em;">Obtuviste el <strong>${porcentaje}%</strong> de respuestas correctas</p>
                    <p>Has demostrado dominar los conceptos de negociación colectiva.</p>
                    <button class="btn-curso btn-curso-success" onclick="navegarAModulo(7)" style="margin-top: 20px;">
                        <i class="fas fa-award"></i> Obtener Certificado
                    </button>
                </div>
            `;
            
            localStorage.setItem('curso_' + CONFIG_CURSO.id + '_aprobado', 'true');
            localStorage.setItem('curso_' + CONFIG_CURSO.id + '_puntaje', porcentaje);
            marcarModuloCompleto(6);
        } else {
            resultadoDiv.innerHTML = `
                <div class="resultado-evaluacion resultado-desaprobado">
                    <h2>📚 Seguimos estudiando</h2>
                    <div class="puntaje" style="color: var(--color-danger);">${correctas}/${total}</div>
                    <p style="font-size: 1.3em;">Obtuviste el <strong>${porcentaje}%</strong></p>
                    <p>Necesitás el ${CONFIG_CURSO.porcentajeAprobacion}% para aprobar.</p>
                    <p>Revisá los módulos y volvé a intentarlo.</p>
                    <button class="btn-curso btn-curso-secondary" onclick="reiniciarEvaluacion()" style="margin-top: 20px;">
                        <i class="fas fa-redo"></i> Reintentar Evaluación
                    </button>
                </div>
            `;
        }
        
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return aprobado;
}

function reiniciarEvaluacion() {
    respuestasEvaluacion = {};
    generarEvaluacion();
    
    const resultadoDiv = document.getElementById('resultado-evaluacion');
    if (resultadoDiv) {
        resultadoDiv.style.display = 'none';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// CERTIFICADO
// ============================================

function generarCertificado() {
    const aprobado = localStorage.getItem('curso_' + CONFIG_CURSO.id + '_aprobado');
    if (aprobado !== 'true') {
        alert('⚠️ Debés aprobar la evaluación para obtener el certificado.');
        navegarAModulo(6);
        return;
    }
    
    const puntaje = localStorage.getItem('curso_' + CONFIG_CURSO.id + '_puntaje') || '0';
    const fecha = new Date().toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const fechaEl = document.getElementById('cert-fecha');
    if (fechaEl) fechaEl.textContent = fecha;
    
    const puntajeEl = document.getElementById('cert-puntaje');
    if (puntajeEl) puntajeEl.textContent = puntaje + '%';
    
    console.log('✅ Certificado generado - Puntaje: ' + puntaje + '%');
}

function imprimirCertificado() {
    window.print();
}

// ============================================
// UTILIDADES
// ============================================

function formatearFecha(fecha) {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function mostrarMensaje(tipo, mensaje) {
    const tipos = {
        success: 'caja-success',
        warning: 'caja-warning',
        info: 'caja-info',
        highlight: 'caja-highlight'
    };
    
    const div = document.createElement('div');
    div.className = tipos[tipo] || 'caja-info';
    div.innerHTML = `<p>${mensaje}</p>`;
    
    const contenedor = document.querySelector('.modulo-contenido');
    if (contenedor) {
        contenedor.insertBefore(div, contenedor.firstChild);
        setTimeout(() => div.remove(), 5000);
    }
}

function confirmarAccion(mensaje) {
    return confirm(mensaje);
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================

if (typeof window !== 'undefined') {
    window.navegarAModulo = navegarAModulo;
    window.moduloAnterior = moduloAnterior;
    window.moduloSiguiente = moduloSiguiente;
    window.volverAlInicio = volverAlInicio;
    window.marcarModuloCompleto = marcarModuloCompleto;
    window.obtenerProgreso = obtenerProgreso;
    window.verificarRespuesta = verificarRespuesta;
    window.generarEvaluacion = generarEvaluacion;
    window.seleccionarRespuestaEvaluacion = seleccionarRespuestaEvaluacion;
    window.calcularEvaluacion = calcularEvaluacion;
    window.reiniciarEvaluacion = reiniciarEvaluacion;
    window.generarCertificado = generarCertificado;
    window.imprimirCertificado = imprimirCertificado;
    window.mostrarMensaje = mostrarMensaje;
    window.confirmarAccion = confirmarAccion;
    window.formatearFecha = formatearFecha;
}

console.log('✅ Funciones del curso cargadas correctamente');