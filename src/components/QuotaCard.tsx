import { QuotaUsage } from '../types';

interface QuotaCardProps {
  title: string;
  usage: QuotaUsage;
  subtitle?: string;
}

export default function QuotaCard({ title, usage, subtitle }: QuotaCardProps) {
  const getColorClass = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Usage</span>
          <span className={`font-medium ${getColorClass(usage.percentage)}`}>
            {usage.percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getColorClass(usage.percentage)}`}
            style={{ width: `${usage.percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>{usage.used.toLocaleString()} tokens</span>
          <span>{usage.total.toLocaleString()} tokens</span>
        </div>
      </div>
    </div>
  );
}
