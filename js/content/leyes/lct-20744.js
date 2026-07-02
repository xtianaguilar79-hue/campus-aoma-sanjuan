// ============================================
// LEY DE CONTRATO DE TRABAJO - LCT 20.744
// ============================================

const LEY_LCT_20744 = {
    id: 1,
    numero: 'LCT 20.744',
    titulo: 'Ley de Contrato de Trabajo',
    categoria: 'Laboral General',
    resumen: 'Regula las relaciones individuales de trabajo en Argentina.',
    contenido: `
        <h3>Artículo 1° - Objeto</h3>
        <p>Esta ley es aplicable a toda relación de trabajo por la cual una persona física realice actos, ejecute obras o preste servicios, mediante remuneración, para otra persona.</p>
        
        <h3>Artículo 2° - Contrato de trabajo</h3>
        <p>Se considera contrato de trabajo cuando una persona se obligue a realizar actos, ejecutar obras o prestar servicios a otra, bajo su dependencia, mediante una remuneración.</p>
        
        <h3>Artículo 20° - Relación de trabajo</h3>
        <p>Hay relación de trabajo cuando una persona realiza actos, ejecuta obras o presta servicios en favor de otra y bajo su dependencia, mediante una remuneración.</p>
        
        <h3>Artículo 21° - Contrato individual de trabajo</h3>
        <p>Contrato individual de trabajo es aquel mediante el cual una persona física se obliga a realizar actos, ejecutar obras o prestar servicios en favor de otra y bajo su dependencia, mediante una remuneración.</p>
        
        <h3>Artículo 92° - Período de prueba</h3>
        <p>Los primeros 3 meses de relación laboral se consideran período de prueba. Durante este período, cualquiera de las partes puede extinguir la relación sin expresión de causa.</p>
        
        <h3>Artículo 245° - Indemnización por antigüedad</h3>
        <p>Un mes de sueldo por cada año de servicio o fracción mayor a 3 meses, tomando como base la mejor remuneración mensual, normal y habitual devengada en el último año.</p>
    `,
    archivo: null
};

// Exportar globalmente
if (typeof window !== 'undefined') {
    window.LEY_LCT_20744 = LEY_LCT_20744;
}

console.log('✅ LCT 20.744 cargada');