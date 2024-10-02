import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

import DataTable from "./DataTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [orders, setOrders] = useState([]); // State to store multiple orders

  const handleNewOrder = newOrder => {
    setOrders([...orders, newOrder]); // Add the new order to the orders array
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<CheckoutForm setOrderDetails={handleNewOrder} />}
        />
        <Route path="/orders" element={<DataTable orders={orders} />} />{" "}
        {/* Display all orders */}
      </Routes>
    </Router>
  );
}

export default App;
