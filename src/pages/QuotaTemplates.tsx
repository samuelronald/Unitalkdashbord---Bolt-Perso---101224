import { useState } from 'react';
import { Users, Briefcase, Plus } from 'lucide-react';
import QuotaTemplateModal from '../components/QuotaTemplateModal';

interface QuotaTemplate {
  id: string;
  name: string;
  type: 'service' | 'role';
  target: string;
  quotas: {
    modelId: string;
    monthlyLimit: number;
  }[];
}

export default function QuotaTemplates() {
  const [templates, setTemplates] = useState<QuotaTemplate[]>([
    {
      id: '1',
      name: 'Engineering Service Template',
      type: 'service',
      target: 'Engineering',
      quotas: [
        { modelId: '1', monthlyLimit: 100000 },
        { modelId: '2', monthlyLimit: 200000 }
      ]
    },
    {
      id: '2',
      name: 'Developer Role Template',
      type: 'role',
      target: 'Developer',
      quotas: [
        { modelId: '1', monthlyLimit: 50000 },
        { modelId: '2', monthlyLimit: 100000 }
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<QuotaTemplate | undefined>();

  const handleSaveTemplate = (template: QuotaTemplate) => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => t.id === template.id ? template : t));
    } else {
      setTemplates([...templates, { ...template, id: (templates.length + 1).toString() }]);
    }
    setIsModalOpen(false);
    setSelectedTemplate(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quota Templates</h1>
          <p className="mt-1 text-sm text-gray-500">Manage service and role-based quota templates</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {template.type === 'service' ? (
                  <Briefcase className="w-5 h-5 text-blue-500" />
                ) : (
                  <Users className="w-5 h-5 text-purple-500" />
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500">
                    {template.type === 'service' ? 'Service: ' : 'Role: '}
                    {template.target}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedTemplate(template);
                  setIsModalOpen(true);
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
            </div>

            <div className="space-y-3">
              {template.quotas.map((quota) => (
                <div key={quota.modelId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">
                    {quota.modelId === '1' ? 'GPT-4' : 'GPT-3.5'}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {quota.monthlyLimit.toLocaleString()} tokens/month
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <QuotaTemplateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTemplate(undefined);
        }}
        onSave={handleSaveTemplate}
        template={selectedTemplate}
      />
    </div>
  );
}
