
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package, Search, CheckCircle, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LostFoundAdmin = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Lost & Found Management</h1>
          <Button className="bg-lost hover:bg-lost/90">
            <Package className="mr-2 h-4 w-4" /> Register New Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Found Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">28</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Still Missing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">14</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Items Registry</CardTitle>
            <div className="flex items-center gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search items..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">#LF-{1000 + index}</TableCell>
                    <TableCell>
                      {["Blue Backpack", "Water Bottle", "Student ID Card", "Laptop", "Textbook"][index]}
                    </TableCell>
                    <TableCell>
                      {["Library", "Cafeteria", "Main Hall", "Classroom 101", "Gym"][index]}
                    </TableCell>
                    <TableCell>
                      {index % 3 === 0 ? (
                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs text-yellow-800">Missing</span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs text-green-800">Found</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {["Apr 5, 2025", "Apr 4, 2025", "Apr 3, 2025", "Apr 2, 2025", "Apr 1, 2025"][index]}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                        {index % 3 === 0 ? (
                          <Button size="sm" variant="outline" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 mt-4">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default LostFoundAdmin;
