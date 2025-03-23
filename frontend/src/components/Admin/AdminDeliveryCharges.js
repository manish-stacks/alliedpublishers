// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminDeliveryCharges = () => {
//   const [deliveryCharges, setDeliveryCharges] = useState([]);
//   const [newCharge, setNewCharge] = useState({ pincode: "", charge: 0 });
//   const [editCharge, setEditCharge] = useState({ pincode: "", charge: 0 });

//   useEffect(() => {
//     fetchDeliveryCharges();
//   }, []);

//   const fetchDeliveryCharges = async () => {
//     try {
//       const response = await axios.get("https://alliedpublications-11.onrender.com/api/delivery");
//       setDeliveryCharges(response.data);
//     } catch (error) {
//       console.error("Error fetching delivery charges:", error);
//     }
//   };

//   const handleAddCharge = async () => {
//     try {
//       await axios.post("https://alliedpublications-11.onrender.com/api/admin/delivery", newCharge);
//       setNewCharge({ pincode: "", charge: 0 });
//       fetchDeliveryCharges();
//     } catch (error) {
//       console.error("Error adding delivery charge:", error);
//     }
//   };

//   const handleDeleteCharge = async (pincode) => {
//     try {
//       await axios.delete(`https://alliedpublications-11.onrender.com/api/admin/delivery/${pincode}`);
//       fetchDeliveryCharges();
//     } catch (error) {
//       console.error("Error deleting delivery charge:", error);
//     }
//   };

//   const handleEditCharge = (charge) => {
//     setEditCharge(charge); // Set the charge to be edited
//   };

//   const handleUpdateCharge = async () => {
//     try {
//       await axios.put(
//         `https://alliedpublications-11.onrender.com/api/admin/delivery/${editCharge.pincode}`,
//         { charge: editCharge.charge }
//       );
//       setEditCharge({ pincode: "", charge: 0 }); // Reset edit form
//       fetchDeliveryCharges();
//     } catch (error) {
//       console.error("Error updating delivery charge:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-2xl font-bold mb-6">Set Delivery Charges</h1>

//       {/* Add New Charge Form */}
//       <div className="space-y-4 mb-8">
//         <div>
//           <label className="block text-gray-700 font-semibold">Pincode:</label>
//           <input
//             type="text"
//             value={newCharge.pincode}
//             onChange={(e) => setNewCharge({ ...newCharge, pincode: e.target.value })}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-semibold">Charge:</label>
//           <input
//             type="number"
//             value={newCharge.charge}
//             onChange={(e) => setNewCharge({ ...newCharge, charge: e.target.value })}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
//           />
//         </div>
//         <button
//           onClick={handleAddCharge}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Add Charge
//         </button>
//       </div>

//       {/* Edit Charge Form */}
//       {editCharge.pincode && (
//         <div className="space-y-4 mb-8">
//           <h2 className="text-xl font-bold">Edit Delivery Charge</h2>
//           <div>
//             <label className="block text-gray-700 font-semibold">Pincode:</label>
//             <input
//               type="text"
//               value={editCharge.pincode}
//               disabled
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold">Charge:</label>
//             <input
//               type="number"
//               value={editCharge.charge}
//               onChange={(e) => setEditCharge({ ...editCharge, charge: e.target.value })}
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
//             />
//           </div>
//           <button
//             onClick={handleUpdateCharge}
//             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//           >
//             Update Charge
//           </button>
//         </div>
//       )}

//       {/* Current Delivery Charges List */}
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Current Delivery Charges</h2>
//         <ul>
//           {deliveryCharges.map((charge) => (
//             <li key={charge.pincode} className="mb-2 flex items-center justify-between">
//               <div>
//                 <span className="font-semibold">{charge.pincode}:</span> ₹{charge.charge}
//               </div>
//               <div>
//                 <button
//                   onClick={() => handleEditCharge(charge)}
//                   className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteCharge(charge.pincode)}
//                   className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminDeliveryCharges;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDeliveryCharges = () => {
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [newCharge, setNewCharge] = useState({ pincode: "", charge: 0 });
  const [editCharge, setEditCharge] = useState({ pincode: "", charge: 0 });
  const [defaultCharge, setDefaultCharge] = useState(0); // State for default charge

  useEffect(() => {
    fetchDeliveryCharges();
    fetchDefaultCharge();
  }, []);

  const fetchDeliveryCharges = async () => {
    try {
      const response = await axios.get("https://alliedpublications-11.onrender.com/api/delivery");
      setDeliveryCharges(response.data);
    } catch (error) {
      console.error("Error fetching delivery charges:", error);
    }
  };

  const fetchDefaultCharge = async () => {
    try {
      const response = await axios.get("https://alliedpublications-11.onrender.com/api/delivery/default");
      setDefaultCharge(response.data.defaultCharge);
    } catch (error) {
      console.error("Error fetching default delivery charge:", error);
    }
  };

  const handleAddCharge = async () => {
    try {
      await axios.post("https://alliedpublications-11.onrender.com/api/admin/delivery", newCharge);
      setNewCharge({ pincode: "", charge: 0 });
      fetchDeliveryCharges();
    } catch (error) {
      console.error("Error adding delivery charge:", error);
    }
  };

  const handleDeleteCharge = async (pincode) => {
    try {
      await axios.delete(`https://alliedpublications-11.onrender.com/api/admin/delivery/${pincode}`);
      fetchDeliveryCharges();
    } catch (error) {
      console.error("Error deleting delivery charge:", error);
    }
  };

  const handleEditCharge = (charge) => {
    setEditCharge(charge); // Set the charge to be edited
  };

  const handleUpdateCharge = async () => {
    try {
      await axios.put(
        `https://alliedpublications-11.onrender.com/api/admin/delivery/${editCharge.pincode}`,
        { charge: editCharge.charge }
      );
      setEditCharge({ pincode: "", charge: 0 }); // Reset edit form
      fetchDeliveryCharges();
    } catch (error) {
      console.error("Error updating delivery charge:", error);
    }
  };

  const handleSetDefaultCharge = async () => {
    try {
      await axios.post("https://alliedpublications-11.onrender.com/api/admin/delivery/default", {
        defaultCharge,
      });
      alert("Default delivery charge set successfully!");
    } catch (error) {
      console.error("Error setting default delivery charge:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Set Delivery Charges</h1>

      {/* Set Default Delivery Charge */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold">Default Delivery Charge</h2>
        <div>
          <label className="block text-gray-700 font-semibold">Default Charge:</label>
          <input
            type="number"
            value={defaultCharge}
            onChange={(e) => setDefaultCharge(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleSetDefaultCharge}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Set Default Charge
        </button>
      </div>

      {/* Add New Charge Form */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold">Add New Delivery Charge</h2>
        <div>
          <label className="block text-gray-700 font-semibold">Pincode:</label>
          <input
            type="text"
            value={newCharge.pincode}
            onChange={(e) => setNewCharge({ ...newCharge, pincode: e.target.value })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Charge:</label>
          <input
            type="number"
            value={newCharge.charge}
            onChange={(e) => setNewCharge({ ...newCharge, charge: e.target.value })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleAddCharge}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Charge
        </button>
      </div>

      {/* Edit Charge Form */}
      {editCharge.pincode && (
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold">Edit Delivery Charge</h2>
          <div>
            <label className="block text-gray-700 font-semibold">Pincode:</label>
            <input
              type="text"
              value={editCharge.pincode}
              disabled
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Charge:</label>
            <input
              type="number"
              value={editCharge.charge}
              onChange={(e) => setEditCharge({ ...editCharge, charge: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handleUpdateCharge}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Update Charge
          </button>
        </div>
      )}

      {/* Current Delivery Charges List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Current Delivery Charges</h2>
        <ul>
          {deliveryCharges.map((charge) => (
            <li key={charge.pincode} className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-semibold">{charge.pincode}:</span> ₹{charge.charge}
              </div>
              <div>
                <button
                  onClick={() => handleEditCharge(charge)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCharge(charge.pincode)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDeliveryCharges;