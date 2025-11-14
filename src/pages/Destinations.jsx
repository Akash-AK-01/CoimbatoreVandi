import { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dataService, initializeData } from '@/lib/mockData';
import ootyImg from '../assets/ooty.jpg';
import valparaiImg from '../assets/Valparai.png';
import airportImg from '../assets/Airport.png';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    initializeData();
    let dests = dataService.getDestinations();
    
    // Use local images for destinations
    const localDestImages = [ootyImg, valparaiImg, airportImg];
    dests = dests.map((dest, idx) => ({
      ...dest,
      image: localDestImages[idx] || dest.image
    }));
    
    setDestinations(dests);
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Local Destinations</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover beautiful local destinations around Coimbatore
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Card key={dest.id} className="shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-56 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{dest.name}</CardTitle>
                    <CardDescription className="text-lg">{dest.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Navigation className="h-4 w-4" />
                  <span className="font-medium">{dest.distance} from city center</span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Key Highlights:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary">{highlight}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
