
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MaintenanceTicketForm from "@/components/maintenance/MaintenanceTicketForm";
import MaintenanceTicketDetail from "@/components/maintenance/MaintenanceTicketDetail";
import MaintenanceFilters from "@/components/maintenance/MaintenanceFilters";
import MaintenanceHeader from "@/components/maintenance/MaintenanceHeader";
import MaintenanceTabs from "@/components/maintenance/MaintenanceTabs";
import LoadingState from "@/components/maintenance/LoadingState";
import { useMaintenance } from "@/hooks/use-maintenance";

const Maintenance = () => {
  const {
    filteredTickets,
    selectedTicket,
    isCreating,
    isEditing,
    currentTab,
    isLoading,
    setSelectedTicket,
    setIsCreating,
    setIsEditing,
    handleFilterChange,
    handleTabChange,
    handleCreateTicket,
    handleUpdateTicket,
    handleDeleteTicket,
    handleTogglePin,
  } = useMaintenance();

  // Count pinned tickets
  const pinnedCount = filteredTickets.filter(ticket => ticket.pinned).length;

  if (isLoading) {
    return <LoadingState />;
  }

  if (selectedTicket && !isEditing) {
    return (
      <MaintenanceTicketDetail
        ticket={selectedTicket}
        onUpdate={handleUpdateTicket}
        onDelete={handleDeleteTicket}
        onClose={() => setSelectedTicket(null)}
        onTogglePin={() => handleTogglePin(selectedTicket.id)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <MaintenanceHeader 
        onCreateClick={() => setIsCreating(true)} 
        pinnedCount={pinnedCount}
      />
      
      <MaintenanceFilters onFilterChange={handleFilterChange} />
      
      <MaintenanceTabs
        currentTab={currentTab}
        filteredTickets={filteredTickets}
        onTabChange={handleTabChange}
        onTicketClick={setSelectedTicket}
        onCreateClick={() => setIsCreating(true)}
      />

      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un nouveau ticket de maintenance</DialogTitle>
          </DialogHeader>
          <MaintenanceTicketForm
            onSubmit={handleCreateTicket}
            onCancel={() => setIsCreating(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le ticket de maintenance</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <MaintenanceTicketForm
              ticket={selectedTicket}
              onSubmit={handleUpdateTicket}
              onCancel={() => setIsEditing(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Maintenance;
