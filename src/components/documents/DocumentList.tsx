
import { FileIcon, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  category?: string;
  size?: string;
  owner?: string;
}

interface DocumentListProps {
  documents: Document[];
  viewMode: string;
  onDelete: (docId: string) => void;
}

export const DocumentList = ({ documents, viewMode, onDelete }: DocumentListProps) => {
  // Fonction pour déterminer l'icône du document
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "docx":
        return "📝";
      case "zip":
        return "🗂️";
      case "dwg":
        return "📐";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📄";
    }
  };

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center h-32 bg-muted p-4">
              <div className="text-4xl">{getFileIcon(doc.type)}</div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium line-clamp-1">{doc.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="text-xs">
                  {doc.type.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">{doc.date}</span>
              </div>
              {doc.category && (
                <p className="text-xs text-muted-foreground mt-1">
                  {doc.category}
                </p>
              )}
              <div className="flex justify-between items-center mt-3">
                <Button variant="outline" size="sm" className="text-xs px-2">
                  Ouvrir
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onDelete(doc.id)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground p-3 border-b">
        <div className="col-span-6">Nom</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>
      <div className="divide-y">
        {documents.map((doc) => (
          <div key={doc.id} className="grid grid-cols-12 p-3 items-center hover:bg-muted/50">
            <div className="col-span-6 flex items-center gap-2">
              <div className="text-xl">{getFileIcon(doc.type)}</div>
              <span className="text-sm line-clamp-1">{doc.name}</span>
            </div>
            <div className="col-span-2">
              <Badge variant="outline" className="text-xs">
                {doc.type.toUpperCase()}
              </Badge>
            </div>
            <div className="col-span-2 text-sm text-muted-foreground">
              {doc.date}
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Ouvrir
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onDelete(doc.id)}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
