
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tenant, mockTenants } from "@/types/tenant";

export const useTenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [newTenant, setNewTenant] = useState<Partial<Tenant>>({
    name: "",
    email: "",
    phone: "",
    property: "",
    status: "pending",
    moveInDate: "",
    leaseEnd: "",
    rentAmount: 0,
  });
  
  const { toast } = useToast();

  // Update selectedTenant to handle partial updates
  const updateSelectedTenant = (updatedFields: Partial<Tenant>) => {
    if (selectedTenant) {
      setSelectedTenant({ ...selectedTenant, ...updatedFields });
    }
  };

  // Update newTenant
  const updateNewTenant = (updatedFields: Partial<Tenant>) => {
    setNewTenant({ ...newTenant, ...updatedFields });
  };

  // Filter tenants based on search query and active tab
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && tenant.status === "active";
    if (activeTab === "pending") return matchesSearch && tenant.status === "pending";
    if (activeTab === "inactive") return matchesSearch && tenant.status === "inactive";
    
    return matchesSearch;
  });

  // Function to handle adding a new tenant
  const handleAddTenant = () => {
    if (!newTenant.name || !newTenant.email || !newTenant.property) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const tenant: Tenant = {
      id: Date.now().toString(),
      name: newTenant.name || "",
      email: newTenant.email || "",
      phone: newTenant.phone || "",
      property: newTenant.property || "",
      status: newTenant.status as "active" | "inactive" | "pending" || "pending",
      moveInDate: newTenant.moveInDate || new Date().toISOString().split("T")[0],
      leaseEnd: newTenant.leaseEnd || "",
      rentAmount: newTenant.rentAmount || 0,
    };

    setTenants([...tenants, tenant]);
    setNewTenant({
      name: "",
      email: "",
      phone: "",
      property: "",
      status: "pending",
      moveInDate: "",
      leaseEnd: "",
      rentAmount: 0,
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Locataire ajouté",
      description: `${tenant.name} a été ajouté avec succès`,
    });
  };

  // Function to handle editing a tenant
  const handleEditTenant = () => {
    if (!selectedTenant) return;
    
    const updatedTenants = tenants.map((tenant) => 
      tenant.id === selectedTenant.id ? selectedTenant : tenant
    );
    
    setTenants(updatedTenants);
    setSelectedTenant(null);
    
    toast({
      title: "Locataire modifié",
      description: `Les informations de ${selectedTenant.name} ont été mises à jour`,
    });
  };

  // Function to handle deleting a tenant
  const handleDeleteTenant = (id: string) => {
    const tenantToDelete = tenants.find((tenant) => tenant.id === id);
    if (!tenantToDelete) return;
    
    const updatedTenants = tenants.filter((tenant) => tenant.id !== id);
    setTenants(updatedTenants);
    
    toast({
      title: "Locataire supprimé",
      description: `${tenantToDelete.name} a été supprimé avec succès`,
    });
  };

  return {
    tenants,
    filteredTenants,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    isAddDialogOpen,
    setIsAddDialogOpen,
    selectedTenant,
    setSelectedTenant,
    updateSelectedTenant,
    newTenant,
    setNewTenant,
    updateNewTenant,
    handleAddTenant,
    handleEditTenant,
    handleDeleteTenant
  };
};
