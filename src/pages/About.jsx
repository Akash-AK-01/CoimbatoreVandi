import { Car, Users, Award, Heart, Target, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const values = [
    { icon: Target, title: 'Our Mission', desc: 'To provide safe, comfortable, and affordable travel experiences across Tamil Nadu' },
    { icon: Eye, title: 'Our Vision', desc: 'To be the most trusted and preferred travel partner in South India' },
    { icon: Heart, title: 'Our Values', desc: 'Customer satisfaction, safety, transparency, and excellence in service' }
  ];

  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '50+', label: 'Premium Vehicles' },
    { number: '10+', label: 'Years Experience' },
    { number: '100+', label: 'Destinations' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Coimbatore Vandi</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Your trusted travel partner in Coimbatore since 2014
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Coimbatore Vandi started in 2014 with a simple vision: to make travel across Tamil Nadu comfortable, 
              safe, and memorable. What began as a small fleet of 5 cars has now grown into a trusted brand with 
              over 50 premium vehicles serving thousands of satisfied customers.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Based in Coimbatore, we specialize in tour packages to popular destinations like Ooty, Kodaikanal, 
              Munnar, Valparai, and temple tours across Tamil Nadu and Kerala. Our professional drivers are not 
              just chauffeurs—they're your local guides who know every route, every scenic spot, and every hidden gem.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to be one of the most reviewed and recommended car rental services in Coimbatore, 
              with a commitment to transparency, safety, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-8">
                  <v.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                  <p className="text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-primary mb-2">{s.number}</div>
                <div className="text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Car, title: 'Premium Fleet', desc: 'Well-maintained, sanitized vehicles' },
              { icon: Users, title: 'Expert Drivers', desc: 'Professional & courteous staff' },
              { icon: Award, title: 'Best Rates', desc: 'Transparent pricing, no hidden costs' },
              { icon: Heart, title: '24/7 Support', desc: 'Always here to help you' }
            ].map((f, i) => (
              <Card key={i} className="hover:shadow-hover transition-shadow">
                <CardContent className="p-6 text-center">
                  <f.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h4 className="font-semibold mb-2">{f.title}</h4>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
