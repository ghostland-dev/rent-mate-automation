
import { Euro, Calendar, AlertTriangle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface PaymentStatsProps {
  stats: {
    totalCollected: number;
    totalPending: number;
    totalLate: number;
    totalByCategory: {
      rent: number;
      deposit: number;
      maintenance: number;
      other: number;
    };
  };
}

const PaymentStats = ({ stats }: PaymentStatsProps) => {
  const { totalCollected, totalPending, totalLate, totalByCategory } = stats;

  const categoryData = [
    { name: "Loyer", value: totalByCategory.rent, color: "#4f46e5" },
    { name: "Dépôt", value: totalByCategory.deposit, color: "#0ea5e9" },
    { name: "Maintenance", value: totalByCategory.maintenance, color: "#10b981" },
    { name: "Autre", value: totalByCategory.other, color: "#f59e0b" }
  ].filter(item => item.value > 0);

  const statusData = [
    { name: "Payé", value: totalCollected, color: "#10b981" },
    { name: "En attente", value: totalPending, color: "#f59e0b" },
    { name: "En retard", value: totalLate, color: "#ef4444" }
  ].filter(item => item.value > 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total collecté
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary">
            <Euro className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{formatCurrency(totalCollected)}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Montant total des paiements reçus
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            En attente
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-yellow-500/10 p-1.5 text-yellow-500">
            <Calendar className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{formatCurrency(totalPending)}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Montant des paiements en attente
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            En retard
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-destructive/10 p-1.5 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{formatCurrency(totalLate)}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Montant des paiements en retard
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Loyers
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-500/10 p-1.5 text-blue-500">
            <CreditCard className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{formatCurrency(totalByCategory.rent)}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Montant total des loyers
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Répartition par catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Répartition par statut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentStats;
