import React from "react";
import { useCart } from "./useCart";
import { Button, Card, CardBody } from "react-bootstrap";
import AuthRequired from "./AuthRequired";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateCart } = useCart();

  const removeItem = (productId) => {
    updateCart(cart?.filter((c) => c?.product?._id !== productId));
  };

  const quantityPlus = (productId) => {
    updateCart(
      cart?.map((c) =>
        c?.product?._id === productId ? { ...c, quantity: c?.quantity + 1 } : c
      )
    );
  };

  const quantityMinus = (productId) => {
    updateCart(
      cart?.map((c) => {
        if (c?.product?._id === productId && c?.quantity > 1) {
          return { ...c, quantity: c?.quantity - 1 };
        }
        return c;
      })
    );
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

        {cart?.map((cartitem, i) => (
          <Card key={i}>
            <div className="d-md-flex d-block checkout-card">
              <img
                style={{ width: 150 }}
                alt={cartitem?.product?.title}
                src={`http://localhost:4050/img/${cartitem?.product?.image}`}
              />
              <Card.Body>
                <Card.Title>{cartitem?.product?.title}</Card.Title>
                <div className="d-md-flex d-block justify-content-between">
                  <Card.Text>${cartitem?.product?.pricing}</Card.Text>
                  <div>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => quantityMinus(cartitem?.product?._id)}
                    >
                      -
                    </Button>
                    <Button size="sm" variant="light" className="mx-2">
                      {cartitem?.quantity}
                    </Button>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => quantityPlus(cartitem?.product?._id)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="danger"
                    className="mt-sm-2 mt-md-0"
                    onClick={() => removeItem(cartitem?.product?._id)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </div>
          </Card>
        ))}
        {cart?.length > 0 ? (
           <Card className="checkout-card my-4">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div>Total: ${calculateTotal()}</div>
                <Link to="/checkout" className="btn btn-maroon">
                  Checkout
                </Link>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div className="text-center">
            <p className="animate__animated animate__fadeIn animate__delay-1s">
              No Item is Cart
            </p>
            <Button
              className="btn-maroon animate__animated animate__fadeInUp animate__delay-2s"
              onClick={() => (window.location = "/")}
            >
              Shop Now
            </Button>
          </div>
        )}
      </div>
    </AuthRequired>
  );
}
