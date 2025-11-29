import type { Request, Response } from 'express';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import Fuse from 'fuse.js';

const rutasPath = path.join(process.cwd(), 'src/database/rutas.json');

export const getSchools = async (req: Request, res: Response) => {
	const rutas = JSON.parse(readFileSync(rutasPath, 'utf8'));
	const colegios = rutas.map((ruta: any) => ruta.instituci_n_educativa);
	const arraySinDuplicados = [...new Set(colegios)];
	res.json({ schools: arraySinDuplicados });
};
export const getSchoolsByRoute = async (req: Request, res: Response) => {
	const { school } = req.params;

	const rutas = JSON.parse(readFileSync(rutasPath, 'utf8'));
	const rutasFiltradas = rutas.filter((ruta: any) => ruta.instituci_n_educativa === school);
	let response = [];
	let id = [];
	for (let i = 0; i < rutasFiltradas.length; i++) {
		response.push(`El colegio ${school} tiene la ruta numero ${rutasFiltradas[i].id} que realiza el trayecto ${rutasFiltradas[i].recorridos}`);
		id.push(rutasFiltradas[i].id);
	}
	res.json({ response, id });
};
export const CountBeneficiaries = async (req: Request, res: Response) => {
	const { id } = req.query;
	const rutas = JSON.parse(readFileSync(rutasPath, 'utf8'));
	const rutasFiltradas = rutas.filter((ruta: any) => ruta.id == id);
	let response = '';
	for (let i = 0; i < rutasFiltradas.length; i++) {
		response += `la ruta numero ${rutasFiltradas[i].id} tiene ${rutasFiltradas[i].beneficiarios} beneficiarios, hace el trayecto ${rutasFiltradas[i].recorridos}`;
	}
	res.json({ response });
};
export const getByRoute = async (req: Request, res: Response) => {
	const { ubicacion } = req.params;

	const rutas = JSON.parse(readFileSync(rutasPath, 'utf8'));
	const options = {
		keys: ['recorridos'],
		threshold: 0.3,
	};
	const fuse = new Fuse(rutas, options);
	const results: any = fuse.search(ubicacion);
	let resultados = [];
	for (let i = 0; i < results.length; i++) {
		resultados.push({ id: results[i].item.id, colegio: results[i].item.instituci_n_educativa ,recorrido: results[i].item.recorridos});
	}
	res.json({ resultados });
};
