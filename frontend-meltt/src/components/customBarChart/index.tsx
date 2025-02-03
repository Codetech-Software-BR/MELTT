import { BarChart, Bar, Tooltip, Legend, ResponsiveContainer, YAxis, XAxis } from "recharts";

const CustomBarChart = ({ data }: { data: any }) => {
  return (
    <ResponsiveContainer width="100%" maxHeight={350}>
      <BarChart
        data={data}
        barSize={35}
        barGap={24}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <Tooltip contentStyle={{ fontFamily: "Poppins" }} />
        <Legend
          layout="vertical" 
          verticalAlign="top"
          align="right"
          wrapperStyle={{
            top: 0,
            right: 0,
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: 13
          }}
        />
        <Bar
          dataKey="Visual"
          fill="#1A16F3"
          name="Visual"
          radius={[10, 10, 10, 10]}
        />
        <Bar
          dataKey="Auditivo"
          fill="#1BBD00"
          name="Auditivo"
          radius={[10, 10, 10, 10]}
        />
        <Bar
          dataKey="Cinestésico"
          fill="#F316D0"
          name="Cinestésico"
          radius={[10, 10, 10, 10]}
        />
        <YAxis/>
        <XAxis/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
