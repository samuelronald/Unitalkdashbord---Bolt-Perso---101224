import { useState, useEffect } from 'react';
import { X, Calculator, Clock, DollarSign, HelpCircle } from 'lucide-react';

interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputCost: number;
  outputCost: number;
  contextWindow: number;
  averageSpeed: number;
}

interface UsageSimulatorProps {
  model: ModelPricing;
  onClose: () => void;
}

interface SimulationResult {
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
  totalTokens: number;
  processingTime: number;
}

export default function UsageSimulator({ model, onClose }: UsageSimulatorProps) {
  const [requestsPerDay, setRequestsPerDay] = useState(100);
  const [avgInputTokens, setAvgInputTokens] = useState(500);
  const [avgOutputTokens, setAvgOutputTokens] = useState(1500);
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    const totalDailyTokens = requestsPerDay * (avgInputTokens + avgOutputTokens);
    const dailyInputCost = requestsPerDay * avgInputTokens * model.inputCost;
    const dailyOutputCost = requestsPerDay * avgOutputTokens * model.outputCost;
    const dailyCost = dailyInputCost + dailyOutputCost;
    
    setResult({
      dailyCost,
      monthlyCost: dailyCost * 30,
      annualCost: dailyCost * 365,
      totalTokens: totalDailyTokens,
      processingTime: totalDailyTokens / model.averageSpeed
    });
  }, [requestsPerDay, avgInputTokens, avgOutputTokens, model]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Usage Simulator</h2>
            <p className="text-sm text-gray-500">{model.name} by {model.provider}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Requests per Day
                <HelpCircle className="w-4 h-4 inline-block ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                value={requestsPerDay}
                onChange={(e) => setRequestsPerDay(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Avg. Input Tokens
                <HelpCircle className="w-4 h-4 inline-block ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                value={avgInputTokens}
                onChange={(e) => setAvgInputTokens(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Avg. Output Tokens
                <HelpCircle className="w-4 h-4 inline-block ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                value={avgOutputTokens}
                onChange={(e) => setAvgOutputTokens(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
              />
            </div>
          </div>

          {result && (
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Daily Cost</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${result.dailyCost.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Cost</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${result.monthlyCost.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Cost</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${result.annualCost.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Daily Tokens</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(result.totalTokens / 1000).toFixed(1)}k
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Processing Time: ~{result.processingTime.toFixed(1)} seconds/day</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calculator className="w-4 h-4" />
                    <span>Avg. Cost per Request: ${(result.dailyCost / requestsPerDay).toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
