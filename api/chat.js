// ============================================
// API PROXY PARA GROQ (Vercel Serverless Function)
// ============================================

export default async function handler(req, res) {
    // Solo aceptamos peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        // Obtenemos los mensajes del cuerpo de la petición
        const { messages } = req.body;

        if (!messages) {
            return res.status(400).json({ error: 'Faltan los mensajes' });
        }

        // Llamamos a la API de Groq con la clave secreta (guardada en Vercel)
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.3,
                max_tokens: 800
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error de Groq:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Error en Groq' });
        }

        // Devolvemos la respuesta al frontend
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error en el proxy:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}