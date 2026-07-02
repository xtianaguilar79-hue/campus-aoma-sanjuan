// ============================================
// CONVENIO COLECTIVO DE TRABAJO N° 302/75
// ============================================

const CTT_302_75 = {
    id: 1,
    numero: 'CTT 302/75',
    titulo: 'Convenio Colectivo de Trabajo N° 302/75',
    categoria: 'Minería General',
    actividad: 'mineria-extractiva',
    fecha: '1975-01-01',
    actualizado: '2024-06-01',
    resumen: 'Convenio marco para la actividad minera en Argentina. Aplica a empresas como Veladero, Gualcamayo y Vicuña.',
    contenido: `
        <h3>Capítulo I - Ámbito de aplicación</h3>
        <p>El presente convenio regula las relaciones laborales en la actividad minera, comprendiendo todas las empresas que exploten minas, canteras y establecimientos de beneficio de minerales en todo el territorio nacional.</p>
        
        <h3>Capítulo II - Jornada de trabajo</h3>
        <p>La jornada normal de trabajo será de 8 horas diarias o 48 semanales para trabajo diurno. Para trabajo subterráneo, la jornada será de 6 horas diarias o 36 semanales.</p>
        
        <h3>Capítulo III - Remuneraciones</h3>
        <p>Los trabajadores percibirán las remuneraciones establecidas en las escalas salariales vigentes, que se actualizarán semestralmente mediante negociación paritaria entre la AOMA y las empresas.</p>
    `,
    archivo: null
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.CTT_302_75 = CTT_302_75;
}

console.log('✅ CTT 302/75 cargado');