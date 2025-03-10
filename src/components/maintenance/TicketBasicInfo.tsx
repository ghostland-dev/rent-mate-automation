
import { Home, MapPin, Tag, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TicketBasicInfoProps {
  propertyName: string;
  unit?: string;
  category: string;
  reportedBy: string;
}

const TicketBasicInfo = ({ propertyName, unit, category, reportedBy }: TicketBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Home className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span>{propertyName}</span>
        {unit && (
          <>
            <Separator orientation="vertical" className="h-4" />
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{unit}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span>{category}</span>
      </div>
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span>Signalé par: {reportedBy}</span>
      </div>
    </div>
  );
};

export default TicketBasicInfo;
