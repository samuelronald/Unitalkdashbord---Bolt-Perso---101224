import { Switch } from './Switch';
import { Zap, AlertCircle } from 'lucide-react';

interface ModelCardProps {
  name: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  costPerToken: number;
  requiresAPIKey: boolean;
  usage?: {
    used: number;
    total: number;
    percentage: number;
  };
}

export default function ModelCard({ 
  name, 
  description, 
  enabled, 
  onToggle, 
  costPerToken,
  requiresAPIKey,
  usage 
}: ModelCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <Zap className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
        <Switch enabled={enabled} onToggle={onToggle} />
      </div>

      <div className="mt-4 space-y-3">
        <div className="text-xs text-gray-500">
          Cost per token: ${costPerToken.toFixed(6)}
        </div>

        {usage && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  usage.percentage >= 90
                    ? 'bg-red-500'
                    : usage.percentage >= 75
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${usage.percentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">
                {usage.used.toLocaleString()} / {usage.total.toLocaleString()} tokens
              </span>
              <span className={`font-medium ${
                usage.percentage >= 90
                  ? 'text-red-600'
                  : usage.percentage >= 75
                  ? 'text-yellow-600'
                  : 'text-green-600'
              }`}>
                {usage.percentage}%
              </span>
            </div>

            {usage.percentage >= 90 && (
              <div className="flex items-center text-xs text-red-600">
                <AlertCircle className="w-3 h-3 mr-1" />
                Approaching quota limit
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
