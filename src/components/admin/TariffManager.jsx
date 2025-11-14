import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dataService } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export function TariffManager() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTariff, setEditingTariff] = useState(null);
  const { toast } = useToast();

  const emptyTariff = {
    service: '',
    price: '',
    duration: ''
  };

  const [formData, setFormData] = useState(emptyTariff);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    setVehicles(dataService.getVehicles());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const vehicle = vehicles.find(v => v.id === selectedVehicle.id);
    if (!vehicle) return;

    let updatedTariff = [...(vehicle.tariff || [])];
    
    if (editingTariff !== null) {
      // Update existing tariff
      updatedTariff[editingTariff] = formData;
    } else {
      // Add new tariff
      updatedTariff.push(formData);
    }

    const updatedVehicle = {
      ...vehicle,
      tariff: updatedTariff
    };

    dataService.saveVehicle(updatedVehicle);
    
    toast({
      title: editingTariff !== null ? "Tariff Updated" : "Tariff Added",
      description: "Tariff has been saved successfully.",
    });
    
    loadVehicles();
    setSelectedVehicle(updatedVehicle);
    setIsDialogOpen(false);
    setFormData(emptyTariff);
    setEditingTariff(null);
  };

  const handleEdit = (index) => {
    const tariff = selectedVehicle.tariff[index];
    setEditingTariff(index);
    setFormData(tariff);
    setIsDialogOpen(true);
  };

  const handleDelete = (index) => {
    if (confirm('Are you sure you want to delete this tariff?')) {
      const vehicle = vehicles.find(v => v.id === selectedVehicle.id);
      const updatedTariff = vehicle.tariff.filter((_, i) => i !== index);
      
      const updatedVehicle = {
        ...vehicle,
        tariff: updatedTariff
      };

      dataService.saveVehicle(updatedVehicle);
      
      toast({
        title: "Tariff Deleted",
        description: "Tariff has been removed successfully.",
      });
      
      loadVehicles();
      setSelectedVehicle(updatedVehicle);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Vehicle Tariffs</h2>
      </div>

      {/* Vehicle Selection */}
      {!selectedVehicle ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <Card 
              key={vehicle.id} 
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <CardHeader>
                <CardTitle>{vehicle.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                <p className="text-xs mt-2">
                  {vehicle.tariff?.length || 0} tariff entries
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => setSelectedVehicle(null)}
            className="mb-4"
          >
            ← Back to Vehicles
          </Button>

          {/* Selected Vehicle Header */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">{selectedVehicle.name} - {selectedVehicle.type}</CardTitle>
            </CardHeader>
          </Card>

          {/* Add Tariff Button */}
          <div className="mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingTariff(null); setFormData(emptyTariff); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tariff Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingTariff !== null ? 'Edit' : 'Add'} Tariff</DialogTitle>
                  <DialogDescription>
                    {editingTariff !== null ? 'Update the tariff details' : 'Add a new tariff entry for this vehicle'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="service">Service Name*</Label>
                    <Input 
                      id="service" 
                      name="service" 
                      value={formData.service} 
                      onChange={handleChange} 
                      placeholder="e.g., City Local Trip" 
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price*</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      value={formData.price} 
                      onChange={handleChange} 
                      placeholder="e.g., ₹25 or ₹280-330" 
                      required 
                    />
                    <p className="text-xs text-muted-foreground mt-1">Can include ranges or additional info</p>
                  </div>

                  <div>
                    <Label htmlFor="duration">Distance/Duration*</Label>
                    <Textarea 
                      id="duration" 
                      name="duration" 
                      value={formData.duration} 
                      onChange={handleChange} 
                      placeholder="e.g., Per Km or 10km Limit / Hr" 
                      required 
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Use line breaks for multiple lines</p>
                  </div>

                  <div className="flex gap-2 justify-end pt-4 border-t">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">
                      {editingTariff !== null ? 'Update' : 'Add'} Tariff
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tariff List */}
          <Card>
            <CardHeader>
              <CardTitle>Current Tariff Structure</CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedVehicle.tariff || selectedVehicle.tariff.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No tariff entries yet. Add your first tariff entry!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedVehicle.tariff.map((tariff, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{tariff.service}</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Price: </span>
                                <span className="font-medium text-primary">{tariff.price}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Duration: </span>
                                <span className="whitespace-pre-line">{tariff.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(index)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
