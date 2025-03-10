
import MaintenanceTicketCard from "./MaintenanceTicketCard";
import EmptyTicketState from "./EmptyTicketState";
import { MaintenanceTicket } from "@/types/maintenance";

interface TicketsGridProps {
  tickets: MaintenanceTicket[];
  onTicketClick: (ticket: MaintenanceTicket) => void;
  onCreateClick: () => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

const TicketsGrid = ({ 
  tickets, 
  onTicketClick, 
  onCreateClick,
  emptyStateTitle,
  emptyStateDescription
}: TicketsGridProps) => {
  if (tickets.length === 0) {
    return (
      <EmptyTicketState
        title={emptyStateTitle}
        description={emptyStateDescription}
        onCreateClick={onCreateClick}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tickets.map((ticket) => (
        <MaintenanceTicketCard
          key={ticket.id}
          ticket={ticket}
          onClick={() => onTicketClick(ticket)}
        />
      ))}
    </div>
  );
};

export default TicketsGrid;
