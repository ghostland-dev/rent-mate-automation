
export type TenantStatus = "active" | "inactive" | "pending";

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  status: TenantStatus;
  moveInDate: string;
  leaseEnd: string;
  rentAmount: number;
}

export const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "06 12 34 56 78",
    property: "Appartement Paris 11ème",
    status: "active",
    moveInDate: "2023-01-15",
    leaseEnd: "2024-01-14",
    rentAmount: 1200,
  },
  {
    id: "2",
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    phone: "07 23 45 67 89",
    property: "Maison Lyon Centre",
    status: "active",
    moveInDate: "2022-09-01",
    leaseEnd: "2025-08-31",
    rentAmount: 1500,
  },
  {
    id: "3",
    name: "Emma Petit",
    email: "emma.petit@example.com",
    phone: "06 34 56 78 90",
    property: "Studio Marseille",
    status: "pending",
    moveInDate: "2023-06-01",
    leaseEnd: "2024-05-31",
    rentAmount: 750,
  },
  {
    id: "4",
    name: "Lucas Moreau",
    email: "lucas.moreau@example.com",
    phone: "07 45 67 89 01",
    property: "Appartement Bordeaux",
    status: "inactive",
    moveInDate: "2021-03-15",
    leaseEnd: "2023-03-14",
    rentAmount: 950,
  },
  {
    id: "5",
    name: "Chloé Bernard",
    email: "chloe.bernard@example.com",
    phone: "06 56 78 90 12",
    property: "Loft Toulouse",
    status: "active",
    moveInDate: "2022-11-01",
    leaseEnd: "2024-10-31",
    rentAmount: 1100,
  },
];
