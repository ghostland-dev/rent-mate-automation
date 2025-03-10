
export type MaintenanceStatus = 'pending' | 'in_progress' | 'scheduled' | 'completed' | 'cancelled';

export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';

export type Attachment = {
  name: string;
  url: string;
};

export type Assignee = {
  id: string;
  name: string;
  avatar?: string;
};

export type Comment = {
  id: string;
  text: string;
  author: string;
  createdAt: string;
};

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
  assignedTo?: Assignee;
  reportedBy: string;
  estimatedCost?: number;
  actualCost?: number;
  category: string;
  images?: string[];
  attachments?: Attachment[];
  comments?: Comment[];
  pinned?: boolean; // New property for pinned status
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
