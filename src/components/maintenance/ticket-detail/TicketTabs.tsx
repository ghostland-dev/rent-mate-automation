
import { useState } from "react";
import { MaintenanceTicket } from "@/types/maintenance";

interface TicketTabsProps {
  activeTab: 'details' | 'messages' | 'parameters';
  setActiveTab: (tab: 'details' | 'messages' | 'parameters') => void;
  ticket: MaintenanceTicket;
}

const TicketTabs = ({ activeTab, setActiveTab, ticket }: TicketTabsProps) => {
  return (
    <div className="border-b">
      <div className="flex">
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'details' ? 'border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('details')}
        >
          Détails
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'messages' ? 'border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages {ticket.comments && ticket.comments.length > 0 && `(${ticket.comments.length})`}
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'parameters' ? 'border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('parameters')}
        >
          Paramètres
        </button>
      </div>
    </div>
  );
};

export default TicketTabs;
