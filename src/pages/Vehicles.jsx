import { useEffect, useState } from 'react';
import { Car, Users, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

        <div className="space-y-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="grid md:grid-cols-2 gap-6 items-start">
              {/* Vehicle Card */}
              <Card className="shadow-card hover:shadow-hover transition-all duration-300">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{vehicle.name}</CardTitle>
                      <CardDescription className="text-base mt-1">{vehicle.type}</CardDescription>
                    </div>
                    {vehicle.available && (
                      <Badge variant="default" className="bg-green-500">Available</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base font-medium">{vehicle.seats} Seater</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-3 flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5" />
                      Features:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-sm">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tariff Card */}
              <Card className="shadow-card">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-center text-primary text-xl">
                    {vehicle.type} Tariff
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-3 bg-primary text-primary-foreground font-semibold text-sm">
                    <div className="p-3 border-r border-primary-foreground/20">Service</div>
                    <div className="p-3 border-r border-primary-foreground/20">Price</div>
                    <div className="p-3">Distance/Duration</div>
                  </div>
                  
                  {/* Table Rows */}
                  {vehicle.tariff && vehicle.tariff.map((tariffItem, idx) => (
                    <div 
                      key={idx} 
                      className={`grid grid-cols-3 text-sm ${idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}
                    >
                      <div className="p-3 border-r border-gray-200 font-medium">
                        {tariffItem.service}
                      </div>
                      <div className="p-3 border-r border-gray-200 font-semibold text-primary whitespace-pre-line">
                        {tariffItem.price}
                      </div>
                      <div className="p-3 text-xs text-muted-foreground whitespace-pre-line">
                        {tariffItem.duration}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
