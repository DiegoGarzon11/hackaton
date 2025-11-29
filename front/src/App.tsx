import { useEffect, useState } from 'react';
import LineBarAreaComposedChart from './components/ChartSchool';
import PieChartWithPaddingAngle from './components/ChartStudents';
import Chat from './components/Chat';
import { SimpleBarChartHoras, SimpleBarChart } from './components/CompareChart';
import { socket } from './socket';
import { ChartSpline } from 'lucide-react';
function App() {
	const [data, setData] = useState([]);
	const [consultas, setConsultas] = useState(0);
	const [consultasGenral, setConsultasGeneral] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/api/matriculas/getMatriculas')
			.then((res) => res.json())
			.then((data) => {
				setData(data?.totalEstudiantes);
			});
	}, []);
	useEffect(() => {
		fetch('http://localhost:4000/api/reports/sendInfo')
			.then((res) => res.json())
			.then((data) => {
				const res = data?.horasPico?.reduce((acc, curr) => acc + curr.usuarios, 0);
				const resGe = data?.temasMasConsultados?.reduce((acc, curr) => acc + curr.consultas, 0);
				setConsultas(res);
				setConsultasGeneral(resGe);
			});
	}, []);
	useEffect(() => {
		socket.on('statsUpdated', (data) => {
			const { horasPico, temasMasConsultados } = data;
			setConsultas(horasPico?.reduce((acc, curr) => acc + curr.usuarios, 0));
			setConsultasGeneral(temasMasConsultados?.reduce((acc, curr) => acc + curr.consultas, 0));
		});
	}, []);

	return (
		<div className='flex items-center'>
			<div className='w-full '>
				<div className='flex flex-col justify-center h-2/3'>
					<div className='w-full'>
						<header className="bg-[url('/fondo.jpg')] bg-cover py-5 mb-3 rounded-md">
							<div className='flex w-full justify-evenly'>
								{data?.map((d, i) => (
									<div
										key={i}
										className={`rounded-md p-3 w-60 flex flex-col gap-3 ${
											i == 0 ? 'bg-linear-to-r from-blue-900/80 to-violet-500/70  text-white' : 'bg-white'
										}`}>
										<p className={`text-start font-semibold ${i == 0 ? 'text-white' : 'text-blue-900'}`}> Estudiantes {d?.nombre}</p>
										<p className='text-4xl text-start font-semibold '>{d?.estudiantes}</p>
										<p className='flex items-center gap-2'>
											<ChartSpline /> 33% alo año pasado
										</p>
									</div>
								))}
								<div className='rounded-md p-3 w-60 bg-white'>
									<p className='text-start text-blue-900 font-semibold'> Consultas Frecuentes</p>
									<p className='text-4xl text-start font-semibold '>{consultasGenral}</p>
									<ChartSpline />
								</div>
								<div className='rounded-md p-3 w-60 bg-white'>
									<p className='text-start text-blue-900 font-semibold'> Consultas Totales</p>
									<p className='text-4xl text-start font-semibold'>{consultas}</p>
									<ChartSpline />
								</div>
							</div>
						</header>
						<div className='flex gap-3'>
							<div className='w-full bg-white rounded-md'>
								<LineBarAreaComposedChart />
							</div>
							<div className='bg-white flex justify-center items-center  w-1/3'>
								<img
									className='w-full h-auto aspect-square object-cover '
									style={{
										filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))',
									}}
									src='/sopo.png'
									alt=''
								/>
							</div>
						</div>
					</div>
					<div className='flex items-center mt-3 gap-3 bg-white  '>
						<div className='flex w-1/2   gap-3 rounded-md'>
							<div className='flex flex-col items-center w-full  '>
								<p>Total</p>
								<PieChartWithPaddingAngle
									titulo='total'
									color='green'
								/>
							</div>
							<div className='flex flex-col items-center w-full  '>
								<p>Masculino</p>
								<PieChartWithPaddingAngle
									titulo='masculino'
									color=' orange'
								/>
							</div>
							<div className='flex flex-col items-center w-full  '>
								<p>Femenino</p>
								<PieChartWithPaddingAngle
									titulo='femenino'
									color='purple'
								/>
							</div>
						</div>

						<div className='bg-white w-2/5 rounded-md '>
							<SimpleBarChart />
						</div>
						<div className='bg-white w-2/5 rounded-md '>
							<SimpleBarChartHoras />
						</div>
					</div>
				</div>
			</div>
			<div className='absolute bottom-0 right-0'>
				<Chat />
			</div>
		</div>
	);
}

export default App;
