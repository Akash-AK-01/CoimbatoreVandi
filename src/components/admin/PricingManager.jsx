import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dataService } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export function PricingManager() {
  const [pricing, setPricing] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = () => {
    setPricing(dataService.getPricing());
  };

  const handleChange = (id, field, value) => {
    setPricing(pricing.map(p => 
      p.id === id ? { ...p, [field]: parseFloat(value) || 0 } : p
    ));
  };

  const handleSave = () => {
    dataService.updatePricing(pricing);
    toast({
      title: "Pricing Updated",
      description: "All pricing has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Pricing</h2>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rate Card</CardTitle>
          <CardDescription>Update pricing for different services and vehicle types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {pricing.map((row) => (
            <div key={row.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-4">{row.type}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`sedan-${row.id}`}>Sedan (₹)</Label>
                  <Input
                    id={`sedan-${row.id}`}
                    type="number"
                    value={row.sedan}
                    onChange={(e) => handleChange(row.id, 'sedan', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`suv-${row.id}`}>SUV (₹)</Label>
                  <Input
                    id={`suv-${row.id}`}
                    type="number"
                    value={row.suv}
                    onChange={(e) => handleChange(row.id, 'suv', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`innova-${row.id}`}>Innova (₹)</Label>
                  <Input
                    id={`innova-${row.id}`}
                    type="number"
                    value={row.innova}
                    onChange={(e) => handleChange(row.id, 'innova', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
