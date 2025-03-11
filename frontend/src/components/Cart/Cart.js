// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const token = localStorage.getItem("token");

//   // Fetch cart data
//   useEffect(() => {
//     fetchCart();
//   }, [token]);

//   const fetchCart = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/cart", {
//         headers: { Authorization: token },
//       });
//       setCart(response.data);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   // Remove item from cart
//   const removeItem = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/cart/${itemId}`, {
//         headers: { Authorization: token },
//       });
//       // Refresh the cart after removal
//       fetchCart();
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // Calculate total price
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       return total + (item.itemId?.price || 0) * item.quantity;
//     }, 0);
//   };

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cart.length > 0 ? (
//         <>
//           {cart.map((item) => (
//             <div key={item._id}>
//               <h3>{item.itemId?.title || "Unknown Item"}</h3>
//               <p>Quantity: {item.quantity}</p>
//               <p>
//                 Price: $
//                 {item.itemId?.price ? item.itemId.price * item.quantity : "N/A"}
//               </p>
//               <button onClick={() => removeItem(item._id)}>Remove</button>
//             </div>
//           ))}
//           <h3>Total: ${calculateTotal()}</h3>
//         </>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Cart.css"; // Import the CSS file

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const token = localStorage.getItem("token");

//   // Fetch cart data
//   useEffect(() => {
//     fetchCart();
//   }, [token]);

//   const fetchCart = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/cart", {
//         headers: { Authorization: token },
//       });
//       setCart(response.data);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   // Remove item from cart
//   const removeItem = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/cart/${itemId}`, {
//         headers: { Authorization: token },
//       });
//       // Refresh the cart after removal
//       fetchCart();
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // Calculate total price
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       return total + (item.itemId?.price || 0) * item.quantity;
//     }, 0);
//   };

//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>
//       {cart.length > 0 ? (
//         <>
//           {cart.map((item) => (
//             <div className="cart-item" key={item._id}>
//               <div>
//                 <h3>{item.itemId?.title || "Unknown Item"}</h3>
//                 <p>Quantity: {item.quantity}</p>
//                 <p>
//                   Price: Rs.
//                   {item.itemId?.price ? item.itemId.price * item.quantity : "N/A"}
//                 </p>
//               </div>
//               <button onClick={() => removeItem(item._id)}>Remove</button>
//             </div>
//           ))}
//           <div className="cart-total">
//             <h3>Total: Rs.{calculateTotal()}</h3>
//           </div>
//         </>
//       ) : (
//         <p className="empty-cart">Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css"; // Import the CSS file

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch cart data
  useEffect(() => {
    fetchCart();
  }, [token]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/cart", {
        headers: { Authorization: token },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5001/api/cart/${itemId}`, {
        headers: { Authorization: token },
      });
      // Refresh the cart after removal
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(
        `http://localhost:5001/api/cart/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: token } }
      );
      // Refresh the cart after updating quantity
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Increase quantity
  const increaseQuantity = (itemId, currentQuantity) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.itemId?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <div>
                <h3>{item.itemId?.title || "Unknown Item"}</h3>
                <p>Price: ${item.itemId?.price || "N/A"}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item._id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id, item.quantity)}>
                    +
                  </button>
                </div>
                <p>Total: ${item.itemId?.price * item.quantity || "N/A"}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${calculateTotal()}</h3>
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;