// Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Style
import './LoginPage.scss';

function LoginPage() {
  const history = useNavigate();
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history('/library');
    }
  }, [])

  /**
   *
   */
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      alert('Login successful')
      window.location.href = '/library'
    } else {
      alert('Please check your username and password')
    }
  }

  /**
   *
   */
  return (
    <div className="container login-form">
      <div className="py-5">
        <img
          src="/assets/images/library-logo.jpg"
          className="login-logo"
          alt="logo"
        />
      </div>
      <Form
        onSubmit={handleSubmit}
        className="w-50"
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="danger"
          type="submit"
          disabled={!validateForm()}
        >
          Submit
        </Button>
      </Form>
      <p className="mt-3">Don't have an account? <Link to="/register">Sign Up</Link></p>
    </div>
  );
}

export default LoginPage;