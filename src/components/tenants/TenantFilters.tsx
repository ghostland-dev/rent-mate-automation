
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TenantFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TenantFilters = ({ searchQuery, setSearchQuery, activeTab, setActiveTab }: TenantFiltersProps) => {
  return (
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
        value={activeTab}
      >
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="active">Actifs</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="inactive">Inactifs</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
