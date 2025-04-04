import React, { useState } from "react";
import Header from "../components/Header";
import { CartItem } from "../types";

const UserDashboard = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "********",
  });

  const [orders, setOrders] = useState([
    { id: 1, items: ["Burger", "Pizza"], total: 25, status: "Paid" },
    { id: 2, items: ["Pasta", "Salad"], total: 18, status: "Unpaid" },
  ]);

  const handleEditProfile = () => {
    // Handle profile edit logic
    alert("Edit profile clicked");
  };

  return (
    <>
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-20">
        {/* Profile Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Password:</strong> {user.password}
          </p>
          <button
            onClick={handleEditProfile}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>

        {/* Orders Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Order History</h2>
          <div>
            <h3 className="text-lg font-medium">Paid Orders</h3>
            {orders
              .filter((order) => order.status === "Paid")
              .map((order) => (
                <div key={order.id} className="border p-2 rounded my-2">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Items:</strong> {order.items.join(", ")}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                </div>
              ))}
          </div>
          <div>
            <h3 className="text-lg font-medium mt-4">Unpaid Orders</h3>
            {orders
              .filter((order) => order.status === "Unpaid")
              .map((order) => (
                <div
                  key={order.id}
                  className="border p-2 rounded my-2 bg-red-100"
                >
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Items:</strong> {order.items.join(", ")}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                    Pay Now
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
