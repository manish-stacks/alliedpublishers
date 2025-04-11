import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewOrder = () => {
  const { tempOrderId } = useParams(); // Extract tempOrderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/order/${tempOrderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [tempOrderId]); // Add tempOrderId as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Status</h2>
        {order ? (
          <>
            <p className="text-gray-700 mb-4">
              Your order is currently <strong>{order.payment.status}</strong>.
            </p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Temporary Order ID: {tempOrderId}</h3>
              <p className="text-gray-700">
                We will notify you once your order is approved.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Cart Items</h3>
              {order.cart.map((item) => (
                <div key={item.itemId} className="text-gray-700">
                  {item.name} - ₹{item.price} x {item.quantity}
                </div>
              ))}
              <div className="font-semibold mt-2">
                Grand Total: ₹{order.cart.reduce((total, item) => total + item.price * item.quantity, 0)}
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-700">Order not found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;