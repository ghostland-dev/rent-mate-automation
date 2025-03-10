
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
  User,
  Pin
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

  // Format the estimated cost 
  const formattedCost = ticket.estimatedCost ? 
    ticket.estimatedCost.toLocaleString('fr-FR') + ' €' : 
    'Non spécifié';

  // Get status and priority translations
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Terminé";
      case "in_progress": return "En cours";
      case "pending": return "En attente";
      case "scheduled": return "Programmé";
      case "cancelled": return "Annulé";
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent": return "Urgent";
      case "high": return "Élevé";
      case "medium": return "Moyen";
      case "low": return "Faible";
      default: return priority;
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border-l-4 ${ticket.pinned ? 'ring-2 ring-primary ring-offset-2' : ''}`}
      style={{ 
        borderLeftColor: 
          ticket.priority === "urgent" ? "rgb(220, 38, 38)" : 
          ticket.priority === "high" ? "rgb(234, 88, 12)" : 
          ticket.priority === "medium" ? "rgb(234, 179, 8)" : 
          "rgb(22, 163, 74)" 
      }}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg line-clamp-1">{ticket.title}</CardTitle>
            {ticket.pinned && (
              <Pin className="h-4 w-4 text-primary" fill="currentColor" />
            )}
          </div>
          <Badge className={getPriorityColor(ticket.priority)}>
            {getPriorityText(ticket.priority)}
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
      <CardFooter className="pt-1 flex justify-between items-center">
        <Badge className={getStatusColor(ticket.status)}>
          {getStatusText(ticket.status)}
        </Badge>
        <div className="flex items-center gap-1">
          <Wrench className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {formattedCost}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceTicketCard;
