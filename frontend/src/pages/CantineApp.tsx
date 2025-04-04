import React, { useState } from "react";
import { MenuItem, CartItem } from "../types";
import { categories, menuItems } from "../data/menu";
import Header from "../components/Header";
import MenuSection from "../components/MenuSection";
import Cart from "../components/Cart";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';

function CantineApp() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [value, setValue] = React.useState(0);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <MenuSection
          title="Today's Specials"
          items={menuItems.filter((item) => item.isSpecial)}
          onAddToCart={addToCart}
        />

        {/* Tabs for categories */}
      <Box sx={{ bgcolor: 'background.paper', mt: 4, display: 'flex', justifyContent: 'center' }}>
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

      {/* Display items based on selected tab */}
      {categories.map((category, index) => (
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
      ))}
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
