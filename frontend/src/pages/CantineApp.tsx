import React, { useState, useCallback, useEffect } from "react";
import {
  MenuItem,
  CartItem,
  MenuData,
} from "../types";
import { categories } from "../data/menu";
import Header from "../components/Header";
import MenuSection from "../components/MenuSection";
import Cart from "../components/Cart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("token");

function CantineApp() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const [menuData, setMenuData] = useState<MenuData>({
    todaysMenu: null,
    menus: [],
  });

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success("Item added to cart");
    console.log("Item added to cart:", item);
    console.log("Current cart items:", cartItems);
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    //  handle payment processing
    alert("Thank you for your order!");
    setCartItems([]);
    setIsCartOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const menusResponse = await axios.get(`${backendUrl}/api/menus`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const todaysMenuResponse = await axios.get(`${backendUrl}/api/dailymenu/today`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setMenuData({
        todaysMenu: todaysMenuResponse.data,
        menus: menusResponse.data,
      });
      console.log("Today's Menu:", todaysMenuResponse.data);
      console.log("Menus:", menusResponse.data);
      console.log("Menus:", menuData);
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <MenuSection
          menuData={menuData}
          onAddToCart={addToCart}
        />
        {/* <MenuSection
          title="Today's Specials"
          items={menuItems.filter((item) => item.isSpecial)}
          onAddToCart={addToCart}
        />

        <Box
          sx={{
            bgcolor: "background.paper",
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="menu categories"
            centered
          >
            {categories.map((category) => (
              <Tab key={category.id} label={category.name} />
            ))}
          </Tabs>
        </Box>

      
        {categories.map(
          (category, index) =>
            value === index && (
              <MenuSection
                key={category.id}
                title={category.name}
                items={menuItems.filter(
                  (item) => item.category === category.type && !item.isSpecial
                )}
                onAddToCart={addToCart}
              />
            )
        )} */}
      </main>

      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}

export default CantineApp;
