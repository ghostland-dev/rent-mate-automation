
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { MaintenanceTicket } from "@/types/maintenance";
import TicketHeader from "./TicketHeader";
import TicketBasicInfo from "./TicketBasicInfo";
import TicketDescription from "./TicketDescription";
import TicketDetails from "./TicketDetails";
import TicketAssignee from "./TicketAssignee";
import TicketAttachments from "./TicketAttachments";
import TicketActions from "./TicketActions";
import TicketComments from "./TicketComments";
import TicketParameters from "./TicketParameters";
import EditTicketDialog from "./EditTicketDialog";
import DeleteTicketDialog from "./DeleteTicketDialog";

interface MaintenanceTicketDetailProps {
  ticket: MaintenanceTicket;
  onUpdate: (ticket: MaintenanceTicket) => void;
  onDelete: (id: string) => void;
  onClose?: () => void;
}

const MaintenanceTicketDetail = ({ 
  ticket, 
  onUpdate, 
  onDelete, 
  onClose 
}: MaintenanceTicketDetailProps) => {
  const { user } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'messages' | 'parameters'>('details');

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

  const handleAddComment = async (commentText: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newComment = {
        id: `comment${Date.now()}`,
        text: commentText,
        author: user?.name || "Admin",
        createdAt: new Date().toISOString(),
      };
      
      const updatedComments = [
        ...(ticket.comments || []),
        newComment
      ];
      
      onUpdate({
        ...ticket,
        comments: updatedComments,
      });
      
      toast({
        description: "Votre message a été ajouté.",
      });
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du message.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateParameters = async (updates: Partial<MaintenanceTicket>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onUpdate({
        ...ticket,
        ...updates,
      });
      
      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card className="w-full overflow-hidden shadow-md">
      <TicketHeader 
        title={ticket.title}
        onEdit={() => setIsEditDialogOpen(true)}
        onDelete={() => setIsDeleteDialogOpen(true)}
        onClose={onClose}
      />

      <div className="border-b">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'details' ? 'border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('details')}
          >
            Détails
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'messages' ? 'border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages {ticket.comments && ticket.comments.length > 0 && `(${ticket.comments.length})`}
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'parameters' ? 'border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('parameters')}
          >
            Paramètres
          </button>
        </div>
      </div>

      <CardContent className="pb-2">
        <ScrollArea className="h-[450px] w-full pr-2">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <TicketBasicInfo
                propertyName={ticket.propertyName}
                unit={ticket.unit}
                category={ticket.category}
                reportedBy={ticket.reportedBy}
              />
              <Separator />
              <TicketDescription description={ticket.description} />
              <Separator />
              <TicketDetails
                createdAt={ticket.createdAt}
                estimatedCost={ticket.estimatedCost}
                status={ticket.status}
                priority={ticket.priority}
              />
              <Separator />
              <TicketAssignee assignedTo={ticket.assignedTo} />
              {ticket.attachments && ticket.attachments.length > 0 && (
                <>
                  <Separator />
                  <TicketAttachments attachments={ticket.attachments} />
                </>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="py-4">
              <TicketComments
                ticket={ticket}
                onAddComment={handleAddComment}
              />
            </div>
          )}

          {activeTab === 'parameters' && (
            <div className="py-4">
              <TicketParameters
                ticket={ticket}
                onUpdateParameters={handleUpdateParameters}
              />
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <TicketActions
        status={ticket.status}
        onComplete={handleCompleteTicket}
        onCancel={handleCancelTicket}
        isCompleting={isCompleting}
        isCancelling={isCancelling}
      />

      <EditTicketDialog
        ticket={ticket}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={onUpdate}
      />

      <DeleteTicketDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={() => handleDeleteTicket()}
      />
    </Card>
  );
};

export default MaintenanceTicketDetail;
