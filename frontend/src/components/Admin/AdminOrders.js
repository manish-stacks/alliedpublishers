import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Importing Sidebar

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // Updated to handle both images and PDFs
  const [invoice, setInvoice] = useState({});
  const [tracking, setTracking] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (userId, orderIndex, status) => {
    if (status === "Dispatched" && (!invoice[orderIndex] || !tracking[orderIndex])) {
      alert("Please upload invoice and enter tracking details before dispatching.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("orderIndex", orderIndex);
      formData.append("status", status);
      formData.append("tracking", tracking[orderIndex]);
      formData.append("invoice", invoice[orderIndex]); // Append the file

      await axios.post("http://localhost:5001/api/admin/update-status", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Function to handle file viewing
  const handleViewFile = (fileUrl) => {
    setSelectedFile(fileUrl);
  };

  // Function to close the file viewer
  const handleCloseFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-64 p-4 lg:p-8"> {/* Adjusted padding and margin for responsiveness */}
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Admin Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">No pending orders.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
            <table className="w-full text-sm lg:text-base"> {/* Reduced font size for smaller screens */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Order ID</th>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Name</th>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Email</th>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Address</th>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Payment Screenshot</th>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Cart Items</th>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Status</th>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((user) =>
                  user.orders.map((order, orderIndex) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-2 lg:p-4 text-gray-700">{order.orderId || "N/A"}</td>
                      <td className="p-2 lg:p-4 text-gray-700">{user.name}</td>
                      <td className="p-2 lg:p-4 text-gray-700">{user.email}</td>
                      <td className="p-2 lg:p-4 text-gray-700">
                        {user.address.street}, {user.address.city}, {user.address.state}, {user.address.zipCode}
                      </td>
                      <td className="p-2 lg:p-4">
                        <button
                          onClick={() => handleViewFile(`http://localhost:5001${order.payment.screenshot}`)}
                          className="bg-[#75609c] text-white px-2 py-1 rounded-lg hover:bg-[#5a497a] transition-colors text-xs lg:text-sm"
                        >
                          View
                        </button>
                      </td>
                      <td className="p-2 lg:p-4 text-gray-700">
                        {order.cart.map((item) => (
                          <div key={item._id} className="text-xs lg:text-sm">
                            {item.name} - ₹{item.price} x {item.quantity}
                          </div>
                        ))}
                        <div className="font-semibold mt-1 lg:mt-2 text-xs lg:text-sm">
                          Grand Total: ₹{order.cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                        </div>
                      </td>
                      <td className="p-2 lg:p-4 text-gray-700 text-xs lg:text-sm">{order.payment.status}</td>
                      <td className="p-2 lg:p-4 space-y-1 lg:space-y-2">
                        {order.payment.status === "Pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(user._id, orderIndex, "Approved")}
                              className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors text-xs lg:text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(user._id, orderIndex, "Cancelled")}
                              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs lg:text-sm"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {order.payment.status === "Approved" && (
                          <>
                            <input
                              type="text"
                              placeholder="Tracking Details"
                              className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] text-xs lg:text-sm"
                              onChange={(e) => setTracking({ ...tracking, [orderIndex]: e.target.value })}
                            />
                            <input
                              type="file"
                              className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] text-xs lg:text-sm"
                              onChange={(e) => setInvoice({ ...invoice, [orderIndex]: e.target.files[0] })}
                            />
                            <button
                              onClick={() => updateStatus(user._id, orderIndex, "Dispatched")}
                              className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors text-xs lg:text-sm"
                            >
                              Dispatch
                            </button>
                          </>
                        )}
                        {order.payment.status === "Dispatched" && (
                          <button
                            onClick={() => updateStatus(user._id, orderIndex, "Delivered")}
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors text-xs lg:text-sm"
                          >
                            Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* File Viewer Modal */}
        {selectedFile && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg max-w-4xl w-full">
              {/* Display PDFs using an iframe */}
              {selectedFile.endsWith(".pdf") ? (
                <iframe
                  src={selectedFile}
                  width="100%"
                  height="500"
                  title="Payment Screenshot"
                  style={{ border: "none" }}
                />
              ) : (
                // Display images using an img tag
                <img src={selectedFile} alt="Payment Screenshot" className="max-w-full max-h-[80vh]" />
              )}
              <button
                onClick={handleCloseFile}
                className="block w-full mt-4 bg-[#75609c] text-white py-2 rounded-lg hover:bg-[#5a497a] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [invoice, setInvoice] = useState({});
//   const [tracking, setTracking] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5001/api/admin/orders");
//       setOrders(Array.isArray(response.data) ? response.data : []);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setError("Failed to load orders. Please try again later.");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (userId, orderId, status) => {
//     if (status === "Dispatched" && (!invoice[orderId] || !tracking[orderId])) {
//       alert("Please upload invoice and enter tracking details before dispatching.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const formData = new FormData();
//       formData.append("userId", userId);
//       formData.append("orderId", orderId);
//       formData.append("status", status);
//       formData.append("tracking", tracking[orderId]);
//       if (invoice[orderId]) {
//         formData.append("invoice", invoice[orderId]);
//       }

//       await axios.post(
//         "http://localhost:5001/api/admin/update-status", 
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "Authorization": `Bearer ${token}`
//           }
//         }
//       );
      
//       // Clear the inputs after successful update
//       setTracking(prev => {
//         const newTracking = {...prev};
//         delete newTracking[orderId];
//         return newTracking;
//       });
//       setInvoice(prev => {
//         const newInvoice = {...prev};
//         delete newInvoice[orderId];
//         return newInvoice;
//       });
      
//       fetchOrders();
//       alert("Order status updated successfully!");
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert(error.response?.data?.message || 
//            error.message || 
//            "Failed to update order status. Please try again.");
//     }
//   };

//   const handleViewFile = (fileUrl) => {
//     setSelectedFile(fileUrl);
//   };

//   const handleCloseFile = () => {
//     setSelectedFile(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const getTotalPrice = (cart) => {
//     if (!Array.isArray(cart)) return 0;
//     return cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex">
//         <Sidebar />
//         <div className="flex-1 ml-0 lg:ml-64 p-4 lg:p-8 flex items-center justify-center">
//           <div className="animate-pulse text-lg text-gray-600">Loading orders...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex">
//         <Sidebar />
//         <div className="flex-1 ml-0 lg:ml-64 p-4 lg:p-8 flex flex-col items-center justify-center">
//           <div className="text-red-500 text-lg mb-4">{error}</div>
//           <button
//             onClick={fetchOrders}
//             className="px-4 py-2 bg-[#75609c] text-white rounded-lg hover:bg-[#5a497a] transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar />
      
//       <div className="flex-1 ml-0 lg:ml-64 p-4 lg:p-8">
//         <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Admin Orders</h2>

//         {orders.length === 0 ? (
//           <div className="bg-white p-6 rounded-lg shadow text-center">
//             <p className="text-gray-600">No orders found.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
//             <table className="w-full text-sm lg:text-base">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Order Date</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Order ID</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Customer</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Payment</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Items</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Total</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Status</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order._id || order.orderId} className="border-b hover:bg-gray-50 transition-colors">
//                     <td className="p-2 lg:p-4 text-gray-700 text-xs lg:text-sm">
//                       {formatDate(order.payment?.createdAt)}
//                     </td>
//                     <td className="p-2 lg:p-4 text-gray-700">
//                       {order.orderId || "N/A"}
//                     </td>
//                     <td className="p-2 lg:p-4 text-gray-700">
//                       <div className="font-medium">{order.user?.name || "N/A"}</div>
//                       <div className="text-xs text-gray-500">{order.user?.email || "N/A"}</div>
//                     </td>
//                     <td className="p-2 lg:p-4">
//                       {order.payment?.screenshot ? (
//                         <button
//                           onClick={() => handleViewFile(`http://localhost:5001${order.payment.screenshot}`)}
//                           className="bg-[#75609c] text-white px-2 py-1 rounded-lg hover:bg-[#5a497a] transition-colors text-xs lg:text-sm"
//                         >
//                           View
//                         </button>
//                       ) : (
//                         <span className="text-gray-400">N/A</span>
//                       )}
//                     </td>
//                     <td className="p-2 lg:p-4 text-gray-700">
//                       {Array.isArray(order.cart) && order.cart.length > 0 ? (
//                         order.cart.map((item) => (
//                           <div key={item._id || item.itemId} className="text-xs lg:text-sm mb-1">
//                             {item.name || "Unknown Item"} - ₹{item.price || 0} × {item.quantity || 1}
//                           </div>
//                         ))
//                       ) : (
//                         <span className="text-gray-400">No items</span>
//                       )}
//                     </td>
//                     <td className="p-2 lg:p-4 text-gray-700 font-semibold">
//                       ₹{getTotalPrice(order.cart)}
//                     </td>
//                     <td className="p-2 lg:p-4">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         order.payment?.status === "Approved" ? "bg-green-100 text-green-800" :
//                         order.payment?.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
//                         order.payment?.status === "Dispatched" ? "bg-blue-100 text-blue-800" :
//                         order.payment?.status === "Delivered" ? "bg-purple-100 text-purple-800" :
//                         "bg-red-100 text-red-800"
//                       }`}>
//                         {order.payment?.status || "Unknown"}
//                       </span>
//                     </td>
//                     <td className="p-2 lg:p-4 space-y-1 lg:space-y-2 min-w-[200px]">
//                       {order.payment?.status === "Pending" && (
//                         <>
//                           <button
//                             onClick={() => updateStatus(order.user?._id, order._id, "Approved")}
//                             className="w-full bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors text-xs lg:text-sm"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => updateStatus(order.user?._id, order._id, "Cancelled")}
//                             className="w-full bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs lg:text-sm"
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}
//                       {order.payment?.status === "Approved" && (
//                         <>
//                           <input
//                             type="text"
//                             placeholder="Tracking Details"
//                             className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] text-xs lg:text-sm"
//                             onChange={(e) => setTracking({ ...tracking, [order._id]: e.target.value })}
//                           />
//                           <input
//                             type="file"
//                             className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] text-xs lg:text-sm"
//                             onChange={(e) => setInvoice({ ...invoice, [order._id]: e.target.files[0] })}
//                           />
//                           <button
//                             onClick={() => updateStatus(order.user?._id, order._id, "Dispatched")}
//                             className="w-full bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors text-xs lg:text-sm"
//                           >
//                             Dispatch
//                           </button>
//                         </>
//                       )}
//                       {order.payment?.status === "Dispatched" && (
//                         <button
//                           onClick={() => updateStatus(order.user?._id, order._id, "Delivered")}
//                           className="w-full bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors text-xs lg:text-sm"
//                         >
//                           Mark as Delivered
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* File Viewer Modal */}
//         {selectedFile && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold">Payment Receipt</h3>
//                 <button
//                   onClick={handleCloseFile}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               {selectedFile.endsWith(".pdf") ? (
//                 <iframe
//                   src={selectedFile}
//                   width="100%"
//                   height="500"
//                   title="Payment Screenshot"
//                   style={{ border: "none" }}
//                 />
//               ) : (
//                 <img 
//                   src={selectedFile} 
//                   alt="Payment Screenshot" 
//                   className="max-w-full max-h-[70vh] mx-auto" 
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "https://via.placeholder.com/500x300?text=Image+not+available";
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;