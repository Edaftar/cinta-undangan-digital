
import { useState, useEffect, useRef } from "react";
import { 
  fetchTemplateImages, 
  uploadTemplateImage, 
  deleteTemplateImage, 
  saveExternalImageUrl,
  TemplateImage 
} from "@/services/musicService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Copy, 
  Loader2,
  Trash2,
  RefreshCw,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

const ImageManager = () => {
  const [images, setImages] = useState<TemplateImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [externalLoading, setExternalLoading] = useState(false);
  const [urlDialogOpen, setUrlDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [selectedImageToDelete, setSelectedImageToDelete] = useState<TemplateImage | null>(null);
  const [externalUrl, setExternalUrl] = useState('');
  const [externalName, setExternalName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch images on component mount
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const imageData = await fetchTemplateImages();
      setImages(imageData);
    } catch (error) {
      console.error("Failed to load images:", error);
      toast.error("Failed to load template images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const file = files[0];
      // Check if image is too large (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image is too large. Maximum size is 5MB.");
        return;
      }

      // Upload image
      const result = await uploadTemplateImage(file);
      if (result) {
        toast.success("Image uploaded successfully");
        setImages(prev => [result, ...prev]);
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddExternalUrl = async () => {
    if (!externalUrl) {
      toast.error("Please enter a URL");
      return;
    }

    if (!externalUrl.match(/^(http|https):\/\/[^ "]+$/)) {
      toast.error("Please enter a valid URL");
      return;
    }

    const name = externalName || "External Image";
    setExternalLoading(true);
    
    try {
      const result = await saveExternalImageUrl(name, externalUrl);
      if (result) {
        toast.success("External image URL added successfully");
        setImages(prev => [result, ...prev]);
        setUrlDialogOpen(false);
        setExternalUrl('');
        setExternalName('');
      } else {
        toast.error("Failed to add external image URL");
      }
    } catch (error) {
      console.error("Error adding external URL:", error);
      toast.error("Error adding external URL");
    } finally {
      setExternalLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!selectedImageToDelete) return;

    try {
      const success = await deleteTemplateImage(selectedImageToDelete.id);
      if (success) {
        toast.success("Image deleted successfully");
        setImages(prev => prev.filter(img => img.id !== selectedImageToDelete.id));
        setConfirmDeleteDialogOpen(false);
        setSelectedImageToDelete(null);
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image");
    }
  };

  const copyImageUrl = (image: TemplateImage) => {
    navigator.clipboard.writeText(image.url);
    setCopiedId(image.id);
    toast.success("Image URL copied to clipboard");
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Template Image Manager</h2>
          <p className="text-gray-600">Upload and manage images for your wedding templates</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={loadImages}
            disabled={loading}
            className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage/10"
          >
            {loading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <RefreshCw size={16} className="mr-2" />}
            Refresh
          </Button>
          
          <Button
            onClick={() => setUrlDialogOpen(true)}
            variant="outline"
            className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage/10"
          >
            <LinkIcon size={16} className="mr-2" />
            Add External URL
          </Button>
          
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Upload size={16} className="mr-2" />}
            Upload Image
          </Button>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef}
            className="hidden" 
            onChange={handleFileChange} 
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-wedding-rosegold" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <ImageIcon size={48} className="text-gray-400 mb-2" />
              <p className="text-gray-500">No images found. Upload your first image to get started.</p>
            </div>
          ) : (
            images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.name} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Image+Error';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => copyImageUrl(image)}
                          className="bg-white text-gray-800 hover:bg-gray-100"
                        >
                          {copiedId === image.id ? <Check size={16} /> : <Copy size={16} />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => {
                            setSelectedImageToDelete(image);
                            setConfirmDeleteDialogOpen(true);
                          }}
                          className="bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3 flex-grow">
                    <div className="text-sm font-medium truncate" title={image.name}>
                      {image.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {image.size ? `${(image.size / 1024).toFixed(1)} KB` : ''}
                      {image.isExternalUrl && <span className="ml-2 text-blue-500">(External URL)</span>}
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex justify-between">
                    <div className="text-xs text-gray-500">
                      {image.created_at && new Date(image.created_at).toLocaleDateString()}
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 px-2 text-blue-500"
                      onClick={() => copyImageUrl(image)}
                    >
                      Copy URL
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Add External URL Dialog */}
      <Dialog open={urlDialogOpen} onOpenChange={setUrlDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add External Image URL</DialogTitle>
            <DialogDescription>
              Add an image from Google Drive or any other external source.
              Make sure the image URL is publicly accessible.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Image Name</Label>
              <Input 
                id="name"
                placeholder="Enter a name for this image" 
                value={externalName}
                onChange={(e) => setExternalName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">Image URL</Label>
              <Input 
                id="url"
                placeholder="https://..."
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                For Google Drive images, make sure to set the sharing permission to "Anyone with the link"
                and use the direct image link.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUrlDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddExternalUrl} 
              disabled={externalLoading || !externalUrl}
            >
              {externalLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>Add URL</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteDialogOpen} onOpenChange={setConfirmDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedImageToDelete && (
            <div className="flex items-center gap-4 py-4">
              <div className="h-16 w-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={selectedImageToDelete.url} 
                  alt={selectedImageToDelete.name} 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Image+Error';
                  }}
                />
              </div>
              <div className="flex-grow">
                <p className="font-medium truncate">{selectedImageToDelete.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedImageToDelete.isExternalUrl ? 'External URL' : 'Uploaded image'}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteImage}>
              Delete Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageManager;
