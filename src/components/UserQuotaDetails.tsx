import React from 'react';
import { Zap } from 'lucide-react';
import { UserQuota, LLMModel } from '../types';

interface UserQuotaDetailsProps {
  quotas: UserQuota[];
  availableModels: LLMModel[];
}

export default function UserQuotaDetails({ quotas, availableModels }: UserQuotaDetailsProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">Model-Specific Quotas</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quotas.map((quota) => {
          const model = availableModels.find(m => m.id === quota.modelId);
          if (!model) return null;

          const usagePercentage = (quota.used / quota.monthlyLimit) * 100;

          return (
            <div key={quota.modelId} className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-medium text-gray-900">{model.name}</h5>
                    <p className="text-xs text-gray-500">{model.provider}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      usagePercentage >= 90
                        ? 'bg-red-500'
                        : usagePercentage >= 75
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{quota.used.toLocaleString()} tokens used</span>
                  <span>{quota.monthlyLimit.toLocaleString()} limit</span>
                </div>

                <div className="text-xs text-gray-500">
                  Cost per token: ${model.costPerToken.toFixed(6)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
