import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/items`).then((response) => {
      setItems(response.data);
    });
  }, []);

  const addToCart = (itemId) => {
    const token = localStorage.getItem("token");
    api.post(
      `/add-to-cart`,
      { itemId, quantity: 1 },
      { headers: { Authorization: token } }
    );
  };

  return (
    <div>
      <h1>Items List</h1>
      <button onClick={() => navigate("/cart")}>Go to Cart</button>
      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => addToCart(item._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;