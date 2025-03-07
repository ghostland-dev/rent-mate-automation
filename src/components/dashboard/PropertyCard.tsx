
import { cn } from "@/lib/utils";
import { MapPin, Home, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    image: string;
    type: string;
    status: "occupied" | "vacant" | "maintenance";
    units: number;
    occupancyRate: number;
    nextPaymentDate?: string;
  };
  className?: string;
}

const PropertyCard = ({ property, className }: PropertyCardProps) => {
  const statusColor = {
    occupied: "bg-green-500 text-green-50",
    vacant: "bg-blue-500 text-blue-50",
    maintenance: "bg-orange-500 text-orange-50",
  };

  return (
    <Link to={`/properties/${property.id}`}>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-md group cursor-pointer",
          className
        )}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge 
            className={cn(
              "absolute right-3 top-3",
              statusColor[property.status]
            )}
          >
            {property.status === "occupied" && "Occupé"}
            {property.status === "vacant" && "Vacant"}
            {property.status === "maintenance" && "En maintenance"}
          </Badge>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 text-lg font-semibold">{property.name}</h3>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <Home className="mr-1 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.type}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.units} unités</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Taux d'occupation</span>
              <span className="font-medium">{property.occupancyRate}%</span>
            </div>
            <Progress value={property.occupancyRate} className="h-2" />
          </div>
        </CardContent>
        {property.nextPaymentDate && (
          <CardFooter className="border-t bg-muted/30 px-4 py-3">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Prochain paiement: {property.nextPaymentDate}</span>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

export default PropertyCard;
