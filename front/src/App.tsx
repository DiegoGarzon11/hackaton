import { useEffect, useState } from 'react';
import LineBarAreaComposedChart from './components/ChartSchool';
import PieChartWithPaddingAngle from './components/ChartStudents';
import Chat from './components/Chat';

function App() {

	const [data, setData] = useState({})
	useEffect(() => {
		fetch('http://localhost:4000/api/matriculas/getMatriculas')
			.then(res => res.json())
			.then(data => setData(data?.totalEstudiantes
			));

	}, [])

	return (
		<>
			<div className='flex flex-col justify-center h-2/3'>
				<div className='w-full'>
					<header className="bg-[url('/fondo.jpg')] bg-cover py-10 mb-3 rounded-md">

						<p className='text-center w-full text-2xl font-bold mb-5'>Matriculas en las insituciones educativas año 2022</p>
						<div className="flex w-full justify-evenly">
							<div className='rounded-md p-6 w-50 bg-white'>
								<p className='text-4xl'>{data.conteo}</p>
								<p>Total estudiantes</p>
							</div>
							<div className='rounded-md p-6 w-50 bg-white'>
								<p className='text-4xl'>{data.masculino}</p>
								<p>Hombres</p>
							</div>
							<div className='rounded-md p-6 w-50 bg-white'>
								<p className='text-4xl'>{data.femenino}</p>
								<p>Mujeres</p>
							</div>
						</div>
					</header>
					<div className='flex gap-3'>
						<div className='w-2/3 bg-white rounded-md'>

							<LineBarAreaComposedChart />
						</div>
						<div className='bg-white w-2/5'>
							<img src="/sopo.png" alt="" />
						</div>
					</div>
				</div>

				<div className='flex w-[70%] h-full mt-20 gap-24'>
					<div className='flex flex-col items-center w-full bg-white rounded-md'>
						<p>Conteo</p>
						<PieChartWithPaddingAngle />
					</div>
					<div className='flex flex-col items-center w-full bg-white rounded-md'>
						<p>Conteo</p>
						<PieChartWithPaddingAngle />
					</div>
					<div className='flex flex-col items-center w-full bg-white rounded-md'>
						<p>Conteo</p>
						<PieChartWithPaddingAngle />
					</div>
				</div>

			</div >
			<div className='fixed bottom-0 right-10'>
				<Chat />
			</div>
		</>
	);
}

export default App;
