import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dataService, initializeData } from '@/lib/mockData';

export default function Pricing() {
  const [pricing, setPricing] = useState([]);

  useEffect(() => {
    initializeData();
    setPricing(dataService.getPricing());
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pricing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for all our services. No hidden charges!
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-card">
          <CardHeader>
            <CardTitle>Rate Card</CardTitle>
            <CardDescription>All prices are in Indian Rupees (₹)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Service Type</TableHead>
                    <TableHead>Sedan</TableHead>
                    <TableHead>SUV</TableHead>
                    <TableHead>Innova</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricing.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.type}</TableCell>
                      <TableCell>₹{row.sedan}</TableCell>
                      <TableCell>₹{row.suv}</TableCell>
                      <TableCell>₹{row.innova}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-3">Terms & Conditions:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Driver allowance: ₹400 per day (included in package rates)</li>
                <li>• Toll charges, parking fees, and interstate permit charges are extra</li>
                <li>• For outstation trips, minimum billing of 250 km per day applies</li>
                <li>• Night charges (10 PM - 6 AM): Additional 20% on base fare</li>
                <li>• Waiting charges: ₹100 per hour after first 30 minutes</li>
                <li>• Advance booking recommended for guaranteed availability</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
