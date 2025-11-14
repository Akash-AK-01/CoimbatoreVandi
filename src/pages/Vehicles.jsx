import { useEffect, useState } from 'react';
import { Car, Users, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dataService, initializeData } from '@/lib/mockData';
import swiftImg from '../assets/Swift.png';
import innovaImg from '../assets/Innova.png';
import wagnorImg from '../assets/wagnor.png';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    initializeData();
    let cars = dataService.getVehicles();
    
    // Map local images to vehicles based on their names
    const imageMap = {
      'Swift': swiftImg,
      'Toyota Innova': innovaImg,
      'Innova Crysta': wagnorImg
    };
    
    cars = cars.map(car => {
      // Find matching image based on vehicle name
      const matchedImage = Object.entries(imageMap).find(([key]) => 
        car.name.toLowerCase().includes(key.toLowerCase())
      );
      return {
        ...car,
        image: matchedImage ? matchedImage[1] : car.image
      };
    });
    
    setVehicles(cars);
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our well-maintained vehicles for a comfortable journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{vehicle.name}</CardTitle>
                    <CardDescription>{vehicle.type}</CardDescription>
                  </div>
                  {vehicle.available && (
                    <Badge variant="default" className="bg-green-500">Available</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{vehicle.seats} Seater</span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4" />
                    Features:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline">{feature}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
