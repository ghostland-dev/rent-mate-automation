
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenancePriority, MaintenanceStatus, MAINTENANCE_CATEGORIES } from "@/types/maintenance";
import { X, Filter, Search } from "lucide-react";

interface MaintenanceFiltersProps {
  onFilterChange: (filters: {
    search: string;
    status: MaintenanceStatus | "all";
    priority: MaintenancePriority | "all";
    category: string | "all";
    propertyId: string | "all";
  }) => void;
}

// Données fictives pour les propriétés
const properties = [
  { id: "prop1", name: "Résidence Les Oliviers" },
  { id: "prop2", name: "Villa Méditerranée" },
  { id: "prop3", name: "Résidence Étoile" },
];

export const MaintenanceFilters = ({ onFilterChange }: MaintenanceFiltersProps) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<MaintenanceStatus | "all">("all");
  const [priority, setPriority] = useState<MaintenancePriority | "all">("all");
  const [category, setCategory] = useState<string | "all">("all");
  const [propertyId, setPropertyId] = useState<string | "all">("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    applyFilters(e.target.value, status, priority, category, propertyId);
  };

  const handleStatusChange = (value: MaintenanceStatus | "all") => {
    setStatus(value);
    applyFilters(search, value, priority, category, propertyId);
  };

  const handlePriorityChange = (value: MaintenancePriority | "all") => {
    setPriority(value);
    applyFilters(search, status, value, category, propertyId);
  };

  const handleCategoryChange = (value: string | "all") => {
    setCategory(value);
    applyFilters(search, status, priority, value, propertyId);
  };

  const handlePropertyChange = (value: string | "all") => {
    setPropertyId(value);
    applyFilters(search, status, priority, category, value);
  };

  const applyFilters = (
    search: string,
    status: MaintenanceStatus | "all",
    priority: MaintenancePriority | "all",
    category: string | "all",
    propertyId: string | "all"
  ) => {
    onFilterChange({
      search,
      status,
      priority,
      category,
      propertyId,
    });
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setPriority("all");
    setCategory("all");
    setPropertyId("all");
    applyFilters("", "all", "all", "all", "all");
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un ticket..."
            value={search}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        <Button
          variant={isFilterOpen ? "default" : "outline"}
          className="sm:w-auto flex items-center gap-2"
          onClick={toggleFilters}
        >
          <Filter className="h-4 w-4" />
          Filtres
        </Button>
        {(status !== "all" || priority !== "all" || category !== "all" || propertyId !== "all") && (
          <Button
            variant="ghost"
            className="sm:w-auto flex items-center gap-2"
            onClick={resetFilters}
          >
            <X className="h-4 w-4" />
            Réinitialiser
          </Button>
        )}
      </div>

      {isFilterOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-md">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Statut</label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="scheduled">Programmé</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Priorité</label>
            <Select value={priority} onValueChange={handlePriorityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les priorités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Catégorie</label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {MAINTENANCE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Propriété</label>
            <Select value={propertyId} onValueChange={handlePropertyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les propriétés" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les propriétés</SelectItem>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceFilters;
