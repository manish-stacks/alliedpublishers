


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null); // Updated to handle both images and PDFs
//   const [invoice, setInvoice] = useState({});
//   const [tracking, setTracking] = useState({});

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/admin/orders");
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const updateStatus = async (userId, orderIndex, status) => {
//     if (status === "Dispatched" && (!invoice[orderIndex] || !tracking[orderIndex])) {
//       alert("Please upload invoice and enter tracking details before dispatching.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('userId', userId);
//       formData.append('orderIndex', orderIndex);
//       formData.append('status', status);
//       formData.append('tracking', tracking[orderIndex]);
//       formData.append('invoice', invoice[orderIndex]); // Append the file

//       await axios.post("http://localhost:5001/api/admin/update-status", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Set the content type for file uploads
//         },
//       });
//       fetchOrders();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   // Function to handle file viewing
//   const handleViewFile = (fileUrl) => {
//     setSelectedFile(fileUrl);
//   };

//   // Function to close the file viewer
//   const handleCloseFile = () => {
//     setSelectedFile(null);
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">Admin Orders</h2>
//       {orders.length === 0 ? (
//         <p>No pending orders.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Order ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Address</th>
//               <th className="border p-2">Payment Screenshot</th>
//               <th className="border p-2">Cart Items</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((user) =>
//               user.orders.map((order, orderIndex) => (
//                 <tr key={order._id} className="border">
//                   <td className="border p-2">{order.orderId || "N/A"}</td>
//                   <td className="border p-2">{user.name}</td>
//                   <td className="border p-2">{user.email}</td>
//                   <td className="border p-2">
//                     {user.address.street}, {user.address.city}, {user.address.state}, {user.address.zipCode}
//                   </td>
//                   <td className="border p-2">
//                     <button
//                       onClick={() => handleViewFile(`http://localhost:5001${order.payment.screenshot}`)}
//                       className="bg-gray-500 text-white px-2 py-1 rounded"
//                     >
//                       View
//                     </button>
//                   </td>
//                   <td className="border p-2">
//                     {order.cart.map((item) => (
//                       <div key={item._id}>
//                         {item.name} - ₹{item.price} x {item.quantity}
//                       </div>
//                     ))}
//                     <div className="font-semibold mt-2">
//                       Grand Total: ₹{order.cart.reduce((total, item) => total + item.price * item.quantity, 0)}
//                     </div>
//                   </td>
//                   <td className="border p-2">{order.payment.status}</td>
//                   <td className="border p-2 space-y-2">
//                     {order.payment.status === "Pending" && (
//                       <>
//                         <button
//                           onClick={() => updateStatus(user._id, orderIndex, "Approved")}
//                           className="bg-green-500 px-2 py-1 rounded"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => updateStatus(user._id, orderIndex, "Cancelled")}
//                           className="bg-red-500 px-2 py-1 rounded"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                     {order.payment.status === "Approved" && (
//                       <>
//                         <input
//                           type="text"
//                           placeholder="Enter tracking details"
//                           className="border p-1 text-sm"
//                           onChange={(e) => setTracking({ ...tracking, [orderIndex]: e.target.value })}
//                         />
//                         <input
//                           type="file"
//                           className="border p-1 text-sm"
//                           onChange={(e) => setInvoice({ ...invoice, [orderIndex]: e.target.files[0] })}
//                         />
//                         <button
//                           onClick={() => updateStatus(user._id, orderIndex, "Dispatched")}
//                           className="bg-yellow-500 px-2 py-1 rounded"
//                         >
//                           Dispatch
//                         </button>
//                       </>
//                     )}
//                     {order.payment.status === "Dispatched" && (
//                       <button
//                         onClick={() => updateStatus(user._id, orderIndex, "Delivered")}
//                         className="bg-blue-500 px-2 py-1 rounded"
//                       >
//                         Delivered
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}

//       {selectedFile && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             {/* Display PDFs using an iframe */}
//             {selectedFile.endsWith(".pdf") ? (
//               <iframe
//                 src={selectedFile}
//                 width="600"
//                 height="500"
//                 title="Payment Screenshot"
//                 style={{ border: "none" }}
//               />
//             ) : (
//               // Display images using an img tag
//               <img src={selectedFile} alt="Payment Screenshot" className="max-w-full max-h-[80vh]" />
//             )}
//             <button
//               onClick={handleCloseFile}
//               className="block w-full mt-4 bg-red-500 text-white py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;


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