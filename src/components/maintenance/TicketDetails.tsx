
import { Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { getStatusColor, getPriorityColor, getStatusText, getPriorityText } from "./utils/maintenanceHelpers";

interface TicketDetailsProps {
  createdAt: string;
  estimatedCost?: number;
  status: string;
  priority: string;
}

const TicketDetails = ({ createdAt, estimatedCost, status, priority }: TicketDetailsProps) => {
  // Format the estimated cost
  const formattedCost = estimatedCost 
    ? estimatedCost.toLocaleString('fr-FR') + ' €' 
    : 'Non spécifié';

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Détails</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-muted-foreground">Date de création</Label>
          <p className="text-sm">{formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: fr })}</p>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Coût estimé</Label>
          <p className="text-sm">{formattedCost}</p>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Status</Label>
          <Badge className={`${getStatusColor(status)} px-3 py-1.5 text-sm`}>
            <Clock className="mr-1.5 h-4 w-4" />
            {getStatusText(status)}
          </Badge>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Priorité</Label>
          <Badge className={`${getPriorityColor(priority)} px-3 py-1.5 text-sm`}>
            <AlertTriangle className="mr-1.5 h-4 w-4" />
            {getPriorityText(priority)}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
