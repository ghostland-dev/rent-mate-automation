
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter,
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { MaintenanceTicket } from "@/types/maintenance";
import { statusOptions, priorityOptions, categoryOptions } from "./utils/maintenanceHelpers";

interface EditTicketDialogProps {
  ticket: MaintenanceTicket;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (ticket: MaintenanceTicket) => void;
}

const EditTicketDialog = ({ ticket, isOpen, onOpenChange, onSubmit }: EditTicketDialogProps) => {
  const [editedTicket, setEditedTicket] = useState({ ...ticket });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(editedTicket);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
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
  );
};

export default EditTicketDialog;
