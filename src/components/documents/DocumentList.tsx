import { useState } from "react";
import { 
  FileIcon, 
  Grid, 
  List, 
  Search, 
  Download, 
  MoreHorizontal, 
  Trash2, 
  Eye 
} from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: "active" | "inactive";
}

const documentsData: Document[] = [
  {
    id: "1",
    name: "Bail de location - Appartement 1",
    type: "PDF",
    size: "2.5 MB",
    date: "2023-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "État des lieux - Appartement 1",
    type: "PDF",
    size: "1.8 MB",
    date: "2023-01-15",
    status: "active",
  },
  {
    id: "3",
    name: "Facture d'électricité - Janvier 2023",
    type: "PDF",
    size: "900 KB",
    date: "2023-02-01",
    status: "inactive",
  },
  {
    id: "4",
    name: "Assurance habitation - Appartement 1",
    type: "PDF",
    size: "1.2 MB",
    date: "2023-03-01",
    status: "active",
  },
  {
    id: "5",
    name: "Quittance de loyer - Février 2023",
    type: "PDF",
    size: "750 KB",
    date: "2023-03-05",
    status: "inactive",
  },
  {
    id: "6",
    name: "Bail de location - Appartement 2",
    type: "PDF",
    size: "2.7 MB",
    date: "2023-01-20",
    status: "active",
  },
  {
    id: "7",
    name: "État des lieux - Appartement 2",
    type: "PDF",
    size: "2.0 MB",
    date: "2023-01-20",
    status: "active",
  },
  {
    id: "8",
    name: "Facture d'eau - Janvier 2023",
    type: "PDF",
    size: "800 KB",
    date: "2023-02-05",
    status: "inactive",
  },
  {
    id: "9",
    name: "Déclaration de revenus 2022",
    type: "PDF",
    size: "1.5 MB",
    date: "2023-03-10",
    status: "active",
  },
  {
    id: "10",
    name: "Quittance de loyer - Mars 2023",
    type: "PDF",
    size: "800 KB",
    date: "2023-04-05",
    status: "active",
  },
];

interface DocumentListProps {
  view: "grid" | "list";
}

const DocumentList = ({ view }: DocumentListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documentsData.filter((document) =>
    document.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Voir
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="p-4">
            {filteredDocuments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileIcon className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Aucun document trouvé</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Essayez de modifier vos critères de recherche ou ajoutez un nouveau document.
                </p>
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredDocuments.map((document) => (
                  <div key={document.id} className="rounded-md border border-border p-3 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="h-9 w-9 text-blue-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{document.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {document.size} - {document.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredDocuments.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="h-6 w-6 text-blue-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{document.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {document.size} - {document.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant={document.status === "active" ? "default" : "secondary"}>
                      {document.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DocumentList;
