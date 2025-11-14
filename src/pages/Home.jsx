import { Link } from 'react-router-dom';
import { Car, MapPin, Shield, Clock, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dataService, initializeData } from '@/lib/mockData';
import heroImage from '@/assets/home3.png';
import ootyImg from '../assets/ooty.jpg';
import kodaikanalImg from '../assets/kodaikanal.png';
import muunarImg from '../assets/muunar.png';
import swiftImg from '../assets/Swift.png';
import innovaImg from '../assets/Innova.png';
import wagnorImg from '../assets/wagnor.png';

export default function Home() {
  const [from, setFrom] = useState('Coimbatore');
  const [to, setTo] = useState('Ooty');
  const [date, setDate] = useState('');
  const [carType, setCarType] = useState('Any');
  const [packages, setPackages] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    initializeData();
    let pkgs = dataService.getPackages().slice(0, 3);
    let cars = dataService.getVehicles().slice(0, 3);
    const reviews = dataService.getTestimonials().filter(t => t.rating >= 4);
    
    // Use local images for packages
    const localPackageImages = [ootyImg, kodaikanalImg, muunarImg];
    pkgs = pkgs.map((pkg, idx) => ({
      ...pkg,
      image: localPackageImages[idx] || pkg.image
    }));

    // Use local images for vehicles
    const localVehicleImages = [swiftImg, innovaImg, wagnorImg];
    cars = cars.map((car, idx) => ({
      ...car,
      image: localVehicleImages[idx] || car.image
    }));
    
    setPackages(pkgs);
    setVehicles(cars);
    setTestimonials(reviews);

    // Auto-rotate testimonials every 3 seconds (faster)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % (reviews.length || 1));
    }, 3000);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const message = `Hi! I want to book a trip:%0A%0AFrom: ${from}%0ATo: ${to}%0ADate: ${date || 'Not specified'}%0ACar Type: ${carType}%0A%0APlease share package details and pricing.`;
    window.open(`https://wa.me/919444649850?text=${message}`, '_blank');
  };

  const handlePackageClick = (pkg) => {
    const message = `Hello! I'm interested in the *${pkg.name}* package.%0A%0A*Duration:* ${pkg.duration}%0A*Price:* ₹${pkg.price}%0A%0APlease provide more details.`;
    window.open(`https://wa.me/919444649850?text=${message}`, '_blank');
  };

  const handleVehicleClick = (vehicle) => {
    const message = `Hello! I'm interested in renting the *${vehicle.name}*.%0A%0A*Type:* ${vehicle.type}%0A*Price:* ₹${vehicle.pricePerDay}/day%0A%0APlease provide availability details.`;
    window.open(`https://wa.me/919444649850?text=${message}`, '_blank');
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const features = [
    { icon: Car, title: 'Premium Cars', description: 'Top-notch fleet for every trip' },
    { icon: Clock, title: 'On-Time Pickup', description: 'We value your time' },
    { icon: Shield, title: 'Safety First', description: 'Sanitized & inspected vehicles' },
    { icon: MapPin, title: 'Wide Coverage', description: 'Routes across Tamil Nadu & Kerala' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-purple-400 via-purple-300 to-blue-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-12 animate-float">
          <img src={heroImage} alt="hero" className="h-[80%] w-auto object-contain drop-shadow-2xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome to <span className="text-gray-800">Rest On Wheels</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
              Your Ride. Your City. Your Style.
            </h2>
            <p className="text-lg mb-8 text-gray-700">
              At Rest On Wheels, we're not just another taxi service—we're a <em>movement on wheels</em>, 
              driven by pride in our city and love for the road.
            </p>
            <div className="flex gap-3 mb-12">
              <Link to="/packages"><Button size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">View Packages</Button></Link>
              <Link to="/vehicles"><Button size="lg" variant="outline" className="bg-white/80 border-gray-300 text-gray-900 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">Self-Drive Cars</Button></Link>
            </div>

            {/* Quick Search */}
            <div className="bg-white rounded-xl p-6 shadow-2xl max-w-full transform hover:scale-[1.02] transition-all">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Plan your trip</h3>
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-3">
                <div className="flex-1 w-full">
                  <label className="text-xs font-medium text-gray-700 mb-1 block">From</label>
                  <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary transition-all">
                    <option>Coimbatore</option>
                    <option>Pollachi</option>
                    <option>Mettupalayam</option>
                  </select>
                </div>
                <div className="flex-1 w-full">
                  <label className="text-xs font-medium text-gray-700 mb-1 block">To</label>
                  <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary transition-all">
                    <option>Ooty</option>
                    <option>Valparai</option>
                    <option>Isha</option>
                    <option>Kodaikanal</option>
                    <option>Munnar</option>
                  </select>
                </div>
                <div className="w-full md:w-auto">
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="w-full md:w-auto">
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Car Type</label>
                  <select value={carType} onChange={(e) => setCarType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary transition-all">
                    <option>Any</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Innova</option>
                  </select>
                </div>
                <div className="w-full md:w-auto">
                  <Button type="submit" className="w-full md:w-auto h-10 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">Search Packages</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-16" id="packages-section" data-animate>
        <div className={`container mx-auto px-4 transition-all duration-1000 ${isVisible['packages-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Popular Tour Packages</h2>
            <Link to="/packages" className="text-sm text-primary underline hover:text-primary/80 transition-colors">View All</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div key={pkg.id} style={{ animationDelay: `${i * 100}ms` }} className="animate-fade-in-up">
                <Card className="group hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary overflow-hidden">
                  <Link to="/packages">
                    <div className="relative overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {pkg.duration}
                      </div>
                    </div>
                  </Link>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <Link to="/packages" className="flex-1">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{pkg.vehicleType}</p>
                        </div>
                      </Link>
                      <div className="text-right">
                        <div className="font-bold text-primary text-xl">₹{pkg.price}</div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 group-hover:bg-primary group-hover:text-white transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePackageClick(pkg);
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cars / Fleet */}
      <section className="py-16 bg-muted/30" id="fleet-section" data-animate>
        <div className={`container mx-auto px-4 transition-all duration-1000 ${isVisible['fleet-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Our Fleet</h2>
            <div className="text-sm">
              <Link to="/vehicles" className="text-primary underline hover:text-primary/80 transition-colors">View All Cars</Link>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, i) => (
              <div key={vehicle.id} style={{ animationDelay: `${i * 100}ms` }} className="animate-fade-in-up">
                <Card className="group p-4 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary">
                  <Link to="/vehicles" className="flex gap-4">
                    <div className="relative overflow-hidden rounded flex-shrink-0">
                      <img src={vehicle.image} alt={vehicle.name} className="w-36 h-24 object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{vehicle.name}</h4>
                      <p className="text-sm text-muted-foreground">{vehicle.type} • {vehicle.seats} Seats</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="font-bold text-primary">₹{vehicle.pricePerDay}/day</div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-end mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="group-hover:bg-primary group-hover:text-white transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVehicleClick(vehicle);
                      }}
                    >
                      Book
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16" id="features-section" data-animate>
        <div className={`container mx-auto px-4 transition-all duration-1000 ${isVisible['features-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Premium cars, transparent pricing, on-time pickups and 24/7 support.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="text-center p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary group" style={{ animationDelay: `${i * 100}ms` }}>
                <CardContent>
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all"></div>
                    <f.icon className="relative h-12 w-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{f.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (animated carousel) */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 relative overflow-hidden" id="testimonials-section" data-animate>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-blue-400/5"></div>
        <div className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${isVisible['testimonials-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
            <p className="text-muted-foreground">Real reviews from satisfied travelers</p>
          </div>
          
          {testimonials.length > 0 ? (
            <div className="max-w-4xl mx-auto relative">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                <Quote className="absolute top-4 left-4 h-16 w-16 text-primary/10" />
                <Quote className="absolute bottom-4 right-4 h-16 w-16 text-primary/10 rotate-180" />
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-6 w-6 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  
                  <div className="min-h-[120px] flex items-center justify-center">
                    <p className="text-lg md:text-xl text-center text-gray-700 italic leading-relaxed animate-fade-in">
                      "{testimonials[currentTestimonial].review}"
                    </p>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="font-bold text-lg text-gray-900">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setCurrentTestimonial(i)} className={`h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}></button>
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white/90 p-8 rounded-lg shadow-xl">
              <p className="text-center text-muted-foreground">Loading reviews...</p>
            </div>
          )}
        </div>
      </section>

      {/* Feedback Section with Google Form */}
      <section className="py-16" id="feedback-section" data-animate>
        <div className={`container mx-auto px-4 transition-all duration-1000 ${isVisible['feedback-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Share Your Experience</h2>
              <p className="text-muted-foreground">Your feedback helps us serve you better. Rate us 4+ stars to feature your review!</p>
            </div>
            
            <Card className="shadow-2xl border-2 hover:border-primary transition-all overflow-hidden">
              <CardContent className="p-12 text-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-full shadow-2xl">
                      <Star className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-2">We'd Love Your Feedback!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Share your experience with Rest On Wheels and help other travelers make informed decisions.
                    </p>
                  </div>

                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd08AKRa62fbsqF2yFPmsE3edA6136Z7tgAHt2O1lT2O40A7Q/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      Share Your Experience
                    </Button>
                  </a>

                  <div className="pt-4 border-t border-orange-200">
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      Rate us 4 or 5 stars and your review will be featured on our website!
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
