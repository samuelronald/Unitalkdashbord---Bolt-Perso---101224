import { Card, Tag, Switch, Divider } from '@lobehub/ui';
import { Check, X } from 'lucide-react';
import { LLMModel } from '../data/llm-models';

interface ModelComparisonCardProps {
  model: LLMModel;
  onToggle: (id: string) => void;
}

export function ModelComparisonCard({ model, onToggle }: ModelComparisonCardProps) {
  return (
    <Card
      title={model.name}
      extra={
        <Switch
          checked={model.enabled}
          onChange={() => onToggle(model.id)}
        />
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">{model.provider}</p>
          <p className="mt-2 text-sm">{model.description}</p>
        </div>

        <Divider />

        <div>
          <p className="text-sm font-medium mb-2">Pricing</p>
          <div className="space-y-1">
            {model.costs.map((cost, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <cost.icon className="w-4 h-4 text-gray-500" />
                <span>${cost.costPer1M.toFixed(2)} per 1M tokens</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <p className="text-sm font-medium mb-2">Performance</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Context Window:</span>
              <span>{(model.contextWindow / 1000).toFixed(1)}k tokens</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Processing Speed:</span>
              <span>~{model.averageSpeed} tokens/s</span>
            </div>
          </div>
        </div>

        <Divider />

        <div>
          <p className="text-sm font-medium mb-2">Capabilities</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(model.capabilities).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                {value ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <p className="text-sm font-medium mb-2">Specialties</p>
          <div className="flex flex-wrap gap-2">
            {model.specialties.map((specialty) => (
              <Tag key={specialty}>{specialty}</Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
