
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface TicketActionsProps {
  status: string;
  onComplete: () => void;
  onCancel: () => void;
  isCompleting: boolean;
  isCancelling: boolean;
}

const TicketActions = ({ 
  status, 
  onComplete, 
  onCancel, 
  isCompleting, 
  isCancelling 
}: TicketActionsProps) => {
  return (
    <CardFooter className="flex justify-end gap-2 py-4">
      {status !== "completed" && (
        <Button variant="ghost" onClick={onComplete} disabled={isCompleting}>
          {isCompleting ? (
            <>
              Compléter <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Compléter
            </>
          )}
        </Button>
      )}
      {status !== "cancelled" && (
        <Button variant="destructive" onClick={onCancel} disabled={isCancelling}>
          {isCancelling ? (
            <>
              Annuler <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              <XCircle className="mr-2 h-4 w-4" />
              Annuler
            </>
          )}
        </Button>
      )}
    </CardFooter>
  );
};

export default TicketActions;
