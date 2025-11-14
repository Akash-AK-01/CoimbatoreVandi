import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Package, Car, MapPin, Phone, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import logo from '@/assets/logo.png';

export function Header() {
  const location = useLocation();
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/packages', label: 'Tour Packages', icon: Package },
    { path: '/vehicles', label: 'Cars', icon: Car },
    { path: '/destinations', label: 'Local', icon: MapPin },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone }
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all ${solid ? 'bg-white/95 backdrop-blur-md shadow' : 'bg-transparent backdrop-blur-sm'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Rest On Wheels" className="h-12 w-auto" />
          <span className="hidden md:inline-block font-semibold text-lg">Rest On Wheels</span>
        </Link>

        {/* Centered nav */}
        <nav className="hidden lg:flex items-center gap-6 mx-auto">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`px-3 py-2 rounded-md transition-colors ${isActive(link.path) ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <Link to="/contact">
            <Button className="hidden md:inline-flex">Book Now</Button>
          </Link>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.path}>
                    <Link to={link.path} onClick={() => setMobileOpen(false)}>
                      <Button variant={isActive(link.path) ? 'default' : 'ghost'} className="w-full justify-start gap-2">
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Button>
                    </Link>
                  </SheetClose>
                ))}

                <div className="mt-4 pt-4 border-t">
                  <SheetClose asChild>
                    <Link to="/contact" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full">Book Now</Button>
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
