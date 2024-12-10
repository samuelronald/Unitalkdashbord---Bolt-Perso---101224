import { useState } from 'react';
import { Cpu, Globe, Key, CheckCircle, XCircle } from 'lucide-react';
import Accordion from '../components/Accordion';
import ModelCard from '../components/ModelCard';
import APIKeyModal from '../components/APIKeyModal';

interface LLMModel {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  costPerToken: number;
  provider: string;
  requiresAPIKey: boolean;
  contextWindow?: number;
  specialFeatures?: string[];
}

interface LLMProvider {
  id: string;
  name: string;
  models: LLMModel[];
  apiKey?: string;
  apiKeyName?: string;
  apiProxy?: string;
  connectionStatus?: 'connected' | 'failed' | 'checking';
}

export default function Services() {
  const [providers, setProviders] = useState<LLMProvider[]>([
    {
      id: '1',
      name: 'Google',
      models: [
        {
          id: 'bard',
          name: 'Bard',
          description: 'Advanced conversational AI with broad knowledge',
          enabled: true,
          costPerToken: 0.000015,
          provider: 'Google',
          requiresAPIKey: true,
          contextWindow: 32000,
          specialFeatures: ['Real-time information', 'Code generation', 'Creative writing']
        },
        {
          id: 'bert',
          name: 'BERT',
          description: 'Specialized in understanding context and language',
          enabled: true,
          costPerToken: 0.000008,
          provider: 'Google',
          requiresAPIKey: true,
          contextWindow: 512
        },
        {
          id: 'coconlr',
          name: 'CoconLR',
          description: 'Efficient language representation model',
          enabled: true,
          costPerToken: 0.000005,
          provider: 'Google',
          requiresAPIKey: true
        },
        {
          id: 'dialogflow',
          name: 'Dialogflow',
          description: 'Specialized in conversational interfaces',
          enabled: true,
          costPerToken: 0.00001,
          provider: 'Google',
          requiresAPIKey: true
        },
        {
          id: 'flan-t5',
          name: 'Flan-T5',
          description: 'Versatile text-to-text model',
          enabled: true,
          costPerToken: 0.000012,
          provider: 'Google',
          requiresAPIKey: true
        },
        {
          id: 'llama',
          name: 'Google LLaMA',
          description: 'Large language model with broad capabilities',
          enabled: true,
          costPerToken: 0.00002,
          provider: 'Google',
          requiresAPIKey: true,
          contextWindow: 64000
        },
        {
          id: 'lamda',
          name: 'LaMDA',
          description: 'Advanced conversational AI',
          enabled: true,
          costPerToken: 0.000018,
          provider: 'Google',
          requiresAPIKey: true
        },
        {
          id: 'meena',
          name: 'Meena',
          description: 'Specialized in open-ended conversations',
          enabled: true,
          costPerToken: 0.000015,
          provider: 'Google',
          requiresAPIKey: true
        },
        {
          id: 'palm',
          name: 'PaLM',
          description: 'Pathways Language Model with broad capabilities',
          enabled: true,
          costPerToken: 0.00002,
          provider: 'Google',
          requiresAPIKey: true,
          contextWindow: 80000
        }
      ]
    },
    {
      id: '2',
      name: 'Microsoft',
      models: [
        {
          id: 'brainbox',
          name: 'BrainBox',
          description: 'Advanced reasoning and analysis',
          enabled: true,
          costPerToken: 0.000018,
          provider: 'Microsoft',
          requiresAPIKey: true,
          contextWindow: 32000
        },
        {
          id: 'genmo',
          name: 'GenMo',
          description: 'Specialized in content generation',
          enabled: true,
          costPerToken: 0.000015,
          provider: 'Microsoft',
          requiresAPIKey: true
        },
        {
          id: 'turing-nlg',
          name: 'Microsoft Turing-NLG',
          description: 'Large-scale language generation model',
          enabled: true,
          costPerToken: 0.00002,
          provider: 'Microsoft',
          requiresAPIKey: true,
          contextWindow: 40000
        }
      ]
    },
    {
      id: '3',
      name: 'Amazon',
      models: [
        {
          id: 'alexa',
          name: 'Alexa',
          description: 'Conversational AI with voice capabilities',
          enabled: true,
          costPerToken: 0.000012,
          provider: 'Amazon',
          requiresAPIKey: true,
          specialFeatures: ['Voice integration', 'Multi-modal support']
        }
      ]
    },
    {
      id: '4',
      name: 'Facebook',
      models: [
        {
          id: 'fast',
          name: 'FaST',
          description: 'Fast and efficient language processing',
          enabled: true,
          costPerToken: 0.000008,
          provider: 'Facebook',
          requiresAPIKey: true
        },
        {
          id: 'llama-fb',
          name: 'LLaMa',
          description: 'Open foundation model with broad capabilities',
          enabled: true,
          costPerToken: 0.000015,
          provider: 'Facebook',
          requiresAPIKey: true,
          contextWindow: 32000
        }
      ]
    },
    {
      id: '5',
      name: 'DeepMind',
      models: [
        {
          id: 'deepmind-llm',
          name: 'DeepMind LLM',
          description: 'Advanced AI with deep learning capabilities',
          enabled: true,
          costPerToken: 0.00002,
          provider: 'DeepMind',
          requiresAPIKey: true,
          contextWindow: 50000
        }
      ]
    },
    {
      id: '6',
      name: 'Others',
      models: [
        {
          id: 'chatgen',
          name: 'ChatGen',
          description: 'Specialized chat model',
          enabled: true,
          costPerToken: 0.000008,
          provider: 'Minghao.ai',
          requiresAPIKey: true
        },
        {
          id: 'common-crawl',
          name: 'Common Crawl',
          description: 'Web-scale language model',
          enabled: true,
          costPerToken: 0.000005,
          provider: 'Common Crawl',
          requiresAPIKey: false
        },
        {
          id: 'digitalgenius',
          name: 'DigitalGenius',
          description: 'Customer service focused AI',
          enabled: true,
          costPerToken: 0.00001,
          provider: 'DigitalGenius',
          requiresAPIKey: true
        },
        {
          id: 'huggingface',
          name: 'Hugging Face Transformers',
          description: 'Open-source NLP models',
          enabled: true,
          costPerToken: 0.000008,
          provider: 'Hugging Face',
          requiresAPIKey: true,
          specialFeatures: ['Multiple model support', 'Fine-tuning capabilities']
        }
      ]
    }
  ]);

  const [selectedProvider, setSelectedProvider] = useState<LLMProvider | null>(null);
  const [isAPIKeyModalOpen, setIsAPIKeyModalOpen] = useState(false);

  const toggleModel = (providerId: string, modelId: string) => {
    setProviders(providers.map(provider => {
      if (provider.id === providerId) {
        return {
          ...provider,
          models: provider.models.map(model => {
            if (model.id === modelId) {
              return { ...model, enabled: !model.enabled };
            }
            return model;
          })
        };
      }
      return provider;
    }));
  };

  const handleAPIKeyUpdate = async (provider: LLMProvider, apiKey: string, apiKeyName: string, apiProxy: string) => {
    setProviders(providers.map(p => {
      if (p.id === provider.id) {
        return {
          ...p,
          apiKey,
          apiKeyName,
          apiProxy,
          connectionStatus: 'checking'
        };
      }
      return p;
    }));

    try {
      // Simulate API check - replace with actual API validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProviders(providers.map(p => {
        if (p.id === provider.id) {
          return {
            ...p,
            connectionStatus: 'connected'
          };
        }
        return p;
      }));
    } catch (error) {
      setProviders(providers.map(p => {
        if (p.id === provider.id) {
          return {
            ...p,
            connectionStatus: 'failed'
          };
        }
        return p;
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">LLM Services</h1>
          <p className="mt-1 text-sm text-gray-500">Manage available language models and their settings</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Provider
        </button>
      </div>

      <div className="space-y-4">
        {providers.map((provider) => (
          <Accordion
            key={provider.id}
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <span>{provider.name}</span>
                </div>
                {provider.models.some(m => m.requiresAPIKey) && (
                  <div className="flex items-center gap-2">
                    {provider.connectionStatus === 'connected' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {provider.connectionStatus === 'failed' && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProvider(provider);
                        setIsAPIKeyModalOpen(true);
                      }}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-2 cursor-pointer"
                    >
                      <Key className="h-4 w-4" />
                      Configure API
                    </div>
                  </div>
                )}
              </div>
            }
            defaultOpen={provider.id === '1'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {provider.models.map((model) => (
                <ModelCard
                  key={model.id}
                  name={model.name}
                  description={model.description}
                  enabled={model.enabled}
                  onToggle={() => toggleModel(provider.id, model.id)}
                  costPerToken={model.costPerToken}
                  requiresAPIKey={model.requiresAPIKey}
                />
              ))}
            </div>
          </Accordion>
        ))}
      </div>

      <APIKeyModal
        isOpen={isAPIKeyModalOpen}
        onClose={() => {
          setIsAPIKeyModalOpen(false);
          setSelectedProvider(null);
        }}
        provider={selectedProvider}
        onSave={handleAPIKeyUpdate}
      />
    </div>
  );
}
