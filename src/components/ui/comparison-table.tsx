import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Badge } from "./badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface ComparisonTableProps {
  models: Array<{
    id: string;
    name: string;
    provider: string;
    inputCost: number;
    outputCost: number;
    contextWindow: number;
    averageSpeed: number;
    specialFeatures?: string[];
    capabilities: {
      textGeneration: boolean;
      codeGeneration: boolean;
      imageGeneration: boolean;
      audioProcessing: boolean;
      multilingual: boolean;
      finetuning: boolean;
    };
  }>;
}

export function ComparisonTable({ models }: ComparisonTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Model</TableHead>
          <TableHead>Input Cost</TableHead>
          <TableHead>Output Cost</TableHead>
          <TableHead>Context</TableHead>
          <TableHead>Speed</TableHead>
          <TableHead>Features</TableHead>
          <TableHead>Capabilities</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model) => (
          <TableRow key={model.id}>
            <TableCell className="font-medium">
              <div>
                <p>{model.name}</p>
                <p className="text-sm text-muted-foreground">{model.provider}</p>
              </div>
            </TableCell>
            <TableCell>${model.inputCost.toFixed(6)}/token</TableCell>
            <TableCell>${model.outputCost.toFixed(6)}/token</TableCell>
            <TableCell>{(model.contextWindow / 1000)}k tokens</TableCell>
            <TableCell>~{model.averageSpeed} tokens/s</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {model.specialFeatures?.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  {Object.entries(model.capabilities).map(([key, value]) => (
                    <Tooltip key={key}>
                      <TooltipTrigger>
                        {value ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
