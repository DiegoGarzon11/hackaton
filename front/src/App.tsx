import LineBarAreaComposedChart from './components/ChartSchool';
import Chat from './components/Chat';

function App() {
	return (
		<>
			<div className='flex justify-center items-center mt-20 h-2/3 flex-col'>
				<p>Matriculas en las insituciones educativas año 2022</p>
				<LineBarAreaComposedChart />
			</div>
			<div className='fixed bottom-0 right-10'>
				<Chat />
			</div>
		</>
	);
}

export default App;
