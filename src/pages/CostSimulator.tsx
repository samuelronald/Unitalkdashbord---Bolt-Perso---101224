import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { Calculator, Clock, DollarSign, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { UsageSimulator } from '../components/usage-simulator';

interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputCost: number;
  outputCost: number;
  contextWindow: number;
  averageSpeed: number;
  specialFeatures?: string[];
}

export default function CostSimulator() {
  const [selectedModel, setSelectedModel] = useState<string>('bard');
  const [showSimulator, setShowSimulator] = useState(false);

  const models: ModelPricing[] = [
    // Google Models
    {
      id: 'bard',
      name: 'Bard',
      provider: 'Google',
      inputCost: 0.000015,
      outputCost: 0.00003,
      contextWindow: 32000,
      averageSpeed: 2500,
      specialFeatures: ['Real-time information', 'Code generation', 'Creative writing']
    },
    // ... (keep all other models)
  ];

  const groupedModels = models.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, ModelPricing[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cost Simulator</h1>
        <p className="text-muted-foreground mt-2">
          Compare costs and estimate usage across different LLM models
        </p>
      </div>

      <Tabs defaultValue="Google" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
          {Object.keys(groupedModels).map((provider) => (
            <TabsTrigger key={provider} value={provider}>
              {provider}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(groupedModels).map(([provider, providerModels]) => (
          <TabsContent key={provider} value={provider}>
            <Card>
              <CardHeader>
                <CardTitle>{provider} Models</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {providerModels.map((model) => (
                      <Card key={model.id} className="relative">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{model.name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {model.provider}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedModel(model.id);
                                setShowSimulator(true);
                              }}
                            >
                              Simulate Usage
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    Input: ${model.inputCost.toFixed(6)}/token
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    Output: ${model.outputCost.toFixed(6)}/token
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Calculator className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    Context: {(model.contextWindow / 1000)}k tokens
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    Speed: ~{model.averageSpeed} tokens/s
                                  </span>
                                </div>
                              </div>
                            </div>

                            {model.specialFeatures && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Special Features:</p>
                                <div className="flex flex-wrap gap-2">
                                  {model.specialFeatures.map((feature) => (
                                    <Badge key={feature} variant="secondary">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {showSimulator && (
        <UsageSimulator
          model={models.find(m => m.id === selectedModel)!}
          onClose={() => setShowSimulator(false)}
        />
      )}
    </div>
  );
}
