
import { useState } from "react";
import { Payment, mockPayments, PaymentStatus } from "@/types/payment";
import { useToast } from "@/hooks/use-toast";

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "upcoming" | "past">("all");
  const { toast } = useToast();

  // Fonction pour filtrer les paiements
  const filteredPayments = payments.filter((payment) => {
    // Filtre par recherche (nom du locataire, propriété ou numéro de facture)
    const matchesSearch = 
      payment.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre par statut
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    // Filtre par date
    const today = new Date();
    const dueDate = new Date(payment.dueDate);
    
    const matchesDate = 
      dateFilter === "all" || 
      (dateFilter === "upcoming" && dueDate >= today) ||
      (dateFilter === "past" && dueDate < today);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculer les statistiques des paiements
  const calculatePaymentStats = () => {
    const totalCollected = payments
      .filter(p => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);
    
    const totalPending = payments
      .filter(p => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0);
    
    const totalLate = payments
      .filter(p => p.status === "late")
      .reduce((sum, p) => sum + p.amount, 0);
    
    const totalByCategory = {
      rent: payments
        .filter(p => p.category === "rent")
        .reduce((sum, p) => sum + p.amount, 0),
      deposit: payments
        .filter(p => p.category === "deposit")
        .reduce((sum, p) => sum + p.amount, 0),
      maintenance: payments
        .filter(p => p.category === "maintenance")
        .reduce((sum, p) => sum + p.amount, 0),
      other: payments
        .filter(p => p.category === "other")
        .reduce((sum, p) => sum + p.amount, 0),
    };
    
    return {
      totalCollected,
      totalPending,
      totalLate,
      totalByCategory,
    };
  };

  // Mettre à jour le statut d'un paiement
  const updatePaymentStatus = (paymentId: string, newStatus: PaymentStatus) => {
    const updatedPayments = payments.map(payment => {
      if (payment.id === paymentId) {
        const updatedPayment = { 
          ...payment, 
          status: newStatus,
          paidDate: newStatus === "paid" ? new Date().toISOString().split('T')[0] : payment.paidDate
        };
        return updatedPayment;
      }
      return payment;
    });

    setPayments(updatedPayments);
    
    const payment = payments.find(p => p.id === paymentId);
    
    toast({
      title: "Statut du paiement mis à jour",
      description: `Le paiement ${payment?.invoiceNumber} est maintenant ${newStatus === "paid" ? "payé" : newStatus}`,
    });
  };

  // Ajouter un nouveau paiement
  const addPayment = (newPayment: Omit<Payment, "id" | "createdAt">) => {
    const payment: Payment = {
      ...newPayment,
      id: `pay${payments.length + 1}`,
      createdAt: new Date().toISOString()
    };

    setPayments([...payments, payment]);
    
    toast({
      title: "Paiement ajouté",
      description: `Le paiement ${payment.invoiceNumber} a été ajouté avec succès`,
    });
  };

  return {
    payments: filteredPayments,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    updatePaymentStatus,
    addPayment,
    stats: calculatePaymentStats()
  };
};
