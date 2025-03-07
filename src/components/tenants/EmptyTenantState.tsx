
import { User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyTenantStateProps {
  searchQuery: string;
  onAddClick: () => void;
}

export const EmptyTenantState = ({ searchQuery, onAddClick }: EmptyTenantStateProps) => {
  return (
    <Card>
      <CardContent className="py-12 flex flex-col items-center justify-center text-center">
        <User className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Aucun locataire trouvé</h3>
        <p className="text-muted-foreground mt-1">
          {searchQuery 
            ? "Aucun résultat ne correspond à votre recherche" 
            : "Ajoutez votre premier locataire pour commencer"}
        </p>
        {!searchQuery && (
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onAddClick}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un locataire
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
