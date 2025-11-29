import { useEffect, useState } from 'react';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

// #region Sample data


// #endregion
export default function PieChartWithPaddingAngle({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
	const [data, setData] = useState([])
	useEffect(() => {
		fetch('http://localhost:4000/api/matriculas/getMatriculas')
			.then(res => res.json())
			.then(data => setData(data?.resultado));
		console.log(data);

	}, [])

	const CustomTooltip = ({ active, payload, title }: { active: any, payload: any, title: string }) => {
		if (active && payload && payload.length) {
			// payload[0].payload contiene los datos del slice
			const data = payload[0].payload;

			return (
				<div className="bg-white border rounded-lg p-2 shadow">
					<p className="font-semibold">{data.nombre}</p>
					<p>Conteo: {data.conteo}</p>
				</div>
			);
		}

		return null;
	};

	return (
		<>
			<PieChart style={{ width: '80%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
				<Pie
					data={data}
					innerRadius="80%"
					outerRadius="100%"
					// Corner radius is the rounded edge of each pie slice
					cornerRadius="50%"
					fill="#0088FE"
					// padding angle is the gap between each pie slice
					paddingAngle={5}
					dataKey="femenino"
					isAnimationActive={isAnimationActive}
				/>
				<Tooltip content={CustomTooltip} />
			</PieChart>
		</>
	);
}

