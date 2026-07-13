// ============================================
// API PROXY PARA DEEPSEEK (Vercel Serverless Function)
// ============================================

export default async function handler(req, res) {
    // Solo aceptamos peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const { messages } = req.body;

        if (!messages) {
            return res.status(400).json({ error: 'Faltan los mensajes' });
        }

        // Llamamos a la API de DeepSeek
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat', // o 'deepseek-reasoner' para razonamiento avanzado
                messages: messages,
                temperature: 0.3,
                max_tokens: 600,
                stream: false
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error de DeepSeek:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Error en DeepSeek' });
        }

        // Devolvemos la respuesta al frontend (mismo formato que Groq)
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error en el proxy:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}