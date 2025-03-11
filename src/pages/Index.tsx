
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
      <section className="relative saas-hero py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/public/placeholder.svg')] opacity-5"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Gérez vos <span className="saas-gradient-text">propriétés</span> en toute simplicité
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Une plateforme complète pour les propriétaires et gestionnaires immobiliers qui simplifie le quotidien.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="saas-button" size="lg" asChild>
                  <Link to="/register">
                    Commencer gratuitement <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="saas-button" size="lg" asChild>
                  <Link to="/login">Se connecter</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Pas besoin de carte bancaire • Sécurisé • Conforme RGPD</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl shadow-xl overflow-hidden border border-border/50 animate-fade-in">
                <img
                  src="/placeholder.svg"
                  alt="Interface dashboard"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-5 -right-5 bg-primary/10 w-32 h-32 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 bg-primary/10 w-40 h-40 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="saas-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Une solution adaptée à chaque besoin</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Que vous soyez propriétaire ou gestionnaire immobilier, notre plateforme répond à tous vos besoins.
            </p>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="proprietaires">Pour propriétaires</TabsTrigger>
              <TabsTrigger value="gestionnaires">Pour gestionnaires</TabsTrigger>
            </TabsList>
            <TabsContent value="proprietaires" className="mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="feature-card hover-scale">
                  <div className="feature-icon w-12 h-12 flex items-center justify-center">
                    <Home className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Gestion de propriétés</h3>
                  <p className="text-muted-foreground">
                    Gérez facilement tous vos biens immobiliers depuis une interface unique.
                  </p>
                </Card>
                <Card className="feature-card hover-scale">
                  <div className="feature-icon w-12 h-12 flex items-center justify-center">
                    <Users2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Gestion des locataires</h3>
                  <p className="text-muted-foreground">
                    Suivez les informations de vos locataires et facilitez la communication.
                  </p>
                </Card>
                <Card className="feature-card hover-scale">
                  <div className="feature-icon w-12 h-12 flex items-center justify-center">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Maintenance simplifiée</h3>
                  <p className="text-muted-foreground">
                    Gérez facilement les demandes de maintenance et suivez leur progression.
                  </p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="gestionnaires" className="mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="feature-card hover-scale">
                  <div className="feature-icon w-12 h-12 flex items-center justify-center">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Gestion multi-propriétés</h3>
                  <p className="text-muted-foreground">
                    Gérez un portefeuille complet de propriétés pour différents propriétaires.
                  </p>
                </Card>
                <Card className="feature-card hover-scale">
                  <div className="feature-icon w-12 h-12 flex items-center justify-center">
                    <Users2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Gestion des équipes</h3>
                  <p className="text-muted-foreground">
                    Assignez des tâches et gérez facilement votre équipe de maintenance.
                  </p>
                </Card>
                <Card className="feature-card hover-scale">
                  <div className="feature-icon w-12 h-12 flex items-center justify-center">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Contrôle d'accès</h3>
                  <p className="text-muted-foreground">
                    Définissez différents niveaux d'accès pour votre équipe.
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="saas-section px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ce que nos clients disent</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des milliers de propriétaires et gestionnaires immobiliers nous font confiance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card p-6 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow">"{testimonial.content}"</p>
                  <div className="flex items-center mt-auto">
                    <div className="rounded-full bg-primary/20 w-10 h-10 flex items-center justify-center mr-3">
                      <span className="font-medium text-primary">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="saas-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/5 to-primary/10 border-0 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à simplifier votre gestion immobilière ?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de propriétaires et gestionnaires qui utilisent notre plateforme.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="saas-button" asChild>
                <Link to="/register">
                  Commencer gratuitement <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="saas-button" asChild>
                <Link to="/login">Se connecter</Link>
              </Button>
            </div>
            <div className="mt-8">
              <p className="text-muted-foreground">Aucune carte de crédit requise</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Produit</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Fonctionnalités</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Tarifs</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Témoignages</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Guide d'utilisation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">À propos</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Carrières</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Confidentialité</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Conditions</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">RGPD</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Centre d'aide</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Communauté</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Statut</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">API</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/placeholder.svg" alt="Logo" className="h-8 w-auto" />
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
