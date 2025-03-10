
import { Paperclip } from "lucide-react";
import { Attachment } from "@/types/maintenance";

interface TicketAttachmentsProps {
  attachments?: Attachment[];
}

const TicketAttachments = ({ attachments }: TicketAttachmentsProps) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Pièces jointes</h4>
      <div className="flex flex-col space-y-2">
        {attachments.map((attachment, index) => (
          <a 
            key={index} 
            href={attachment.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-sm hover:underline"
          >
            <Paperclip className="h-4 w-4 text-muted-foreground" />
            <span>{attachment.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TicketAttachments;
