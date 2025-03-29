import { FiTrendingUp } from "react-icons/fi";

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  isPositive: boolean;
}

export function AnalyticsCard({ title, value, change, icon, isPositive }: AnalyticsCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="rounded-full bg-blue-100 p-2 text-blue-600">{icon}</div>
      </div>
      <p className="mb-1 text-2xl font-bold text-gray-800">{value}</p>
      <div className={`flex items-center text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
        <FiTrendingUp className={`mr-1 size-3 ${!isPositive && "rotate-180"}`} />
        <span>{change} desde el mes pasado</span>
      </div>
    </div>
  );
}

export default AnalyticsCard; 