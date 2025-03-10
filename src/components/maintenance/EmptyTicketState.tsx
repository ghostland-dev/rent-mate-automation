
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

interface EmptyTicketStateProps {
  title?: string;
  description?: string;
  onCreateClick: () => void;
}

const EmptyTicketState = ({ 
  title = "Aucun ticket de maintenance", 
  description = "Il n'y a actuellement aucun ticket de maintenance correspondant à vos critères.",
  onCreateClick 
}: EmptyTicketStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
      <Wrench className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
        {description}
      </p>
      <Button className="mt-4" onClick={onCreateClick}>
        Créer un ticket
      </Button>
    </div>
  );
};

export default EmptyTicketState;
