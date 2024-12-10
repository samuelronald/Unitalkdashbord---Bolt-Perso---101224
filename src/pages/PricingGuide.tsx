import { useState } from 'react';
import { DollarSign, Calculator, Clock, Zap, ArrowRight, Check } from 'lucide-react';
import UsageSimulator from '../components/UsageSimulator';

interface PricingTier {
  name: string;
  description: string;
  monthlyQuota: number;
  pricePerMonth: number;
  features: string[];
}

interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputCost: number;
  outputCost: number;
  contextWindow: number;
  averageSpeed: number; // tokens per second
  specialFeatures: string[];
}

export default function PricingGuide() {
  const [selectedModel, setSelectedModel] = useState<string>('1');
  const [showSimulator, setShowSimulator] = useState(false);

  const models: ModelPricing[] = [
    {
      id: '1',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      inputCost: 0.00001,
      outputCost: 0.00003,
      contextWindow: 128000,
      averageSpeed: 2000,
      specialFeatures: [
        'Advanced reasoning',
        'Complex problem solving',
        'Code generation and analysis',
        'Multi-language support'
      ]
    },
    {
      id: '2',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      inputCost: 0.000001,
      outputCost: 0.000002,
      contextWindow: 16000,
      averageSpeed: 4000,
      specialFeatures: [
        'Fast response times',
        'Cost-effective for simple tasks',
        'Good balance of performance'
      ]
    },
    {
      id: '3',
      name: 'Claude 2.1',
      provider: 'Anthropic',
      inputCost: 0.000008,
      outputCost: 0.000024,
      contextWindow: 100000,
      averageSpeed: 1800,
      specialFeatures: [
        'Academic writing',
        'Research analysis',
        'Detailed explanations',
        'Constitutional AI'
      ]
    }
  ];

  const tiers: PricingTier[] = [
    {
      name: 'Starter',
      description: 'Perfect for small teams and initial testing',
      monthlyQuota: 500000,
      pricePerMonth: 49,
      features: [
        'Access to all basic models',
        'Basic analytics',
        'Email support',
        'API access'
      ]
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses',
      monthlyQuota: 2000000,
      pricePerMonth: 199,
      features: [
        'Access to all models',
        'Advanced analytics',
        'Priority support',
        'Custom rate limits',
        'Team management'
      ]
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyQuota: 10000000,
      pricePerMonth: 999,
      features: [
        'Unlimited model access',
        'Custom model fine-tuning',
        '24/7 dedicated support',
        'SLA guarantees',
        'Advanced security features',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pricing Guide</h1>
        <p className="mt-1 text-sm text-gray-500">Compare models and estimate costs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Model Pricing</h2>
          <div className="space-y-4">
            {models.map((model) => (
              <div
                key={model.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedModel === model.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{model.name}</h3>
                    <p className="text-sm text-gray-500">{model.provider}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSimulator(true);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Simulate Usage <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>Input: ${model.inputCost.toFixed(6)}/token</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>Output: ${model.outputCost.toFixed(6)}/token</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calculator className="w-4 h-4" />
                      <span>Context: {(model.contextWindow / 1000)}k tokens</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Speed: ~{model.averageSpeed} tokens/s</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Special Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {model.specialFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Tiers</h2>
          <div className="space-y-4">
            {tiers.map((tier) => (
              <div key={tier.name} className="p-4 rounded-lg border-2 border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{tier.name}</h3>
                    <p className="text-sm text-gray-500">{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${tier.pricePerMonth}</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                  <Zap className="w-4 h-4" />
                  <span>{(tier.monthlyQuota / 1000000).toFixed(1)}M tokens/month</span>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSimulator && (
        <UsageSimulator
          model={models.find(m => m.id === selectedModel)!}
          onClose={() => setShowSimulator(false)}
        />
      )}
    </div>
  );
}
