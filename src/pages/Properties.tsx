
import { useState } from "react";
import { Plus, Search, Filter, Home, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/dashboard/PropertyCard";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Données fictives pour la page propriétés
const properties = [
  {
    id: "prop1",
    name: "Résidence Les Oliviers",
    address: "15 rue des Lilas, 75001 Paris",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop",
    type: "Appartement",
    status: "occupied" as const,
    units: 12,
    occupancyRate: 92,
    nextPaymentDate: "15 Juil 2023",
  },
  {
    id: "prop2",
    name: "Villa Méditerranée",
    address: "8 avenue du Soleil, 06000 Nice",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    type: "Maison",
    status: "vacant" as const,
    units: 1,
    occupancyRate: 0,
  },
  {
    id: "prop3",
    name: "Résidence Étoile",
    address: "24 Boulevard Haussmann, 75009 Paris",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop",
    type: "Appartement",
    status: "maintenance" as const,
    units: 8,
    occupancyRate: 75,
    nextPaymentDate: "20 Juil 2023",
  },
  {
    id: "prop4",
    name: "Les Jardins de Bordeaux",
    address: "5 rue Fondaudège, 33000 Bordeaux",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    type: "Maison",
    status: "occupied" as const,
    units: 3,
    occupancyRate: 100,
    nextPaymentDate: "10 Juil 2023",
  },
  {
    id: "prop5",
    name: "Le Pavillon Bleu",
    address: "42 rue de la Plage, 13008 Marseille",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=800&auto=format&fit=crop",
    type: "Maison",
    status: "occupied" as const,
    units: 1,
    occupancyRate: 100,
    nextPaymentDate: "5 Juil 2023",
  },
  {
    id: "prop6",
    name: "Résidence Montparnasse",
    address: "17 avenue du Maine, 75014 Paris",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop",
    type: "Appartement",
    status: "occupied" as const,
    units: 20,
    occupancyRate: 90,
    nextPaymentDate: "12 Juil 2023",
  },
];

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filtrer les propriétés en fonction de la recherche et de l'onglet actif
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         property.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "occupied") return matchesSearch && property.status === "occupied";
    if (activeTab === "vacant") return matchesSearch && property.status === "vacant";
    if (activeTab === "maintenance") return matchesSearch && property.status === "maintenance";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Propriétés</h1>
          <p className="text-muted-foreground">
            Gérez toutes vos propriétés en un seul endroit.
          </p>
        </div>
        <Button className="shadow-sm flex items-center gap-2" asChild>
          <Link to="/properties/add">
            <Plus className="h-4 w-4" />
            Ajouter une propriété
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="border-b border-border p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative md:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une propriété..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="occupied">Occupées</TabsTrigger>
                    <TabsTrigger value="vacant">Vacantes</TabsTrigger>
                    <TabsTrigger value="maintenance">En maintenance</TabsTrigger>
                  </TabsList>
                </Tabs>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Plus récentes</DropdownMenuItem>
                    <DropdownMenuItem>Plus anciennes</DropdownMenuItem>
                    <DropdownMenuItem>Taux d'occupation (croissant)</DropdownMenuItem>
                    <DropdownMenuItem>Taux d'occupation (décroissant)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="p-4">
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Home className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Aucune propriété trouvée</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Essayez de modifier vos critères de recherche ou ajoutez une nouvelle propriété.
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/properties/add">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une propriété
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Properties;
