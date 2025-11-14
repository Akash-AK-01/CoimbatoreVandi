import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dataService } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import kodaikanalImg from '@/assets/kodaikanal.png';

const DEFAULT_IMAGE = kodaikanalImg;

export function PackagesManager() {
  const [packages, setPackages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const { toast } = useToast();

  const emptyPackage = {
    name: '',
    description: '',
    duration: '',
    destinations: '',
    image: '',
    includes: '',
    maxPassengers: ''
  };

  const [formData, setFormData] = useState(emptyPackage);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = () => {
    setPackages(dataService.getPackages());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const packageData = {
      ...formData,
      id: editingPackage?.id,
      maxPassengers: parseInt(formData.maxPassengers),
      destinations: formData.destinations.split(',').map(d => d.trim()),
      includes: formData.includes.split(',').map(i => i.trim()),
      image: formData.image || DEFAULT_IMAGE
    };
    
    dataService.savePackage(packageData);
    toast({
      title: editingPackage ? "Package Updated" : "Package Created",
      description: "Package has been saved successfully.",
    });
    
    loadPackages();
    setIsDialogOpen(false);
    setFormData(emptyPackage);
    setEditingPackage(null);
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

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      ...pkg,
      destinations: pkg.destinations.join(', '),
      includes: pkg.includes.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this package?')) {
      dataService.deletePackage(id);
      toast({
        title: "Package Deleted",
        description: "Package has been removed successfully.",
      });
      loadPackages();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Tour Packages</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingPackage(null); setFormData(emptyPackage); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPackage ? 'Edit' : 'Add New'} Tour Package</DialogTitle>
              <DialogDescription>
                {editingPackage ? 'Update the package details below' : 'Create a new tour package. Image is optional - a default will be used if not provided.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Package Name*</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Ooty Weekend Tour" required />
                </div>
                <div>
                  <Label htmlFor="duration">Duration*</Label>
                  <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 2 Days 1 Night" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Brief description of the package..." required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹)*</Label>
                  <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} placeholder="3999" required />
                </div>
                <div>
                  <Label htmlFor="maxPassengers">Max Passengers*</Label>
                  <Input id="maxPassengers" name="maxPassengers" type="number" value={formData.maxPassengers} onChange={handleChange} placeholder="4" required />
                </div>
              </div>

              <div>
                <Label htmlFor="vehicleType">Vehicle Type*</Label>
                <Input id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} placeholder="e.g., Swift Dzire / Innova" required />
              </div>

              <div>
                <Label htmlFor="destinations">Destinations (comma separated)*</Label>
                <Input id="destinations" name="destinations" value={formData.destinations} onChange={handleChange} placeholder="e.g., Ooty, Coonoor, Botanical Gardens" required />
                <p className="text-xs text-muted-foreground mt-1">Separate multiple destinations with commas</p>
              </div>

              <div>
                <Label htmlFor="includes">What's Included (comma separated)*</Label>
                <Input id="includes" name="includes" value={formData.includes} onChange={handleChange} placeholder="e.g., Fuel, Driver allowance, Parking fees" required />
                <p className="text-xs text-muted-foreground mt-1">Separate items with commas</p>
              </div>

              <div>
                <Label>Package Image (Optional)</Label>
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
                    Upload an image or leave empty to use default travel image
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">
                  {editingPackage ? 'Update' : 'Create'} Package
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.length === 0 ? (
          <Card className="col-span-full p-8 text-center">
            <CardContent>
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No packages yet. Create your first tour package!</p>
              <Button onClick={() => { setEditingPackage(null); setFormData(emptyPackage); setIsDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Package
              </Button>
            </CardContent>
          </Card>
        ) : (
          packages.map((pkg) => (
            <Card key={pkg.id}>
              <img src={pkg.image || DEFAULT_IMAGE} alt={pkg.name} className="w-full h-32 object-cover rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{pkg.duration}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(pkg)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(pkg.id)}>
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
