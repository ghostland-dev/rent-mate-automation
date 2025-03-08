
import { useState } from "react";
import { 
  FileIcon, 
  FileTextIcon, 
  ImageIcon, 
  FileSpreadsheetIcon, 
  FilePdfIcon,
  PlusIcon,
  SearchIcon,
  FolderIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DocumentList from "@/components/documents/DocumentList";
import UploadDocumentDialog from "@/components/documents/UploadDocumentDialog";

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  category: string;
  propertyId?: string;
  tenantId?: string;
}

const mockDocuments: Document[] = [
  {
    id: "doc1",
    name: "Contrat de bail - Appartement 3B.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadedBy: "Jean Dupont",
    uploadDate: "2023-06-15",
    category: "contrats",
    propertyId: "prop1",
    tenantId: "tenant2"
  },
  {
    id: "doc2",
    name: "Facture travaux plomberie.pdf",
    type: "pdf",
    size: "843 KB",
    uploadedBy: "Marie Martin",
    uploadDate: "2023-07-02",
    category: "factures",
    propertyId: "prop3"
  },
  {
    id: "doc3",
    name: "État des lieux - Villa Méditerranée.docx",
    type: "docx",
    size: "1.5 MB",
    uploadedBy: "Jean Dupont",
    uploadDate: "2023-05-20",
    category: "états des lieux",
    propertyId: "prop2"
  },
  {
    id: "doc4",
    name: "Quittance loyer - Juin 2023.pdf",
    type: "pdf",
    size: "356 KB",
    uploadedBy: "System",
    uploadDate: "2023-06-01",
    category: "quittances",
    propertyId: "prop1",
    tenantId: "tenant1"
  },
  {
    id: "doc5",
    name: "Photos appartement 3B.jpg",
    type: "jpg",
    size: "4.2 MB",
    uploadedBy: "Marie Martin",
    uploadDate: "2023-06-10",
    category: "photos",
    propertyId: "prop1"
  },
  {
    id: "doc6",
    name: "Relevés compteur électricité.xlsx",
    type: "xlsx",
    size: "980 KB",
    uploadedBy: "Jean Dupont",
    uploadDate: "2023-07-10",
    category: "relevés",
  },
  {
    id: "doc7",
    name: "Règlement intérieur.pdf",
    type: "pdf",
    size: "750 KB",
    uploadedBy: "Admin",
    uploadDate: "2023-01-15",
    category: "règlements",
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Filtrer les documents en fonction de la recherche et de la catégorie
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Catégories de documents
  const categories = [
    { id: "all", name: "Tous les documents" },
    { id: "contrats", name: "Contrats" },
    { id: "factures", name: "Factures" },
    { id: "quittances", name: "Quittances" },
    { id: "états des lieux", name: "États des lieux" },
    { id: "photos", name: "Photos" },
    { id: "règlements", name: "Règlements" },
    { id: "relevés", name: "Relevés" },
  ];

  const handleUploadDocument = (newDocument: Document) => {
    setDocuments([newDocument, ...documents]);
    setIsUploadDialogOpen(false);
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Gérez tous vos documents liés à vos propriétés et locataires
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center relative w-full sm:w-96">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)} className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Catégories</h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-2 p-2 rounded-md text-left ${
                    activeCategory === category.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <FolderIcon className="h-4 w-4" />
                  {category.name}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="col-span-1 md:col-span-3">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {categories.find(c => c.id === activeCategory)?.name || "Tous les documents"}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({filteredDocuments.length})
                </span>
              </h2>
              <TabsList>
                <TabsTrigger value="grid">Grille</TabsTrigger>
                <TabsTrigger value="list">Liste</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              <DocumentList 
                documents={filteredDocuments} 
                viewMode="grid" 
                onDelete={handleDeleteDocument}
              />
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <DocumentList 
                documents={filteredDocuments} 
                viewMode="list" 
                onDelete={handleDeleteDocument}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <UploadDocumentDialog 
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUpload={handleUploadDocument}
      />
    </div>
  );
};

export default Documents;
