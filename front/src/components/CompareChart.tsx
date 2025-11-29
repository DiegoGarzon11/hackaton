import { useEffect, useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { socket } from '../socket';
export const SimpleBarChart = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/api/reports/sendInfo')
			.then((res) => res.json())
			.then((data) => setData(data?.temasMasConsultados));
	}, []);
	useEffect(() => {
		socket.on('statsUpdated', (data) => {
			setData(data?.temasMasConsultados);
		});
	}, []);
	return (
		<ComposedChart
			style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
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
				dataKey='tema'
				scale='auto'
			/>
			<Legend />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar
				dataKey='consultas'
				barSize={30}
				fill='green'
			/>
		</ComposedChart>
	);
};

export const SimpleBarChartHoras = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/api/reports/sendInfo')
			.then((res) => res.json())
			.then((data) => setData(data.horasPico));
	}, []);
	useEffect(() => {
		socket.on('statsUpdated', (data) => {
			setData(data.horasPico);
		});
	}, []);
	return (
		<ComposedChart
			style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
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
				dataKey='hora'
				scale='auto'
			/>
			<Legend />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar
				dataKey='usuarios'
				barSize={30}
				fill='#413ea0'
			/>
		</ComposedChart>
	);
};
