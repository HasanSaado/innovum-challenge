// Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Route } from 'react-router-dom';

// Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Style
import './RegisterPage.scss';

function RegisterPage() {
  const history = useNavigate();
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/library');
    }
  }, [])

  /**
   *
   */
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  /**
   * 
   */
  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			history('/')
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
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
            required
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
      <p className="mt-3">Already have an account? <Link to="/">Sign In</Link></p>
    </div>
  );
}

export default RegisterPage;