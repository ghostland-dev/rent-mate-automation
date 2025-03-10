
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Settings, Save } from "lucide-react";
import { MaintenanceTicket } from "@/types/maintenance";
import { toast } from "@/hooks/use-toast";

interface TicketParametersProps {
  ticket: MaintenanceTicket;
  onUpdateParameters: (updates: Partial<MaintenanceTicket>) => void;
}

const TicketParameters = ({ ticket, onUpdateParameters }: TicketParametersProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    defaultValues: {
      estimatedCost: ticket.estimatedCost?.toString() || "",
      actualCost: ticket.actualCost?.toString() || "",
    },
  });

  const handleSave = async (values: { estimatedCost: string; actualCost: string }) => {
    setIsSaving(true);
    try {
      const updates: Partial<MaintenanceTicket> = {};
      
      if (values.estimatedCost) {
        updates.estimatedCost = parseFloat(values.estimatedCost);
      }
      
      if (values.actualCost) {
        updates.actualCost = parseFloat(values.actualCost);
      }
      
      await onUpdateParameters(updates);
      setIsEditing(false);
      toast({
        description: "Les paramètres du ticket ont été mis à jour.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h4 className="text-sm font-medium">Paramètres</h4>
        </div>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Modifier
          </Button>
        )}
      </div>

      <Separator />

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="estimatedCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coût estimé (€)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      min="0" 
                      step="0.01"
                      placeholder="Entrez le coût estimé" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actualCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coût réel (€)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      min="0" 
                      step="0.01"
                      placeholder="Entrez le coût réel" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Enregistrement..." : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Coût estimé</TableCell>
              <TableCell className="text-right">
                {ticket.estimatedCost ? `${ticket.estimatedCost} €` : "Non défini"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Coût réel</TableCell>
              <TableCell className="text-right">
                {ticket.actualCost ? `${ticket.actualCost} €` : "Non défini"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Écart</TableCell>
              <TableCell className="text-right">
                {ticket.estimatedCost && ticket.actualCost
                  ? `${(ticket.actualCost - ticket.estimatedCost).toFixed(2)} €`
                  : "Non calculable"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TicketParameters;
