import { useState } from 'react';
import QuotaCard from '../components/QuotaCard';
import ServiceTable from '../components/ServiceTable';
import AssistantUsage from '../components/AssistantUsage';
import UserUsage from '../components/UserUsage';

const mockServices = [
  {
    id: '1',
    name: 'GPT-4',
    usage: { used: 150000, total: 200000, percentage: 75 },
    cost: 125.50
  },
  {
    id: '2',
    name: 'Claude 2',
    usage: { used: 80000, total: 100000, percentage: 80 },
    cost: 95.20
  },
  {
    id: '3',
    name: 'PaLM',
    usage: { used: 30000, total: 50000, percentage: 60 },
    cost: 45.75
  }
];

export default function Dashboard() {
  const [totalTokens] = useState({
    used: 260000,
    total: 350000,
    percentage: 74
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuotaCard
          title="Total Usage"
          usage={{ used: 260000, total: 350000, percentage: 74 }}
          subtitle="All Services Combined"
        />
        <QuotaCard
          title="Total Token Consumption"
          usage={totalTokens}
          subtitle="Across All Models"
        />
        <QuotaCard
          title="Monthly Budget"
          usage={{ used: 850, total: 1000, percentage: 85 }}
          subtitle="USD"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Usage</h2>
        <ServiceTable services={mockServices} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Assistant Usage</h2>
          <AssistantUsage />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Usage</h2>
          <UserUsage />
        </div>
      </div>
    </div>
  );
}
