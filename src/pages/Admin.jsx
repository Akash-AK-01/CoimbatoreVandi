import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Car, MapPin, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PackagesManager } from '@/components/admin/PackagesManager';
import { VehiclesManager } from '@/components/admin/VehiclesManager';
import { DestinationsManager as LocalManager } from '@/components/admin/DestinationsManager';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';
import { BookingsView } from '@/components/admin/BookingsView';

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted/30 py-4 md:py-8">
      <div className="container mx-auto px-2 md:px-4">
        <div className="mb-4 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Admin Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your tours, packages, vehicles, and more</p>
          </div>
          <Button variant="outline" onClick={handleLogout} size="sm" className="self-end md:self-auto">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="dashboard" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
              <Package className="h-4 w-4" />
              <span>Packages</span>
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
              <Car className="h-4 w-4" />
              <span>Vehicles</span>
            </TabsTrigger>
            <TabsTrigger value="destinations" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
              <MapPin className="h-4 w-4" />
              <span>Local</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
              <MessageSquare className="h-4 w-4" />
              <span>Reviews</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <BookingsView />
          </TabsContent>

          <TabsContent value="packages">
            <PackagesManager />
          </TabsContent>

          <TabsContent value="vehicles">
            <VehiclesManager />
          </TabsContent>

            <TabsContent value="destinations">
              <LocalManager />
            </TabsContent>          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
