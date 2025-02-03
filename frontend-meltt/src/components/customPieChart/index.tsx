import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const CustomLabel = ({ cx, cy, midAngle, outerRadius, percent, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontFamily: "Poppins" }}
    >
      <tspan x={x} dy="-0.6em" fontSize="16">{`${(percent * 100).toFixed(
        0
      )}%`}</tspan>
      <tspan x={x} dy="1.2em" fontSize="12" width={80}>
        {name}
      </tspan>
    </text>
  );
};

const CustomPieChart = ({data}: {data: any}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          paddingAngle={5}
          labelLine={false}
          label={CustomLabel}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
