
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { MessageCircle, Send } from "lucide-react";
import { MaintenanceTicket } from "@/types/maintenance";

interface TicketCommentsProps {
  ticket: MaintenanceTicket;
  onAddComment: (comment: string) => void;
}

const TicketComments = ({ ticket, onAddComment }: TicketCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h4 className="text-sm font-medium">Messages</h4>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {ticket.comments && ticket.comments.length > 0 ? (
          ticket.comments.map((comment, index) => (
            <div key={comment.id || index} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{comment.author}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: fr })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Aucun message pour le moment</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          placeholder="Écrivez votre message..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px] flex-1"
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={!newComment.trim() || isSubmitting}
          className="self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default TicketComments;
