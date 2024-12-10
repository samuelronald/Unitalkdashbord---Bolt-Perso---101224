import React, { useState } from 'react';
import { Users as UsersIcon, Shield, Clock, AlertCircle } from 'lucide-react';
import { AdminUser } from '../types';
import AdminManagementModal from '../components/AdminManagementModal';

export default function Admins() {
  const [admins, setAdmins] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'System Administrator',
      email: 'admin@company.com',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2024-03-15T10:30:00Z',
      permissions: {
        manageUsers: true,
        manageOrganizations: true,
        manageQuotas: true,
        viewReports: true,
        manageAdmins: true,
        manageSettings: true
      }
    },
    {
      id: '2',
      name: 'Quota Manager',
      email: 'quotas@company.com',
      role: 'quota_manager',
      status: 'active',
      lastLogin: '2024-03-14T15:45:00Z',
      permissions: {
        manageUsers: false,
        manageOrganizations: false,
        manageQuotas: true,
        viewReports: true,
        manageAdmins: false,
        manageSettings: false
      }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | undefined>();

  const handleEditAdmin = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleSaveAdmin = (updatedAdmin: Partial<AdminUser>) => {
    if (selectedAdmin) {
      setAdmins(admins.map(admin => 
        admin.id === selectedAdmin.id ? { ...admin, ...updatedAdmin } : admin
      ));
    } else {
      setAdmins([...admins, {
        id: (admins.length + 1).toString(),
        ...updatedAdmin
      } as AdminUser]);
    }
    setIsModalOpen(false);
    setSelectedAdmin(undefined);
  };

  const getRoleBadgeColor = (role: AdminUser['role']) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'quota_manager':
        return 'bg-green-100 text-green-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administrators</h1>
          <p className="mt-1 text-sm text-gray-500">Manage system administrators and their permissions</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Administrator
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Administrator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(admin.role)}`}>
                    {admin.role.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {admin.status === 'active' ? (
                      <>
                        <span className="w-1 h-1 mr-1.5 bg-green-500 rounded-full" />
                        Active
                      </>
                    ) : (
                      <>
                        <span className="w-1 h-1 mr-1.5 bg-red-500 rounded-full" />
                        Inactive
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(admin.lastLogin || '').toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditAdmin(admin)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminManagementModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAdmin(undefined);
        }}
        onSave={handleSaveAdmin}
        admin={selectedAdmin}
      />
    </div>
  );
}
