import { Card } from '@lobehub/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LLMModel } from '../data/llm-models';

interface ComparisonChartProps {
  models: LLMModel[];
}

export function ComparisonChart({ models }: ComparisonChartProps) {
  const costData = models.map(model => ({
    name: model.name,
    'Text Cost': model.costs.find(c => c.type === 'text')?.costPer1M || 0,
    'Code Cost': model.costs.find(c => c.type === 'code')?.costPer1M || 0,
    'Image Cost': model.costs.find(c => c.type === 'image')?.costPer1M || 0,
    'Audio Cost': model.costs.find(c => c.type === 'audio')?.costPer1M || 0,
  }));

  const performanceData = models.map(model => ({
    name: model.name,
    'Context Window': model.contextWindow / 1000, // Convert to K tokens
    'Processing Speed': model.averageSpeed,
  }));

  const capabilityData = models.map(model => ({
    name: model.name,
    'Capabilities Score': Object.values(model.capabilities).filter(Boolean).length,
    'Specialties Count': model.specialties.length,
  }));

  return (
    <div className="space-y-6">
      <Card title="Cost Comparison (USD per 1M tokens)">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Text Cost" fill="#8884d8" />
              <Bar dataKey="Code Cost" fill="#82ca9d" />
              <Bar dataKey="Image Cost" fill="#ffc658" />
              <Bar dataKey="Audio Cost" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Performance Metrics">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="Context Window" fill="#8884d8" name="Context Window (K tokens)" />
              <Bar yAxisId="right" dataKey="Processing Speed" fill="#82ca9d" name="Processing Speed (tokens/s)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Capabilities & Specialties">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={capabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Capabilities Score" fill="#8884d8" name="Supported Capabilities" />
              <Bar dataKey="Specialties Count" fill="#82ca9d" name="Number of Specialties" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
