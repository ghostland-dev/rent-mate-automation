
import TicketComments from "../TicketComments";
import { MaintenanceTicket } from "@/types/maintenance";

interface TicketMessagesTabProps {
  ticket: MaintenanceTicket;
  onAddComment: (commentText: string) => Promise<void>;
}

const TicketMessagesTab = ({ ticket, onAddComment }: TicketMessagesTabProps) => {
  return (
    <div className="py-4">
      <TicketComments
        ticket={ticket}
        onAddComment={onAddComment}
      />
    </div>
  );
};

export default TicketMessagesTab;
