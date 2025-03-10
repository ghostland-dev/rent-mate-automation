
import { Separator } from "@/components/ui/separator";

interface TicketDescriptionProps {
  description: string;
}

const TicketDescription = ({ description }: TicketDescriptionProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Description</h4>
      <div className="bg-muted/50 p-3 rounded-md">
        <p className="text-sm whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default TicketDescription;
