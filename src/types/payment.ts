
export type PaymentStatus = 'pending' | 'paid' | 'late' | 'cancelled' | 'refunded';

export interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  amount: number;
  status: PaymentStatus;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: 'bank_transfer' | 'credit_card' | 'cash' | 'check';
  invoiceNumber: string;
  description?: string;
  notes?: string;
  category: 'rent' | 'deposit' | 'maintenance' | 'other';
  createdAt: string;
}

// Données fictives pour les paiements
export const mockPayments: Payment[] = [
  {
    id: "pay1",
    tenantId: "tenant1",
    tenantName: "Laurent Dubois",
    propertyId: "prop1",
    propertyName: "Résidence Les Oliviers",
    amount: 950,
    status: "paid",
    dueDate: "2023-06-01",
    paidDate: "2023-06-01",
    paymentMethod: "bank_transfer",
    invoiceNumber: "INV-2023-06-0001",
    description: "Loyer Juin 2023",
    category: "rent",
    createdAt: "2023-05-15T10:00:00Z"
  },
  {
    id: "pay2",
    tenantId: "tenant2",
    tenantName: "Sophie Martin",
    propertyId: "prop3",
    propertyName: "Résidence Étoile",
    amount: 1200,
    status: "pending",
    dueDate: "2023-07-01",
    invoiceNumber: "INV-2023-07-0002",
    description: "Loyer Juillet 2023",
    category: "rent",
    createdAt: "2023-06-15T10:00:00Z"
  },
  {
    id: "pay3",
    tenantId: "tenant3",
    tenantName: "Pierre Leroy",
    propertyId: "prop4",
    propertyName: "Les Jardins de Bordeaux",
    amount: 1450,
    status: "late",
    dueDate: "2023-06-01",
    invoiceNumber: "INV-2023-06-0003",
    description: "Loyer Juin 2023",
    category: "rent",
    createdAt: "2023-05-15T10:00:00Z"
  },
  {
    id: "pay4",
    tenantId: "tenant4",
    tenantName: "Marie Dupont",
    propertyId: "prop2",
    propertyName: "Villa Méditerranée",
    amount: 500,
    status: "paid",
    dueDate: "2023-06-15",
    paidDate: "2023-06-10",
    paymentMethod: "credit_card",
    invoiceNumber: "INV-2023-06-0004",
    description: "Dépôt de garantie",
    category: "deposit",
    createdAt: "2023-06-01T10:00:00Z"
  },
  {
    id: "pay5",
    tenantId: "tenant1",
    tenantName: "Laurent Dubois",
    propertyId: "prop1",
    propertyName: "Résidence Les Oliviers",
    amount: 200,
    status: "paid",
    dueDate: "2023-06-20",
    paidDate: "2023-06-20",
    paymentMethod: "cash",
    invoiceNumber: "INV-2023-06-0005",
    description: "Réparation plomberie",
    category: "maintenance",
    createdAt: "2023-06-15T10:00:00Z"
  },
  {
    id: "pay6",
    tenantId: "tenant5",
    tenantName: "Julie Moreau",
    propertyId: "prop3",
    propertyName: "Résidence Étoile",
    amount: 1100,
    status: "pending",
    dueDate: "2023-07-01",
    invoiceNumber: "INV-2023-07-0006",
    description: "Loyer Juillet 2023",
    category: "rent",
    createdAt: "2023-06-15T10:00:00Z"
  },
  {
    id: "pay7",
    tenantId: "tenant6",
    tenantName: "Thomas Petit",
    propertyId: "prop4",
    propertyName: "Les Jardins de Bordeaux",
    amount: 1300,
    status: "paid",
    dueDate: "2023-06-01",
    paidDate: "2023-05-28",
    paymentMethod: "bank_transfer",
    invoiceNumber: "INV-2023-06-0007",
    description: "Loyer Juin 2023",
    category: "rent",
    createdAt: "2023-05-15T10:00:00Z"
  },
  {
    id: "pay8",
    tenantId: "tenant7",
    tenantName: "Emma Richard",
    propertyId: "prop1",
    propertyName: "Résidence Les Oliviers",
    amount: 950,
    status: "pending",
    dueDate: "2023-07-01",
    invoiceNumber: "INV-2023-07-0008",
    description: "Loyer Juillet 2023",
    category: "rent",
    createdAt: "2023-06-15T10:00:00Z"
  }
];
