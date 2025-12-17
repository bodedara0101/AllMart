import React, { useEffect, useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  ArrowLeft,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "/api/placeholder/200/200",
      color: "Phantom Black",
      size: "M",
      saved: false,
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 399.99,
      quantity: 1,
      image: "/api/placeholder/200/200",
      color: "Silver",
      size: "One Size",
      saved: false,
    },
  ]);

  const navigate = useNavigate();


  const [isCartOpen, setIsCartOpen] = useState(true);


  useEffect(() => {
    const user = localStorage.getItem("user");
    const userInfo = JSON.parse(user);
    const token = localStorage.getItem("token");
    if(!token) navigate("/");
  }, [])
  
  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const toggleSaved = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => {
      const itemToRemove = document.getElementById(`cart-item-${id}`);
      itemToRemove.classList.add("animate-fadeOut");

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(prevItems.filter((item) => item.id !== id));
        }, 300);
      });
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 15.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <ShoppingBag className="w-16 h-16 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="text-gray-600">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5"/>
              </button>
              <div className="flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2" />
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {cartItems.length} items
              </span>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              id={`cart-item-${item.id}`}
              className="group flex items-center space-x-6 p-4 bg-white border rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 animate-fadeIn"
            >
              <div className="relative w-24 h-24 overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors duration-200">
                      {item.name}
                    </h3>
                    <div className="text-sm text-gray-600 mt-1 space-x-4">
                      <span className="inline-flex items-center">
                        <div className="w-3 h-3 rounded-full bg-black mr-1"></div>
                        {item.color}
                      </span>
                      <span>Size: {item.size}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white rounded-md transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white rounded-md transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleSaved(item.id)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        item.saved
                          ? "text-red-500 bg-red-50"
                          : "text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          item.saved ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t bg-gray-50 p-6">
          <div className="max-w-lg mx-auto">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <div>
                  <span>Shipping</span>
                  {shipping === 0 && (
                    <span className="ml-2 text-green-500 text-sm">Free</span>
                  )}
                </div>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
              Proceed to Checkout
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Free shipping on orders over $500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
