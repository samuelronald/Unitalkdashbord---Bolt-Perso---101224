import { useState } from 'react';
import { Building2, CreditCard, User, Plus, Edit2, Trash2 } from 'lucide-react';
import LLMQuotaManager from '../components/LLMQuotaManager';
import { Organization, LLMModel } from '../types';
import OrganizationModal from '../components/OrganizationModal';
import PaymentMethodModal from '../components/PaymentMethodModal';
import ContactModal from '../components/ContactModal';

export default function Organizations() {
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | undefined>();
  const [expandedOrgs, setExpandedOrgs] = useState<Set<string>>(new Set());

  const [providers] = useState<LLMModel[]>([
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
  ]);

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'Acme Inc',
      legalName: 'Acme Corporation',
      registrationNumber: '123456789',
      website: 'https://acme.com',
      phone: '+1 234 567 890',
      address: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA',
        vatNumber: 'US123456789'
      },
      billingEmail: 'billing@acme.com',
      paymentMethods: [
        {
          id: '1',
          type: 'credit_card',
          last4: '4242',
          expiryDate: '12/24',
          holderName: 'John Doe',
          isDefault: true
        }
      ],
      contacts: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@acme.com',
          phone: '+1 234 567 890',
          role: 'CTO',
          isPrimary: true
        }
      ],
      quotaLimit: 1000000,
      usedQuota: 250000,
      llmQuotas: [
        {
          llmId: '1',
          organizationId: '1',
          monthlyLimit: 500000,
          used: 150000,
          costPerToken: 0.00001
        },
        {
          llmId: '2',
          organizationId: '1',
          monthlyLimit: 500000,
          used: 100000,
          costPerToken: 0.000002
        }
      ]
    }
  ]);

  const toggleOrgExpansion = (orgId: string) => {
    const newExpanded = new Set(expandedOrgs);
    if (newExpanded.has(orgId)) {
      newExpanded.delete(orgId);
    } else {
      newExpanded.add(orgId);
    }
    setExpandedOrgs(newExpanded);
  };

  const handleSaveOrg = (org: Organization) => {
    if (selectedOrg) {
      setOrganizations(organizations.map(o => o.id === org.id ? org : o));
    } else {
      setOrganizations([...organizations, org]);
    }
    setIsOrgModalOpen(false);
    setSelectedOrg(undefined);
  };

  const handleEditOrg = (org: Organization) => {
    setSelectedOrg(org);
    setIsOrgModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
        <button
          onClick={() => setIsOrgModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2 inline-block" />
          Add Organization
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                    <p className="text-sm text-gray-500">{org.legalName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEditOrg(org)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleOrgExpansion(org.id)}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700"
                  >
                    {expandedOrgs.has(org.id) ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CreditCard className="w-4 h-4" />
                  <span>{org.paymentMethods.length} Payment Methods</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>{org.contacts.length} Contacts</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Building2 className="w-4 h-4" />
                  <span>{org.address.city}, {org.address.country}</span>
                </div>
              </div>
            </div>

            {expandedOrgs.has(org.id) && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="space-y-4">
                      {org.contacts.map((contact) => (
                        <div key={contact.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.email}</p>
                            <p className="text-sm text-gray-500">{contact.phone}</p>
                            <p className="text-sm text-gray-500">{contact.role}</p>
                          </div>
                          {contact.isPrimary && (
                            <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                              Primary Contact
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h4>
                    <div className="space-y-4">
                      {org.paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              {method.type === 'credit_card' ? 'Credit Card' : 'IBAN'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.type === 'credit_card' ? `•••• ${method.last4}` : method.last4}
                            </p>
                            <p className="text-sm text-gray-500">{method.holderName}</p>
                            {method.expiryDate && (
                              <p className="text-sm text-gray-500">Expires: {method.expiryDate}</p>
                            )}
                          </div>
                          {method.isDefault && (
                            <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">LLM Quotas</h4>
                  <LLMQuotaManager
                    organizationId={org.id}
                    availableModels={providers}
                    currentQuotas={org.llmQuotas}
                    onUpdate={(quotas) => {
                      setOrganizations(organizations.map(o => {
                        if (o.id === org.id) {
                          return {
                            ...o,
                            llmQuotas: quotas,
                            usedQuota: quotas.reduce((sum, q) => sum + q.used, 0),
                            quotaLimit: quotas.reduce((sum, q) => sum + q.monthlyLimit, 0)
                          };
                        }
                        return o;
                      }));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <OrganizationModal
        isOpen={isOrgModalOpen}
        onClose={() => {
          setIsOrgModalOpen(false);
          setSelectedOrg(undefined);
        }}
        onSave={handleSaveOrg}
        organization={selectedOrg}
      />

      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSave={(method) => {
          if (selectedOrg) {
            const updatedOrg = {
              ...selectedOrg,
              paymentMethods: [...selectedOrg.paymentMethods, method]
            };
            handleSaveOrg(updatedOrg);
          }
          setIsPaymentModalOpen(false);
        }}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSave={(contact) => {
          if (selectedOrg) {
            const updatedOrg = {
              ...selectedOrg,
              contacts: [...selectedOrg.contacts, contact]
            };
            handleSaveOrg(updatedOrg);
          }
          setIsContactModalOpen(false);
        }}
      />
    </div>
  );
}
