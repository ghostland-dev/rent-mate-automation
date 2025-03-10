
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceTicket } from "@/types/maintenance";
import { 
  AlertTriangle, 
  Clock, 
  Home, 
  MapPin, 
  Tag, 
  Wrench, 
  User
} from "lucide-react";

interface MaintenanceTicketCardProps {
  ticket: MaintenanceTicket;
  onClick?: () => void;
}

export const MaintenanceTicketCard = ({ ticket, onClick }: MaintenanceTicketCardProps) => {
  // Helper function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "scheduled": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  // Helper function to determine priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  // Format the date to relative time (e.g., "2 days ago")
  const formattedDate = formatDistanceToNow(new Date(ticket.createdAt), { 
    addSuffix: true,
    locale: fr
  });

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">{ticket.title}</CardTitle>
          <Badge className={getPriorityColor(ticket.priority)}>
            {ticket.priority === "urgent" && "Urgent"}
            {ticket.priority === "high" && "Élevé"}
            {ticket.priority === "medium" && "Moyen"}
            {ticket.priority === "low" && "Faible"}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm line-clamp-1">{ticket.propertyName}</span>
          </div>
          {ticket.unit && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm">{ticket.unit}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">{ticket.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">Signalé par: {ticket.reportedBy}</span>
          </div>
          <p className="text-sm line-clamp-2 text-muted-foreground">{ticket.description}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-1 flex justify-between">
        <Badge className={getStatusColor(ticket.status)}>
          {ticket.status === "completed" && "Terminé"}
          {ticket.status === "in_progress" && "En cours"}
          {ticket.status === "pending" && "En attente"}
          {ticket.status === "scheduled" && "Programmé"}
          {ticket.status === "cancelled" && "Annulé"}
        </Badge>
        {ticket.estimatedCost && (
          <span className="text-sm font-medium">
            {ticket.estimatedCost.toLocaleString('fr-FR')} €
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default MaintenanceTicketCard;
