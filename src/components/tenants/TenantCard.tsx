
import { User, Home, Mail, Phone, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Tenant } from "@/types/tenant";

interface TenantCardProps {
  tenant: Tenant;
  onEdit: (tenant: Tenant) => void;
  onDelete: (id: string) => void;
  isMobile: boolean;
}

export const TenantCard = ({ tenant, onEdit, onDelete, isMobile }: TenantCardProps) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

  const statusText = {
    active: "Actif",
    pending: "En attente",
    inactive: "Inactif",
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{tenant.name}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  <span>{tenant.property}</span>
                </div>
                {!isMobile && (
                  <>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{tenant.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{tenant.phone || "Non renseigné"}</span>
                    </div>
                  </>
                )}
              </div>
              {isMobile && (
                <div className="flex flex-col mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{tenant.phone || "Non renseigné"}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <div className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", statusStyles[tenant.status])}>
              {statusText[tenant.status]}
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Bail: {tenant.moveInDate ? new Date(tenant.moveInDate).toLocaleDateString('fr-FR') : 'N/A'}</span>
                </div>
                <div>
                  <span>{tenant.rentAmount}€/mois</span>
                </div>
              </div>
            )}

            {isMobile && (
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Bail: {tenant.moveInDate ? new Date(tenant.moveInDate).toLocaleDateString('fr-FR') : 'N/A'}</span>
                </div>
                <div>
                  <span>{tenant.rentAmount}€/mois</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 ml-auto">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(tenant)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>
                      Êtes-vous sûr de vouloir supprimer le locataire <strong>{tenant.name}</strong> ?
                      Cette action est irréversible.
                    </p>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Annuler</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        variant="destructive"
                        onClick={() => onDelete(tenant.id)}
                      >
                        Supprimer
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
