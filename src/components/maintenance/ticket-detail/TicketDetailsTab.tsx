
import { Separator } from "@/components/ui/separator";
import { MaintenanceTicket } from "@/types/maintenance";
import TicketBasicInfo from "../TicketBasicInfo";
import TicketDescription from "../TicketDescription";
import TicketDetails from "../TicketDetails";
import TicketAssignee from "../TicketAssignee";
import TicketAttachments from "../TicketAttachments";

interface TicketDetailsTabProps {
  ticket: MaintenanceTicket;
}

const TicketDetailsTab = ({ ticket }: TicketDetailsTabProps) => {
  return (
    <div className="space-y-4">
      <TicketBasicInfo
        propertyName={ticket.propertyName}
        unit={ticket.unit}
        category={ticket.category}
        reportedBy={ticket.reportedBy}
      />
      <Separator />
      <TicketDescription description={ticket.description} />
      <Separator />
      <TicketDetails
        createdAt={ticket.createdAt}
        estimatedCost={ticket.estimatedCost}
        status={ticket.status}
        priority={ticket.priority}
      />
      <Separator />
      <TicketAssignee assignedTo={ticket.assignedTo} />
      {ticket.attachments && ticket.attachments.length > 0 && (
        <>
          <Separator />
          <TicketAttachments attachments={ticket.attachments} />
        </>
      )}
    </div>
  );
};

export default TicketDetailsTab;
