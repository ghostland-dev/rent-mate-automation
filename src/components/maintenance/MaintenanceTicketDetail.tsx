
import {
  AlertTriangle,
  Clock,
  Home,
  MapPin,
  Tag,
  Wrench,
  User,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  Paperclip,
  MoreVertical,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MaintenanceTicket } from "@/types/maintenance";

interface MaintenanceTicketDetailProps {
  ticket: MaintenanceTicket;
  onUpdate: (ticket: MaintenanceTicket) => void;
  onDelete: (id: string) => void;
  onClose?: () => void;
}

const statusOptions = [
  { value: "pending", label: "En attente" },
  { value: "in_progress", label: "En cours" },
  { value: "scheduled", label: "Programmé" },
  { value: "completed", label: "Terminé" },
  { value: "cancelled", label: "Annulé" },
];

const priorityOptions = [
  { value: "low", label: "Faible" },
  { value: "medium", label: "Moyen" },
  { value: "high", label: "Élevé" },
  { value: "urgent", label: "Urgent" },
];

const categoryOptions = [
  { value: "plumbing", label: "Plomberie" },
  { value: "electrical", label: "Électricité" },
  { value: "carpentry", label: "Menuiserie" },
  { value: "painting", label: "Peinture" },
  { value: "cleaning", label: "Nettoyage" },
  { value: "other", label: "Autre" },
];

const MaintenanceTicketDetail = ({ ticket, onUpdate, onDelete, onClose }: MaintenanceTicketDetailProps) => {
  const { user } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedTicket, setEditedTicket] = useState({ ...ticket });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTicket(prev => ({ ...prev, urgent: e.target.checked }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate(editedTicket);
      toast({
        title: "Ticket mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du ticket.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompleteTicket = async () => {
    setIsCompleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate({ ...ticket, status: "completed" });
      toast({
        title: "Ticket terminé",
        description: "Le ticket a été marqué comme terminé.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du ticket.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const handleCancelTicket = async () => {
    setIsCancelling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate({ ...ticket, status: "cancelled" });
      toast({
        title: "Ticket annulé",
        description: "Le ticket a été marqué comme annulé.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'annulation du ticket.",
        variant: "destructive",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleDeleteTicket = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onDelete(ticket.id);
      toast({
        title: "Ticket supprimé",
        description: "Le ticket a été supprimé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du ticket.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{ticket.title}</CardTitle>
        <div className="flex items-center gap-2">
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <span className="sr-only">Fermer</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <ScrollArea className="h-[450px] w-full pr-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{ticket.propertyName}</span>
              {ticket.unit && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{ticket.unit}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{ticket.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>Signalé par: {ticket.reportedBy}</span>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">{ticket.description}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Détails</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Date de création</Label>
                  <p className="text-sm">{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true, locale: fr })}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Coût estimé</Label>
                  <p className="text-sm">{formattedCost}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <Badge className={`${getStatusColor(ticket.status)} px-3 py-1.5 text-sm`}>
                    <Clock className="mr-1.5 h-4 w-4" />
                    {getStatusText(ticket.status)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Priorité</Label>
                  <Badge className={`${getPriorityColor(ticket.priority)} px-3 py-1.5 text-sm`}>
                    <AlertTriangle className="mr-1.5 h-4 w-4" />
                    {getPriorityText(ticket.priority)}
                  </Badge>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Assigné à</h4>
              {ticket.assignedTo ? (
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
                    <AvatarFallback>{ticket.assignedTo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{ticket.assignedTo.name}</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Non assigné</p>
              )}
            </div>
            {ticket.attachments && ticket.attachments.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Pièces jointes</h4>
                  <div className="flex flex-col space-y-2">
                    {ticket.attachments.map((attachment, index) => (
                      <a key={index} href={attachment.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm hover:underline">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <span>{attachment.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 py-4">
        {ticket.status !== "completed" && (
          <Button variant="ghost" onClick={handleCompleteTicket} disabled={isCompleting}>
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
        {ticket.status !== "cancelled" && (
          <Button variant="destructive" onClick={handleCancelTicket} disabled={isCancelling}>
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

      {/* Edit Ticket Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le ticket</DialogTitle>
            <DialogDescription>
              Modifiez les informations du ticket de maintenance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titre
              </Label>
              <Input type="text" id="title" name="title" value={editedTicket.title} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea id="description" name="description" value={editedTicket.description} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estimatedCost" className="text-right">
                Coût estimé
              </Label>
              <Input type="number" id="estimatedCost" name="estimatedCost" value={editedTicket.estimatedCost || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Status" defaultValue={editedTicket.status} />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priorité
              </Label>
              <Select onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Priorité" defaultValue={editedTicket.priority} />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Catégorie
              </Label>
              <Select onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Catégorie" defaultValue={editedTicket.category} />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="urgent" className="text-right">
                Urgent
              </Label>
              <div className="col-span-3 flex items-center">
                <Switch id="urgent" checked={editedTicket.priority === "urgent"} onCheckedChange={(checked) => handleSelectChange("priority", checked ? "urgent" : "low")} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving ? (
                <>
                  Sauvegarder <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Sauvegarder"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Ticket Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Supprimer le ticket</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce ticket de maintenance ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="destructive" onClick={handleDeleteTicket}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MaintenanceTicketDetail;
