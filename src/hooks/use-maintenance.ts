
import { useState, useEffect } from "react";
import { MaintenanceTicket, MaintenanceStatus, MaintenancePriority } from "@/types/maintenance";
import { MOCK_TICKETS, PROPERTIES } from "@/data/mockMaintenanceTickets";
import { useToast } from "./use-toast";

export const useMaintenance = () => {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<MaintenanceTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    // Simulate API fetch with timeout
    setTimeout(() => {
      setTickets(MOCK_TICKETS);
      setFilteredTickets(MOCK_TICKETS);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filters: {
    search: string;
    status: MaintenanceStatus | "all";
    priority: MaintenancePriority | "all";
    category: string | "all";
    propertyId: string | "all";
  }) => {
    let filtered = [...tickets];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchLower) ||
          ticket.description.toLowerCase().includes(searchLower) ||
          ticket.propertyName.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === filters.status);
    }

    if (filters.priority !== "all") {
      filtered = filtered.filter((ticket) => ticket.priority === filters.priority);
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((ticket) => ticket.category === filters.category);
    }

    if (filters.propertyId !== "all") {
      filtered = filtered.filter((ticket) => ticket.propertyId === filters.propertyId);
    }

    setFilteredTickets(filtered);
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);

    if (value === "all") {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(tickets.filter((ticket) => ticket.status === value));
    }
  };

  const handleCreateTicket = (data: any) => {
    const newTicket: MaintenanceTicket = {
      id: `ticket${tickets.length + 1}`,
      title: data.title,
      description: data.description,
      propertyId: data.propertyId,
      propertyName: PROPERTIES.find(p => p.id === data.propertyId)?.name || "",
      unit: data.unit,
      status: data.status,
      priority: data.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reportedBy: "Admin",
      category: data.category,
      estimatedCost: data.estimatedCost,
      images: data.images,
    };

    setTickets([newTicket, ...tickets]);
    setFilteredTickets([newTicket, ...filteredTickets]);
    setIsCreating(false);

    toast({
      description: "Le ticket de maintenance a été créé avec succès.",
    });
  };

  const handleUpdateTicket = (updatedTicket: MaintenanceTicket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
    setFilteredTickets(
      filteredTickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
    setSelectedTicket(updatedTicket);
    setIsEditing(false);

    toast({
      description: "Le ticket de maintenance a été mis à jour avec succès.",
    });
  };

  const handleDeleteTicket = (id: string) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets);
    setFilteredTickets(filteredTickets.filter((ticket) => ticket.id !== id));
    setSelectedTicket(null);

    toast({
      description: "Le ticket de maintenance a été supprimé avec succès.",
    });
  };

  return {
    tickets,
    filteredTickets,
    selectedTicket,
    isCreating,
    isEditing,
    currentTab,
    isLoading,
    properties: PROPERTIES,
    setSelectedTicket,
    setIsCreating,
    setIsEditing,
    handleFilterChange,
    handleTabChange,
    handleCreateTicket,
    handleUpdateTicket,
    handleDeleteTicket,
  };
};
