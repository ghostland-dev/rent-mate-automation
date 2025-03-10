
import { useState } from "react";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { Document } from "@/pages/Documents";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (document: Document) => void;
}

const UploadDocumentDialog = ({ open, onOpenChange, onUpload }: UploadDocumentDialogProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("contrats");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    // Reset the input value
    const input = document.getElementById("file-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à télécharger.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simuler un téléchargement
    setTimeout(() => {
      const fileExtension = selectedFile.name.split('.').pop() || "";
      const today = new Date().toISOString().split('T')[0];
      
      const newDocument: Document = {
        id: `doc${Date.now()}`,
        name: selectedFile.name,
        type: fileExtension,
        size: formatFileSize(selectedFile.size),
        uploadedBy: "Jean Dupont", // Normalement l'utilisateur connecté
        uploadDate: today,
        date: today, // Add the date field to match the Document interface
        category: category,
      };

      onUpload(newDocument);
      setSelectedFile(null);
      setCategory("contrats");
      setIsUploading(false);

      toast({
        title: "Document téléchargé",
        description: "Votre document a été téléchargé avec succès.",
      });
    }, 1500);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un document</DialogTitle>
          <DialogDescription>
            Téléchargez un nouveau document pour votre gestion immobilière.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contrats">Contrats</SelectItem>
                <SelectItem value="factures">Factures</SelectItem>
                <SelectItem value="quittances">Quittances</SelectItem>
                <SelectItem value="états des lieux">États des lieux</SelectItem>
                <SelectItem value="photos">Photos</SelectItem>
                <SelectItem value="règlements">Règlements</SelectItem>
                <SelectItem value="relevés">Relevés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-upload">Document</Label>
            {!selectedFile ? (
              <div className="border-2 border-dashed rounded-md border-muted-foreground/25 p-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <UploadIcon className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium">Cliquez pour télécharger</p>
                    <p className="text-xs text-muted-foreground">
                      ou glissez-déposez
                    </p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    type="button"
                  >
                    Parcourir
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 border rounded-md p-3">
                <FileIcon className="h-6 w-6 text-blue-500" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSelectedFile}
                  className="h-8 w-8"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? "Téléchargement..." : "Télécharger"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog;
