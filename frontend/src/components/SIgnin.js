import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';

const Signin = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'http://localhost:4050/users/signin',
        formData
      );

      const userData = response.data.user;
      updateUser(userData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (user?._id) {
    window.location = '/';
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center">Sign In</h2>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Button variant="primary" type="submit">
          Sign In
        </Button>
        <Button
          onClick={() => navigate('/signup')}
          variant="light"
          className="mx-4"
        >
          Sign Up
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Signin;
