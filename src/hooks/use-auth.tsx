
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, mockUsers } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistence)
    const storedUser = localStorage.getItem("rentmate-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in a real app, this would be an API call
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        // Update last login time
        const userWithUpdatedLogin = {
          ...foundUser,
          lastLogin: new Date().toISOString()
        };
        
        setUser(userWithUpdatedLogin);
        localStorage.setItem("rentmate-user", JSON.stringify(userWithUpdatedLogin));
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${userWithUpdatedLogin.name}!`,
        });
        
        navigate("/");
      } else {
        toast({
          title: "Échec de connexion",
          description: "Email ou mot de passe invalide.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (userExists) {
        toast({
          title: "Échec d'inscription",
          description: "Un compte avec cet email existe déjà.",
          variant: "destructive",
        });
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: "user",
        subscriptionTier: "free",
        subscriptionStatus: "trialing",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      // In a real app, we would save this to a database
      // For now, just set as current user
      setUser(newUser);
      localStorage.setItem("rentmate-user", JSON.stringify(newUser));
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rentmate-user");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
