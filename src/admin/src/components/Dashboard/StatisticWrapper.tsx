interface Props {
  title: string;
  data: string | number;
  icon: React.ReactNode | string;
}
const StatisticWrapper = ({ title, data, icon }: Props) => {
  return (
    <div className="card shadow-xl bg-white max-w-full text-black dark:bg-[#1D283A] dark:text-white hover:scale-105 transition-all">
      <div className="card-body">
        <h2 className="card-title text-base font-light items-center">
          {title} <span className="ml-auto">{icon}</span>
        </h2>
        <p className="text-2xl font-semibold">{data}</p>
      </div>
    </div>
  );
};

export default StatisticWrapper;
