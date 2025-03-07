
import { useState } from "react";
import { Plus, Search, Edit, Trash2, User, Phone, Mail, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// Types for tenant data
type Tenant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  status: "active" | "inactive" | "pending";
  moveInDate: string;
  leaseEnd: string;
  rentAmount: number;
};

// Mock data for tenants
const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "06 12 34 56 78",
    property: "Appartement Paris 11ème",
    status: "active",
    moveInDate: "2023-01-15",
    leaseEnd: "2024-01-14",
    rentAmount: 1200,
  },
  {
    id: "2",
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    phone: "07 23 45 67 89",
    property: "Maison Lyon Centre",
    status: "active",
    moveInDate: "2022-09-01",
    leaseEnd: "2025-08-31",
    rentAmount: 1500,
  },
  {
    id: "3",
    name: "Emma Petit",
    email: "emma.petit@example.com",
    phone: "06 34 56 78 90",
    property: "Studio Marseille",
    status: "pending",
    moveInDate: "2023-06-01",
    leaseEnd: "2024-05-31",
    rentAmount: 750,
  },
  {
    id: "4",
    name: "Lucas Moreau",
    email: "lucas.moreau@example.com",
    phone: "07 45 67 89 01",
    property: "Appartement Bordeaux",
    status: "inactive",
    moveInDate: "2021-03-15",
    leaseEnd: "2023-03-14",
    rentAmount: 950,
  },
  {
    id: "5",
    name: "Chloé Bernard",
    email: "chloe.bernard@example.com",
    phone: "06 56 78 90 12",
    property: "Loft Toulouse",
    status: "active",
    moveInDate: "2022-11-01",
    leaseEnd: "2024-10-31",
    rentAmount: 1100,
  },
];

const Tenants = () => {
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
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Locataires</h1>
          <p className="text-muted-foreground">
            Gérez vos locataires et leurs informations
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un locataire
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un locataire..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs 
          defaultValue="all" 
          className="w-full sm:w-auto"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="inactive">Inactifs</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4">
        {filteredTenants.length > 0 ? (
          filteredTenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onEdit={(tenant) => setSelectedTenant(tenant)}
              onDelete={(id) => handleDeleteTenant(id)}
              isMobile={isMobile}
            />
          ))
        ) : (
          <Card>
            <CardContent className="py-12 flex flex-col items-center justify-center text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Aucun locataire trouvé</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery 
                  ? "Aucun résultat ne correspond à votre recherche" 
                  : "Ajoutez votre premier locataire pour commencer"}
              </p>
              {!searchQuery && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un locataire
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Tenant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau locataire</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={newTenant.name}
                  onChange={(e) => setNewTenant({...newTenant, name: e.target.value})}
                  placeholder="Nom et prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property">Propriété *</Label>
                <Input
                  id="property"
                  value={newTenant.property}
                  onChange={(e) => setNewTenant({...newTenant, property: e.target.value})}
                  placeholder="Adresse du logement"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newTenant.email}
                  onChange={(e) => setNewTenant({...newTenant, email: e.target.value})}
                  placeholder="email@exemple.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={newTenant.phone}
                  onChange={(e) => setNewTenant({...newTenant, phone: e.target.value})}
                  placeholder="06 xx xx xx xx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="moveInDate">Date d'entrée</Label>
                <Input
                  id="moveInDate"
                  type="date"
                  value={newTenant.moveInDate}
                  onChange={(e) => setNewTenant({...newTenant, moveInDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaseEnd">Fin du bail</Label>
                <Input
                  id="leaseEnd"
                  type="date"
                  value={newTenant.leaseEnd}
                  onChange={(e) => setNewTenant({...newTenant, leaseEnd: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rentAmount">Loyer mensuel (€)</Label>
                <Input
                  id="rentAmount"
                  type="number"
                  value={newTenant.rentAmount?.toString() || ""}
                  onChange={(e) => setNewTenant({...newTenant, rentAmount: parseFloat(e.target.value) || 0})}
                  min="0"
                  step="50"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleAddTenant}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={!!selectedTenant} onOpenChange={(open) => !open && setSelectedTenant(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier les informations du locataire</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom complet</Label>
                  <Input
                    id="edit-name"
                    value={selectedTenant.name}
                    onChange={(e) => setSelectedTenant({...selectedTenant, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-property">Propriété</Label>
                  <Input
                    id="edit-property"
                    value={selectedTenant.property}
                    onChange={(e) => setSelectedTenant({...selectedTenant, property: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedTenant.email}
                    onChange={(e) => setSelectedTenant({...selectedTenant, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Téléphone</Label>
                  <Input
                    id="edit-phone"
                    value={selectedTenant.phone}
                    onChange={(e) => setSelectedTenant({...selectedTenant, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-moveInDate">Date d'entrée</Label>
                  <Input
                    id="edit-moveInDate"
                    type="date"
                    value={selectedTenant.moveInDate}
                    onChange={(e) => setSelectedTenant({...selectedTenant, moveInDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-leaseEnd">Fin du bail</Label>
                  <Input
                    id="edit-leaseEnd"
                    type="date"
                    value={selectedTenant.leaseEnd}
                    onChange={(e) => setSelectedTenant({...selectedTenant, leaseEnd: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-rentAmount">Loyer mensuel (€)</Label>
                  <Input
                    id="edit-rentAmount"
                    type="number"
                    value={selectedTenant.rentAmount.toString()}
                    onChange={(e) => setSelectedTenant({...selectedTenant, rentAmount: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <select
                    id="edit-status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedTenant.status}
                    onChange={(e) => setSelectedTenant({...selectedTenant, status: e.target.value as "active" | "inactive" | "pending"})}
                  >
                    <option value="active">Actif</option>
                    <option value="pending">En attente</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleEditTenant}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// TenantCard component
interface TenantCardProps {
  tenant: Tenant;
  onEdit: (tenant: Tenant) => void;
  onDelete: (id: string) => void;
  isMobile: boolean;
}

const TenantCard = ({ tenant, onEdit, onDelete, isMobile }: TenantCardProps) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

  const statusText = {
    active: "Actif",
    pending: "En attente",
    inactive: "Inactif",
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{tenant.name}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  <span>{tenant.property}</span>
                </div>
                {!isMobile && (
                  <>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{tenant.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{tenant.phone || "Non renseigné"}</span>
                    </div>
                  </>
                )}
              </div>
              {isMobile && (
                <div className="flex flex-col mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{tenant.phone || "Non renseigné"}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <div className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", statusStyles[tenant.status])}>
              {statusText[tenant.status]}
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Bail: {tenant.moveInDate ? new Date(tenant.moveInDate).toLocaleDateString('fr-FR') : 'N/A'}</span>
                </div>
                <div>
                  <span>{tenant.rentAmount}€/mois</span>
                </div>
              </div>
            )}

            {isMobile && (
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Bail: {tenant.moveInDate ? new Date(tenant.moveInDate).toLocaleDateString('fr-FR') : 'N/A'}</span>
                </div>
                <div>
                  <span>{tenant.rentAmount}€/mois</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 ml-auto">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(tenant)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>
                      Êtes-vous sûr de vouloir supprimer le locataire <strong>{tenant.name}</strong> ?
                      Cette action est irréversible.
                    </p>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Annuler</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        variant="destructive"
                        onClick={() => onDelete(tenant.id)}
                      >
                        Supprimer
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Tenants;
