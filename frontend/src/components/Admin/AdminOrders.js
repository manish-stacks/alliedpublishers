
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [invoice, setInvoice] = useState({});
//   const [tracking, setTracking] = useState({});
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [loading, setLoading] = useState({});

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     if (statusFilter === "All") {
//       setFilteredOrders(orders);
//     } else {
//       const filtered = orders.map(user => ({
//         ...user,
//         orders: user.orders.filter(order => order.payment?.status === statusFilter)
//       })).filter(user => user.orders.length > 0);
//       setFilteredOrders(filtered);
//     }
//   }, [orders, statusFilter]);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders`);
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const updateStatus = async (userId, orderId, status, uiIndex) => {
//     if (status === "Dispatched" && (!invoice[orderId] || !tracking[orderId])) {
//       alert("Please upload invoice and enter tracking details before dispatching.");
//       return;
//     }

//     const loadingKey = `${userId}-${orderId}-${status}`;
    
//     try {
//       setLoading(prev => ({ ...prev, [loadingKey]: true }));

//       const formData = new FormData();
//       formData.append("userId", userId);
//       formData.append("orderId", orderId); // Changed from order._id to orderId
//       formData.append("status", status);
      
//       if (tracking[orderId]) {
//         formData.append("tracking", tracking[orderId]);
//       }
      
//       if (invoice[orderId]) {
//         formData.append("invoice", invoice[orderId]);
//       }

//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/admin/update-status`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Optimistic update using orderId
//       setOrders(prevOrders => {
//         return prevOrders.map(user => {
//           if (user._id === userId) {
//             const updatedOrders = user.orders.map(order => {
//               if (order._id === orderId) {
//                 return {
//                   ...order,
//                   payment: {
//                     ...order.payment,
//                     status: status,
//                     ...(status === "Dispatched" && {
//                       tracking: tracking[orderId],
//                       invoice: `/uploads/${invoice[orderId]?.name}`
//                     }),
//                     updatedAt: new Date().toISOString()
//                   },
//                   ...(status === "Approved" && !order.orderId && {
//                     orderId: `ORD${Date.now()}`
//                   })
//                 };
//               }
//               return order;
//             });
//             return { ...user, orders: updatedOrders };
//           }
//           return user;
//         });
//       });

//       // Clear tracking and invoice for this order
//       setTracking(prev => {
//         const newTracking = { ...prev };
//         delete newTracking[orderId];
//         return newTracking;
//       });
//       setInvoice(prev => {
//         const newInvoice = { ...prev };
//         delete newInvoice[orderId];
//         return newInvoice;
//       });

//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update status. Please try again.");
//       fetchOrders(); // Re-fetch on error
//     } finally {
//       setLoading(prev => {
//         const newLoading = { ...prev };
//         delete newLoading[loadingKey];
//         return newLoading;
//       });
//     }
//   };

//   const handleViewFile = (fileUrl) => {
//     setSelectedFile(fileUrl);
//   };

//   const handleCloseFile = () => {
//     setSelectedFile(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar />

//       <div className="flex-1 ml-0 lg:ml-64 p-4 lg:p-8">
//         <div className="flex justify-between items-center mb-4 lg:mb-6">
//           <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Admin Orders</h2>
//           <div className="flex items-center">
//             <label htmlFor="status-filter" className="mr-2 text-sm lg:text-base text-gray-700">
//               Filter by Status:
//             </label>
//             <select
//               id="status-filter"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#75609c] text-sm lg:text-base"
//             >
//               <option value="All">All</option>
//               <option value="Pending">Pending</option>
//               <option value="Approved">Approved</option>
//               <option value="Dispatched">Dispatched</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//         </div>

//         {filteredOrders.length === 0 ? (
//           <p className="text-gray-600">No orders found with status: {statusFilter}</p>
//         ) : (
//           <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
//             <table className="w-full text-sm lg:text-base">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Order ID</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Name</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Email</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Address</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Payment Screenshot</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Cart Items</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Status</th>
//                   <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((user) =>
//                   user.orders.map((order) => (
//                     <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
//                       <td className="p-2 lg:p-4 text-gray-700">{order.orderId || "N/A"}</td>
//                       <td className="p-2 lg:p-4 text-gray-700">{user.name}</td>
//                       <td className="p-2 lg:p-4 text-gray-700">{user.email}</td>
//                       <td className="p-2 lg:p-4 text-gray-700">
//                         {user.address?.street}, {user.address?.city}, {user.address?.state}, {user.address?.zipCode}
//                       </td>
//                       <td className="p-2 lg:p-4">
//                         {order.payment?.screenshot && (
//                           <button
//                             onClick={() => handleViewFile(`${process.env.REACT_APP_BACKEND_URL}${order.payment.screenshot}`)}
//                             className="bg-[#75609c] text-white px-2 py-1 rounded-lg hover:bg-[#5a497a] transition-colors text-xs lg:text-sm"
//                           >
//                             View
//                           </button>
//                         )}
//                       </td>
//                       <td className="p-2 lg:p-4 text-gray-700">
//                         {order.cart?.map((item) => (
//                           <div key={item._id} className="text-xs lg:text-sm">
//                             {item.name} - ₹{item.price} x {item.quantity}
//                           </div>
//                         ))}
//                         {order.cart && (
//                           <div className="font-semibold mt-1 lg:mt-2 text-xs lg:text-sm">
//                             Grand Total: ₹{order.cart.reduce((total, item) => total + item.price * item.quantity, 0)}
//                           </div>
//                         )}
//                       </td>
//                       <td className="p-2 lg:p-4 text-gray-700 text-xs lg:text-sm">
//                         {order.payment?.status || "Pending"}
//                       </td>
//                       <td className="p-2 lg:p-4 space-y-1 lg:space-y-2">
//                         {(!order.payment || order.payment.status === "Pending") && (
//                           <>
//                             <button
//                               onClick={() => updateStatus(user._id, order._id, "Approved")}
//                               disabled={loading[`${user._id}-${order._id}-Approved`]}
//                               className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors text-xs lg:text-sm disabled:opacity-50"
//                             >
//                               {loading[`${user._id}-${order._id}-Approved`] ? "Processing..." : "Approve"}
//                             </button>
//                             <button
//                               onClick={() => updateStatus(user._id, order._id, "Cancelled")}
//                               disabled={loading[`${user._id}-${order._id}-Cancelled`]}
//                               className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs lg:text-sm disabled:opacity-50"
//                             >
//                               {loading[`${user._id}-${order._id}-Cancelled`] ? "Processing..." : "Reject"}
//                             </button>
//                           </>
//                         )}
//                         {order.payment?.status === "Approved" && (
//                           <>
//                             <input
//                               type="text"
//                               placeholder="Tracking Details"
//                               className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] text-xs lg:text-sm"
//                               onChange={(e) => setTracking({ ...tracking, [order._id]: e.target.value })}
//                               value={tracking[order._id] || ""}
//                             />
//                             <input
//                               type="file"
//                               className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] text-xs lg:text-sm"
//                               onChange={(e) => setInvoice({ ...invoice, [order._id]: e.target.files[0] })}
//                             />
//                             <button
//                               onClick={() => updateStatus(user._id, order._id, "Dispatched")}
//                               disabled={loading[`${user._id}-${order._id}-Dispatched`]}
//                               className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors text-xs lg:text-sm disabled:opacity-50"
//                             >
//                               {loading[`${user._id}-${order._id}-Dispatched`] ? "Processing..." : "Dispatch"}
//                             </button>
//                           </>
//                         )}
//                         {order.payment?.status === "Dispatched" && (
//                           <button
//                             onClick={() => updateStatus(user._id, order._id, "Delivered")}
//                             disabled={loading[`${user._id}-${order._id}-Delivered`]}
//                             className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors text-xs lg:text-sm disabled:opacity-50"
//                           >
//                             {loading[`${user._id}-${order._id}-Delivered`] ? "Processing..." : "Delivered"}
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {selectedFile && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg max-w-4xl w-full">
//               {selectedFile.endsWith(".pdf") ? (
//                 <iframe
//                   src={selectedFile}
//                   width="100%"
//                   height="500"
//                   title="Payment Screenshot"
//                   style={{ border: "none" }}
//                 />
//               ) : (
//                 <img src={selectedFile} alt="Payment Screenshot" className="max-w-full max-h-[80vh]" />
//               )}
//               <button
//                 onClick={handleCloseFile}
//                 className="block w-full mt-4 bg-[#75609c] text-white py-2 rounded-lg hover:bg-[#5a497a] transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [invoice, setInvoice] = useState({});
  const [tracking, setTracking] = useState({});
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null
  });
  const [loading, setLoading] = useState({});

  // Format date with proper error handling
  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("No date provided");
      return "N/A";
    }
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.warn("Invalid date:", dateString);
        return "N/A";
      }
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "N/A";
    }
  };

  // Fetch orders with proper error handling
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders`);
      console.log("Fetched orders:", data);
      setOrders(data);
      localStorage.setItem('adminOrders', JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Fallback to localStorage if API fails
      const savedOrders = localStorage.getItem('adminOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  };

  // Initialize with both API and localStorage data
  useEffect(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    fetchOrders();
  }, []);

  // Apply filters whenever orders or filters change
  useEffect(() => {
    let filtered = [...orders];
    
    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.map(user => ({
        ...user,
        orders: user.orders.filter(order => order.payment?.status === statusFilter)
      })).filter(user => user.orders.length > 0);
    }
    
    // Date filter
    if (dateFilter.startDate && dateFilter.endDate) {
      filtered = filtered.map(user => ({
        ...user,
        orders: user.orders.filter(order => {
          const orderDate = new Date(order.payment?.createdAt || order.payment.createdAt);
          return orderDate >= dateFilter.startDate && orderDate <= dateFilter.endDate;
        })
      })).filter(user => user.orders.length > 0);
    }
    
    setFilteredOrders(filtered);
  }, [orders, statusFilter, dateFilter]);

  // Update order status with proper state management
  const updateStatus = async (userId, orderId, status) => {
    if (status === "Dispatched" && (!invoice[orderId] || !tracking[orderId])) {
      alert("Please upload invoice and enter tracking details before dispatching.");
      return;
    }
  
    const loadingKey = `${userId}-${orderId}-${status}`;
    
    try {
      setLoading(prev => ({ ...prev, [loadingKey]: true }));
  
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("orderId", orderId); // Use orderId instead of order._id
      formData.append("status", status);
      
      if (tracking[orderId]) {
        formData.append("tracking", tracking[orderId]);
      }
      
      if (invoice[orderId]) {
        formData.append("invoice", invoice[orderId]);
      }
  
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/update-status`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Optimistic update using orderId
      setOrders(prevOrders => {
        return prevOrders.map(user => {
          if (user._id === userId) {
            const updatedOrders = user.orders.map(order => {
              if (order._id === orderId) {
                return {
                  ...order,
                  payment: {
                    ...order.payment,
                    status: status,
                    ...(status === "Dispatched" && {
                      tracking: tracking[orderId],
                      invoice: `/uploads/${invoice[orderId]?.name}`
                    }),
                    updatedAt: new Date().toISOString()
                  },
                  ...(status === "Approved" && !order.orderId && {
                    orderId: `ORD${Date.now()}`
                  })
                };
              }
              return order;
            });
            return { ...user, orders: updatedOrders };
          }
          return user;
        });
      });
  
      // Clear tracking and invoice for this order
      setTracking(prev => {
        const newTracking = { ...prev };
        delete newTracking[orderId];
        return newTracking;
      });
      setInvoice(prev => {
        const newInvoice = { ...prev };
        delete newInvoice[orderId];
        return newInvoice;
      });
  
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
      fetchOrders(); // Re-fetch on error
    } finally {
      setLoading(prev => {
        const newLoading = { ...prev };
        delete newLoading[loadingKey];
        return newLoading;
      });
    }
  };
  

  const handleViewFile = (fileUrl) => {
    setSelectedFile(fileUrl);
  };

  const handleCloseFile = () => {
    setSelectedFile(null);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateFilter({ startDate: start, endDate: end });
  };

  const clearDateFilter = () => {
    setDateFilter({ startDate: null, endDate: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-64 p-4 lg:p-8">
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Admin Orders</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <label htmlFor="status-filter" className="mr-2 text-sm lg:text-base text-gray-700">
                Filter by Status:
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#75609c] text-sm lg:text-base"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="date-filter" className="mr-2 text-sm lg:text-base text-gray-700">
                Filter by Date:
              </label>
              <DatePicker
                selectsRange={true}
                startDate={dateFilter.startDate}
                endDate={dateFilter.endDate}
                onChange={handleDateChange}
                isClearable={true}
                placeholderText="Select date range"
                className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#75609c] text-sm lg:text-base"
              />
              {dateFilter.startDate && (
                <button 
                  onClick={clearDateFilter}
                  className="ml-2 text-sm text-[#75609c] hover:text-[#5a497a]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-gray-600">No orders found with the current filters</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
            <table className="w-full text-sm lg:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Order ID</th>
                  <th className="p-2 lg:p-4 text-left text-gray-700 font-semibold">Order Date</th>
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
                {filteredOrders.map((user) =>
                  user.orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-2 lg:p-4 text-gray-700">{order.orderId || "N/A"}</td>
                      <td className="p-2 lg:p-4 text-gray-700 text-xs lg:text-sm">
                        {formatDate(order.payment?.createdAt || order.payment.createdAt)}
                      </td>
                      <td className="p-2 lg:p-4 text-gray-700">{user.name}</td>
                      <td className="p-2 lg:p-4 text-gray-700">{user.email}</td>
                      <td className="p-2 lg:p-4 text-gray-700">
                        {user.address?.street}, {user.address?.city}, {user.address?.state}, {user.address?.zipCode}
                      </td>
                      <td className="p-2 lg:p-4">
                        {order.payment?.screenshot && (
                          <button
                            onClick={() => handleViewFile(`${process.env.REACT_APP_BACKEND_URL}${order.payment.screenshot}`)}
                            className="bg-[#75609c] text-white px-2 py-1 rounded-lg hover:bg-[#5a497a] transition-colors text-xs lg:text-sm"
                          >
                            View
                          </button>
                        )}
                      </td>
                      <td className="p-2 lg:p-4 text-gray-700">
                        {order.cart?.map((item) => (
                          <div key={item._id} className="text-xs lg:text-sm">
                            {item.name} - ₹{item.price} x {item.quantity}
                          </div>
                        ))}
                        {order.cart && (
                          <div className="font-semibold mt-1 lg:mt-2 text-xs lg:text-sm">
                            Grand Total: ₹{order.cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                          </div>
                        )}
                      </td>
                      <td className="p-2 lg:p-4 text-gray-700 text-xs lg:text-sm">
                        {order.payment?.status || "Pending"}
                      </td>
                      <td className="p-2 lg:p-4 space-y-1 lg:space-y-2">
                        {(!order.payment || order.payment.status === "Pending") && (
                          <>
                            <button
                              onClick={() => updateStatus(user._id, order._id, "Approved")}
                              disabled={loading[`${user._id}-${order._id}-Approved`]}
                              className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors text-xs lg:text-sm disabled:opacity-50"
                            >
                              {loading[`${user._id}-${order._id}-Approved`] ? "Processing..." : "Approve"}
                            </button>
                            <button
                              onClick={() => updateStatus(user._id, order._id, "Cancelled")}
                              disabled={loading[`${user._id}-${order._id}-Cancelled`]}
                              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs lg:text-sm disabled:opacity-50"
                            >
                              {loading[`${user._id}-${order._id}-Cancelled`] ? "Processing..." : "Reject"}
                            </button>
                          </>
                        )}
                        {order.payment?.status === "Approved" && (
                          <>
                            <input
                              type="text"
                              placeholder="Tracking Details"
                              className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] text-xs lg:text-sm"
                              onChange={(e) => setTracking({ ...tracking, [order._id]: e.target.value })}
                              value={tracking[order._id] || ""}
                            />
                            <input
                              type="file"
                              className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] text-xs lg:text-sm"
                              onChange={(e) => setInvoice({ ...invoice, [order._id]: e.target.files[0] })}
                            />
                            <button
                              onClick={() => updateStatus(user._id, order._id, "Dispatched")}
                              disabled={loading[`${user._id}-${order._id}-Dispatched`]}
                              className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors text-xs lg:text-sm disabled:opacity-50"
                            >
                              {loading[`${user._id}-${order._id}-Dispatched`] ? "Processing..." : "Dispatch"}
                            </button>
                          </>
                        )}
                        {order.payment?.status === "Dispatched" && (
                          <button
                            onClick={() => updateStatus(user._id, order._id, "Delivered")}
                            disabled={loading[`${user._id}-${order._id}-Delivered`]}
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors text-xs lg:text-sm disabled:opacity-50"
                          >
                            {loading[`${user._id}-${order._id}-Delivered`] ? "Processing..." : "Delivered"}
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

        {selectedFile && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg max-w-4xl w-full">
              {selectedFile.endsWith(".pdf") ? (
                <iframe
                  src={selectedFile}
                  width="100%"
                  height="500"
                  title="Payment Screenshot"
                  style={{ border: "none" }}
                />
              ) : (
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