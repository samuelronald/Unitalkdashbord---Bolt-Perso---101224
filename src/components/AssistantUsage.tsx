import { BarChart } from 'lucide-react';

interface Assistant {
  id: string;
  name: string;
  tokens: number;
  requests: number;
  successRate: number;
}

export default function AssistantUsage() {
  const assistants: Assistant[] = [
    {
      id: '1',
      name: 'Customer Support Bot',
      tokens: 50000,
      requests: 1200,
      successRate: 95
    },
    {
      id: '2',
      name: 'Code Review Assistant',
      tokens: 75000,
      requests: 800,
      successRate: 88
    },
    {
      id: '3',
      name: 'Data Analysis Helper',
      tokens: 45000,
      requests: 600,
      successRate: 92
    }
  ];

  return (
    <div className="space-y-4">
      {assistants.map((assistant) => (
        <div key={assistant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <BarChart className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{assistant.name}</h3>
              <p className="text-xs text-gray-500">{assistant.requests} requests</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{(assistant.tokens / 1000).toFixed(1)}k tokens</p>
            <p className="text-xs text-gray-500">{assistant.successRate}% success rate</p>
          </div>
        </div>
      ))}
    </div>
  );
}
