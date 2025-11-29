import Fuse from 'fuse.js';
import path from 'node:path';
import fs from 'node:fs';
import { io } from '../app.ts';

console.log('📡 Stats emitidas a los clientes');

const categories = {
	horarios: ['horario', 'hora', 'apertura', 'cierre'],
	asignaturas: ['materia', 'asignatura', 'clase', 'curso'],
	fechas_entrega: ['entrega', 'fecha', 'deadline', 'vence'],
	reuniones: ['reunion', 'encuentro', 'junta', 'cita'],
	actividades: ['actividad', 'tarea', 'trabajo', 'ejercicio'],
};

const dataBase: any = path.join(process.cwd(), 'src/database/TemasHora.json');
const fuseData = Object.entries(categories).map(([name, words]) => ({
	name,
	words,
}));

function updateHorasPico() {
	try {
		// 1. Leer base de datos
		const raw = fs.readFileSync(dataBase, 'utf8');
		const stats = JSON.parse(raw);

		// 2. Obtener la hora actual (0–23)
		const hour = new Date().getHours();

		// 3. Cada rango es de 3h → índice 0–7
		const index = Math.floor(hour / 3);

		// 4. Validación defensiva
		if (!stats.horasPico || !Array.isArray(stats.horasPico)) {
			throw new Error('❌ El JSON no contiene un array horasPico válido');
		}

		if (!stats.horasPico[index]) {
			throw new Error(`❌ No existe el índice ${index} dentro de horasPico`);
		}

		// 5. Aumentar el contador
		stats.horasPico[index].usuarios += 1;

		// 6. Guardar
		fs.writeFileSync(dataBase, JSON.stringify(stats, null, 2));
		const file = fs.readFileSync(dataBase, 'utf8');
		io.emit('statsUpdated', JSON.parse(file));
	} catch (err) {}
}
function updateStats(category: string) {
	try {
		const file = fs.readFileSync(dataBase, 'utf8');
		const stats = JSON.parse(file);

		const entry = stats.temasMasConsultados.find((t: any) => t.tema === category);

		if (entry) {
			entry.consultas++;
		} else {
			stats.temasMasConsultados.push({
				tema: category,
				consultas: 1,
			});
		}

		fs.writeFileSync(dataBase, JSON.stringify(stats, null, 2));
	} catch (err) {}
}
export function detectCategory(text: string) {
	console.log(text);

	const fuse = new Fuse(fuseData, {
		keys: ['words'],
		threshold: 0.2,
	});

	const textLower = text.toLowerCase();

	let categoryDetected = null;

	// --- DETECCIÓN POR INCLUDES ---
	for (const [category, words] of Object.entries(categories)) {
		if (words.some((w) => textLower.includes(w))) {
			categoryDetected = category;
			break;
		}
	}

	if (!categoryDetected) {
		const results = fuse.search(text);

		if (results.length > 0) {
			categoryDetected = results[0].item.name;
		} else {
			updateHorasPico();
			return 'ninguna';
		}
	}

	updateStats(categoryDetected);
	updateHorasPico();

	const file = fs.readFileSync(dataBase, 'utf8');
	io.emit('statsUpdated', JSON.parse(file));

	console.log('📡 Stats emitidas a los clientes');

	return categoryDetected;
}
