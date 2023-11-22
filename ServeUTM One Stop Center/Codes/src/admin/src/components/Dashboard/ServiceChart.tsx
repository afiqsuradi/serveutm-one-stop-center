import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { StatsType } from "../../hooks/Dashboard/useStats";
interface Props {
  data: StatsType["monthly_service"];
}

const ServiceChart = ({ data }: Props) => {
  return (
    <div className="card text-black dark:bg-[#1D283A] dark:text-white p-6 row-start-2 w-full">
      <h1 className=" font-semibold text-2xl">Services Overview</h1>
      <ResponsiveContainer width="100%" height={350} className="py-6">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            width={20}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServiceChart;
