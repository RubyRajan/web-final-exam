import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Star, StarFill } from 'react-bootstrap-icons';
import { useUser } from './useUser';
import { useCart } from './useCart';

export default function ProductList() {
  const { user } = useUser();
  const { cart, updateCart } = useCart();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4050/products')
      .then(({ data }) => {
        setProducts(data);
      })
      .catch(() => {});
  }, []);

  const addToCart = (product) => {
    debugger;
    if (!user?._id) {
      window.location = '/signin';
    } else {
      updateCart([...cart, { product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <h1 className="mt-4">Product List</h1>
      <div>
        <Row>
          {products?.map((product, i) => (
            <Col key={i} xs={12} md={6} lg={4} className="my-2">
              <div
                className="my-4 text-center h-100"
                style={{ border: '1px solid lightgray', borderRadius: 5 }}
              >
                <div>
                  <img
                    className="p-4"
                    style={{ width: '100%' }}
                    alt={product?.title}
                    src={`http://localhost:4050/img/${product?.image}`}
                  />
                  <Card.Body>
                    <Card.Title>{product?.title}</Card.Title>
                    <div>
                      <StarFill />
                      <StarFill />
                      <StarFill />
                      <StarFill />
                      <Star />
                    </div>
                    <div>
                      <Card.Text>${product?.pricing}</Card.Text>
                      {cart?.some((c) => c?.product?._id === product?._id) ? (
                        <Button onClick={() => (window.location = '/cart')}>
                          Go to Cart
                        </Button>
                      ) : (
                        <Button onClick={() => addToCart(product)}>
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
