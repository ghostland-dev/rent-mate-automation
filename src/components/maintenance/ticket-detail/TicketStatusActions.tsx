
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface TicketStatusActionsProps {
  status: string;
  onComplete: () => Promise<void>;
  onCancel: () => Promise<void>;
  isCompleting: boolean;
  isCancelling: boolean;
}

const TicketStatusActions = ({
  status,
  onComplete,
  onCancel,
  isCompleting,
  isCancelling,
}: TicketStatusActionsProps) => {
  // Only show actions if ticket is not already completed or cancelled
  if (status === "completed" || status === "cancelled") {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={onComplete}
        disabled={isCompleting}
      >
        <CheckCircle2 className="h-4 w-4" />
        {isCompleting ? "Traitement..." : "Marquer comme terminé"}
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2 text-destructive hover:text-destructive"
        onClick={onCancel}
        disabled={isCancelling}
      >
        <XCircle className="h-4 w-4" />
        {isCancelling ? "Traitement..." : "Annuler le ticket"}
      </Button>
    </div>
  );
};

export default TicketStatusActions;
