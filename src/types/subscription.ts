
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  billingPeriod: "monthly" | "yearly";
  tier: "free" | "basic" | "premium" | "enterprise";
  isPopular?: boolean;
  maxProperties?: number;
  maxTenants?: number;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Gratuit",
    description: "Pour les petits propriétaires débutants",
    price: 0,
    billingPeriod: "monthly",
    tier: "free",
    features: [
      "1 propriété maximum",
      "3 locataires maximum",
      "Gestion de base des biens",
      "Tableau de bord simple"
    ],
    maxProperties: 1,
    maxTenants: 3
  },
  {
    id: "basic",
    name: "Basique",
    description: "Pour les propriétaires individuels",
    price: 9.99,
    billingPeriod: "monthly",
    tier: "basic",
    features: [
      "5 propriétés maximum",
      "15 locataires maximum",
      "Gestion des paiements",
      "Notifications par email",
      "Rapports mensuels"
    ],
    maxProperties: 5,
    maxTenants: 15
  },
  {
    id: "premium",
    name: "Premium",
    description: "Pour les propriétaires professionnels",
    price: 24.99,
    billingPeriod: "monthly",
    tier: "premium",
    isPopular: true,
    features: [
      "20 propriétés maximum",
      "50 locataires maximum",
      "Gestion des documents",
      "Exportation des données",
      "Rapports détaillés",
      "Assistance prioritaire"
    ],
    maxProperties: 20,
    maxTenants: 50
  },
  {
    id: "enterprise",
    name: "Entreprise",
    description: "Pour les agences immobilières",
    price: 99.99,
    billingPeriod: "monthly",
    tier: "enterprise",
    features: [
      "Propriétés illimitées",
      "Locataires illimités",
      "Accès multi-utilisateurs",
      "API personnalisée",
      "Assistance dédiée",
      "Formation personnalisée"
    ]
  }
];
