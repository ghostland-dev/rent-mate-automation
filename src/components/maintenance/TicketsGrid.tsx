
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

  // Sort tickets: pinned first, then by creation date (newest first)
  const sortedTickets = [...tickets].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    // Then sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedTickets.map((ticket) => (
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
