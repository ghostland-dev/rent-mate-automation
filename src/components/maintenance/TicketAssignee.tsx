
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Assignee } from "@/types/maintenance";

interface TicketAssigneeProps {
  assignedTo?: Assignee;
}

const TicketAssignee = ({ assignedTo }: TicketAssigneeProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Assigné à</h4>
      {assignedTo ? (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={assignedTo.avatar} alt={assignedTo.name} />
            <AvatarFallback>{assignedTo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{assignedTo.name}</span>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Non assigné</p>
      )}
    </div>
  );
};

export default TicketAssignee;
