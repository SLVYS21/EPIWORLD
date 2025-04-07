
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Coffee, Clock, CheckCircle, XCircle } from "lucide-react";

const CafeteriaAdmin = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cafeteria Management</h1>
          <Button className="bg-cafeteria hover:bg-cafeteria/90">
            <Plus className="mr-2 h-4 w-4" /> Add Menu Item
          </Button>
        </div>

        <Tabs defaultValue="menu">
          <TabsList>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="daily">Daily Menu</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between">
                      <span>Item #{index + 1}</span>
                      <span className="text-cafeteria">${(Math.random() * 10 + 2).toFixed(2)}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      <Coffee className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium">
                      {["Cheeseburger", "Veggie Wrap", "Caesar Salad", "Chicken Sandwich", "Pizza Slice", "French Fries"][index % 6]}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="daily" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Menu (April 6, 2025)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                      <Coffee className="h-5 w-5 text-cafeteria" />
                      <span>Monday Special - Pasta Day</span>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium">Breakfast</h3>
                      <ul className="mt-2 space-y-2">
                        <li>Eggs & Toast - $3.99</li>
                        <li>Oatmeal - $2.50</li>
                        <li>Fruit Parfait - $4.25</li>
                      </ul>
                    </div>
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium">Lunch</h3>
                      <ul className="mt-2 space-y-2">
                        <li>Spaghetti & Meatballs - $8.99</li>
                        <li>Fettuccine Alfredo - $7.50</li>
                        <li>Vegetable Lasagna - $9.25</li>
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full">Update Daily Menu</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Order #{1000 + index}</p>
                        <div className="text-sm text-muted-foreground mt-1">
                          {["Cheeseburger & Fries", "Veggie Wrap & Salad", "Pizza Combo", "Chicken Meal", "Daily Special"][index]}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">
                            {["2 minutes ago", "15 minutes ago", "32 minutes ago", "45 minutes ago", "1 hour ago"][index]}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {index < 2 ? (
                          <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs text-yellow-800">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </span>
                        ) : index < 4 ? (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-800">
                            <Coffee className="mr-1 h-3 w-3" />
                            Preparing
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Ready
                          </span>
                        )}
                        <div className="flex gap-1">
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default CafeteriaAdmin;
