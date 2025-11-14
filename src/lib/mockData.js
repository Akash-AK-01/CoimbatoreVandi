// Mock data for the application (localStorage based)

const STORAGE_KEYS = {
  PACKAGES: 'cv_packages',
  VEHICLES: 'cv_vehicles',
  DESTINATIONS: 'cv_destinations',
  BOOKINGS: 'cv_bookings',
  TESTIMONIALS: 'cv_testimonials',
  PRICING: 'cv_pricing'
};

// Initialize default data
const defaultPackages = [
  {
    id: '1',
    name: 'Ooty Hill Station Tour',
    description: 'Experience the Queen of Hill Stations with scenic views, botanical gardens, and cool climate.',
    duration: '2 Days 1 Night',
    price: 8500,
    destinations: ['Ooty', 'Coonoor', 'Botanical Gardens'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    includes: ['Fuel', 'Driver allowance', 'Parking fees', 'Toll charges'],
    maxPassengers: 4
  },
  {
    id: '2',
    name: 'Kodaikanal Nature Escape',
    description: 'Explore the Princess of Hill Stations with lakes, waterfalls, and misty mountains.',
    duration: '2 Days 1 Night',
    price: 9000,
    destinations: ['Kodaikanal Lake', 'Coakers Walk', 'Bryant Park'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    includes: ['Fuel', 'Driver allowance', 'Parking fees', 'Toll charges'],
    maxPassengers: 7
  },
  {
    id: '3',
    name: 'Munnar Tea Garden Tour',
    description: 'Visit Kerala\'s tea country with sprawling plantations and wildlife sanctuaries.',
    duration: '3 Days 2 Nights',
    price: 12000,
    destinations: ['Munnar', 'Tea Museum', 'Eravikulam National Park'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    includes: ['Fuel', 'Driver allowance', 'Parking fees', 'Toll charges', 'Accommodation'],
    maxPassengers: 7
  }
];

const defaultVehicles = [
  {
    id: '1',
    name: 'Swift Dzire',
    type: 'Sedan',
    seats: 4,
    features: ['AC', 'Music System', 'Comfortable Seats'],
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    available: true
  },
  {
    id: '2',
    name: 'Toyota Innova',
    type: 'MUV',
    seats: 7,
    features: ['AC', 'Music System', 'Spacious', 'Luggage Space'],
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    available: true
  },
  {
    id: '3',
    name: 'Innova Crysta',
    type: 'Premium MUV',
    seats: 7,
    features: ['Premium AC', 'Leather Seats', 'Push Start', 'Advanced Safety'],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    available: true
  }
];

const defaultDestinations = [
  {
    id: '1',
    name: 'Ooty',
    description: 'The Queen of Hill Stations',
    distance: '85 km',
    highlights: ['Botanical Gardens', 'Ooty Lake', 'Tea Gardens'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
  },
  {
    id: '2',
    name: 'Valparai',
    description: 'Hidden Hill Station Gem',
    distance: '110 km',
    highlights: ['Coffee Estates', 'Wildlife', 'Scenic Views'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
  },
  {
    id: '3',
    name: 'Airport Transfer',
    description: 'Coimbatore Airport Pickup & Drop',
    distance: '15 km',
    highlights: ['On-time Service', '24/7 Available', 'Safe & Comfortable'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'
  }
];

const defaultTestimonials = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Coimbatore',
    rating: 5,
    review: 'Best experience ever! The driver was very professional and the car was in excellent condition. Highly recommend Rest On Wheels for Ooty trips. Worth every penny!',
    date: '2024-12-15'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Chennai',
    rating: 5,
    review: 'Amazing service! Very comfortable ride with great quality vehicles. The driver was friendly and knew all the scenic routes. Will definitely book again for future trips.',
    date: '2024-12-10'
  },
  {
    id: '3',
    name: 'Arun Prakash',
    location: 'Bangalore',
    rating: 5,
    review: 'My best experience with a taxi service! Rest On Wheels made our family trip to Kodaikanal unforgettable. Clean vehicle, punctual service, and excellent driver. Top quality service!',
    date: '2024-11-28'
  },
  {
    id: '4',
    name: 'Divya Menon',
    location: 'Coimbatore',
    rating: 4,
    review: 'Great quality service for local sightseeing. Driver was very helpful and showed us hidden gems we didn\'t know about. Car was well-maintained and comfortable. Good experience overall!',
    date: '2024-11-20'
  },
  {
    id: '5',
    name: 'Suresh Babu',
    location: 'Erode',
    rating: 5,
    review: 'Absolutely fantastic! Booked for Munnar trip and everything was perfect. Professional driver, clean Innova, and fair pricing. Best quality taxi service in Coimbatore. They take care of everything!',
    date: '2024-11-15'
  },
  {
    id: '6',
    name: 'Lakshmi Venkat',
    location: 'Tirupur',
    rating: 5,
    review: 'My best trip ever! Valparai weekend getaway was amazing thanks to Rest On Wheels. Smooth ride, knowledgeable driver, excellent vehicle quality. Highly satisfied with the experience!',
    date: '2024-11-05'
  },
  {
    id: '7',
    name: 'Mohamed Iqbal',
    location: 'Pollachi',
    rating: 4,
    review: 'Very reliable and good quality service. Used them for business trip to Coimbatore airport. On-time pickup and drop, professional driver. Great experience and reasonable rates.',
    date: '2024-10-25'
  },
  {
    id: '8',
    name: 'Anitha Ravi',
    location: 'Salem',
    rating: 5,
    review: 'Best service quality! Our Ooty trip was perfect thanks to Rest On Wheels. Clean car, safe driving, and reasonable rates. The driver even helped us book hotels. Excellent experience overall!',
    date: '2024-10-18'
  }
];

const defaultPricing = [
  {
    id: '1',
    type: 'Local (8 hrs / 80 km)',
    sedan: 1500,
    suv: 2000,
    innova: 2500
  },
  {
    id: '2',
    type: 'Outstation (Per Day)',
    sedan: 2500,
    suv: 3500,
    innova: 4000
  },
  {
    id: '3',
    type: 'Airport Transfer',
    sedan: 800,
    suv: 1200,
    innova: 1500
  }
];

// Force refresh to update images to local assets
export function forceRefreshData() {
  localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(defaultPackages));
  localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(defaultVehicles));
  localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(defaultDestinations));
  console.log('Data refreshed with local images');
}

// Initialize localStorage with default data if not exists
export function initializeData() {
  // Check if we need to force refresh (kept price, removed vehicle details)
  const needsRefresh = localStorage.getItem('images_updated') !== 'v5';
  
  if (needsRefresh || !localStorage.getItem(STORAGE_KEYS.PACKAGES)) {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(defaultPackages));
  }
  if (needsRefresh || !localStorage.getItem(STORAGE_KEYS.VEHICLES)) {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(defaultVehicles));
  }
  if (needsRefresh || !localStorage.getItem(STORAGE_KEYS.DESTINATIONS)) {
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(defaultDestinations));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(defaultTestimonials));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRICING)) {
    localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(defaultPricing));
  }
  
  if (needsRefresh) {
    localStorage.setItem('images_updated', 'v5');
    console.log('localStorage updated - kept price, removed vehicle details');
  }
}

// CRUD operations
export const dataService = {
  // Packages
  getPackages: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.PACKAGES) || '[]'),
  savePackage: (pkg) => {
    const packages = dataService.getPackages();
    if (pkg.id) {
      const index = packages.findIndex(p => p.id === pkg.id);
      packages[index] = pkg;
    } else {
      pkg.id = Date.now().toString();
      packages.push(pkg);
    }
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    return pkg;
  },
  deletePackage: (id) => {
    const packages = dataService.getPackages().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  },

  // Vehicles
  getVehicles: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.VEHICLES) || '[]'),
  saveVehicle: (vehicle) => {
    const vehicles = dataService.getVehicles();
    if (vehicle.id) {
      const index = vehicles.findIndex(v => v.id === vehicle.id);
      vehicles[index] = vehicle;
    } else {
      vehicle.id = Date.now().toString();
      vehicles.push(vehicle);
    }
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
    return vehicle;
  },
  deleteVehicle: (id) => {
    const vehicles = dataService.getVehicles().filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  },

  // Destinations
  getDestinations: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.DESTINATIONS) || '[]'),
  saveDestination: (dest) => {
    const destinations = dataService.getDestinations();
    if (dest.id) {
      const index = destinations.findIndex(d => d.id === dest.id);
      destinations[index] = dest;
    } else {
      dest.id = Date.now().toString();
      destinations.push(dest);
    }
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
    return dest;
  },
  deleteDestination: (id) => {
    const destinations = dataService.getDestinations().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
  },

  // Bookings
  getBookings: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]'),
  saveBooking: (booking) => {
    const bookings = dataService.getBookings();
    booking.id = Date.now().toString();
    booking.date = new Date().toISOString();
    bookings.push(booking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return booking;
  },

  // Testimonials
  getTestimonials: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.TESTIMONIALS) || '[]'),
  saveTestimonial: (testimonial) => {
    const testimonials = dataService.getTestimonials();
    testimonial.id = Date.now().toString();
    testimonial.date = new Date().toISOString().split('T')[0];
    testimonials.push(testimonial);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    return testimonial;
  },
  deleteTestimonial: (id) => {
    const testimonials = dataService.getTestimonials().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  },

  // Pricing
  getPricing: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICING) || '[]'),
  updatePricing: (pricing) => {
    localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(pricing));
  }
};
