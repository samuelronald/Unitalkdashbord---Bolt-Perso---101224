import { MessageSquare, Code, Image, Mic, Globe, Settings } from 'lucide-react';

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  enabled: boolean;
  capabilities: {
    textGeneration: boolean;
    codeGeneration: boolean;
    imageGeneration: boolean;
    audioProcessing: boolean;
    multilingual: boolean;
    finetuning: boolean;
  };
  costs: Array<{
    type: string;
    costPer1M: number;
    icon: any;
  }>;
  contextWindow: number;
  specialties: string[];
  averageSpeed: number;
}

export const llmModels: LLMModel[] = [
  {
    id: 'alexa',
    name: 'Alexa',
    provider: 'Amazon',
    description: 'Conversational AI with voice capabilities',
    enabled: true,
    capabilities: {
      textGeneration: true,
      codeGeneration: false,
      imageGeneration: false,
      audioProcessing: true,
      multilingual: true,
      finetuning: true
    },
    costs: [
      { type: 'text', costPer1M: 12.00, icon: MessageSquare },
      { type: 'audio', costPer1M: 15.00, icon: Mic }
    ],
    contextWindow: 8000,
    specialties: ['Voice integration', 'Multi-modal support'],
    averageSpeed: 3000
  },
  {
    id: 'bard',
    name: 'Bard',
    provider: 'Google',
    description: 'Advanced conversational AI with broad knowledge',
    enabled: true,
    capabilities: {
      textGeneration: true,
      codeGeneration: true,
      imageGeneration: false,
      audioProcessing: false,
      multilingual: true,
      finetuning: true
    },
    costs: [
      { type: 'text', costPer1M: 15.00, icon: MessageSquare },
      { type: 'code', costPer1M: 18.00, icon: Code }
    ],
    contextWindow: 32000,
    specialties: ['Real-time information', 'Code generation', 'Creative writing'],
    averageSpeed: 2500
  },
  {
    id: 'bert',
    name: 'BERT',
    provider: 'Google',
    description: 'Specialized in understanding context and language',
    enabled: true,
    capabilities: {
      textGeneration: true,
      codeGeneration: false,
      imageGeneration: false,
      audioProcessing: false,
      multilingual: true,
      finetuning: true
    },
    costs: [
      { type: 'text', costPer1M: 8.00, icon: MessageSquare }
    ],
    contextWindow: 512,
    specialties: ['Context understanding', 'Language analysis'],
    averageSpeed: 3000
  },
  {
    id: 'brainbox',
    name: 'BrainBox',
    provider: 'Microsoft',
    description: 'Advanced reasoning and analysis',
    enabled: true,
    capabilities: {
      textGeneration: true,
      codeGeneration: true,
      imageGeneration: false,
      audioProcessing: false,
      multilingual: true,
      finetuning: true
    },
    costs: [
      { type: 'text', costPer1M: 18.00, icon: MessageSquare },
      { type: 'code', costPer1M: 20.00, icon: Code }
    ],
    contextWindow: 32000,
    specialties: ['Complex reasoning', 'Data analysis'],
    averageSpeed: 2200
  },
  {
    id: 'chatgen',
    name: 'ChatGen',
    provider: 'Minghao.ai',
    description: 'Specialized chat model',
    enabled: true,
    capabilities: {
      textGeneration: true,
      codeGeneration: false,
      imageGeneration: false,
      audioProcessing: false,
      multilingual: false,
      finetuning: false
    },
    costs: [
      { type: 'text', costPer1M: 8.00, icon: MessageSquare }
    ],
    contextWindow: 8192,
    specialties: ['Chat optimization', 'Fast responses'],
    averageSpeed: 3000
  },
  {
    id: 'coconlr',
    name: 'CoconLR',
    provider: 'Google',
    description: 'Efficient language representation model',
    enabled: true,
    capabilities: {
      textGeneration: true,
      codeGeneration: false,
      imageGeneration: false,
      audioProcessing: false,
      multilingual: true,
      finetuning: true
    },
    costs: [
      { type: 'text', costPer1M: 5.00, icon: MessageSquare }
    ],
    contextWindow: 2048,
    specialties: ['Efficient processing', 'Language understanding'],
    averageSpeed: 4000
  },
  {
    id: 'common-crawl',
    name: 'Common Crawl',
    provider: 'Common Crawl',
    description: 'Web-scale language model',
    enabled: true,
    capabilities: {
      textGeneration: true,
      codeGeneration: false,
      imageGeneration: false,
      audioProcessing: false,
      multilingual: true,
      finetuning: false
    },
    costs: [
      { type: 'text', costPer1M: 5.00, icon: MessageSquare }
    ],
    contextWindow: 4096,
    specialties: ['Web content analysis', 'Large-scale processing'],
    averageSpeed: 4000
  },
  {
    id: 'deepmind-llm',
    name: 'DeepMind LLM',
    provider: 'DeepMind',
    description: 'Advanced AI with deep learning capabilities',
    enabled: true,
    capabilities: {
      textGeneration: true,
      codeGeneration: true,
      imageGeneration: true,
      audioProcessing: false,
      multilingual: true,
      finetuning: true
    },
    costs: [
      { type: 'text', costPer1M: 20.00, icon: MessageSquare },
      { type: 'code', costPer1M: 25.00, icon: Code },
      { type: 'image', costPer1M: 30.00, icon: Image }
    ],
    contextWindow: 50000,
    specialties: ['Deep learning', 'Complex problem solving'],
    averageSpeed: 1800
  },
  // Add all other models with their specific details
];

export const getModelsByProvider = () => {
  return llmModels.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, LLMModel[]>);
};

export const getModelById = (id: string) => {
  return llmModels.find(model => model.id === id);
};
