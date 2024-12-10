import React, { useState } from 'react';
import { Users as UsersIcon, Building2, Briefcase, DollarSign } from 'lucide-react';
import { EnhancedUser, LLMModel } from '../types';
import UserQuotaDetails from '../components/UserQuotaDetails';
import UserManagementModal from '../components/UserManagementModal';

export default function Users() {
  const [users, setUsers] = useState<EnhancedUser[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@acme.com',
      type: 'internal',
      organization: 'Acme Inc',
      department: 'Engineering',
      service: 'Product',
      position: 'Senior Developer',
      costPerHour: 75,
      quotas: [
        { modelId: '1', monthlyLimit: 100000, used: 75000 },
        { modelId: '2', monthlyLimit: 200000, used: 150000 }
      ],
      totalUsed: 225000,
      totalLimit: 300000
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@supplier.com',
      type: 'external',
      organization: 'Supplier Corp',
      relationshipType: 'supplier',
      companyRole: 'Account Manager',
      service: 'Sales',
      costPerHour: 85,
      quotas: [
        { modelId: '1', monthlyLimit: 50000, used: 30000 }
      ],
      totalUsed: 30000,
      totalLimit: 50000
    }
  ]);

  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
  const [userFilter, setUserFilter] = useState<'all' | 'internal' | 'external'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<EnhancedUser | undefined>();

  const toggleUserExpansion = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const filteredUsers = users.filter(user => 
    userFilter === 'all' || user.type === userFilter
  );

  const handleEditUser = (user: EnhancedUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (updatedUser: Partial<EnhancedUser>) => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...updatedUser } : user
      ));
    } else {
      setUsers([...users, { 
        id: (users.length + 1).toString(),
        ...updatedUser
      } as EnhancedUser]);
    }
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage user access and quotas</p>
        </div>
        <div className="flex gap-4">
          <div className="flex rounded-lg overflow-hidden">
            <button
              className={`px-4 py-2 text-sm ${
                userFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUserFilter('all')}
            >
              All Users
            </button>
            <button
              className={`px-4 py-2 text-sm ${
                userFilter === 'internal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUserFilter('internal')}
            >
              Internal
            </button>
            <button
              className={`px-4 py-2 text-sm ${
                userFilter === 'external'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUserFilter('external')}
            >
              External
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role & Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost/Hour
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quota Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <UsersIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.organization}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {user.type === 'internal' ? user.position : user.companyRole}
                        </span>
                      </div>
                      {user.service && (
                        <div className="flex items-center">
                          <div className="ml-6 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                            {user.service}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      {user.costPerHour}/hr
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (user.totalUsed / user.totalLimit) * 100 >= 90
                            ? 'bg-red-500'
                            : (user.totalUsed / user.totalLimit) * 100 >= 75
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${(user.totalUsed / user.totalLimit) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {((user.totalUsed / user.totalLimit) * 100).toFixed(1)}% used
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleUserExpansion(user.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      {expandedUsers.has(user.id) ? 'Hide Details' : 'Show Details'}
                    </button>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                {expandedUsers.has(user.id) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50">
                      <UserQuotaDetails
                        quotas={user.quotas}
                        availableModels={[
                          {
                            id: '1',
                            name: 'GPT-4',
                            description: 'Most capable model',
                            enabled: true,
                            costPerToken: 0.00001,
                            provider: 'OpenAI'
                          },
                          {
                            id: '2',
                            name: 'GPT-3.5',
                            description: 'Balanced performance',
                            enabled: true,
                            costPerToken: 0.000002,
                            provider: 'OpenAI'
                          }
                        ]}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <UserManagementModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(undefined);
        }}
        onSave={handleSaveUser}
        user={selectedUser}
        availableModels={[
          {
            id: '1',
            name: 'GPT-4',
            description: 'Most capable model',
            enabled: true,
            costPerToken: 0.00001,
            provider: 'OpenAI'
          },
          {
            id: '2',
            name: 'GPT-3.5',
            description: 'Balanced performance',
            enabled: true,
            costPerToken: 0.000002,
            provider: 'OpenAI'
          }
        ]}
      />
    </div>
  );
}
