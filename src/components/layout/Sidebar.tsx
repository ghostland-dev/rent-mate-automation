
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Home, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart, 
  Wrench,
  CreditCard,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon: Icon, title, path, isCollapsed }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => cn(
        "flex items-center gap-3 p-3 rounded-md transition-all duration-200 hover:bg-primary/10 group",
        isActive ? "bg-primary/10 text-primary" : "text-foreground/80"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && (
        <span className="animate-fade-in text-sm font-medium">{title}</span>
      )}
      {isCollapsed && (
        <div className="absolute left-16 z-50 ml-6 hidden scale-0 rounded-md bg-popover px-2 py-1 text-sm opacity-0 shadow-md transition-all group-hover:scale-100 group-hover:opacity-100 group-hover:block whitespace-nowrap">
          {title}
        </div>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { title: "Tableau de bord", icon: LayoutDashboard, path: "/" },
    { title: "Propriétés", icon: Home, path: "/properties" },
    { title: "Locataires", icon: Users, path: "/tenants" },
    { title: "Paiements", icon: BarChart, path: "/payments" },
    { title: "Maintenance", icon: Wrench, path: "/maintenance" },
    { title: "Documents", icon: FileText, path: "/documents" },
    { title: "Messages", icon: MessageSquare, path: "/messages" },
    { title: "Abonnement", icon: CreditCard, path: "/subscription" },
  ];

  // Add admin link for admins and superadmins
  if (user?.role === "admin" || user?.role === "superadmin") {
    menuItems.push({ title: "Administration", icon: ShieldCheck, path: "/admin" });
  }

  // Add settings as the last item
  menuItems.push({ title: "Paramètres", icon: Settings, path: "/settings" });

  return (
    <aside
      className={cn(
        "glass fixed left-0 top-0 z-30 flex h-full flex-col border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-xl font-semibold text-primary">RentMate</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            path={item.path}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
