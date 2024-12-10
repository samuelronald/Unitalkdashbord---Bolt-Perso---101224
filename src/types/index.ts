// Previous imports and interfaces remain the same...

export interface EnhancedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: 'internal' | 'external';
  organization: string;
  department?: string;
  service?: string;
  position?: string;
  relationshipType?: 'client' | 'supplier' | 'partner';
  companyRole?: string;
  costPerHour: number;
  quotas: UserQuota[];
  totalUsed: number;
  totalLimit: number;
}

// Rest of the types remain the same...
