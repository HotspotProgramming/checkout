import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutForm = ({ setOrderDetails }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = "Card Number must be 16 digits";
    if (!/^\d{2}\/\d{2}$/.test(formData.expirationDate))
      newErrors.expirationDate = "Expiration Date must be MM/YY";
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 digits";

    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setValidated(true); // Form is valid

      try {
        await axios.post("http://localhost:5000/checkout", formData);
        setOrderDetails(formData); // Pass the form data to the parent component
        setShowModal(true); // Show the confirmation modal
      } catch (error) {
        alert("Error placing order");
      }
    } else {
      setValidated(false); // Form is invalid
    }
  };

  // Function to handle closing the modal
  const handleClose = () => setShowModal(false);

  return (
    <Container className="mt-5">
      <Button
        onClick={() => navigate("/orders")}
        variant="secondary"
        className="float-end"
      >
        View Orders
      </Button>

      <h2 className="text-center">Checkout Form</h2>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                placeholder="Enter your name"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="address" className="mt-3">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
                placeholder="Enter your shipping address"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="cardNumber" className="mt-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                isInvalid={!!errors.cardNumber}
                placeholder="1234 5678 9123 4567"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="expirationDate" className="mt-3">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    isInvalid={!!errors.expirationDate}
                    placeholder="MM/YY"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expirationDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="cvv" className="mt-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    isInvalid={!!errors.cvv}
                    placeholder="CVV"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cvv}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-4" block>
              Submit
            </Button>
          </Form>

          {/* Confirmation Modal */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Order Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Thank you for your order!</h5>
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Shipping Address:</strong> {formData.address}
              </p>
              <p>
                <strong>Card Number:</strong> **** **** ****{" "}
                {formData.cardNumber.slice(-4)}
              </p>
              <p>
                <strong>Expiration Date:</strong> {formData.expirationDate}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Okay
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm;
