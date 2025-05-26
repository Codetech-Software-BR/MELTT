import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";


type CustomizedLabelType = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: string;
};

const CustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: CustomizedLabelType) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
    >
      Nota:{value}
    </text>
  );
};

// const CustomLegend = ({payload}) => (
//   <ul style={{ listStyleType: 'none', padding: 0 }}>
//     {payload.map((entry, index) => (
//       <li key={`item-${index}`} style={{ color: entry.payload.fill }}>
//         <span style={{ display: 'inline-block', width: 10, height: 10, backgroundColor: entry.payload.fill, marginRight: 10 }} />
//         {entry.name}: {entry.value}
//       </li>
//     ))}
//   </ul>
// )

type PieChartData = {
  key: string;
  resultado: number;
};

type CustomPieChartProps = {
  data: PieChartData[];
  COLORS: string[];
};

const CustomPieChart = ({ data, COLORS }: CustomPieChartProps) => {
  return (
    <PieChart width={300} height={320}>
      <Pie
        data={data}
        cx={150}
        cy={100}
        innerRadius={40}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="resultado"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        {data.map((entry, index) => (
          <CustomizedLabel
            key={`label-${index}`}
            cx={150}
            cy={100}
            midAngle={(index * 360) / data.length + 360 / data.length / 2}
            innerRadius={40}
            outerRadius={80}
            value={entry.key}
          />
        ))}
      </Pie>
      <Tooltip formatter={(value, name) => [value, name]} />
      <Legend/>
    </PieChart>
  );
};

export default CustomPieChart;
