import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/api/order/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Status</h2>
        {order ? (
          <>
            <p className="text-gray-700 mb-4">We will get back to you within 24 hours.</p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Order ID: {order.orderId}</h3>
              <p className="text-gray-700">Status: {order.payment.status}</p>
            </div>
            {order.payment.status === "Dispatched" && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Tracking Details</h3>
                <p className="text-gray-700">{order.payment.tracking}</p>
                <Link to
                  ={`${process.env.REACT_APP_BACKEND_URL}${order.payment.invoice}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Invoice
                </Link>
              </div>
            )}
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

export default OrderStatus;