import { useEffect, useState } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';



const LineBarAreaComposedChart = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/api/matriculas/getMatriculas')
			.then((res) => res.json())
			.then((data) => setData(data.resultado));
	}, []);
	return (
		<ComposedChart
			style={{ width: '100%', maxWidth: '70%', maxHeight: '50vh', aspectRatio: 1.618 }}
			responsive
			data={data}
			margin={{
				top: 20,
				right: 0,
				bottom: 0,
				left: 0,
			}}>
			<CartesianGrid stroke='#f5f5f5' />
			<XAxis
				dataKey='nombre'
				scale='auto'

			/>
			<YAxis />
			<Tooltip />
			<Legend />
			<Area
				type='monotone'
				dataKey='conteo'
				fill='#8884d8'
				stroke='#8884d8'
			/>
			<Bar
				dataKey='conteo'
				barSize={30}
				fill='#413ea0'
			/>
			<Line
				type='monotone'
				dataKey='masculino'
				stroke='#ff7300'
			/>
			<Line
				type='monotone'
				dataKey='femenino'
				stroke='green'
			/>
		</ComposedChart>
	);
};

export default LineBarAreaComposedChart;
