
import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/types/payment";
import { cn } from "@/lib/utils";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const PaymentStatusBadge = ({ status, className }: PaymentStatusBadgeProps) => {
  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return { label: "Payé", variant: "success" };
      case "pending":
        return { label: "En attente", variant: "warning" };
      case "late":
        return { label: "En retard", variant: "destructive" };
      case "cancelled":
        return { label: "Annulé", variant: "outline" };
      case "refunded":
        return { label: "Remboursé", variant: "secondary" };
      default:
        return { label: status, variant: "outline" };
    }
  };

  const { label, variant } = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      className={cn(
        {
          "bg-green-100 text-green-700 hover:bg-green-100 border-green-200": variant === "success",
          "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200": variant === "warning",
          "bg-red-100 text-red-700 hover:bg-red-100 border-red-200": variant === "destructive",
          "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200": variant === "secondary",
        },
        className
      )}
    >
      {label}
    </Badge>
  );
};

export default PaymentStatusBadge;
