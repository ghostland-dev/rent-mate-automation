
// Utility functions for maintenance ticket components

export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800";
    case "in_progress": return "bg-blue-100 text-blue-800";
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "scheduled": return "bg-purple-100 text-purple-800";
    case "cancelled": return "bg-gray-100 text-gray-800";
    default: return "bg-slate-100 text-slate-800";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "bg-red-100 text-red-800";
    case "high": return "bg-orange-100 text-orange-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-slate-100 text-slate-800";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "completed": return "Terminé";
    case "in_progress": return "En cours";
    case "pending": return "En attente";
    case "scheduled": return "Programmé";
    case "cancelled": return "Annulé";
    default: return status;
  }
};

export const getPriorityText = (priority: string) => {
  switch (priority) {
    case "urgent": return "Urgent";
    case "high": return "Élevé";
    case "medium": return "Moyen";
    case "low": return "Faible";
    default: return priority;
  }
};

export const statusOptions = [
  { value: "pending", label: "En attente" },
  { value: "in_progress", label: "En cours" },
  { value: "scheduled", label: "Programmé" },
  { value: "completed", label: "Terminé" },
  { value: "cancelled", label: "Annulé" },
];

export const priorityOptions = [
  { value: "low", label: "Faible" },
  { value: "medium", label: "Moyen" },
  { value: "high", label: "Élevé" },
  { value: "urgent", label: "Urgent" },
];

export const categoryOptions = [
  { value: "plumbing", label: "Plomberie" },
  { value: "electrical", label: "Électricité" },
  { value: "carpentry", label: "Menuiserie" },
  { value: "painting", label: "Peinture" },
  { value: "cleaning", label: "Nettoyage" },
  { value: "other", label: "Autre" },
];
