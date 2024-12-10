import { Table } from '@lobehub/ui';
import { Check, X } from 'lucide-react';

interface ComparisonTableProps {
  models: Array<{
    id: string;
    name: string;
    provider: string;
    costs: Array<{
      type: string;
      costPer1M: number;
    }>;
    contextWindow: number;
    specialties: string[];
    capabilities: {
      textGeneration: boolean;
      codeGeneration: boolean;
      imageGeneration: boolean;
      audioProcessing: boolean;
      multilingual: boolean;
      finetuning: boolean;
    };
  }>;
}

export function ComparisonTable({ models }: ComparisonTableProps) {
  const columns = [
    {
      title: 'Model',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-sm text-gray-500">{record.provider}</div>
        </div>
      ),
    },
    {
      title: 'Cost per 1M Tokens',
      dataIndex: 'costs',
      key: 'costs',
      render: (costs: any[]) => (
        <div>
          {costs.map((cost, index) => (
            <div key={index}>
              ${cost.costPer1M.toFixed(2)}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Context Window',
      dataIndex: 'contextWindow',
      key: 'contextWindow',
      render: (value: number) => `${(value / 1000)}k tokens`,
    },
    {
      title: 'Capabilities',
      dataIndex: 'capabilities',
      key: 'capabilities',
      render: (capabilities: Record<string, boolean>) => (
        <div className="flex gap-2">
          {Object.entries(capabilities).map(([key, value]) => (
            <span key={key} className="flex items-center gap-1">
              {value ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Specialties',
      dataIndex: 'specialties',
      key: 'specialties',
      render: (specialties: string[]) => (
        <div className="flex flex-wrap gap-1">
          {specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-2 py-1 text-xs bg-gray-100 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={models}
      rowKey="id"
      pagination={false}
    />
  );
}
