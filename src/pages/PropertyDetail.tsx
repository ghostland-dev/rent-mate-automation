
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, MapPin, Users, Calendar, BarChart3, ImageIcon, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// Données fictives pour la propriété (à remplacer par des données réelles)
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
    description: "Résidence moderne située dans un quartier prisé de Paris. Offre un excellent retour sur investissement avec un taux d'occupation élevé.",
    yearBuilt: 2015,
    totalArea: 850,
    rentPerMonth: 1800,
    expenses: 500,
    roi: 7.2,
    tenants: [
      { id: "t1", name: "Sophie Martin", unit: "Apt 101", rentStatus: "paid" },
      { id: "t2", name: "Jean Dupont", unit: "Apt 102", rentStatus: "overdue" },
      { id: "t3", name: "Marie Lambert", unit: "Apt 103", rentStatus: "paid" },
      { id: "t4", name: "Pierre Durand", unit: "Apt 201", rentStatus: "paid" },
    ],
    maintenanceIssues: [
      { id: "m1", title: "Plomberie salle de bain", status: "completed", date: "10 Juin 2023", unit: "Apt 102" },
      { id: "m2", title: "Chauffage défectueux", status: "pending", date: "5 Juil 2023", unit: "Apt 201" },
    ],
    documents: [
      { id: "d1", name: "Contrat de bail.pdf", type: "pdf", date: "10 Jan 2023" },
      { id: "d2", name: "Règlement intérieur.docx", type: "docx", date: "15 Jan 2023" },
      { id: "d3", name: "Assurance immeuble.pdf", type: "pdf", date: "20 Jan 2023" },
    ],
    financialHistory: [
      { month: "Jan", income: 20000, expenses: 5000 },
      { month: "Fév", income: 20000, expenses: 6000 },
      { month: "Mar", income: 21000, expenses: 4500 },
      { month: "Avr", income: 21000, expenses: 5200 },
      { month: "Mai", income: 21000, expenses: 4800 },
      { month: "Juin", income: 21000, expenses: 5100 },
    ]
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
    yearBuilt: 2010,
    totalArea: 220,
    rentPerMonth: 3500,
    expenses: 900,
    roi: 6.5,
    description: "Magnifique villa avec vue sur la mer, actuellement à la recherche de nouveaux locataires. Idéal pour une famille ou une colocation haut de gamme.",
    tenants: [],
    maintenanceIssues: [
      { id: "m1", title: "Nettoyage de la piscine", status: "completed", date: "20 Juin 2023", unit: "Villa" },
      { id: "m2", title: "Entretien jardin", status: "scheduled", date: "15 Juil 2023", unit: "Villa" },
    ],
    documents: [
      { id: "d1", name: "Photos propriété.zip", type: "zip", date: "5 Fév 2023" },
      { id: "d2", name: "Diagnostics.pdf", type: "pdf", date: "10 Fév 2023" },
    ],
    financialHistory: [
      { month: "Jan", income: 3500, expenses: 900 },
      { month: "Fév", income: 3500, expenses: 850 },
      { month: "Mar", income: 3500, expenses: 950 },
      { month: "Avr", income: 3500, expenses: 800 },
      { month: "Mai", income: 0, expenses: 600 },
      { month: "Juin", income: 0, expenses: 600 },
    ]
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
    yearBuilt: 2008,
    totalArea: 620,
    rentPerMonth: 1500,
    expenses: 450,
    roi: 6.8,
    description: "Ensemble d'appartements dans un immeuble haussmannien rénové. Actuellement en rénovation partielle pour améliorer les espaces communs.",
    tenants: [
      { id: "t1", name: "Laurent Dubois", unit: "Apt A1", rentStatus: "paid" },
      { id: "t2", name: "Camille Petit", unit: "Apt A2", rentStatus: "paid" },
      { id: "t3", name: "Thomas Legrand", unit: "Apt B1", rentStatus: "pending" },
    ],
    maintenanceIssues: [
      { id: "m1", title: "Rénovation hall d'entrée", status: "in_progress", date: "1 Juil 2023", unit: "Commun" },
      { id: "m2", title: "Remplacement ascenseur", status: "scheduled", date: "15 Août 2023", unit: "Commun" },
      { id: "m3", title: "Peinture cage d'escalier", status: "in_progress", date: "5 Juil 2023", unit: "Commun" },
    ],
    documents: [
      { id: "d1", name: "Devis travaux.pdf", type: "pdf", date: "15 Juin 2023" },
      { id: "d2", name: "Plan rénovation.dwg", type: "dwg", date: "20 Juin 2023" },
      { id: "d3", name: "Contrats locataires.zip", type: "zip", date: "1 Juil 2023" },
    ],
    financialHistory: [
      { month: "Jan", income: 12000, expenses: 3600 },
      { month: "Fév", income: 12000, expenses: 3500 },
      { month: "Mar", income: 12000, expenses: 3700 },
      { month: "Avr", income: 12000, expenses: 3600 },
      { month: "Mai", income: 12000, expenses: 8500 },
      { month: "Juin", income: 9000, expenses: 12000 },
    ]
  },
];

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setIsLoading(true);
    setTimeout(() => {
      const foundProperty = properties.find(p => p.id === id);
      setProperty(foundProperty);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = () => {
    toast({
      title: "Propriété supprimée",
      description: "La propriété a été supprimée avec succès.",
    });
    navigate("/properties");
  };

  const handleEdit = () => {
    toast({
      description: "Édition de propriété non implémentée"
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Chargement de la propriété...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate("/properties")}>
          <ArrowLeft className="h-4 w-4" /> Retour aux propriétés
        </Button>
        <Alert className="bg-destructive/10 text-center">
          <AlertDescription className="text-lg">
            Propriété non trouvée. Cette propriété n'existe pas ou a été supprimée.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={() => navigate("/properties")}>
            Voir toutes les propriétés
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied": return "bg-green-500 text-green-50";
      case "vacant": return "bg-blue-500 text-blue-50";
      case "maintenance": return "bg-orange-500 text-orange-50";
      default: return "bg-slate-500 text-slate-50";
    }
  };

  const getRentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "scheduled": return "bg-purple-100 text-purple-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return "📄";
      case "docx": return "📝";
      case "zip": return "🗂️";
      case "dwg": return "📐";
      default: return "📄";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button variant="ghost" className="w-fit flex items-center gap-2" onClick={() => navigate("/properties")}>
          <ArrowLeft className="h-4 w-4" /> Retour aux propriétés
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleEdit}>
            <Edit className="h-4 w-4" /> Modifier
          </Button>
          <Button variant="destructive" className="flex items-center gap-2" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" /> Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img 
                src={property.image} 
                alt={property.name}
                className="h-full w-full object-cover"
              />
              <Badge 
                className={`absolute right-3 top-3 ${getStatusColor(property.status)}`}
              >
                {property.status === "occupied" && "Occupé"}
                {property.status === "vacant" && "Vacant"}
                {property.status === "maintenance" && "En maintenance"}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{property.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                {property.address}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations clés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium">{property.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Année de construction</span>
              <span className="font-medium">{property.yearBuilt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Surface totale</span>
              <span className="font-medium">{property.totalArea} m²</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nombre d'unités</span>
              <span className="font-medium">{property.units}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Loyer mensuel</span>
              <span className="font-medium">{property.rentPerMonth} €</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Charges mensuelles</span>
              <span className="font-medium">{property.expenses} €</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Retour sur investissement</span>
              <span className="font-medium">{property.roi}%</span>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Taux d'occupation</span>
                <span className="font-medium">{property.occupancyRate}%</span>
              </div>
              <Progress value={property.occupancyRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="tenants">Locataires</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{property.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance financière</CardTitle>
              <CardDescription>6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {/* Emplacement pour graphique - serait implémenté avec Recharts */}
              <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/50 p-8">
                <BarChart3 className="h-10 w-10 text-muted-foreground/50" />
                <p className="mt-4 text-center text-muted-foreground">
                  Les graphiques seront bientôt disponibles
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Locataires</CardTitle>
              <CardDescription>
                {property.tenants.length > 0 
                  ? `${property.tenants.length} locataires associés à cette propriété`
                  : "Aucun locataire pour cette propriété"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {property.tenants.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Aucun locataire</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cette propriété n'a pas de locataires actuellement.
                  </p>
                  <Button className="mt-4">
                    Ajouter un locataire
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {property.tenants.map((tenant: any) => (
                    <div key={tenant.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{tenant.name}</p>
                          <p className="text-sm text-muted-foreground">{tenant.unit}</p>
                        </div>
                      </div>
                      <Badge className={getRentStatusColor(tenant.rentStatus)}>
                        {tenant.rentStatus === "paid" && "Payé"}
                        {tenant.rentStatus === "pending" && "En attente"}
                        {tenant.rentStatus === "overdue" && "En retard"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Gérer les locataires
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Problèmes de maintenance</CardTitle>
              <CardDescription>
                {property.maintenanceIssues.length} tickets de maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {property.maintenanceIssues.map((issue: any) => (
                  <div key={issue.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <div className="h-5 w-5 text-primary">🔧</div>
                      </div>
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <div className="flex gap-4">
                          <p className="text-sm text-muted-foreground">{issue.unit}</p>
                          <p className="text-sm text-muted-foreground">{issue.date}</p>
                        </div>
                      </div>
                    </div>
                    <Badge className={getMaintenanceStatusColor(issue.status)}>
                      {issue.status === "completed" && "Terminé"}
                      {issue.status === "in_progress" && "En cours"}
                      {issue.status === "pending" && "En attente"}
                      {issue.status === "scheduled" && "Programmé"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ajouter un ticket
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                {property.documents.length} documents associés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {property.documents.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <div className="text-lg">{getFileIcon(doc.type)}</div>
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">Ajouté le {doc.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Télécharger
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ajouter un document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyDetail;
