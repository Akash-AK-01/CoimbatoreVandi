import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dataService } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_IMAGE = '/src/assets/ooty.jpg';

export function DestinationsManager() {
  const [destinations, setDestinations] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDest, setEditingDest] = useState(null);
  const { toast } = useToast();

  const emptyDest = {
    name: '',
    description: '',
    distance: '',
    highlights: '',
    image: ''
  };

  const [formData, setFormData] = useState(emptyDest);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = () => {
    setDestinations(dataService.getDestinations());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const destData = {
      ...formData,
      id: editingDest?.id,
      highlights: formData.highlights.split(',').map(h => h.trim()),
      image: formData.image || DEFAULT_IMAGE
    };
    
    dataService.saveDestination(destData);
    toast({
      title: editingDest ? "Local Destination Updated" : "Local Destination Added",
      description: "Local destination has been saved successfully.",
    });
    
    loadDestinations();
    setIsDialogOpen(false);
    setFormData(emptyDest);
    setEditingDest(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (dest) => {
    setEditingDest(dest);
    setFormData({
      ...dest,
      highlights: dest.highlights.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this local destination?')) {
      dataService.deleteDestination(id);
      toast({
        title: "Local Destination Deleted",
        description: "Local destination has been removed successfully.",
      });
      loadDestinations();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Local Destinations</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingDest(null); setFormData(emptyDest); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Local Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDest ? 'Edit' : 'Add New'} Local Destination</DialogTitle>
              <DialogDescription>
                {editingDest ? 'Update the local destination details below' : 'Add a new local destination. Image is optional.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Local Destination Name*</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Marudhamalai Temple" required />
                </div>
                <div>
                  <Label htmlFor="distance">Distance from City Center*</Label>
                  <Input id="distance" name="distance" value={formData.distance} onChange={handleChange} placeholder="e.g., 12 km" required />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Brief description of the local destination..." required />
              </div>

              <div>
                <Label htmlFor="highlights">Key Highlights (comma separated)*</Label>
                <Input id="highlights" name="highlights" value={formData.highlights} onChange={handleChange} placeholder="e.g., Temple, Hilltop view, Nature walk" required />
                <p className="text-xs text-muted-foreground mt-1">Separate highlights with commas</p>
              </div>

              <div>
                <Label>Destination Image (Optional)</Label>
                <div className="space-y-3">
                  {formData.image && (
                    <div className="relative w-full h-40 border rounded-lg overflow-hidden">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </div>
                    <span className="text-muted-foreground text-sm self-center">or</span>
                    <Button 
                      type="button" 
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, image: '' })}
                    >
                      Use Default
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload an image or leave empty to use default landscape image
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">
                  {editingDest ? 'Update' : 'Add'} Local Destination
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.length === 0 ? (
          <Card className="col-span-full p-8 text-center">
            <CardContent>
              <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No local destinations yet. Add your first local destination!</p>
              <Button onClick={() => { setEditingDest(null); setFormData(emptyDest); setIsDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Local Destination
              </Button>
            </CardContent>
          </Card>
        ) : (
          destinations.map((dest) => (
            <Card key={dest.id}>
              <img src={dest.image || DEFAULT_IMAGE} alt={dest.name} className="w-full h-32 object-cover rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-lg">{dest.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{dest.distance}</p>
                <p className="text-sm mb-4">{dest.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(dest)}>
                    <Edit className="h-4 w-4" />
                  </Button> 
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(dest.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
