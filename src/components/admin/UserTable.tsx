
import { useState } from "react";
import { User, UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { EditIcon, UserIcon, MoreHorizontal } from "lucide-react";

interface UserTableProps {
  users: User[];
  filteredUsers: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserTable = ({ users, filteredUsers, setUsers, setSelectedUser }: UserTableProps) => {
  const { toast } = useToast();

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    
    toast({
      title: "Rôle mis à jour",
      description: "Le rôle de l'utilisateur a été mis à jour avec succès."
    });
  };

  const handleSubscriptionChange = (userId: string, newTier: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, subscriptionTier: newTier as any } : user
    );
    setUsers(updatedUsers);
    
    toast({
      title: "Abonnement mis à jour",
      description: "L'abonnement de l'utilisateur a été mis à jour avec succès."
    });
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès."
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Abonnement</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24">
                Aucun utilisateur trouvé.
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-secondary/20 rounded-full p-1">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.subscriptionTier || "free"}
                    onValueChange={(value) => handleSubscriptionChange(user.id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Abonnement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Gratuit</SelectItem>
                      <SelectItem value="basic">Basique</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    user.subscriptionStatus === "active" ? "default" :
                    user.subscriptionStatus === "trialing" ? "secondary" :
                    user.subscriptionStatus === "canceled" ? "outline" : "destructive"
                  }>
                    {user.subscriptionStatus === "active" ? "Actif" :
                     user.subscriptionStatus === "trialing" ? "Essai" :
                     user.subscriptionStatus === "canceled" ? "Annulé" : "Expiré"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        <EditIcon className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
