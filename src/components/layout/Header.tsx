
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Search, Sun, Moon, CreditCard, UserCog, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  // Extract initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className={cn(
      "fixed top-0 z-20 w-full transition-all duration-200 ease-in-out",
      isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="lg:w-1/3">
          <div className="relative ml-16 md:ml-24 lg:ml-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-full rounded-full pl-10 pr-4 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user?.subscriptionTier !== "enterprise" && (
            <Link to="/subscription">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <CreditCard className="mr-2 h-4 w-4" />
                {user?.subscriptionTier === "free" ? "Passer à un abonnement payant" : "Gérer l'abonnement"}
              </Button>
            </Link>
          )}
          
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt={user?.name || "User avatar"} />
                  <AvatarFallback>{user ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
                {user?.role === "admin" || user?.role === "superadmin" ? (
                  <Badge className="absolute -top-2 -right-2 px-1 py-0 text-[10px]" variant="secondary">
                    {user.role === "superadmin" ? "Super" : "Admin"}
                  </Badge>
                ) : null}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              {user && (
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/subscription" className="cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Abonnement</span>
                  {user?.subscriptionTier && (
                    <Badge variant="outline" className="ml-auto">
                      {user.subscriptionTier === "free" ? "Gratuit" : 
                      user.subscriptionTier === "basic" ? "Basique" : 
                      user.subscriptionTier === "premium" ? "Premium" : "Entreprise"}
                    </Badge>
                  )}
                </Link>
              </DropdownMenuItem>
              {(user?.role === "admin" || user?.role === "superadmin") && (
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="cursor-pointer">
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Administration</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
