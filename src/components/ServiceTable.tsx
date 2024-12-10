import { ArrowUp, ArrowDown } from 'lucide-react';

interface ServiceQuota {
  id: string;
  name: string;
  usage: {
    used: number;
    total: number;
    percentage: number;
  };
  cost: number;
  trend?: 'up' | 'down';
}

interface ServiceTableProps {
  services: ServiceQuota[];
}

export default function ServiceTable({ services }: ServiceTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{service.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className={`h-2 rounded-full ${
                          service.usage.percentage >= 90
                            ? 'bg-red-500'
                            : service.usage.percentage >= 75
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${service.usage.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {service.usage.percentage}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {service.usage.used.toLocaleString()} / {service.usage.total.toLocaleString()} tokens
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${service.cost.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.trend === 'up' ? (
                    <div className="flex items-center text-green-600">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">Increasing</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <ArrowDown className="w-4 h-4 mr-1" />
                      <span className="text-sm">Decreasing</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
