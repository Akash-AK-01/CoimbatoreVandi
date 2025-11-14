import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { dataService } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_IMAGE = '/src/assets/Swift.png';

export function VehiclesManager() {
  const [vehicles, setVehicles] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const { toast } = useToast();

  const emptyVehicle = {
    name: '',
    type: '',
    seats: '',
    pricePerKm: '',
    pricePerDay: '',
    features: '',
    image: '',
    available: true
  };

  const [formData, setFormData] = useState(emptyVehicle);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    setVehicles(dataService.getVehicles());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleData = {
      ...formData,
      id: editingVehicle?.id,
      seats: parseInt(formData.seats),
      pricePerKm: parseFloat(formData.pricePerKm),
      pricePerDay: parseFloat(formData.pricePerDay),
      features: formData.features.split(',').map(f => f.trim()),
      image: formData.image || DEFAULT_IMAGE
    };
    
    dataService.saveVehicle(vehicleData);
    toast({
      title: editingVehicle ? "Vehicle Updated" : "Vehicle Added",
      description: "Vehicle has been saved successfully.",
    });
    
    loadVehicles();
    setIsDialogOpen(false);
    setFormData(emptyVehicle);
    setEditingVehicle(null);
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

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      ...vehicle,
      features: vehicle.features.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      dataService.deleteVehicle(id);
      toast({
        title: "Vehicle Deleted",
        description: "Vehicle has been removed successfully.",
      });
      loadVehicles();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Vehicles</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingVehicle(null); setFormData(emptyVehicle); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingVehicle ? 'Edit' : 'Add New'} Vehicle</DialogTitle>
              <DialogDescription>
                {editingVehicle ? 'Update the vehicle details below' : 'Add a new vehicle to your fleet. Image is optional.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Vehicle Name*</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Swift Dzire" required />
                </div>
                <div>
                  <Label htmlFor="type">Type*</Label>
                  <Input id="type" name="type" value={formData.type} onChange={handleChange} placeholder="e.g., Sedan, MUV" required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="seats">Seats*</Label>
                  <Input id="seats" name="seats" type="number" value={formData.seats} onChange={handleChange} placeholder="4" required />
                </div>
                <div>
                  <Label htmlFor="pricePerKm">Price/Km (₹)*</Label>
                  <Input id="pricePerKm" name="pricePerKm" type="number" value={formData.pricePerKm} onChange={handleChange} placeholder="12" required />
                </div>
                <div>
                  <Label htmlFor="pricePerDay">Price/Day (₹)*</Label>
                  <Input id="pricePerDay" name="pricePerDay" type="number" value={formData.pricePerDay} onChange={handleChange} placeholder="2500" required />
                </div>
              </div>

              <div>
                <Label htmlFor="features">Features (comma separated)*</Label>
                <Input id="features" name="features" value={formData.features} onChange={handleChange} placeholder="e.g., AC, Music System, Comfortable Seats" required />
                <p className="text-xs text-muted-foreground mt-1">Separate features with commas</p>
              </div>

              <div>
                <Label>Vehicle Image (Optional)</Label>
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
                    Upload an image or leave empty to use default car image
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
                <Label htmlFor="available">Available for Booking</Label>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">
                  {editingVehicle ? 'Update' : 'Add'} Vehicle
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.length === 0 ? (
          <Card className="col-span-full p-8 text-center">
            <CardContent>
              <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No vehicles yet. Add your first vehicle to the fleet!</p>
              <Button onClick={() => { setEditingVehicle(null); setFormData(emptyVehicle); setIsDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Vehicle
              </Button>
            </CardContent>
          </Card>
        ) : (
          vehicles.map((vehicle) => (
            <Card key={vehicle.id}>
              <img src={vehicle.image || DEFAULT_IMAGE} alt={vehicle.name} className="w-full h-32 object-cover rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-lg">{vehicle.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-1">{vehicle.type} • {vehicle.seats} Seater</p>
                <p className="text-sm mb-2">₹{vehicle.pricePerKm}/km • ₹{vehicle.pricePerDay}/day</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(vehicle)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(vehicle.id)}>
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
