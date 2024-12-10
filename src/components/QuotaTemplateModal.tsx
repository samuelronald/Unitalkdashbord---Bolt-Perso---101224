import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

interface QuotaTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: QuotaTemplate) => void;
  template?: QuotaTemplate;
}

const SERVICES = [
  'Engineering',
  'Product',
  'Marketing',
  'Sales',
  'Customer Support',
  'Operations'
];

const ROLES = [
  'Developer',
  'Manager',
  'Analyst',
  'Designer',
  'Writer',
  'Researcher'
];

export default function QuotaTemplateModal({
  isOpen,
  onClose,
  onSave,
  template
}: QuotaTemplateModalProps) {
  const [formData, setFormData] = useState<Partial<QuotaTemplate>>({
    name: '',
    type: 'service',
    target: '',
    quotas: [
      { modelId: '1', monthlyLimit: 50000 },
      { modelId: '2', monthlyLimit: 100000 }
    ]
  });

  useEffect(() => {
    if (template) {
      setFormData(template);
    } else {
      setFormData({
        name: '',
        type: 'service',
        target: '',
        quotas: [
          { modelId: '1', monthlyLimit: 50000 },
          { modelId: '2', monthlyLimit: 100000 }
        ]
      });
    }
  }, [template]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as QuotaTemplate);
  };

  const updateQuota = (modelId: string, monthlyLimit: number) => {
    setFormData({
      ...formData,
      quotas: formData.quotas?.map(q =>
        q.modelId === modelId ? { ...q, monthlyLimit } : q
      )
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {template ? 'Edit Template' : 'Create Template'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Template Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Template Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value as 'service' | 'role' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="service">Service</option>
              <option value="role">Role</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {formData.type === 'service' ? 'Service' : 'Role'}
            </label>
            <select
              value={formData.target}
              onChange={e => setFormData({ ...formData, target: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select {formData.type === 'service' ? 'a service' : 'a role'}...</option>
              {(formData.type === 'service' ? SERVICES : ROLES).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quota Limits</h3>
            <div className="space-y-4">
              {formData.quotas?.map((quota) => (
                <div key={quota.modelId} className="flex items-center gap-4">
                  <span className="text-sm text-gray-700 w-20">
                    {quota.modelId === '1' ? 'GPT-4' : 'GPT-3.5'}
                  </span>
                  <input
                    type="number"
                    value={quota.monthlyLimit}
                    onChange={e => updateQuota(quota.modelId, parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                    step="10000"
                  />
                  <span className="text-sm text-gray-500">tokens/month</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
              {template ? 'Save Changes' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
