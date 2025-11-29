import type { Request, Response } from 'express';
import Groq from 'groq-sdk';
import 'dotenv/config';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const matriculasPath = path.join(process.cwd(), 'src/database/rutas.json');

const rutas = JSON.parse(readFileSync(matriculasPath, 'utf8'));

const groq = new Groq({ apiKey: process.env.SECRET_KEY });

export const preguntarAlColegio = async (req: Request, res: Response) => {
	const { message } = req.body;
	const getGroqChatCompletion = () => {
		return groq.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: `
     				Eres un asistente de un colegio, donde unicamente das respuestas a preguntas frecuentes.
					Preguntas frecuentes: Horarios, asignaturas, reuniones, fechas de entrega, 
					actividades. 
						
					Si el usuario te pide informacion a actividades o entregas que tenga pendiente, certificados, reportes, o constancias de estudio
					Le debes indicar que esa informacion la obtiene en la seccion de descargar reportes en el mismo chat, ya que tu esa informacion no la puedes dar y cortas la conversacion ahi
					
					reuniones:
					cada primer lunes de cada mes se hace una runion de profesores.
					cada 3 meses, el primer viernes del respectivo mes se realiza una reunion de padres
					cada 2 semanas, los miercoles, se realiza una pequeña reunion estudiantil
					
					Informacion del colegio:
					Horarios lunes a jueves: 7am a 2pm
					Horario los viernes: 8am a 1pm
					Horario fines de semana: 9am a 1pm
					Horario festivos: No hay disponiblidad

					Asignaturas del colegio: Matemáticas, Español, Inglés, Arte, Ciencias, Educacion fisica, Fisica, Historia, Tecnologia
					Si pregunta por entregas, tienes disponible la siguiente informacion.
					Actividades y entregas:
						- El colegio cada mes exige una entrega final, respecto a la asignatura que el usuario decida
					Tipos de entrega:
					Tecnologia y Matematicas : del 2 al 4 de cada mes
					Español e Ingles: del 10 al 12 de cada mes
					Arte e Historia : del 25 al 27 de cada mes
					Fisica y Arte: del 20 al 22 de cada mes
					Educacion Fisica: No aplica entregas
					
					sobre Avisos sobre privacidad y protección de datos personales.
					Tu debes especificar que no almacenas datos, no compartes datos con terceros, solo eres un bot inteligente que tiene informacion y brinda esa informacion academica 
					
				

					Responde únicamente basándote en esta información, respuestas simples, sin extenderte. 		
  `,
				},
				{
					role: 'user',
					content: message,
				},
			],
			model: 'llama-3.1-8b-instant',
			temperature: 0.5,
		});
	};
	try {
		const completion = await getGroqChatCompletion();
		res.status(200).json({ status: 200, question: message, response: completion.choices[0]?.message?.content || '', success: true });
	} catch (error) {
		res.status(409).json({ status: 409, message: 'Error de procesamiento', success: false });
	}
};
