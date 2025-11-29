import LineBarAreaComposedChart from './components/ChartSchool';
import PieChartWithPaddingAngle from './components/ChartStudents';
import Chat from './components/Chat';

function App() {
	return (
		<>
			<div className='flex flex-col justify-center mt-20 h-2/3'>
				<div className='w-full'>
					<p className='text-center w-[70%] text-2xl font-bold'>Matriculas en las insituciones educativas año 2022</p>
					<div>asjds</div>
					<LineBarAreaComposedChart />
				</div>

				<div className='flex w-[70%] h-full mt-20 gap-24'>
					<div className='flex flex-col items-center w-full'>
						<p>Total estudiantes</p>
						<PieChartWithPaddingAngle titulo='conteo' />
					</div>
					<div className='flex flex-col items-center w-full'>
						<p>Hombres</p>
						<PieChartWithPaddingAngle titulo='masculino' />
					</div>
					<div className='flex flex-col items-center w-full'>
						<p>Mujeres</p>
						<PieChartWithPaddingAngle titulo='femenino' />
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
