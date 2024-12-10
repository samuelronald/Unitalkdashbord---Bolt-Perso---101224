import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AdminUser } from '../types';

interface AdminManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (admin: Partial<AdminUser>) => void;
  admin?: AdminUser;
}

export default function AdminManagementModal({
  isOpen,
  onClose,
  onSave,
  admin
}: AdminManagementModalProps) {
  const [formData, setFormData] = useState<Partial<AdminUser>>({
    name: '',
    email: '',
    role: 'admin',
    status: 'active',
    permissions: {
      manageUsers: false,
      manageOrganizations: false,
      manageQuotas: false,
      viewReports: false,
      manageAdmins: false,
      manageSettings: false
    }
  });

  useEffect(() => {
    if (admin) {
      setFormData(admin);
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'admin',
        status: 'active',
        permissions: {
          manageUsers: false,
          manageOrganizations: false,
          manageQuotas: false,
          viewReports: false,
          manageAdmins: false,
          manageSettings: false
        }
      });
    }
  }, [admin]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const togglePermission = (permission: keyof AdminUser['permissions']) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions!,
        [permission]: !formData.permissions![permission]
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {admin ? 'Edit Administrator' : 'Add New Administrator'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
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
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value as AdminUser['role'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="admin">Administrator</option>
                <option value="quota_manager">Quota Manager</option>
                <option value="viewer">Viewer</option>
                {!admin && <option value="super_admin">Super Administrator</option>}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as AdminUser['status'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.permissions || {}).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      value ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    onClick={() => togglePermission(key as keyof AdminUser['permissions'])}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
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
              {admin ? 'Save Changes' : 'Create Administrator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
