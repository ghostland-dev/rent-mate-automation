
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tenant, TenantStatus } from "@/types/tenant";

interface TenantFormProps {
  tenant: Partial<Tenant>;
  setTenant: (tenant: Partial<Tenant>) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export const TenantForm = ({ tenant, setTenant, onSubmit, isEditing = false }: TenantFormProps) => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit-' : ''}name`}>Nom complet{!isEditing && ' *'}</Label>
            <Input
              id={`${isEditing ? 'edit-' : ''}name`}
              value={tenant.name || ''}
              onChange={(e) => setTenant({name: e.target.value})}
              placeholder="Nom et prénom"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit-' : ''}property`}>Propriété{!isEditing && ' *'}</Label>
            <Input
              id={`${isEditing ? 'edit-' : ''}property`}
              value={tenant.property || ''}
              onChange={(e) => setTenant({property: e.target.value})}
              placeholder="Adresse du logement"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit-' : ''}email`}>Email{!isEditing && ' *'}</Label>
            <Input
              id={`${isEditing ? 'edit-' : ''}email`}
              type="email"
              value={tenant.email || ''}
              onChange={(e) => setTenant({email: e.target.value})}
              placeholder="email@exemple.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit-' : ''}phone`}>Téléphone</Label>
            <Input
              id={`${isEditing ? 'edit-' : ''}phone`}
              value={tenant.phone || ''}
              onChange={(e) => setTenant({phone: e.target.value})}
              placeholder="06 xx xx xx xx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit-' : ''}moveInDate`}>Date d'entrée</Label>
            <Input
              id={`${isEditing ? 'edit-' : ''}moveInDate`}
              type="date"
              value={tenant.moveInDate || ''}
              onChange={(e) => setTenant({moveInDate: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit-' : ''}leaseEnd`}>Fin du bail</Label>
            <Input
              id={`${isEditing ? 'edit-' : ''}leaseEnd`}
              type="date"
              value={tenant.leaseEnd || ''}
              onChange={(e) => setTenant({leaseEnd: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEditing ? 'edit-' : ''}rentAmount`}>Loyer mensuel (€)</Label>
            <Input
              id={`${isEditing ? 'edit-' : ''}rentAmount`}
              type="number"
              value={tenant.rentAmount?.toString() || ''}
              onChange={(e) => setTenant({rentAmount: parseFloat(e.target.value) || 0})}
              min="0"
              step="50"
            />
          </div>
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="edit-status">Statut</Label>
              <select
                id="edit-status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={tenant.status}
                onChange={(e) => setTenant({status: e.target.value as TenantStatus})}
              >
                <option value="active">Actif</option>
                <option value="pending">En attente</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Annuler</Button>
        </DialogClose>
        <Button onClick={onSubmit}>{isEditing ? 'Enregistrer' : 'Ajouter'}</Button>
      </DialogFooter>
    </>
  );
};
