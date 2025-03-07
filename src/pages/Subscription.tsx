
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { subscriptionPlans, SubscriptionPlan } from "@/types/subscription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Loader2 } from "lucide-react";

const Subscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsProcessing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Abonnement mis à jour",
        description: `Vous êtes maintenant abonné au plan ${plan.name}.`,
      });
      
      // In a real application, we would update the user's subscription in the database
      // and then update the user context
    }, 2000);
  };

  const getUserCurrentPlan = () => {
    return subscriptionPlans.find(plan => plan.tier === user?.subscriptionTier) || subscriptionPlans[0];
  };

  const calculateYearlyPrice = (monthlyPrice: number) => {
    return (monthlyPrice * 10).toFixed(2); // 2 months free
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Abonnement</h1>
        <p className="text-muted-foreground">
          Gérez votre abonnement et découvrez nos différentes offres
        </p>
      </div>

      {user && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Votre abonnement actuel</CardTitle>
            <CardDescription>
              Vous êtes actuellement sur le plan {getUserCurrentPlan().name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-medium">
                  Plan {getUserCurrentPlan().name}{" "}
                  <Badge variant={user.subscriptionStatus === "active" ? "default" : "outline"}>
                    {user.subscriptionStatus === "active" ? "Actif" : 
                     user.subscriptionStatus === "trialing" ? "Essai" :
                     user.subscriptionStatus === "canceled" ? "Annulé" : "Expiré"}
                  </Badge>
                </h3>
                <p className="text-muted-foreground mt-1">
                  {user.subscriptionTier === "free" 
                    ? "Plan gratuit"
                    : `${getUserCurrentPlan().price}€/${billingPeriod === "monthly" ? "mois" : "an"}`}
                </p>
              </div>
              {user.subscriptionStatus === "active" && user.subscriptionTier !== "free" && (
                <Button variant="outline">Gérer le paiement</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col items-center justify-center mb-8">
        <Tabs defaultValue="monthly" className="w-full" onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")}>
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
              <TabsTrigger value="yearly">Annuel <Badge variant="outline" className="ml-2">-20%</Badge></TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="monthly" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan) => (
                <PlanCard 
                  key={plan.id}
                  plan={plan}
                  isCurrentPlan={user?.subscriptionTier === plan.tier}
                  isProcessing={isProcessing && selectedPlan?.id === plan.id}
                  billingPeriod="monthly"
                  onSubscribe={handleSubscribe}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan) => (
                <PlanCard 
                  key={plan.id}
                  plan={{
                    ...plan,
                    price: parseFloat(calculateYearlyPrice(plan.price)),
                    billingPeriod: "yearly",
                  }}
                  isCurrentPlan={user?.subscriptionTier === plan.tier}
                  isProcessing={isProcessing && selectedPlan?.id === plan.id}
                  billingPeriod="yearly"
                  onSubscribe={handleSubscribe}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  isProcessing: boolean;
  billingPeriod: "monthly" | "yearly";
  onSubscribe: (plan: SubscriptionPlan) => void;
}

const PlanCard = ({ plan, isCurrentPlan, isProcessing, billingPeriod, onSubscribe }: PlanCardProps) => {
  return (
    <Card className={`flex flex-col h-full ${plan.isPopular ? 'border-primary shadow-md' : ''}`}>
      {plan.isPopular && (
        <div className="absolute top-0 right-0">
          <Badge className="m-2">Populaire</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <span className="text-3xl font-bold">{plan.price}€</span>
          <span className="text-muted-foreground">/{billingPeriod === "monthly" ? "mois" : "an"}</span>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-1 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={plan.isPopular ? "default" : "outline"} 
          disabled={isCurrentPlan || isProcessing}
          onClick={() => onSubscribe(plan)}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement...
            </>
          ) : isCurrentPlan ? (
            "Plan actuel"
          ) : (
            `Choisir ${plan.name}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Subscription;
