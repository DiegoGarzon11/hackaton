import LineBarAreaComposedChart from './components/ChartSchool';
import Chat from './components/Chat';

function App() {
	return (
		<>
			<div className='flex justify-center items-start mt-20 h-2/3 flex-col'>
				<p className='text-center w-[70%] text-2xl font-bold'>Matriculas en las insituciones educativas año 2022</p>
				<div>
					asjds
				</div>
				<LineBarAreaComposedChart />
			</div>
			<div className='fixed bottom-0 right-10'>
				<Chat />
			</div>
		</>
	);
}

export default App;
