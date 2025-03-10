
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Euro, 
  Home, 
  Users, 
  Clock, 
  TrendingUp, 
  ArrowUp, 
  ArrowDown,
  MessageSquare,
  Wrench,
  FileText,
  Check,
  BarChart3,
  LineChart as LineChartIcon,
  PlusCircle,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
import PropertyCard from "@/components/dashboard/PropertyCard";
import RecentActivityItem from "@/components/dashboard/RecentActivityItem";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const cashflowData = [
  { month: "Jan", revenus: 6000, dépenses: 4000 },
  { month: "Fév", revenus: 5500, dépenses: 3800 },
  { month: "Mar", revenus: 6800, dépenses: 4200 },
  { month: "Avr", revenus: 7200, dépenses: 4100 },
  { month: "Mai", revenus: 6900, dépenses: 4300 },
  { month: "Jun", revenus: 7400, dépenses: 4500 },
];

const occupancyData = [
  { month: "Jan", taux: 88 },
  { month: "Fév", taux: 92 },
  { month: "Mar", taux: 95 },
  { month: "Avr", taux: 94 },
  { month: "Mai", taux: 97 },
  { month: "Jun", taux: 98 },
];

const properties = [
  {
    id: "prop1",
    name: "Résidence Les Oliviers",
    address: "15 rue des Lilas, 75001 Paris",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop",
    type: "Appartement",
    status: "occupied" as const,
    units: 12,
    occupancyRate: 92,
    nextPaymentDate: "15 Juil 2023",
  },
  {
    id: "prop2",
    name: "Villa Méditerranée",
    address: "8 avenue du Soleil, 06000 Nice",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    type: "Maison",
    status: "vacant" as const,
    units: 1,
    occupancyRate: 0,
  },
  {
    id: "prop3",
    name: "Résidence Étoile",
    address: "24 Boulevard Haussmann, 75009 Paris",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop",
    type: "Appartement",
    status: "maintenance" as const,
    units: 8,
    occupancyRate: 75,
    nextPaymentDate: "20 Juil 2023",
  },
  {
    id: "prop4",
    name: "Les Jardins de Bordeaux",
    address: "5 rue Fondaudège, 33000 Bordeaux",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    type: "Maison",
    status: "occupied" as const,
    units: 3,
    occupancyRate: 100,
    nextPaymentDate: "10 Juil 2023",
  },
];

const recentActivities = [
  {
    icon: <Euro className="h-5 w-5" />,
    title: "Paiement reçu",
    description: "Laurent Dubois a payé son loyer de 950€",
    time: "Il y a 2h",
    user: {
      name: "Laurent Dubois",
      initials: "LD",
    },
    status: "success" as const,
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Demande de maintenance",
    description: "Nouvelle demande pour la Villa Méditerranée",
    time: "Il y a 5h",
    user: {
      name: "Sophie Martin",
      initials: "SM",
    },
    status: "warning" as const,
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Nouveau locataire",
    description: "Contrat signé pour l'appartement 3B",
    time: "Hier",
    user: {
      name: "Pierre Leroy",
      initials: "PL",
    },
    status: "info" as const,
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Document partagé",
    description: "Réglement intérieur mis à jour",
    time: "Il y a 2j",
    status: "info" as const,
  },
  {
    icon: <Check className="h-5 w-5" />,
    title: "Maintenance terminée",
    description: "Réparation plomberie Résidence Étoile",
    time: "Il y a 3j",
    status: "success" as const,
  },
];

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="space-y-8">
      {/* Header Section with Improved Design */}
      <div className="rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 mb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Tableau de bord</h1>
            <p className="text-muted-foreground max-w-xl mt-2">
              Bienvenue sur votre tableau de bord de gestion immobilière. Retrouvez ici toutes les informations importantes sur vos propriétés.
            </p>
          </div>
          <Link to="/properties/add">
            <Button className="animate-fade-in shadow-md group transition-all duration-300 hover:translate-y-[-2px]">
              <PlusCircle className="mr-1 h-4 w-4 transition-transform group-hover:scale-110" />
              Ajouter une propriété
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards with Enhanced Animation and Visual Effect */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total des revenus"
          value="7 245 €"
          icon={<Euro className="h-5 w-5" />}
          description="Revenus du mois en cours"
          trend={{ value: 12, isPositive: true }}
          className="animate-fade-in shadow-sm hover:shadow-md transition-all duration-300"
        />
        <StatCard
          title="Propriétés"
          value="8"
          icon={<Home className="h-5 w-5" />}
          description="Dont 2 en maintenance"
          className="animate-fade-in [animation-delay:100ms] shadow-sm hover:shadow-md transition-all duration-300"
        />
        <StatCard
          title="Locataires"
          value="42"
          icon={<Users className="h-5 w-5" />}
          description="3 nouveaux ce mois-ci"
          trend={{ value: 8, isPositive: true }}
          className="animate-fade-in [animation-delay:200ms] shadow-sm hover:shadow-md transition-all duration-300"
        />
        <StatCard
          title="Taux d'occupation"
          value="94%"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Augmentation de 6%"
          trend={{ value: 6, isPositive: true }}
          className="animate-fade-in [animation-delay:300ms] shadow-sm hover:shadow-md transition-all duration-300"
        />
      </div>

      {/* Charts Section with Improved Visual Design */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-5 animate-fade-in [animation-delay:200ms] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-background/50">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance financière
              </CardTitle>
              <CardDescription>
                Suivi des revenus et dépenses de vos propriétés
              </CardDescription>
            </div>
            <Tabs defaultValue="month" onValueChange={setSelectedPeriod} className="h-9">
              <TabsList className="bg-background/90 backdrop-blur-sm">
                <TabsTrigger value="week" className="text-xs sm:text-sm">Semaine</TabsTrigger>
                <TabsTrigger value="month" className="text-xs sm:text-sm">Mois</TabsTrigger>
                <TabsTrigger value="year" className="text-xs sm:text-sm">Année</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={cashflowData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="depensesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--muted))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--muted))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `${value}€`}
                  orientation={isDesktop ? "left" : "right"} 
                />
                <Tooltip 
                  formatter={(value) => [`${value} €`, undefined]} 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)' 
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(value) => <span className="capitalize font-medium">{value}</span>}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenus" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#revenusGradient)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="dépenses" 
                  stroke="hsl(var(--muted-foreground))" 
                  fillOpacity={1} 
                  fill="url(#depensesGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 animate-fade-in [animation-delay:300ms] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <CardHeader className="bg-background/50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <LineChartIcon className="h-5 w-5 text-primary" />
              Taux d'occupation
            </CardTitle>
            <CardDescription>
              Évolution sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={occupancyData}>
                <defs>
                  <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[80, 100]} 
                  tickFormatter={(value) => `${value}%`} 
                  orientation={isDesktop ? "right" : "left"}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, "Taux d'occupation"]} 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)' 
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="taux"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="taux" 
                  fill="url(#occupancyGradient)" 
                  strokeWidth={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Property and Activity Cards with Enhanced Visual Design */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-fade-in [animation-delay:400ms] shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-background/50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Home className="h-5 w-5 text-primary" /> 
              Propriétés récentes
            </CardTitle>
            <CardDescription>
              Aperçu de vos dernières propriétés ajoutées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {properties.slice(0, 4).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <Link to="/properties">
              <Button variant="outline" className="mt-6 w-full group hover:bg-primary/5">
                Voir toutes les propriétés
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="animate-fade-in [animation-delay:500ms] shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-background/50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-primary" />
              Activité récente
            </CardTitle>
            <CardDescription>
              Dernières activités sur votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <RecentActivityItem
                  key={index}
                  icon={activity.icon}
                  title={activity.title}
                  description={activity.description}
                  time={activity.time}
                  user={activity.user}
                  status={activity.status}
                />
              ))}
            </div>
            <Button variant="outline" className="mt-6 w-full group hover:bg-primary/5">
              Voir toutes les activités
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
