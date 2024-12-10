import { useState, useEffect } from 'react';
import { Modal, Input, Card, Statistic } from '@lobehub/ui';
import { Calculator, Clock, DollarSign } from 'lucide-react';

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

export function UsageSimulator({ model, onClose }: UsageSimulatorProps) {
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
    <Modal 
      title={`Usage Simulator - ${model.name}`}
      open={true} 
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Requests per Day</label>
            <Input
              type="number"
              value={requestsPerDay}
              onChange={(e) => setRequestsPerDay(Number(e.target.value))}
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Avg. Input Tokens</label>
            <Input
              type="number"
              value={avgInputTokens}
              onChange={(e) => setAvgInputTokens(Number(e.target.value))}
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Avg. Output Tokens</label>
            <Input
              type="number"
              value={avgOutputTokens}
              onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
              min={1}
            />
          </div>
        </div>

        {result && (
          <Card>
            <div className="grid grid-cols-4 gap-4">
              <Statistic
                title="Daily Cost"
                value={result.dailyCost}
                prefix="$"
                precision={2}
              />
              <Statistic
                title="Monthly Cost"
                value={result.monthlyCost}
                prefix="$"
                precision={2}
              />
              <Statistic
                title="Annual Cost"
                value={result.annualCost}
                prefix="$"
                precision={2}
              />
              <Statistic
                title="Daily Tokens"
                value={result.totalTokens / 1000}
                suffix="k"
                precision={1}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Processing Time: ~{result.processingTime.toFixed(1)} seconds/day
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span className="text-sm">
                  Avg. Cost per Request: ${(result.dailyCost / requestsPerDay).toFixed(4)}
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Modal>
  );
}
