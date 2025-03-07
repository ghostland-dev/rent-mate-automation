
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { mockUsers, User, UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditIcon, UserIcon, UsersIcon, MoreHorizontal, FileTextIcon, Settings } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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

  // Check if user is superadmin
  if (user?.role !== "superadmin") {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h2 className="text-2xl font-bold mb-4">Accès restreint</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          Seuls les super administrateurs peuvent accéder au tableau de bord d'administration.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h1>
        <p className="text-muted-foreground">
          Gérez les utilisateurs, les abonnements et les paramètres système
        </p>
      </div>

      <div className="bg-card rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 rounded-lg p-4 flex items-center">
            <div className="rounded-full bg-primary/20 p-3 mr-4">
              <UsersIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilisateurs</p>
              <h3 className="text-2xl font-bold">{users.length}</h3>
            </div>
          </div>
          
          <div className="bg-secondary/10 rounded-lg p-4 flex items-center">
            <div className="rounded-full bg-secondary/20 p-3 mr-4">
              <FileTextIcon className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Abonnements actifs</p>
              <h3 className="text-2xl font-bold">
                {users.filter(u => u.subscriptionStatus === "active" && u.subscriptionTier !== "free").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 flex items-center">
            <div className="rounded-full bg-muted-foreground/20 p-3 mr-4">
              <Settings className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Administrateurs</p>
              <h3 className="text-2xl font-bold">
                {users.filter(u => u.role === "admin" || u.role === "superadmin").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="users" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Rechercher un utilisateur..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <TabsContent value="users" className="mt-0">
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
      </TabsContent>

      <TabsContent value="subscriptions" className="mt-0">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Gestion des abonnements</h2>
          <p className="text-muted-foreground">
            Cette fonctionnalité sera disponible prochainement.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="mt-0">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Paramètres système</h2>
          <p className="text-muted-foreground">
            Cette fonctionnalité sera disponible prochainement.
          </p>
        </div>
      </TabsContent>

      {/* Edit User Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'utilisateur {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
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
          )}
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
    </div>
  );
};

export default AdminDashboard;
