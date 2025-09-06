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
  const [defaultDeliveryCharge, setDefaultDeliveryCharge] = useState(0);
  const [isCityStateDisabled, setIsCityStateDisabled] = useState(false);
  const [pinError, setPinError] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchCartTotal();
    fetchDefaultDeliveryCharge();
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

  // Indian pin code regex: 6 digits, not starting with 0
  const isValidIndianPinCode = (pin) => /^[1-9][0-9]{5}$/.test(pin);

  // Fetch city and state for pin code
  const fetchCityStateByPincode = async (pin) => {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      if (
        data &&
        data[0]?.Status === "Success" &&
        data[0].PostOffice &&
        data[0].PostOffice.length > 0
      ) {
        const postOffice = data[0].PostOffice[0];
        setUser((prevUser) => ({
          ...prevUser,
          city: postOffice.District || "",
          state: postOffice.State || "",
        }));
        setIsCityStateDisabled(true);
        fetchDeliveryChargeByState(postOffice.State);
      } else {
        setIsCityStateDisabled(false);
        setDeliveryCharge(defaultDeliveryCharge);
        setTotalAmount(cartTotal + defaultDeliveryCharge);
      }
    } catch (error) {
      setIsCityStateDisabled(false);
      setDeliveryCharge(defaultDeliveryCharge);
      setTotalAmount(cartTotal + defaultDeliveryCharge);
      console.error("Error fetching city/state from pincode:", error);
    }
  };

  // Fetch delivery charge based on state
  const fetchDeliveryChargeByState = async (state) => {
    try {
      const response = await api.get(`/api/delivery/${encodeURIComponent(state)}`);
      setDeliveryCharge(response.data.charge);
      setTotalAmount(cartTotal + response.data.charge);
    } catch (error) {
      setDeliveryCharge(defaultDeliveryCharge);
      setTotalAmount(cartTotal + defaultDeliveryCharge);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "zipCode") {
      setIsCityStateDisabled(false);
      if (value.length === 6) {
        if (!isValidIndianPinCode(value)) {
          setPinError("Pin code must be 6 digits and not start with 0.");
          setDeliveryCharge(defaultDeliveryCharge);
          setTotalAmount(cartTotal + defaultDeliveryCharge);
        } else {
          setPinError("");
          await fetchCityStateByPincode(value);
        }
      } else {
        setPinError("");
        setDeliveryCharge(defaultDeliveryCharge);
        setTotalAmount(cartTotal + defaultDeliveryCharge);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidIndianPinCode(user.zipCode)) {
      setPinError("Please enter a valid pin code before proceeding.");
      return;
    }
    try {
      await api.post(
        `/api/address`,
        { ...user, deliveryCharges: deliveryCharge },
        { headers: { Authorization: token } }
      );
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
            <label className="block text-gray-700 font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Zip Code:
            </label>
            <input
              type="text"
              name="zipCode"
              value={user.zipCode}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border ${
                pinError ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-[#75609c] focus:border-transparent`}
            />
            {pinError && <p className="text-red-600 mt-2">{pinError}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Street:
            </label>
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
            <label className="block text-gray-700 font-semibold mb-2">
              City:
            </label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              required
              disabled={isCityStateDisabled}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] focus:border-transparent ${
                isCityStateDisabled ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              State:
            </label>
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              required
              disabled={isCityStateDisabled}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] focus:border-transparent ${
                isCityStateDisabled ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">Cart Total: ₹{cartTotal}</p>
              <p className="text-gray-700">Delivery Charges: ₹{deliveryCharge}</p>
              <p className="text-lg font-bold text-gray-800">
                Total Amount: ₹{totalAmount}
              </p>
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
