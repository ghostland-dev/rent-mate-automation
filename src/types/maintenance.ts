
export type MaintenanceStatus = 'pending' | 'in_progress' | 'scheduled' | 'completed' | 'cancelled';

export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';

export type MaintenanceTicket = {
  id: string;
  title: string;
  description: string;
  propertyId: string;
  propertyName: string;
  unit?: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  reportedBy: string;
  estimatedCost?: number;
  actualCost?: number;
  category: string;
  images?: string[];
  comments?: {
    id: string;
    text: string;
    author: string;
    createdAt: string;
  }[];
};

export const MAINTENANCE_CATEGORIES = [
  'Plomberie',
  'Électricité',
  'Chauffage/Climatisation',
  'Structure',
  'Serrurerie',
  'Peinture',
  'Nettoyage',
  'Jardinage',
  'Sécurité',
  'Autre'
];
