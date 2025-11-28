import { useEffect, useState } from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';

// #region Sample data
const datas = [
	{
		name: 'Page A',
		uv: 590,
		pv: 800,
		amt: 1400,
		cnt: 490,
	},
	{
		name: 'Page B',
		uv: 868,
		pv: 967,
		amt: 1506,
		cnt: 590,
	},
	{
		name: 'Page C',
		uv: 1397,
		pv: 1098,
		amt: 989,
		cnt: 350,
	},
	{
		name: 'Page D',
		uv: 1480,
		pv: 1200,
		amt: 1228,
		cnt: 480,
	},
	{
		name: 'Page E',
		uv: 1520,
		pv: 1108,
		amt: 1100,
		cnt: 460,
	},
	{
		name: 'Page F',
		uv: 1400,
		pv: 680,
		amt: 1700,
		cnt: 380,
	},
];

const LineBarAreaComposedChart = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/api/matriculas/getMatriculas')
			.then((res) => res.json())
			.then((data) => setData(data.resultado));
	}, []);
	return (
		<ComposedChart
			style={{ width: '100%', maxWidth: '900px', maxHeight: '70vh', aspectRatio: 1.618 }}
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
				scale='band'
			/>
			<YAxis  />
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
