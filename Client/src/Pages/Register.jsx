import React from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { FaUser, FaLock, FaPhone, FaAddressCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = () => {
       const api = "http://localhost:5000/api/register"
  
      axios.post(api, {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address
      })
      .then(res => {
        console.log(res);
        navigate('/login')
      })
      .catch(err => {
        console.log(err);
        setRegisterError("Invalid email or password");
      })
    };
  
    const handleLogin = () => {
        navigate('/login')
    };
  
    return (
      <Container fluid className="bg-black text-light min-vh-100 d-flex align-items-center" style={{padding: '20px'}}>
        <Row className="justify-content-md-center" style={{width: '100%'}}>
          <Col md={4} className="shadow-lg p-3 mb-5 bg-dark rounded" style={{width: '50%', padding: '30px'}}>
            <h1 className="text-center text-success" style={{fontSize: '30px'}}>Register Yourself</h1>
            <Form style={{marginTop: '20px'}}>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicRegisterName" className="mb-3">
                    <Form.Label>
                      <FaUser style={{fontSize: '16px', color: 'blue'}} />&nbsp;Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name='name'
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{height: '30px', fontSize: '16px'}}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicRegisterEmail" className="mb-3">
                    <Form.Label>
                      <FaUser style={{fontSize: '16px', color: 'green'}} />&nbsp;Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name='email'
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{height: '30px', fontSize: '16px'}}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicRegisterPassword" className="mb-3">
                    <Form.Label>
                      <FaLock style={{fontSize: '16px', color: 'red'}} />&nbsp;Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      name='password'
                      onChange={(e) => setPassword(e.target.value)}
                      style={{height: '30px', fontSize: '16px'}}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicRegisterConfirmPassword" className="mb-3">
                    <Form.Label>
                      <FaLock style={{fontSize: '16px', color: 'yellow'}} />&nbsp;Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name='confirmPassword'
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{height: '30px', fontSize: '16px'}}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicRegisterPhone" className="mb-3">
                    <Form.Label>
                      <FaPhone style={{fontSize: '16px', color: 'orange'}} />&nbsp;Phone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name='phone'
                      placeholder="Enter phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{height: '30px', fontSize: '16px'}}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicRegisterAddress" className="mb-3">
                    <Form.Label>
                      <FaAddressCard style={{fontSize: '16px', color: 'purple'}} />&nbsp;Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name='address'
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{height: '30px', fontSize: '16px'}}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-danger" style={{fontSize: '16px'}}>{registerError}</div>
              <Button variant="success" type="button" onClick={handleRegister} style={{width: '100%',alignSelf: 'center', marginTop: '10px',justifyContent: 'center', fontSize: '16px'}}> 
                Register
              </Button>
              <br />
              <br />
              <div style={{fontSize: '16px'}}>
                Already have an account?
                <Button variant="primary" type="button" onClick={handleLogin} style={{width: '100%',alignSelf: 'center',justifyContent: 'center', fontSize: '16px'}}> 
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  export default Register;