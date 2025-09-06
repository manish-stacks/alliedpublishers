import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Sidebar from "./Sidebar";

const AdminDeliveryCharges = () => {
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [newCharge, setNewCharge] = useState({ states: "", charge: 0 });
  const [editCharge, setEditCharge] = useState({ states: "", charge: 0 });
  const [defaultCharge, setDefaultCharge] = useState(0);

  useEffect(() => {
    fetchDeliveryCharges();
    fetchDefaultCharge();
  }, []);

  const fetchDeliveryCharges = async () => {
    try {
      const response = await api.get(`/api/delivery`);
      setDeliveryCharges(response.data);
    } catch (error) {
      console.error("Error fetching delivery charges:", error);
    }
  };

  const fetchDefaultCharge = async () => {
    try {
      const response = await api.get(`/api/delivery/default`);
      setDefaultCharge(response.data.defaultCharge);
    } catch (error) {
      console.error("Error fetching default delivery charge:", error);
    }
  };

  const handleAddCharge = async () => {
    try {
      // Trim and normalize states input (optional)
      const payload = {
        states: newCharge.states.trim(),
        charge: Number(newCharge.charge),
      };
      await api.post(`/api/admin/delivery`, payload);
      setNewCharge({ states: "", charge: 0 });
      fetchDeliveryCharges();
    } catch (error) {
      console.error("Error adding delivery charge:", error);
    }
  };

  const handleDeleteCharge = async (states) => {
    try {
      // Pass states string as identifier in URL, encodeURIComponent if needed
      await api.delete(`/api/admin/delivery/${encodeURIComponent(states)}`);
      fetchDeliveryCharges();
    } catch (error) {
      console.error("Error deleting delivery charge:", error);
    }
  };

  const handleEditCharge = (charge) => {
    setEditCharge(charge);
  };

  const handleUpdateCharge = async () => {
    try {
      await api.put(
        `/api/admin/delivery/${encodeURIComponent(editCharge.states)}`,
        { charge: Number(editCharge.charge) }
      );
      setEditCharge({ states: "", charge: 0 });
      fetchDeliveryCharges();
    } catch (error) {
      console.error("Error updating delivery charge:", error);
    }
  };

  const handleSetDefaultCharge = async () => {
    try {
      await api.post(`/api/admin/delivery/default`, {
        defaultCharge,
      });
      alert("Default delivery charge set successfully!");
    } catch (error) {
      console.error("Error setting default delivery charge:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />

      <div className="flex-1 flex justify-center items-center px-10 ml-[260px]">
        <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Manage Delivery Charges
          </h3>

          <div className="flex flex-col items-center space-y-4">
            {/* Default Delivery Charge */}
            <div className="w-full space-y-4">
              <h3 className="text-2xl font-bold text-black uppercase text-center">
                Default Charge
              </h3>
              <label className="text-lg font-bold text-black uppercase text-center">
                Default Delivery Charge (₹)
              </label>
              <input
                type="number"
                value={defaultCharge}
                onChange={(e) => setDefaultCharge(e.target.value)}
                className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
              />
              <button
                onClick={handleSetDefaultCharge}
                className="w-full px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
              >
                Set Default Charge
              </button>
            </div>

            {/* Add New Charge (by states) */}
            <div className="w-full space-y-4">
              <h3 className="text-2xl font-bold text-black uppercase text-center">
                Add New Charge
              </h3>
              <label className="text-lg font-bold text-black uppercase text-center">
                States (comma separated)
              </label>
              <input
                type="text"
                value={newCharge.states}
                onChange={(e) =>
                  setNewCharge({ ...newCharge, states: e.target.value })
                }
                placeholder="e.g., Maharashtra,Karnataka,Delhi"
                className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
              />
              <label className="text-lg font-bold text-black uppercase text-center">
                Charge (₹)
              </label>
              <input
                type="number"
                value={newCharge.charge}
                onChange={(e) =>
                  setNewCharge({ ...newCharge, charge: e.target.value })
                }
                className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
              />
              <button
                onClick={handleAddCharge}
                className="w-full px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
              >
                Add Charge
              </button>
            </div>

            {/* Edit Charge Section */}
            {editCharge.states && (
              <div className="w-full space-y-4">
                <h3 className="text-2xl font-bold text-black uppercase text-center">
                  Edit Charge
                </h3>
                <label className="text-lg font-bold text-black uppercase text-center">
                  States (comma separated)
                </label>
                <input
                  type="text"
                  value={editCharge.states}
                  disabled
                  className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-gray-100 text-black text-center outline-none cursor-not-allowed"
                />
                <label className="text-lg font-bold text-black uppercase text-center">
                  Charge (₹)
                </label>
                <input
                  type="number"
                  value={editCharge.charge}
                  onChange={(e) =>
                    setEditCharge({ ...editCharge, charge: e.target.value })
                  }
                  className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
                />
                <button
                  onClick={handleUpdateCharge}
                  className="w-full px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
                >
                  Update Charge
                </button>
              </div>
            )}

            {/* Current Charges List */}
            <div className="w-full space-y-4">
              <h3 className="text-2xl font-bold text-black uppercase text-center">
                Current Delivery Charges
              </h3>
              <div className="space-y-2">
                {deliveryCharges.map((charge) => (
                  <div
                    key={charge.states}
                    className="flex justify-between items-center p-3 bg-white/80 rounded-lg"
                  >
                    <span className="font-semibold">
                      {charge.states}: ₹{charge.charge}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditCharge(charge)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCharge(charge.states)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeliveryCharges;
