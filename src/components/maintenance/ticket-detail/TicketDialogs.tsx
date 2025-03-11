
import { MaintenanceTicket } from "@/types/maintenance";
import EditTicketDialog from "../EditTicketDialog";
import DeleteTicketDialog from "../DeleteTicketDialog";

interface TicketDialogsProps {
  ticket: MaintenanceTicket;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  setIsDeleteDialogOpen: (open: boolean) => void;
  onUpdate: (ticket: MaintenanceTicket) => void;
  onDelete: () => void;
}

const TicketDialogs = ({
  ticket,
  isEditDialogOpen,
  isDeleteDialogOpen,
  setIsEditDialogOpen,
  setIsDeleteDialogOpen,
  onUpdate,
  onDelete,
}: TicketDialogsProps) => {
  return (
    <>
      <EditTicketDialog
        ticket={ticket}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={onUpdate}
      />

      <DeleteTicketDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={onDelete}
      />
    </>
  );
};

export default TicketDialogs;
