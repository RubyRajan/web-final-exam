import React, { useState } from 'react';
import { useCart } from './useCart';
import { Button, Card, Form } from 'react-bootstrap';
import AuthRequired from './AuthRequired';
import axios from 'axios';
import { useUser } from './useUser';

export default function Checkout() {
  const { cart, updateCart } = useCart();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    country: '',
    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCvv: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...formData,
        total: calculateTotal(),
        item: cart,
        user: user?._id,
      };
      const response = await axios.post(
        'http://localhost:4050/orders',
        payload
      );
      console.log(response.data);
      alert('Order Placed, Thank you');
      updateCart([]);
      window.location = '/';
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    cart?.forEach((cartItem) => {
      total += cartItem?.product?.pricing * cartItem?.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <AuthRequired>
      <div>
        <h2>Shopping Cart</h2>

        {cart?.map((cartItem, i) => (
          <Card key={i}>
            <div className="d-md-flex d-block product-card">
              <img
                style={{ width: 150 }}
                alt={cartItem?.product?.title}
                src={`http://localhost:4050/img/${cartItem?.product?.image}`}
              />
              <Card.Body>
                <Card.Title>{cartItem?.product?.title}</Card.Title>
                <div className="d-md-flex d-block justify-content-between">
                  <Card.Text>
                    ${cartItem?.product?.pricing} x {cartItem?.quantity} = $
                    {cartItem?.product?.pricing * cartItem?.quantity}
                  </Card.Text>
                </div>
              </Card.Body>
            </div>
          </Card>
        ))}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="creditCardNumber">
            <Form.Label>Credit Card Number</Form.Label>
            <Form.Control
              type="text"
              name="creditCardNumber"
              value={formData.creditCardNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="creditCardExpiry">
            <Form.Label>Credit Card Expiry</Form.Label>
            <Form.Control
              type="text"
              name="creditCardExpiry"
              value={formData.creditCardExpiry}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="creditCardCvv">
            <Form.Label>Credit Card CVV</Form.Label>
            <Form.Control
              type="text"
              name="creditCardCvv"
              value={formData.creditCardCvv}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {cart?.length > 0 ? (
            <Card className="my-4">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>Total: ${calculateTotal()}</div>
                  <Button variant="primary" type="submit">
                    Place Order
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-center">
              <p>No Item is Cart</p>
              <Button onClick={() => (window.location = '/')}>Shop Now</Button>
            </div>
          )}
        </Form>
      </div>
    </AuthRequired>
  );
}
