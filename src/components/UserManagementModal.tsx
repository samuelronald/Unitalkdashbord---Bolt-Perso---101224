import React, { useState, useEffect } from 'react';
import { X, DollarSign } from 'lucide-react';
import { EnhancedUser, LLMModel } from '../types';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<EnhancedUser>) => void;
  user?: EnhancedUser;
  availableModels: LLMModel[];
}

const ORGANIZATIONS = [
  'Acme Inc',
  'Tech Corp',
  'Global Solutions',
  'Innovate Ltd',
  'Digital Dynamics'
];

const SERVICES = [
  'Engineering',
  'Product',
  'Marketing',
  'Sales',
  'Customer Support',
  'Operations',
  'Finance',
  'HR',
  'Legal',
  'Research'
];

export default function UserManagementModal({
  isOpen,
  onClose,
  onSave,
  user,
  availableModels
}: UserManagementModalProps) {
  const [formData, setFormData] = useState<Partial<EnhancedUser>>({
    firstName: '',
    lastName: '',
    email: '',
    type: 'internal',
    organization: '',
    department: '',
    service: '',
    position: '',
    relationshipType: 'client',
    companyRole: '',
    costPerHour: 0,
    quotas: []
  });

  const [orgSuggestions, setOrgSuggestions] = useState<string[]>([]);
  const [showOrgSuggestions, setShowOrgSuggestions] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        costPerHour: user.costPerHour || 0
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        type: 'internal',
        organization: '',
        department: '',
        service: '',
        position: '',
        relationshipType: 'client',
        companyRole: '',
        costPerHour: 0,
        quotas: availableModels.map(model => ({
          modelId: model.id,
          monthlyLimit: 50000,
          used: 0
        }))
      });
    }
  }, [user, availableModels]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`.trim()
    });
  };

  const handleOrgSearch = (value: string) => {
    setFormData({ ...formData, organization: value });
    const filtered = ORGANIZATIONS.filter(org => 
      org.toLowerCase().includes(value.toLowerCase())
    );
    setOrgSuggestions(filtered);
    setShowOrgSuggestions(true);
  };

  const selectOrganization = (org: string) => {
    setFormData({ ...formData, organization: org });
    setShowOrgSuggestions(false);
  };

  const updateQuota = (modelId: string, monthlyLimit: number) => {
    const quotas = [...(formData.quotas || [])];
    const index = quotas.findIndex(q => q.modelId === modelId);
    
    if (index >= 0) {
      quotas[index] = { ...quotas[index], monthlyLimit };
    } else {
      quotas.push({ modelId, monthlyLimit, used: 0 });
    }

    setFormData({ ...formData, quotas });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cost per Hour</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={formData.costPerHour?.toString() || '0'}
                onChange={e => setFormData({ ...formData, costPerHour: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value as 'internal' | 'external' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Organization</label>
            <input
              type="text"
              value={formData.organization}
              onChange={e => handleOrgSearch(e.target.value)}
              onFocus={() => setShowOrgSuggestions(true)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            {showOrgSuggestions && orgSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {orgSuggestions.map((org) => (
                  <div
                    key={org}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectOrganization(org)}
                  >
                    {org}
                  </div>
                ))}
              </div>
            )}
          </div>

          {formData.type === 'internal' ? (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Service</label>
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship Type</label>
                <select
                  value={formData.relationshipType}
                  onChange={e => setFormData({ ...formData, relationshipType: e.target.value as 'client' | 'supplier' | 'partner' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="client">Client</option>
                  <option value="supplier">Supplier</option>
                  <option value="partner">Partner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Role</label>
                <input
                  type="text"
                  value={formData.companyRole}
                  onChange={e => setFormData({ ...formData, companyRole: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">LLM Quotas</h3>
            <div className="space-y-4">
              {availableModels.map(model => (
                <div key={model.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{model.name}</h4>
                    <p className="text-sm text-gray-500">{model.provider}</p>
                  </div>
                  <div className="w-48">
                    <label className="block text-sm font-medium text-gray-700">Monthly Limit</label>
                    <input
                      type="number"
                      value={formData.quotas?.find(q => q.modelId === model.id)?.monthlyLimit || 50000}
                      onChange={e => updateQuota(model.id, parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      min="0"
                      step="10000"
                    />
                  </div>
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
              {user ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
