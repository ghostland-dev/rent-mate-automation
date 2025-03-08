
import { User } from "@/types/user";
import { UsersIcon, FileTextIcon, Settings } from "lucide-react";

interface AdminStatsProps {
  users: User[];
}

const AdminStats = ({ users }: AdminStatsProps) => {
  return (
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
  );
};

export default AdminStats;
