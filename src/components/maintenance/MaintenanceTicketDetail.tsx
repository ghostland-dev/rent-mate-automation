
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { MaintenanceTicket } from "@/types/maintenance";
import TicketHeader from "./TicketHeader";
import TicketActions from "./TicketActions";
import TicketTabs from "./ticket-detail/TicketTabs";
import TicketContent from "./ticket-detail/TicketContent";
import TicketDetailsTab from "./ticket-detail/TicketDetailsTab";
import TicketMessagesTab from "./ticket-detail/TicketMessagesTab";
import TicketParametersTab from "./ticket-detail/TicketParametersTab";
import TicketStatusActions from "./ticket-detail/TicketStatusActions";
import TicketDialogs from "./ticket-detail/TicketDialogs";

interface MaintenanceTicketDetailProps {
  ticket: MaintenanceTicket;
  onUpdate: (ticket: MaintenanceTicket) => void;
  onDelete: (id: string) => void;
  onClose?: () => void;
  onTogglePin: () => void;
}

const MaintenanceTicketDetail = ({ 
  ticket, 
  onUpdate, 
  onDelete, 
  onClose,
  onTogglePin
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
      
      return Promise.resolve();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du message.",
        variant: "destructive",
      });
      return Promise.reject(error);
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

      <TicketTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        ticket={ticket}
      />

      <CardContent className="pb-2">
        <TicketContent>
          {activeTab === 'details' && <TicketDetailsTab ticket={ticket} />}
          {activeTab === 'messages' && <TicketMessagesTab ticket={ticket} onAddComment={handleAddComment} />}
          {activeTab === 'parameters' && <TicketParametersTab ticket={ticket} onUpdateParameters={handleUpdateParameters} />}
        </TicketContent>
      </CardContent>

      <TicketStatusActions
        status={ticket.status}
        onComplete={handleCompleteTicket}
        onCancel={handleCancelTicket}
        isCompleting={isCompleting}
        isCancelling={isCancelling}
      />

      <TicketActions
        ticket={ticket}
        onEdit={() => setIsEditDialogOpen(true)}
        onDelete={() => setIsDeleteDialogOpen(true)}
        onTogglePin={onTogglePin}
      />

      <TicketDialogs
        ticket={ticket}
        isEditDialogOpen={isEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onUpdate={onUpdate}
        onDelete={handleDeleteTicket}
      />
    </Card>
  );
};

export default MaintenanceTicketDetail;
