import { useState, useEffect } from "react";
import { PlusCircle, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaintenanceTicketCard from "@/components/maintenance/MaintenanceTicketCard";
import MaintenanceTicketForm from "@/components/maintenance/MaintenanceTicketForm";
import MaintenanceTicketDetail from "@/components/maintenance/MaintenanceTicketDetail";
import MaintenanceFilters from "@/components/maintenance/MaintenanceFilters";
import { MaintenanceTicket, MaintenancePriority, MaintenanceStatus } from "@/types/maintenance";
import { useToast } from "@/hooks/use-toast";

const MOCK_TICKETS: MaintenanceTicket[] = [
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
    estimatedCost: 120
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
    actualCost: 150
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
    estimatedCost: 15000
  }
];

const Maintenance = () => {
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
      propertyName: properties.find(p => p.id === data.propertyId)?.name || "",
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

  const properties = [
    { id: "prop1", name: "Résidence Les Oliviers" },
    { id: "prop2", name: "Villa Méditerranée" },
    { id: "prop3", name: "Résidence Étoile" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Chargement des tickets de maintenance...</p>
        </div>
      </div>
    );
  }

  if (selectedTicket && !isEditing) {
    return (
      <MaintenanceTicketDetail
        ticket={selectedTicket}
        onUpdate={handleUpdateTicket}
        onDelete={handleDeleteTicket}
        onClose={() => setSelectedTicket(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground">
            Gérez les tickets de maintenance et de réparation pour vos propriétés.
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Nouveau ticket
        </Button>
      </div>

      <MaintenanceFilters onFilterChange={handleFilterChange} />

      <Tabs defaultValue="all" value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="scheduled">Programmés</TabsTrigger>
          <TabsTrigger value="in_progress">En cours</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
              <Wrench className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Aucun ticket de maintenance</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
                Il n'y a actuellement aucun ticket de maintenance correspondant à vos critères.
              </p>
              <Button className="mt-4" onClick={() => setIsCreating(true)}>
                Créer un ticket
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTickets.map((ticket) => (
                <MaintenanceTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => setSelectedTicket(ticket)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
              <Wrench className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Aucun ticket en attente</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
                Il n'y a actuellement aucun ticket de maintenance en attente.
              </p>
              <Button className="mt-4" onClick={() => setIsCreating(true)}>
                Créer un ticket
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTickets.map((ticket) => (
                <MaintenanceTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => setSelectedTicket(ticket)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="mt-0">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
              <Wrench className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Aucun ticket programmé</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
                Il n'y a actuellement aucun ticket de maintenance programmé.
              </p>
              <Button className="mt-4" onClick={() => setIsCreating(true)}>
                Créer un ticket
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTickets.map((ticket) => (
                <MaintenanceTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => setSelectedTicket(ticket)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="in_progress" className="mt-0">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
              <Wrench className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Aucun ticket en cours</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
                Il n'y a actuellement aucun ticket de maintenance en cours.
              </p>
              <Button className="mt-4" onClick={() => setIsCreating(true)}>
                Créer un ticket
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTickets.map((ticket) => (
                <MaintenanceTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => setSelectedTicket(ticket)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
              <Wrench className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Aucun ticket terminé</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
                Il n'y a actuellement aucun ticket de maintenance terminé.
              </p>
              <Button className="mt-4" onClick={() => setIsCreating(true)}>
                Créer un ticket
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTickets.map((ticket) => (
                <MaintenanceTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => setSelectedTicket(ticket)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un nouveau ticket de maintenance</DialogTitle>
          </DialogHeader>
          <MaintenanceTicketForm
            onSubmit={handleCreateTicket}
            onCancel={() => setIsCreating(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le ticket de maintenance</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <MaintenanceTicketForm
              ticket={selectedTicket}
              onSubmit={handleUpdateTicket}
              onCancel={() => setIsEditing(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Maintenance;
