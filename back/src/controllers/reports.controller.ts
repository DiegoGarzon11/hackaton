import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import type { Request, Response } from 'express';
import { createWriteStream, readFileSync } from 'node:fs';
import path from 'node:path';
const estudiantesPath = path.join(process.cwd(), 'src/database/estudiantes.json');

export const DownloadReports = async (req: Request, res: Response) => {
	const workbook = new ExcelJS.Workbook();
	const estudiantes = JSON.parse(readFileSync(estudiantesPath, 'utf8'));
	const sheet = workbook.addWorksheet('Reporte');

	sheet.columns = [
		{ header: 'Nombre', key: 'nombre', width: 20 },
		{ header: 'Apellido', key: 'apellido', width: 20 },
		{ header: 'Edad', key: 'edad', width: 10 },
		{ header: 'Curso', key: 'curso', width: 10 },
		{ header: 'Fallas', key: 'fallas', width: 10 },
		{ header: 'Notas matematicas', key: 'matematicas', width: 30 },
		{ header: 'Notas espanol', key: 'espanol', width: 30 },
		{ header: 'Notas ingles', key: 'ingles', width: 30 },
		{ header: 'Notas arte', key: 'arte', width: 30 },
		{ header: 'Notas ciencias', key: 'ciencias', width: 30 },
		{ header: 'Notas educacion fisica', key: 'educacionFisica', width: 30 },
		{ header: 'Notas fisica', key: 'fisica', width: 30 },
		{ header: 'Notas historia', key: 'historia', width: 30 },
		{ header: 'Notas tecnologia', key: 'tecnologia', width: 30 },
		{ header: 'Promedio', key: 'promedio', width: 30 },
	];
	sheet.getRow(1).eachCell((cell) => {
		cell.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: '413ea0' },
		};
		cell.font = {
			color: { argb: 'FFFFFFFF' },
			bold: true,
		};
		cell.alignment = { vertical: 'middle', horizontal: 'center' };
	});

	for (const estudiante of estudiantes) {
		sheet.addRow({
			nombre: estudiante.nombre,
			apellido: estudiante.apellido,
			edad: estudiante.edad,
			curso: estudiante.curso,
			fallas: estudiante.fallas,
			matematicas: estudiante.notas.Matematicas,
			espanol: estudiante.notas.Español,
			ingles: estudiante.notas.Ingles,
			arte: estudiante.notas.Arte,
			ciencias: estudiante.notas.Ciencias,
			educacionFisica: estudiante.notas.EducacionFisica,
			fisica: estudiante.notas.Fisica,
			historia: estudiante.notas.Historia,
			tecnologia: estudiante.notas.Tecnologia,
			promedio: (
				(estudiante.notas.Matematicas +
					estudiante.notas.Español +
					estudiante.notas.Ingles +
					estudiante.notas.Arte +
					estudiante.notas.Ciencias +
					estudiante.notas.EducacionFisica +
					estudiante.notas.Fisica +
					estudiante.notas.Historia +
					estudiante.notas.Tecnologia) /
				9
			).toFixed(2),
		});
	}



	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	res.setHeader('Content-Disposition', 'attachment; filename=reportes.xlsx');

	await workbook.xlsx.write(res);
	res.end();
};

export const DownloadCertificate = async (req: Request, res: Response) => {
	const { nombre } = req.params;
	const doc = new PDFDocument({
		size: 'A4',
		margins: { top: 50, bottom: 50, left: 50, right: 50 },
	});

	res.setHeader('Content-Disposition', 'attachment; filename="certificado.pdf"');
	res.setHeader('Content-Type', 'application/pdf');

	doc.pipe(res);

	doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');

	doc.fontSize(30).fillColor('#000000').text('CERTIFICADO', { align: 'center', underline: false });


	doc.moveDown(2);

	doc.fontSize(14).fillColor('#000000').text('Este certificado es premiado a', { align: 'center' });

	doc.moveDown(0.5);

	doc.fontSize(24).fillColor('#000000').text(`${nombre}`.toUpperCase(), { align: 'center', underline: true });

	doc.moveDown(1);

	doc.fontSize(14).fillColor('#555555').text(`Por completar exitasacmente el curso`, { align: 'center' });

	doc.moveDown(4);

	const leftX = 100;
	const rightX = 400;

	doc.fontSize(12).fillColor('#000000').text(`DATE\n${new Date().toLocaleDateString()}`, leftX, doc.y, { align: 'left' });

	doc.fontSize(12)
		.fillColor('#000000')
		.text(`TRAINER\n_____ChatDSG_______`, rightX, doc.y - 15, { align: 'left' });

	// Finalizar PDF
	doc.end();
};

