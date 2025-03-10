
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Pin, PinOff } from "lucide-react";
import { MaintenanceTicket } from "@/types/maintenance";

interface TicketActionsProps {
  ticket: MaintenanceTicket;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}

const TicketActions = ({ ticket, onEdit, onDelete, onTogglePin }: TicketActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onTogglePin} 
        className="flex items-center gap-1" 
        title={ticket.pinned ? "Détacher le ticket" : "Épingler le ticket"}
      >
        {ticket.pinned ? (
          <>
            <PinOff className="h-4 w-4" />
            <span className="hidden sm:inline">Détacher</span>
          </>
        ) : (
          <>
            <Pin className="h-4 w-4" />
            <span className="hidden sm:inline">Épingler</span>
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={onEdit} className="flex items-center gap-1">
        <Pencil className="h-4 w-4" />
        <span className="hidden sm:inline">Modifier</span>
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete} className="flex items-center gap-1">
        <Trash2 className="h-4 w-4" />
        <span className="hidden sm:inline">Supprimer</span>
      </Button>
    </div>
  );
};

export default TicketActions;
