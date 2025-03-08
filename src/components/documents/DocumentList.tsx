
import { 
  FileIcon, 
  FileTextIcon, 
  ImageIcon, 
  FileSpreadsheetIcon, 
  FilePdfIcon,
  DownloadIcon,
  MoreVerticalIcon,
  TrashIcon,
  Share2Icon,
  EyeIcon
} from "lucide-react";
import { Document } from "@/pages/Documents";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface DocumentListProps {
  documents: Document[];
  viewMode: "grid" | "list";
  onDelete: (id: string) => void;
}

const DocumentList = ({ documents, viewMode, onDelete }: DocumentListProps) => {
  const { toast } = useToast();

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdfIcon className="h-8 w-8 text-red-500" />;
      case "docx":
      case "doc":
        return <FileTextIcon className="h-8 w-8 text-blue-500" />;
      case "xlsx":
      case "xls":
        return <FileSpreadsheetIcon className="h-8 w-8 text-green-500" />;
      case "jpg":
      case "png":
      case "gif":
        return <ImageIcon className="h-8 w-8 text-purple-500" />;
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleDownload = (doc: Document) => {
    toast({
      title: "Téléchargement commencé",
      description: `${doc.name} va être téléchargé.`,
    });
  };

  const handleShare = (doc: Document) => {
    toast({
      title: "Partage du document",
      description: "Fonctionnalité de partage à venir prochainement.",
    });
  };

  const handlePreview = (doc: Document) => {
    toast({
      title: "Aperçu du document",
      description: "Fonctionnalité d'aperçu à venir prochainement.",
    });
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: "Document supprimé",
      description: "Le document a été supprimé avec succès.",
    });
  };

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg border border-dashed h-64">
        <FileIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Aucun document trouvé</h3>
        <p className="text-muted-foreground text-center mt-2">
          Aucun document ne correspond à votre recherche ou à la catégorie sélectionnée.
        </p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getDocumentIcon(doc.type)}
                  <div className="space-y-1 overflow-hidden">
                    <h3 className="font-medium text-sm truncate max-w-[160px]">{doc.name}</h3>
                    <p className="text-xs text-muted-foreground">{doc.size}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handlePreview(doc)}>
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Aperçu
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(doc)}>
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Télécharger
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare(doc)}>
                      <Share2Icon className="mr-2 h-4 w-4" />
                      Partager
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDelete(doc.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="px-4 pb-4 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" className="font-normal">
                    {doc.category}
                  </Badge>
                  <span className="text-muted-foreground">
                    {format(new Date(doc.uploadDate), "dd MMM yyyy", { locale: fr })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium">
        <div className="col-span-5">Nom</div>
        <div className="col-span-2">Taille</div>
        <div className="col-span-2">Catégorie</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-1"></div>
      </div>
      <div className="divide-y">
        {documents.map((doc) => (
          <div key={doc.id} className="grid grid-cols-12 p-3 items-center text-sm">
            <div className="col-span-5 flex items-center gap-3 overflow-hidden">
              {getDocumentIcon(doc.type)}
              <span className="truncate">{doc.name}</span>
            </div>
            <div className="col-span-2">{doc.size}</div>
            <div className="col-span-2">
              <Badge variant="outline" className="font-normal">
                {doc.category}
              </Badge>
            </div>
            <div className="col-span-2">{format(new Date(doc.uploadDate), "dd MMM yyyy", { locale: fr })}</div>
            <div className="col-span-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handlePreview(doc)}>
                    <EyeIcon className="mr-2 h-4 w-4" />
                    Aperçu
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload(doc)}>
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Télécharger
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare(doc)}>
                    <Share2Icon className="mr-2 h-4 w-4" />
                    Partager
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleDelete(doc.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
