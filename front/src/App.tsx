import { useEffect, useState } from 'react';
import LineBarAreaComposedChart from './components/ChartSchool';
import PieChartWithPaddingAngle from './components/ChartStudents';
import Chat from './components/Chat';
import {SimpleBarChartHoras, SimpleBarChart} from './components/CompareChart';

function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/api/matriculas/getMatriculas')
			.then((res) => res.json())
			.then((data) => setData(data?.totalEstudiantes));
	}, []);

	return (
		<>
			<div className='flex flex-col justify-center h-2/3'>
				<div className='w-full'>
					<header className="bg-[url('/fondo.jpg')] bg-cover py-10 mb-3 rounded-md">
						<p className='text-center w-full text-2xl font-bold mb-5'>Matriculas en las insituciones educativas año 2022</p>
						<div className='flex w-full justify-evenly'>
							{data?.map((d: any) => (
								<div className='rounded-md p-6 w-60 bg-white'>
									<p className='text-4xl'>{d?.estudiantes}</p>
									<p > Estudiantes {d?.nombre}</p>
								</div>
							))}
						</div>
					</header>
					<div className='flex gap-3'>
						<div className='w-2/3 bg-white rounded-md'>
							<LineBarAreaComposedChart />
						</div>
						<div className='bg-white w-1/3'>
							<img
							style={{
								filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))',
							}}
								src='/sopo.png'
								alt=''
							/>
						</div>
					</div>
				</div>
				<div className='flex items-center mt-3 gap-3 bg-white mb-10 '>
					<div className='flex w-1/2    gap-3 rounded-md'>
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
						<SimpleBarChartHoras/>
					</div>
				</div>
			</div>
			<div className='fixed bottom-0 right-10'>
				<Chat />
			</div>
		</>
	);
}

export default App;
