import { useState } from 'react';
import { TrendingUp, Clock, DollarSign, Zap } from 'lucide-react';

interface UserROI {
  id: string;
  name: string;
  email: string;
  costPerHour: number;
  department: string;
  estimatedSavings: {
    hoursPerDay: number;
    daysPerMonth: number;
  };
  tokenUsage: {
    monthly: number;
    cost: number;
  };
}

export default function ROIAnalysis() {
  const [users] = useState<UserROI[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@acme.com',
      costPerHour: 75,
      department: 'Engineering',
      estimatedSavings: {
        hoursPerDay: 2.5,
        daysPerMonth: 20
      },
      tokenUsage: {
        monthly: 150000,
        cost: 125.50
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@acme.com',
      costPerHour: 85,
      department: 'Product',
      estimatedSavings: {
        hoursPerDay: 1.8,
        daysPerMonth: 22
      },
      tokenUsage: {
        monthly: 80000,
        cost: 95.20
      }
    }
  ]);

  const calculateMonthlySavings = (user: UserROI) => {
    const monthlyHours = user.estimatedSavings.hoursPerDay * user.estimatedSavings.daysPerMonth;
    const monthlySavings = monthlyHours * user.costPerHour;
    const netSavings = monthlySavings - user.tokenUsage.cost;
    const roi = (netSavings / user.tokenUsage.cost);
    return { monthlyHours, monthlySavings, netSavings, roi };
  };

  const totalStats = users.reduce((acc, user) => {
    const { monthlyHours, monthlySavings, netSavings } = calculateMonthlySavings(user);
    return {
      totalHours: acc.totalHours + monthlyHours,
      totalSavings: acc.totalSavings + monthlySavings,
      totalNetSavings: acc.totalNetSavings + netSavings,
      totalCost: acc.totalCost + user.tokenUsage.cost
    };
  }, { totalHours: 0, totalSavings: 0, totalNetSavings: 0, totalCost: 0 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ROI Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Track and analyze AI usage efficiency</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Time Saved</h3>
              <p className="text-sm text-gray-500">Monthly</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalStats.totalHours.toFixed(1)} hours</p>
          <p className="text-sm text-gray-500 mt-2">
            Across {users.length} users
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Net Savings</h3>
              <p className="text-sm text-gray-500">Monthly</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">${totalStats.totalNetSavings.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">
            After LLM costs (${totalStats.totalCost.toFixed(2)})
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Average ROI</h3>
              <p className="text-sm text-gray-500">Return on Investment</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {((totalStats.totalNetSavings / totalStats.totalCost)).toFixed(1)}x
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on time value saved
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">User ROI Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Saved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Token Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Savings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => {
                const { monthlyHours, monthlySavings, netSavings, roi } = calculateMonthlySavings(user);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{user.department}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        <span>{user.costPerHour}/hr</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{monthlyHours.toFixed(1)} hours/month</div>
                      <div className="text-xs text-gray-500">
                        {user.estimatedSavings.hoursPerDay} hours × {user.estimatedSavings.daysPerMonth} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{(user.tokenUsage.monthly / 1000).toFixed(1)}k tokens</div>
                      <div className="text-xs text-gray-500">${user.tokenUsage.cost.toFixed(2)}/month</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">
                          {netSavings.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        ${monthlySavings.toFixed(2)} value - ${user.tokenUsage.cost.toFixed(2)} cost
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        roi > 10 ? 'bg-green-100 text-green-800' :
                        roi > 5 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {roi.toFixed(1)}x
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
