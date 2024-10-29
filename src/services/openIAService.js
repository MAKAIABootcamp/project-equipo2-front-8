import axios from "axios";

const apiKey = import.meta.env.VITE_OPENIA_API_KEY;
const URL_API = import.meta.env.VITE_OPENIA_URL_API;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para analizar la respuesta y evaluar por criterios específicos
export const analyzeInterviewResponse = async (question, userResponse) => {
  const prompt = `
  Actúa como un reclutador profesional. A continuación te daré una pregunta de entrevista y una respuesta proporcionada por un candidato. Evalúa el rendimiento del candidato con base en los siguientes criterios:

  1. **Claridad**: ¿Es la respuesta fácil de entender y comunica el punto principal claramente?
  2. **Relevancia**: ¿La respuesta es relevante y aborda la pregunta de manera adecuada?
  3. **Formalidad**: ¿El tono de la respuesta es profesional y adecuado para un entorno de entrevista?
  4. **Consejos**: Proporciona sugerencias directas, estrategias efectivas y específicas para mejorar en las áreas donde el candidato muestra oportunidades de desarrollo. Asegúrate de usar un lenguaje asertivo y constructivo, similar al de un mentor técnico. Proporciona pasos de acción claros y ejemplos de cómo podría mejorar en su próximo intento, cuando sea necesario y adapta el tono según el tipo de pregunta (soft skills vs. técnicas).

  Mantén un estilo coherente y profesional, brindando retroalimentación que sea motivadora y respete el esfuerzo del candidato. Evita ser condescendiente y usa un tono que refleje empatía y apoyo en el crecimiento profesional del candidato.

  Formato de salida esperado:
  {
    "claridad": "Calificación del 1 al 10",
    "relevancia": "Calificación del 1 al 10",
    "formalidad": "Calificación del 1 al 10",
    "sugerencias": "Texto con sugerencias específicas para mejorar"
  }

  Pregunta de entrevista: "${question}"
  Respuesta del candidato: "${userResponse}"
  `;

  try {
    const response = await axios.post(
      URL_API,
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Asegurar que la respuesta sea un objeto JavaScript en lugar de un archivo JSON.
    const messageContent = response.data.choices[0].message.content.trim();

    // Evalúa el texto retornado para convertirlo a un objeto sin hacer JSON.parse.
    return eval(`(${messageContent})`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("URL o endpoint incorrecto, verifica tu solicitud.");
    }
    if (error.response && error.response.status === 429) {
      console.log("Rate limit exceeded, retrying after 5 seconds...");
      await delay(5000); // Espera 5 segundos antes de reintentar
      return analyzeInterviewResponse(question, userResponse); // Reintento
    }
    console.error("Error al analizar la respuesta de la entrevista:", error);
    return {
      claridad: "N/A",
      relevancia: "N/A",
      formalidad: "N/A",
      sugerencias: "No se pudo analizar la respuesta. Inténtalo nuevamente.",
    };
  }
};
