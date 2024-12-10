import { useState } from 'react';
import { LLMQuota, LLMModel } from '../types';
import { Edit2, Save, X, AlertCircle } from 'lucide-react';

interface QuotaManagerProps {
  quota: LLMQuota;
  model: LLMModel;
  onUpdate: (quota: LLMQuota) => void;
  onDelete?: () => void;
}

export default function QuotaManager({ 
  quota, 
  model, 
  onUpdate,
  onDelete 
}: QuotaManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState(quota.monthlyLimit);

  const handleSave = () => {
    if (monthlyLimit < quota.used) {
      alert('Monthly limit cannot be less than current usage');
      return;
    }
    onUpdate({
      ...quota,
      monthlyLimit
    });
    setIsEditing(false);
  };

  const usagePercentage = (quota.used / quota.monthlyLimit) * 100;
  const estimatedMonthlyCost = (quota.monthlyLimit * model.costPerToken).toFixed(2);
  
  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{model.name}</h3>
          <p className="text-xs text-gray-500">{model.provider}</p>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-400 hover:text-green-600"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1 text-red-400 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Monthly Limit:</span>
          {isEditing ? (
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-right"
              min={quota.used}
            />
          ) : (
            <span className="font-medium">{monthlyLimit.toLocaleString()} tokens</span>
          )}
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Used:</span>
          <span className="font-medium">{quota.used.toLocaleString()} tokens</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimated Cost:</span>
          <span className="font-medium">${estimatedMonthlyCost}</span>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Usage</span>
            <span className={getStatusColor(usagePercentage)}>
              {usagePercentage.toFixed(1)}%
            </span>
          </div>
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
        </div>

        {usagePercentage >= 90 && (
          <div className="flex items-center text-xs text-red-600">
            <AlertCircle className="w-3 h-3 mr-1" />
            Approaching quota limit
          </div>
        )}
      </div>
    </div>
  );
}
