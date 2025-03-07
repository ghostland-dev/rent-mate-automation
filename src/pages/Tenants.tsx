
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TenantCard } from "@/components/tenants/TenantCard";
import { TenantForm } from "@/components/tenants/TenantForm";
import { TenantFilters } from "@/components/tenants/TenantFilters";
import { EmptyTenantState } from "@/components/tenants/EmptyTenantState";
import { useTenants } from "@/hooks/use-tenants";

const Tenants = () => {
  const {
    filteredTenants,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    isAddDialogOpen,
    setIsAddDialogOpen,
    selectedTenant,
    setSelectedTenant,
    newTenant,
    setNewTenant,
    handleAddTenant,
    handleEditTenant,
    handleDeleteTenant
  } = useTenants();
  
  const isMobile = useMediaQuery("(max-width: 768px)");

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

      <TenantFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

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
          <EmptyTenantState 
            searchQuery={searchQuery} 
            onAddClick={() => setIsAddDialogOpen(true)} 
          />
        )}
      </div>

      {/* Add Tenant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau locataire</DialogTitle>
          </DialogHeader>
          <TenantForm 
            tenant={newTenant}
            setTenant={setNewTenant}
            onSubmit={handleAddTenant}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={!!selectedTenant} onOpenChange={(open) => !open && setSelectedTenant(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier les informations du locataire</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <TenantForm 
              tenant={selectedTenant}
              setTenant={setSelectedTenant}
              onSubmit={handleEditTenant}
              isEditing
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tenants;
