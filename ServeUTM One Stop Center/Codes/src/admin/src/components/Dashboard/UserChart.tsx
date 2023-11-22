import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatsType } from "../../hooks/Dashboard/useStats";
interface Props {
  data: StatsType["monthly_user"];
}
const UserChart = ({ data }: Props) => {
  return (
    <div className="card text-black dark:bg-[#1D283A] dark:text-white p-6 w-full">
      <h1 className=" font-semibold text-2xl">New Users</h1>
      <ResponsiveContainer width="100%" aspect={3} className="py-6">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 15,
            left: 15,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" vertical={false} />
          <XAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dataKey="name"
          />
          <YAxis
            width={2}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            wrapperClassName="dark:bg-[#1D283A]"
            labelClassName="dark:text-black  text-white"
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fill="#adfa1d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
