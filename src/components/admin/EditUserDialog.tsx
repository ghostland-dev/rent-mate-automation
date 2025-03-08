
import { User, UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface EditUserDialogProps {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const EditUserDialog = ({ selectedUser, setSelectedUser, users, setUsers }: EditUserDialogProps) => {
  const { toast } = useToast();

  if (!selectedUser) return null;

  return (
    <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'utilisateur {selectedUser.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Nom</label>
            <Input id="name" value={selectedUser.name} readOnly />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" value={selectedUser.email} readOnly />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">Rôle</label>
            <Select 
              defaultValue={selectedUser.role}
              onValueChange={(value) => {
                setSelectedUser({...selectedUser, role: value as UserRole});
              }}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Utilisateur</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="subscription" className="text-sm font-medium">Abonnement</label>
            <Select 
              defaultValue={selectedUser.subscriptionTier || "free"}
              onValueChange={(value) => {
                setSelectedUser({...selectedUser, subscriptionTier: value as any});
              }}
            >
              <SelectTrigger id="subscription">
                <SelectValue placeholder="Sélectionnez un abonnement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Gratuit</SelectItem>
                <SelectItem value="basic">Basique</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Entreprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setSelectedUser(null)}>Annuler</Button>
          <Button onClick={() => {
            if (selectedUser) {
              const updatedUsers = users.map(u => 
                u.id === selectedUser.id ? selectedUser : u
              );
              setUsers(updatedUsers);
              toast({
                title: "Utilisateur mis à jour",
                description: "Les informations de l'utilisateur ont été mises à jour avec succès."
              });
              setSelectedUser(null);
            }
          }}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
