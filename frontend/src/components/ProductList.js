import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
        {products?.map((product) => (
          <Card className="my-4 ">
            <div className="d-md-flex d-block product-card">
              <img
                style={{ width: 150 }}
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
          </Card>
        ))}
      </div>
    </div>
  );
}
