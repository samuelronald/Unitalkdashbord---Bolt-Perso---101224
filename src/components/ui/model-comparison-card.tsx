import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Check, X, MessageSquare, Code } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Badge } from "./badge";
import { Switch } from "./switch";

interface ModelComparisonCardProps {
  model: {
    id: string;
    name: string;
    provider: string;
    description: string;
    enabled: boolean;
    capabilities: Record<string, boolean>;
    costs: Array<{
      type: string;
      costPer1M: number;
      icon: any;
    }>;
    contextWindow: number;
    specialties: string[];
  };
  onToggle: (id: string) => void;
}

export function ModelComparisonCard({ model, onToggle }: ModelComparisonCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{model.name}</CardTitle>
        <Switch
          checked={model.enabled}
          onCheckedChange={() => onToggle(model.id)}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">{model.provider}</p>
            <p className="mt-2 text-sm">{model.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {model.costs.map((cost) => (
                <div key={cost.type} className="flex items-center gap-2 text-sm">
                  {cost.type === 'text' ? (
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Code className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>${cost.costPer1M.toFixed(2)}/1M tokens</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Context: {(model.contextWindow / 1000).toFixed(1)}k tokens
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Capabilities:</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(model.capabilities).map(([capability, supported]) => (
                <TooltipProvider key={capability}>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2 text-sm">
                      {supported ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      {capability}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{supported ? 'Supported' : 'Not supported'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Specialties:</p>
            <div className="flex flex-wrap gap-2">
              {model.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
