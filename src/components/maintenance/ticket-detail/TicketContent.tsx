
import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TicketContentProps {
  children: ReactNode;
}

const TicketContent = ({ children }: TicketContentProps) => {
  return (
    <ScrollArea className="h-[450px] w-full pr-2">
      {children}
    </ScrollArea>
  );
};

export default TicketContent;
