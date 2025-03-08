
import { useState } from "react";
import { Payment, PaymentStatus } from "@/types/payment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye } from "lucide-react";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface PaymentTableProps {
  payments: Payment[];
  updatePaymentStatus: (paymentId: string, status: PaymentStatus) => void;
}

const PaymentTable = ({ payments, updatePaymentStatus }: PaymentTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const toggleRowExpansion = (paymentId: string) => {
    setExpandedRow(expandedRow === paymentId ? null : paymentId);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro de facture</TableHead>
            <TableHead>Locataire</TableHead>
            <TableHead>Propriété</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Date d'échéance</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucun paiement trouvé.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <>
                <TableRow key={payment.id} className="group">
                  <TableCell>{payment.invoiceNumber}</TableCell>
                  <TableCell>{payment.tenantName}</TableCell>
                  <TableCell>{payment.propertyName}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRowExpansion(payment.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {payment.status !== "paid" && (
                            <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "paid")}>
                              Marquer comme payé
                            </DropdownMenuItem>
                          )}
                          {payment.status !== "pending" && (
                            <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "pending")}>
                              Marquer comme en attente
                            </DropdownMenuItem>
                          )}
                          {payment.status !== "late" && (
                            <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "late")}>
                              Marquer comme en retard
                            </DropdownMenuItem>
                          )}
                          {payment.status !== "cancelled" && (
                            <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "cancelled")}>
                              Annuler
                            </DropdownMenuItem>
                          )}
                          {payment.status === "paid" && (
                            <DropdownMenuItem onClick={() => updatePaymentStatus(payment.id, "refunded")}>
                              Marquer comme remboursé
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRow === payment.id && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-semibold text-sm">Détails</h4>
                          <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                            <span className="text-muted-foreground">Catégorie:</span>
                            <span className="capitalize">{payment.category}</span>
                            
                            <span className="text-muted-foreground">Date de création:</span>
                            <span>{formatDate(payment.createdAt)}</span>
                            
                            {payment.paidDate && (
                              <>
                                <span className="text-muted-foreground">Date de paiement:</span>
                                <span>{formatDate(payment.paidDate)}</span>
                              </>
                            )}
                            
                            {payment.paymentMethod && (
                              <>
                                <span className="text-muted-foreground">Méthode de paiement:</span>
                                <span className="capitalize">{payment.paymentMethod.replace('_', ' ')}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Description</h4>
                          <p className="text-sm mt-1">{payment.description || "Aucune description"}</p>
                          
                          {payment.notes && (
                            <>
                              <h4 className="font-semibold text-sm mt-2">Notes</h4>
                              <p className="text-sm mt-1">{payment.notes}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
