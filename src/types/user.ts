
export type UserRole = "user" | "admin" | "superadmin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier | null;
  subscriptionStatus: SubscriptionStatus;
  createdAt: string;
  lastLogin: string;
}

export type SubscriptionTier = "free" | "basic" | "premium" | "enterprise";
export type SubscriptionStatus = "active" | "trialing" | "canceled" | "expired";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@rentmate.com",
    name: "Admin User",
    role: "admin",
    subscriptionTier: "premium",
    subscriptionStatus: "active",
    createdAt: "2023-01-15T10:00:00Z",
    lastLogin: "2023-04-22T15:30:00Z"
  },
  {
    id: "2",
    email: "superadmin@rentmate.com",
    name: "Super Admin",
    role: "superadmin",
    subscriptionTier: "enterprise",
    subscriptionStatus: "active",
    createdAt: "2022-12-01T08:00:00Z",
    lastLogin: "2023-04-21T16:45:00Z"
  },
  {
    id: "3",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    subscriptionTier: "basic",
    subscriptionStatus: "active",
    createdAt: "2023-02-10T14:00:00Z",
    lastLogin: "2023-04-20T11:20:00Z"
  },
  {
    id: "4",
    email: "trial@example.com",
    name: "Trial User",
    role: "user",
    subscriptionTier: "free",
    subscriptionStatus: "trialing",
    createdAt: "2023-04-01T09:30:00Z",
    lastLogin: "2023-04-19T10:15:00Z"
  }
];
