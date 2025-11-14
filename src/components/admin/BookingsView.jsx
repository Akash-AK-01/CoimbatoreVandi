import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dataService } from '@/lib/mockData';

export function BookingsView() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalVehicles: 0,
    totalDestinations: 0,
    totalBookings: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const packages = dataService.getPackages();
    const vehicles = dataService.getVehicles();
    const destinations = dataService.getDestinations();
    const bookingsData = dataService.getBookings();

    setBookings(bookingsData);
    setStats({
      totalPackages: packages.length,
      totalVehicles: vehicles.length,
      totalDestinations: destinations.length,
      totalBookings: bookingsData.length
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{stats.totalPackages}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{stats.totalVehicles}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{stats.totalDestinations}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{stats.totalBookings}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {bookings.slice(-10).reverse().map((booking) => (
                <div key={booking.id} className="p-3 border rounded-lg">
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-sm text-muted-foreground">{booking.package}</p>
                  <p className="text-xs text-muted-foreground">{new Date(booking.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
