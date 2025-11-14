import { useEffect, useState } from 'react';
import { Clock, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dataService, initializeData } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import ootyImg from '../assets/ooty.jpg';
import kodaikanalImg from '../assets/kodaikanal.png';
import muunarImg from '../assets/muunar.png';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    initializeData();
    let pkgs = dataService.getPackages();
    
    // Map local images to packages based on their names
    const imageMap = {
      'Ooty': ootyImg,
      'Kodaikanal': kodaikanalImg,
      'Munnar': muunarImg
    };
    
    pkgs = pkgs.map(pkg => {
      // Find matching image based on package name
      const matchedImage = Object.entries(imageMap).find(([key]) => 
        pkg.name.toLowerCase().includes(key.toLowerCase())
      );
      return {
        ...pkg,
        image: matchedImage ? matchedImage[1] : pkg.image
      };
    });
    
    setPackages(pkgs);
  }, []);

  const handleBookNow = (pkg) => {
    const message = `Hello! I'm interested in the *${pkg.name}* package.%0A%0A*Category:* ${pkg.category}%0A*Duration:* ${pkg.duration}%0A*Destinations:* ${pkg.destinations.join(', ')}%0A%0APlease provide more details.`;
    window.open(`https://wa.me/919444649850?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tour Packages</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated tour packages to famous destinations across South India
          </p>
        </div>

        {/* Group packages by category */}
        {['One Day Package', 'Two Days Package', 'Honeymoon Package', 'Weekend Getaway', 'Hill Station Tour'].map(category => {
          const categoryPackages = packages.filter(pkg => pkg.category === category);
          if (categoryPackages.length === 0) return null;
          
          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPackages.map((pkg) => (
            <Card key={pkg.id} className="shadow-card hover:shadow-hover transition-all duration-300 flex flex-col">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Up to {pkg.maxPassengers} passengers</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <div className="flex flex-wrap gap-1">
                    {pkg.destinations.map((dest, idx) => (
                      <Badge key={idx} variant="secondary">{dest}</Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Includes:</p>
                  <div className="flex flex-wrap gap-1">
                    {pkg.includes.map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{item}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end items-center">
                <Button onClick={() => handleBookNow(pkg)}>Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  })}
      </div>
    </div>
  );
}
