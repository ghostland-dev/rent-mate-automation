
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketsGrid from "./TicketsGrid";
import { MaintenanceTicket, MaintenanceStatus } from "@/types/maintenance";

interface MaintenanceTabsProps {
  currentTab: string;
  filteredTickets: MaintenanceTicket[];
  onTabChange: (value: string) => void;
  onTicketClick: (ticket: MaintenanceTicket) => void;
  onCreateClick: () => void;
}

const MaintenanceTabs = ({
  currentTab,
  filteredTickets,
  onTabChange,
  onTicketClick,
  onCreateClick,
}: MaintenanceTabsProps) => {
  const getEmptyStateForTab = (tab: string) => {
    switch (tab) {
      case "pending":
        return {
          title: "Aucun ticket en attente",
          description: "Il n'y a actuellement aucun ticket de maintenance en attente."
        };
      case "scheduled":
        return {
          title: "Aucun ticket programmé",
          description: "Il n'y a actuellement aucun ticket de maintenance programmé."
        };
      case "in_progress":
        return {
          title: "Aucun ticket en cours",
          description: "Il n'y a actuellement aucun ticket de maintenance en cours."
        };
      case "completed":
        return {
          title: "Aucun ticket terminé",
          description: "Il n'y a actuellement aucun ticket de maintenance terminé."
        };
      default:
        return {
          title: "Aucun ticket de maintenance",
          description: "Il n'y a actuellement aucun ticket de maintenance correspondant à vos critères."
        };
    }
  };

  return (
    <Tabs defaultValue="all" value={currentTab} onValueChange={onTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="all">Tous</TabsTrigger>
        <TabsTrigger value="pending">En attente</TabsTrigger>
        <TabsTrigger value="scheduled">Programmés</TabsTrigger>
        <TabsTrigger value="in_progress">En cours</TabsTrigger>
        <TabsTrigger value="completed">Terminés</TabsTrigger>
      </TabsList>

      {["all", "pending", "scheduled", "in_progress", "completed"].map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-0">
          <TicketsGrid
            tickets={filteredTickets}
            onTicketClick={onTicketClick}
            onCreateClick={onCreateClick}
            {...getEmptyStateForTab(tab)}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MaintenanceTabs;
