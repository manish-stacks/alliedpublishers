import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";

const Address = () => {
  const [user, setUser] = useState({
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [defaultDeliveryCharge, setDefaultDeliveryCharge] = useState(0); // State for default delivery charge

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchCartTotal();
    fetchDefaultDeliveryCharge(); // Fetch default delivery charge
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/api/user`, {
        headers: { Authorization: token },
      });
      setUser((prevUser) => ({ ...prevUser, email: response.data.email }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    
  };

  const fetchCartTotal = async () => {
    try {
      const response = await api.get(`/api/cart/total`, {
        headers: { Authorization: token },
      });
      setCartTotal(response.data.cartTotal);
      setDeliveryCharge(response.data.deliveryCharges);
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      console.error("Error fetching cart total:", error);
    }
  };
  

  const fetchDefaultDeliveryCharge = async () => {
    try {
      const response = await api.get(`/api/delivery/default`);
      setDefaultDeliveryCharge(response.data.defaultCharge);
    } catch (error) {
      console.error("Error fetching default delivery charge:", error);
    }
  };
  

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  
    if (name === "zipCode" && value.length === 6) {
      try {
        // Fetch delivery charge for the entered pincode
        const response = await api.get(`/api/delivery/${value}`);
        setDeliveryCharge(response.data.charge); // Use the fetched charge
        setTotalAmount(cartTotal + response.data.charge);
      } catch (error) {
        console.error("Error fetching delivery charge:", error);
  
        // Use the default delivery charge if the pincode is not found
        if (error.response?.status === 404) {
          setDeliveryCharge(defaultDeliveryCharge);
          setTotalAmount(cartTotal + defaultDeliveryCharge);
        } else {
          // Handle other errors
          setDeliveryCharge(0);
          setTotalAmount(cartTotal);
        }
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        `/api/address`,
        { ...user, deliveryCharges: deliveryCharge },
        { headers: { Authorization: token } }
      );
      // Pass totalAmount to the Payment page
      navigate("/payment", { state: { totalAmount } });
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Enter Your Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Street:</label>
            <input
              type="text"
              name="street"
              value={user.street}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">City:</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">State:</label>
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={user.zipCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] focus:border-transparent"
            />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <p className="text-gray-700">Cart Total: ₹{cartTotal}</p>
              <p className="text-gray-700">Delivery Charges: ₹{deliveryCharge}</p>
              <p className="text-lg font-bold text-gray-800">Total Amount: ₹{totalAmount}</p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#75609c] text-white font-semibold rounded-lg hover:bg-[#5a497a] transition-colors duration-300"
          >
            Save Address
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Address;