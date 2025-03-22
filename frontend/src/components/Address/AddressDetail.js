


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar"; // Importing Navbar

// const Address = () => {
//   const [user, setUser] = useState({
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   });

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/user", {
//         headers: { Authorization: token },
//       });
//       setUser((prevUser) => ({ ...prevUser, email: response.data.email }));
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5001/api/address", user, {
//         headers: { Authorization: token },
//       });
//       navigate("/payment"); // Redirect to checkout page
//     } catch (error) {
//       console.error("Error saving address:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <Navbar />

//       <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Enter Your Address
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email (Disabled) */}
//           <div>
//             <label className="block text-gray-700 font-semibold">Email:</label>
//             <input
//               type="email"
//               value={user.email}
//               disabled
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           {/* Street */}
//           <div>
//             <label className="block text-gray-700 font-semibold">Street:</label>
//             <input
//               type="text"
//               name="street"
//               value={user.street}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* City */}
//           <div>
//             <label className="block text-gray-700 font-semibold">City:</label>
//             <input
//               type="text"
//               name="city"
//               value={user.city}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* State */}
//           <div>
//             <label className="block text-gray-700 font-semibold">State:</label>
//             <input
//               type="text"
//               name="state"
//               value={user.state}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Zip Code */}
//           <div>
//             <label className="block text-gray-700 font-semibold">Zip Code:</label>
//             <input
//               type="text"
//               name="zipCode"
//               value={user.zipCode}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Save Address Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
//           >
//             Save Address
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Address;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter"; // Importing Navbar

const Address = () => {
  const [user, setUser] = useState({
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/user", {
        headers: { Authorization: token },
      });
      setUser((prevUser) => ({ ...prevUser, email: response.data.email }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/address", user, {
        headers: { Authorization: token },
      });
      navigate("/payment"); // Redirect to checkout page
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-sm rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter Your Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email (Disabled) */}
          <div>
            <label className="block text-gray-700 font-semibold">Email:</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Street */}
          <div>
            <label className="block text-gray-700 font-semibold">Street:</label>
            <input
              type="text"
              name="street"
              value={user.street}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c]"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-semibold">City:</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c]"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-semibold">State:</label>
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c]"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-gray-700 font-semibold">Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={user.zipCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c]"
            />
          </div>

          {/* Save Address Button */}
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