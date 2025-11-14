import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Coimbatore Vandi</h3>
            <p className="text-muted-foreground">
              Your trusted ride across Tamil Nadu. Professional car rental services for all your travel needs.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-muted-foreground hover:text-primary transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Ooty
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Kodaikanal
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Munnar
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Valparai
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Isha Yoga Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+919444649850" className="hover:text-primary transition-colors">
                  +91 94446 49850
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@restonwheels.in" className="hover:text-primary transition-colors">
                  hello@restonwheels.in
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Gandhipuram, Coimbatore - 641012</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; 2025 Coimbatore Vandi. Made with ❤️ in Tamil Nadu.</p>
        </div>
      </div>
    </footer>
  );
}
