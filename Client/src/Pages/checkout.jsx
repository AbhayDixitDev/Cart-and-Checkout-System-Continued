import React, { useState, useEffect } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import { clearCart } from '../reduxSlices/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.data);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setAmount(total);
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post('http://localhost:5000/orders/checkout', {
        cart,
        amount,
        name,
        email
      });

      // Redirect to Stripe Checkout
      console.log(data.url);
      window.location.href = data.url; // Use the URL returned from the backend
    } catch (error) {
      console.log(error.response);
      setError(
        error.response && error.response.data
          ? error.response.data.error.message
          : 'An error occurred during payment processing.'
      );
    } finally {
      setLoading(false);
      // Clear the cart
      dispatch(clearCart());
    }
  };

  return (
    <Container fluid className="bg-black" style={{ height: '90vh', paddingTop: '6rem' }}>
      <Row className="justify-content-md-center">
        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card className="bg-dark" style={{  borderRadius: '20px', width: '500px' }}>
            <Card.Header className="bg-dark">
              <h3 className="text-center text-light">Payment Gateway</h3>
            </Card.Header>
            <Card.Body className="p-1 bg-dark">
              <Form onSubmit={handleSubmit} className="m-1">
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label className="text-light">Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-dark text-light"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label className="text-light">Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-dark text-light"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!stripe || loading}
                  className="d-flex align-items-center bg-success text-light w-100"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard className="me-2 border rounded-pill text-light" /> Checkout
                    </>
                  )}
                </Button>
                {error && <div className="text-danger mt-3 text-light">{error}</div>}
              </Form>
            </Card.Body>
            <Card.Footer className="text-center bg-dark">
              <FaLock className="text-light" /> Secure payment
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;