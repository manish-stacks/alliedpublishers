


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch cart data when the component mounts or the token changes
//   useEffect(() => {
//     fetchCart();
//   }, [token]);

//   // Fetch cart data from the backend
//   const fetchCart = async () => {
//     try {
//       const response = await axios.get("${process.env.REACT_APP_BACKEND_URL}/api/cart", {
//         headers: { Authorization: token },
//       });
//       setCart(response.data);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   // Remove an item from the cart
//   const removeItem = async (itemId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${itemId}`, {
//         headers: { Authorization: token },
//       });
//       fetchCart(); // Refresh the cart after removing the item
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // Update the quantity of an item in the cart
//   const updateQuantity = async (itemId, newQuantity) => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_BACKEND_URL}/api/cart/${itemId}`,
//         { quantity: newQuantity },
//         { headers: { Authorization: token } }
//       );
//       fetchCart(); // Refresh the cart after updating the quantity
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   // Increase the quantity of an item
//   const increaseQuantity = (itemId, currentQuantity) => {
//     updateQuantity(itemId, currentQuantity + 1);
//   };

//   // Decrease the quantity of an item
//   const decreaseQuantity = (itemId, currentQuantity) => {
//     if (currentQuantity > 1) {
//       updateQuantity(itemId, currentQuantity - 1);
//     }
//   };

//   // Calculate the total price of all items in the cart
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       return total + item.price * item.quantity;
//     }, 0);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar Component */}
//       <Navbar />

//       <div className="max-w-4xl mx-auto p-4">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Cart</h1>

//         {cart.length > 0 ? (
//           <>
//             {/* Display cart items */}
//             {cart.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
//               >
//                 <div>
//                   <h3 className="text-lg font-semibold">{item.name}</h3>
//                   <p className="text-gray-600">Price: ₹{item.price}</p>
//                   <div className="flex items-center mt-2">
//                     <button
//                       onClick={() => decreaseQuantity(item._id, item.quantity)}
//                       disabled={item.quantity <= 1}
//                       className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
//                     >
//                       -
//                     </button>
//                     <span className="px-4 text-lg">{item.quantity}</span>
//                     <button
//                       onClick={() => increaseQuantity(item._id, item.quantity)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="text-gray-700 mt-2">
//                     Total: ₹{(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => removeItem(item._id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}

//             {/* Display total price */}
//             <div className="text-right text-xl font-semibold mt-6">
//               <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
//             </div>

//             {/* Proceed to Address Button */}
//             <button
//               onClick={() => navigate("/address")}
//               className="w-full mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
//             >
//               Proceed to Address
//             </button>
//           </>
//         ) : (
//           // Display message if the cart is empty
//           <p className="text-center text-lg text-gray-600 mt-10">Your cart is empty.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart`, {
        headers: { Authorization: token },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${itemId}`, {
        headers: { Authorization: token },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/${itemId}`,
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