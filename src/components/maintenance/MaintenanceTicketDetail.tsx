
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  AlertTriangle, 
  Calendar, 
  Edit, 
  Home, 
  MapPin, 
  MessageSquare, 
  Tag, 
  Wrench, 
  Trash2, 
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  CalendarClock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MaintenanceTicket } from "@/types/maintenance";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceTicketDetailProps {
  ticket: MaintenanceTicket;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const MaintenanceTicketDetail = ({
  ticket,
  onEdit,
  onDelete,
  onClose,
}: MaintenanceTicketDetailProps) => {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

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

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in_progress": return <Wrench className="h-5 w-5 text-blue-600" />;
      case "pending": return <Clock className="h-5 w-5 text-yellow-600" />;
      case "scheduled": return <CalendarClock className="h-5 w-5 text-purple-600" />;
      case "cancelled": return <AlertCircle className="h-5 w-5 text-gray-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-slate-600" />;
    }
  };

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

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // Simuler l'ajout d'un commentaire (dans une vraie application, cela enverrait une requête API)
    toast({
      description: "Commentaire ajouté avec succès.",
    });
    
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onClose} className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Retour
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={onEdit}>
            <Edit className="h-4 w-4" /> Modifier
          </Button>
          <Button variant="destructive" className="flex items-center gap-2" onClick={onDelete}>
            <Trash2 className="h-4 w-4" /> Supprimer
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">{ticket.title}</h2>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{format(new Date(ticket.createdAt), "PPP", { locale: fr })}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Badge className={getPriorityColor(ticket.priority)} size="lg">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {getPriorityText(ticket.priority)}
          </Badge>
          <Badge className={getStatusColor(ticket.status)} size="lg">
            {getStatusIcon(ticket.status)}
            <span className="ml-1">{getStatusText(ticket.status)}</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Détails du ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Propriété</p>
                  <p className="text-muted-foreground">{ticket.propertyName}</p>
                </div>
              </div>
              
              {ticket.unit && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Unité</p>
                    <p className="text-muted-foreground">{ticket.unit}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Catégorie</p>
                  <p className="text-muted-foreground">{ticket.category}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Signalé par</p>
                  <p className="text-muted-foreground">{ticket.reportedBy}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Créé le</p>
                  <p className="text-muted-foreground">
                    {format(new Date(ticket.createdAt), "PPP", { locale: fr })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Mis à jour le</p>
                  <p className="text-muted-foreground">
                    {format(new Date(ticket.updatedAt), "PPP", { locale: fr })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="font-medium">Description</p>
              <p className="text-muted-foreground whitespace-pre-line mt-1">{ticket.description}</p>
            </div>
            
            {(ticket.estimatedCost !== undefined || ticket.actualCost !== undefined) && (
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {ticket.estimatedCost !== undefined && (
                    <div>
                      <p className="font-medium">Coût estimé</p>
                      <p className="text-muted-foreground">
                        {ticket.estimatedCost.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  )}
                  
                  {ticket.actualCost !== undefined && (
                    <div>
                      <p className="font-medium">Coût réel</p>
                      <p className="text-muted-foreground">
                        {ticket.actualCost.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          {ticket.images && ticket.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {ticket.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="rounded-md w-full h-32 object-cover transition-transform group-hover:scale-[1.02] cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                        <Button size="sm" variant="secondary" className="text-xs">
                          Agrandir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Commentaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(!ticket.comments || ticket.comments.length === 0) ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Aucun commentaire pour l'instant
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {ticket.comments?.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between">
                        <p className="font-medium">{comment.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(comment.createdAt), "PPp", { locale: fr })}
                        </p>
                      </div>
                      <p className="mt-1 text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="pt-2">
                <Textarea
                  placeholder="Ajouter un commentaire..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button 
                  onClick={handleAddComment} 
                  className="mt-2 w-full"
                  disabled={!newComment.trim()}
                >
                  Ajouter un commentaire
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTicketDetail;
