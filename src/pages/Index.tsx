
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Building2, Check, ChevronRight, Home, Lock, ShieldCheck, Star, Users2 } from "lucide-react";

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState("proprietaires");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative saas-hero py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm inline-block mb-6">
                  Gestion immobilière simplifiée
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Gérez vos <span className="text-gradient">propriétés</span> en toute simplicité
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-lg">
                Une plateforme complète pour les propriétaires et gestionnaires immobiliers qui simplifie le quotidien.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button className="saas-button rounded-full text-base px-8 py-6" size="lg" asChild>
                  <Link to="/register">
                    Commencer gratuitement <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="saas-button rounded-full text-base px-8 py-6" size="lg" asChild>
                  <Link to="/login">Se connecter</Link>
                </Button>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Pas besoin de carte bancaire • Sécurisé • Conforme RGPD</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl shadow-xl overflow-hidden border border-border/50 animate-scale-in hover-card">
                <img
                  src="/placeholder.svg"
                  alt="Interface dashboard"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
              <div className="absolute -top-5 -right-5 bg-primary/10 w-32 h-32 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 bg-primary/10 w-40 h-40 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="saas-section py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-70"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm inline-block mb-4">
              Solutions adaptées
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Une solution pour chaque besoin</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Que vous soyez propriétaire ou gestionnaire immobilier, notre plateforme répond à tous vos besoins.
            </p>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="proprietaires" className="text-base py-3">Pour propriétaires</TabsTrigger>
              <TabsTrigger value="gestionnaires" className="text-base py-3">Pour gestionnaires</TabsTrigger>
            </TabsList>
            <TabsContent value="proprietaires" className="mt-10">
              <div className="grid md:grid-cols-3 gap-8">
                {proprietaireFeatures.map((feature, index) => (
                  <Card key={index} className="feature-card hover-card border-0 glass">
                    <CardContent className="p-8">
                      <div className="feature-icon w-14 h-14 flex items-center justify-center rounded-xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mt-6 mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="gestionnaires" className="mt-10">
              <div className="grid md:grid-cols-3 gap-8">
                {gestionnaireFeatures.map((feature, index) => (
                  <Card key={index} className="feature-card hover-card border-0 glass">
                    <CardContent className="p-8">
                      <div className="feature-icon w-14 h-14 flex items-center justify-center rounded-xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mt-6 mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="saas-section py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm inline-block mb-4">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que nos clients disent</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des milliers de propriétaires et gestionnaires immobiliers nous font confiance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card p-8 shadow-md hover-card border-0">
                <CardContent className="p-0">
                  <div className="flex flex-col h-full">
                    <div className="mb-6 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-lg text-muted-foreground mb-8 flex-grow italic">"{testimonial.content}"</p>
                    <div className="flex items-center mt-auto">
                      <div className="rounded-full bg-primary/20 w-12 h-12 flex items-center justify-center mr-4">
                        <span className="font-medium text-primary">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="saas-section py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <Card className="p-10 md:p-16 bg-gradient-to-r from-primary/10 to-primary/5 border-0 shadow-xl rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à simplifier votre gestion immobilière ?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Rejoignez des milliers de propriétaires et gestionnaires qui utilisent notre plateforme.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button size="lg" className="saas-button rounded-full text-base px-8 py-6" asChild>
                <Link to="/register">
                  Commencer gratuitement <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="saas-button rounded-full text-base px-8 py-6" asChild>
                <Link to="/login">Se connecter</Link>
              </Button>
            </div>
            <div className="mt-10">
              <p className="text-muted-foreground mb-6">Aucune carte de crédit requise</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-16 px-4 sm:px-6 lg:px-8 mt-12 border-t border-border/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold text-lg mb-5">Produit</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Fonctionnalités</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Tarifs</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Témoignages</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Guide d'utilisation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-5">Entreprise</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">À propos</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Carrières</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-5">Légal</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Confidentialité</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Conditions</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">RGPD</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-5">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Centre d'aide</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Communauté</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Statut</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">API</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/placeholder.svg" alt="Logo" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Property Manager. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature data
const proprietaireFeatures = [
  {
    icon: <Home className="h-7 w-7" />,
    title: "Gestion de propriétés",
    description: "Gérez facilement tous vos biens immobiliers depuis une interface unique."
  },
  {
    icon: <Users2 className="h-7 w-7" />,
    title: "Gestion des locataires",
    description: "Suivez les informations de vos locataires et facilitez la communication."
  },
  {
    icon: <Building2 className="h-7 w-7" />,
    title: "Maintenance simplifiée",
    description: "Gérez facilement les demandes de maintenance et suivez leur progression."
  }
];

const gestionnaireFeatures = [
  {
    icon: <Building2 className="h-7 w-7" />,
    title: "Gestion multi-propriétés",
    description: "Gérez un portefeuille complet de propriétés pour différents propriétaires."
  },
  {
    icon: <Users2 className="h-7 w-7" />,
    title: "Gestion des équipes",
    description: "Assignez des tâches et gérez facilement votre équipe de maintenance."
  },
  {
    icon: <Lock className="h-7 w-7" />,
    title: "Contrôle d'accès",
    description: "Définissez différents niveaux d'accès pour votre équipe."
  }
];

// Données de démonstration
const testimonials = [
  {
    content: "Cette plateforme a révolutionné ma façon de gérer mes propriétés. Tout est centralisé et facile d'accès.",
    name: "Marie Dupont",
    role: "Propriétaire"
  },
  {
    content: "L'outil de maintenance a réduit drastiquement le temps que je passais à coordonner les réparations.",
    name: "Jean Martin",
    role: "Gestionnaire immobilier"
  },
  {
    content: "La gestion des paiements est d'une simplicité impressionnante. Mes locataires apprécient également.",
    name: "Sophie Berger",
    role: "Propriétaire"
  }
];

const features = [
  "14 jours d'essai gratuit",
  "Accès à toutes les fonctionnalités",
  "Support client prioritaire",
  "Mises à jour régulières",
  "Sécurité renforcée",
  "Données exportables"
];

export default IndexPage;
