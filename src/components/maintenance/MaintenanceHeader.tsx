
import { Button } from "@/components/ui/button";
import { PlusCircle, Pin } from "lucide-react";

interface MaintenanceHeaderProps {
  onCreateClick: () => void;
  pinnedCount?: number;
}

const MaintenanceHeader = ({ onCreateClick, pinnedCount = 0 }: MaintenanceHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Maintenance</h1>
        <p className="text-muted-foreground">
          Gérez les tickets de maintenance et de réparation pour vos propriétés.
          {pinnedCount > 0 && (
            <span className="inline-flex items-center ml-2 text-primary">
              <Pin className="h-4 w-4 mr-1" /> {pinnedCount} ticket{pinnedCount > 1 ? 's' : ''} épinglé{pinnedCount > 1 ? 's' : ''}
            </span>
          )}
        </p>
      </div>
      <Button onClick={onCreateClick} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Nouveau ticket
      </Button>
    </div>
  );
};

export default MaintenanceHeader;
