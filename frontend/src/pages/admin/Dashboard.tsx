
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Package, MessageSquare, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cafeteria Orders</CardTitle>
              <Coffee className="h-4 w-4 text-cafeteria" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lost Items</CardTitle>
              <Package className="h-4 w-4 text-lost" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +2 new today
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Forum Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-forum" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +24% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <Coffee className="h-5 w-5 text-cafeteria" />
                    <span>New cafeteria menu added</span>
                  </div>
                  <span className="text-sm text-muted-foreground">2h ago</span>
                </li>
                <li className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-lost" />
                    <span>3 items marked as found</span>
                  </div>
                  <span className="text-sm text-muted-foreground">5h ago</span>
                </li>
                <li className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-forum" />
                    <span>New forum thread created</span>
                  </div>
                  <span className="text-sm text-muted-foreground">12h ago</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Coffee className="h-5 w-5 text-cafeteria" />
                    <span>25 new orders placed</span>
                  </div>
                  <span className="text-sm text-muted-foreground">1d ago</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-cafeteria hover:bg-cafeteria/90">
                  <Coffee className="mr-2 h-4 w-4" /> Update Menu
                </Button>
                <Button className="w-full bg-lost hover:bg-lost/90">
                  <Package className="mr-2 h-4 w-4" /> Add Lost Item
                </Button>
                <Button className="w-full bg-forum hover:bg-forum/90">
                  <MessageSquare className="mr-2 h-4 w-4" /> Moderate Posts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
