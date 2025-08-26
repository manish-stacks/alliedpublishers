import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [token]);

  const fetchCart = async () => {
    try {
      const response = await api.get(`/api/cart`, {
        headers: { Authorization: token },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/api/cart/${itemId}`, {
        headers: { Authorization: token },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await api.put(
        `/api/cart/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: token } }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const increaseQuantity = (itemId, currentQuantity) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="flex-1">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-sm rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center gap-4"
                >
                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decreaseQuantity(item._id, item.quantity)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
                      >
                        -
                      </button>
                      <span className="px-4 text-lg text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item._id, item.quantity)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Price and Actions */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="mt-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-600 mt-10">Your cart is empty.</p>
            )}
          </div>

          {/* Price Summary Section */}
          {cart.length > 0 && (
            <div className="w-full lg:w-96 bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Price Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Total</p>
                  <p className="text-gray-800">₹{calculateTotal().toFixed(2)}</p>
                </div>
              </div>

              {/* Proceed to Address Button */}
              <button
                onClick={() => navigate("/address")}
                className="w-full mt-6 px-6 py-3 bg-[#75609c] text-white font-semibold rounded-lg hover:bg-[#5a497a] transition-colors duration-300"
              >
                Proceed to Address
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;