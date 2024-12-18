import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Card } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const api = "http://localhost:5000/api/login";

    await axios.post(api, {
      email: email,
      password: password
    })
    .then(res => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/home')
    })
    .catch(err => {
      console.log(err);
      setLoginError("Invalid email or password");
    })
  };

  const handleSignup = () => {
    navigate('/register');
  }

  return (
    <Container fluid className="bg-black text-light min-vh-100 d-flex align-items-center">
      <Row className="justify-content-md-center" style={{width: '100%'}}>
        <Col md={4} className="shadow-lg p-3 mb-5 bg-dark rounded" style={{width: '30%', margin: 'auto'}}>
          <h1 className="text-center text-primary">Login</h1>
          <Form onSubmit={handleLogin} >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <FaUser style={{color: 'yellow'}} /> Email address
              </Form.Label>
              <Form.Control
                type="email"
                name='email'
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>
                <FaLock style={{color: 'orange'}} /> Password
              </Form.Label>
              <Form.Control
                type="password"
                name='password'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="text-danger">{loginError}</div>
            <Button variant="primary" type="submit"  style={{marginBottom: '10px'}}  className="w-100">
              Login
            </Button>
          </Form>
          <Card>
            <Card.Body>
              <Card.Title>Don't have an account?</Card.Title>
              <Card.Text>
                Sign up today and start shopping!
              </Card.Text>
              <Button variant="primary" onClick={handleSignup}  className="w-100">
                Sign up
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};



export default Login
