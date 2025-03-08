
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AlertTriangle, Calendar, Edit, Home, MapPin, MessageSquare, Tag, Tool, Trash2, User } from "lucide-react";
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
        <Button variant="ghost" onClick={onClose}>
          &larr; Retour
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

      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">{ticket.title}</h2>
        <div className="flex flex-col gap-2 items-end">
          <Badge className={getPriorityColor(ticket.priority)}>
            {ticket.priority === "urgent" && "Urgent"}
            {ticket.priority === "high" && "Élevé"}
            {ticket.priority === "medium" && "Moyen"}
            {ticket.priority === "low" && "Faible"}
          </Badge>
          <Badge className={getStatusColor(ticket.status)}>
            {ticket.status === "completed" && "Terminé"}
            {ticket.status === "in_progress" && "En cours"}
            {ticket.status === "pending" && "En attente"}
            {ticket.status === "scheduled" && "Programmé"}
            {ticket.status === "cancelled" && "Annulé"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Détails</CardTitle>
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
            
            {(ticket.estimatedCost || ticket.actualCost) && (
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
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {ticket.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="rounded-md w-full h-32 object-cover"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Commentaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(!ticket.comments || ticket.comments.length === 0) ? (
                <p className="text-muted-foreground text-center py-4">
                  Aucun commentaire pour l'instant
                </p>
              ) : (
                <div className="space-y-3">
                  {ticket.comments?.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-3">
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
