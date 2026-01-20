import { GoogleGenAI } from "@google/genai";
import { TOURS } from "../constants";

// Safe access to process.env
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

const systemInstruction = `
Eres "Sandy", el concierge virtual de Suggar Brown Tours, una agencia de tours premium en Puerto Vallarta.
Tu objetivo es ayudar a los usuarios a encontrar el tour perfecto basándote en sus preferencias (relax, fiesta, naturaleza, familia).
Usa un tono amable, sofisticado y servicial.
Responde brevemente (máximo 3 párrafos).
Tienes acceso a la siguiente lista de tours (solo recomienda estos):
${JSON.stringify(TOURS.map(t => ({ title: t.title, type: t.category, price: t.priceAdult, description: t.shortDescription })))}

Si el usuario pregunta por precios, dáselos. Si el usuario ya decidió, invítalo a dar click en el tour para reservar.
No inventes tours que no estén en la lista.
`;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "Lo siento, mi conexión con el cerebro central (API Key) no está configurada. Por favor contacta soporte.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Disculpa, no entendí eso. ¿Podrías reformularlo?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tuve un pequeño problema técnico. ¿Te puedo ayudar a navegar por nuestros tours manualmente?";
  }
};