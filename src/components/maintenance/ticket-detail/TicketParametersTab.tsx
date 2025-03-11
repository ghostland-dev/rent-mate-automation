
import TicketParameters from "../TicketParameters";
import { MaintenanceTicket } from "@/types/maintenance";

interface TicketParametersTabProps {
  ticket: MaintenanceTicket;
  onUpdateParameters: (updates: Partial<MaintenanceTicket>) => Promise<boolean>;
}

const TicketParametersTab = ({ ticket, onUpdateParameters }: TicketParametersTabProps) => {
  return (
    <div className="py-4">
      <TicketParameters
        ticket={ticket}
        onUpdateParameters={onUpdateParameters}
      />
    </div>
  );
};

export default TicketParametersTab;
