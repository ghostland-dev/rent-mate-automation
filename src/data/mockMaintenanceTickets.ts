
import { MaintenanceTicket } from "@/types/maintenance";

export const MOCK_TICKETS: MaintenanceTicket[] = [
  {
    id: "ticket1",
    title: "Fuite d'eau dans la salle de bain",
    description: "Le locataire signale une fuite d'eau persistante sous le lavabo de la salle de bain principale. L'eau s'accumule et endommage le plancher.",
    propertyId: "prop1",
    propertyName: "Résidence Les Oliviers",
    unit: "Apt 102",
    status: "pending",
    priority: "high",
    createdAt: "2023-07-10T09:00:00Z",
    updatedAt: "2023-07-10T09:00:00Z",
    reportedBy: "Jean Dupont",
    category: "Plomberie",
    estimatedCost: 150,
    pinned: true, // This ticket is pinned
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=300&auto=format&fit=crop"
    ],
    comments: [
      {
        id: "comment1",
        text: "J'ai contacté le plombier, il pourra intervenir demain matin.",
        author: "Admin",
        createdAt: "2023-07-10T11:30:00Z"
      }
    ]
  },
  {
    id: "ticket2",
    title: "Chauffage défectueux",
    description: "Le radiateur de la chambre principale ne chauffe plus. Le locataire utilise actuellement un chauffage d'appoint.",
    propertyId: "prop1",
    propertyName: "Résidence Les Oliviers",
    unit: "Apt 201",
    status: "scheduled",
    priority: "medium",
    createdAt: "2023-07-05T14:00:00Z",
    updatedAt: "2023-07-06T10:15:00Z",
    reportedBy: "Pierre Durand",
    category: "Chauffage/Climatisation",
    estimatedCost: 250,
    pinned: false,
    images: [
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=300&auto=format&fit=crop"
    ]
  },
  {
    id: "ticket3",
    title: "Serrure cassée",
    description: "La serrure de la porte d'entrée est difficile à ouvrir. Le locataire craint que la clé ne se casse à l'intérieur.",
    propertyId: "prop2",
    propertyName: "Villa Méditerranée",
    status: "in_progress",
    priority: "high",
    createdAt: "2023-07-08T08:30:00Z",
    updatedAt: "2023-07-08T15:45:00Z",
    reportedBy: "Admin",
    category: "Serrurerie",
    estimatedCost: 120,
    pinned: true, // This ticket is pinned
  },
  {
    id: "ticket4",
    title: "Nettoyage de la piscine",
    description: "Nettoyage régulier de la piscine avant la saison estivale.",
    propertyId: "prop2",
    propertyName: "Villa Méditerranée",
    status: "completed",
    priority: "low",
    createdAt: "2023-06-20T09:00:00Z",
    updatedAt: "2023-06-25T16:30:00Z",
    reportedBy: "Admin",
    category: "Nettoyage",
    estimatedCost: 180,
    actualCost: 150,
    pinned: false,
  },
  {
    id: "ticket5",
    title: "Rénovation hall d'entrée",
    description: "Rénovation complète du hall d'entrée incluant peinture, éclairage et décoration.",
    propertyId: "prop3",
    propertyName: "Résidence Étoile",
    status: "in_progress",
    priority: "medium",
    createdAt: "2023-07-01T10:00:00Z",
    updatedAt: "2023-07-07T14:20:00Z",
    reportedBy: "Admin",
    category: "Peinture",
    estimatedCost: 1200,
    pinned: false,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=300&auto=format&fit=crop"
    ]
  },
  {
    id: "ticket6",
    title: "Remplacement ascenseur",
    description: "L'ascenseur montre des signes de dysfonctionnement. Un remplacement complet est prévu.",
    propertyId: "prop3",
    propertyName: "Résidence Étoile",
    status: "scheduled",
    priority: "urgent",
    createdAt: "2023-06-15T09:30:00Z",
    updatedAt: "2023-07-02T11:15:00Z",
    reportedBy: "Admin",
    category: "Autre",
    estimatedCost: 15000,
    pinned: false,
  }
];

export const PROPERTIES = [
  { id: "prop1", name: "Résidence Les Oliviers" },
  { id: "prop2", name: "Villa Méditerranée" },
  { id: "prop3", name: "Résidence Étoile" },
];
