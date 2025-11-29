import { useEffect, useState } from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';

// #region Sample data

// #endregion
export default function PieChartWithPaddingAngle({ isAnimationActive = true, titulo, color }: { isAnimationActive?: boolean; titulo: string, color:string }) {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/api/matriculas/getMatriculas')
			.then((res) => res.json())
			.then((data) => setData(data?.resultado));
	}, []);

	const CustomTooltip = ({ active, payload }: { active: any; payload: any }) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;

			return (
				<div className='bg-white border rounded-lg p-2 shadow'>
					<p className='font-semibold'>{data.nombre}</p>
					<p>
						{titulo}: {data[titulo]}
					</p>
				</div>
			);
		}

		return null;
	};

	return (
		<>
			<PieChart
				style={{ width: '80%', maxWidth: '500px', aspectRatio: 1 }}
				responsive>
				<Pie
					data={data}
					innerRadius='80%'
					outerRadius='100%'
					// Corner radius is the rounded edge of each pie slice
					cornerRadius='50%'
					fill={color}
					// padding angle is the gap between each pie slice
					paddingAngle={5}
					dataKey={titulo}
					isAnimationActive={isAnimationActive}
				/>
				<Tooltip content={CustomTooltip} />
			</PieChart>
		</>
	);
}
