import StatisticWrapper from "./StatisticWrapper";
import { RiServiceFill } from "react-icons/ri";
import { HiUsers, HiUserPlus } from "react-icons/hi2";
import { FaReceipt } from "react-icons/fa";
import { StatsType } from "../../hooks/Dashboard/useStats";
import { useEffect, useState } from "react";

type stats = {
  name: string;
  total: number;
};

interface Props {
  data: StatsType["statistic"];
}

const Statistic = ({ data }: Props) => {
  const icons = [<HiUsers />, <HiUserPlus />, <RiServiceFill />, <FaReceipt />];
  const [stats, setStats] = useState<stats[] | null>(null);

  useEffect(() => {
    const modifiedData: stats[] = [];
    for (const [key, value] of Object.entries(data)) {
      const nameArr = key.split("_");
      const name =
        nameArr[0][0].toUpperCase() +
        nameArr[0].slice(1, nameArr[0].length) +
        " " +
        nameArr[1][0].toUpperCase() +
        nameArr[1].slice(1, nameArr[0].length);
      modifiedData.push({ name, total: value });
    }
    setStats(modifiedData);
  }, [data]);

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats?.map((stat, idx) => {
        return (
          <StatisticWrapper
            key={idx}
            title={stat.name}
            data={stat.total}
            icon={icons[idx]}
          />
        );
      })}
    </div>
  );
};

export default Statistic;
