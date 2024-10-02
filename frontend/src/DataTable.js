import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DataTable = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders");
        setOrders(response.data);
      } catch (err) {
        console.log("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container className="mt-5">
      <Button
        onClick={() => navigate("/")}
        variant="secondary"
        className="float-end"
      >
        Checkout Form
      </Button>
      <h2 className="text-center">Order Details</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Shipping Address</th>
            <th>Card Number</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>**** **** **** {order.cardNumber.slice(-4)}</td>
              <td>{order.expirationDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataTable;
