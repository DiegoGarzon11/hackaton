import type { Request, Response } from 'express';
import 'dotenv/config';
import { readFileSync } from 'node:fs';
import path from 'node:path';
const matriculasPath = path.join(process.cwd(), 'src/database/matriculas.json');
export const getMatriculas = (req: Request, res: Response) => {
	const matriculas = JSON.parse(readFileSync(matriculasPath, 'utf8'));

	const conteoPorInstitucion: any = {};

	matriculas.forEach((item: any) => {
		const institucion = item.institucion;
		const genero = item.genero.toUpperCase().startsWith('F') ? 'F' : 'M'; 

		if (!conteoPorInstitucion[institucion]) {
			conteoPorInstitucion[institucion] = { F: 0, M: 0 };
		}

		conteoPorInstitucion[institucion][genero]++;
	});

	const conteos = matriculas.reduce((acc: any, cur: any) => {
		const nombre = cur.institucion;

		acc[nombre] = (acc[nombre] || 0) + 1;
		

		return acc;
	}, {});

	const resultado = Object.keys(conteos).map((nombre) => ({
		nombre: nombre.slice(22),
		conteo: conteos[nombre],
		masculino: conteoPorInstitucion[nombre].M,
		femenino: conteoPorInstitucion[nombre].F,
	}));
	const totalEstudiantes = {
		conteo: Object.values(conteos).reduce((acc: number, cur: any) => acc + cur, 0),
		masculino: Object.values(conteoPorInstitucion).reduce((acc: any, cur: any) => acc + cur.M, 0),
		femenino: Object.values(conteoPorInstitucion).reduce((acc: any, cur: any) => acc + cur.F, 0),
	}

	return res.json({resultado, totalEstudiantes});
};
