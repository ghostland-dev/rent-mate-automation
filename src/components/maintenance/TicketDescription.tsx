
import { Separator } from "@/components/ui/separator";

interface TicketDescriptionProps {
  description: string;
}

const TicketDescription = ({ description }: TicketDescriptionProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Description</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default TicketDescription;
