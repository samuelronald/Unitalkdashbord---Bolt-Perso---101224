import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ModelComparisonCard } from "./model-comparison-card";
import { ScrollArea } from "./scroll-area";
import { ComparisonTable } from "./comparison-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

interface ProviderGroupProps {
  provider: string;
  models: any[];
  onToggleModel: (id: string) => void;
}

export function ProviderGroup({ provider, models, onToggleModel }: ProviderGroupProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{provider}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cards">
          <TabsList className="mb-4">
            <TabsTrigger value="cards">Cards View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <TabsContent value="cards">
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {models.map((model) => (
                  <ModelComparisonCard
                    key={model.id}
                    model={model}
                    onToggle={onToggleModel}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="table">
            <ScrollArea className="h-[600px]">
              <ComparisonTable models={models} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
