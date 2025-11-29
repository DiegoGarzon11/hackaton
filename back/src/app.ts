import express from 'express';
import cors from 'cors';
import router from './routes/chat.route.ts';
import routerColegios from './routes/colegios.route.ts';
import routerMatriculas from './routes/matriculas.route.ts';
import routerReports from './routes/report.route.ts';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/chat', router);
app.use('/api/colegios', routerColegios);
app.use('/api/matriculas', routerMatriculas);
app.use('/api/reports', routerReports);

const server = app.listen(4000, () => console.log('Servidor iniciado en puerto 4000'));
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});


io.on('connection', (socket) => {
	console.log('🔥 Cliente conectado:', socket.id);

	socket.on('disconnect', () => {
		console.log('❌ Cliente desconectado:', socket.id);
	});
});
export { io };
