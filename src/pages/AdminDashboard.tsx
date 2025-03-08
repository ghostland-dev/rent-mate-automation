
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { mockUsers, User } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminStats from "@/components/admin/AdminStats";
import UserTable from "@/components/admin/UserTable";
import EditUserDialog from "@/components/admin/EditUserDialog";
import TabPanels from "@/components/admin/TabPanels";

const AdminDashboard = () => {
  const { user } = useAuth();
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

      <AdminStats users={users} />

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

      <TabPanels activeTab={activeTab}>
        <UserTable 
          users={users} 
          filteredUsers={filteredUsers} 
          setUsers={setUsers} 
          setSelectedUser={setSelectedUser}
        />
      </TabPanels>

      <EditUserDialog 
        selectedUser={selectedUser} 
        setSelectedUser={setSelectedUser} 
        users={users} 
        setUsers={setUsers}
      />
    </div>
  );
};

export default AdminDashboard;
