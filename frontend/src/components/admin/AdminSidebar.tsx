
import React from "react";
import { NavLink } from "react-router-dom";
import { Coffee, Package, MessageSquare, LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AdminSidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      color: "text-primary",
    },
    {
      title: "Cafeteria",
      icon: Coffee,
      path: "/admin/cafeteria",
      color: "text-cafeteria",
    },
    {
      title: "Lost & Found",
      icon: Package,
      path: "/admin/lost-found",
      color: "text-lost",
    },
    {
      title: "Forum",
      icon: MessageSquare,
      path: "/admin/forum",
      color: "text-forum",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center">
          <div className="mr-2">
            <SidebarTrigger />
          </div>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => `flex items-center gap-3 ${isActive ? 'font-medium ' + item.color : ''}`}
                      end={item.path === "/admin"}
                    >
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-xs text-gray-500">EpiWorld © 2025</p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
