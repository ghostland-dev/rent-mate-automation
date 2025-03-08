
import { useState } from "react";
import { usePayments } from "@/hooks/use-payments";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import PaymentFilters from "@/components/payments/PaymentFilters";
import PaymentStats from "@/components/payments/PaymentStats";
import PaymentTable from "@/components/payments/PaymentTable";

const Payments = () => {
  const {
    payments,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    updatePaymentStatus,
    stats
  } = usePayments();

  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Paiements</h1>
          <p className="text-muted-foreground">
            Gérez les paiements de vos propriétés et locataires
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nouveau paiement
        </Button>
      </div>

      <PaymentStats stats={stats} />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="past">Passés</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <PaymentFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
          <PaymentTable
            payments={payments}
            updatePaymentStatus={updatePaymentStatus}
          />
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <PaymentFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter="upcoming"
            setDateFilter={setDateFilter}
          />
          <PaymentTable
            payments={payments.filter(p => new Date(p.dueDate) >= new Date())}
            updatePaymentStatus={updatePaymentStatus}
          />
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <PaymentFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter="past"
            setDateFilter={setDateFilter}
          />
          <PaymentTable
            payments={payments.filter(p => new Date(p.dueDate) < new Date())}
            updatePaymentStatus={updatePaymentStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
